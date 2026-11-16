/**
 * ELVARIA App Startup & Event Coordination
 */

/* ── Navigation Buttons ── */
$$('#hnav button[data-v], #hnav button[data-sub]').forEach(b => {
  b.onclick = () => showView(b.dataset.v || b.dataset.sub, false);
});

const srcNavBtn = $('.btn-sources-nav');
if (srcNavBtn) {
  srcNavBtn.onclick = (e) => {
    e.preventDefault();
    if (window.ELVARIA_SOURCES) window.ELVARIA_SOURCES.openExplorer();
  };
}

const backBtn = $('#back');
if (backBtn) {
  backBtn.onclick = () => {
    const v = RETURN_TO || 'dash';
    const y = RETURN_Y;
    RETURN_Y = y;
    showView(v, false);
    setHash(v === 'dash' ? '#/start' : '#/' + (v === 'wiz' ? 'assistent' : v === 'plan' ? 'businessplan' : v), true);
  };
}

/* ── Keyboard Shortcuts ── */
document.addEventListener('keydown', e => {
  const inField = e.target.closest('input,textarea,select,[contenteditable]');
  const inDetail = $('#v-detail') && $('#v-detail').classList.contains('on');

  if (e.key === 'Escape') {
    if ($('#gPanel') && !$('#gPanel').hidden) { $('#gPanel').hidden = true; $('#qG').blur(); return; }
    if (inDetail) { e.preventDefault(); $('#back').click(); }
    return;
  }
  if (e.key === '/' && !inField) {
    e.preventDefault(); $('#qG').focus(); $('#qG').select(); return;
  }
  if (!inDetail || inField) return;

  if (e.key === 'ArrowRight' && !e.altKey && !e.metaKey && !e.ctrlKey) {
    const bx = $('#next'); if (bx && bx.style.visibility !== 'hidden') { e.preventDefault(); bx.click(); }
  } else if (e.key === 'ArrowLeft' && !e.altKey && !e.metaKey && !e.ctrlKey) {
    const bx = $('#prev'); if (bx && bx.style.visibility !== 'hidden') { e.preventDefault(); bx.click(); }
  } else if (/^[1-9]$/.test(e.key)) {
    const list = SEG === 'deep' ? $$('#dDeep .dstep-h') : $$('#dSteps .step');
    const el = list[+e.key - 1];
    if (el) { e.preventDefault(); el.click(); }
  } else if (e.key === 'd' && !e.altKey && !e.metaKey && !e.ctrlKey && $('#dSeg') && !$('#dSeg').hidden) {
    e.preventDefault(); setSeg(SEG === 'deep' ? 'quick' : 'deep');
  }
});

/* ── Delegation für Kacheln, Rel-Links und Resume ── */
document.addEventListener('click', e => {
  const rel = e.target.closest('.rel');
  if (rel) { openDetail(rel.dataset.t, rel.dataset.id, null); return; }
  const res = e.target.closest('.resume');
  if (res) { openDetail(res.dataset.t, res.dataset.id, null); return; }
  const t = e.target.closest('.tile');
  if (!t || !t.dataset.t) return;
  let nav = null;
  if (!t.closest('#v-dash')) {
    if (t.closest('#gridP') && typeof navOfP === 'function') nav = navOfP();
    else if (t.closest('#wrapI') && typeof navOfI === 'function') nav = navOfI();
  }
  openDetail(t.dataset.t, t.dataset.id, nav);
});

/* ── Globale Suche ── */
const gq = $('#qG');
const skipEl = $('#skip');
if (skipEl) {
  skipEl.addEventListener('click', e => {
    e.preventDefault();
    const m = $('#mainInhalt');
    if (m) { m.focus({ preventScroll: true }); m.scrollIntoView({ behavior: 'smooth' }); }
  });
}
if (gq) {
  gq.addEventListener('input', () => { gsearch(gq.value); gq.setAttribute('aria-expanded', gq.value.trim() ? 'true' : 'false'); });
  gq.addEventListener('focus', () => { if (gq.value.trim()) gsearch(gq.value); });
  gq.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const first = $('#gList .gres');
      if (first) first.click();
    }
  });
}
const gList = $('#gList');
if (gList) {
  gList.addEventListener('click', e => {
    const b = e.target.closest('.gres'); if (!b) return;
    const g = b.dataset.g, id = b.dataset.id;
    $('#gPanel').hidden = true; if (gq) gq.value = '';
    if (g === 'f') { openFaqItem(+id); return; }
    openDetail(g, id, null);
  });
}
document.addEventListener('click', e => {
  if (!e.target.closest('.hsearch') && $('#gPanel')) $('#gPanel').hidden = true;
});

