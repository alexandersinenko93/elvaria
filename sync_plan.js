/**
 * ELVARIA Business Plan Synchronization & Code Quality Checker
 * Run: node sync_plan.js --check
 */
const fs = require('fs');
const path = require('path');
const dir = __dirname;

const planFiles = [
  path.join(dir, 'src', 'js', 'data', 'plan_model.js'),
  path.join(dir, 'src', 'js', 'data', 'plan_chapters.js'),
  path.join(dir, 'src', 'js', 'data', 'plan_wizard.js')
];

let allOk = true;

// 1. Verify existence and syntax of all plan files
planFiles.forEach(fp => {
  if (!fs.existsSync(fp)) {
    console.error('FEHLER: Plan-Datei fehlt:', fp);
    allOk = false;
    return;
  }
  const code = fs.readFileSync(fp, 'utf8');
  const lines = code.split('\n').length;
  if (lines > 300) {
    console.error(`FEHLER: Datei ${path.basename(fp)} hat ${lines} Zeilen (Limit: 300)`);
    allOk = false;
  }
  try {
    new Function(code);
  } catch (err) {
    console.error(`SYNTAX-FEHLER in ${path.basename(fp)}:`, err.message);
    allOk = false;
  }
});

// 2. Verify index.html contains references to modular scripts
const htmlPath = path.join(dir, 'index.html');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  ['plan_model.js', 'plan_chapters.js', 'plan_wizard.js'].forEach(ref => {
    if (!html.includes(ref)) {
      console.error(`FEHLER: index.html bindet ${ref} nicht ein`);
      allOk = false;
    }
  });
} else {
  console.error('FEHLER: index.html fehlt');
  allOk = false;
}

if (!allOk) {
  console.error('Prüfung fehlgeschlagen.');
  process.exit(1);
}

console.log('synchron: Alle Plan-Module und Dateien validiert (unter 300 Zeilen, 0 Syntaxfehler).');
process.exit(0);
