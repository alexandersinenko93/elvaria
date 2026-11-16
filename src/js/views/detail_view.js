/**
 * ELVARIA Detail & Tutorial View
 */
function openDetail(kind,id,nav,seg){
  if(nav!==undefined) NAVLIST=nav;
  const on=$('#v-detail').classList.contains('on');
  if(!on){
    const cv=VIEWS.find(v=>$('#v-'+v).classList.contains('on'));
    if(cv){ RETURN_TO=cv; RETURN_Y=window.scrollY; }
    $$('.view').forEach(v=>v.classList.remove('on'));
  }
  const BACKLBL={anhang:'zurück zur Sammlung',plan:'zurück in den Plan',ideen:'zurück zu den Ideen',faq:'zurück zu den Antworten',dash:'zurück zum Start'};
  const bw=$('#back'); if(bw) bw.innerHTML='<span>←</span> '+(BACKLBL[RETURN_TO]||'zurück zur Übersicht');
  $('#v-detail').classList.add('on');
  $('#hero').style.display='none';
  document.body.classList.add('pd');
  $$('#hnav button').forEach(x=>{ x.classList.remove('on'); x.setAttribute('aria-current','false'); });
  CURR={kind,id};
  window.scrollTo({top:0,behavior:'auto'});
  $('#dTutHead').style.display=''; $('#dTutSub').style.display=''; $('#dNotes').style.padding='';
  $('#dSteps').innerHTML='';
  let title='',ogd='',printMeta='';

  if(kind==='p'){
    const p=P.find(x=>x.id===id); if(!p) return;
    $('#dKick').textContent=`Plattform ${P.indexOf(p)+1} von ${P.length} · Klasse ${p.cls}`;
    $('#dH').textContent=p.n;
    $('#dP').textContent=p.g;
    $('#dTags').innerHTML=`<span class="tag ${p.cls}">${p.cls==='A'?'Code-basiert':p.cls==='B'?'Karten-basiert':'Rabatt-basiert'}</span>
      <span class="tag ${p.w===1?'w1':p.w===2?'w2':p.w===3?'w3':'no'}">${p.w===1?'Welle 1 · sofort':p.w===2?'Welle 2':p.w===3?'Welle 3':'Nicht jetzt'}</span>
      ${p.easy?'<span class="tag" style="background:rgba(255,255,255,.14);color:#D9E4EC">ohne Terminal</span>':''}
      ${p.free?'<span class="tag" style="background:rgba(255,255,255,.14);color:#D9E4EC">ohne Fixkosten</span>':''}`;
    const AU={ok:['#2C6A4E','#F1F6F2','Nimmt auf'],bedingt:['#8A5A00','#FBF3E3','Nimmt auf &mdash; mit H&uuml;rde'],unklar:['#5A6470','#EEF1F4','Ungekl&auml;rt'],nein:['#9A2B2B','#FAEDED','Nimmt nicht auf']};
    const au=AU[p.auf]||AU.unklar;
    $('#dFacts').innerHTML=`
      <div class="fact" style="border-left:4px solid ${au[0]};background:${au[1]};padding:12px 14px;border-radius:6px"><span>Aufnahme &middot; ${au[2]}</span><b>${p.aufLab}</b><br><span style="font-weight:400;opacity:.85">${p.aufSub}</span></div>
      <div class="fact"><span>${p.auf==='nein'?'Was das heißt':p.auf==='unklar'?'So klärst du es':'So kommst du rein'}</span><b>${p.aufWie}</b></div>
      <div class="fact"><span>Kostet</span><b>${p.kostet}</b></div>
      <div class="fact"><span>Live in</span><b>${p.dauer}</b></div>
      <div class="fact jumpbox"><span>Vertiefung</span>
        <button class="jumpto" data-jump="deep">Ausführlicher Guide mit ${(DEEP[p.id]||{deep:[]}).deep.length} Schritten, Links und Mini-Guide <i>→</i></button>
      </div>`;
    renderSteps(p.steps,'p-'+p.id);
    renderDeep(p); segCounts(p); bindSeg();
    $('#dSeg').hidden=false;
    const segPref=seg||store.get('elvaria-seg');
    setSeg(segPref==='deep'?'deep':'quick');
    $('#dNotes').innerHTML=
      `<div class="warn"><b>Falle:</b> ${p.falle}</div>`+
      (p.falle2?`<div class="warn" style="margin-top:10px"><b>Achtung:</b> ${p.falle2}</div>`:'')+
      `<div class="good"><b>Urteil:</b> ${p.urteil}</div>`+
      (p.tips?`<div class="tip"><b>Tipp:</b> ${p.tips[0]}</div>`:'');
    $('#dCta').innerHTML=`<a class="cta" href="${p.url}" target="_blank" rel="noopener">Zur Plattform ↗</a>
      <button class="cta ghost" data-act="print">Drucken</button>
      <button class="cta ghost" data-act="link">Link kopieren</button>
      <button class="cta ghost" data-act="copy">Schritte kopieren</button>
      <button class="cta ghost" id="markAll">Alle Schritte abhaken</button>`;
    title=p.n; ogd=p.g; printMeta='Plattform '+(P.indexOf(p)+1)+' / '+P.length;
  } else if(kind==='i'){
    const it=I[+id]; if(!it) return;
    $('#dKick').textContent=`Idee · Ring ${it.r} — ${RINGN[it.r]}`;
    $('#dH').textContent=it.t;
    $('#dP').textContent=it.d;
    const FL={emp:'Empfohlen',cau:'Vorsicht',neu:'Neu',geld:'Hoher Umsatz',schnell:'Schnell startbar',box:'Boxen + Yoga'};
    $('#dTags').innerHTML=it.f.map(f=>`<span class="tag" style="background:rgba(255,255,255,.14);color:#D9E4EC">${FL[f]}</span>`).join('');
    $('#dFacts').innerHTML=`
      <div class="fact"><span>Realisierbarer Umsatz</span><b>${it.m}</b></div>
      <div class="fact"><span>Ring</span><b>${it.r} — ${RINGN[it.r]}</b></div>
      <div class="fact"><span>Startet</span><b>${{1:'sofort',2:'nach dem ersten B2B-Event',3:'Monat 6–12',4:'Jahr 2–3'}[it.r]}</b></div>`;
    renderSteps(it.s,'i-'+id);
    $('#dSeg').hidden=true; setSeg('quick'); $('#dDeep').innerHTML='';
    $('#dNotes').innerHTML=`<div class="tip"><b>Einordnung:</b> ${it.x}</div>`;
    $('#dCta').innerHTML=`<button class="cta ghost" data-act="print">Drucken</button>
      <button class="cta ghost" data-act="link">Link kopieren</button>
      <button class="cta ghost" data-act="copy">Schritte kopieren</button>
      <button class="cta ghost" id="markAll">Alle Schritte abhaken</button>
      <button class="cta ghost" data-act="back">Andere Idee ansehen</button>`;
    title=it.t; ogd=it.d; printMeta='Idee · Ring '+it.r+' — '+RINGN[it.r];
  } else {
    const n=NOGO[+id]; if(!n) return;
    $('#dKick').textContent='Nicht machen · bewusste Entscheidung';
    $('#dH').textContent=n.t;
    $('#dP').textContent='Diese Idee sieht verlockend aus, kostet aber mehr, als sie bringt.';
    $('#dTags').innerHTML='<span class="tag no">Verworfen</span>';
    $('#dFacts').innerHTML=`<div class="fact"><span>Warum nicht</span><b>${n.d}</b></div>
      <div class="fact"><span>Stattdessen</span><b>${n.a}</b></div>`;
    $('#dSteps').innerHTML='';
    $('#dSeg').hidden=true; setSeg('quick'); $('#dDeep').innerHTML='';
    $('#dNotes').innerHTML=`<div class="warn"><b>Entscheidung:</b> ${n.z}</div>`;
    $('#dNotes').style.padding='0 30px 26px';
    $('#dTutHead').style.display='none';
    $('#dTutSub').style.display='none';
    $('#dCta').innerHTML=`<button class="cta ghost" data-act="print">Drucken</button>
      <button class="cta ghost" data-act="link">Link kopieren</button>
      <button class="cta ghost" data-act="back">← Andere Idee ansehen</button>`;
    $('#dBar').style.width='0%'; $('#dNum').textContent='—';
    title=n.t; ogd=n.d; printMeta='Bewusst verworfen';
  }

  setNav(kind,id);
  paintRel(kind,id);

  if(!FROM_HASH) setHash('#/'+kind+'/'+id);

  const h=$('#dH'); h.setAttribute('tabindex','-1');
  try{ h.focus({preventScroll:true}); }catch(e){ try{ h.focus(); }catch(_){} }

  document.title=title+' — Elvaria';
  const og=$('#ogT'); if(og) og.setAttribute('content',title+' — Elvaria');
  const od=$('#ogD'); if(od) od.setAttribute('content',ogd.slice(0,160));
  const pd=$('#phMeta'); if(pd) pd.textContent=printMeta+' · Stand 12.11.2026 · #/'+kind+'/'+id;
  store.set('elvaria-last',JSON.stringify(CURR));
  announce(title);
}


