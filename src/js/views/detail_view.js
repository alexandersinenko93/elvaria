/**
 * ELVARIA Detail & Tutorial View
 * Ultra-Luxury Presentation for Platforms and Yoga + X Concepts
 */
window.RETURN_TO = window.RETURN_TO || null;
window.RETURN_Y = window.RETURN_Y || null;
window.CURR = window.CURR || null;
window.NAVLIST = window.NAVLIST || null;
window.FROM_HASH = window.FROM_HASH || false;
window.VIEWS = window.VIEWS || ['konzept', 'plat', 'ideen', 'roadmap', 'detail'];

function openDetail(kind, id, nav, seg) {
  if (nav !== undefined) NAVLIST = nav;
  const on = $('#v-detail') && $('#v-detail').classList.contains('on');
  if (!on) {
    const viewsList = (typeof VIEWS !== 'undefined') ? VIEWS : ['konzept', 'plat', 'ideen', 'roadmap', 'detail'];
    const cv = viewsList.find(v => $('#v-' + v) && $('#v-' + v).classList.contains('on'));
    if (cv) { RETURN_TO = cv; RETURN_Y = window.scrollY; }
    $$('.view, .subpage').forEach(v => v.classList.remove('on'));
  }
  const defaultReturn = kind === 'p' ? 'plat' : 'ideen';
  const targetReturn = RETURN_TO || defaultReturn;
  const BACKLBL = {
    plat: 'zurück zu den 14 Plattformen',
    ideen: 'zurück zu den Yoga + X Konzepten',
    konzept: 'zurück zum Vorhaben',
    roadmap: 'zurück zum Fahrplan'
  };
  const bw = $('#back');
  if (bw) {
    bw.innerHTML = '<span>←</span> ' + (BACKLBL[targetReturn] || 'zurück zur Übersicht');
    bw.onclick = () => { if (typeof showView === 'function') showView(targetReturn); };
  }

  const vDetail = $('#v-detail');
  if (vDetail) vDetail.classList.add('on');
  const hero = $('#hero');
  if (hero) hero.style.display = 'none';
  document.body.classList.add('pd');
  $$('#hnav button').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-current', 'false'); });
  CURR = { kind, id };
  window.scrollTo({ top: 0, behavior: 'auto' });

  const dTutHead = $('#dTutHead'); if (dTutHead) dTutHead.style.display = '';
  const dTutSub = $('#dTutSub'); if (dTutSub) dTutSub.style.display = '';
  const dSteps = $('#dSteps'); if (dSteps) dSteps.innerHTML = '';
  let title = '', ogd = '', printMeta = '';

  if (kind === 'p') {
    const p = (window.P || []).find(x => x.id === id);
    if (!p) return;
    const pIdx = (window.P || []).indexOf(p) + 1;
    const dKick = $('#dKick'); if (dKick) dKick.textContent = `Plattform ${pIdx} von ${(window.P || []).length} · Gruppe ${p.cls}`;
    const dH = $('#dH'); if (dH) dH.textContent = p.n;
    const dP = $('#dP'); if (dP) dP.textContent = p.g;
    const dTags = $('#dTags');
    if (dTags) {
      dTags.innerHTML = `
        <span class="tag ${p.cls}">${p.cls === 'A' ? 'Erlebnis-Markt' : p.cls === 'B' ? 'Gutschein-Netz' : 'B2B-Benefit'}</span>
        <span class="amp-badge ${p.auf === 'ok' ? 'amp-ok' : p.auf === 'bedingt' ? 'amp-bed' : p.auf === 'unklar' ? 'amp-unk' : 'amp-no'}">${p.aufLab || p.auf}</span>
        ${p.easy ? '<span class="tag" style="background:rgba(255,255,255,.08);color:#D9E4EC">ohne Terminal</span>' : ''}
      `;
    }
    const AU = {
      ok: ['#34845D', 'status-ok', 'Nimmt auf'],
      bedingt: ['#D4AF37', 'status-warn', 'Nimmt auf — mit Hürde'],
      unklar: ['#67778A', 'status-unk', 'Ungeklärt'],
      nein: ['#C24538', 'status-err', 'Nimmt nicht auf']
    };
    const au = AU[p.auf] || AU.unklar;
    const dFacts = $('#dFacts');
    if (dFacts) {
      dFacts.innerHTML = `
        <div class="fact fact-status ${au[1]}">
          <div class="fact-head"><span class="fact-dot"></span><span class="fact-label">Aufnahme-Status &middot; ${au[2]}</span></div>
          <b class="fact-val">${p.aufLab}</b>
          <span class="fact-sub">${p.aufSub}</span>
        </div>
        <div class="fact fact-metric">
          <span class="fact-label">Gebühr / Provision</span>
          <b class="fact-val">${p.kostet}</b>
          <span class="fact-sub">Konditionen &amp; Marge</span>
        </div>
        <div class="fact fact-metric">
          <span class="fact-label">Dauer bis live</span>
          <b class="fact-val">${p.dauer}</b>
          <span class="fact-sub">Onboarding-Zeithorizont</span>
        </div>
        <div class="fact fact-wide fact-strategy">
          <div class="fact-head"><span class="fact-badge-mini">Zugangs-Strategie</span><span class="fact-label">${p.auf === 'nein' ? 'Auswirkung' : p.auf === 'unklar' ? 'Klärungsschritt' : 'Wie Elvaria reinkommt'}</span></div>
          <b class="fact-val fact-val-text">${p.aufWie || p.weg}</b>
        </div>
        <div class="fact fact-guide jumpbox">
          <span class="fact-label">Vertiefung &amp; Leitfaden</span>
          <button class="jumpto" data-jump="deep">
            <span class="jumpto-title">Vollständiger Onboarding-Guide</span>
            <span class="jumpto-sub">${(DEEP[p.id] || { deep: [] }).deep.length} Schritte, Checklisten &amp; Vorlagen <i>→</i></span>
          </button>
        </div>
      `;
    }
    renderSteps(p.steps, 'p-' + p.id);
    renderDeep(p);
    segCounts(p);
    bindSeg();
    const dSeg = $('#dSeg'); if (dSeg) dSeg.hidden = false;
    const segPref = seg || store.get('elvaria-seg');
    setSeg(segPref === 'deep' ? 'deep' : 'quick');
    const dNotes = $('#dNotes');
    if (dNotes) {
      dNotes.innerHTML = `
        <div class="warn"><b>Hürde / Falle:</b> ${p.falle}</div>
        ${p.falle2 ? `<div class="warn" style="margin-top:10px"><b>Achtung:</b> ${p.falle2}</div>` : ''}
        <div class="good"><b>Urteil &amp; Hebel:</b> ${p.urteil}</div>
        ${p.tips ? `<div class="tip"><b>Praxistipp:</b> ${p.tips[0]}</div>` : ''}
      `;
    }
    const dCta = $('#dCta');
    if (dCta) {
      dCta.innerHTML = `
        <a class="cta" href="${p.url}" target="_blank" rel="noopener">Zur Plattform-Registrierung ↗</a>
        <button class="cta ghost" data-act="print">Drucken</button>
        <button class="cta ghost" data-act="link">Link kopieren</button>
        <button class="cta ghost" data-act="copy">Schritte kopieren</button>
        <button class="cta ghost" id="markAll">Alle Schritte abhaken</button>
      `;
    }
    title = p.n; ogd = p.g; printMeta = 'Plattform ' + pIdx + ' / ' + (window.P || []).length;
  } else if (kind === 'i') {
    const it = (window.I || [])[+id];
    if (!it) return;
    const iIdx = +id + 1;
    const dKick = $('#dKick'); if (dKick) dKick.textContent = `Yoga + X Konzept ${iIdx} von ${(window.I || []).length} · ${it.cat}`;
    const dH = $('#dH'); if (dH) dH.textContent = it.t;
    const dP = $('#dP'); if (dP) dP.textContent = it.d;
    const dTags = $('#dTags');
    if (dTags) {
      dTags.innerHTML = `
        <span class="tag idea-cat">${it.cat}</span>
        <span class="appeal-tag">${it.m.split('·')[0].trim()}</span>
      `;
    }
    const dFacts = $('#dFacts');
    if (dFacts) {
      dFacts.innerHTML = `
        <div class="fact fact-wide fact-benchmark">
          <div class="fact-head"><span class="fact-badge-mini">Benchmark</span><span class="fact-label">Recherchiertes Praxisbeispiel &middot; Markt</span></div>
          <b class="fact-val fact-val-text">${it.research}</b>
        </div>
        <div class="fact fact-metric">
          <span class="fact-label">90-Minuten Ablauf</span>
          <b class="fact-val fact-val-text">${it.flow}</b>
        </div>
        <div class="fact fact-metric">
          <span class="fact-label">Zielgruppe &amp; Appeal</span>
          <b class="fact-val">${it.target}</b>
        </div>
        <div class="fact fact-metric">
          <span class="fact-label">Equipment &amp; Raum-Deal</span>
          <b class="fact-val">${it.setup}</b>
        </div>
        <div class="fact fact-metric fact-legal">
          <span class="fact-label">Rechtlicher Check &amp; HWG</span>
          <b class="fact-val">${it.legal}</b>
        </div>
      `;
    }
    renderSteps(it.s, 'i-' + id);
    const dSeg = $('#dSeg'); if (dSeg) dSeg.hidden = true;
    setSeg('quick');
    const dDeep = $('#dDeep'); if (dDeep) dDeep.innerHTML = '';
    const dNotes = $('#dNotes');
    if (dNotes) {
      dNotes.innerHTML = `
        <div class="tip"><b>Markt-Einordnung:</b> ${it.m}</div>
        <div class="good" style="margin-top:10px"><b>Raum-Deal Vorteil:</b> Keine feste Miete. Nutzung von Partnerstudios in Randzeiten oder Outdoor/Hotels.</div>
      `;
    }
    const dCta = $('#dCta');
    if (dCta) {
      dCta.innerHTML = `
        <button class="cta" onclick="showView('plat')">Passende Plattformen für dieses Event ↗</button>
        <button class="cta ghost" data-act="print">Drucken</button>
        <button class="cta ghost" data-act="link">Link kopieren</button>
        <button class="cta ghost" id="markAll">Alle Schritte abhaken</button>
        <button class="cta ghost" onclick="showView('ideen')">← Andere Idee ansehen</button>
      `;
    }
    title = it.t; ogd = it.d; printMeta = 'Yoga + X · ' + it.cat;
  }

  setNav(kind, id);
  paintRel(kind, id);
  bindDetailCta(kind, id);

  if (!FROM_HASH && typeof setHash === 'function') setHash('#/' + kind + '/' + id);

  const h = $('#dH');
  if (h) {
    h.setAttribute('tabindex', '-1');
    try { h.focus({ preventScroll: true }); } catch (e) { try { h.focus(); } catch (_) {} }
  }

  document.title = title + ' — Elvaria';
  store.set('elvaria-last', JSON.stringify(CURR));
  if (typeof announce === 'function') announce(title);
}

