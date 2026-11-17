/**
 * ELVARIA App Startup & Event Coordination
 * Orchestrates views, state synchronization, and user interactions
 */

function refreshProgress() {
  if (typeof updateHeaderProgress === 'function') updateHeaderProgress();
}

function renderSimpleFAQ() {
  const container = $('#simple');
  if (!container || !window.SIMPLE) return;
  container.innerHTML = window.SIMPLE.map((f, idx) => `
    <div class="faq-accordion-item">
      <button class="fq-btn" aria-expanded="false" onclick="toggleFaq(${idx})">
        <span class="fq-icon">+</span>
        <span class="fq-q">${f[0]}</span>
      </button>
      <div class="fq-ans" id="faqAns-${idx}">${f[1]}</div>
    </div>
  `).join('');
}

function toggleFaq(idx) {
  const ans = document.getElementById('faqAns-' + idx);
  if (!ans) return;
  const isShow = ans.classList.toggle('on');
  const btn = ans.previousElementSibling;
  if (btn) {
    btn.setAttribute('aria-expanded', isShow ? 'true' : 'false');
    const ic = btn.querySelector('.fq-icon');
    if (ic) ic.textContent = isShow ? '−' : '+';
  }
}

// Global Keyboard Shortcuts
document.addEventListener('keydown', e => {
  const inField = e.target.closest('input,textarea,select,[contenteditable]');
  const inDetail = $('#v-detail') && $('#v-detail').classList.contains('on');

  if (e.key === 'Escape') {
    if ($('#gPanel') && !$('#gPanel').hidden) { $('#gPanel').hidden = true; $('#qG').blur(); return; }
    if (inDetail) { e.preventDefault(); $('#back').click(); }
    return;
  }
  if (e.key === '/' && !inField) {
    e.preventDefault();
    const gq = $('#qG');
    if (gq) { gq.focus(); gq.select(); }
    return;
  }
});

// Top Navigation Clicks
$$('#hnav button[data-v]').forEach(btn => {
  btn.onclick = () => showView(btn.dataset.v);
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  if (typeof setupGlobalSearch === 'function') setupGlobalSearch();

  // Initial View Renders
  if (typeof renderDash === 'function') renderDash();
  if (typeof renderPlatformsView === 'function') renderPlatformsView();
  if (typeof renderIdeasView === 'function') renderIdeasView();
  if (typeof renderRoadmapView === 'function') renderRoadmapView();
  renderSimpleFAQ();
  refreshProgress();

  const mPEl = $('#mP');
  if (mPEl && window.P) mPEl.textContent = window.P.length;
  const mIEl = $('#mI');
  if (mIEl && window.I) mIEl.textContent = window.I.length;

  // Apply hash route on load
  if (typeof applyState === 'function') applyState();
});