/* ══════════════════════════════════════════
   DEEP-GUIDE RENDERER
   ══════════════════════════════════════════ */
let SEG='quick';
function setSeg(v){
  SEG=v;
  $$('#dSeg button').forEach(b=>{ const on=b.dataset.seg===v; b.classList.toggle('on',on); b.setAttribute('aria-selected',on?'true':'false'); });
  const q=$('#paneQuick'), d=$('#paneDeep');
  document.body.classList.toggle('deepmode', v==='deep');
  if(q) q.hidden = v!=='quick';
  if(d) d.hidden = v!=='deep';
  if(v==='deep') store.set('elvaria-seg','deep'); else store.set('elvaria-seg','quick');
}
function bindSeg(){
  $$('#dSeg button').forEach(b=>{
    b.onclick=()=>{ setSeg(b.dataset.seg); if(b.dataset.seg==='deep'){ const h=$('#dDeep h2'); if(h) h.focus({preventScroll:true}); } };
    b.onkeydown=e=>{ if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); const o=$$('#dSeg button'); const i=o.indexOf(b); const n=o[(i+(e.key==='ArrowRight'?1:o.length-1))%o.length]; n.focus(); n.click(); } };
  });
}
function setNav(kind,id){
  const L=NAVLIST||ORDER;
  const i=L.findIndex(o=>o.kind===kind&&String(o.id)===String(id));
  const pv=L[i-1], nx=L[i+1];
  $('#prev').style.visibility=i<=0?'hidden':'visible';
  $('#next').style.visibility=i>=L.length-1?'hidden':'visible';
  if(pv){ $('#prevT').textContent=pv.n; $('#prev').onclick=()=>openDetail(pv.kind,pv.id); }
  if(nx){ $('#nextT').textContent=nx.n; $('#next').onclick=()=>openDetail(nx.kind,nx.id); }
  const hint=$('#dNavHint');
  if(hint) hint.textContent=NAVLIST?('Weiter im Filter · '+L.length+' Treffer'):'';
}

