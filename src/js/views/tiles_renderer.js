/**
 * ELVARIA Tile Renderers & Views (Platforms & Yoga + X)
 * Clean, elegant presentation without financial spreadsheets
 */

const P_GROUPS = [
  ['ok', 'Sofort offen · Offenes Aufnahme-Formular', '3 Kanäle', '#2C6A4E'],
  ['bedingt', 'Nimmt auf · Mit definierter Hürde oder kuratiert', '7 Kanäle', '#8A5A00'],
  ['unklar', 'Ungeklärt · Klärung für Hamburg offen', '1 Kanal', '#5A6470'],
  ['nein', 'Nimmt aktuell nicht auf · Ausschluss oder zu hohe Hürde', '3 Kanäle', '#9A2B2B']
];

let FILTER_P = 'all';
let FILTER_I = 'all';

function tileP(p) {
  const steps = p.steps || [];
  const dn = typeof progOf === 'function' ? progOf('p-' + p.id, steps.length) : 0;
  const pc = steps.length ? Math.round(dn / steps.length * 100) : 0;
  const full = dn === steps.length && steps.length > 0;
  const idx = (window.P || []).indexOf(p) + 1;

  const AU = {
    ok: ['●', 'sofort offen', 'amp-ok'],
    bedingt: ['◐', 'mit Hürde / kuratiert', 'amp-bed'],
    unklar: ['○', 'ungeklärt', 'amp-unk'],
    nein: ['✕', 'nimmt nicht auf', 'amp-no']
  };
  const au = AU[p.auf] || AU.unklar;

  const CLS = { A: 'Erlebnis-Markt', B: 'Gutschein-Netz', C: 'B2B-Benefit' };

  return `
    <div class="tile platform-card ${full ? 'full' : ''}" data-t="p" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.n}">
      <div class="tile-top">
        <span class="idx">${String(idx).padStart(2, '0')}</span>
        <span class="tag ${p.cls}">${CLS[p.cls] || p.cls}</span>
        <span class="amp-badge ${au[2]}">${au[0]} ${p.aufLab || au[1]}</span>
        ${full ? '<span class="tag doneTag">✓ erledigt</span>' : ''}
      </div>
      <h3>${p.n}</h3>
      <p class="desc">${p.d}</p>
      <div class="tile-meta-grid">
        <div class="tmg-item"><span>Zugang</span><b>${p.dauer}</b></div>
        <div class="tmg-item"><span>Kosten</span><b>${p.kostet}</b></div>
      </div>
      <div class="tile-workaround">
        <b>Wie Elvaria reinkommt:</b>
        <p>${p.aufWie || p.weg}</p>
      </div>
      <div class="tile-foot">
        <span class="ring" style="--p:${pc}"><i>${dn}/${steps.length}</i></span>
        <span class="m">${dn ? (full ? 'Fertig abgehakt' : `${dn} von ${steps.length} erledigt`) : 'Schritt-für-Schritt Anleitung'}</span>
        <span class="go">Anleitung öffnen →</span>
      </div>
    </div>
  `;
}

function tileI(i, idx) {
  const steps = i.s || [];
  const dn = typeof progOf === 'function' ? progOf('i-' + idx, steps.length) : 0;
  const pc = steps.length ? Math.round(dn / steps.length * 100) : 0;
  const full = dn === steps.length && steps.length > 0;

  return `
    <div class="tile idea-card ${full ? 'full' : ''}" data-t="i" data-id="${idx}" tabindex="0" role="button" aria-label="${i.t}">
      <div class="tile-top">
        <span class="idx">${String(idx + 1).padStart(2, '0')}</span>
        <span class="tag idea-cat">${i.cat || 'Yoga + X'}</span>
        <span class="appeal-tag">${i.m.split('·')[0].trim()}</span>
        ${full ? '<span class="tag doneTag">✓ bereit</span>' : ''}
      </div>
      <h3>${i.t}</h3>
      <p class="desc">${i.d}</p>
      
      <div class="idea-highlight-box">
        <b>Recherche &amp; Praxis-Benchmark:</b>
        <p>${i.research}</p>
      </div>

      <div class="idea-flow-preview">
        <b>90-Minuten Ablauf:</b>
        <p>${i.flow}</p>
      </div>

      <div class="tile-foot">
        <span class="ring" style="--p:${pc}"><i>${dn}/${steps.length}</i></span>
        <span class="m">Zielgruppe: ${i.target.split(',')[0]}</span>
        <span class="go">Setup &amp; Checklist →</span>
      </div>
    </div>
  `;
}

