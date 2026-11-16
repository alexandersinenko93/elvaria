/**
 * ELVARIA Wizard / Assistent View
 */
/* ══════════════════════════════════════════
   ASSISTENT — geführt zur eigenen Rechnung
   ══════════════════════════════════════════ */
const WIZKEY='elvaria-wiz';
let WS=(function(){
  const d={i:0,A:null,done:{}};
  try{ const j=JSON.parse(store.get(WIZKEY)||'null'); if(j&&j.A) Object.assign(d,j); }catch(e){}
  if(!d.A){
    d.A=Object.assign({},SCEN.basis,{scen:'basis',on_b2c:true,on_b2b:true,on_gutschein:true,on_verleih:false,fixZusatz:0,erledigt:{}});
    d.A.fix=FIXSUM;
  }
  if(!d.A.erledigt) d.A.erledigt={};
  return d;
})();
function saveWiz(){ try{ store.set(WIZKEY,JSON.stringify(WS)); }catch(e){} }
function wizSteps(){ return WIZ.filter(function(w){ return !w.need || WS.A[w.need]; }); }
function wizCur(){ const st=wizSteps(); return st[Math.max(0,Math.min(WS.i,st.length-1))]; }
function wizDone(){ return Object.keys(WS.done||{}).length; }
function wizCalc(){ return calc(WS.A); }
function wizFixBase(){ return FIXSUM + (WS.A.fixZusatz||0); }

