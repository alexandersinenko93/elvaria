/**
 * ELVARIA Anhang View & Search
 */
function renderFAQ(){
  const q=$('#qF').value.trim().toLowerCase();
  const list=F.filter(f=>{
    if(FS.cat&&FS.cat!=='Alle'&&f.c!==FS.cat) return false;
    if(q&&!(f.q+' '+f.a).toLowerCase().includes(q)) return false;
    return true;
  });
  $('#nF').textContent=list.length+' von '+F.length+' Fragen';
  $('#cF').textContent=F.length+' Antworten';
  $('#eF').style.display=list.length?'none':'block';
  $('#listF').innerHTML=list.map(f=>`<div class="faq-item"><button class="fq" aria-expanded="false"><span class="p" aria-hidden="true">+</span><span><span class="cat">${f.c}</span>${f.q}</span></button><div class="fa">${f.a}</div></div>`).join('');
  $$('#listF .faq-item').forEach(it=>{
    const b=$('.fq',it);
    b.onclick=()=>{ const on=it.classList.toggle('on'); b.setAttribute('aria-expanded',on?'true':'false'); };
  });
  syncChips();
}

function buildCats(){
  const cats=['Alle',...new Set(F.map(f=>f.c))];
  $('#fF').innerHTML='<span class="lab">Kategorie</span>'+cats.map(c=>`<button class="chip ${(FS.cat||'Alle')===c?'on':''}" data-c="${c}" aria-pressed="${(FS.cat||'Alle')===c?'true':'false'}">${c}</button>`).join('');
  $$('#fF .chip').forEach(b=>b.onclick=()=>{FS.cat=b.dataset.c;buildCats();renderFAQ();});
}

/* ══════════════════════════════════════════
   GLOBALE SUCHE
   ══════════════════════════════════════════ */
function gsearch(q){
  q=(q||'').trim().toLowerCase();
  const panel=$('#gPanel');
  if(!q){ panel.hidden=true; $('#gList').innerHTML=''; return; }
  const dtext=p=>{const d=DEEP[p.id]; if(!d) return ''; 
    return [d.req.join(' '), ...d.deep.map(x=>x.t+' '+x.b.join(' ')+' '+(x.c||[]).join(' ')+' '+(x.l||[]).map(a=>a[0]).join(' ')),
            d.gu?d.gu.t+' '+d.gu.s.join(' ')+' '+d.gu.must.join(' ')+' '+d.gu.zahl:'', d.faq?d.faq.map(a=>a[0]+' '+a[1]).join(' '):''].join(' ');};
  const ps=P.filter(p=>[p.n,p.d,p.g,p.weg,p.brauch,p.kostet,p.falle,p.urteil,p.dauer,p.aufLab,p.aufSub,p.aufWie,dtext(p)].join(' ').toLowerCase().includes(q)).slice(0,6);
  const is=I.map((x,i)=>({...x,_i:i})).filter(x=>[x.t,x.d,x.m,x.x,...x.s.map(s=>Array.isArray(s)?s.join(' '):s)].join(' ').toLowerCase().includes(q)).slice(0,8);
  const fs=F.map((f,i)=>({...f,_i:i})).filter(f=>(f.q+' '+f.a).toLowerCase().includes(q)).slice(0,5);
  let h='';
  if(ps.length) h+='<div class="glab">Plattformen</div>'+ps.map(p=>{const imDeep=[p.n,p.d,p.g,p.weg,p.brauch,p.kostet,p.falle,p.urteil,p.dauer].join(' ').toLowerCase().includes(q)?'':(DEEP[p.id]?' · Treffer im Deep-Guide':'');return `<button class="gres" data-g="p" data-id="${p.id}"><b>${p.n}</b><span>Klasse ${p.cls} · ${p.dauer}${imDeep}</span></button>`;}).join('');
  if(is.length) h+='<div class="glab">Ideen</div>'+is.map(x=>`<button class="gres" data-g="i" data-id="${x._i}"><b>${x.t}</b><span>Ring ${x.r} · ${x.m}</span></button>`).join('');
  if(fs.length) h+='<div class="glab">Fragen</div>'+fs.map(f=>`<button class="gres" data-g="f" data-id="${f._i}"><b>${f.q}</b><span>${f.c}</span></button>`).join('');
  $('#gList').innerHTML=h||'<div class="gempty">Nichts gefunden — anderer Begriff?</div>';
  panel.hidden=false;
}
function openFaqItem(i){
  const q=$('#qF');
  if(q.value){ q.value=''; }
  FS.cat='Alle'; buildCats(); renderFAQ();
  showView('faq',false);
  setTimeout(()=>{
    const el=$$('#listF .faq-item')[i];
    if(!el) return;
    el.classList.add('on'); $('.fq',el).setAttribute('aria-expanded','true');
    el.scrollIntoView({block:'center',behavior:'smooth'});
    $('.fq',el).focus({preventScroll:true});
  },40);
}
