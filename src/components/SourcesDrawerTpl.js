/**
 * ELVARIA Sources Drawer & Modal DOM Templates
 */
(function(global) {
  'use strict';

  global.SOURCES_DRAWER_HTML = `
    <div class="src-drawer-backdrop" id="srcBackdrop"></div>
    <div class="src-drawer-panel">
      <div class="src-drawer-header">
        <div class="src-header-title">
          <span class="src-badge-gold">DOSSIER-BELEG · VERIFIZIERT</span>
          <h3 id="srcTitle">Quellen-Nachweis</h3>
        </div>
        <button class="src-close-btn" id="srcCloseBtn" aria-label="Schließen" title="Schließen (ESC)">✕</button>
      </div>
      <div class="src-drawer-body">
        <div class="src-drawer-topmeta">
          <span class="src-cat-pill" id="srcCategory">Kategorie</span>
          <span class="src-id-badge" id="srcIdBadge">#id</span>
        </div>
        <blockquote class="src-citation" id="srcCitation"></blockquote>
        <div class="src-relevance-box">
          <span class="srb-tag">RELEVANZ FÜR ELVARIA</span>
          <p id="srcRelevance">Rechtliche &amp; wirtschaftliche Absicherung für die Skalierung ohne Mietbindung in Hamburg.</p>
        </div>
        <div class="src-actions-row">
          <a href="#" target="_blank" rel="noopener noreferrer" id="srcUrl" class="src-ext-link">
            <span>Primärquelle aufrufen ↗</span>
          </a>
          <button type="button" class="src-copy-btn" id="srcDrawerCopyBtn" title="Zitat kopieren">
            <span>Zitat kopieren</span>
          </button>
        </div>
      </div>
      <div class="src-drawer-footer">
        <button class="src-all-btn" id="srcOpenAllBtn">
          <span>Quellen- &amp; Belegdatenbank öffnen</span>
          <i class="src-all-count" id="srcFooterCount">66 Belege</i>
        </button>
      </div>
    </div>
  `;

  global.SOURCES_MODAL_HTML = `
    <div class="src-modal-backdrop" id="srcModalBackdrop"></div>
    <div class="src-modal-card">
      <div class="src-modal-header">
        <div class="smh-left">
          <span class="src-badge-gold">ELVARIA ARCHIV · VERIFIZIERTE WISSENSBASIS</span>
          <h2>Quellen-, Gesetzes- &amp; Belegbibliothek</h2>
          <p class="src-modal-desc">120 verifizierte Primärquellen, 50 weltweite Benchmarks, BGB- &amp; HWG-Paragrafen, Gerichtsurteile und Plattform-Standards für Elvaria Hamburg.</p>
        </div>
        <button class="src-close-btn" id="srcModalCloseBtn" aria-label="Schließen" title="Schließen (ESC)">✕</button>
      </div>
      <div class="src-modal-toolbar">
        <div class="src-search-wrap">
          <svg class="src-search-ico" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="search" class="src-search-input" id="srcSearchInput" placeholder="Suche nach Paragraf (§), Gesetz, Urteil, Plattform, Ort..." aria-label="Quellen durchsuchen" autocomplete="off">
          <span class="src-search-count" id="srcSearchCount">120 Quellen</span>
        </div>
        <div class="src-cat-chips" id="srcCatTags">
          <button class="src-cat-chip on" data-cat="all">Alle <span class="chip-n" id="chipNAll">120</span></button>
          <button class="src-cat-chip" data-cat="benchmarks">Globale Benchmarks (50) <span class="chip-n" data-count="benchmarks"></span></button>
          <button class="src-cat-chip" data-cat="Recht">Recht &amp; Steuern <span class="chip-n" data-count="Recht"></span></button>
          <button class="src-cat-chip" data-cat="Plattform">Plattformen <span class="chip-n" data-count="Plattform"></span></button>
          <button class="src-cat-chip" data-cat="Locations">Locations &amp; Events <span class="chip-n" data-count="Locations"></span></button>
          <button class="src-cat-chip" data-cat="Markt">Markt &amp; Preise <span class="chip-n" data-count="Markt"></span></button>
          <button class="src-cat-chip" data-cat="Förderung">B2B &amp; Förderung <span class="chip-n" data-count="Förderung"></span></button>
        </div>
      </div>
      <div class="src-modal-list" id="srcModalList" tabindex="0"></div>
      <div class="src-modal-foot">
        <span>Alle Belege basieren auf dem Elvaria Master-Dossier (Hamburg 2024/2025).</span>
        <button class="src-foot-close" id="srcModalFootClose">Schließen</button>
      </div>
    </div>
  `;
})(typeof window !== 'undefined' ? window : this);
