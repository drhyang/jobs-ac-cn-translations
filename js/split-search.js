// js/split-search.js
// Rebuilds per-slug JSON whenever zh-cn/search.json changes.
// Run from repo root: node js/split-search.js

const fs = require('fs');
const path = require('path');

// Resolve paths relative to repo root (cwd), not to this file
const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'zh-cn', 'search.json');
const OUT_DIR = path.join(ROOT, 'zh-cn', 'search');

const data = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));

// Clean old output to avoid orphan files
if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [slug, cat] of Object.entries(data)) {
  fs.writeFileSync(
    path.join(OUT_DIR, `${slug}.json`),
    JSON.stringify(cat)
  );
}

console.log(`Done. ${Object.keys(data).length} files written to ./zh-cn/search/`);