function renderPlatformsView() {
  const q = ($('#qP') ? $('#qP').value : '').trim().toLowerCase();
  const allP = window.P || [];
  const list = allP.filter(p => {
    if (FILTER_P === 'ok' && p.auf !== 'ok') return false;
    if (FILTER_P === 'A' && p.cls !== 'A') return false;
    if (FILTER_P === 'B' && p.cls !== 'B') return false;
    if (FILTER_P === 'C' && p.cls !== 'C') return false;
    if (q) {
      const hay = [p.n, p.d, p.g, p.aufWie, p.kostet, p.dauer, p.aufLab].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const nEl = $('#nP');
  if (nEl) nEl.textContent = `${list.length} von ${allP.length}`;
  const cEl = $('#cP');
  if (cEl) cEl.textContent = 'Gutschein- & Erlebnismärkte';
  const eEl = $('#eP');
  if (eEl) eEl.style.display = list.length ? 'none' : 'block';

  const grid = $('#gridP');
  if (!grid) return;

  if (FILTER_P === 'all' && !q) {
    let html = '';
    P_GROUPS.forEach(([code, title, countSub, color]) => {
      const sub = list.filter(p => (p.auf || 'unklar') === code);
      if (!sub.length) return;
      html += `
        <div class="pgrpwrap">
          <div class="pgrpband" style="--pc:${color}">
            <span class="pb-dot">${code === 'ok' ? '●' : code === 'bedingt' ? '◐' : code === 'unklar' ? '○' : '✕'}</span>
            <b>${title}</b>
            <span class="pb-r">${countSub}</span>
            <span class="pb-n">${sub.length}</span>
          </div>
          <div class="tiles-grid">${sub.map(tileP).join('')}</div>
        </div>
      `;
    });
    grid.innerHTML = html;
  } else {
    grid.innerHTML = `<div class="tiles-grid">${list.map(tileP).join('')}</div>`;
  }
}

function renderIdeasView() {
  const q = ($('#qI') ? $('#qI').value : '').trim().toLowerCase();
  const allI = window.I || [];
  const list = allI.map((x, idx) => ({ ...x, _idx: idx })).filter(i => {
    if (FILTER_I !== 'all' && i.cat !== FILTER_I) return false;
    if (q) {
      const hay = [i.t, i.d, i.research, i.flow, i.target, i.cat].join(' ').toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const nEl = $('#nI');
  if (nEl) nEl.textContent = `${list.length} von ${allI.length}`;
  const eEl = $('#eI');
  if (eEl) eEl.style.display = list.length ? 'none' : 'block';

  const wrap = $('#wrapI');
  if (!wrap) return;

  wrap.innerHTML = `<div class="tiles-grid">${list.map(it => tileI(it, it._idx)).join('')}</div>`;
}

// Bind Filter Toolbar Listeners
document.addEventListener('DOMContentLoaded', () => {
  const pInput = $('#qP');
  if (pInput) pInput.addEventListener('input', () => renderPlatformsView());

  const iInput = $('#qI');
  if (iInput) iInput.addEventListener('input', () => renderIdeasView());

  $$('#fPChips button').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#fPChips button').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      FILTER_P = btn.dataset.filter || 'all';
      renderPlatformsView();
    });
  });

  $$('#fIChips button').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#fIChips button').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      FILTER_I = btn.dataset.cat || 'all';
      renderIdeasView();
    });
  });
});
