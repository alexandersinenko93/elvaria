/**
 * ELVARIA Plan Calculator & Sliders UI
 */
const NF=new Intl.NumberFormat('de-DE',{maximumFractionDigits:0});
const EUR=v=>NF.format(Math.round(v))+' €';
const PCT=v=>(isFinite(v)?Math.round(v*100):0)+' %';
const NUM=v=>NF.format(v);

const PLAN_FIELDS=[
  {k:'b2cEvents',l:'B2C-Events pro Monat',min:0,max:12,step:1,u:'Events'},
  {k:'b2cTN',l:'Teilnehmer:innen je Event',min:6,max:60,step:1,u:'Pers.'},
  {k:'ticket',l:'Ticketpreis',min:11,max:80,step:1,u:'€'},
  {k:'location',l:'Raummiete je B2C-Event',min:0,max:500,step:10,u:'€'},
  {k:'b2bEvents',l:'Firmenevents pro Monat',min:0,max:12,step:1,u:'Events'},
  {k:'b2bPreis',l:'Preis je Firmenevent (netto)',min:500,max:4000,step:50,u:'€'},
  {k:'verleih',l:'Verleih-Umsatz pro Monat',min:0,max:8000,step:50,u:'€'},
  {k:'gutschein',l:'Gutscheine & Boxen pro Monat',min:0,max:12000,step:50,u:'€'},
  {k:'fix',l:'Fixkosten pro Monat',min:524,max:3500,step:10,u:'€'}
];
let PST=(function(){
  let d={scen:'basis',A:null,open:null};
  try{ const j=JSON.parse(store.get('elvaria-plan')||'null'); if(j&&j.scen&&SCEN[j.scen]) d=Object.assign(d,j); }catch(e){}
  if(!d.A) d.A=Object.assign({},SCEN[d.scen]);
  return d;
})();
function savePlan(){ try{ store.set('elvaria-plan',JSON.stringify(PST)); }catch(e){} }
function planCalc(){ return calc(PST.A); }
function planTouched(){
  const s=SCEN[PST.scen];
  return PLAN_FIELDS.some(f=>(PST.A[f.k]|0)!==(s[f.k]|0));
}

/* ── Kapitelnavi ── */
function renderPlanNav(){
  const on=PST.open;
  const items=[{id:'rechner',num:'R',t:'Rechner'}]
    .concat(PLAN.map(c=>({id:c.id,num:c.num,t:c.t})))
    .concat([{id:'meilensteine',num:'M',t:'Meilensteine'}]);
  const r=planCalc();
  $('#plNav').innerHTML=items.map(i=>
    '<button data-go="'+i.id+'"'+(i.id===on?' class="on"':'')+'><i>'+i.num+'</i><span>'+i.t+'</span></button>').join('')+
    '<div class="plnav-f"><b>'+EUR(r.ergebnis)+'</b>Ergebnis vor Steuer im gewählten Szenario · Break-even bei '+NUM(r.beMix)+' Events</div>';
  $$('#plNav button').forEach(b=>b.onclick=()=>goChapter(b.dataset.go));
}
function goChapter(id){
  const el=$('#pl-'+id);
  if(!el) return;
  PST.open=id; savePlan();
  $$('#plNav button').forEach(b=>b.classList.toggle('on',b.dataset.go===id));
  const y=el.getBoundingClientRect().top+window.scrollY-(window.innerWidth<1000?104:96);
  window.scrollTo({top:y,behavior:'smooth'});
  announce('Kapitel '+id);
}

