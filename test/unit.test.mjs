import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { matchOption } from '../lib/answers.mjs';
import { answerFor, generatePlan, loadProfile } from '../lib/planner.mjs';
import { TaskStore, STATES, hash } from '../lib/tasks.mjs';
import { reviewItems, fingerprint } from '../lib/review.mjs';
import { successEvidence } from '../lib/adapters.mjs';
import { accountFor } from '../lib/workday.mjs';
import { fillForm } from '../lib/engine.mjs';
import { companyRelationshipQuestion } from '../lib/company-relationships.mjs';

test('aliases are context limited and ambiguity is never resolved by guessing', () => {
  for (const value of ['US', 'USA', 'United States', 'United States of America']) assert.equal(matchOption(value, ['United States of America'], { label: 'Country' }).option.text, 'United States of America');
  assert.equal(matchOption('USA', ['United States +1'], { label: 'Country' }).option, undefined);
  assert.equal(matchOption('USA', ['United States'], { label: 'Work authorization' }).option, undefined);
  assert.equal(matchOption('US', ['United States', 'United States of America'], { label: 'Country' }).reason, 'ambiguous');
  for (const label of ['Gender', 'Race', 'Disability status']) assert.ok(matchOption('I prefer not to answer', ['Decline to self-identify'], { label }).option);
  assert.equal(matchOption('No', ['Not authorized', 'No sponsorship required']).option, undefined);
  assert.equal(matchOption('Yes', ['I agree'], { consent: true }).option, undefined);
  assert.equal(matchOption('Cornell University', ['Cornell University - Cornell Tech', 'Cornell University - Ithaca']).option, undefined);
});
test('unknown facts, misleading question wording and agreements never get defaults', async () => {
  const scan = { fields: ['Have you previously worked here?', 'Are you currently located in the US?', 'Will you require sponsorship?', 'Website', 'How did you hear about us?'].map((label, i) => ({ label, key: String(i), type: 'text' })) };
  const plan = await generatePlan(scan, { personal: { linkedin: 'explicit linkedin' }, work_auth: { authorized_us: 'Yes' } });
  assert.equal(plan.fills.length, 0); assert.equal(plan.unmapped.length, 5);
  const consent = await generatePlan({ fields: [{ key: 'agree', label: 'I agree', type: 'checkbox', consent: true }] }, { answers: [{ label: 'I agree', value: true }] });
  assert.equal(consent.fills.length, 0);
  assert.equal(answerFor({ label: 'A long question?' }, { answers: [{ label: 'A long question?', value: 'No' }] }).value, 'No');
  assert.equal(answerFor({ label: 'A long question?' }, { answers: [{ label: 'A long', value: 'No' }] }).value, undefined);
});
test('exact answers retain false, URL/group constraints, and null remains unknown', async () => {
  const field = { key: 'x', label: 'Custom', type: 'checkbox', group: 'Group', options: [] };
  const profile = { answers: [{ label: 'Custom', group: 'Group', url: 'https://example.org/job', value: false }] };
  assert.equal((await generatePlan({ fields: [field] }, profile, { url: 'https://example.org/job' })).fills[0].value, false);
  assert.equal((await generatePlan({ fields: [field] }, profile, { url: 'https://example.org/other' })).fills.length, 0);
  assert.equal((await generatePlan({ fields: [field] }, { answers: [{ label: 'Custom', value: null }] })).fills.length, 0);
});
test('repeated records and segmented dates use their own array index and context', () => {
  const profile = { experience: [{ company: 'A', from: { year: '2020' } }, { company: 'B', from: { year: '2022' } }] };
  assert.equal(answerFor({ label: 'Company', repeatKind: 'experience', repeatIndex: 1 }, profile).value, 'B');
  assert.equal(answerFor({ label: 'Year', repeatKind: 'experience', repeatIndex: 0, dateSide: 'from' }, profile).value, '2020');
  assert.equal(answerFor({ label: 'Year' }, profile).value, undefined);
});
test('multiple configured answers never silently collapse to the first option', async () => {
  const field = { key: 'x', label: 'Choice', type: 'select', options: ['Yes', 'No'] };
  const plan = await generatePlan({ fields: [field] }, { answers: [{ label: 'Choice', value: ['Yes', 'No'] }] });
  assert.equal(plan.fills.length, 0); assert.match(plan.unmapped[0].reason, /multiple answers/);
});
test('Review excludes verified explicit values, includes derived/missing/changed values', () => {
  const fields = [{ key: 'first', label: 'First Name', type: 'text', value: 'User' }, { key: 'name', label: 'Name', value: 'User Name' }, { key: 'unknown', label: 'Question', value: '' }];
  const plan = { fills: [{ ...fields[0], source: 'personal.first_name' }, { ...fields[1], source: 'derived-name', derived: true }], unmapped: [{ key: 'unknown', reason: 'missing explicit answer' }] };
  const confirmed = { first: { source: 'personal.first_name', valueHash: hash('User'), answerHash: hash(['User', undefined]) } };
  assert.deepEqual(reviewItems({ fields, documents: [] }, plan, confirmed).map(i => i.key), ['name', 'unknown']);
  fields[0].value = 'Changed'; assert.ok(reviewItems({ fields, documents: [] }, plan, confirmed).some(i => i.key === 'first'));
});
test('fingerprint binds page, answers and actual attachment contents', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'apply-hash-'));
  try {
    const file = join(dir, 'resume.txt'); await writeFile(file, 'A');
    const profile = { personal: { first_name: 'A' }, attachments: { resume: file } }, scan = { url: 'https://example.org', fields: [], revisions: [1] };
    const before = await fingerprint(scan, profile); await writeFile(file, 'B'); assert.notEqual(await fingerprint(scan, profile), before);
    const other = await fingerprint(scan, profile); scan.revisions[0]++; assert.notEqual(await fingerprint(scan, profile), other);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('persistent lifecycle, duplicate URL, invalid transitions and crash recovery', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'apply-store-'));
  try {
    const store = await new TaskStore(dir).load(), task = store.add('https://example.org/job');
    assert.equal(store.add(task.url).id, task.id); assert.equal(STATES.length, 9);
    assert.throws(() => store.transition(task, 'submitted'), /Invalid transition/);
    store.transition(task, 'filling'); store.transition(task, 'needs-review'); store.transition(task, 'ready-to-submit'); task.approval = { fingerprint: 'old' };
    await store.save(); const restored = await new TaskStore(dir).load(); assert.equal(restored.get(task.id).state, 'needs-review'); assert.equal(restored.get(task.id).approval, null);
    restored.transition(restored.get(task.id), 'ready-to-submit'); restored.transition(restored.get(task.id), 'submitting'); await restored.save();
    const restarted = await new TaskStore(dir).load(); assert.equal(restarted.get(task.id).state, 'uncertain'); assert.throws(() => restarted.transition(restarted.get(task.id), 'filling'));
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('same-process second session is excluded by lock', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'apply-lock-'));
  try { const one = new TaskStore(dir), two = new TaskStore(dir); await one.lock(); await assert.rejects(two.lock(), /Another session/); await one.unlock(); await two.lock(); await two.unlock(); }
  finally { await rm(dir, { recursive: true, force: true }); }
});
test('only a new explicit confirmation on a trusted source without a form is submitted', () => {
  const baseline = { url: 'https://example.org/job', documents: [{ frameUrl: 'https://example.org/job', headings: ['Application'], fields: [{}] }] };
  const scan = heading => ({ url: baseline.url, documents: [{ frameUrl: baseline.url, fields: [], headings: [heading] }] });
  for (const heading of ['Success!', 'Thank you', 'Analyzing resume...', 'Application']) assert.equal(successEvidence(scan(heading), baseline), null);
  assert.ok(successEvidence(scan('Application received'), baseline));
  const withForm = scan('Application received'); withForm.documents[0].fields = [{ type: 'text' }]; assert.equal(successEvidence(withForm, baseline), null);
  const untrusted = scan('Application received'); untrusted.documents[0].frameUrl = 'https://other.example/'; assert.equal(successEvidence(untrusted, baseline), null);
  assert.equal(successEvidence(scan('Application received'), scan('Application received')), null);
});
test('account credentials are exact-tenant environment references, without fallback', () => {
  process.env.TEST_ACCOUNT_EMAIL = 'synthetic@example.org'; process.env.TEST_ACCOUNT_PASSWORD = 'test-secret';
  const profile = { accounts: { 'tenant.example.org': { email_env: 'TEST_ACCOUNT_EMAIL', password_env: 'TEST_ACCOUNT_PASSWORD', existing: true } } };
  assert.equal(accountFor('https://tenant.example.org/job', profile).existing, true);
  assert.equal(accountFor('https://other.example.org/job', profile), null);
  profile.accounts['tenant.example.org'].existing = null;
  assert.equal(accountFor('https://tenant.example.org/job', profile), null);
  delete process.env.TEST_ACCOUNT_EMAIL; delete process.env.TEST_ACCOUNT_PASSWORD;
});
test('example profile contains no invented personal or sensitive defaults', async () => {
  const profile = await loadProfile('config/profile.example.yml');
  for (const key of ['personal', 'work_auth', 'eeo', 'government', 'office', 'job']) for (const value of Object.values(profile[key])) assert.ok(value === null || typeof value === 'object');
  assert.deepEqual(profile.education, []); assert.deepEqual(profile.experience, []);
});
test('legacy auto-submit entry point cannot bypass persistent Review', async () => { await assert.rejects(fillForm('https://example.org', { fills: [] }), /legacy auto-submit is disabled/); });

