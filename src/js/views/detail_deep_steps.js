/**
 * ELVARIA Detail Deep Steps & Progress Helper
 * Defensive DOM execution and interactive step toggling
 */
function dkey(k, i) { return 'd-' + k + '-' + i; }
function isDeep(k, i) { const a = DONE[dkey(k, i)]; return !!(a && a[0]); }

function renderDeep(p) {
  const dDeep = $('#dDeep');
  if (!dDeep) return;
  const d = (window.DEEP || {})[p.id];
  const facts = p.auf === 'nein'
    ? '<div class="dnote warn"><b>Bevor du anfängst:</b> Dieser Weg ist heute nicht offen. Der Guide zeigt, was du tun müsstest, wenn du ihn willst — und was stattdessen schneller geht.</div>'
    : '';
  if (!d) {
    dDeep.innerHTML = facts + '<p class="dlead" style="color:var(--ink-secondary);padding:14px 0">Für diese Plattform ist eine Kurzanleitung hinterlegt.</p>';
    return;
  }

  /* Anforderungen */
  const reqHtml = `
    <section class="dsec">
      <h3 style="font-family:var(--font-serif);color:#FFF;margin-bottom:14px">Bevor du anfängst</h3>
      <div class="dreq-grid">
        <div class="dreq-col">
          <span class="dreq-lbl">Das brauchst du</span>
          <ul>${(d.req || []).map(r => `<li>${r}</li>`).join('')}</ul>
        </div>
        <div class="dreq-col">
          <span class="dreq-lbl">Wichtige Links</span>
          <ul class="dlink">${(d.link || []).map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t} <span>↗</span></a></li>`).join('')}</ul>
        </div>
      </div>
    </section>
  `;

  /* Schritte */
  const stepsHtml = (d.deep || []).map((st, i) => {
    const dt = dkey(p.id, i), on = isDeep(p.id, i);
    const cls = st.w ? (' ' + st.w) : '';
    const links = st.l ? `<div class="dlinks">${st.l.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t} <span>↗</span></a>`).join('')}</div>` : '';
    const checks = st.c ? `<div class="dcheck"><b>Checkliste:</b><ul>${st.c.map(c => `<li>${c}</li>`).join('')}</ul></div>` : '';
    return `
      <article class="dstep${cls}${on ? ' done' : ''}" id="ds-${i}">
        <button class="dstep-h" data-dk="${dt}" data-pid="${p.id}" data-i="${i}" aria-pressed="${on ? 'true' : 'false'}">
          <span class="dnum">${String(i + 1).padStart(2, '0')}</span>
          <span class="dtitle"><b>${st.t}</b>${st.h ? `<em>${st.h}</em>` : ''}</span>
          <span class="dtick" aria-hidden="true">${on ? '✓' : ''}</span>
        </button>
        <div class="dbody">
          ${st.b.map(b => `<p>${b}</p>`).join('')}
          ${links}${checks}
        </div>
      </article>
    `;
  }).join('');

  /* Mini-Guide */
  const g = d.gu;
  const guHtml = g ? `
    <section class="dsec">
      <div class="gu-box">
        <div class="gu-h"><span style="color:var(--gold);font-size:11px;letter-spacing:0.12em;text-transform:uppercase">Auf den Punkt</span><b>${g.t}</b></div>
        <ul class="gu-s">${(g.s || []).map(x => `<li>${x}</li>`).join('')}</ul>
        <div class="gu-split">
          <div class="gu-b ok"><h4>Immer</h4><ul>${(g.must || []).map(x => `<li>${x}</li>`).join('')}</ul></div>
          <div class="gu-b no"><h4>Nie</h4><ul>${(g.nope || []).map(x => `<li>${x}</li>`).join('')}</ul></div>
        </div>
        <div class="gu-z"><span>Wichtige Kennzahl:</span> <b>${g.zahl}</b></div>
      </div>
    </section>
  ` : '';

  /* FAQ */
  const faq = d.faq ? `
    <section class="dsec">
      <h3 style="font-family:var(--font-serif);color:#FFF;margin-bottom:14px">Häufige Fragen zu diesem Kanal</h3>
      <div class="dqa">${d.faq.map(([q, a]) => `<div class="dqa-i"><b>${q}</b><p>${a}</p></div>`).join('')}</div>
    </section>
  ` : '';

  dDeep.innerHTML = facts + reqHtml + `
    <section class="dsec">
      <h3 style="font-family:var(--font-serif);color:#FFF;margin-bottom:8px">Schritt für Schritt Onboarding</h3>
      <p class="dlead" style="color:var(--ink-secondary);font-size:13px;margin-bottom:16px">${d.deep.length} Schritte bis zur Freischaltung. Klick auf die Kopfzeile hakt den Schritt ab.</p>
      <div class="dsteps-list">${stepsHtml}</div>
    </section>
  ` + guHtml + faq;

  $$('#dDeep .dstep-h').forEach(b => {
    b.onclick = () => {
      const k = b.dataset.dk;
      if (!Array.isArray(DONE[k])) DONE[k] = [];
      DONE[k][0] = !DONE[k][0];
      saveDone();
      const art = b.closest('.dstep');
      if (art) art.classList.toggle('done', !!DONE[k][0]);
      b.setAttribute('aria-pressed', DONE[k][0] ? 'true' : 'false');
      const tick = b.querySelector('.dtick');
      if (tick) tick.textContent = DONE[k][0] ? '✓' : '';
      if (typeof refreshProgress === 'function') refreshProgress();
      segCounts(p);
    };
  });

  const cta2 = $('#dCta2');
  if (cta2) {
    cta2.innerHTML = `
      <button class="cta" data-act="deepcopy">Gesamten Deep-Guide kopieren</button>
      <button class="cta ghost" data-act="printdeep">Als PDF drucken</button>
      <button class="cta ghost" data-act="seg-quick">← Zurück zur Kurzanleitung</button>
    `;
    cta2.querySelectorAll('[data-act]').forEach(b => {
      b.onclick = () => {
        const a = b.dataset.act;
        if (a === 'deepcopy') { copyText(deepText(p), 'Deep-Guide kopiert'); }
        if (a === 'printdeep') { window.print(); }
        if (a === 'seg-quick') { setSeg('quick'); }
      };
    });
  }

  $$('#dFacts [data-jump]').forEach(b => {
    b.onclick = () => {
      setSeg('deep');
      const t = $('#paneDeep');
      if (t) t.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };
  });
}

