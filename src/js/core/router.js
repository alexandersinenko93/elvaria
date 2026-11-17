/**
 * ELVARIA Router & Subpage State Manager
 * Seamless SPA transitions between views without full-page reloads
 */
let CURR = null;
let NAVLIST = null;
let RETURN_TO = null;
let RETURN_Y = null;
let FROM_HASH = false;

const VIEWS = ['konzept', 'plat', 'ideen', 'roadmap', 'detail'];
const BASETITLE = 'Elvaria · Yoga als Erlebnis';

function readHash() {
  const h = (location.hash || '').replace(/^#\/?/, '').trim();
  if (!h || h === 'start' || h === 'dash' || h === 'konzept') return { v: 'konzept' };
  if (h === 'fahrplan' || h === 'roadmap') return { v: 'roadmap' };
  if (h === 'plattformen' || h === 'plat') return { v: 'plat' };
  if (h === 'ideen' || h === 'yoga-x') return { v: 'ideen' };
  if (h.startsWith('detail')) {
    const params = new URLSearchParams(h.split('?')[1] || '');
    return { v: 'detail', kind: params.get('kind') || 'p', id: params.get('id') || 'ev' };
  }
  if (h.startsWith('p/')) return { v: 'detail', kind: 'p', id: h.slice(2) };
  if (h.startsWith('i/')) return { v: 'detail', kind: 'i', id: +h.slice(2) };
  return { v: 'konzept' };
}

function setHash(h, replace) {
  try {
    if (location.hash === h) return;
    if (replace) location.replace(h);
    else location.hash = h;
  } catch(e) {}
}

function showView(v, fromHash) {
  const aliasMap = {
    start: 'konzept', dash: 'konzept', konzept: 'konzept',
    plat: 'plat', plattformen: 'plat',
    ideen: 'ideen', 'yoga-x': 'ideen',
    roadmap: 'roadmap', fahrplan: 'roadmap',
    detail: 'detail'
  };
  const normV = aliasMap[v] || 'konzept';

  // 1. Navigation Active States
  $$('#hnav [data-v]').forEach(btn => {
    const bv = aliasMap[btn.dataset.v] || 'konzept';
    const on = bv === normV;
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-current', on ? 'page' : 'false');
  });

  // 2. Hide all views & reveal target view
  $$('.view, .subpage').forEach(sec => sec.classList.remove('on'));
  const target = $('#v-' + normV);
  if (target) target.classList.add('on');

  // 3. Hero Visibility: visible on Konzept & Übersicht
  const hero = $('#hero');
  if (hero) hero.style.display = (normV === 'konzept') ? 'block' : 'none';

  document.body.classList.remove('pd');

  // 4. Render contents for target view
  if (normV === 'konzept' && typeof renderDash === 'function') renderDash();
  if (normV === 'plat' && typeof renderPlatformsView === 'function') renderPlatformsView();
  if (normV === 'ideen' && typeof renderIdeasView === 'function') renderIdeasView();
  if (normV === 'roadmap' && typeof renderRoadmapView === 'function') renderRoadmapView();
  if (typeof refreshProgress === 'function') refreshProgress();

  // 5. Update Hash & Title
  const titles = {
    konzept: 'Vorhaben & Change-Plan',
    plat: '14 Gutscheinplattformen & Zugänge',
    ideen: 'Yoga + X Kompendium & Research',
    roadmap: '7-Schritte-Fahrplan',
    detail: 'Detail & Anleitung'
  };
  document.title = `Elvaria · ${titles[normV] || 'Event-Konzept'}`;

  if (!fromHash) {
    const hash = (normV === 'konzept') ? '#/konzept' : '#/' + normV;
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
  showView(page, fromHash);
}

function applyState() {
  const s = readHash();
  FROM_HASH = true;
  try {
    if (s.v === 'detail') {
      if (typeof openDetail === 'function') openDetail(s.kind, s.id);
    } else {
      showView(s.v, true);
    }
  } finally {
    FROM_HASH = false;
  }
}

// Global click delegation for all view and navigation triggers
document.addEventListener('click', e => {
  const v = e.target.closest('[data-view]');
  if (v) {
    e.preventDefault();
    showView(v.dataset.view);
    return;
  }

  const btnP = e.target.closest('[data-t="p"]');
  if (btnP) {
    e.preventDefault();
    if (typeof openDetail === 'function') openDetail('p', btnP.dataset.id);
    return;
  }

  const btnI = e.target.closest('[data-t="i"]');
  if (btnI) {
    e.preventDefault();
    if (typeof openDetail === 'function') openDetail('i', +btnI.dataset.id);
    return;
  }
});

window.addEventListener('hashchange', applyState);
