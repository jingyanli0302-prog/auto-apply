// All application operations now go through the persistent, review-gated session.
export { ApplicationSession } from './session.mjs';
export { fillField } from './adapters.mjs';
export async function fillForm(url, plan, { session, taskId } = {}) {
  if (!session || !taskId) throw new Error('Use ApplicationSession and a persistent task ID; legacy auto-submit is disabled');
  return session.run(taskId);
}