/* ── Der Rechner ── */
function scenChips(){
  const touched=planTouched();
  return Object.keys(SCEN).map(k=>{
    const sr=calc(SCEN[k]);
    return '<button data-scen="'+k+'" class="'+(k===PST.scen&&!touched?'on':'')+'">'+SCEN[k].name+
      '<small>'+EUR(sr.ergebnis)+' · '+PCT(sr.marge)+'</small></button>';
  }).join('')+(touched?'<button data-scen="__reset" class="on">Angepasst<small>zurück zu '+SCEN[PST.scen].name+'</small></button>':'');
}
function renderCalc(){
  const A=PST.A, r=planCalc(), touched=planTouched();
  const fields=PLAN_FIELDS.map(f=>{
    const v=A[f.k]|0;
    return '<div class="fld"><label for="pf-'+f.k+'">'+f.l+'</label>'+
      '<output for="pf-'+f.k+'">'+(f.step>=50?EUR(v):NUM(v))+(f.step>=50?'':' <em>'+f.u+'</em>')+'</output>'+
      '<input id="pf-'+f.k+'" type="range" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'" value="'+v+'" '+
      'data-k="'+f.k+'" aria-label="'+f.l+'"></div>';
  }).join('');

  const scen=scenChips();

  return '<div class="calc" id="pl-rechner"><div class="calc-h"><div>'+
    '<span class="eyebrow">Interaktiv</span><h3>Was dein Plan heute trägt</h3>'+
    '<p>Dreh an einer Zahl, alles andere rechnet neu. Szenario setzen, oder „Angepasst" zurücksetzen.</p>'+
    '</div><div class="scenbar" id="plScen" role="group" aria-label="Szenario">'+scen+'</div></div>'+
    '<div class="calcgrid"><div class="cfields">'+fields+'</div><div class="cout" id="plOut">'+renderCalcOut(r)+'</div></div>'+
    '<div class="cbtns"><button data-act="reset">auf Basis-Szenario</button>'+
    '<button data-act="worst">Was passiert, wenn nur B2C läuft?</button>'+
    '<button data-act="print">Plan drucken / PDF</button></div></div>';
}
function bindScen(){
  $$('#plScen button').forEach(b=>b.onclick=()=>{
    const k=b.dataset.scen;
    PST.scen = k==='__reset' ? PST.scen : k;
    PST.A=Object.assign({},SCEN[PST.scen]);
    savePlan(); renderPlan();
    announce('Szenario '+SCEN[PST.scen].name);
  });
}
function bindCalc(){
  $$('#plBody input[type=range]').forEach(inp=>{
    inp.oninput=()=>{
      PST.A[inp.dataset.k]=+inp.value;
      savePlan(); updateCalc();
    };
  });
  bindScen();
  $$('#plBody .cbtns button').forEach(b=>b.onclick=()=>{
    const a=b.dataset.act;
    if(a==='reset'){ PST.scen='basis'; PST.A=Object.assign({},SCEN.basis); savePlan(); renderPlan(); }
    else if(a==='worst'){
      PST.A=Object.assign({},SCEN.konservativ,{b2bEvents:0,verleih:0,gutschein:200,fix:FIXSUM,scen:'konservativ'});
      PST.scen='konservativ'; savePlan(); renderPlan();
      announce('Nur B2C, ohne Verleih und ohne Fixkosten-Puffer');
    }
    else if(a==='print') window.print();
  });
}
function updateCalc(){
  const r=planCalc();
  const out=$('#plOut'); if(out) out.innerHTML=renderCalcOut(r);
  PLAN_FIELDS.forEach(f=>{
    const inp=$('#pf-'+f.k); if(!inp) return;
    const o=inp.parentElement.querySelector('output');
    if(o) o.innerHTML=(f.step>=50?EUR(PST.A[f.k]):NUM(PST.A[f.k]))+(f.step>=50?'':' <em>'+f.u+'</em>');
  });
  const sb=$('#plScen');
  if(sb){ sb.innerHTML=scenChips(); bindScen(); }
  const cmp=$('#plScenTbl'); if(cmp){ const c=scenCompare(); cmp.innerHTML=planTable({h:c.h,r:c.r},c.act); }
  const vd=$('#plVerdict'); if(vd) vd.innerHTML=verdictBox(r);
  $('#pmFix').textContent=EUR(r.fix);
  $('#pmRes').textContent=EUR(r.ergebnis);
  renderPlanKpi(r);
  const nf=$('#plNav .plnav-f');
  if(nf) nf.innerHTML='<b>'+EUR(r.ergebnis)+'</b>Ergebnis vor Steuer im eingestellten Plan · Break-even bei '+NUM(r.beMix)+' Events';
  const sc=$('#plScenTbl'); if(sc){ const c=scenCompare(); sc.innerHTML=planTable({h:c.h,r:c.r},c.act); }
  const lf=$('#plLiveFin'); if(lf) lf.innerHTML=liveFin(r);
}
function renderCalcOut(r){
  const row=(l,v,c)=>'<div class="crow'+(c?' '+c:'')+'"><span>'+l+'</span><b>'+v+'</b></div>';
  return '<div class="big"><b>'+EUR(r.ergebnis)+'</b><span>Ergebnis vor Steuer / Monat</span></div>'+
    row('Umsatz insgesamt',EUR(r.umsatz))+
    row('&nbsp;&nbsp;B2C-Events · B2B-Events',EUR(r.b2c)+' · '+EUR(r.b2b))+
    row('&nbsp;&nbsp;Verleih · Gutscheine',EUR(r.verleih)+' · '+EUR(r.gutschein))+
    row('Variable Kosten (12 % + 25 % + 2 %)',EUR(r.variabel-r.location))+
    row('Raum &amp; Location',EUR(r.location))+
    row('Fixkosten',EUR(r.fix))+
    row('Marge',PCT(r.marge),r.marge>=0.3?'pos':'neg')+
    row('Deckungsbeitrag je B2C-Event',EUR(r.dbB2C))+
    row('Deckungsbeitrag je Firmenevent',EUR(r.dbB2B),'pos')+
    row('Break-even',NUM(r.beMix)+' Events / Monat')+
    row('&nbsp;&nbsp;nur B2C · nur B2B',NUM(r.beB2C)+' · '+NUM(r.beB2B)+' Events')+
    row('Logistik-Last',NUM(Math.round(r.last*10)/10)+' von '+r.lastMax,
      r.last<=r.lastMax?(r.last>=r.lastMax-0.5?'':'pos'):'neg')+
    '<p class="cnote">Logistik-Last zählt offene Events voll, Firmenevents halb — Aufbau beim Kunden. Grenze: '+r.lastMax+' pro Monat. '+
    'Dossier Kap. 26.2 nennt für diese Konstellation <b style="color:#fff">'+EUR(r.dossier)+'</b>; der Rechner liegt '+
    EUR(Math.abs(r.dossier-r.ergebnis))+(r.ergebnis<r.dossier?' darunter':' darüber')+', weil er Raummiete und Zahlungsgebühren (2 %) einrechnet.</p>';
}
function liveFin(r){
  return '<div class="plblock"><h3>Dein Stand im Rechner</h3><div class="tblwrap"><table class="plt"><thead><tr>'+
    '<th>Position</th><th>Dein Plan</th><th>Basis-Szenario</th><th>Differenz</th></tr></thead><tbody>'+
    [[  'Umsatz / Monat',r.umsatz,calc(SCEN.basis).umsatz],
      ['Ergebnis vor Steuer',r.ergebnis,calc(SCEN.basis).ergebnis],
      ['Marge',r.marge*100,calc(SCEN.basis).marge*100]].map(x=>
      '<tr><td>'+x[0]+'</td><td><b>'+(x[0]==='Marge'?Math.round(x[1])+' %':EUR(x[1]))+'</b></td><td>'+
      (x[0]==='Marge'?Math.round(x[2])+' %':EUR(x[2]))+'</td><td>'+(x[1]-x[2]>=0?'+':'−')+
      (x[0]==='Marge'?Math.abs(Math.round(x[1]-x[2]))+' %-Pkt.':EUR(Math.abs(x[1]-x[2])))+'</td></tr>').join('')+
    '</tbody></table></div><p style="color:var(--muted);font-size:12.5px;margin-top:8px">'+
    'Events im Plan: <b>'+NUM(r.events)+'</b> von 16 möglichen. Break-even bei <b>'+NUM(r.beMix)+'</b> Events — '+
    (r.events>=r.beMix?'der Plan liegt darüber.':'der Plan liegt darunter, erst mal Fixblöcke senken oder B2B vorziehen.')+'</p></div>';
}
