import { normalize } from './answers.mjs';

// Opt-in user facts, never global application defaults. Match affirmative question
// templates only; government disclosures and negative/compound questions stay manual.
export function companyRelationshipQuestion(text) {
  const label = normalize(text).replace(/[✱*]/g, '').replace(/^description:\s*/, '').trim();
  if (/government|public official|politic|military|客户|政府|公务|竞争对手|competitor|customer|client/.test(label)) return null;
  const question = label.split('?')[0].trim();
  if (/\b(?:and|or) (?:do you|have you|are you|will you|does|is your)\b/.test(question)) return null;
  if (/^have you (?:ever |previously )?worked here(?: before| in the past)?$/.test(question)) return 'previously_employed';
  if (/^(?:have you (?:ever |previously )?(?:worked (?:for|at)|been employed by) .+|were you (?:previously )?employed (?:by|at) .+)$/.test(question) &&
      !/\b(?:not|never|no longer|outside|another|other companies|any company)\b/.test(question)) return 'previously_employed';
  if (/^(?:are you a (?:former|previous) (?:employee|worker) (?:of|at) .+|have you (?:ever )?been (?:a |an )?(?:employee|contractor) (?:of|at|for) .+)$/.test(question)) return 'previously_employed';
  if (/^do you have (?:any )?(?:relatives?|family members?) (?:who (?:currently )?(?:work|works|are employed|is employed)|(?:currently )?(?:working|employed)) (?:at|for|by|with) .+$/.test(question)) return 'relatives_employed';
  if (/^are (?:any of )?your (?:relatives?|family members?) (?:currently )?(?:employed|working) (?:at|for|by|with) .+$/.test(question)) return 'relatives_employed';
  if (/^do (?:any of )?your (?:relatives|family members) (?:currently )?work (?:at|for|with) .+$/.test(question)) return 'relatives_employed';
  if (/^(?:你|您)(?:是否|有没有|有无)(?:有)?(?:任何)?(?:亲戚|亲属|家属|家庭成员)(?:目前|现在)?(?:在|受雇于).+(?:工作|任职|就职)[？?]?$/.test(label)) return 'relatives_employed';
  if (/^(?:你|您)(?:以前|曾经|此前)?(?:是否|有没有|有无)(?:曾经|以前)?(?:在|受雇于).+(?:工作|任职|就职)过[？?]?$/.test(label)) return 'previously_employed';
  return null;
}

export function companyRelationshipAnswer(field, profile) {
  const kind = companyRelationshipQuestion(field.label);
  // Only an explicit No is supported by these reusable negative assertions.
  // Blank values and unrelated answers have no fallback.
  if (!kind || normalize(profile.company_relationships?.[kind]) !== 'no') return null;
  return { value: field.type === 'checkbox' ? false : 'No', source: `company_relationships.${kind}` };
}
