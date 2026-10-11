import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { discoverApplicationForm } from './discovery.mjs';

export const isSubmitButton = text => /^(submit( application)?|send application|complete application|apply now)$/i.test(text.trim());
export const slugify = url => url.replace(/[^a-z0-9]/gi, '-').slice(-120);

export function extractDocument() {
  const visible = el => !!(el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
  const text = el => (el?.innerText || el?.textContent || '').trim().replace(/\s+/g, ' ');
  const labelText = el => {
    if (!el) return '';
    const copy = el.cloneNode(true);
    copy.querySelectorAll('input,textarea,select,button,[role="listbox"]').forEach(e => e.remove());
    return text(copy);
  };
  const label = el => el.getAttribute('aria-label') ||
    (el.getAttribute('aria-labelledby') || '').split(' ').map(id => text(document.getElementById(id))).join(' ').trim() ||
    Array.from(el.labels || []).map(labelText).join(' ') || labelText(el.closest('label')) ||
    labelText(el.closest('[data-field], .field, .application-question, [class*="Field"], [class*="question"]')?.querySelector('label, legend, .application-label, [class*="Label"]')) ||
    text(el.parentElement?.querySelector('.application-label')) || el.getAttribute('placeholder') || el.name || el.id || '';
  const selector = el => {
    const parts = [];
    for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
      parts.unshift(`${node.tagName.toLowerCase()}:nth-child(${Array.from(node.parentElement.children).indexOf(node) + 1})`);
    }
    return `html > ${parts.join(' > ')}`;
  };
  const fields = [], radios = new Set();
  const containers = '[data-repeat-kind], [data-automation-id="workExperience"], [data-automation-id="education"], [data-automation-id="certification"], [role="group"], fieldset';
  const controls = Array.from(document.querySelectorAll('input, textarea, select, [role="combobox"], button[aria-haspopup], [role="spinbutton"]'));
  for (const el of controls) {
    let type = el.type || el.tagName.toLowerCase();
    if (['submit', 'button', 'reset', 'hidden', 'image'].includes(type) && el.getAttribute('role') !== 'combobox' && !el.hasAttribute('aria-haspopup')) continue;
    if (!visible(el) && (type !== 'file' || !visible(el.parentElement))) continue;
    const block = el.closest('[data-field], .field, .application-question, [class*="Field"], [class*="question"]');
    const groupEl = el.closest(containers);
    const group = groupEl?.getAttribute('aria-label') || text(groupEl?.querySelector('legend, h3, h4')) || '';
    const repeatEl = el.closest('[data-repeat-kind], [data-automation-id="workExperience"], [data-automation-id="education"], [data-automation-id="certification"]') ||
      Array.from((function* () { for (let p = el.parentElement; p; p = p.parentElement) yield p; })()).find(p => /^(Work Experience|Work History|Education|Certifications) \d+$/i.test(p.getAttribute('aria-label') || ''));
    const automation = repeatEl?.getAttribute('data-automation-id');
    const repeatName = repeatEl?.getAttribute('aria-label') || '';
    const repeatKind = repeatEl?.dataset.repeatKind || ({ workExperience: 'experience', education: 'education', certification: 'certifications' })[automation] ||
      (/^(Work Experience|Work History) \d+/i.test(repeatName) ? 'experience' : /^Education \d+/i.test(repeatName) ? 'education' : /^Certifications \d+/i.test(repeatName) ? 'certifications' : undefined);
    const repeats = repeatEl ? Array.from(document.querySelectorAll('[data-repeat-kind], [data-automation-id], [role="group"]')).filter(p =>
      repeatEl.hasAttribute('data-repeat-kind') ? p.dataset.repeatKind === repeatKind : automation ? p.getAttribute('data-automation-id') === automation :
        new RegExp('^' + repeatName.replace(/ \d+$/, '') + ' \\d+$', 'i').test(p.getAttribute('aria-label') || '')) : [];
    let name = label(el), options = [], value = el.value ?? text(el), optionSelectors = [];
    if (type === 'radio') {
      const key = `${group}:${el.name}:${selector(groupEl || block || el.parentElement)}`;
      if (radios.has(key)) continue;
      radios.add(key);
      const peers = controls.filter(r => r.type === 'radio' && r.name === el.name && r.closest(containers) === groupEl);
      options = peers.map(r => ({ text: label(r), value: r.value })); optionSelectors = peers.map(selector);
      name = text(el.closest('fieldset')?.querySelector('legend')) || text(block?.querySelector('label:not([for]), .application-label')) || group || name;
      value = peers.find(r => r.checked)?.value || '';
    }
    if (el.tagName === 'SELECT') {
      type = 'select'; options = Array.from(el.options).filter(o => o.value !== '' && !o.disabled).map(o => ({ text: text(o), value: o.value }));
      if (el.multiple) value = Array.from(el.selectedOptions).map(o => o.value);
    } else if (el.getAttribute('role') === 'combobox' || el.hasAttribute('aria-haspopup')) type = 'custom-select';
    if (el.getAttribute('role') === 'spinbutton') type = 'number';
    if (type === 'password') value = '';
    if (type === 'checkbox') value = el.checked;
    if (type === 'file') value = Array.from(el.files || []).map(f => ({ name: f.name, size: f.size, modified: f.lastModified }));
    const context = text(block || groupEl || el.parentElement);
    const dateId = el.closest('[id*="Date"], [data-date-side]');
    const dateSide = dateId?.dataset.dateSide || (/startDate|issuedDate/.test(dateId?.id || '') ? 'from' : /endDate|expirationDate/.test(dateId?.id || '') ? 'to' : /^From$/i.test(group) ? 'from' : /^To\b/i.test(group) ? 'to' : undefined);
    fields.push({ id: el.id, name: el.name || '', label: name, type, selector: selector(el),
      required: !!el.required || el.getAttribute('aria-required') === 'true' || /\*/.test(name),
      requiredEvidence: el.required ? 'native' : /\*/.test(name) ? 'UI' : 'unverified',
      disabled: el.disabled || el.getAttribute('aria-disabled') === 'true', value,
      selectedText: type === 'custom-select' ? text(el.parentElement) : undefined,
      invalid: el.validity ? !el.validity.valid : el.getAttribute('aria-invalid') === 'true',
      validation: el.validationMessage || '', options, optionSelectors, group, repeatKind,
      repeatIndex: repeatEl ? repeats.indexOf(repeatEl) : undefined, dateSide,
      accept: el.accept || '', multiple: !!el.multiple,
      trap: /robots only|honeypot/i.test(name + context),
      consent: /agree|consent|acknowledge|certify|arbitration|statement above|privacy notice|terms and conditions/i.test(name + (type === 'checkbox' ? context : '')),
    });
  }
  for (const block of document.querySelectorAll('[data-field], .field, [class*="Field"], [class*="question"], .application-question')) {
    const buttons = Array.from(block.querySelectorAll('button')).filter(visible);
    if (!buttons.some(b => text(b) === 'Yes') || !buttons.some(b => text(b) === 'No')) continue;
    if (Array.from(block.querySelectorAll('input')).some(i => visible(i) && i.type === 'radio')) continue;
    const name = text(block.querySelector('label, legend, .application-label'));
    if (!name || fields.some(f => f.type === 'yes-no-button' && f.selector === selector(block))) continue;
    fields.push({ id: block.id, label: name, type: 'yes-no-button', selector: selector(block),
      options: buttons.filter(b => /^(Yes|No)$/.test(text(b))).map(b => ({ text: text(b), value: text(b) })),
      optionSelectors: buttons.filter(b => /^(Yes|No)$/.test(text(b))).map(selector),
      value: text(buttons.find(b => b.getAttribute('aria-pressed') === 'true' || b.getAttribute('data-state') === 'checked')),
      required: /\*/.test(name), consent: /agree|acknowledge|arbitration|certify/i.test(name), group: '' });
  }
  const buttons = Array.from(document.querySelectorAll('button, a, input[type="submit"], [role="button"]')).filter(visible).map(el => ({ text: text(el) || el.value || '', selector: selector(el), disabled: !!el.disabled, tag: el.tagName, type: el.type, href: el.getAttribute('href') }));
  const body = document.body?.innerText || '';
  const errors = Array.from(document.querySelectorAll('[role="alert"], .field-error, .error-message, [data-automation-id*="Error"], [aria-invalid="true"]')).filter(visible).map(text).filter(Boolean);
  const challenges = Array.from(document.querySelectorAll('iframe')).filter(visible).map(el => ({ title: el.title, src: el.src }));
  return { fields, buttons, errors, body, headings: Array.from(document.querySelectorAll('h1,h2,h3,[aria-current="step"]')).filter(visible).map(text), challenges };
}

