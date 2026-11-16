/**
 * ELVARIA Navigation, Search & Shared Page Logic
 */

function setupGlobalSearch() {
  const gq = $('#qG');
  const gList = $('#gList');
  const gPanel = $('#gPanel');

  if (gq) {
    gq.addEventListener('input', () => {
      const q = gq.value.trim().toLowerCase();
      if (!q) { if (gPanel) gPanel.hidden = true; return; }
      renderGlobalSearchResults(q);
      gq.setAttribute('aria-expanded', 'true');
    });
    gq.addEventListener('focus', () => {
      if (gq.value.trim()) renderGlobalSearchResults(gq.value.trim().toLowerCase());
    });
    gq.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const first = $('#gList .gres');
        if (first) first.click();
      }
    });
  }

  if (gList) {
    gList.addEventListener('click', e => {
      const b = e.target.closest('.gres'); if (!b) return;
      const g = b.dataset.g, id = b.dataset.id;
      if (gPanel) gPanel.hidden = true;
      if (gq) gq.value = '';
      if (g === 'f') {
        window.location.href = 'anhang.html?pane=faq&q=' + encodeURIComponent(id);
      } else {
        window.location.href = 'detail.html?kind=' + g + '&id=' + id;
      }
    });
  }

  document.addEventListener('click', e => {
    if (!e.target.closest('.hsearch') && gPanel) gPanel.hidden = true;
  });

  const skipEl = $('#skip');
  if (skipEl) {
    skipEl.addEventListener('click', e => {
      e.preventDefault();
      const m = $('#mainInhalt');
      if (m) { m.focus({ preventScroll: true }); m.scrollIntoView({ behavior: 'smooth' }); }
    });
  }
}

function renderGlobalSearchResults(q) {
  const gPanel = $('#gPanel');
  const gList = $('#gList');
  if (!gPanel || !gList) return;

  const pList = (typeof P !== 'undefined' && Array.isArray(P)) ? P : [];
  const iList = (typeof I !== 'undefined' && Array.isArray(I)) ? I : [];
  const fList = (typeof F !== 'undefined' && Array.isArray(F)) ? F : [];

  const ps = pList.filter(p => [p.n, p.d, p.g, p.kostet, p.dauer].join(' ').toLowerCase().includes(q)).slice(0, 5);
  const is = iList.map((x, i) => ({ ...x, _i: i })).filter(x => [x.t, x.d, x.m].join(' ').toLowerCase().includes(q)).slice(0, 5);
  const fs = fList.map((f, i) => ({ ...f, _i: i })).filter(f => (f.q + ' ' + f.a).toLowerCase().includes(q)).slice(0, 5);

  let h = '';
  if (ps.length) h += '<div class="glab">Kanäle</div>' + ps.map(p => `<button class="gres" data-g="p" data-id="${p.id}"><b>${p.n}</b><span>Klasse ${p.cls} · ${p.dauer}</span></button>`).join('');
  if (is.length) h += '<div class="glab">Ideen</div>' + is.map(x => `<button class="gres" data-g="i" data-id="${x._i}"><b>${x.t}</b><span>Ring ${x.r} · ${x.m}</span></button>`).join('');
  if (fs.length) h += '<div class="glab">Fragen</div>' + fs.map(f => `<button class="gres" data-g="f" data-id="${f.q}"><b>${f.q}</b><span>${f.c}</span></button>`).join('');

  gList.innerHTML = h || '<div class="gempty">Nichts gefunden — anderer Begriff?</div>';
  gPanel.hidden = false;
}

function updateHeaderProgress() {
  const txt = $('#hprogTxt');
  if (!txt) return;
  const done = (typeof doneCount === 'function') ? doneCount() : 0;
  txt.textContent = `${done} Schritte`;
}

document.addEventListener('DOMContentLoaded', () => {
  setupGlobalSearch();
  updateHeaderProgress();
});
