/**
 * ELVARIA Research & Sources Module
 * Provides subtle interactive citations and master database explorer
 */
(function(global) {
  'use strict';

  let sourcesData = [];

  // Embedded default sources for instant loading / file:// mode
  const FALLBACK_SOURCES = [
    {
      id: "bgb-195",
      category: "Recht & Steuern",
      title: "BGB § 195 / § 199 (Gutschein-Verjährung)",
      citation: "Regelmäßige Verjährungsfrist von 3 Jahren zum Jahresende für Wertgutscheine (§ 195 BGB i.V.m. § 199 BGB). Bestätigt durch BGH XI ZR 56/07. Eine Verkürzung auf 1 Jahr in Studio-AGB ist unwirksam.",
      url: "https://www.gesetze-im-internet.de/bgb/__195.html"
    },
    {
      id: "bgb-309",
      category: "Recht & Steuern",
      title: "BGB § 309 Nr. 7a (Haftungsklauseln)",
      citation: "Pauschale Haftungsausschlüsse für Körperschäden („Teilnahme auf eigene Gefahr") in AGB sind nach § 309 Nr. 7a BGB gegenüber Verbrauchern stets unwirksam. Schutz entsteht ausschließlich über lückenlose Sorgfaltsdokumentation (Par-Q, Checklisten) und eine vollwertige Veranstalterhaftpflicht.",
      url: "https://www.gesetze-im-internet.de/bgb/__309.html"
    },
    {
      id: "heilprg-1",
      category: "Recht & Steuern",
      title: "Heilpraktikergesetz § 1 & Heilmittelwerbegesetz (HWG)",
      citation: "Diagnosen und Heilversprechen sind approbierten Ärzten und Heilpraktikern vorbehalten (§ 1 HeilprG). Yogalehrende dürfen keine therapeutischen oder lindernden Wirkversprechen bei Burnout, Depression oder Schmerzen abgeben. Untersagt sind Bezeichnungen wie „Sound Healing" oder „Breathwork gegen Angstzustände" im geschäftlichen Verkehr.",
      url: "https://www.gesetze-im-internet.de/heilprg/__1.html"
    },
    {
      id: "sgb-vii-192",
      category: "Recht & Steuern",
      title: "SGB VII § 192 (VBG Unfallversicherung)",
      citation: "Gesetzliche Pflicht zur Anmeldung bei der Verwaltungs-Berufsgenossenschaft (VBG) binnen 1–4 Wochen nach Aufnahme der Lehrtätigkeit — auch für Soloselbstständige ohne Mitarbeiter.",
      url: "https://www.vbg.de"
    },
    {
      id: "sgb-v-20b",
      category: "Netzwerke & Förderung",
      title: "SGB V § 20b & EStG § 3 Nr. 34 (BGF)",
      citation: "Betriebliche Gesundheitsförderung: Arbeitgeber können bis zu 600 € pro Mitarbeiter/Jahr steuer- und sozialabgabenfrei für zertifizierte Maßnahmen nach § 3 Nr. 34 EStG aufwenden. Krankenkassen bezuschussen BGF nach § 20b SGB V mit über 280 Mio. € jährlich.",
      url: "https://www.gesetze-im-internet.de/sgb_5/__20b.html"
    },
    {
      id: "gewo-56a",
      category: "Recht & Steuern",
      title: "Gewerbeordnung § 56a (Wanderlageranzeige)",
      citation: "Öffentlich angekündigte Verkaufs- oder Eventveranstaltungen mit Warenabgabe außerhalb der festen Betriebsstätte sind 2 Wochen im Voraus bei der zuständigen Hamburger Behörde anzuzeigen.",
      url: "https://www.gesetze-im-internet.de/gewo/__56a.html"
    },
    {
      id: "eversports-fee",
      category: "Eversports & Plattformen",
      title: "Eversports Marketplace Konditionen 2026",
      citation: "25% Provision pro Buchung über den Marktplatz, gedeckelt auf maximal 75 € je Neukunde. Buchungen über studioeigene Widgets verbleiben provisionsfrei (nur Standard-Transaktionsgebühr ~2%).",
      url: "https://helpcenter.eversportsmanager.com"
    },
    {
      id: "hh-location-avg",
      category: "Locations & Events",
      title: "Hamburger Location-Mietspiegel 2026 (Kap. 20)",
      citation: "Yogastudios: ø 95 €/Std. (60–150 €); Rooftops: ab 159 €/Std.; Speicherstadt-Lofts: 3.000–12.000 €/Tag. ELVARIA-Betriebsprinzip: 0-€-Raumtausch gegen Neukunden-Generierung für das Partnerstudio.",
      url: null
    },
    {
      id: "gutschein-markt",
      category: "Marktzahlen",
      title: "Deutscher Gutschein-Markt 2026 (Kap. 14)",
      citation: "Marktvolumen in Deutschland: 3,2 Mrd. € (+12,5% p.a.). 60% entfallen auf B2B-Sachbezüge und Mitarbeiter-Incentives. 52% der Gutscheinnutzer geben beim Einlösen mehr aus als den Nennwert des Gutscheins.",
      url: null
    },
    {
      id: "b2b-corporate-rates",
      category: "Wettbewerb & Preise",
      title: "B2B Firmenevent Marktpreise Hamburg (Kap. 16/21)",
      citation: "Team-Yoga: 150 € netto/60 Min (Urban Yoga Hamburg); Solo-Trainerinnen: 60–120 €/Einheit; Halbtages-Retreats: 899–1.800 € bis 10 Personen. Elvaria B2B-Paketpreis: 1.200–1.800 € pro Firmenevent.",
      url: null
    }
  ];

  function init() {
    sourcesData = FALLBACK_SOURCES;

    // Try to asynchronously enrich with full sources.json if running via http/https
    if (typeof window !== 'undefined' && window.location.protocol.startsWith('http')) {
      fetch('src/data/sources.json')
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            sourcesData = data;
          }
        })
        .catch(() => {});
    }

    injectDrawerDOM();
    setupEventListeners();
  }

  function injectDrawerDOM() {
    if (document.getElementById('sourcesDrawer')) return;

    const drawer = document.createElement('div');
    drawer.id = 'sourcesDrawer';
    drawer.className = 'src-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.innerHTML = `
      <div class="src-drawer-backdrop" id="srcBackdrop"></div>
      <div class="src-drawer-panel">
        <div class="src-drawer-header">
          <div class="src-header-title">
            <span class="src-badge-gold">Dossier-Quelle</span>
            <h3 id="srcTitle">Quellen-Nachweis</h3>
          </div>
          <button class="src-close-btn" id="srcCloseBtn" aria-label="Schließen">&times;</button>
        </div>
        <div class="src-drawer-body">
          <div class="src-category-pill" id="srcCategory">Kategorie</div>
          <p class="src-citation-text" id="srcCitation">Zitat und Kontext...</p>
          <div class="src-link-wrap" id="srcLinkWrap">
            <a href="#" target="_blank" rel="noopener noreferrer" class="src-ext-link" id="srcUrl">
              <span>Originalquelle öffnen</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
        <div class="src-drawer-footer">
          <button class="src-btn-outline" id="srcOpenAllBtn">Alle Quellen im Explorer öffnen</button>
        </div>
      </div>
    `;

    // Master Explorer Modal
    const modal = document.createElement('div');
    modal.id = 'sourcesModal';
    modal.className = 'src-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="src-drawer-backdrop" id="srcModalBackdrop"></div>
      <div class="src-modal-panel">
        <div class="src-modal-header">
          <div>
            <span class="src-badge-gold">Wissenschaftliches Fundament</span>
            <h2>ELVARIA Quellen- & Rechtsdatenbank</h2>
            <p>Verifizierte Paragrafen, Marktpreise & Plattform-Kriterien aus dem 2.981-Zeilen-Dossier (Stand Nov. 2026)</p>
          </div>
          <button class="src-close-btn" id="srcModalCloseBtn" aria-label="Schließen">&times;</button>
        </div>
        <div class="src-modal-filter-bar">
          <input type="text" id="srcSearchInput" class="src-search-input" placeholder="Nach Stichwort, § oder Plattform suchen...">
          <div class="src-category-tags" id="srcCatTags">
            <button class="src-cat-chip on" data-cat="all">Alle</button>
            <button class="src-cat-chip" data-cat="Recht & Steuern">Recht & Steuern</button>
            <button class="src-cat-chip" data-cat="Eversports & Plattformen">Plattformen</button>
            <button class="src-cat-chip" data-cat="Marktzahlen">Marktzahlen</button>
            <button class="src-cat-chip" data-cat="Locations & Events">Locations</button>
          </div>
        </div>
        <div class="src-modal-body" id="srcModalList">
          <!-- Populated dynamically -->
        </div>
      </div>
    `;

    document.body.appendChild(drawer);
    document.body.appendChild(modal);
  }

  function setupEventListeners() {
    // Event delegation for citation clicks anywhere in app
    document.addEventListener('click', function(e) {
      const citeTrigger = e.target.closest('[data-source-id]');
      if (citeTrigger) {
        e.preventDefault();
        const sourceId = citeTrigger.getAttribute('data-source-id');
        openSourceDrawer(sourceId);
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeDrawer();
        closeModal();
      }
    });

    const backdrop = document.getElementById('srcBackdrop');
    const closeBtn = document.getElementById('srcCloseBtn');
    const modalBackdrop = document.getElementById('srcModalBackdrop');
    const modalCloseBtn = document.getElementById('srcModalCloseBtn');
    const openAllBtn = document.getElementById('srcOpenAllBtn');
    const searchInput = document.getElementById('srcSearchInput');

    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (openAllBtn) openAllBtn.addEventListener('click', () => { closeDrawer(); openModal(); });

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        renderModalList(this.value);
      });
    }

    const catTags = document.getElementById('srcCatTags');
    if (catTags) {
      catTags.addEventListener('click', function(e) {
        const chip = e.target.closest('.src-cat-chip');
        if (!chip) return;
        catTags.querySelectorAll('.src-cat-chip').forEach(c => c.classList.remove('on'));
        chip.classList.add('on');
        renderModalList(searchInput ? searchInput.value : '');
      });
    }
  }

  function openSourceDrawer(sourceId) {
    const record = sourcesData.find(s => s.id === sourceId) || FALLBACK_SOURCES.find(s => s.id === sourceId);
    if (!record) return;

    const drawer = document.getElementById('sourcesDrawer');
    const titleEl = document.getElementById('srcTitle');
    const catEl = document.getElementById('srcCategory');
    const citEl = document.getElementById('srcCitation');
    const linkWrap = document.getElementById('srcLinkWrap');
    const urlEl = document.getElementById('srcUrl');

    titleEl.textContent = record.title || 'Quellen-Detail';
    catEl.textContent = record.category || 'Dokumentation';
    citEl.textContent = record.citation || '';

    if (record.url) {
      linkWrap.style.display = 'block';
      urlEl.href = record.url;
    } else {
      linkWrap.style.display = 'none';
    }

    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    const drawer = document.getElementById('sourcesDrawer');
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
    }
  }

  function openModal() {
    const modal = document.getElementById('sourcesModal');
    if (!modal) return;
    renderModalList();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    const search = document.getElementById('srcSearchInput');
    if (search) search.focus();
  }

  function closeModal() {
    const modal = document.getElementById('sourcesModal');
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  function renderModalList(query = '') {
    const listEl = document.getElementById('srcModalList');
    if (!listEl) return;

    const activeCatChip = document.querySelector('.src-cat-chip.on');
    const activeCat = activeCatChip ? activeCatChip.getAttribute('data-cat') : 'all';

    const q = query.toLowerCase().trim();
    const filtered = sourcesData.filter(s => {
      const matchCat = (activeCat === 'all' || s.category.includes(activeCat));
      const matchQ = !q || s.title.toLowerCase().includes(q) || s.citation.toLowerCase().includes(q);
      return matchCat && matchQ;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="src-empty">Keine Quellen für „${escapeHtml(query)}" gefunden.</div>`;
      return;
    }

    listEl.innerHTML = filtered.map(s => `
      <div class="src-card">
        <div class="src-card-top">
          <span class="src-card-cat">${escapeHtml(s.category)}</span>
          ${s.url ? `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="src-card-ext">Link öffnen &rarr;</a>` : ''}
        </div>
        <h4>${escapeHtml(s.title)}</h4>
        <p>${escapeHtml(s.citation)}</p>
      </div>
    `).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Public API
  global.ELVARIA_SOURCES = {
    init,
    open: openSourceDrawer,
    openExplorer: openModal,
    getAll: () => sourcesData
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