function wizIsOn(st,o){
  if(st.field) return WS.A[st.field]===o.v;
  const k=Object.keys(o.set||{})[0];
  return k?!!WS.A[k]:false;
}
function wizOpt(step,o,i,on,cls){
  return '<button class="opt'+(on?' on':'')+'" data-oi="'+i+'" role="'+(cls==='radio'?'radio':'checkbox')+'" aria-checked="'+(on?'true':'false')+'">'+
    '<span class="tick">'+(on?'✓':'')+'</span>'+
    '<span><b>'+o.t+'</b>'+(o.d?'<span class="d">'+o.d+'</span>':'')+
    (o.c!==undefined&&step.plain?'<span class="c">'+(o.c?('kostet '+(o.c>999?EUR(o.c):o.c+' €')):'kostet nichts')+'</span>':'')+
    (o.block?'<span class="d" style="color:var(--red)">'+o.block+'</span>':'')+
    '</span></button>';
}
function renderWiz(){
  const box=$('#wizCard'); if(!box) return;
  const st=wizCur(), all=wizSteps(), n=all.length, idx=Math.min(WS.i,n-1);
  $('#wizCount').textContent='Schritt '+(idx+1)+' von '+n;
  const pctv=Math.round(((idx+1)/n)*100);
  $('#wizFill').style.width=pctv+'%'; $('#wizFill').parentElement.setAttribute('aria-valuenow',pctv);

  $('#wizSteps').innerHTML=all.map(function(w,i){
    const done=!!WS.done[w.id], on=i===idx;
    return '<button class="wizstep'+(on?' on':'')+(done?' done':'')+'" role="listitem" data-ws="'+i+'">'+
      '<i>'+(done?'✓':(i+1))+'</i><span>'+w.q.replace(/\?$/,'')+'</span>'+
      (on?'<span class="st-lab">hier</span>':(done?'<span class="st-lab">erledigt</span>':'<span></span>'))+'</button>';
  }).join('');

  let inner='';
  if(st.kind==='multi'||st.kind==='pick'){
    inner='<div class="optgrid'+(st.kind==='pick'?'':' two')+'">'+
      st.opts.map(function(o,i){ return wizOpt(st,o,i,wizIsOn(st,o),st.kind==='pick'?'radio':'checkbox'); }).join('')+'</div>';
    if(st.field==='location'){
      const loc=WS.A.location|0;
      inner+='<p class="hint" style="font-size:12.5px;color:var(--ink2);margin-top:10px">'+
        (loc===0?'Rechne mit <b>0 € Raum</b> — dann trägt ein Firmen-Termin alles, ein Abend für sich allein fast nichts.'
               :(loc<=150?'Rechne mit <b>'+NUM(loc)+' € Raum</b> pro Abend. Das ist der Raum-Deal: er verdoppelt, was dir von einem Abend bleibt.'
                         :'Rechne mit <b>'+NUM(loc)+' € Raum</b> pro Abend. Dann bleiben pro Abend nur rund '+EUR(calc(Object.assign({},WS.A,{b2bEvents:0})).dbB2C)+' — zu wenig für einen Samstag.'))+'</p>';
    }
  }
  else if(st.kind==='range'){
    const v=WS.A[st.field]|0, min=st.min, max=st.max;
    const fill=((v-min)/(max-min)*100).toFixed(1);
    inner='<div class="wizrange"><div class="rw"><label for="wz-'+st.field+'">'+st.q.replace(/\?$/,'')+'</label>'+
      '<output for="wz-'+st.field+'">'+NUM(v)+' <em>'+st.unit+'</em></output></div>'+
      '<input id="wz-'+st.field+'" type="range" min="'+min+'" max="'+max+'" step="'+(st.step||1)+'" value="'+v+'" style="--fill:'+fill+'%" aria-describedby="wz-hint">'+
      '<p class="hint" id="wz-hint">'+st.help+'</p></div>'+
      (st.presets?'<div class="preset">'+st.presets.map(function(p){return '<button data-pre="'+p[1]+'">'+p[0]+'<small>'+NUM(p[1])+' '+st.unit+'</small></button>';}).join('')+'</div>':'');
  }
  else if(st.kind==='check'){
    inner='<div class="optgrid">'+st.opts.map(function(o,i){
        let on;
        if(st.plain) on=!!WS.A.erledigt[i];
        else on = o.keep ? true : (WS.sel||[]).indexOf(i)>-1;
        return wizOpt(st,o,i,on,'checkbox');
      }).join('')+'</div>'+
      (!st.plain?'<p class="hint" style="font-size:13px;color:var(--ink2);margin-top:12px">Fixkosten damit: <b>'+EUR(wizFixBase())+'</b> im Monat. Pflichtblöcke 524 € sind immer drin.</p>':'');
  }
  else if(st.kind==='out'){
    inner=wizOut();
  }

  box.innerHTML='<div class="wizcard'+(st.kind==='out'?' wizout':'')+'">'+
    '<div class="wizkick">'+(st.kind==='out'?'Ergebnis':'Frage '+(idx+1))+'<i>· '+(st.kind==='out'?'dein Blatt':n+' Fragen insgesamt')+'</i></div>'+
    '<h2 class="wizq">'+st.q+'</h2>'+
    (st.help?'<p class="wizhelp">'+st.help+'</p>':'')+
    (st.why?'<div class="wizwhy"><span>Warum die Frage</span><p>'+st.why+'</p></div>':'')+
    inner+
    '<div class="wizfoot">'+
      '<button class="btn" data-w="back"'+(idx===0?' disabled':'')+'>← Zurück</button>'+
      (idx<n-1?'<button class="btn pri" data-w="next">Weiter →</button>':'<button class="btn pri" data-w="again">Alles neu</button>')+
    '</div></div>';

  bindWiz(st);
  renderWizLive();
}
function wizOut(){
  const r=wizCalc(), A=WS.A, st=wizSteps();
  const v=verdict(r,A);
  const paper=WIZ.filter(function(w){return w.id==='papier';})[0];
  const open=paper.opts.map(function(o,i){return {o:o,i:i};}).filter(function(x){return !A.erledigt[x.i];});
  const sum=[['Umsatz im Monat',EUR(r.umsatz),'so viel kommt rein'],
             ['Was übrig bleibt',EUR(r.ergebnis),'nach allen Kosten, vor Steuer'],
             ['pro offenem Abend',r.dbB2C>0?EUR(r.dbB2C):'0 €','bei '+NUM(A.b2cTN)+' Personen zu '+NUM(A.ticket)+' €'],
             ['pro Firmen-Termin',EUR(r.dbB2B),'davon lebst du'],
             ['nötige Termine',NUM(r.beMix)+' im Monat','damit die Kosten drin sind'],
             ['Logistik',Math.round(r.last*10)/10+' von '+r.lastMax,'mehr schaffst du nicht allein']];
  const costs=open.reduce(function(a,x){return a+(x.o.c||0);},0);
  return '<div class="verdict t-'+v.tone+'"><span class="vt">Urteil</span><h4>'+v.title+'</h4><ul>'+
    v.lines.map(function(l){return '<li><span>'+l+'</span></li>';}).join('')+'</ul></div>'+
    '<div class="sumgrid">'+sum.map(function(x){return '<div><span>'+x[0]+'</span><b>'+x[1]+'</b><small>'+x[2]+'</small></div>';}).join('')+'</div>'+
    '<div class="plnext" style="margin-bottom:14px"><h4>Deine Zahlen im Rechner</h4>'+
      '<p style="font-size:14px;margin:0;color:var(--ink2)">'+NUM(A.b2cEvents)+' offene Abende mit je '+NUM(A.b2cTN)+' Personen zu '+NUM(A.ticket)+' € · '+
      NUM(A.b2bEvents)+' Firmen-Termine zu '+NUM(A.b2bPreis)+' € · Verleih '+EUR(A.verleih)+' · Gutscheine '+EUR(A.gutschein)+
      ' · Fixkosten '+EUR(r.fix)+' im Monat.</p></div>'+
    (open.length?'<div class="plnext" style="background:rgba(168,72,59,.05);border-color:rgba(168,72,59,.24)"><h4 style="color:var(--red)">Noch offen — zusammen '+EUR(costs)+'</h4><div class="tasklist">'+
      open.map(function(x){return '<div class="task todo"><span class="tk"></span><b>'+x.o.t+'<span class="bl">'+x.o.block+'</span></b><span class="cost">'+(x.o.c?EUR(x.o.c):'0 €')+'</span></div>';}).join('')+
      '</div></div>'
     :'<div class="plnext"><h4>Papierarbeit</h4><p style="margin:0;font-size:14.5px">Alles abgehakt. Dann kannst du verkaufen.</p></div>')+
    '<div class="cbtns" style="margin-top:16px">'+
      '<button data-w="copy" style="border-color:var(--line);color:var(--navy);background:#fff">Als Text kopieren</button>'+
      '<button data-w="print" style="border-color:var(--line);color:var(--navy);background:#fff">Diese Seite drucken</button>'+
      '<button data-w="toplan" style="border-color:var(--navy);background:var(--navy);color:#fff">Meine Zahlen in den Plan</button>'+
      '<button data-w="restart" style="border-color:var(--line);color:var(--navy);background:#fff">Von vorn anfangen</button>'+
    '</div>';
}
function wizText(){
  const r=wizCalc(), A=WS.A, v=verdict(r,A);
  const L=[];
  L.push('ELVARIA — Businessplan, eigene Rechnung');
  L.push('Stand 12.11.2026\n');
  L.push('Was ich machen will:');
  if(A.on_b2c) L.push('  · offene Abende: '+A.b2cEvents+' im Monat, '+A.b2cTN+' Personen, '+A.ticket+' € pro Person, Raum '+A.location+' €');
  if(A.on_b2b) L.push('  · Firmen-Termine: '+A.b2bEvents+' im Monat zu '+A.b2bPreis+' € netto');
  if(A.on_verleih) L.push('  · Material verleihen: '+A.verleih+' € im Monat');
  if(A.on_gutschein) L.push('  · Gutscheine: '+A.gutschein+' € im Monat');
  L.push('');
  L.push('Was das ergibt (pro Monat):');
  L.push('  Umsatz            '+EUR(r.umsatz));
  L.push('  variable Kosten   '+EUR(r.variabel));
  L.push('  Fixkosten         '+EUR(r.fix));
  L.push('  ÜBRIG BLEIBT      '+EUR(r.ergebnis)+'  ('+Math.round(r.marge*100)+' % vom Umsatz)');
  L.push('  pro offenem Abend '+EUR(r.dbB2C)+' · pro Firmen-Termin '+EUR(r.dbB2B));
  L.push('  Break-even        '+r.beMix+' Termine im Monat');
  L.push('  Logistik          '+(Math.round(r.last*10)/10)+' von '+r.lastMax);
  L.push('');
  L.push('Einschätzung: '+v.title);
  v.lines.forEach(function(l){ L.push('  · '+l); });
  const paper=WIZ.filter(function(w){return w.id==='papier';})[0];
  const open=paper.opts.filter(function(o,i){return !A.erledigt[i];});
  if(open.length){
    L.push('');
    L.push('Noch zu erledigen:');
    open.forEach(function(o){ L.push('  [ ] '+o.t+' — '+o.d+(o.c?(' ('+EUR(o.c)+')'):'')); });
  }
  return L.join('\n');
}
function bindWiz(st){
  $$('#wizSteps .wizstep').forEach(function(b){ b.onclick=function(){ WS.i=+b.dataset.ws; saveWiz(); renderWiz(); }; });
  const all=wizSteps(), idx=Math.min(WS.i,all.length-1);
  $$('#wizCard .opt').forEach(function(b){
    b.onclick=function(){
      const oi=+b.dataset.oi, o=st.opts[oi];
      if(st.kind==='check'&&st.plain){
        WS.A.erledigt[oi]=!WS.A.erledigt[oi];
      }
      else if(st.kind==='check'){
        if(o.keep) return;
        WS.sel=WS.sel||[];
        const p=WS.sel.indexOf(oi); if(p>-1) WS.sel.splice(p,1); else WS.sel.push(oi);
        WS.A.fixZusatz=st.opts.reduce(function(a,x,j){ return a+((WS.sel.indexOf(j)>-1||x.keep)?x.v:0); },0);
        WS.A.fix=FIXSUM+WS.A.fixZusatz;
      }
      else if(st.field){ WS.A[st.field]=o.v; }
      else {
        const k=Object.keys(o.set||{})[0]; if(!k) return;
        if(st.kind==='pick'){ st.opts.forEach(function(x){ const kk=Object.keys(x.set||{})[0]; if(kk) WS.A[kk]=false; }); WS.A[k]=true; }
        else {
          WS.A[k]=!WS.A[k];
          if(k==='on_b2c'&&WS.A.on_b2c&&!WS.A.b2cEvents) WS.A.b2cEvents=4;
          if(k==='on_b2b'&&WS.A.on_b2b&&!WS.A.b2bEvents) WS.A.b2bEvents=2;
        }
      }
      saveWiz(); renderWiz();
    };
  });
  const rng=$('#wizCard input[type=range]');
  if(rng){
    rng.oninput=function(){
      WS.A[st.field]=+rng.value;
      rng.style.setProperty('--fill',((rng.value-st.min)/(st.max-st.min)*100).toFixed(1)+'%');
      $('#wizCard output').innerHTML=NUM(+rng.value)+' <em>'+st.unit+'</em>';
      saveWiz(); renderWizLive();
    };
  }
  $$('#wizCard [data-pre]').forEach(function(b){ b.onclick=function(){
    WS.A[st.field]=+b.dataset.pre; saveWiz(); renderWiz();
  };});
  $$('#wizCard [data-w]').forEach(function(b){ b.onclick=function(){
    const a=b.dataset.w, all2=wizSteps(), i2=Math.min(WS.i,all2.length-1);
    if(a==='back'){ WS.done[all2[i2].id]=false; WS.i=Math.max(0,i2-1); saveWiz(); renderWiz(); }
    else if(a==='next'){ WS.done[all2[i2].id]=true; WS.i=Math.min(all2.length-1,i2+1); saveWiz(); renderWiz(); refreshProgress(); window.scrollTo({top:0,behavior:'smooth'}); }
    else if(a==='again'||a==='restart'){ WS.i=0; WS.done={}; saveWiz(); renderWiz(); refreshProgress(); }
    else if(a==='copy'){ copyText(wizText(),'Dein Plan als Text kopiert'); }
    else if(a==='print'){ window.print(); }
    else if(a==='toplan'){ PST.A=Object.assign({},WS.A); PST.scen='basis'; savePlan(); showView('plan'); renderPlan();
      announce('Deine Zahlen stehen im Plan-Rechner'); }
  };});
}
function renderWizLive(){
  const el=$('#wizLive'); if(!el) return;
  const r=wizCalc(), A=WS.A;
  const row=function(l,v){ return '<div class="wizfoot-mini"><span>'+l+'</span><b>'+v+'</b></div>'; };
  let note='';
  if(r.last>r.lastMax) note='<div class="warnline">Du planst '+Math.round(r.last*10)/10+' Einheiten Logistik. Allein schaffen willst du dir '+r.lastMax+' zumuten — sonst leidet der Abend, an dem Geld hängt.</div>';
  else if(!A.on_b2b&&r.dbB2C>0) note='<div class="warnline">Ohne Firmen-Termine brauchst du '+r.beB2C+' Abende im Monat. Mit einem einzigen Firmen-Termin wären es '+r.beMix+'.</div>';
  else if(r.ergebnis>0) note='<div class="okline">Trägt. Wenn du die Fixkosten hältst, bleibt '+EUR(r.ergebnis)+' im Monat.</div>';
  el.innerHTML='<h4>Was das gerade heißt</h4>'+
    '<div class="big">'+EUR(r.ergebnis)+'<em>übrig im Monat, vor Steuer</em></div>'+
    '<div class="k">'+
      row('Umsatz',EUR(r.umsatz))+
      row('Fixkosten',EUR(r.fix))+
      (A.on_b2c?row('offene Abende',NUM(A.b2cEvents)+' × '+EUR(r.dbB2C)):'')+
      (A.on_b2b?row('Firmen-Termine',NUM(A.b2bEvents)+' × '+EUR(r.dbB2B)):'')+
      row('Break-even',NUM(r.beMix)+' Termine')+
      row('Logistik',Math.round(r.last*10)/10+' / '+r.lastMax)+
    '</div>'+note;
}
function bindWizKeys(){
  document.addEventListener('keydown',function(e){
    if(!$('#v-wiz')||!$('#v-wiz').classList.contains('on')) return;
    if(e.target.closest('input,textarea,select,[contenteditable]')) return;
    if(e.key==='Enter'){
      const nx=$('#wizCard [data-w="next"]'); if(nx){ e.preventDefault(); nx.click(); }
    }
    else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
      const b=$(e.key==='ArrowRight'?'#wizCard [data-w="next"]':'#wizCard [data-w="back"]');
      if(b&&!b.disabled){ e.preventDefault(); b.click(); }
    }
  });
}
/* Sprungziel: fertiger Plan */
function bindWizJump(){ const b=$('#wizJump'); if(b) b.onclick=function(){ showView('plan'); goChapter('rechner'); }; }
