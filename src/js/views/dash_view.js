/**
 * ELVARIA Change-Plan & Roadmap View
 * Makro-Fahrplan (6 Haupt-Phasen) & Kleinteiliger Detail-Fahrplan pro Part
 */
let ROADMAP_MODE = 'deep';
let ROADMAP_FILTER = 'all';

function renderDash() {
  const container = $('#dashPaneUebersicht');
  if (!container) return;

  container.innerHTML = `
    <!-- 1. Executive Summary: Das Vorhaben -->
    <div class="change-plan-summary">
      <div class="cps-head">
        <span class="cps-badge">DAS VORHABEN · MASTER- &amp; CHANGE-PLAN</span>
        <h2>Yoga als Erlebnis &amp; Event statt Kursplan.</h2>
        <p>Der vollständige Strategie-Plan zur Transformation von Elvaria: Wie das Studio ohne fixe Raummiete über die 14 großen Gutschein-Plattformen und innovative Yoga + X Erlebnisse skaliert.</p>
      </div>

      <div class="cps-grid">
        <div class="cps-card">
          <span class="cps-step">SÄULE 01 · MODELL</span>
          <b>Event statt Kursplan</b>
          <p>Verzicht auf das unrentable 10-Matten-Drop-in-Raster. Fokus auf buchbare Signature-Events (Yoga + X) und B2B-Firmenformate.</p>
        </div>
        <div class="cps-card">
          <span class="cps-step">SÄULE 02 · HEBEL</span>
          <b>Der Raum-Deal</b>
          <p>Keine 2.000 € Festmiete. Partnerschaften mit bestehenden Studios in Randzeiten, Rooftops, Hotel-Suiten und Firmenräumen.</p>
        </div>
        <div class="cps-card">
          <span class="cps-step">SÄULE 03 · VERTRIEB</span>
          <b>14 Gutschein-Plattformen</b>
          <p>Automatisierte Kundengewinnung über Erlebnismärkte (gokonfetti, GetYourGuide) und Gutscheinnetzwerke (Wunschgutschein, Atento).</p>
        </div>
        <div class="cps-card">
          <span class="cps-step">SÄULE 04 · RECHT</span>
          <b>100% Verifiziert</b>
          <p>3 Jahre Gutscheingültigkeit (§ 195 BGB), HWG-konforme Kommunikation ohne Heilaussagen, VBG-Pflicht &amp; § 3 Nr. 34 EStG.</p>
        </div>
      </div>

      <!-- Sequentieller Ablauf -->
      <div class="cps-timeline">
        <div class="cps-tl-title">Der sequentielle Ablauf zur Umsetzung:</div>
        <div class="cps-steps-row">
          <button class="cps-step-pill on" data-view="konzept"><span class="num">1</span> Konzept &amp; Vorhaben</button>
          <span class="cps-arr">→</span>
          <button class="cps-step-pill" data-view="plat"><span class="num">2</span> 14 Gutscheinplattformen</button>
          <span class="cps-arr">→</span>
          <button class="cps-step-pill" data-view="ideen"><span class="num">3</span> Yoga + X Konzepte</button>
          <span class="cps-arr">→</span>
          <button class="cps-step-pill" data-view="roadmap"><span class="num">4</span> Fahrplan</button>
        </div>
      </div>
    </div>

    <!-- 2. Ist-Analyse vs. Neue Zielstruktur -->
    <div class="transformation-compare">
      <div class="tc-col tc-before">
        <div class="tc-tag">VORHER · STATUS QUO</div>
        <h3>Klassisches Kursstudio</h3>
        <ul class="tc-list">
          <li><b>Feste Adresse:</b> Henriettenweg 4, feste Miete, hohe Grundkosten.</li>
          <li><b>Starres Raster:</b> 6 feste Kurse/Woche, max. 10 Matten pro Einheit.</li>
          <li><b>Kleine Tickets:</b> Einzelstunden (15–22,50 €) mit hoher Fluktuation.</li>
          <li><b>Kaltakquise nötig:</b> Volles Marketing-Risiko liegt allein beim Studio.</li>
        </ul>
      </div>

      <div class="tc-col tc-after">
        <div class="tc-tag on">JETZT · DAS NEUE ELVARIA-KONZEPT</div>
        <h3>Skalierbares Event- &amp; Plattform-Business</h3>
        <ul class="tc-list">
          <li><b>Nomadisch &amp; Raum-Deals:</b> 0 € fixe Raummiete. Pop-ups, Partnerstudios in Randzeiten &amp; Hotels.</li>
          <li><b>Signature Experiences:</b> Yoga + X (Boxen, Soundbath, Wein, Neon) mit hohem Erlebniswert.</li>
          <li><b>Automatischer Vertrieb:</b> Listung auf den 14 großen Gutschein- und Erlebnismärkten.</li>
          <li><b>B2B-Firmenkunden:</b> Steuerfreie betriebliche Gesundheitsförderung (§ 3 Nr. 34 EStG).</li>
        </ul>
      </div>
    </div>

    <!-- 3. Schnellzugriff zu den Kernbereichen -->
    <div class="dash-quick-links">
      <div class="dql-card" onclick="showView('plat')">
        <div class="dql-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="8" x2="17" y2="8"/><line x1="7" y1="12" x2="13" y2="12"/><line x1="7" y1="16" x2="15" y2="16"/></svg>
        </div>
        <div>
          <b>Die 14 Gutscheinplattformen ansehen</b>
          <p>Status-Ampel (● 3 sofort offen, ◐ 7 mit Bedingung), Zugangs-URLs &amp; Workarounds ohne eigenes Studio.</p>
        </div>
        <span class="dql-arrow">→</span>
      </div>

      <div class="dql-card" onclick="showView('ideen')">
        <div class="dql-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </div>
        <div>
          <b>Das Yoga + X Kompendium erkunden (18 Konzepte)</b>
          <p>Kombinationen: Boxen, Soundbath, Wein, Neon, Matcha, Keramik, SUP, Live-Cello mit realen Benchmarks &amp; Flows.</p>
        </div>
        <span class="dql-arrow">→</span>
      </div>
    </div>

    <!-- 4. Hamburger Partner-Studios (Raum-Deals) & Equipment-Verleih Hub -->
    <div class="dash-hamburg-hub">
      <div class="hub-box">
        <span class="cps-step">HAMBURG RAUM-DEAL DIRECTORY</span>
        <b>Verifizierte Partner-Studios (Randzeiten-Miete)</b>
        <p>Keine 2.000 € Festmiete. Stundenweise Anmietung leerstehender Spitzen-Locations in Eimsbüttel, Hoheluft &amp; Altona:</p>
        <div class="hub-pills">
          <span class="hub-pill"><b>Khôra Studio</b> · Eimsbüttel (200 m², ab 40 €/Std.)</span>
          <span class="hub-pill"><b>The Shala</b> · Eimsbüttel (140 m² Feng-Shui Loft)</span>
          <span class="hub-pill"><b>YogaEasy Space</b> · Hoheluft (54 m², 28 Matten, 40 €/Std.)</span>
          <span class="hub-pill"><b>White Collar Boxing Club</b> · Niendorf (Ring &amp; Pratzensaal)</span>
          <span class="hub-pill"><b>Swawole Atelier</b> · Eppendorfer Weg (Keramik &amp; Töpfern)</span>
          <span class="hub-pill"><b>SUP CLUB Hamburg</b> · Isekai (Yoga-Boards am Fleet)</span>
        </div>
      </div>
      <div class="hub-box">
        <span class="cps-step">EQUIPMENT-VERLEIH &amp; LOGISTIK</span>
        <b>Das mobile „Studio im Kofferraum“</b>
        <p>Ausrüstung auf Abruf – maximale Flexibilität bei minimaler Kapitalbindung:</p>
        <div class="hub-pills">
          <span class="hub-pill"><b>Silent Disco Kopfhörer:</b> 25 Stk. + 3 Sender ca. 125–140 €/WE (Lärmschutz-Joker)</span>
          <span class="hub-pill"><b>432 Hz Kristallschalen:</b> 7-teiliges Quarz-Set in Schutztaschen</span>
          <span class="hub-pill"><b>Box-Equipment:</b> 10 Paar Focus Mitts &amp; waschbare Gel-Quickwraps</span>
          <span class="hub-pill"><b>UV-Schwarzlicht Fluter:</b> 4x 50W LED Fluter (395nm) &amp; Bio-Neonfarben</span>
        </div>
      </div>
    </div>
  `;

  // Delegate events for cps-step-pill
  $$('#dashPaneUebersicht [data-view]').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      showView(btn.dataset.view);
    };
  });
}