export async function scanPage(page) {
  const documents = [];
  for (const [index, frame] of page.frames().entries()) {
    if (/recaptcha|hcaptcha|captcha/i.test(frame.url())) continue;
    documents.push({ ...(await frame.evaluate(extractDocument)), frame: index, frameUrl: frame.url() });
  }
  return { url: page.url(), title: await page.title(),
    fields: documents.flatMap(d => d.fields.map(f => ({ ...f, frame: d.frame,
      key: JSON.stringify([d.frame, f.repeatKind, f.repeatIndex, f.dateSide, f.group, f.label, f.name, f.id || f.selector]) }))),
    buttons: documents.flatMap(d => d.buttons.map(b => ({ ...b, frame: d.frame }))), documents };
}
export async function scanForm(url, { page: existingPage, formsDir = resolve('forms') } = {}) {
  const browser = existingPage ? null : await chromium.launch({ headless: false });
  const page = existingPage || await browser.newPage();
  try {
    if (!existingPage) { await page.goto(url, { waitUntil: 'domcontentloaded' }); await discoverApplicationForm(page, url); }
    const scan = await scanPage(page);
    await mkdir(formsDir, { recursive: true });
    await writeFile(resolve(formsDir, `${slugify(url)}-scan.json`), JSON.stringify(scan, null, 2));
    return scan;
  } finally { if (browser) await browser.close(); }
}
