export const normalize = value => String(value).normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
const country = ['us', 'usa', 'united states', 'united states of america'];
const decline = ['i prefer not to answer', 'i do not want to answer', 'decline to self-identify'];
export function matchOption(answer, options, field = {}) {
  const target = normalize(answer);
  const candidates = options.map(o => typeof o === 'string' ? { text: o, value: o } : o);
  let matches = candidates.filter(o => normalize(o.text) === target || normalize(o.value) === target);
  if (!matches.length && !field.consent) {
    const aliases = /^(country)$/i.test(field.label || '') ? country
      : /^(gender|race|ethnicity|veteran( status)?|disability( status)?|hispanic( or latino)?)$/i.test(field.label || '') ? decline : [];
    if (aliases.includes(target)) matches = candidates.filter(o => aliases.includes(normalize(o.text)));
  }
  return matches.length === 1 ? { option: matches[0] } : { reason: matches.length ? 'ambiguous' : 'not-found' };
}
