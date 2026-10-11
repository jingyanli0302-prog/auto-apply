import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import yaml from 'js-yaml';
import { matchOption, normalize } from './answers.mjs';
import { hash } from './tasks.mjs';

export async function loadProfile(path = resolve('config/profile.yml')) {
  return yaml.load(await readFile(path, 'utf8')) || {};
}
export async function pickResume(text = '', path = resolve('config/resumes.yml')) {
  const config = yaml.load(await readFile(path, 'utf8')) || {};
  return config.resumes?.find(r => r.id === config.default)?.file || null;
}
const mappings = {
  'first name': 'personal.first_name', 'last name': 'personal.last_name',
  'legal first name': 'personal.first_name', 'legal last name': 'personal.last_name',
  'preferred name': 'personal.preferred_name', 'preferred first name': 'personal.preferred_name',
  'full name': 'personal.full_name', name: 'personal.full_name',
  email: 'personal.email', 'email address': 'personal.email', phone: 'personal.phone',
  'phone number': 'personal.phone', 'phone device type': 'personal.phone_type',
  'country phone code': 'personal.country_phone_code', 'phone extension': 'personal.phone_extension',
  linkedin: 'personal.linkedin', 'linkedin profile': 'personal.linkedin',
  'share your linkedin profile site': 'personal.linkedin', website: 'personal.website',
  portfolio: 'personal.portfolio', city: 'personal.city', state: 'personal.state',
  'province or territory': 'personal.state', 'postal code': 'personal.postal_code',
  'zip code': 'personal.postal_code', 'address line 1': 'personal.address_line1',
  'address line 2': 'personal.address_line2', country: 'personal.country',
  location: 'personal.location', 'current location': 'personal.location',
  gender: 'eeo.gender', 'hispanic or latino': 'eeo.hispanic_latino',
  race: 'eeo.race', ethnicity: 'eeo.race', 'veteran status': 'eeo.veteran_status',
  'disability status': 'eeo.disability_status', pronouns: 'personal.pronouns',
};
const clean = text => normalize(text).replace(/[\*✱]+/g, '').trim();
const known = v => v !== undefined && v !== null && v !== '';
const nested = (obj, path) => path.split('.').reduce((v, k) => v?.[k], obj);

export function answerFor(field, profile, url) {
  const label = clean(field.label);
  const candidates = (profile.answers || []).filter(a =>
    (!a.url || a.url === url) && clean(a.label) === label &&
    (!a.group || a.group === field.group) && (!a.id || a.id === field.id));
  if (candidates.length > 1) return { reason: 'ambiguous configured answers' };
  if (candidates.length === 1) return { value: candidates[0].value_ref ? nested(profile, candidates[0].value_ref) : candidates[0].value, source: 'explicit-answer' };
  let path = mappings[label];
  if (field.repeatKind && Number.isInteger(field.repeatIndex)) {
    const key = ({ 'job title': 'title', company: 'company', location: 'location',
      'role description': 'description', 'i currently work here': 'current',
      'school or university': 'university', school: 'university', degree: 'degree',
      'field of study': 'major', 'overall result (gpa)': 'gpa' })[label];
    const datePart = ['month', 'day', 'year'].includes(label) && field.dateSide;
    path = key ? `${field.repeatKind}.${field.repeatIndex}.${key}` : datePart
      ? `${field.repeatKind}.${field.repeatIndex}.${field.dateSide}.${label}` : undefined;
  }
  if (field.type === 'file') {
    path = /cover\s*letter/i.test(label) ? 'attachments.cover_letter'
      : /resume|\bcv\b/i.test(label) ? 'attachments.resume' : undefined;
  }
  if (path && known(nested(profile, path))) return { value: nested(profile, path), source: path };
  if (['full name', 'name'].includes(label) && profile.personal?.first_name && profile.personal?.last_name) {
    return { value: `${profile.personal.first_name} ${profile.personal.last_name}`, source: 'derived-name', derived: true };
  }
  return { reason: 'missing explicit answer' };
}

export async function generatePlan(scan, profile, { url = scan.url } = {}) {
  const fills = [], unmapped = [], skipped = [];
  for (const field of scan.fields) {
    if (field.trap || field.type === 'password') { skipped.push({ key: field.key, reason: 'trap or credential' }); continue; }
    if (field.consent) { unmapped.push({ ...field, reason: 'human agreement required' }); continue; }
    const answer = answerFor(field, profile, url);
    if (!known(answer.value)) { unmapped.push({ ...field, reason: answer.reason || 'unknown' }); continue; }
    let value = answer.value;
    if (Array.isArray(value) && !field.multiple) {
      unmapped.push({ ...field, reason: 'multiple answers for a single or unverified control' }); continue;
    }
    if (field.options?.length && field.type !== 'checkbox') {
      const matches = (Array.isArray(value) ? value : [value]).map(v => matchOption(v, field.options, field));
      if (matches.some(m => !m.option)) { unmapped.push({ ...field, reason: 'option absent or ambiguous' }); continue; }
      value = field.multiple ? matches.map(m => m.option.value) : matches[0].option.value;
    }
    let fileHash;
    if (field.type === 'file') { try { fileHash = hash((await readFile(value)).toString('base64')); } catch { unmapped.push({ ...field, reason: 'attachment unreadable' }); continue; } }
    fills.push({ ...field, value, fileHash, source: answer.source, derived: !!answer.derived });
  }
  const groupIssues = [];
  if (scan.documents?.some(d => d.headings.some(h => /^my experience$/i.test(h)))) {
    for (const kind of ['experience', 'education', 'certifications']) {
      const desired = Array.isArray(profile[kind]) ? profile[kind].length : 0;
      const present = new Set(scan.fields.filter(f => f.repeatKind === kind).map(f => f.repeatIndex)).size;
      if (present < desired) groupIssues.push({ reason: 'configured records not discovered; add or map groups manually', group: kind, expected: desired, observed: present });
    }
  }
  return { url, fills, unmapped, skipped, groupIssues };
}
