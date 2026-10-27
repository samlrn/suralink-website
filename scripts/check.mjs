import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root = path.resolve('dist');
const files = ['index.html', 'privacy.html', 'app-privacy.html'];
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const [, href] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (/^(https?:|mailto:|data:)/.test(href)) continue;
    assert.ok(fs.existsSync(path.resolve(root, href.split('#')[0])), `${file}: missing ${href}`);
  }
  for (const [, href] of html.matchAll(/href="(#[^"]+)"/g)) assert.ok(html.includes(`id="${href.slice(1)}"`), `${file}: missing anchor ${href}`);
}
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appLinks = [...home.matchAll(/href="(https:\/\/apps.apple.com[^" ]+)"/g)];
assert.ok(appLinks.length >= 3, 'Expected clear App Store links');
assert.ok(appLinks.every(([, url]) => url === 'https://apps.apple.com/us/app/suralink/id6810389335'));
assert.ok(home.includes('Design preview'), 'Unreleased redesign must remain labeled');
assert.ok(home.includes('assets/social-card.png'), 'Social preview should use a raster image');
for (const [,url] of fs.readFileSync(path.join(root,'styles.css'),'utf8').matchAll(/url\(['"]?([^)'" ]+)/g)) assert.ok(fs.existsSync(path.resolve(root,url)), `Missing CSS asset ${url}`);
const social = fs.readFileSync(path.join(root,'assets/social-card.png'));
assert.equal(social.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
assert.equal(social.readUInt32BE(16),1200);
assert.equal(social.readUInt32BE(20),630);
const icon = fs.readFileSync(path.join(root,'assets/suralink-book-1024.png'));
assert.equal(icon.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
assert.equal(icon.readUInt32BE(16),1024);
assert.equal(icon.readUInt32BE(20),1024);
assert.ok(!/<(?:iframe|form)\b|googletagmanager|google-analytics|connect\.facebook/i.test(home), 'Review privacy disclosures before adding trackers, embeds or forms');
new vm.Script(fs.readFileSync(path.join(root, 'script.js'), 'utf8'));
console.log(`Website checks passed: assets, anchors, fonts, ${appLinks.length} App Store links, PNG previews and JavaScript syntax.`);
