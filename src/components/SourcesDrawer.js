/**
 * ELVARIA Research & Sources Module
 * Provides subtle interactive citations and master database explorer
 */
(function(global) {
  'use strict';

  let sourcesData = [];

  function init() {
    sourcesData = (typeof window !== 'undefined' && window.FALLBACK_SOURCES) ? window.FALLBACK_SOURCES : [];

    // Asynchronously enrich with full sources.json if running via http/https
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
          <div class="src-cat-pill" id="srcCategory">Kategorie</div>
          <p class="src-citation" id="srcCitation"></p>
          <div class="src-link-wrap" id="srcLinkWrap">
            <a href="#" target="_blank" rel="noopener noreferrer" id="srcUrl" class="src-ext-link">
              <span>Primärquelle aufrufen</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
        <div class="src-drawer-footer">
          <button class="src-all-btn" id="srcOpenAllBtn">Alle Quellen &amp; Gesetze durchsuchen</button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);

    const modal = document.createElement('div');
    modal.id = 'sourcesModal';
    modal.className = 'src-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
      <div class="src-modal-backdrop" id="srcModalBackdrop"></div>
      <div class="src-modal-card">
        <div class="src-modal-header">
          <div>
            <span class="src-badge-gold">Recherche &amp; Recht</span>
            <h2>Quellen- &amp; Belegdatenbank</h2>
            <p class="src-modal-desc">Verifizierte Primärquellen, Gerichtsurteile, Gesetze und Marktdaten für Elvaria Hamburg.</p>
          </div>
          <button class="src-close-btn" id="srcModalCloseBtn" aria-label="Schließen">&times;</button>
        </div>
        <div class="src-modal-toolbar">
          <div class="src-search-wrap">
            <input type="search" id="srcSearchInput" placeholder="Suche nach Paragrafen, Gesetzen, Plattformen..." aria-label="Quellen durchsuchen">
          </div>
          <div class="src-cat-chips" id="srcCatTags">
            <button class="src-cat-chip on" data-cat="all">Alle</button>
            <button class="src-cat-chip" data-cat="Recht">Recht &amp; Steuern</button>
            <button class="src-cat-chip" data-cat="Eversports">Eversports</button>
            <button class="src-cat-chip" data-cat="Locations">Locations</button>
            <button class="src-cat-chip" data-cat="Preise">Wettbewerb &amp; B2B</button>
          </div>
        </div>
        <div class="src-modal-list" id="srcModalList"></div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function setupEventListeners() {
    document.addEventListener('click', function(e) {
      const trigger = e.target.closest('[data-source]');
      if (trigger) {
        e.preventDefault();
        const sourceId = trigger.getAttribute('data-source');
        openSourceDrawer(sourceId);
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
    const list = sourcesData.length > 0 ? sourcesData : (window.FALLBACK_SOURCES || []);
    const record = list.find(s => s.id === sourceId);
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
    const list = sourcesData.length > 0 ? sourcesData : (window.FALLBACK_SOURCES || []);
    const filtered = list.filter(s => {
      const matchCat = (activeCat === 'all' || (s.category && s.category.includes(activeCat)));
      const matchQ = !q || (s.title && s.title.toLowerCase().includes(q)) || (s.citation && s.citation.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="src-empty">Keine Quellen für „${escapeHtml(query)}" gefunden.</div>`;
      return;
    }

    listEl.innerHTML = filtered.map(s => `
      <div class="src-card">
        <div class="src-card-top">
          <span class="src-card-cat">${escapeHtml(s.category || 'Allgemein')}</span>
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
    getAll: () => (sourcesData.length > 0 ? sourcesData : (window.FALLBACK_SOURCES || []))
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
