import test, { before, after, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdtemp, rm, writeFile, access } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';
import { scanPage } from '../lib/scanner.mjs';
import { classify, settle, fillField, successEvidence } from '../lib/adapters.mjs';
import { generatePlan } from '../lib/planner.mjs';
import { ApplicationSession } from '../lib/session.mjs';
import { TaskStore } from '../lib/tasks.mjs';
import { prepareAccount } from '../lib/workday.mjs';

let browser, server, base, context, directory, store, session, currentProfile;
before(async () => {
  server = createServer(async (req, res) => {
    if (req.url === '/offline') { req.socket.destroy(); return; }
    if (req.url === '/iframe') { res.setHeader('Content-Type', 'text/html'); res.end('<h1>Airbnb Application</h1><iframe id="grnhse_iframe" style="width:100%;height:900px" src="/greenhouse.html"></iframe>'); return; }
    if (req.url === '/captcha') { res.end('<h1>Challenge fixture</h1>'); return; }
    try { res.setHeader('Content-Type', 'text/html; charset=utf-8'); res.end(await readFile(resolve('test/fixtures', req.url.slice(1)))); }
    catch { res.statusCode = 404; res.end('Not found'); }
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r)); base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({ headless: false });
});
after(async () => { await browser?.close(); if (server) await new Promise(r => server.close(r)); });
beforeEach(async () => {
  context = await browser.newContext(); directory = await mkdtemp(join(tmpdir(), 'apply-dom-')); store = await new TaskStore(directory).load();
  currentProfile = { personal: { first_name: 'Synthetic', last_name: 'Test', email: 'synthetic@example.org' } };
  session = await new ApplicationSession(store, async () => currentProfile, { context }).start();
});
afterEach(async () => { await session?.close(); await context?.close(); await rm(directory, { recursive: true, force: true }); });
const open = async fixture => { const page = await context.newPage(); await page.goto(`${base}/${fixture}`); return page; };

