/**
 * ELVARIA Plan Chapters & Milestones View
 */
/* ── Kennzahlen ── */
function renderPlanKpi(r){
  r=r||planCalc();
  $('#plKpi').innerHTML=KPI.map(k=>{
    let v=k.v;
    if(k.live==='beMix') v=NUM(r.beMix)+'<u>Events</u>';
    return '<div><i>'+k.n+'</i><b>'+v+'</b><p>'+k.l+'</p></div>';
  }).join('');
}

/* ── Kapitel ── */
function planTable(t,activeRow){
  return '<div class="tblwrap"><table class="plt"><thead><tr>'+
    t.h.map((h,i)=>'<th'+(i===activeRow?' class="ah"':'')+'>'+h+'</th>').join('')+
    '</tr></thead><tbody>'+
    t.r.map((r,ri)=>'<tr'+(ri+1===activeRow?' class="act"':'')+'>'+r.map((c,ci)=>'<td'+(ci===0?'':' class="n"')+'>'+c+'</td>').join('')+'</tr>').join('')+
    '</tbody></table></div>';
}
function scenCompare(){
  const keys=Object.keys(SCEN);
  const rows=keys.map(k=>{
    const r=calc(SCEN[k]);
    return [k===PST.scen&&planTouched()?SCEN[k].name+' (verstellt)':SCEN[k].name,
      NUM(r.events)+' Events',EUR(r.umsatz),EUR(r.fix),'<b>'+EUR(r.ergebnis)+'</b>',PCT(r.marge),NUM(r.beMix)+' Events'];
  });
  const mine=calc(PST.A);
  rows.push(['<b>Dein Plan im Rechner</b>','<b>'+NUM(mine.events)+' Events</b>','<b>'+EUR(mine.umsatz)+'</b>',
    '<b>'+EUR(mine.fix)+'</b>','<b>'+EUR(mine.ergebnis)+'</b>','<b>'+PCT(mine.marge)+'</b>','<b>'+NUM(mine.beMix)+' Events</b>']);
  return {h:['Szenario','Auslastung','Umsatz','Fixkosten','Ergebnis / Monat','Marge','Break-even'],
    r:rows, act:keys.indexOf(PST.scen)+1};
}
const PLAN_REL={
  modell:[['Kanäle im Anhang','plat'],['Ideen nach Nähe','ideen']],
  markt:[['40 Geschäftsideen','ideen'],['Preise im Detail','faq']],
  zahlen:[['Förder- und Steuerfragen','faq'],['Box- und Verleihformate','ideen']],
  finanzen:[['Kosten & Rechtsfragen','faq'],['Kanäle mit Fixkosten','plat']],
  plan:[['Startguide, Schritt für Schritt','start'],['Tutorials je Kanal','plat']],
  risiko:[['Rechtliche Antworten','faq'],['Plattform-Bedingungen','plat']]
};
function bindRel(){
  $$('#plBody [data-rel]').forEach(b=>b.onclick=()=>{
    const t=b.dataset.rel;
    if(t==='start') showView('dash');
    else { showView('anhang'); setAnhang(t); }
  });
}
function sayBox(t,lab){
  return t?'<div class="plsay"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" aria-hidden="true"><path d="M12 3v18M4 8l8-5 8 5"/></svg>'+
    '<span><b>'+(lab||'Einfach gesagt')+'</b>'+t+'</span></div>':'';
}
function glossRow(ids){
  if(!ids||!ids.length) return '';
  return '<div class="gloss"><span>Wörter, die hier vorkommen</span>'+
    ids.filter(t=>GLOSS[t]).map(t=>'<button type="button" aria-expanded="false" data-gl="'+t+'">'+t+'</button>').join('')+
    '<div class="gdef" id="gdef" hidden></div></div>';
}
function bindGloss(root){
  $$('.gloss button[data-gl]',root||document).forEach(b=>b.onclick=()=>{
    const box=$('#gdef');
    const open=b.getAttribute('aria-expanded')==='true';
    $$('.gloss button[data-gl]').forEach(x=>x.setAttribute('aria-expanded','false'));
    if(open||!box){ box.hidden=true; return; }
    box.innerHTML='<b>'+b.dataset.gl+'</b>'+GLOSS[b.dataset.gl];
    box.hidden=false; b.setAttribute('aria-expanded','true');
  });
}
function renderPlanCh(){
  const r=planCalc();
  return PLAN.map(ch=>{
    const blocks=ch.blocks.map(b=>{
      let inner='<h3>'+b.t+'</h3>'+sayBox(b.say);
      if(b.tab) inner+=planTable(b.tab, b.tab.act);
      if(b.b) inner+=b.b.map(p=>'<p>'+p+'</p>').join('');
      return '<div class="plblock'+(b.w?' w-'+b.w:'')+'">'+inner+'</div>';
    }).join('');
    let extra='';
    if(ch.id==='zahlen'){
      /* unten eingefügt: Verweiszeile */
      const sc=scenCompare();
      extra='<div class="plblock"><h3>Die drei Szenarien, gerechnet wie im Rechner</h3><div id="plScenTbl">'+planTable({h:sc.h,r:sc.r},sc.act)+'</div>'+
        '<p style="color:var(--muted);font-size:12.5px;margin-top:8px">Aktives Szenario ist markiert. '+
        'Unterschied zu Kap. 26.2: Raummiete und Zahlungsgebühren sind hier bereits eingerechnet.</p></div>';
    }
    if(ch.id==='finanzen') extra+='<div id="plLiveFin">'+liveFin(r)+'</div>';
    const rel=PLAN_REL[ch.id]||[];
    const relRow=rel.length?'<div class="plrel"><span>Belege &amp; Vertiefung</span>'+
      rel.map(r=>'<button data-rel="'+r[1]+'">'+r[0]+' →</button>').join('')+'</div>':'';
    const head='<div class="plsech"><span class="n">'+ch.num+'</span><h2>'+ch.t+'</h2><p>'+ch.sub+'</p></div>'+
      sayBox(ch.say,'Das ist die Antwort')+glossRow(ch.gl);
    const next=(ch.next&&ch.next.length)?'<div class="plnext"><h4>Was du daraus machst</h4><ol>'+
      ch.next.map(n=>'<li><span><b>'+n[0]+'</b>'+n[1]+'</span></li>').join('')+'</ol></div>':'';
    return '<div class="plsec" id="pl-'+ch.id+'">'+head+blocks+extra+next+relRow+'</div>';
  }).join('');
}

