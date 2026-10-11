import { mkdir, readFile, writeFile, rename, open, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';

export const STATES = ['queued', 'filling', 'needs-human', 'needs-review', 'ready-to-submit', 'submitting', 'submitted', 'uncertain', 'failed'];
export const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const transitions = {
  queued: ['filling', 'needs-review', 'needs-human', 'failed'], filling: ['needs-human', 'needs-review', 'failed'],
  'needs-human': ['filling', 'needs-review', 'failed'], 'needs-review': ['filling', 'needs-human', 'ready-to-submit', 'failed'],
  'ready-to-submit': ['filling', 'needs-review', 'needs-human', 'submitting', 'failed'],
  submitting: ['submitted', 'uncertain'], uncertain: ['uncertain', 'submitted', 'needs-human'],
  submitted: [], failed: ['filling'],
};
export class TaskStore {
  constructor(directory = resolve('data')) { this.directory = directory; this.tasks = []; }
  async load() {
    await mkdir(this.directory, { recursive: true });
    try { this.tasks = JSON.parse(await readFile(resolve(this.directory, 'tasks.json'), 'utf8')).tasks; }
    catch (error) { if (error.code !== 'ENOENT') throw error; }
    for (const task of this.tasks) {
      if (task.state === 'submitting') this.transition(task, 'uncertain', 'restart during submission; check only');
      else if (['filling', 'ready-to-submit'].includes(task.state)) this.transition(task, 'needs-review', 'restart invalidated approval');
      task.approval = null; task.review = null;
    }
    await this.save(); return this;
  }
  async lock() {
    const path = resolve(this.directory, 'session.lock');
    await mkdir(this.directory, { recursive: true });
    try {
      this.lockHandle = await open(path, 'wx');
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      const pid = Number(await readFile(path, 'utf8'));
      try { process.kill(pid, 0); } catch (check) {
        if (check.code === 'ESRCH') { await unlink(path); return this.lock(); }
      }
      throw new Error('Another session owns tasks.json. Close that session before starting another.');
    }
    await this.lockHandle.writeFile(String(process.pid));
  }
  async unlock() { if (this.lockHandle) { await this.lockHandle.close(); await unlink(resolve(this.directory, 'session.lock')); this.lockHandle = null; } }
  get(id) { const task = this.tasks.find(t => t.id === id); if (!task) throw new Error(`Unknown task ID: ${id}`); return task; }
  add(url, company = '') {
    const parsed = new URL(url); if (!['https:', 'http:'].includes(parsed.protocol)) throw new Error('Expected HTTP(S) job URL');
    let task = this.tasks.find(t => t.url === url);
    if (!task) { task = { id: randomUUID(), url, company, state: 'queued', history: [], confirmed: {}, createdAt: new Date().toISOString() }; this.tasks.push(task); this.event(task, 'created', {}); }
    return task;
  }
  event(task, kind, details) { task.history.push({ at: new Date().toISOString(), kind, details }); task.updatedAt = new Date().toISOString(); }
  transition(task, state, reason) {
    if (task.state !== state && !transitions[task.state]?.includes(state)) throw new Error(`Invalid transition: ${task.state} -> ${state}`);
    const from = task.state; task.state = state;
    if (state !== 'ready-to-submit') task.approval = null;
    this.event(task, 'state', { from, to: state, reason });
  }
  async save() {
    const path = resolve(this.directory, 'tasks.json'), temporary = `${path}.${process.pid}.tmp`;
    await writeFile(temporary, JSON.stringify({ version: 2, tasks: this.tasks }, null, 2));
    await rename(temporary, path);
  }
}
