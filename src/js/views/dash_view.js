/**
 * ELVARIA Change-Plan & Executive Summary View
 * Das Vorhaben: Vom festen Kursstudio zum skalierbaren Event-Business
 * 100% frei von Finanztabellen und Rechtsform-Rechnern
 */

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
          <button class="cps-step-pill" data-view="roadmap"><span class="num">4</span> 7-Schritte-Fahrplan</button>
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

function renderRoadmapView() {
  const container = $('#dashPaneRoadmap');
  if (!container) return;
  if (typeof window.ROADMAP_STEPS === 'undefined') return;

  const steps = window.ROADMAP_STEPS;
  let html = `
    <div class="roadmap-head">
      <span class="cps-badge">SEQUENTIELLER FAHRPLAN</span>
      <h2>In 7 Schritten zum ersten Event &amp; Euro</h2>
      <p>Chronologisch aufeinander aufbauend. Jeder Schritt ist abhakbar und speichert den Fortschritt lokal.</p>
    </div>
    <div class="roadmap-timeline-list">
  `;

  steps.forEach((st, idx) => {
    const isDone = typeof isStepDone === 'function' ? isStepDone(st.id) : false;
    html += `
      <div class="roadmap-item ${isDone ? 'done' : ''}" data-step-id="${st.id}">
        <div class="rmi-left">
          <span class="rmi-num">${idx + 1}</span>
          <button class="rmi-check ${isDone ? 'checked' : ''}" onclick="toggleStepRoadmap('${st.id}')" aria-label="Schritt abhaken">
            ${isDone ? '✓' : ''}
          </button>
        </div>
        <div class="rmi-body">
          <div class="rmi-meta"><span class="rmi-phase">${st.phase}</span><span class="rmi-time">${st.time}</span></div>
          <h3>${st.title}</h3>
          <p>${st.desc}</p>
          <div class="rmi-subtasks">
            ${(st.tasks || []).map(t => `<div class="rmi-task"><i>•</i><span>${t}</span></div>`).join('')}
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
}

function toggleStepRoadmap(stepId) {
  if (typeof toggleStep === 'function') {
    toggleStep(stepId);
    renderRoadmapView();
    if (typeof refreshProgress === 'function') refreshProgress();
  }
}
