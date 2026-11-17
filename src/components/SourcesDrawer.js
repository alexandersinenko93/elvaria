/**
 * ELVARIA Research & Sources Module
 * Ultra-Luxury Dark Knowledge & Legal Belegbibliothek
 */
(function(global) {
  'use strict';

  let sourcesData = [];
  let currentFilterCat = 'all';

  function init() {
    sourcesData = (typeof window !== 'undefined' && window.FALLBACK_SOURCES) ? window.FALLBACK_SOURCES : [];

    if (typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')) {
      fetch('src/data/sources.json')
        .then(r => r.ok ? r.json() : null)
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            sourcesData = data;
            updateCategoryCounts();
            const modal = document.getElementById('sourcesModal');
            if (modal && modal.classList.contains('is-open')) {
              renderModalList(document.getElementById('srcSearchInput')?.value || '');
            }
          }
        })
        .catch(() => {});
    }

    injectDrawerDOM();
    setupEventListeners();
    updateCategoryCounts();
  }

  function injectDrawerDOM() {
    if (document.getElementById('sourcesDrawer')) return;

    const drawer = document.createElement('div');
    drawer.id = 'sourcesDrawer';
    drawer.className = 'src-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.innerHTML = global.SOURCES_DRAWER_HTML || '';
    document.body.appendChild(drawer);

    const modal = document.createElement('div');
    modal.id = 'sourcesModal';
    modal.className = 'src-modal';
    modal.setAttribute('role', 'dialog');
    modal.innerHTML = global.SOURCES_MODAL_HTML || '';
    document.body.appendChild(modal);
  }

  function setupEventListeners() {
    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-source]');
      if (trigger) { e.preventDefault(); openSourceDrawer(trigger.getAttribute('data-source')); }
    });

    const bind = (id, fn) => { const el = document.getElementById(id); if (el) el.addEventListener('click', fn); };
    bind('srcBackdrop', closeDrawer);
    bind('srcCloseBtn', closeDrawer);
    bind('srcModalBackdrop', closeModal);
    bind('srcModalCloseBtn', closeModal);
    bind('srcModalFootClose', closeModal);
    bind('srcOpenAllBtn', () => { closeDrawer(); openModal(); });
    bind('srcDrawerCopyBtn', function() {
      copyText(document.getElementById('srcCitation')?.textContent || '', this);
    });

    const searchInput = document.getElementById('srcSearchInput');
    if (searchInput) searchInput.addEventListener('input', function() { renderModalList(this.value); });

    const catTags = document.getElementById('srcCatTags');
    if (catTags) {
      catTags.addEventListener('click', function(e) {
        const chip = e.target.closest('.src-cat-chip');
        if (!chip) return;
        catTags.querySelectorAll('.src-cat-chip').forEach(c => c.classList.remove('on'));
        chip.classList.add('on');
        currentFilterCat = chip.getAttribute('data-cat') || 'all';
        renderModalList(searchInput ? searchInput.value : '');
      });
    }

    if (typeof window.addEventListener === 'function') {
      window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') { closeDrawer(); closeModal(); }
      });
    }
  }

  function updateCategoryCounts() {
    const list = getList();
    const allEl = document.getElementById('chipNAll');
    if (allEl) allEl.textContent = list.length;
    const footCount = document.getElementById('srcFooterCount');
    if (footCount) footCount.textContent = list.length + ' Belege';

    document.querySelectorAll('.chip-n[data-count]').forEach(el => {
      const catKey = el.getAttribute('data-count');
      el.textContent = list.filter(s => matchCategory(s.category, catKey)).length;
    });
  }

  function matchCategory(catString, key) {
    if (!catString) return false;
    const c = catString.toLowerCase(), k = key.toLowerCase();
    if (k === 'all') return true;
    if (k === 'recht') return c.includes('recht') || c.includes('steuer') || c.includes('gesetz');
    if (k === 'plattform') return c.includes('plattform') || c.includes('eversports') || c.includes('ticket');
    if (k === 'locations') return c.includes('location') || c.includes('event');
    if (k === 'markt') return c.includes('markt') || c.includes('preis') || c.includes('wettbewerb');
    if (k === 'förderung') return c.includes('förderung') || c.includes('netzwerk') || c.includes('bgf');
    return c.includes(k);
  }

  function openSourceDrawer(sourceId) {
    const record = getList().find(s => s.id === sourceId);
    if (!record) return;

    const drawer = document.getElementById('sourcesDrawer');
    const titleEl = document.getElementById('srcTitle');
    const catEl = document.getElementById('srcCategory');
    const idEl = document.getElementById('srcIdBadge');
    const citEl = document.getElementById('srcCitation');
    const urlEl = document.getElementById('srcUrl');

    if (titleEl) titleEl.textContent = record.title || 'Quellen-Nachweis';
    if (catEl) catEl.textContent = record.category || 'Recht & Belege';
    if (idEl) idEl.textContent = '#' + (record.id || 'ref');
    if (citEl) citEl.textContent = record.citation || '';

    if (urlEl) {
      if (urlEl.style) urlEl.style.display = record.url ? 'inline-flex' : 'none';
      if (record.url) urlEl.href = record.url;
    }

    if (drawer) {
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    const drawer = document.getElementById('sourcesDrawer');
    if (drawer) {
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      const modal = document.getElementById('sourcesModal');
      if (!modal || !modal.classList.contains('is-open')) document.body.style.overflow = '';
    }
  }

  function openModal() {
    const modal = document.getElementById('sourcesModal');
    if (!modal) return;
    updateCategoryCounts();
    renderModalList();
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const search = document.getElementById('srcSearchInput');
    if (search) setTimeout(() => search?.focus?.(), 80);
  }

  function closeModal() {
    const modal = document.getElementById('sourcesModal');
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      const drawer = document.getElementById('sourcesDrawer');
      if (!drawer || !drawer.classList.contains('is-open')) document.body.style.overflow = '';
    }
  }

  function renderModalList(query = '') {
    const listEl = document.getElementById('srcModalList');
    const countEl = document.getElementById('srcSearchCount');
    if (!listEl) return;

    const q = query.toLowerCase().trim();
    const list = getList();
    const filtered = list.filter(s => {
      const matchCat = matchCategory(s.category, currentFilterCat);
      const matchQ = !q ||
        (s.title && s.title.toLowerCase().includes(q)) ||
        (s.citation && s.citation.toLowerCase().includes(q)) ||
        (s.id && s.id.toLowerCase().includes(q)) ||
        (s.category && s.category.toLowerCase().includes(q));
      return matchCat && matchQ;
    });

    if (countEl) countEl.textContent = `${filtered.length} von ${list.length} Quellen`;

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="src-empty">
          <div class="src-empty-icon">§</div>
          <h3>Keine Primärquelle gefunden</h3>
          <p>Für den Suchbegriff „${escapeHtml(query)}" wurden keine Einträge gefunden. Probiere z. B. „BGB", „HWG", „Eversports" oder setze den Filter zurück.</p>
          <button class="src-empty-reset" onclick="ELVARIA_SOURCES.resetSearch()">Filter zurücksetzen</button>
        </div>`;
      return;
    }

    listEl.innerHTML = filtered.map(s => `
      <div class="src-card" data-card-id="${escapeHtml(s.id)}">
        <div class="src-card-top">
          <div class="src-card-meta">
            <span class="src-card-cat">${escapeHtml(s.category || 'Allgemein')}</span>
            <span class="src-card-id">#${escapeHtml(s.id)}</span>
          </div>
          <div class="src-card-actions">
            ${s.url ? `<a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="src-card-ext" title="Primärquelle öffnen">Link ↗</a>` : ''}
          </div>
        </div>
        <h4>${escapeHtml(s.title)}</h4>
        <p>${escapeHtml(s.citation)}</p>
        <div class="src-card-foot">
          <button type="button" class="src-card-copy" onclick="ELVARIA_SOURCES.copyCitation('${escapeHtml(s.id)}', this)">
            <span>Kopieren</span>
          </button>
        </div>
      </div>`).join('');
  }

  function copyText(text, btnEl) {
    if (!text) return;
    const done = () => {
      if (!btnEl) return;
      const prev = btnEl.innerHTML;
      btnEl.classList.add('copied');
      btnEl.innerHTML = '<span>✓ Kopiert!</span>';
      setTimeout(() => { btnEl.classList.remove('copied'); btnEl.innerHTML = prev; }, 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
      done();
    }
  }

  function getList() {
    return (sourcesData && sourcesData.length > 0) ? sourcesData : (window.FALLBACK_SOURCES || []);
  }

  function escapeHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function resetSearch() {
    const input = document.getElementById('srcSearchInput');
    if (input) input.value = '';
    currentFilterCat = 'all';
    const catTags = document.getElementById('srcCatTags');
    if (catTags) {
      catTags.querySelectorAll('.src-cat-chip').forEach(c => c.classList.remove('on'));
      catTags.querySelector('.src-cat-chip[data-cat="all"]')?.classList.add('on');
    }
    renderModalList();
  }

  // Public API
  global.ELVARIA_SOURCES = {
    init,
    open: openSourceDrawer,
    openExplorer: openModal,
    closeModal,
    closeDrawer,
    resetSearch,
    copyCitation: function(id, btn) {
      const record = getList().find(s => s.id === id);
      if (record) copyText(`${record.title}: ${record.citation}`, btn);
    },
    getAll: getList
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(typeof window !== 'undefined' ? window : this);