function refreshProgress(){
  const d=totalDone(), all=totalAllDeep;
  $('#hprogTxt').textContent=d+' / '+all;
  $('#mS').textContent=d;
  const pc=Math.round(d/all*100);
  $('#mPct').textContent=pc+' %';
  $('#heroBar').style.width=pc+'%';
  $('#mNote').textContent=d===0?'noch nichts abgehakt':d===all?'alles erledigt — Glückwunsch':'von '+all+' Schritten';
  const sd2=DONE['start']&&Array.isArray(DONE['start'])?DONE['start'].filter(Boolean).length:0;
  const mw=$('#mW'); if(mw) mw.innerHTML=wizDone()+'<span style="font-size:14px;opacity:.6">/'+WIZ.length+'</span>';
  const m2=$('#mS2'); if(m2) m2.innerHTML=sd2+'<span style="font-size:14px;opacity:.6">/7</span>';
}

/* ══════════════════════════════════════════
   KOPIEREN / DRUCKEN
   ══════════════════════════════════════════ */
function stepsText(){
  if(!CURR) return '';
  const {kind,id}=CURR;
  let title='',desc='',steps=[],facts=[];
  if(kind==='p'){
    const p=P.find(x=>x.id===id); if(!p) return '';
    title=p.n; desc=p.g; steps=p.steps;
    facts=[['Aufnahme',p.aufLab+' — '+p.aufWie],['Weg hinein',p.weg],['Was du brauchst',p.brauch],['Kostet',p.kostet],['Live in',p.dauer],['Urteil',p.urteil]];
  } else if(kind==='i'){
    const it=I[+id]; if(!it) return '';
    title=it.t; desc=it.d; steps=it.s;
    facts=[['Umsatz',it.m],['Ring',it.r+' — '+RINGN[it.r]],['Einordnung',it.x]];
  } else {
    const n=NOGO[+id]; if(!n) return '';
    return n.t+'\n\nWarum nicht: '+n.d+'\nStattdessen: '+n.a+'\nEntscheidung: '+n.z;
  }
  const key=(kind==='p'?'p-'+id:'i-'+id);
  const dn=Array.isArray(DONE[key])?DONE[key]:[];
  let t=title+'\n'+desc+'\n\n';
  t+=facts.map(f=>f[0]+': '+f[1]).join('\n')+'\n\nSchritte:\n';
  steps.forEach((s,k)=>{
    const a=Array.isArray(s)?s[0]:s, n=Array.isArray(s)?s[1]:'';
    t+=(dn[k]?'[x] ':'[ ] ')+(k+1)+'. '+a+(n?' — '+n:'')+'\n';
  });
  if(kind==='i'){ /* Plattform-Bezug */ }
  return t.trim();
}
function copyText(txt,msg){
  const done=()=>toast(msg);
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(done).catch(()=>fallback());
  } else fallback();
  function fallback(){
    try{
      const ta=document.createElement('textarea');
      ta.value=txt; ta.style.position='fixed'; ta.style.top='-1000px'; ta.style.opacity='0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      document.execCommand('copy'); ta.remove();
    }catch(e){}
    done();
  }
}
$('#dCta').addEventListener('click',e=>{
  const b=e.target.closest('[data-act]'); if(!b) return;
  const act=b.dataset.act;
  if(act==='print'){ try{ window.print(); }catch(e){ toast('Drucken nicht möglich'); } }
  else if(act==='link'){
    const url=location.href.split('#')[0]+'#/'+CURR.kind+'/'+CURR.id;
    copyText(url, location.protocol==='file:'?'Link kopiert (lokale Datei)':'Link kopiert');
  }
  else if(act==='copy') copyText(stepsText(),'Schritte kopiert');
  else if(act==='back') $('#back').click();
});
