/**
 * ELVARIA Business Plan — Modular Unified Plan
 * Source files located in src/js/data/ (plan_model.js, plan_chapters.js, plan_wizard.js)
 */
if (typeof require !== 'undefined') {
  const fs = require('fs');
  const path = require('path');
  const dir = path.join(__dirname, 'src', 'js', 'data');
  const model = fs.readFileSync(path.join(dir, 'plan_model.js'), 'utf8');
  const chapters = fs.readFileSync(path.join(dir, 'plan_chapters.js'), 'utf8');
  const wizard = fs.readFileSync(path.join(dir, 'plan_wizard.js'), 'utf8');
  module.exports = { model, chapters, wizard };
}
