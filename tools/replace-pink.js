const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'dress-page', 'src');
const exts = ['.jsx', '.js', '.tsx', '.ts'];

const replacements = [
  [/\bfocus:ring-pink-500\b/g, 'focus:ring-blue-500'],
  [/\bring-pink-600\b/g, 'ring-blue-600'],
  [/\bring-pink-500\b/g, 'ring-blue-500'],
  [/\bbg-pink-600\b/g, 'bg-blue-600'],
  [/\bbg-pink-500\b/g, 'bg-blue-500'],
  [/\bbg-pink-50\b/g, 'bg-blue-50'],
  [/\bbg-pink-100\b/g, 'bg-blue-100'],
  [/\bto-pink-600\b/g, 'to-blue-600'],
  [/\bfrom-pink-600\b/g, 'from-blue-600'],
  [/\bto-pink-700\b/g, 'to-blue-700'],
  [/\bfrom-pink-700\b/g, 'from-blue-700'],
  [/\bto-pink-500\b/g, 'to-blue-500'],
  [/\bfrom-pink-500\b/g, 'from-blue-500'],
  [/\btext-pink-500\b/g, 'text-blue-500'],
  [/\bring-pink-300\b/g, 'ring-blue-300'],
  [/\bhover:border-pink-300\b/g, 'hover:border-blue-300'],
  [/\bborder-pink-300\b/g, 'border-blue-300'],
  [/\btext-pink-600\b/g, 'text-blue-600'],
  [/\btext-pink-700\b/g, 'text-blue-700'],
  [/\bborder-pink-600\b/g, 'border-blue-600'],
  [/\bhover:bg-pink-700\b/g, 'hover:bg-blue-700'],
  [/\bhover:bg-pink-600\b/g, 'hover:bg-blue-600'],
  [/\bhover:bg-pink-100\b/g, 'hover:bg-blue-100'],
  [/\bhover:border-pink-600\b/g, 'hover:border-blue-600'],
  [/\bborder-l-pink-600\b/g, 'border-l-blue-600'],
  [/\bpeer-checked:bg-pink-600\b/g, 'peer-checked:bg-blue-600'],
  [/\baccent-pink-500\b/g, 'accent-blue-500'],
  [/\bbg-pink-100\b/g, 'bg-blue-100'],
  [/\bhover:border-pink-600\b/g, 'hover:border-blue-600'],
  [/\btext-pink-700\b/g, 'text-blue-700'],
  [/\bbg-pink-100\b/g, 'bg-blue-100'],
  [/\bbg-pink-50\b/g, 'bg-blue-50'],
  [/\bhover:bg-pink-100\b/g, 'hover:bg-blue-100'],
  [/\bhover:border-pink-300\b/g, 'hover:border-blue-300'],
  [/\btext-pink-600\b/g, 'text-blue-600'],
  [/\bbg-pink-600\b/g, 'bg-blue-600'],
  [/\bbg-pink-500\b/g, 'bg-blue-500']
];

let filesChanged = 0;
let totalReplacements = 0;

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) {
      walk(p);
    } else if (exts.includes(path.extname(it.name))) {
      processFile(p);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  let fileReplacements = 0;

  for (const [pattern, repl] of replacements) {
    const before = content;
    content = content.replace(pattern, repl);
    if (content !== before) {
      const count = (before.match(pattern) || []).length;
      fileReplacements += count;
    }
  }

  if (fileReplacements > 0) {
    // write backup
    try {
      fs.writeFileSync(filePath + '.bak', original, 'utf8');
    } catch (e) {
      console.error('Failed to write backup for', filePath, e.message);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath} — ${fileReplacements} replacements`);
    filesChanged++;
    totalReplacements += fileReplacements;
  }
}

console.log('Scanning', root);
if (!fs.existsSync(root)) {
  console.error('Directory not found:', root);
  process.exit(1);
}
walk(root);
console.log(`Done. Files changed: ${filesChanged}. Total replacements: ${totalReplacements}`);