/* ── Filter-Bindings ── */
$$('#fP .chip').forEach(b => b.onclick = () => {
  const k = b.dataset.k, v = b.dataset.v;
  if (k === 'easy' || k === 'free') {
    const on = b.classList.contains('on');
    $$(`#fP .chip[data-k="${k}"]`).forEach(x => x.classList.remove('on'));
    if (!on) { b.classList.add('on'); FS[k] = v; } else FS[k] = null;
  } else {
    $$(`#fP .chip[data-k="${k}"]`).forEach(x => x.classList.remove('on'));
    b.classList.add('on'); FS[k] = v;
  }
  renderP();
});
$$('#fI .chip').forEach(b => b.onclick = () => {
  const k = b.dataset.k, v = b.dataset.v;
  if (k === 'flag') {
    const on = b.classList.contains('on');
    $$('#fI .chip[data-k="flag"]').forEach(x => x.classList.remove('on'));
    if (!on) { b.classList.add('on'); FS.flag = v; } else FS.flag = null;
  } else {
    $$(`#fI .chip[data-k="${k}"]`).forEach(x => x.classList.remove('on'));
    b.classList.add('on'); FS[k] = v;
  }
  renderI();
});
const resetP = $('#resetP');
if (resetP) resetP.onclick = () => {
  FS.cls = 'all'; FS.w = 'all'; FS.easy = null; FS.free = null; $('#qP').value = '';
  $$('#fP .chip').forEach(c => c.classList.remove('on'));
  $$('#fP .chip[data-v="all"]').forEach(c => c.classList.add('on'));
  renderP();
};
const resetI = $('#resetI');
if (resetI) resetI.onclick = () => {
  FS.r = 'all'; FS.flag = null; $('#qI').value = '';
  $$('#fI .chip').forEach(c => c.classList.remove('on'));
  $$('#fI .chip[data-v="all"]').forEach(c => c.classList.add('on'));
  renderI();
};
const qP = $('#qP'); if (qP) qP.oninput = renderP;
const qI = $('#qI'); if (qI) qI.oninput = renderI;
const qF = $('#qF'); if (qF) qF.oninput = renderFAQ;

/* ── Dashboard Category Tabs Switcher ── */
function switchDashTab(target) {
  const tabMap = {
    uebersicht: 'dashPaneUebersicht',
    roadmap: 'dashPaneRoadmap',
    faq: 'dashPaneFaq',
    module: 'dashPaneModule'
  };
  $$('.dash-cat-btn').forEach(b => {
    const on = b.dataset.dashTab === target;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  Object.keys(tabMap).forEach(key => {
    const pane = document.getElementById(tabMap[key]);
    if (pane) pane.classList.toggle('on', key === target);
  });
}

function bindDashTabs() {
  $$('.dash-cat-btn').forEach(btn => {
    btn.onclick = () => switchDashTab(btn.dataset.dashTab);
  });
}

function bindSort() {
  $$('#fP [data-sort]').forEach(b => b.onclick = () => {
    SORT = b.dataset.sort;
    $$('#fP [data-sort]').forEach(x => {
      const on = x === b;
      x.classList.toggle('on', on);
      x.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderP();
  });
}

/* ── Initialisierung ── */
bindSort();
bindDashTabs();
if (typeof bindAnhang === 'function') bindAnhang();
if (typeof bindPlanSpy === 'function') bindPlanSpy();
if (typeof bindWizJump === 'function') bindWizJump();
if (typeof bindWizKeys === 'function') bindWizKeys();

renderDash();
renderP();
renderI();
buildCats();
renderFAQ();
renderPlan();
renderWiz();
if (typeof refreshProgress === 'function') refreshProgress();

const mPEl = $('#mP'); if (mPEl && typeof P !== 'undefined') mPEl.textContent = P.length;
const mIEl = $('#mI'); if (mIEl && typeof I !== 'undefined') mIEl.textContent = I.length;

applyState();