function setRoadmapMode(mode) {
  ROADMAP_MODE = mode;
  renderRoadmapView();
}

function setRoadmapFilter(partId) {
  ROADMAP_FILTER = partId;
  renderRoadmapView();
}

function renderRoadmapView() {
  const container = $('#dashPaneRoadmap');
  if (!container) return;
  const parts = window.ROADMAP_PARTS || [];
  const allSteps = window.ROADMAP_STEPS || [];
  const totalDone = allSteps.filter(s => typeof isStepDone === 'function' && isStepDone(s.id)).length;
  const totalPct = allSteps.length ? Math.round((totalDone / allSteps.length) * 100) : 0;

  let html = `
    <div class="roadmap-head">
      <div class="psh-text">
        <span class="cps-badge">MASTER- &amp; DETAIL-FAHRPLAN</span>
        <h2>In 6 Parts &amp; ${allSteps.length} Schritten zum Event-Business</h2>
        <p>Chronologisch aufeinander aufbauend: Wähle zwischen dem übergeordneten Phasen-Überblick und dem kleinteiligen Detail-Fahrplan.</p>
      </div>
      <div class="rm-mode-bar">
        <div class="rm-mode-tabs">
          <button class="chip ${ROADMAP_MODE === 'macro' ? 'on' : ''}" onclick="setRoadmapMode('macro')">Grober Fahrplan (6 Phasen)</button>
          <button class="chip ${ROADMAP_MODE === 'deep' ? 'on' : ''}" onclick="setRoadmapMode('deep')">Kleinteiliger Detail-Fahrplan (${totalDone}/${allSteps.length} erledigt · ${totalPct}%)</button>
        </div>
      </div>
    </div>
  `;

  if (ROADMAP_MODE === 'macro') {
    // ── 1. Grober Fahrplan (Die 6 Makro-Phasen) ──
    html += '<div class="macro-roadmap-grid">';
    parts.forEach(part => {
      const partDone = part.steps.filter(s => typeof isStepDone === 'function' && isStepDone(s.id)).length;
      const partPct = part.steps.length ? Math.round((partDone / part.steps.length) * 100) : 0;
      const isPartFull = partDone === part.steps.length && part.steps.length > 0;

      html += `
        <div class="macro-part-card ${isPartFull ? 'full' : ''}">
          <div class="mpc-top">
            <span class="cps-step">PART 0${part.num} · ${part.timeframe}</span>
            <span class="mpc-badge ${isPartFull ? 'done' : ''}">${partDone} / ${part.steps.length} erledigt</span>
          </div>
          <h3>${part.title}</h3>
          <p class="mpc-lead">${part.lead}</p>
          <div class="mpc-pbar"><i style="width:${partPct}%"></i></div>
          <div class="mpc-steps-preview">
            ${part.steps.map(s => {
              const done = typeof isStepDone === 'function' && isStepDone(s.id);
              return `<div class="mpc-mini-step ${done ? 'done' : ''}"><i>${done ? '✓' : '○'}</i><span>${s.title}</span></div>`;
            }).join('')}
          </div>
          <button class="mpc-btn" onclick="setRoadmapFilter('${part.id}'); setRoadmapMode('deep');">
            Detail-Fahrplan für Part ${part.num} öffnen (${part.steps.length} Schritte) →
          </button>
        </div>
      `;
    });
    html += '</div>';
  } else {
    // ── 2. Kleinteiliger Detail-Fahrplan pro Part ──
    html += `
      <div class="filter-toolbar rm-filter-toolbar">
        <div class="ft-chips" id="fRmChips">
          <button class="chip ${ROADMAP_FILTER === 'all' ? 'on' : ''}" onclick="setRoadmapFilter('all')">Alle 6 Parts (${allSteps.length})</button>
          ${parts.map(p => `
            <button class="chip ${ROADMAP_FILTER === p.id ? 'on' : ''}" onclick="setRoadmapFilter('${p.id}')">Part ${p.num}: ${p.title.split(' ')[0]}</button>
          `).join('')}
        </div>
      </div>
      <div class="roadmap-timeline-list">
    `;

    const visibleParts = ROADMAP_FILTER === 'all' ? parts : parts.filter(p => p.id === ROADMAP_FILTER);

    visibleParts.forEach(part => {
      const partDone = part.steps.filter(s => typeof isStepDone === 'function' && isStepDone(s.id)).length;
      html += `
        <div class="rm-part-section">
          <div class="pgrpband" style="--pc:var(--gold);margin-top:20px">
            <span class="pb-dot">Part ${part.num}</span>
            <b>${part.title}</b>
            <span class="pb-r">${part.timeframe}</span>
            <span class="pb-n">${partDone} / ${part.steps.length}</span>
          </div>
      `;

      part.steps.forEach((st, idx) => {
        const isDone = typeof isStepDone === 'function' && isStepDone(st.id);
        const linkHtml = st.link ? `<button class="rm-link-btn" onclick="openDetail('${st.link.kind}', '${st.link.id}')">${st.link.label} ↗</button>` : '';

        html += `
          <div class="roadmap-item ${isDone ? 'done' : ''}" data-step-id="${st.id}">
            <div class="rmi-left">
              <span class="rmi-num">${String(idx + 1).padStart(2, '0')}</span>
              <button class="rmi-check ${isDone ? 'checked' : ''}" onclick="toggleStepRoadmap('${st.id}')" aria-label="Schritt abhaken">
                ${isDone ? '✓' : ''}
              </button>
            </div>
            <div class="rmi-body">
              <div class="rmi-meta">
                <span class="rmi-phase">Part ${part.num} · ${part.timeframe}</span>
                <span class="rmi-time">Dauer: ${st.time}</span>
              </div>
              <h3>${st.title}</h3>
              <p>${st.desc}</p>
              ${st.hint ? `<div class="rmi-hint"><b>Praxis-Tipp:</b> ${st.hint}</div>` : ''}
              ${linkHtml ? `<div class="rmi-actions">${linkHtml}</div>` : ''}
            </div>
          </div>
        `;
      });
      html += '</div>';
    });

    html += '</div>';
  }

  container.innerHTML = html;
}

function toggleStepRoadmap(stepId) {
  if (typeof toggleStep === 'function') {
    toggleStep(stepId);
    renderRoadmapView();
    if (typeof refreshProgress === 'function') refreshProgress();
  }
}
