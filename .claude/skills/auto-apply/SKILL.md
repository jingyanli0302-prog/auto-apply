---
name: auto-apply
description: Recoverable job application forms with required human Review and explicit approval
user_invocable: true
args: command
argument-hint: "[apply <url> | scan <url> | fill <url> | resume <id> | review <id> | check <id> | batch | queue | status | setup]"
---

# Human-reviewed applications

Run the local `node cli.mjs` commands documented in README.md. Apply/fill/batch prepare tasks
and stop for human Review. They never authorize final submission. Do not call legacy helpers,
manually set approval fields, accept agreements or infer missing answers.

Each task has a persistent ID. Keep the headed browser alive while the user completes captcha,
OTP, authentication or agreements. Continue other queued tasks serially, then resume by ID with
a fresh scan. Final submission requires the human to inspect Review and explicitly use
`approve ID CURRENT_FINGERPRINT`, followed by `submit ID` in the same browser session.
Page/answer changes or restart invalidate approval. Uncertain tasks require an explicit `check`,
then human-observed negative evidence via `resolve ID not-submitted EVIDENCE` before resume.
They must never be blindly retried. Accounts use user-provided tenant-scoped credentials.

Use `setup`, `apply URL`, `fill URL`, `scan URL`, `batch [file]`, `queue add URL [company]`,
`queue list`, `queue import-research`, `resume ID`, `review ID`, `check ID`, `status`, `list`.
Inside the interactive session use `list`, `resume`, `review`, `approve`, `submit`, `check`, `quit`.
Unobserved research branches are manual as listed in docs/coverage.md.
