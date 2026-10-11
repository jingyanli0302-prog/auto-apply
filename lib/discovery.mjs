import { scanPage } from './scanner.mjs';
export function detectATS(url) {
  if (/greenhouse|gh_jid=/i.test(url)) return 'greenhouse';
  if (/lever\.co/i.test(url)) return 'lever';
  if (/ashbyhq/i.test(url)) return 'ashby';
  if (/myworkday|workday/i.test(url)) return 'workday';
  return 'generic';
}
export async function discoverApplicationForm(page) {
  for (let step = 0; step < 4; step++) {
    const scan = await scanPage(page);
    if (scan.fields.some(f => !f.trap && f.type !== 'file')) return page.url();
    const buttons = scan.buttons.filter(b => /^(apply|apply now|apply for this job|apply manually|application)$/i.test(b.text) && !b.disabled && b.type !== 'submit');
    if (buttons.length !== 1) return page.url();
    const button = buttons[0];
    await page.frames()[button.frame].locator(button.selector).click();
    await page.waitForTimeout(300);
  }
  return page.url();
}
export async function extractJDText(page) { return page.locator('body').innerText(); }
