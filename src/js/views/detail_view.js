/**
 * ELVARIA Detail & Tutorial View
 * High-definition presentation for Platforms and Yoga + X Concepts
 */
function openDetail(kind, id, nav, seg) {
  if (nav !== undefined) NAVLIST = nav;
  const on = $('#v-detail').classList.contains('on');
  if (!on) {
    const cv = VIEWS.find(v => $('#v-' + v) && $('#v-' + v).classList.contains('on'));
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
    bw.onclick = () => showView(targetReturn);
  }

  $('#v-detail').classList.add('on');
  const hero = $('#hero');
  if (hero) hero.style.display = 'none';
  document.body.classList.add('pd');
  $$('#hnav button').forEach(x => { x.classList.remove('on'); x.setAttribute('aria-current', 'false'); });
  CURR = { kind, id };
  window.scrollTo({ top: 0, behavior: 'auto' });

  $('#dTutHead').style.display = '';
  $('#dTutSub').style.display = '';
  $('#dNotes').style.padding = '';
  $('#dSteps').innerHTML = '';
  let title = '', ogd = '', printMeta = '';

  if (kind === 'p') {
    const p = (window.P || []).find(x => x.id === id);
    if (!p) return;
    const pIdx = (window.P || []).indexOf(p) + 1;
    $('#dKick').textContent = `Plattform ${pIdx} von ${(window.P || []).length} · Gruppe ${p.cls}`;
    $('#dH').textContent = p.n;
    $('#dP').textContent = p.g;
    $('#dTags').innerHTML = `
      <span class="tag ${p.cls}">${p.cls === 'A' ? 'Erlebnis-Markt' : p.cls === 'B' ? 'Gutschein-Netz' : 'B2B-Benefit'}</span>
      <span class="amp-badge ${p.auf === 'ok' ? 'amp-ok' : p.auf === 'bedingt' ? 'amp-bed' : p.auf === 'unklar' ? 'amp-unk' : 'amp-no'}">${p.aufLab || p.auf}</span>
      ${p.easy ? '<span class="tag" style="background:rgba(255,255,255,.14);color:#D9E4EC">ohne Terminal</span>' : ''}
    `;
    const AU = {
      ok: ['#2C6A4E', '#F1F6F2', 'Nimmt auf'],
      bedingt: ['#8A5A00', '#FBF3E3', 'Nimmt auf — mit Hürde'],
      unklar: ['#5A6470', '#EEF1F4', 'Ungeklärt'],
      nein: ['#9A2B2B', '#FAEDED', 'Nimmt nicht auf']
    };
    const au = AU[p.auf] || AU.unklar;
    $('#dFacts').innerHTML = `
      <div class="fact" style="border-left:4px solid ${au[0]};background:${au[1]};padding:12px 14px;border-radius:6px">
        <span>Aufnahme-Status &middot; ${au[2]}</span>
        <b>${p.aufLab}</b><br><span style="font-weight:400;opacity:.85">${p.aufSub}</span>
      </div>
      <div class="fact"><span>${p.auf === 'nein' ? 'Was das bedeutet' : p.auf === 'unklar' ? 'So klärst du es' : 'Wie Elvaria reinkommt'}</span><b>${p.aufWie || p.weg}</b></div>
      <div class="fact"><span>Gebühr / Provision</span><b>${p.kostet}</b></div>
      <div class="fact"><span>Dauer bis live</span><b>${p.dauer}</b></div>
      <div class="fact jumpbox"><span>Vertiefung</span>
        <button class="jumpto" data-jump="deep">Vollständiger Onboarding-Guide (${(DEEP[p.id] || { deep: [] }).deep.length} Schritte, Checklisten &amp; Vorlagen) <i>→</i></button>
      </div>
    `;
    renderSteps(p.steps, 'p-' + p.id);
    renderDeep(p);
    segCounts(p);
    bindSeg();
    $('#dSeg').hidden = false;
    const segPref = seg || store.get('elvaria-seg');
    setSeg(segPref === 'deep' ? 'deep' : 'quick');
    $('#dNotes').innerHTML = `
      <div class="warn"><b>Hürde / Falle:</b> ${p.falle}</div>
      ${p.falle2 ? `<div class="warn" style="margin-top:10px"><b>Achtung:</b> ${p.falle2}</div>` : ''}
      <div class="good"><b>Urteil &amp; Hebel:</b> ${p.urteil}</div>
      ${p.tips ? `<div class="tip"><b>Praxistipp:</b> ${p.tips[0]}</div>` : ''}
    `;
    $('#dCta').innerHTML = `
      <a class="cta" href="${p.url}" target="_blank" rel="noopener">Zur Plattform-Registrierung ↗</a>
      <button class="cta ghost" data-act="print">Drucken</button>
      <button class="cta ghost" data-act="link">Link kopieren</button>
      <button class="cta ghost" data-act="copy">Schritte kopieren</button>
      <button class="cta ghost" id="markAll">Alle Schritte abhaken</button>
    `;
    title = p.n; ogd = p.g; printMeta = 'Plattform ' + pIdx + ' / ' + (window.P || []).length;
  } else if (kind === 'i') {
    const it = (window.I || [])[+id];
    if (!it) return;
    const iIdx = +id + 1;
    $('#dKick').textContent = `Yoga + X Konzept ${iIdx} von ${(window.I || []).length} · ${it.cat}`;
    $('#dH').textContent = it.t;
    $('#dP').textContent = it.d;
    $('#dTags').innerHTML = `
      <span class="tag idea-cat">${it.cat}</span>
      <span class="appeal-tag">${it.m.split('·')[0].trim()}</span>
    `;
    $('#dFacts').innerHTML = `
      <div class="fact" style="border-left:4px solid #b89248;background:#fbf8f2;padding:12px 14px;border-radius:6px">
        <span>Recherchiertes Praxisbeispiel &middot; Markt-Benchmark</span>
        <b>${it.research}</b>
      </div>
      <div class="fact"><span>90-Minuten Ablauf</span><b>${it.flow}</b></div>
      <div class="fact"><span>Zielgruppe &amp; Appeal</span><b>${it.target}</b></div>
      <div class="fact"><span>Equipment &amp; Raum-Deal</span><b>${it.setup}</b></div>
      <div class="fact"><span>Rechtlicher Check &amp; HWG</span><b>${it.legal}</b></div>
    `;
    renderSteps(it.s, 'i-' + id);
    $('#dSeg').hidden = true;
    setSeg('quick');
    $('#dDeep').innerHTML = '';
    $('#dNotes').innerHTML = `
      <div class="tip"><b>Markt-Einordnung:</b> ${it.m}</div>
      <div class="good" style="margin-top:10px"><b>Raum-Deal Vorteil:</b> Keine feste Miete. Nutzung von Partnerstudios in Randzeiten oder Outdoor/Hotels.</div>
    `;
    $('#dCta').innerHTML = `
      <button class="cta" onclick="showView('plat')">Passende Plattformen für dieses Event ↗</button>
      <button class="cta ghost" data-act="print">Drucken</button>
      <button class="cta ghost" data-act="link">Link kopieren</button>
      <button class="cta ghost" id="markAll">Alle Schritte abhaken</button>
      <button class="cta ghost" onclick="showView('ideen')">← Andere Idee ansehen</button>
    `;
    title = it.t; ogd = it.d; printMeta = 'Yoga + X · ' + it.cat;
  }

  setNav(kind, id);
  paintRel(kind, id);

  if (!FROM_HASH) setHash('#/' + kind + '/' + id);

  const h = $('#dH');
  if (h) {
    h.setAttribute('tabindex', '-1');
    try { h.focus({ preventScroll: true }); } catch (e) { try { h.focus(); } catch (_) {} }
  }

  document.title = title + ' — Elvaria';
  store.set('elvaria-last', JSON.stringify(CURR));
  if (typeof announce === 'function') announce(title);
}

let SEG = 'quick';
function setSeg(v) {
  SEG = v;
  $$('#dSeg button').forEach(b => {
    const on = b.dataset.seg === v;
    b.classList.toggle('on', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  const q = $('#paneQuick'), d = $('#paneDeep');
  document.body.classList.toggle('deepmode', v === 'deep');
  if (q) q.hidden = v !== 'quick';
  if (d) d.hidden = v !== 'deep';
  store.set('elvaria-seg', v === 'deep' ? 'deep' : 'quick');
}

function bindSeg() {
  $$('#dSeg button').forEach(b => b.onclick = () => setSeg(b.dataset.seg));
}
