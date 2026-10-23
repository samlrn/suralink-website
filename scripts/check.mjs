import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root = path.resolve('dist');
for (const file of ['index.html', 'privacy.html', 'app-privacy.html']) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    assert.ok(fs.existsSync(path.resolve(root, href.split('#')[0])), `${file}: missing ${href}`);
  }
}
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appLinks = [...home.matchAll(/href="(https:\/\/apps.apple.com[^" ]+)"/g)];
assert.ok(appLinks.length >= 3, 'Expected clear App Store links');
assert.ok(appLinks.every(([, url]) => url === 'https://apps.apple.com/us/app/suralink/id6810389335'));
new vm.Script(fs.readFileSync(path.join(root, 'script.js'), 'utf8'));
console.log(`Website checks passed: local assets, ${appLinks.length} App Store links, JavaScript syntax.`);
