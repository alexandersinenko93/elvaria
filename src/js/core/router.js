/**
 * ELVARIA Router & History State Manager
 */
let CURR = null;
let NAVLIST = null;
let RETURN_TO = null;
let RETURN_Y = null;
let FROM_HASH = false;

const VIEWS = ['dash', 'wiz', 'plan', 'anhang'];
const BASETITLE = 'Elvaria · Interaktiver Businessplan';

function getOrder() {
  const pList = (typeof P !== 'undefined' && Array.isArray(P)) ? P : [];
  const iList = (typeof I !== 'undefined' && Array.isArray(I)) ? I : [];
  const noList = (typeof NOGO !== 'undefined' && Array.isArray(NOGO)) ? NOGO : [];
  return [
    ...pList.map(p => ({ kind: 'p', id: p.id, n: p.n })),
    ...iList.map((x, i) => ({ kind: 'i', id: i, n: x.t })),
    ...noList.map((x, k) => ({ kind: 'n', id: k, n: x.t }))
  ];
}

function readHash() {
  const h = (location.hash || '').replace(/^#\/?/, '');
  if (!h) return { v: 'dash' };
  if (h.indexOf('p/') === 0) return { v: 'detail', kind: 'p', id: h.slice(2) };
  if (h.indexOf('i/') === 0) return { v: 'detail', kind: 'i', id: +h.slice(2) };
  if (h.indexOf('n/') === 0) return { v: 'detail', kind: 'n', id: +h.slice(2) };
  if (VIEWS.indexOf(h) > -1) return { v: h };
  if (h === 'wiz' || h === 'assistent') return { v: 'wiz' };
  if (h === 'plat' || h === 'ideen' || h === 'faq') return { v: 'anhang', pane: h };
  return { v: 'dash' };
}

function setHash(h, replace) {
  try {
    if (location.hash === h) return;
    if (replace) location.replace(h);
    else location.hash = h;
  } catch(e) {}
}

function applyState() {
  const s = readHash();
  FROM_HASH = true;
  try {
    if (s.v === 'detail') openDetail(s.kind, s.id);
    else showView(s.v, true, s.pane);
  } finally {
    FROM_HASH = false;
  }
}

function showView(v, fromHash, pane) {
  if (v === 'plat' || v === 'ideen' || v === 'faq') {
    const p = v;
    if (VIEWS.indexOf(p) < 0) { pane = p; v = 'anhang'; }
  }
  if (VIEWS.indexOf(v) < 0) v = 'dash';
  if (v === 'anhang' && pane && typeof setAnhang === 'function') setAnhang(pane);

  const hl = v;
  const mark = x => {
    const on = x.dataset.v === hl;
    x.classList.toggle('on', on);
    x.setAttribute('aria-current', on ? 'page' : 'false');
  };

  const detailEl = $('#v-detail');
  const targetView = $('#v-' + v);

  if (detailEl && !detailEl.classList.contains('on') && targetView && targetView.classList.contains('on')) {
    $$('#hnav button[data-v]').forEach(x => x.setAttribute('aria-current', x.dataset.v === hl ? 'page' : 'false'));
    return;
  }

  $$('.view').forEach(x => x.classList.remove('on'));
  if (detailEl) detailEl.classList.remove('on');
  if (targetView) targetView.classList.add('on');

  const hero = $('#hero');
  if (hero) hero.style.display = v === 'dash' ? 'block' : 'none';

  document.body.classList.remove('pd');
  $$('#hnav button[data-v]').forEach(mark);
  CURR = null;
  NAVLIST = null;
  document.title = BASETITLE;

  const og = $('#ogT');
  if (og) og.setAttribute('content', BASETITLE);

  if (v === 'dash' && typeof renderDash === 'function') renderDash();
  if (v === 'plan' && typeof renderPlan === 'function') renderPlan();
  if (v === 'wiz' && typeof renderWiz === 'function') renderWiz();
  if (v === 'anhang') {
    if (typeof renderP === 'function') renderP();
    if (typeof renderI === 'function') renderI();
    if (typeof renderFAQ === 'function') renderFAQ();
  }
  if (typeof refreshProgress === 'function') refreshProgress();

  if (!fromHash) setHash(v === 'dash' ? '#/dash' : '#/' + v);

  const y = (RETURN_TO === v && RETURN_Y !== null) ? RETURN_Y : 0;
  window.scrollTo({ top: y, behavior: 'auto' });
  RETURN_TO = null;
  RETURN_Y = null;

  if (typeof announce === 'function') {
    announce('Ansicht ' + ({ dash: 'Start', wiz: 'Assistent', plan: 'Businessplan', anhang: 'Anhang' }[v] || 'Start'));
  }
}
