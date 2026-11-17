/**
 * ELVARIA Core Store & Utilities
 */
const mem = {};
const store = {
  get(k) { try { const v = localStorage.getItem(k); if (v !== null) return v; } catch (e) {} return mem[k] !== undefined ? mem[k] : null; },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} mem[k] = v; }
};
let DONE = {};
try { DONE = JSON.parse(store.get('elvaria-done') || '{}'); } catch (e) { DONE = {}; }
function saveDone() { store.set('elvaria-done', JSON.stringify(DONE)); }

function doneCount() {
  return Object.keys(DONE).reduce((a, k) => a + progOf(k, (DONE[k] || []).length), 0);
}
function progOf(id, len) {
  const arr = DONE[id];
  if (!arr) return 0;
  return Array.isArray(arr) ? arr.filter(Boolean).length : 0;
}

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

function announce(m) { const a = $('#announce'); if (a) a.textContent = m; }
let toastT = null;
function toast(m) {
  const t = $('#toast'); if (!t) return;
  t.textContent = m; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2300);
}

function copyText(str, msg) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(() => toast(msg || 'In die Zwischenablage kopiert'));
    } else {
      const ta = document.createElement('textarea');
      ta.value = str;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast(msg || 'In die Zwischenablage kopiert');
    }
  } catch (e) {
    toast('Kopieren fehlgeschlagen');
  }
}

function syncChips() { $$('.chip').forEach(c => c.setAttribute('aria-pressed', c.classList.contains('on') ? 'true' : 'false')); }

/* ── QUERVERWEISE: Idee ↔ Plattform ── */
const REL = {
  0: ['ev', 'wu', 'at', 'rh'],
  1: ['ev', 'gy', 'gk'],
  2: ['ev', 'gk', 'js'],
  3: ['gk', 'js', 'ev'],
  4: ['gk', 'gy', 'ev'],
  5: ['ev', 'gk'],
  6: ['ev', 'cb'],
  7: ['ev', 'gk'],
  8: ['cb', 'ed', 'px', 'gv'],
  9: ['gk', 'ev'],
  10: ['ev', 'cb'],
  11: ['ev', 'cb']
};
const RELP = {};
Object.keys(REL).forEach(k => REL[k].forEach(pid => { (RELP[pid] = RELP[pid] || []).push(+k); }));

function relItems(kind, id) {
  const out = [];
  if (kind === 'i') {
    (REL[+id] || []).forEach(pid => {
      const p = (window.P || []).find(x => x.id === pid);
      if (p) out.push({ k: 'p', id: p.id, n: p.n, s: 'Plattform · ' + p.dauer, t: 'Plattform' });
    });
  } else if (kind === 'p') {
    (RELP[id] || []).forEach(i => {
      const it = (window.I || [])[i];
      if (it) out.push({ k: 'i', id: i, n: it.t, s: 'Konzept · ' + it.cat, t: 'Yoga + X' });
    });
  }
  return out.slice(0, 4);
}

function paintRel(kind, id) {
  const items = relItems(kind, id);
  const box = $('#dRel');
  if (!box) return;
  if (!items.length) { box.innerHTML = ''; return; }
  box.innerHTML = `
    <div class="dt-rel-head">Empfohlene Ergänzung</div>
    <div class="dt-rel-grid">
      ${items.map(o => `
        <button class="dt-rel-card" onclick="openDetail('${o.k}', '${o.id}')">
          <span class="dt-rel-type">${o.t}</span>
          <b>${o.n}</b>
          <span>${o.s} →</span>
        </button>
      `).join('')}
    </div>
  `;
}

function isStepDone(id) {
  const k = 'rm-' + id;
  return !!(DONE[k] && DONE[k][0]);
}

function toggleStep(id) {
  const k = 'rm-' + id;
  if (!Array.isArray(DONE[k])) DONE[k] = [];
  DONE[k][0] = !DONE[k][0];
  saveDone();
}

function roadmapDoneCount() {
  const steps = window.ROADMAP_STEPS || [];
  return steps.filter(s => isStepDone(s.id)).length;
}