function setNav(kind, id) {
  const list = kind === 'p' ? (window.P || []) : (window.I || []);
  const idx = kind === 'p' ? list.findIndex(x => x.id === id) : +id;
  const prevBtn = $('#prevD');
  const nextBtn = $('#nextD');
  if (prevBtn) {
    const hasPrev = idx > 0;
    prevBtn.style.visibility = hasPrev ? 'visible' : 'hidden';
    prevBtn.onclick = (e) => {
      e.preventDefault();
      if (hasPrev) {
        const item = list[idx - 1];
        openDetail(kind, kind === 'p' ? item.id : (idx - 1));
      }
    };
  }
  if (nextBtn) {
    const hasNext = idx < list.length - 1;
    nextBtn.style.visibility = hasNext ? 'visible' : 'hidden';
    nextBtn.onclick = (e) => {
      e.preventDefault();
      if (hasNext) {
        const item = list[idx + 1];
        openDetail(kind, kind === 'p' ? item.id : (idx + 1));
      }
    };
  }
}

function bindDetailCta(kind, id) {
  const ctaBox = $('#dCta');
  if (!ctaBox) return;
  const printBtn = ctaBox.querySelector('[data-act="print"]');
  if (printBtn) printBtn.onclick = () => window.print();
  const linkBtn = ctaBox.querySelector('[data-act="link"]');
  if (linkBtn) linkBtn.onclick = () => copyText(window.location.href, 'Link kopiert');
  const copyBtn = ctaBox.querySelector('[data-act="copy"]');
  if (copyBtn) copyBtn.onclick = () => {
    if (kind === 'p') {
      const p = (window.P || []).find(x => x.id === id);
      if (p) copyText(p.steps.map((s, i) => `${i + 1}. ${s[0]}: ${s[1]}`).join('\n'), 'Schritte kopiert');
    } else {
      const it = (window.I || [])[+id];
      if (it) copyText(it.s.map((s, i) => `${i + 1}. ${s[0]}: ${s[1]}`).join('\n'), 'Schritte kopiert');
    }
  };
  const markBtn = $('#markAll');
  if (markBtn) markBtn.onclick = () => {
    const key = (kind === 'p' ? 'p-' : 'i-') + id;
    const len = (kind === 'p') ? (((window.P || []).find(x => x.id === id) || { steps: [] }).steps.length) : ((((window.I || [])[+id] || { s: [] }).s.length));
    const dn = progOf(key, len), setAll = dn !== len;
    DONE[key] = Array(len).fill(setAll);
    saveDone();
    $$('#dSteps .step').forEach(el => { el.classList.toggle('done', setAll); el.setAttribute('aria-checked', setAll ? 'true' : 'false'); });
    if (typeof updateBar === 'function') updateBar(key, len);
    if (typeof refreshProgress === 'function') refreshProgress();
  };
}

let SEG = 'quick';
function setSeg(v) {
  SEG = v;
  $$('#dSeg button').forEach(b => {
    const s = b.dataset ? b.dataset.seg : b.getAttribute('data-seg');
    const on = s === v;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  const q = $('#paneQuick'), d = $('#paneDeep');
  document.body.classList.toggle('deepmode', v === 'deep');
  if (q) q.hidden = (v !== 'quick');
  if (d) d.hidden = (v !== 'deep');
  store.set('elvaria-seg', v === 'deep' ? 'deep' : 'quick');
}

function bindSeg() {
  $$('#dSeg button').forEach(b => {
    b.onclick = () => {
      const s = b.dataset ? b.dataset.seg : b.getAttribute('data-seg');
      if (s) setSeg(s);
    };
  });
}
