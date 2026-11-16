/**
 * ELVARIA Router & Subpage State Manager
 * Seamless SPA transitions between views without full-page reloads
 */
let CURR = null;
let NAVLIST = null;
let RETURN_TO = null;
let RETURN_Y = null;
let FROM_HASH = false;

const VIEWS = ['dash', 'wiz', 'plan', 'anhang', 'detail'];
const BASETITLE = 'Elvaria · Interaktiver Businessplan';

function readHash() {
  const h = (location.hash || '').replace(/^#\/?/, '').trim();
  if (!h || h === 'start' || h === 'dash') return { v: 'dash' };
  if (h === 'fahrplan' || h === 'roadmap') return { v: 'dash', tab: 'roadmap' };
  if (h === 'assistent' || h === 'wiz') return { v: 'wiz' };
  if (h === 'businessplan' || h === 'plan') return { v: 'plan' };
  if (h === 'anhang' || h === 'plat' || h === 'ideen' || h === 'faq') return { v: 'anhang', pane: h };
  if (h.startsWith('detail')) {
    const params = new URLSearchParams(h.split('?')[1] || '');
    return { v: 'detail', kind: params.get('kind') || 'p', id: params.get('id') || 'ev' };
  }
  if (h.startsWith('p/')) return { v: 'detail', kind: 'p', id: h.slice(2) };
  if (h.startsWith('i/')) return { v: 'detail', kind: 'i', id: +h.slice(2) };
  return { v: 'dash' };
}

function setHash(h, replace) {
  try {
    if (location.hash === h) return;
    if (replace) location.replace(h);
    else location.hash = h;
  } catch(e) {}
}

function showView(v, fromHash, pane) {
  const aliasMap = {
    start: 'dash', dash: 'dash',
    assistent: 'wiz', wiz: 'wiz',
    businessplan: 'plan', plan: 'plan',
    anhang: 'anhang', plat: 'anhang', ideen: 'anhang', faq: 'anhang',
    detail: 'detail'
  };
  const normV = aliasMap[v] || 'dash';
  if (v === 'plat' || v === 'ideen' || v === 'faq') pane = v;

  // 1. Navigation Active States
  $$('#hnav [data-v], #hnav [data-sub]').forEach(btn => {
    const bv = aliasMap[btn.dataset.v || btn.dataset.sub] || 'dash';
    const on = bv === normV;
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-current', on ? 'page' : 'false');
  });

  // 2. Hide all views & subpages, reveal target view
  $$('.view, .subpage').forEach(sec => sec.classList.remove('on'));
  const target = $('#v-' + normV) || $('#sub-' + normV);
  if (target) target.classList.add('on');

  // 3. Hero Visibility: only visible on Start/Dashboard
  const hero = $('#hero');
  if (hero) hero.style.display = normV === 'dash' ? 'block' : 'none';

  document.body.classList.remove('pd');

  // 4. Render contents for target view
  if (normV === 'dash') {
    if (typeof renderDash === 'function') renderDash();
    if (typeof renderRoadmapView === 'function') renderRoadmapView();
  }
  if (normV === 'wiz' && typeof renderWiz === 'function') renderWiz();
  if (normV === 'plan' && typeof renderPlan === 'function') renderPlan();
  if (normV === 'anhang') {
    if (typeof renderP === 'function') renderP();
    if (typeof renderI === 'function') renderI();
    if (typeof renderFAQ === 'function') renderFAQ();
    if (pane && typeof setAnhang === 'function') setAnhang(pane);
  }
  if (typeof refreshProgress === 'function') refreshProgress();

  // 5. Update Hash & Title
  const titles = {
    dash: 'Start & Übersicht',
    wiz: 'Assistent (4 Min)',
    plan: 'Businessplan & Rechner',
    anhang: 'Anhang & Kanäle',
    detail: 'Detail & Tutorial'
  };
  document.title = `Elvaria · ${titles[normV] || 'Businessplan'}`;

  if (!fromHash) {
    const hash = (normV === 'dash') ? '#/start' : '#/' + (normV === 'wiz' ? 'assistent' : normV === 'plan' ? 'businessplan' : normV);
    setHash(hash);
  }

  const y = (RETURN_TO === normV && RETURN_Y !== null) ? RETURN_Y : 0;
  window.scrollTo({ top: y, behavior: 'auto' });
  RETURN_TO = null;
  RETURN_Y = null;
}

function showSubpage(page, fromHash, extra) {
  if (page === 'detail' && extra && typeof openDetail === 'function') {
    openDetail(extra.kind, extra.id);
    return;
  }
  showView(page, fromHash, extra ? extra.pane : null);
}

function applyState() {
  const s = readHash();
  FROM_HASH = true;
  try {
    if (s.v === 'detail') {
      if (typeof openDetail === 'function') openDetail(s.kind, s.id);
    } else {
      showView(s.v, true, s.pane);
      if (s.tab && typeof switchDashTab === 'function') switchDashTab(s.tab);
    }
  } finally {
    FROM_HASH = false;
  }
}

// Global click delegation for all view, subpage, wizard, and scroll triggers
document.addEventListener('click', e => {
  const w = e.target.closest('[data-wiz]');
  if (w) { e.preventDefault(); showView('wiz'); return; }

  const v = e.target.closest('[data-view]');
  if (v) {
    e.preventDefault();
    showView(v.dataset.view);
    if (v.dataset.scroll) {
      setTimeout(() => {
        const el = $('#pl-' + v.dataset.scroll);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
    return;
  }

  const s = e.target.closest('[data-sub]');
  if (s) { e.preventDefault(); showView(s.dataset.sub); return; }

  const nv = e.target.closest('[data-v]');
  if (nv && !nv.closest('#hnav')) { e.preventDefault(); showView(nv.dataset.v); return; }
});

window.addEventListener('hashchange', applyState);
