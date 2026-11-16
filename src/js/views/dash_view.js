/**
 * ELVARIA Dashboard & Roadmap Views
 * Live financial computation, reactive scenario switching, subpage navigation
 */

function renderDash() {
  const r = (typeof planCalc === 'function') ? planCalc() : calc(SCEN.basis);
  const pst = (typeof PST !== 'undefined' && PST) ? PST : { scen: 'basis', legalForm: 'Einzelunternehmen', capital: '5.560 €' };

  const b2bDB = Math.round(r.dbB2B || 1510).toLocaleString('de-DE');
  const b2cDB = Math.round(r.dbB2C || 439).toLocaleString('de-DE');
  const resTax = Math.round(r.ergebnis || 7433).toLocaleString('de-DE');
  const fixCost = Math.round(r.fix || 1450).toLocaleString('de-DE');
  const breakEven = (r.beMix && isFinite(r.beMix)) ? r.beMix : 3;
  const legalForm = pst.legalForm || 'Einzelunternehmen';
  const startCapital = pst.capital || '5.560 €';

  // 1. One-Sentence Bottom Line
  const haBig = $('#haSentence');
  if (haBig) {
    haBig.innerHTML = `Kurz gesagt: <em>ein Abend für eine Firma</em> bringt <b>${b2bDB} €</b>, <em>ein Abend für Einzelne</em> <b>${b2cDB} €</b>. Der Unterschied ist der Raum.`;
  }
  const mHeroCap = $('#mHeroCapital');
  if (mHeroCap) mHeroCap.textContent = startCapital;

  // 2. Interactive Scenario & Config Panel
  const dynBox = $('#dynKpiBox');
  if (dynBox) {
    dynBox.innerHTML = `
      <div class="dyn-config-box">
        <div class="dyn-cfg-head">
          <h3><span class="dot" style="width:7px;height:7px;border-radius:50%;background:var(--gold-accent);display:inline-block;margin-right:6px"></span> Live-Konfiguration &amp; Schnell-Szenario</h3>
          <span>Werte passen sich in Echtzeit an Businessplan &amp; Assistent an</span>
        </div>
        <div class="dyn-cfg-row">
          <div class="cfg-group">
            <span class="cfg-lbl">Szenario</span>
            <button class="cfg-pill ${pst.scen==='konservativ'?'on':''}" data-scen="konservativ">Vorsichtig</button>
            <button class="cfg-pill ${pst.scen==='basis'?'on':''}" data-scen="basis">Realistisch</button>
            <button class="cfg-pill ${pst.scen==='ambitioniert'?'on':''}" data-scen="ambitioniert">Ehrgeizig</button>
          </div>
          <div class="cfg-group">
            <span class="cfg-lbl">Rechtsform</span>
            <button class="cfg-pill ${legalForm==='Einzelunternehmen'?'on':''}" data-legal="Einzelunternehmen">Einzelunternehmen</button>
            <button class="cfg-pill ${legalForm==='UG / GmbH'?'on':''}" data-legal="UG / GmbH">UG / GmbH</button>
          </div>
          <div class="cfg-group">
            <span class="cfg-lbl">Startgeld</span>
            <button class="cfg-pill ${startCapital==='5.560 €'?'on':''}" data-cap="5.560 €">Lean (5.560 €)</button>
            <button class="cfg-pill ${startCapital==='14.200 €'?'on':''}" data-cap="14.200 €">Voll (14.200 €)</button>
          </div>
        </div>
      </div>

      <div class="kpi-dyn-grid">
        <div class="kpi-dyn-card">
          <span class="kpi-dyn-lbl">Rechtsform</span>
          <b class="kpi-dyn-val" style="font-size:20px">${legalForm}</b>
          <span class="kpi-dyn-sub">Haftung persönlich, keine Notarkosten</span>
        </div>
        <div class="kpi-dyn-card gold-border">
          <span class="kpi-dyn-lbl">Startkapital</span>
          <b class="kpi-dyn-val gold">${startCapital}</b>
          <span class="kpi-dyn-sub">Anschaffung Matten, Deko &amp; Puffer</span>
        </div>
        <div class="kpi-dyn-card">
          <span class="kpi-dyn-lbl">Fixkosten / Monat</span>
          <b class="kpi-dyn-val">${fixCost} €</b>
          <span class="kpi-dyn-sub">Eversports, Buchhaltung, VBG</span>
        </div>
        <div class="kpi-dyn-card">
          <span class="kpi-dyn-lbl">Kapazität</span>
          <b class="kpi-dyn-val">8 Events</b>
          <span class="kpi-dyn-sub">Solo-Maximum ohne Personal</span>
        </div>
        <div class="kpi-dyn-card gold-border">
          <span class="kpi-dyn-lbl">Ergebnis v. Steuer</span>
          <b class="kpi-dyn-val green">${resTax} €</b>
          <span class="kpi-dyn-sub">Monatlicher Rohgewinn vor ESt</span>
        </div>
        <div class="kpi-dyn-card">
          <span class="kpi-dyn-lbl">Anfangen</span>
          <b class="kpi-dyn-val">7 Schritte</b>
          <span class="kpi-dyn-sub">Dauert bis zum ersten Euro</span>
        </div>
        <div class="kpi-dyn-card">
          <span class="kpi-dyn-lbl">Kerngeschäft (B2C)</span>
          <b class="kpi-dyn-val gold">${b2cDB} €</b>
          <span class="kpi-dyn-sub">Bleiben pro offenem Abend (mit Deal)</span>
        </div>
        <div class="kpi-dyn-card gold-border">
          <span class="kpi-dyn-lbl">Bester Termin (B2B)</span>
          <b class="kpi-dyn-val green">${b2bDB} €</b>
          <span class="kpi-dyn-sub">Firmen-Event, 79% Deckungsbeitrag</span>
        </div>
        <div class="kpi-dyn-card">
          <span class="kpi-dyn-lbl">Nötige Termine</span>
          <b class="kpi-dyn-val">${breakEven} Events</b>
          <span class="kpi-dyn-sub">Monatlich, um alle Fixkosten zu decken</span>
        </div>
      </div>
    `;

    // Bind configuration listeners
    $$('#dynKpiBox [data-scen]').forEach(btn => {
      btn.onclick = () => {
        const sc = btn.dataset.scen;
        if (typeof PST !== 'undefined' && SCEN[sc]) {
          PST.scen = sc;
          PST.A = Object.assign({}, SCEN[sc]);
          if (typeof savePlan === 'function') savePlan();
          renderDash();
          if (typeof renderPlan === 'function') renderPlan();
        }
      };
    });
    $$('#dynKpiBox [data-legal]').forEach(btn => {
      btn.onclick = () => {
        if (typeof PST !== 'undefined') {
          PST.legalForm = btn.dataset.legal;
          if (typeof savePlan === 'function') savePlan();
          renderDash();
        }
      };
    });
    $$('#dynKpiBox [data-cap]').forEach(btn => {
      btn.onclick = () => {
        if (typeof PST !== 'undefined') {
          PST.capital = btn.dataset.cap;
          if (typeof savePlan === 'function') savePlan();
          renderDash();
        }
      };
    });
  }

  // 3. Weitermachen-Banner
  let last = null;
  try { last = JSON.parse(store.get('elvaria-last') || 'null'); } catch(e) {}
  let rh = '';
  if (last) {
    let nm = null, len = 0, key = null;
    if (last.kind === 'p') { const p = P.find(x => x.id === last.id); if (p) { nm = p.n; len = p.steps.length; key = 'p-' + p.id; } }
    else if (last.kind === 'i') { const it = I[+last.id]; if (it) { nm = it.t; len = it.s.length; key = 'i-' + last.id; } }
    if (nm) {
      const dn = key ? progOf(key, len) : 0;
      const sub = !key ? 'zuletzt geöffnet' : dn === 0 ? 'noch nicht begonnen' : dn === len ? 'fertig' : `Schritt ${dn + 1} von ${len}`;
      rh = `<button class="resume" data-sub="detail" data-t="${last.kind}" data-id="${last.id}">
        <span class="rt"><b>Weitermachen: ${nm}</b><span>${sub}</span></span>
        <span class="rgo" style="color:var(--gold-accent)">öffnen →</span>
      </button>`;
    }
  }
  const resEl = $('#resume');
  if (resEl) resEl.innerHTML = rh;
}

