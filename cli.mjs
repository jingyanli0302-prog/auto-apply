#!/usr/bin/env node
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';
import { TaskStore } from './lib/tasks.mjs';
import { ApplicationSession } from './lib/session.mjs';
import { loadProfile, pickResume } from './lib/planner.mjs';
import { loadQueue, updateQueueStatus } from './lib/reporter.mjs';

const [command = 'help', ...args] = process.argv.slice(2);
const root = dirname(fileURLToPath(import.meta.url));
async function env() {
  if (!existsSync('.env')) return;
  for (const line of (await readFile('.env', 'utf8')).split(/\r?\n/)) {
    const match = line.match(/^([A-Z_][A-Z_0-9]*)=(.*)$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
}
async function profile() {
  const value = await loadProfile(); value.attachments ||= {};
  if (!value.attachments.resume && existsSync('config/resumes.yml')) value.attachments.resume = await pickResume();
  return value;
}
function print(task) {
  console.log(`${task.id}  ${task.state}  ${task.company || ''}  ${task.url}`);
  if (task.blocker) console.log(`  Human action: ${task.blocker}`);
  if (task.review) {
    console.log(JSON.stringify(task.review.items, null, 2));
    console.log(`Review fingerprint: ${task.review.fingerprint}`);
    console.log(task.review.final ? `Approve: approve ${task.id} ${task.review.fingerprint}` : 'Intermediate step: resolve issues or approve this Review to continue.');
  }
}
async function main() {
  await env();
  if (command === 'setup') {
    await mkdir('config', { recursive: true });
    for (const name of ['profile', 'resumes']) if (!existsSync(`config/${name}.yml`)) await writeFile(`config/${name}.yml`, await readFile(resolve(root, `config/${name}.example.yml`)));
    console.log('Edit config/profile.yml; blank values stay unknown. Configure account environment references if needed.'); return;
  }
  if (!['apply', 'fill', 'batch', 'resume', 'review', 'check', 'resolve', 'scan', 'queue', 'status', 'list'].includes(command)) {
    console.log(`auto-apply: human-reviewed applications (no API)
setup | apply <url> | fill <url> | scan <url> | batch [targets.txt]
queue add <url> [company] | queue list | queue import-research | status | list
resume <task-id> | review <task-id> | check <task-id>
resolve <task-id> not-submitted <human-observed-evidence>
Browser commands: list, resume ID, review ID, approve ID FINGERPRINT,
submit ID, check ID, resolve ID not-submitted EVIDENCE, quit.
Approve is valid only for the live reviewed page. No automatic resubmission.`); return;
  }
  const store = new TaskStore(); await store.lock();
  let session;
  try {
    await store.load();
    // Import legacy queued URLs once; past "submitted/applied" results lack trustworthy evidence.
    for (const entry of await loadQueue()) {
      if (store.tasks.some(t => t.url === entry.url)) continue;
      const task = store.add(entry.url, entry.company);
      if (entry.status !== 'pending' && entry.status !== 'queued') {
        task.state = 'uncertain'; store.event(task, 'legacy-import', { reason: 'Legacy result requires manual verification; no retry' });
      }
    }
    if (['status', 'list'].includes(command) || (command === 'queue' && args[0] === 'list')) { store.tasks.forEach(print); await store.save(); return; }
    if (command === 'queue') {
      if (args[0] === 'add') print(store.add(args[1], args.slice(2).join(' ')));
      else if (args[0] === 'import-research') {
        const samples = JSON.parse(await readFile(resolve(root, 'samples/research/sample-manifest.json'), 'utf8'));
        for (const sample of samples) print(store.add(sample.applyUrl, sample.company));
      } else throw new Error('Use queue add, list or import-research. Task history is retained.');
      await store.save(); return;
    }
    let ids = [];
    if (['apply', 'fill', 'scan'].includes(command)) {
      if (args.length !== 1) throw new Error('Expected one URL; legacy custom executable plans are disabled. Configure explicit profile answers.');
      ids = [store.add(args[0]).id];
    } else if (command === 'batch') {
      if (args[0]) for (const line of (await readFile(args[0], 'utf8')).split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith('#'))) store.add(line);
      ids = store.tasks.filter(t => t.state === 'queued').map(t => t.id);
    } else { store.get(args[0]); ids = [args[0]]; }
    await store.save(); session = await new ApplicationSession(store, profile).start();
    if (command === 'scan') {
      const task = store.get(ids[0]), page = await session.page(task);
      task.snapshot = await session.snapshot(page); print(task); await store.save();
    } else if (command === 'review') print(await session.review(ids[0]));
    else if (command === 'check') print(await session.check(ids[0]));
    else if (command === 'resolve') {
      if (args[1] !== 'not-submitted') throw new Error('Use resolve ID not-submitted EVIDENCE after check ID');
      print(await session.resolveUnsubmitted(ids[0], args.slice(2).join(' ')));
    }
    else for (const task of await session.batch(ids)) print(task);
    const sync = async () => { for (const task of store.tasks) await updateQueueStatus(task.url, task.state); };
    await sync();
    if (!process.stdin.isTTY) { console.log('Non-interactive run saved tasks without submitting. Use resume ID in a terminal.'); return; }
    const input = createInterface({ input: process.stdin, output: process.stdout });
    try {
      while (true) {
        let line;
        try { line = await input.question('application> '); } catch { break; }
        const [action, id, token, ...detail] = line.trim().split(/\s+/);
        if (action === 'quit' || action === 'exit') break;
        try {
          if (action === 'list') store.tasks.forEach(print);
          else if (action === 'resume') print(await session.run(id));
          else if (action === 'review') print(await session.review(id));
          else if (action === 'approve') { print(await session.approve(id, token)); if (store.get(id).state === 'filling') print(await session.run(id)); }
          else if (action === 'submit') print(await session.submit(id));
          else if (action === 'check') print(await session.check(id));
          else if (action === 'resolve' && token === 'not-submitted') print(await session.resolveUnsubmitted(id, detail.join(' ')));
          else console.log('list | resume ID | review ID | approve ID FINGERPRINT | submit ID | check ID | resolve ID not-submitted EVIDENCE | quit');
        } catch (error) { console.error(error.message); }
        await sync();
      }
    } finally { input.close(); }
  } finally { if (session) await session.close(); await store.unlock(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
