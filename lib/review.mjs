import { readFile } from 'node:fs/promises';
import { hash } from './tasks.mjs';
import { valueMatches } from './adapters.mjs';

export async function fingerprint(scan, profile) {
  const files = {};
  for (const [key, path] of Object.entries(profile.attachments || {})) {
    if (path) { try { files[key] = hash((await readFile(path)).toString('base64')); } catch { files[key] = 'unreadable'; } }
  }
  const { accounts, ...answers } = profile;
  return hash({ scan, answers, files });
}
export function reviewItems(scan, plan, confirmed = {}) {
  const issues = [...(plan.groupIssues || [])];
  for (const field of scan.fields.filter(f => !f.trap && f.type !== 'password')) {
    const entry = plan.fills.find(f => f.key === field.key);
    const previous = confirmed[field.key];
    if (field.invalid) issues.push({ key: field.key, label: field.label, reason: field.validation || 'invalid value' });
    else if (entry?.derived) issues.push({ key: field.key, label: field.label, reason: 'derived', value: field.value });
    else if (entry && previous?.source === entry.source && valueMatches(field, entry) && previous.valueHash === hash(field.value) && previous.answerHash === hash([entry.value, entry.fileHash])) continue;
    else {
      const unknown = plan.unmapped.find(f => f.key === field.key);
      issues.push({ key: field.key, label: field.label, group: field.group,
        reason: unknown?.reason || (entry ? 'fill not verified or changed' : 'unconfirmed page value'), value: field.value });
    }
  }
  for (const doc of scan.documents) for (const error of doc.errors) issues.push({ reason: 'page validation', detail: error });
  return issues;
}