test('12 research samples have traceable reconstructed DOM coverage and explicit manual branches', async () => {
  const samples = JSON.parse(await readFile('samples/research/sample-manifest.json', 'utf8'));
  const scenarios = JSON.parse(await readFile('test/fixtures/scenarios.json', 'utf8'));
  assert.equal(scenarios.length, 12);
  for (const scenario of scenarios) {
    assert.ok(samples.some(s => s.company === scenario.company)); assert.ok(scenario.manual.length);
    await access(resolve('samples/research/evidence', scenario.evidence));
    const page = await open(scenario.iframe ? 'iframe' : scenario.fixture), scan = await scanPage(page);
    assert.ok(scan.fields.length >= 4);
    if (scenario.iframe) assert.ok(scan.fields.every(f => f.frame === 1));
    if (scenario.fixture === 'ashby.html') assert.ok(scan.fields.some(f => f.type === 'yes-no-button'));
    if (scenario.fixture === 'workday.html') assert.ok(scan.documents[0].headings.includes('My Information'));
    await page.close();
  }
});
test('Workday conditional country/former employee fields, repeated groups and segmented dates', async () => {
  const page = await open('workday.html');
  let scan = await scanPage(page); assert.ok(!scan.fields.some(f => f.label === 'Previous Employee ID'));
  await page.locator('#country').selectOption('CA');
  await page.getByLabel('Yes', { exact: true }).check();
  scan = await scanPage(page);
  assert.ok(scan.fields.some(f => f.label === 'Province or Territory'));
  assert.ok(scan.fields.some(f => f.label === 'Previous Employee ID'));
  await page.locator('#next').click(); await page.evaluate(() => { addJob(); addJob(); addSchool(); addSchool(); });
  scan = await scanPage(page);
  const companies = scan.fields.filter(f => f.label === 'Company'); assert.equal(companies.length, 2); assert.deepEqual(companies.map(f => f.repeatIndex), [0, 1]);
  const plan = await generatePlan(scan, { experience: [{ company: 'A', from: { month: '1', year: '2020' } }, { company: 'B', from: { month: '2', year: '2022' } }], education: [{ university: 'One' }, { university: 'Two' }] });
  for (const fill of plan.fills) await fillField(page, fill);
  scan = await scanPage(page); assert.deepEqual(scan.fields.filter(f => f.label === 'Company').map(f => f.value), ['A', 'B']);
  assert.deepEqual(scan.fields.filter(f => f.repeatKind === 'experience' && f.dateSide === 'from' && f.label === 'Year').map(f => f.value), ['2020', '2022']);
  await page.getByRole('group', { name: 'Work Experience 1', exact: true }).getByRole('button', { name: 'Delete' }).click();
  assert.equal((await scanPage(page)).fields.filter(f => f.label === 'Company').length, 1);
});
test('Greenhouse iframe scanning, conditional Race, separate required attachments and optional login', async () => {
  const page = await open('iframe');
  let scan = await scanPage(page); assert.ok(scan.fields.length); assert.ok(scan.fields.every(f => f.frame === 1));
  assert.equal(scan.fields.filter(f => f.type === 'file' && f.required).length, 2);
  assert.ok(!scan.fields.some(f => f.label === 'Race'));
  await page.frames()[1].getByLabel('Hispanic or Latino').selectOption('No');
  scan = await scanPage(page); assert.ok(scan.fields.some(f => f.label === 'Race')); assert.equal(context.pages().length, 1);
  assert.equal(classify(scan), 'agreement');
});
test('Ashby parser waits then rescans, buttons map exact answers, date and location controls', async () => {
  const page = await open('ashby.html');
  await page.locator('#parse').setInputFiles('samples/research/synthetic-test-resume.txt');
  assert.equal(classify(await scanPage(page)), 'processing');
  let scan = await settle(page);
  assert.equal(scan.fields.find(f => f.id === 'email').value, 'synthetic@example.org');
  assert.equal(scan.fields.find(f => f.id === 'phone').value, '');
  const field = scan.fields.find(f => f.type === 'yes-no-button');
  await fillField(page, { ...field, value: 'No' });
  assert.equal((await scanPage(page)).fields.find(f => f.type === 'yes-no-button').value, 'No');
  await page.locator('#date').fill('11/15/2026'); await page.locator('#date').press('Tab');
  scan = await scanPage(page); assert.equal(scan.fields.find(f => f.id === 'date').type, 'text');
  const location = scan.fields.find(f => f.id === 'location');
  await assert.rejects(fillField(page, { ...location, value: 'Fremont' }), /unique exact option/);
  await fillField(page, { ...location, value: 'Fremont, CA, United States' });
  assert.equal(await page.locator('#location').inputValue(), 'Fremont, CA, United States');
});
test('Lever native required validation, parser Success is not submission, recurring captcha pauses', async () => {
  const page = await open('lever.html');
  const baseline = await scanPage(page);
  assert.ok(baseline.fields.find(f => f.name === 'name').invalid);
  await page.getByRole('button', { name: 'Submit application' }).click(); assert.equal(await page.evaluate(() => window.submits), 0);
  await page.locator('#resume').setInputFiles('samples/research/synthetic-test-resume.txt'); await settle(page);
  assert.equal(successEvidence(await scanPage(page), baseline), null);
  await page.locator('#challenge').evaluate(el => { el.hidden = false; });
  assert.equal(classify(await scanPage(page)), 'challenge-or-exception');
  await page.locator('#challenge').evaluate(el => { el.hidden = true; }); assert.equal(classify(await scanPage(page)), null);
  await page.locator('#challenge').evaluate(el => { el.hidden = false; }); assert.equal(classify(await scanPage(page)), 'challenge-or-exception');
});
test('generic dynamic fields, native dates, uploads and honeypot exclusion', async () => {
  const page = await open('generic.html'); let scan = await scanPage(page);
  const date = scan.fields.find(f => f.type === 'date'); await fillField(page, { ...date, value: '2026-11-15' });
  await page.getByLabel('Show additional question').check(); scan = await scanPage(page);
  assert.ok(scan.fields.some(f => f.label === 'Custom question'));
  const plan = await generatePlan(scan, { attachments: { resume: 'samples/research/synthetic-test-resume.txt', cover_letter: 'samples/research/synthetic-test-resume.txt' } });
  assert.ok(plan.skipped.some(f => f.reason === 'trap or credential'));
  for (const fill of plan.fills) await fillField(page, fill);
  assert.equal((await scanPage(page)).fields.filter(f => f.type === 'file' && f.value.length).length, 2);
});
test('human-paused task preserves tab, next task executes, resume by ID rescans new controls', async () => {
  const paused = store.add(`${base}/lever.html`), next = store.add(`${base}/generic.html`);
  const page = await session.page(paused); await page.locator('#challenge').evaluate(el => { el.hidden = false; });
  await session.batch([paused.id, next.id]);
  assert.equal(paused.state, 'needs-human'); assert.equal(next.state, 'needs-review'); assert.equal(session.pages.size, 2);
  assert.equal(session.pages.get(paused.id), page); assert.equal(await page.evaluate(() => window.submits), 0);
  await page.locator('#challenge').evaluate(el => { el.hidden = true; });
  await page.locator('select').first().selectOption('Custom');
  await session.run(paused.id);
  assert.equal(paused.state, 'needs-review'); assert.ok(paused.review.items.some(i => i.label === 'Custom pronouns'));
  assert.ok(paused.history.some(h => h.kind === 'new-fields' && h.details.fields.some(f => f.label === 'Custom pronouns')));
});
test('every task requires Review, verified fields are excluded, no unapproved submit', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id);
  assert.equal(task.state, 'needs-review');
  assert.ok(!task.review.items.some(i => ['First Name', 'Email'].includes(i.label)));
  await assert.rejects(session.submit(task.id), /explicit approval/);
  assert.equal(await session.pages.get(task.id).evaluate(() => window.submits), 0);
});
test('page change and change-back invalidate approval; answer edits also invalidate', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id);
  const page = session.pages.get(task.id), token = task.review.fingerprint;
  await page.getByLabel('First Name').fill('Changed'); await page.getByLabel('First Name').fill('Synthetic');
  await assert.rejects(session.approve(task.id, token), /invalidated/);
  await session.review(task.id); await session.approve(task.id, task.review.fingerprint);
  currentProfile.personal.email = 'changed@example.org';
  await assert.rejects(session.submit(task.id), /Review again/);
  assert.equal(task.state, 'needs-review'); assert.equal(await page.evaluate(() => window.submits), 0);
});
test('no errors after Submit is uncertain, check/resume never clicks again', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id);
  await session.approve(task.id, task.review.fingerprint); await session.submit(task.id);
  assert.equal(task.state, 'uncertain');
  await session.check(task.id); await session.run(task.id);
  assert.equal(await session.pages.get(task.id).evaluate(() => window.submits), 1);
  await assert.rejects(session.approve(task.id, 'anything'), /Review/);
});
test('network exception does not trigger blind retries', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id);
  const page = session.pages.get(task.id); await page.evaluate(() => { window.outcome = 'network'; });
  await session.review(task.id); await session.approve(task.id, task.review.fingerprint); await session.submit(task.id);
  assert.equal(task.state, 'uncertain'); await session.check(task.id); assert.equal(await page.evaluate(() => window.submits), 1);
  assert.ok(task.history.some(h => h.kind === 'network-error'));
});
test('explicit trusted application success alone records submitted', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id);
  await session.pages.get(task.id).evaluate(() => { window.outcome = 'success'; });
  await session.review(task.id); await session.approve(task.id, task.review.fingerprint); await session.submit(task.id);
  assert.equal(task.state, 'submitted'); assert.equal(task.successEvidence.kind, 'explicit-application-confirmation');
  await session.run(task.id); assert.equal(await session.pages.get(task.id).evaluate(() => window.submits), 1);
});
test('restart reopens URL and rescans; prior approval is never reusable', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id); await session.approve(task.id, task.review.fingerprint); await store.save();
  const restored = await new TaskStore(directory).load(); assert.equal(restored.get(task.id).approval, null);
  const second = await new ApplicationSession(restored, async () => currentProfile, { context }).start();
  await second.run(task.id); assert.equal(restored.get(task.id).state, 'needs-review');
  assert.notEqual(second.pages.get(task.id), session.pages.get(task.id));
  await assert.rejects(second.submit(task.id), /explicit approval/); await second.close();
});
test('Workday Manual guest wizard creates/fills multiple records and still stops at Review', async () => {
  currentProfile.experience = [
    { title: 'One', company: 'A', current: true, from: { month: '1', year: '2020' } },
    { title: 'Two', company: 'B', current: false, from: { month: '2', year: '2022' }, to: { month: '3', year: '2023' } }
  ];
  currentProfile.education = [{ university: 'Synthetic University', degree: 'BS', from: { year: '2010' }, to: { year: '2014' } }];
  currentProfile.attachments = { resume: 'samples/research/synthetic-test-resume.txt' };
  const task = store.add(`${base}/workday.html`); await session.run(task.id);
  assert.equal(task.state, 'needs-review'); assert.equal(task.review.final, false);
  await session.approve(task.id, task.review.fingerprint); await session.run(task.id);
  const page = session.pages.get(task.id); assert.equal(task.state, 'needs-review');
  if (!task.review.final) { await session.approve(task.id, task.review.fingerprint); await session.run(task.id); }
  assert.equal(task.review.final, true); assert.equal(await page.evaluate(() => window.submits), 0);
  assert.equal(task.confirmed && Object.keys(task.confirmed).length >= 10, true);
});
test('OTP and agreements pause; provided credentials prepare registration without accepting terms', async () => {
  const page = await context.newPage(); await page.setContent('<label>Email<input type="email"></label><label>Password<input type="password"></label><label>Verify New Password<input type="password"></label><label>I agree<input type="checkbox"></label><button type="button">Create Account</button>');
  await prepareAccount(page, { email: 'synthetic@example.org', password: 'only-test-value', existing: false });
  assert.equal(await page.getByLabel('Email').inputValue(), 'synthetic@example.org'); assert.equal(await page.getByLabel('I agree').isChecked(), false);
  assert.ok((await scanPage(page)).fields.filter(f => f.type === 'password').every(f => f.value === ''));
  await page.setContent('<label>Security code<input name="otp"></label>'); assert.equal(classify(await scanPage(page)), 'otp');
});

