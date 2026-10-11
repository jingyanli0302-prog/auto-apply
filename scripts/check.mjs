import { readdir } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
const files = ['cli.mjs'];
for (const dir of ['lib', 'scripts', 'test']) for (const file of await readdir(dir)) if (file.endsWith('.mjs')) files.push(`${dir}/${file}`);
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) { console.error(result.stderr); process.exitCode = 1; }
}
if (!process.exitCode) console.log(`Syntax checks passed: ${files.length} JavaScript modules. No lint/type/build toolchain is configured.`);
