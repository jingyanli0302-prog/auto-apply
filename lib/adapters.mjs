import { scanPage, isSubmitButton } from './scanner.mjs';
import { matchOption, normalize } from './answers.mjs';

export function classify(scan) {
  const body = scan.documents.map(d => d.body).join('\n');
  const challenge = scan.documents.flatMap(d => d.challenges || []).some(c => /challenge|hcaptcha/i.test(c.title + c.src) && !/invisible|size=invisible/i.test(c.src));
  if (challenge || /verify you are human|please complete the captcha|select all images|access denied|unusual traffic|please try again/i.test(body)) return 'challenge-or-exception';
  if (scan.fields.some(f => /one.?time|verification code|security code|otp/i.test(f.label + f.name))) return 'otp';
  if (scan.fields.some(f => f.type === 'password')) return 'authentication';
  if (scan.documents.some(d => d.headings.some(h => /^(sign in|create account|mygreenhouse)$/i.test(h))) && scan.fields.some(f => f.type === 'email')) return 'authentication';
  if (/parsing your resume|autofilling key fields|analyzing resume|fetching application form|uploading/i.test(body)) return 'processing';
  if (scan.fields.some(f => f.consent && (f.type === 'checkbox' ? !f.value : !f.value))) return 'agreement';
  return null;
}
export async function settle(page, timeout = 6000) {
  const end = Date.now() + timeout;
  let scan;
  do {
    scan = await scanPage(page);
    if (classify(scan) !== 'processing') return scan;
    await page.waitForTimeout(150);
  } while (Date.now() < end);
  return scan;
}
export const locatorFor = (page, field) => {
  const frame = page.frames()[field.frame];
  if (!frame) throw new Error('Application frame changed; rescan required');
  return frame.locator(field.selector);
};
export async function fillField(page, entry) {
  const el = locatorFor(page, entry);
  if (entry.consent || entry.trap || entry.type === 'password') throw new Error('Human-only field');
  if (entry.disabled) throw new Error('Field disabled');
  switch (entry.type) {
    case 'file': await el.setInputFiles(entry.value); break;
    case 'checkbox':
      if (typeof entry.value !== 'boolean') throw new Error('Checkbox requires an explicit boolean');
      await el.setChecked(entry.value); break;
    case 'select': await el.selectOption(Array.isArray(entry.value) ? entry.value.map(String) : String(entry.value)); break;
    case 'radio': case 'yes-no-button': {
      const match = matchOption(entry.value, entry.options, entry);
      if (!match.option) throw new Error('Ambiguous option');
      const index = entry.options.findIndex(o => o.value === match.option.value);
      await locatorFor(page, { ...entry, selector: entry.optionSelectors[index] }).click(); break;
    }
    case 'custom-select': {
      await el.click();
      if (await el.evaluate(e => e.tagName === 'INPUT')) await el.fill(String(entry.value));
      const frame = page.frames()[entry.frame];
      const options = frame.locator('[role="option"], [role="listbox"] li, [data-automation-id="promptOption"], .select__option');
      await options.first().waitFor({ state: 'visible', timeout: 2500 });
      const items = [];
      for (let i = 0; i < await options.count(); i++) if (await options.nth(i).isVisible()) items.push({ text: (await options.nth(i).innerText()).trim(), value: String(i) });
      const match = matchOption(entry.value, items, entry);
      if (!match.option) { await el.press('Escape'); throw new Error('No unique exact option; hierarchical or unknown control needs human selection'); }
      await options.nth(Number(match.option.value)).click(); break;
    }
    default:
      if (!['text', 'textarea', 'email', 'tel', 'url', 'number', 'date', 'month', 'search'].includes(entry.type)) throw new Error(`Unsupported control: ${entry.type}`);
      await el.fill(String(entry.value)); await el.press('Tab');
  }
}
export function valueMatches(field, entry) {
  if (field.type === 'file') return field.value?.length === 1 && field.value[0].name === String(entry.value).split(/[\\/]/).pop();
  if (field.type === 'custom-select') return normalize(field.value) === normalize(entry.value) || normalize(field.selectedText) === normalize(entry.value);
  return JSON.stringify(field.value) === JSON.stringify(entry.value) || (!Array.isArray(field.value) && String(field.value) === String(entry.value));
}
export function finalButtons(scan) { return scan.buttons.filter(b => isSubmitButton(b.text) && !b.disabled && !/^apply now$/i.test(b.text)); }
export function nextButtons(scan) { return scan.buttons.filter(b => /^(next|save and continue)$/i.test(b.text) && !b.disabled); }
export function successEvidence(scan, baseline) {
  // Resume parser "Success!", a URL change and absence of errors are never evidence.
  if (!baseline) return null;
  for (const doc of scan.documents) {
    const prior = baseline.documents.find(d => new URL(d.frameUrl, baseline.url).origin === new URL(doc.frameUrl, scan.url).origin);
    if (!prior || doc.fields.some(f => !f.trap && f.type !== 'hidden')) continue;
    const heading = doc.headings.find(h => /^(your application (has been |was )?(successfully )?(submitted|received)[.!]?|application (successfully )?(submitted|received)[.!]?|thank you for applying[.!]?)$/i.test(h.trim()));
    if (heading && !prior.headings.includes(heading)) return { kind: 'explicit-application-confirmation', heading, url: scan.url, frameUrl: doc.frameUrl };
  }
  return null;
}
