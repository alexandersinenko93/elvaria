/**
 * ELVARIA Global Navigation & Search Engine
 * Instant indexing across 14 Gutscheinplattformen and 12 Yoga + X concepts
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
      const b = e.target.closest('.gres');
      if (!b) return;
      const g = b.dataset.g;
      const id = b.dataset.id;
      if (gPanel) gPanel.hidden = true;
      if (gq) gq.value = '';
      if (g === 'f') {
        if (typeof showView === 'function') showView('roadmap');
        setTimeout(() => {
          const faqEl = $('#simple');
          if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        if (typeof openDetail === 'function') openDetail(g, id);
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

  const pList = window.P || [];
  const iList = window.I || [];
  const sList = window.SIMPLE || [];

  const ps = pList.filter(p => [p.n, p.d, p.g, p.aufWie, p.kostet, p.dauer, p.aufLab].join(' ').toLowerCase().includes(q)).slice(0, 5);
  const is = iList.map((x, i) => ({ ...x, _i: i })).filter(x => [x.t, x.d, x.cat, x.research, x.flow, x.target].join(' ').toLowerCase().includes(q)).slice(0, 5);
  const fs = sList.map((f, i) => ({ q: f[0], a: f[1], _i: i })).filter(f => (f.q + ' ' + f.a).toLowerCase().includes(q)).slice(0, 4);

  let h = '';
  if (ps.length) {
    h += '<div class="glab">14 Gutscheinplattformen</div>' + ps.map(p => `
      <button class="gres" data-g="p" data-id="${p.id}">
        <b>${p.n}</b>
        <span>${p.aufLab || 'Status'} · ${p.dauer}</span>
      </button>
    `).join('');
  }
  if (is.length) {
    h += '<div class="glab">Yoga + X Konzepte</div>' + is.map(x => `
      <button class="gres" data-g="i" data-id="${x._i}">
        <b>${x.t}</b>
        <span>${x.cat} · ${x.m.split('·')[0].trim()}</span>
      </button>
    `).join('');
  }
  if (fs.length) {
    h += '<div class="glab">Häufige Fragen &amp; Praxis</div>' + fs.map(f => `
      <button class="gres" data-g="f" data-id="${f._i}">
        <b>${f.q}</b>
        <span>${f.a.slice(0, 60)}…</span>
      </button>
    `).join('');
  }

  gList.innerHTML = h || '<div class="gempty">Nichts gefunden — versuche z.B. „Boxen", „Sound", „Eversports" oder „Wunschgutschein"</div>';
  gPanel.hidden = false;
}

function updateHeaderProgress() {
  const txt = $('#hprogTxt');
  if (!txt) return;
  const count = typeof doneCount === 'function' ? doneCount() : 0;
  const targetTotal = 21;
  txt.textContent = `${count} / ${targetTotal} Schritte`;

  const mS = $('#mS');
  if (mS) mS.textContent = count;
  const mPct = $('#mPct');
  const pct = Math.min(100, Math.round(count / targetTotal * 100));
  if (mPct) mPct.textContent = `${pct} %`;
  const bar = $('#heroBar');
  if (bar) bar.style.width = `${pct}%`;
  const note = $('#mNote');
  if (note) {
    note.textContent = count === 0 ? 'Noch nichts abgehakt' : `${count} von ${targetTotal} erledigt`;
  }
}
