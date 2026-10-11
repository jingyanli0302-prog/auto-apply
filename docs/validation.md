# Validation and iteration record

Date: 2026-10-11, America/Los_Angeles. Local Windows, Node v24.21.0.
Tests use Node's built-in runner and existing Playwright Chromium, headed, with local HTTP fixtures.
No real job URL was opened or submitted during implementation validation. No new dependency or
OpenAI API was introduced. Existing private profile.yml/resumes.yml were not modified.

| Final command | Result |
| --- | --- |
| `npm.cmd test` (`node --test`) | 33 passed, 0 failed, 0 skipped: 13 unit tests + 20 DOM/workflow tests |
| `npm.cmd run check` | Syntax checks passed for 18 JavaScript modules |
| `git diff --check` | Passed; only Windows LF/CRLF conversion notices |
| `node cli.mjs help` | Passed; Review, resume, check and evidence-based manual resolution commands displayed |

Standalone `npm.cmd run test:unit` and `npm.cmd run test:dom` were also run while developing.
The final full run includes all subsequently added regression cases. No pre-existing test suite,
lint configuration, TypeScript configuration or build script existed; none was replaced by an
invented successful lint/type/build claim. PowerShell blocked npm.ps1 under the current execution
policy; using npm.cmd worked without changing machine policy.

Coverage includes all 12 sample/evidence associations; Workday conditional former worker and
country fields, multi-step guest workflow, multiple work/education records and segmented dates;
Greenhouse frame-local discovery and required Resume/Cover Letter; Ashby asynchronous parser,
visible button answers and exact location/date interaction; Lever native required validation,
parser Success and recurring captcha; generic dates, attachments, dynamic fields and honeypots.
Workflow tests cover serial execution even for concurrent API calls, paused-tab retention and
next-task scheduling, ID resume/rescan, restart recovery, Review filtering, value-change-back and
reload approval invalidation, no unapproved Submit, insufficient success evidence, network
failure without retries, positive success evidence, account preparation/login and a manually
evidenced return from uncertain to a fresh Review.

Issues found and corrected during implementation:

- Old planner supplied Mobile/No/Job Boards and automatically agreed to terms; removed.
- Old submit loop could click three times and treat absence of errors as success; removed.
- Old per-command browsers could discard a human-paused page; replaced by one session with task tabs.
- Labels wrapping SELECT included all option text, breaking exact field mapping; label extraction
  now excludes nested controls/options.
- Screenshot DOM adjustments could invalidate a Review immediately; evidence is captured before
  generating the final page snapshot/fingerprint.
- Wizard pages can reuse identical structural paths/IDs for different questions; semantic field
  keys now include label/group/repeat/date identity.
- A reload could reset DOM revision counters; per-document identities now invalidate prior approval.
- Optional empty repeated sections could silently omit configured records; missing group coverage
  now appears in Review.
- An array supplied to a single-select could silently collapse to its first answer; now ambiguous.
- A unit assertion initially counted ten statuses rather than the specified nine; corrected.
- A nested test hook initially removed a parent temporary directory; scenario checks now use a
  single scoped test lifecycle. Both test-harness failures were resolved before the final run.

Remaining uncertainty is recorded in coverage.md and runtime task histories: no production
confirmation contract, application ID/email/portal/duplicate workflow or server-side draft
recovery has been certified. Hierarchical or unmatched controls, unsupported branch layouts and
all agreement/captcha/OTP steps are explicit human fallbacks. Fixture success pages are synthetic
contracts rather than observations from research. They must not be presented as live ATS results.
