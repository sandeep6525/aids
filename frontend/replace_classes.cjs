const fs = require('fs');
const path = require('path');

const replacements = {
  'btn-gold': 'btn-primary',
  'text-navy': 'text-brand-primary',
  'bg-navy-light': 'bg-brand-secondary',
  'bg-navy': 'bg-brand-primary',
  'text-gold': 'text-brand-accent',
  'bg-gold': 'bg-brand-accent',
  'border-gold': 'border-brand-accent',
  'light-gold': 'brand-accent-light',
  'bg-cream': 'bg-bg-main',
  'text-muted': 'text-text-secondary',
  'border-border': 'border-border-subtle'
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = walkDir(path.join(__dirname, 'src'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const [oldClass, newClass] of Object.entries(replacements)) {
    // Replace whole words to avoid partial matches
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newClass);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log('Done');
