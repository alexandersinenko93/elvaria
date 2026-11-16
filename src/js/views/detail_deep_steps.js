/**
 * ELVARIA Detail Deep Steps & Progress Helper
 */
function dkey(k,i){ return 'd-'+k+'-'+i; }
function isDeep(k,i){ const a=DONE[dkey(k,i)]; return !!(a&&a[0]); }

function renderDeep(p){
  const d=DEEP[p.id];
  const facts=p.auf==='nein'
    ? '<div class="dnote warn"><b>Bevor du anfängst:</b> Dieser Weg ist heute nicht offen. Der Guide zeigt, was du tun müsstest, wenn du ihn willst — und was stattdessen schneller geht.</div>'
    : '';
  if(!d){ $('#dDeep').innerHTML=facts+'<p class="dlead">Für diese Plattform ist kein Deep-Guide hinterlegt.</p>'; return; }

  /* Anforderungen */
  const reqHtml = `<section class="dsec">
    <h2 tabindex="-1">Bevor du anfängst</h2>
    <div class="dreq">
      <div class="dreq-col"><h3>Das brauchst du</h3><ul>${(d.req||[]).map(r=>`<li>${r}</li>`).join('')}</ul></div>
      <div class="dreq-col"><h3>Links</h3><ul class="dlink">${(d.link||[]).map(([t,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${t}<span>${u.replace(/^https?:\/\//,'')}</span></a></li>`).join('')}</ul></div>
    </div>
  </section>`;

  /* Schritte */
  const stepsHtml = d.deep.map((st,i)=>{
    const dt=dkey(p.id,i), on=isDeep(p.id,i);
    const cls=st.w?(' '+st.w):'';
    const links = st.l?`<div class="dlinks">${st.l.map(([t,u])=>`<a href="${u}" target="_blank" rel="noopener">${t} <span>↗</span></a>`).join('')}</div>`:'';
    const checks = st.c?`<div class="dcheck"><b>Abhaken</b><ul>${st.c.map(c=>`<li>${c}</li>`).join('')}</ul></div>`:'';
    return `<article class="dstep${cls}${on?' done':''}" id="ds-${i}">
      <button class="dstep-h" data-dk="${dt}" data-pid="${p.id}" data-i="${i}" aria-pressed="${on?'true':'false'}">
        <span class="dnum">${String(i+1).padStart(2,'0')}</span>
        <span class="dtitle"><b>${st.t}</b>${st.h?`<em>${st.h}</em>`:''}</span>
        <span class="dtick" aria-hidden="true">✓</span>
      </button>
      <div class="dbody">
        ${st.b.map(b=>`<p>${b}</p>`).join('')}
        ${links}${checks}
      </div>
    </article>`;
  }).join('');

  /* Mini-Guide */
  const g=d.gu;
  const guHtml = g?`<section class="dsec">
    <h2>Mini-Guide</h2>
    <div class="gu">
      <div class="gu-h"><span>In zwei Minuten verstanden</span><b>${g.t.replace(/^Mini-Guide\s*/,'Auf den Punkt: ')}</b></div>
      <ul class="gu-s">${g.s.map(x=>`<li>${x}</li>`).join('')}</ul>
      <div class="gu-2">
        <div class="gu-b ok"><h4>Immer</h4><ul>${g.must.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="gu-b no"><h4>Nie</h4><ul>${g.nope.map(x=>`<li>${x}</li>`).join('')}</ul></div>
      </div>
      <div class="gu-z"><span>Die Zahl, die zählt</span><b>${g.zahl}</b></div>
    </div>
  </section>`:'';

  /* FAQ */
  const faq = d.faq?`<section class="dsec"><h2>Zwei Fragen, die dann kommen</h2>
    <div class="dqa">${d.faq.map(([q,a])=>`<div class="dqa-i"><b>${q}</b><p>${a}</p></div>`).join('')}</div></section>`:'';

  $('#dDeep').innerHTML = facts + reqHtml + `<section class="dsec"><h2>Schritt für Schritt</h2>
    <p class="dlead">${d.deep.length} Schritte. Erst wenn alle abgehakt sind, ist der Kanal wirklich fertig. Kopfzeile anklicken hakt ab, der Text bleibt immer sichtbar.</p>
    <div class="dsteps">${stepsHtml}</div></section>` + guHtml + faq;

  $$('#dDeep .dstep-h').forEach(b=>b.onclick=()=>{
    const k=b.dataset.dk;
    if(!Array.isArray(DONE[k])) DONE[k]=[];
    DONE[k][0]=!DONE[k][0];
    saveDone();
    const art=b.closest('.dstep');
    art.classList.toggle('done',!!DONE[k][0]);
    b.setAttribute('aria-pressed',DONE[k][0]?'true':'false');
    refreshProgress();
    segCounts(p);
  });

  $('#dCta2').innerHTML=`<button class="cta" data-act="deepcopy">Gesamten Guide kopieren</button>
    <button class="cta ghost" data-act="printdeep">Als PDF drucken</button>
    <button class="cta ghost" data-act="seg-quick">← Kurzanleitung zeigen</button>`;
  $$('#dFacts [data-jump]').forEach(b=>b.onclick=()=>{
    setSeg('deep');
    try{ store.set('elvaria-seg','deep'); }catch(e){}
    const t=$('#paneDeep'); if(t) t.scrollIntoView({block:'start',behavior:'smooth'});
  });
  $$('#dCta2 [data-act]').forEach(b=>b.onclick=()=>{
    const a=b.dataset.act;
    if(a==='deepcopy'){ copyText(deepText(p)); toast('Guide kopiert'); }
    if(a==='printdeep'){ document.body.classList.add('printdeep'); window.print(); setTimeout(()=>document.body.classList.remove('printdeep'),600); }
    if(a==='seg-quick'){ setSeg('quick'); }
  });
}
function segCounts(p){
  const d=DEEP[p.id];
  const qn=$('#segQN'), dn=$('#segDN');
  if(qn) qn.textContent=p.steps.length+' Schritte';
  if(dn) dn.textContent=d?(d.deep.length+' Schritte · Mini-Guide'):'nicht verfügbar';
}
function deepText(p){
  const d=DEEP[p.id]; if(!d) return p.n;
  let t=p.n+'\n'+'─'.repeat(p.n.length)+'\n\nBevor du anfängst\n';
  (d.req||[]).forEach(r=>t+='• '+r+'\n');
  t+='\nLinks\n'; (d.link||[]).forEach(([a,u])=>t+='• '+a+': '+u+'\n');
  t+='\nSchritt für Schritt\n';
  d.deep.forEach((s,i)=>{
    t+='\n'+(i+1)+'. '+s.t+(s.h?' ('+s.h+')':'')+'\n';
    s.b.forEach(x=>t+='   '+x.replace(/<[^>]+>/g,'')+'\n');
    if(s.l) s.l.forEach(([a,u])=>t+='   → '+a+': '+u+'\n');
    if(s.c) t+='   Abhaken: '+s.c.join(' · ')+'\n';
  });
  if(d.gu){ t+='\nMini-Guide: '+d.gu.t+'\n'; d.gu.s.forEach(x=>t+='• '+x+'\n');
    t+='Immer: '+d.gu.must.join(' · ')+'\nNie: '+d.gu.nope.join(' · ')+'\nZahl: '+d.gu.zahl+'\n'; }
  if(d.faq) d.faq.forEach(([q,a])=>t+='\nF: '+q+'\nA: '+a+'\n');
  return t;
}
const totalDeep = Object.keys(DEEP).reduce((a,k)=>a+DEEP[k].deep.length,0);
totalAllDeep = totalAll + totalDeep;

function renderSteps(steps,key){
  const dn=DONE[key]&&Array.isArray(DONE[key])?DONE[key]:[];
  $('#dSteps').innerHTML=steps.map((s,k)=>{
    const a=Array.isArray(s)?s[0]:s, n=Array.isArray(s)?s[1]:'';
    const on=!!dn[k];
    return `<button class="step ${on?'done':''}" data-k="${k}" role="checkbox" aria-checked="${on?'true':'false'}">
      <span class="bx" aria-hidden="true">✓</span>
      <span class="num" aria-hidden="true">${String(k+1).padStart(2,'0')}</span>
      <span class="txt"><b>${a}</b>${n?`<em>${n}</em>`:''}</span>
    </button>`;
  }).join('');
  $$('#dSteps .step').forEach(el=>el.onclick=()=>{
    const k=+el.dataset.k;
    if(!Array.isArray(DONE[key])) DONE[key]=[];
    DONE[key][k]=!DONE[key][k];
    el.classList.toggle('done',!!DONE[key][k]);
    el.setAttribute('aria-checked',DONE[key][k]?'true':'false');
    saveDone(); updateBar(key,steps.length); refreshProgress();
  });
  updateBar(key,steps.length);
}
function totalDone(){
  let n=0;
  P.forEach(p=>n+=progOf('p-'+p.id,p.steps.length));
  I.forEach((it,i)=>n+=progOf('i-'+i,it.s.length));
  Object.keys(DEEP).forEach(k=>{ const a=DONE['d-'+k+'-'+0]; });
  Object.keys(DONE).forEach(k=>{ if(k.indexOf('d-')===0){ const a=DONE[k]; if(Array.isArray(a)) n+=a.filter(Boolean).length; } });
  return n;
}
function updateBar(key,len){
  const dn=progOf(key,len), pc=Math.round(dn/len*100);
  $('#dBar').style.width=pc+'%';
  $('#dBar').parentNode.setAttribute('aria-valuenow',pc);
  $('#dNum').textContent=dn+' / '+len;
  const m=$('#markAll'); if(m) m.textContent=dn===len?'Alle zurücksetzen':'Alle Schritte abhaken';
}