function renderRoadmapView() {
  const sd = DONE['start'] && Array.isArray(DONE['start']) ? DONE['start'] : [];
  const sdone = sd.filter(Boolean).length;
  const startList = (typeof START !== 'undefined' && Array.isArray(START)) ? START : [];

  const statEl = $('#statusbar');
  if (statEl) {
    statEl.innerHTML = `
      <div class="sb-txt">
        <b>Fortschritt: ${sdone} von 7 Schritten im Fahrplan erledigt</b>
        <span>Jeder Schritt bringt dich näher an den ersten Euro</span>
      </div>`;
  }

  const roadEl = $('#roadmap');
  if (roadEl) {
    roadEl.innerHTML = startList.map((x, i) => {
      const on = !!sd[i];
      const dots = (x.zuerst || []).map(z => `<span>• ${z}</span>`).join(' ');
      return `<article class="rm-step ${on ? 'done' : ''}" id="rm-${i}">
        <div class="rm-step-header">
          <b>${x.n}. ${x.t}</b>
          <button class="step-chk ${on ? 'done' : ''}" data-sc="${i}" aria-label="${x.t} abhaken">${on ? '✓' : ''}</button>
        </div>
        <p style="font-size:13px;color:var(--ink-secondary);margin:8px 0">${x.kurz || ''}</p>
        <div class="rm-step-body">
          ${(x.b || []).map(t => `<p style="margin-bottom:6px">${t}</p>`).join('')}
          <div style="margin-top:10px;font-size:12px;color:var(--navy-deep)"><b>Fokus:</b> ${dots}</div>
        </div>
      </article>`;
    }).join('');

    $$('#roadmap .step-chk').forEach(b => {
      b.onclick = (e) => {
        e.stopPropagation();
        const i = +b.dataset.sc;
        if (!Array.isArray(DONE['start'])) DONE['start'] = [];
        DONE['start'][i] = !DONE['start'][i];
        saveDone();
        renderRoadmapView();
        if (typeof updateHeaderProgress === 'function') updateHeaderProgress();
      };
    });
  }

  const simEl = $('#simple');
  if (simEl && typeof SIMPLE !== 'undefined' && Array.isArray(SIMPLE)) {
    simEl.innerHTML = SIMPLE.map(([q, a]) => `
      <div class="faq-item">
        <div class="fq-btn"><b>${q}</b></div>
        <div class="fa-body" style="display:block">${a}</div>
      </div>
    `).join('');
  }
}