test('explicit cross-company No declarations cover relatives and former employment without defaults', async () => {
  const profile = { company_relationships: { relatives_employed: 'No', previously_employed: 'No' } };
  const labels = [
    'Have you previously worked for NVIDIA as an employee or contractor?',
    'Description: Have you been employed by Adobe in the past?',
    'Have you ever worked for Figma before, as an employee or a contractor/consultant?',
    'Have you previously worked here?',
    'Do you have any relatives who currently work at Adobe?',
    'Do you have family members employed by NVIDIA?',
    'Are any of your relatives currently employed at Figma?',
    '您是否有亲戚在该公司工作？',
    '你以前是否在该公司工作过？',
  ];
  for (const label of labels) {
    const field = { key: label, label, type: 'radio', options: [{ text: 'Yes', value: 'yes' }, { text: 'No', value: 'no' }] };
    const plan = await generatePlan({ fields: [field] }, profile);
    assert.equal(plan.fills[0]?.value, 'no', label);
    assert.equal((await generatePlan({ fields: [field] }, {})).fills.length, 0);
  }
  assert.equal(answerFor({ label: labels[4], type: 'checkbox' }, profile).value, false);
});

test('relationship declarations do not infer government, referrals, negative or combined answers', () => {
  const profile = { company_relationships: { relatives_employed: 'No', previously_employed: 'No' } };
  for (const label of [
    'Have you ever worked for the government?',
    'Do you have any relatives who work for a government agency?',
    'How did you hear about us? Friend or Family',
    'Do you NOT have relatives working at Adobe?',
    'Have you never worked for Adobe?',
    'Have you previously worked for Salesforce, or are you a current Salesforce contractor?',
    'Have you previously worked for Adobe and do you need sponsorship?',
    'Your previous Salesforce employee ID',
    'Have you ever worked for any company?',
  ]) {
    assert.equal(companyRelationshipQuestion(label), null, label);
    assert.equal(answerFor({ label }, profile).value, undefined, label);
  }
});