function segCounts(p) {
  const d = (window.DEEP || {})[p.id];
  const qn = $('#segQN'), dn = $('#segDN');
  if (qn) qn.textContent = (p.steps || []).length + ' Schritte';
  if (dn) dn.textContent = d ? (d.deep.length + ' Schritte') : 'Kurzanleitung';
}

function deepText(p) {
  const d = (window.DEEP || {})[p.id];
  if (!d) return p.n;
  let t = p.n + '\n' + '─'.repeat(p.n.length) + '\n\n';
  (d.deep || []).forEach((s, i) => {
    t += (i + 1) + '. ' + s.t + '\n';
    (s.b || []).forEach(x => t += '   ' + x.replace(/<[^>]+>/g, '') + '\n');
  });
  return t;
}

function renderSteps(steps, key) {
  const dSteps = $('#dSteps');
  if (!dSteps) return;
  const dn = DONE[key] && Array.isArray(DONE[key]) ? DONE[key] : [];
  dSteps.innerHTML = (steps || []).map((s, k) => {
    const a = Array.isArray(s) ? s[0] : s;
    const n = Array.isArray(s) ? s[1] : '';
    const on = !!dn[k];
    return `
      <button class="step ${on ? 'done' : ''}" data-k="${k}" role="checkbox" aria-checked="${on ? 'true' : 'false'}">
        <span class="step-num">${String(k + 1).padStart(2, '0')}</span>
        <span class="step-txt"><b>${a}</b>${n ? `<em>${n}</em>` : ''}</span>
        <span class="step-check" aria-hidden="true">${on ? '✓' : ''}</span>
      </button>
    `;
  }).join('');

  $$('#dSteps .step').forEach(el => {
    el.onclick = () => {
      const k = +el.dataset.k;
      if (!Array.isArray(DONE[key])) DONE[key] = [];
      DONE[key][k] = !DONE[key][k];
      el.classList.toggle('done', !!DONE[key][k]);
      el.setAttribute('aria-checked', DONE[key][k] ? 'true' : 'false');
      const chk = el.querySelector('.step-check');
      if (chk) chk.textContent = DONE[key][k] ? '✓' : '';
      saveDone();
      updateBar(key, steps.length);
      if (typeof refreshProgress === 'function') refreshProgress();
    };
  });
  updateBar(key, steps.length);
}

function updateBar(key, len) {
  const dn = typeof progOf === 'function' ? progOf(key, len) : 0;
  const pc = len ? Math.round(dn / len * 100) : 0;
  const bar = $('#dBar');
  if (bar) {
    bar.style.width = pc + '%';
    if (bar.parentNode) bar.parentNode.setAttribute('aria-valuenow', pc);
  }
  const num = $('#dNum');
  if (num) num.textContent = `${dn} / ${len} Schritte`;
  const m = $('#markAll');
  if (m) m.textContent = (dn === len && len > 0) ? 'Alle zurücksetzen' : 'Alle Schritte abhaken';
}