test('concurrent calls are serialized across tasks in the same headed context', async () => {
  let active = 0, maximum = 0;
  session.settle = async page => {
    active++; maximum = Math.max(maximum, active);
    try { await page.waitForTimeout(10); return await settle(page); } finally { active--; }
  };
  const one = store.add(`${base}/generic.html?task=one`), two = store.add(`${base}/generic.html?task=two`);
  // Route-independent URLs are distinct task identities, then pages use the same local fixture.
  const originalPage = session.page.bind(session);
  session.page = async task => {
    let page = session.pages.get(task.id);
    if (!page) { page = await context.newPage(); await page.goto(`${base}/generic.html`); session.pages.set(task.id, page); }
    return originalPage(task);
  };
  await Promise.all([session.run(one.id), session.run(two.id)]);
  assert.equal(maximum, 1); assert.equal(one.state, 'needs-review'); assert.equal(two.state, 'needs-review');
  assert.equal(context.pages().length, 2);
});
test('reload invalidates a Review even when document text and answers are identical', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id);
  const token = task.review.fingerprint, page = session.pages.get(task.id);
  await page.reload(); await page.getByLabel('First Name').fill('Synthetic'); await page.getByLabel('Email').fill('synthetic@example.org');
  await assert.rejects(session.approve(task.id, token), /invalidated/);
  assert.equal(await page.evaluate(() => window.submits), 0);
});
test('semantic keys distinguish replaced wizard controls that reuse exactly the same DOM path', async () => {
  const page = await context.newPage();
  await page.setContent('<h2>My Information</h2><label>First Name<input id="reused"></label>');
  const before = await scanPage(page);
  await page.setContent('<h2>My Experience</h2><label>Job Title<input id="reused"></label>');
  const after = await scanPage(page);
  assert.equal(before.fields[0].selector, after.fields[0].selector);
  assert.notEqual(before.fields[0].key, after.fields[0].key);
});
test('existing account signs in without accepting agreements or attempting registration', async () => {
  const page = await context.newPage();
  await page.setContent('<h2>Sign In</h2><label>Email<input type="email"></label><label>Password<input type="password"></label><button type="button" onclick="window.signedIn=true">Sign In</button><button type="button" onclick="window.created=true">Create Account</button>');
  await prepareAccount(page, { email: 'synthetic@example.org', password: 'only-test-value', existing: true });
  assert.equal(await page.evaluate(() => window.signedIn), true); assert.equal(await page.evaluate(() => !!window.created), false);
});
test('uncertain retry needs a requested check plus explicit human negative evidence and fresh Review', async () => {
  const task = store.add(`${base}/generic.html`); await session.run(task.id);
  await session.approve(task.id, task.review.fingerprint); await session.submit(task.id);
  await assert.rejects(session.resolveUnsubmitted(task.id, 'Portal inspected: no application exists for this job.'), /Run check/);
  await session.check(task.id);
  await assert.rejects(session.resolveUnsubmitted(task.id, ''), /evidence/);
  await session.resolveUnsubmitted(task.id, 'Portal inspected: no application exists for this job.');
  assert.equal(task.state, 'needs-human'); assert.equal(task.approval, null);
  await session.run(task.id); assert.equal(task.state, 'needs-review');
  await assert.rejects(session.submit(task.id), /explicit approval/);
  assert.equal(await session.pages.get(task.id).evaluate(() => window.submits), 1);
  assert.ok(task.history.some(h => h.kind === 'human-confirmed-not-submitted'));
});