/* ── Meilensteine ── */
function renderMile(){
  const dn=DONE['plan']&&Array.isArray(DONE['plan'])?DONE['plan']:[];
  const n=dn.filter(Boolean).length;
  return '<div class="plsec" id="pl-meilensteine"><div class="plsech"><span class="n">M</span><h2>Meilensteine</h2>'+
    '<p>Sieben Etappen. Abhaken bleibt gespeichert — wie im Startguide.</p></div>'+
    '<div class="plblock"><div class="tmprog"><b>'+n+' von '+MILESTONES.length+'</b>'+
    '<div class="pbar" role="progressbar" aria-label="Meilensteine" aria-valuemin="0" aria-valuemax="'+MILESTONES.length+'" aria-valuenow="'+n+'"><i style="width:'+(n/MILESTONES.length*100).toFixed(1)+'%"></i></div>'+
    '<span style="font-size:12.5px;color:var(--muted)">'+(n===MILESTONES.length?'Plan steht komplett.':n===0?'Noch nichts abgehakt — Woche 1 ist der Anfang.':'Weiter mit der nächsten Etappe.')+'</span></div>'+
    MILESTONES.map((m,i)=>'<div class="tm'+(dn[i]?' done':'')+'">'+
      '<button class="tm-btn" data-mi="'+i+'" aria-pressed="'+(dn[i]?'true':'false')+'" aria-label="'+m.t+' erledigt">✓</button>'+
      '<span class="tm-w">'+m.w+'</span>'+
      '<div><b class="tm-t">'+m.t+'</b><p class="tm-d">'+m.d+'</p></div></div>').join('')+
    '</div></div>';
}
function bindMile(){
  $$('#plBody .tm-btn').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.mi;
    if(!Array.isArray(DONE['plan'])) DONE['plan']=[];
    DONE['plan'][i]=!DONE['plan'][i];
    saveDone(); savePlan();
    const box=$('#pl-meilensteine');
    box.outerHTML=renderMile();
    bindMile(); refreshProgress();
    announce(MILESTONES[i].t+(DONE['plan'][i]?' erledigt':' zurückgesetzt'));
  });
}

/* ── Alles zusammen ── */
function verdictBox(r){
  const v=verdict(r,PST.A);
  return '<div class="verdict t-'+v.tone+'"><span class="vt">Urteil</span><h4>'+v.title+'</h4><ul>'+
    v.lines.map(l=>'<li><span>'+l+'</span></li>').join('')+'</ul></div>';
}
function renderPlan(){
  const body=$('#plBody');
  if(!body) return;
  const r=planCalc();
  body.innerHTML=
    renderCalc()+
    '<div id="plVerdict">'+verdictBox(r)+'</div>'+
    '<div id="pl-inhalt">'+renderPlanCh()+'</div>'+
    renderMile()+
    '<div class="plfoot"><button data-pa="start">Zurück zum Startguide</button>'+
    '<button data-pa="anhang">Anhang: Kanäle, Ideen, Antworten</button>'+
    '<button data-pa="print">Als PDF sichern</button></div>';
  bindCalc(); bindMile(); bindRel(); bindGloss($('#plBody'));
  $$('#plBody [data-pa]').forEach(b=>b.onclick=()=>{
    if(b.dataset.pa==='print') window.print();
    else if(b.dataset.pa==='anhang'){ showView('anhang'); setAnhang('plat'); }
    else showView('dash');
  });
  renderPlanNav(); renderPlanKpi(r);
  $('#pmFix').textContent=EUR(r.fix);
  $('#pmRes').textContent=EUR(r.ergebnis);
}
/* Scroll-Spy für die Kapitelnavi */