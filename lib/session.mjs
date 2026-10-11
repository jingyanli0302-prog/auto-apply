import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { scanPage } from './scanner.mjs';
import { generatePlan } from './planner.mjs';
import { hash } from './tasks.mjs';
import { discoverApplicationForm, detectATS } from './discovery.mjs';
import { classify, settle, fillField, valueMatches, locatorFor, nextButtons, finalButtons, successEvidence } from './adapters.mjs';
import { fingerprint, reviewItems } from './review.mjs';
import { accountFor, prepareAccount } from './workday.mjs';

export function trackChanges() {
  if (window.__applicationRevision !== undefined) return;
  window.__applicationRevision = 0;
  window.__applicationDocument = `${Date.now()}-${Math.random()}`;
  const bump = () => { window.__applicationRevision++; };
  new MutationObserver(bump).observe(document, { subtree: true, childList: true, attributes: true, characterData: true });
  document.addEventListener('input', bump, true); document.addEventListener('change', bump, true);
}
export class ApplicationSession {
  constructor(store, profileProvider, { context, scan = scanPage, discover = discoverApplicationForm, settlePage = settle } = {}) {
    this.store = store; this.profileProvider = profileProvider; this.context = context;
    this.scan = scan; this.discover = discover; this.settle = settlePage;
    this.pages = new Map(); this.tail = Promise.resolve();
  }
  async start() {
    if (!this.context) {
      this.browser = await chromium.launch({ headless: false });
      this.context = await this.browser.newContext({ viewport: { width: 1280, height: 900 } });
    }
    await this.context.addInitScript(trackChanges);
    return this;
  }
  serial(fn) { const next = this.tail.then(fn); this.tail = next.catch(() => {}); return next; }
  async page(task) {
    let page = this.pages.get(task.id);
    if (!page || page.isClosed()) {
      page = await this.context.newPage(); this.pages.set(task.id, page);
      page.on('requestfailed', request => {
        // No request payloads, cookies, URL query tokens or credentials in incident history.
        this.store.event(task, 'network-error', { resourceType: request.resourceType(), reason: request.failure()?.errorText });
      });
      page.on('pageerror', error => this.store.event(task, 'page-error', { name: error.name }));
      await page.goto(task.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      if (!['uncertain', 'submitting', 'submitted'].includes(task.state)) await this.discover(page, task.url);
      this.store.event(task, 'reopened', { note: 'Fresh scan required; no saved DOM replay or submit replay' });
    }
    for (const frame of page.frames()) if (!/captcha/i.test(frame.url())) await frame.evaluate(trackChanges);
    return page;
  }
  async snapshot(page) {
    const scan = await this.scan(page);
    scan.revisions = [];
    scan.documentIds = [];
    for (const frame of page.frames()) if (!/captcha/i.test(frame.url())) {
      scan.revisions.push(await frame.evaluate(() => window.__applicationRevision ?? 0));
      scan.documentIds.push(await frame.evaluate(() => window.__applicationDocument));
    }
    return scan;
  }
  async evidence(task, page, label) {
    try {
      const directory = resolve(this.store.directory, 'evidence'); await mkdir(directory, { recursive: true });
      const path = resolve(directory, `${task.id}-${label}-${Date.now()}.png`);
      await page.screenshot({ path, fullPage: true }); task.screenshot = path;
    } catch { this.store.event(task, 'evidence-error', { reason: 'Screenshot unavailable' }); }
  }
  async pause(task, page, reason) {
    this.store.transition(task, 'needs-human', reason); task.blocker = reason;
    this.store.event(task, 'blocker', { reason });
    task.snapshot = await this.snapshot(page); await this.evidence(task, page, 'paused'); await this.store.save();
    return task;
  }
  run(id) { return this.serial(async () => {
    const task = this.store.get(id);
    if (['submitted', 'uncertain', 'submitting'].includes(task.state)) return this.checkInternal(task);
    try {
      const page = await this.page(task), profile = await this.profileProvider();
      this.store.transition(task, 'filling', 'start or resume; rescan current page'); task.review = null;
      await this.store.save();
      task.fillFailures = [];
      for (let step = 0; step < 200; step++) {
        let scan = await this.settle(page);
        const discovered = scan.fields.filter(f => !(task.observedKeys || []).includes(f.key));
        if (discovered.length) this.store.event(task, 'new-fields', { fields: discovered.map(f => ({ key: f.key, label: f.label, type: f.type, group: f.group })) });
        task.observedKeys = [...new Set([...(task.observedKeys || []), ...scan.fields.map(f => f.key)])];
        const blocker = classify(scan);
        if (blocker) {
          if (blocker === 'authentication') await prepareAccount(page, accountFor(task.url, profile));
          return this.pause(task, page, blocker);
        }
        task.ats = detectATS(scan.url + scan.documents.map(d => d.frameUrl).join(' '));
        if (await this.expandRepeats(page, scan, profile)) continue;
        scan = await this.settle(page);
        let plan = await generatePlan(scan, profile, { url: task.url });
        // One mutation then rescan. Conditional fields and asynchronous parser values are fresh.
        let changed = false;
        for (const entry of plan.fills) {
          const field = scan.fields.find(f => f.key === entry.key);
          if (valueMatches(field, entry) && task.confirmed[entry.key]?.valueHash === hash(field.value) && task.confirmed[entry.key]?.answerHash === hash([entry.value, entry.fileHash])) continue;
          if (entry.type !== 'file' && task.confirmed[entry.key] && !valueMatches(field, entry)) {
            this.store.event(task, 'changed-answer', { key: entry.key, label: entry.label }); continue;
          }
          if (task.fillFailures?.includes(entry.key)) continue;
          try {
            await fillField(page, entry);
            const after = await this.settle(page), current = after.fields.find(f => f.key === entry.key);
            if (!current || !valueMatches(current, entry)) throw new Error('Value did not verify');
            task.confirmed[entry.key] = { valueHash: hash(current.value), answerHash: hash([entry.value, entry.fileHash]), source: entry.source };
            this.store.event(task, 'filled', { key: entry.key, label: entry.label, source: entry.source });
          } catch (error) {
            task.fillFailures ||= []; task.fillFailures.push(entry.key);
            this.store.event(task, 'fill-error', { key: entry.key, label: entry.label, reason: error.message.replace(/\n[\s\S]*/, '') });
          }
          changed = true; break;
        }
        if (changed) { await this.store.save(); continue; }
        await this.evidence(task, page, 'review');
        scan = await this.snapshot(page); plan = await generatePlan(scan, profile, { url: task.url });
        const issues = reviewItems(scan, plan, task.confirmed);
        const next = nextButtons(scan);
        if (!issues.length && next.length === 1 && !finalButtons(scan).length) {
          const before = hash(scan.documents.map(d => ({ headings: d.headings, fields: d.fields })));
          await locatorFor(page, next[0]).click();
          const after = await this.settle(page);
          if (hash(after.documents.map(d => ({ headings: d.headings, fields: d.fields }))) === before) return this.pause(task, page, 'wizard did not advance or validation blocked');
          continue;
        }
        if (!scan.fields.length && !finalButtons(scan).length) return this.pause(task, page, 'unknown page or unobserved navigation branch');
        task.snapshot = scan; task.blocker = null;
        task.review = { fingerprint: await fingerprint(scan, profile), items: issues, final: finalButtons(scan).length === 1, createdAt: new Date().toISOString() };
        this.store.transition(task, 'needs-review', 'human review required for every task');
        this.store.event(task, 'review', { issues }); await this.store.save(); return task;
      }
      return this.pause(task, page, 'dynamic form did not settle within operation budget');
    } catch (error) {
      this.store.transition(task, 'failed', 'navigation/scanning failure');
      this.store.event(task, 'exception', { name: error.name, reason: error.message.split('\n')[0] }); await this.store.save(); return task;
    }
  }); }
  async expandRepeats(page, scan, profile) {
    for (const [kind, names] of Object.entries({ experience: /^(work experience|work history)$/i, education: /^education$/i, certifications: /^certifications$/i })) {
      const desired = Array.isArray(profile[kind]) ? profile[kind].length : 0;
      const present = new Set(scan.fields.filter(f => f.repeatKind === kind).map(f => f.repeatIndex)).size;
      if (desired <= present) continue;
      // Only scoped, uniquely identified sections; ambiguous production layouts go to Review.
      for (const frame of page.frames()) {
        const groups = frame.getByRole('group', { name: names });
        if (await groups.count() !== 1) continue;
        const add = groups.getByRole('button', { name: /^(add|add another)$/i });
        if (await add.count() === 1) { await add.click(); return true; }
      }
    }
  }
  review(id) { return this.serial(async () => {
    const task = this.store.get(id);
    if (['uncertain', 'submitting', 'submitted'].includes(task.state)) return this.checkInternal(task);
    const page = await this.page(task), scan = await this.snapshot(page), profile = await this.profileProvider();
    const blocker = classify(scan); if (blocker) return this.pause(task, page, blocker);
    const plan = await generatePlan(scan, profile, { url: task.url });
    task.snapshot = scan;
    task.review = { fingerprint: await fingerprint(scan, profile), items: reviewItems(scan, plan, task.confirmed), final: finalButtons(scan).length === 1 };
    this.store.transition(task, 'needs-review', 'review refreshed'); await this.store.save(); return task;
  }); }
  approve(id, token) { return this.serial(async () => {
    const task = this.store.get(id);
    if (task.state !== 'needs-review' || !task.review || token !== task.review.fingerprint) throw new Error('Review the current task and provide its exact fingerprint');
    const page = await this.page(task), scan = await this.snapshot(page), profile = await this.profileProvider();
    if (await fingerprint(scan, profile) !== token) { task.review = null; this.store.transition(task, 'needs-review', 'page or answers changed; Review again'); await this.store.save(); throw new Error('Approval invalidated; Review again'); }
    if (classify(scan) || scan.fields.filter(f => !f.trap && f.type !== 'password').some(f => f.invalid || (f.required && (f.value === '' || f.value === false || (Array.isArray(f.value) && !f.value.length))))) throw new Error('Resolve required fields, validation or human blocker before approval');
    if (!task.review.final) {
      const buttons = nextButtons(scan);
      if (buttons.length !== 1) throw new Error('Unobserved navigation; continue manually then resume');
      this.store.event(task, 'step-review-approved', { fingerprint: token });
      this.store.transition(task, 'filling', 'human approved intermediate step'); await this.store.save();
      await locatorFor(page, buttons[0]).click(); task.review = null; await this.store.save(); return task;
    }
    task.approval = { fingerprint: token, at: new Date().toISOString() };
    this.store.transition(task, 'ready-to-submit', 'explicit human approval of current Review'); await this.store.save(); return task;
  }); }
  submit(id) { return this.serial(async () => {
    const task = this.store.get(id);
    if (task.state !== 'ready-to-submit' || !task.approval) throw new Error('Final submit requires explicit approval');
    const page = await this.page(task), scan = await this.snapshot(page), profile = await this.profileProvider();
    if (classify(scan) || await fingerprint(scan, profile) !== task.approval.fingerprint) {
      this.store.transition(task, 'needs-review', 'page or answers changed; approval invalidated'); task.review = null; await this.store.save(); throw new Error('Review again before submission');
    }
    const buttons = finalButtons(scan); if (buttons.length !== 1) throw new Error('No unique final Submit');
    task.submissionBaseline = scan;
    this.store.transition(task, 'submitting', 'single authorized submit attempt'); await this.store.save();
    try {
      const button = buttons[0];
      const frames = page.frames().filter(f => !/captcha/i.test(f.url()));
      for (const [index, frame] of frames.entries()) {
        const state = await frame.evaluate(() => [window.__applicationRevision, window.__applicationDocument]);
        if (state[0] !== scan.revisions[index] || state[1] !== scan.documentIds[index]) throw new Error('Page changed before final click');
      }
      const targetIndex = frames.indexOf(page.frames()[button.frame]);
      // Guard and click share one JS turn. Locator actionability waits cannot outlive approval.
      await locatorFor(page, button).evaluate((el, expected) => {
        if (window.__applicationRevision !== expected.revision || window.__applicationDocument !== expected.documentId ||
          document.body.innerText !== expected.body || !el.getClientRects().length || el.disabled) throw new Error('Page changed before final click');
        for (const field of expected.fields) {
          const control = document.querySelector(field.selector); if (!control) throw new Error('Field disappeared');
          let value;
          if (field.type === 'radio') value = field.optionSelectors.map(s => document.querySelector(s)).find(r => r?.checked)?.value || '';
          else if (field.type === 'checkbox') value = control.checked;
          else if (field.type === 'file') value = Array.from(control.files || []).map(f => ({ name: f.name, size: f.size, modified: f.lastModified }));
          else if (field.type === 'yes-no-button') value = Array.from(control.querySelectorAll('button')).find(b => b.getAttribute('aria-pressed') === 'true' || b.getAttribute('data-state') === 'checked')?.textContent.trim() || '';
          else if (control.multiple) value = Array.from(control.selectedOptions).map(o => o.value);
          else value = control.value ?? control.innerText.trim();
          if (JSON.stringify(value) !== JSON.stringify(field.value)) throw new Error('Answer changed before final click');
        }
        el.click();
      }, { revision: scan.revisions[targetIndex], documentId: scan.documentIds[targetIndex], body: scan.documents.find(d => d.frame === button.frame).body, fields: scan.fields.filter(f => f.frame === button.frame && f.type !== 'password') });
      await page.waitForTimeout(500); await this.settle(page);
    } catch (error) { this.store.event(task, 'submit-error', { name: error.name, reason: 'Submit outcome unknown; never automatically retried' }); }
    return this.checkInternal(task);
  }); }
  check(id) { return this.serial(async () => {
    const task = this.store.get(id);
    if (!['uncertain', 'submitting', 'submitted'].includes(task.state)) throw new Error('Check is only for uncertain/submitting tasks');
    this.store.event(task, 'user-requested-check', {});
    return this.checkInternal(task);
  }); }
  resolveUnsubmitted(id, evidence) { return this.serial(async () => {
    const task = this.store.get(id);
    if (task.state !== 'uncertain') throw new Error('Only uncertain tasks can be resolved as not submitted');
    if (!evidence || evidence.trim().length < 12) throw new Error('Provide the human-observed portal/email evidence that the application was not submitted');
    const lastIntent = task.history.findLastIndex(h => h.kind === 'state' && h.details.to === 'submitting');
    const lastCheck = task.history.findLastIndex(h => h.kind === 'user-requested-check');
    if (lastCheck <= lastIntent) throw new Error('Run check ID before recording a human resolution');
    this.store.event(task, 'human-confirmed-not-submitted', { evidence: evidence.trim(), previousOutcome: 'uncertain' });
    this.store.transition(task, 'needs-human', 'human inspected result and explicitly confirmed not submitted; resume and Review again');
    task.review = null; task.blocker = 'human-confirmed-not-submitted; resume requires a fresh scan and Review';
    await this.store.save(); return task;
  }); }
  async checkInternal(task) {
    if (task.state === 'submitted') return task;
    if (!['submitting', 'uncertain'].includes(task.state)) throw new Error('Check is only for uncertain/submitting tasks');
    try {
      const page = await this.page(task), scan = await this.snapshot(page);
      const proof = successEvidence(scan, task.submissionBaseline);
      task.snapshot = scan;
      if (proof) { task.successEvidence = proof; this.store.transition(task, 'submitted', 'observed explicit application confirmation'); }
      else { this.store.transition(task, 'uncertain', 'no trusted success evidence; inspect portal/email before any new attempt'); this.store.event(task, 'uncertainty', { reason: 'No confirmed application result', blocker: classify(scan) }); }
      await this.evidence(task, page, task.state);
    } catch (error) { this.store.transition(task, 'uncertain', 'status check failed; no retry'); this.store.event(task, 'check-error', { name: error.name }); }
    await this.store.save(); return task;
  }
  async batch(ids) { for (const id of ids) await this.run(id); return ids.map(id => this.store.get(id)); }
  async close() { await this.tail; await this.store.save(); if (this.browser) await this.browser.close(); }
}
