// Credentials are tenant-scoped and provided by the user through environment variables.
export function accountFor(url, profile) {
  const host = new URL(url).hostname;
  const account = profile.accounts?.[host];
  if (!account || ![true, false].includes(account.existing)) return null;
  const email = process.env[account.email_env], password = process.env[account.password_env];
  return email && password ? { email, password, existing: account.existing === true } : null;
}
export async function isWorkdayLogin(page) { return await page.locator('input[type="password"]:visible').count() > 0; }
export async function prepareAccount(page, account) {
  if (!account) return { paused: true, reason: 'Configure tenant account email/password environment variables or authenticate manually' };
  if (!account.existing) {
    const create = page.getByRole('button', { name: /^create account$/i }).or(page.getByRole('link', { name: /^create account$/i }));
    if (await page.locator('input[type="password"]:visible').count() === 1 && await create.count() === 1) await create.click();
  }
  // This only prepares the auth form. Registration agreements and account creation remain human actions.
  const emails = page.locator('input[type="email"]:visible, input[data-automation-id="userName"]:visible');
  if (await emails.count() === 1) await emails.fill(account.email);
  const passwords = page.locator('input[type="password"]:visible');
  for (let i = 0; i < await passwords.count(); i++) await passwords.nth(i).fill(account.password);
  if (account.existing && await passwords.count() === 1) {
    const signIn = page.getByRole('button', { name: /^sign in$/i });
    if (await signIn.count() === 1) await signIn.click();
  }
  return { paused: true, reason: account.existing ? 'Verify login/OTP in the browser, then resume' : 'Credentials prepared; complete registration and agreement manually, then mark existing: true' };
}
export const handleWorkday = async (page, options) => prepareAccount(page, options);
