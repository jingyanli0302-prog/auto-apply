# Research coverage and manual fallbacks

Scope: the 12 entries in `samples/research/sample-manifest.json`, researched 2026-10-11.
Sources: research-summary, flow-patterns, control-patterns, ats-comparison, field-inventory.csv,
all 12 company reports and unobserved-flows. The research did not submit a real application.
Research AX snapshots are not HTML source; fixtures reconstruct observed behaviours and explicitly
do not claim production DOM equivalence or live end-to-end certification.

| Sample | Observed flow represented in discovery/scanner/fixtures | Manual boundary |
| --- | --- | --- |
| NVIDIA | Manual entry, account gate, Information/Experience/Questions/Disclosures, multiple groups and dates | Registration agreements/OTP; disclosure terms; Review itself unobserved |
| Adobe | Manual guest entry; Next wizard, initially existing groups, current work hides To, Review | Hierarchical source/large menus when unique exact option unavailable; terms; certification layouts not uniquely recognized |
| Salesforce | Account gate, Save and Continue, former worker conditional fields, optional sections with required records, Review | Government/export/sponsorship Yes branches unverified; veteran list without usable option role; agreements |
| Anthropic | Hosted Greenhouse form, attachments, dropdowns, inline/native validation scan | AI/arbitration; manual resume alternative and LinkedIn-only validation unverified; cloud upload |
| Figma | Hosted form, Hispanic No reveals Race, exact dropdown choices and dynamic rescan | Optional MyGreenhouse/security code/social login; Autofill unverified; location ambiguity |
| Airbnb | Application tab / Greenhouse frame, frame-local fields/errors, required Resume and Cover Letter | AI/privacy agreements; three-way sponsorship branches unverified |
| Notion | Application entry, parser busy/settled, parser values rescanned, visible Yes/No buttons, summary errors | Anchor Days/user facts need exact provided answers; source checkbox multi-select must be individually explicit |
| Ramp | Application, exact location candidates, button answers, custom free text | Encoded anti-automation challenge and security explanation; SMS agreement; no generated code/answer |
| OpenAI | Ashby Application, text/calendar date, button sponsorship answers | Arbitration/truthfulness; 180-day limit handling; parser and valid submission unverified |
| Palantir | Lever apply entry, native select, unnamed question association, repeated captcha handoff | Ambiguous university branches; Other/languages specifics; post-captcha business validation unverified |
| Zoox | Lever apply entry, Custom pronouns dynamic field, native menus, captcha handoff | Export countries/status dates require exact user-written answer; post-captcha validation unverified |
| Veeva | Lever native required validation, parser busy/Success distinguished from application success | Safe sender confirmation/contact agreement; valid post-parse submit/captcha unverified |

The automatic engine accepts only exact stable basic labels or user-configured full question text,
with optional URL/group/id constraints. Facts such as work authorization/government/office are
available in the example schema and only used through explicitly configured `value_ref` mappings.
This intentionally prevents interpreting two differently worded Yes/No questions as the same fact.
Repeated groups use observed group identity and array position; only a unique scoped Add control
is used. Unknown group structure, hierarchy, multi-select custom controls, an unmatched list role,
or ambiguous options remain visible as Review issues for manual entry. Native multiple-select and
individually configured checkboxes are supported. Segmented dates use group From/To and entry
identity, not a global Year selector. Calendar text uses supplied text; unverified formats remain
subject to page validation and human Review.

All unobserved Workday Autofill/Last Application/social/forgot-password/email-verification/draft
relogin branches remain manual. Cross-country/address permutations, invalid/reversed dates,
large-dictionary pagination, attachment size/type/virus errors, application limits, all additional
conditional questions, rejection/withdrawal/duplicate handling and post-submit application IDs or
email/portal workflows are not certified. New visible fields are rescanned and logged; absent
user facts never get a generated/default answer. Unknown pages or failed transitions pause.

In-memory tabs survive a human pause. A process restart reopens original job URLs and rechecks;
it does not assert server-side draft restoration. Review is mandatory even for fully mapped forms.
The fingerprint includes the complete current read-only Workday Review text and current form
state. DOM revisions invalidate approvals even if a value is changed back. Only a unique final
Submit is clickable through the guarded session. A crash after submit intent always becomes
uncertain; check is observational and cannot trigger submit. Only after an explicit requested check,
the user may record `resolve ID not-submitted EVIDENCE` with external portal/email observations.
This manual resolution returns the task to needs-human without submitting; resume must scan,
Review and obtain new final approval. The engine never invents negative submission evidence.

Structured incident history in tasks.json records state transitions, blockers, new fields,
mapping/fill failures, changed answers, Review issues, page/runtime/network errors and uncertain
outcomes, with timestamps and task IDs. Screenshot failures are incidents too. Request payloads,
cookies and credential values are excluded. Snapshot and screenshot files may still contain
personal application information and must remain local/ignored. Existing learner/OTP helpers
are retained for compatibility but are not imported by the new session/CLI.

Reproducible tests: `test/fixtures/scenarios.json` links each sample to an original evidence file,
a reconstructed DOM fixture and its manual boundaries. `test/dom.test.mjs` uses local HTTP and
headed Chromium; it never opens research job URLs. Explicit success fixtures model a conservative
confirmation contract, not a confirmation observed in the research. Real production submission
requires further controlled, individually approved validation.
