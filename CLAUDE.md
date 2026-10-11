# Repository guidance

Use the persistent ApplicationSession workflow described in README.md.
Never introduce API-based answer generation, infer unknown answers, auto-accept agreements,
or submit without a human Review and explicit approval of the current fingerprint.
All browser automation is serial, Chromium is headed, and human-paused task tabs stay open.
Uncertain submission outcomes require check and explicit human evidence of non-submission
before resume; they must never be automatically retried or bypass fresh Review/approval.
Research evidence is in samples/research; unobserved branches must remain explicitly manual.
Run npm test and npm run check for application changes. No live applications during tests.
