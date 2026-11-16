/**
 * ELVARIA Tile Renderers & Collection Lists (P & I)
 */
/* ══════════════════════════════════════════
   KACHEL-RENDERER
   ══════════════════════════════════════════ */
function tileP(p,compact){
  const dn=progOf('p-'+p.id,p.steps.length), pc=Math.round(dn/p.steps.length*100);
  const full=dn===p.steps.length;
  const kc = p.w===1?'':p.w===2?'k2':p.w===3?'k3':'kn';
  const wTag = p.w===1?'w1':p.w===2?'w2':p.w===3?'w3':'no';
  const wTxt = p.w===1?'Welle 1':p.w===2?'Welle 2':p.w===3?'Welle 3':'Später';
  return `<button class="tile ${kc}${full?' full':''}" data-t="p" data-id="${p.id}" aria-label="${p.n} — ${dn} von ${p.steps.length} Schritten erledigt">
    <span class="idx">${String(P.indexOf(p)+1).padStart(2,'0')}</span>
    <div class="tile-top">
      <span class="tag ${p.cls}">${p.cls==='A'?'Code':p.cls==='B'?'Karte':'Rabatt'}</span>
      <span class="tag ${wTag}">${wTxt}</span>
      ${p.easy?'<span class="tag w1" style="background:#F1F6F2;color:#2C6A4E">ohne Terminal</span>':''}
      ${full?'<span class="tag doneTag">✓ fertig</span>':''}
    </div>
    <h3>${p.n}</h3>
    <p class="desc">${p.d}</p>
    <div class="tile-foot">
      <span class="ring" style="--p:${pc}"><i>${dn}/${p.steps.length}</i></span>
      <span class="m">${p.dauer}</span>
      <span class="amp ${p.auf}" title="Aufnahme: ${p.aufLab}">${p.auf==='ok'?'&#9679;':p.auf==='bedingt'?'&#9680;':p.auf==='unklar'?'&#9675;':'&#10005;'} ${p.auf==='ok'?'nimmt auf':p.auf==='bedingt'?'mit H&uuml;rde':p.auf==='unklar'?'ungekl&auml;rt':'nimmt nicht'}</span>
      <span class="go">Tutorial →</span>
    </div>
  </button>`;
}

const RINGN={1:'Nebengeschäft',2:'Neue Formate',3:'Neue Produkte',4:'Anderes Modell'};
function tileI(i,idx){
  const dn=progOf('i-'+idx,i.s.length), pc=Math.round(dn/i.s.length*100);
  const full=dn===i.s.length;
  const FL={emp:'Empfohlen',cau:'Vorsicht',neu:'Neu',geld:'Umsatz',schnell:'Schnell',box:'Boxen + Yoga'};
  return `<button class="tile idea${full?' full':''}" data-t="i" data-id="${idx}" aria-label="${i.t} — ${dn} von ${i.s.length} Schritten erledigt">
    <span class="idx">0${i.r}</span>
    <div class="tile-top">
      <span class="tag w2" style="background:#F3EFE6;color:#7C6733">Ring ${i.r} · ${RINGN[i.r]}</span>
      ${full?'<span class="tag doneTag">✓ fertig</span>':''}
    </div>
    <h3>${i.t}</h3>
    <p class="desc">${i.d}</p>
    <div class="money">${i.m}</div>
    <div class="flags">${i.f.map(f=>`<span class="fl ${f}">${FL[f]}</span>`).join('')}</div>
    <div class="tile-foot">
      <span class="ring" style="--p:${pc}"><i>${dn}/${i.s.length}</i></span>
      <span class="m">${dn?(full?'fertig':'weiter bei '+(dn+1)):'So fängst du an'}</span>
      <span class="go">Tutorial →</span>
    </div>
  </button>`;
}
function tileNoGo(n,idx){
  return `<button class="tile no-go" data-t="n" data-id="${idx}">
    <span class="idx">✕</span>
    <div class="tile-top"><span class="tag no">Nicht machen</span></div>
    <h3>${n.t}</h3>
    <p class="desc">${n.d}</p>
    <div class="tile-foot"><span class="go">Warum? →</span></div>
  </button>`;
}

/* ══════════════════════════════════════════
   FILTER-STATE + LISTEN (auch für Weiter/Zurück)
   ══════════════════════════════════════════ */
const FS={cls:'all',w:'all',easy:null,free:null,r:'all',flag:null,cat:'Alle'};

/* Sortierung: nach Aufnahme-Ampel, dann Welle, dann Klasse */
const GRUPPE=[['ok','Nimmt dich auf'],['bedingt','Nimmt dich auf — mit einer Bedingung'],['unklar','Ungeklärt'],['nein','Nimmt dich nicht auf']];
let SORT='gruppe';
function groupOf(p){ return p.auf||'unklar'; }
function listP(){
  const q=$('#qP').value.trim().toLowerCase();
  const arr=P.filter(p=>{
    if(FS.cls!=='all'&&p.cls!==FS.cls) return false;
    if(FS.w!=='all'&&String(p.w)!==String(FS.w)) return false;
    if(FS.easy&&!p.easy) return false;
    if(FS.free&&!p.free) return false;
    if(q&&![p.n,p.d,p.g,p.weg,p.brauch,p.kostet,p.falle,p.urteil,p.dauer,p.aufLab,p.aufSub,p.aufWie].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
  if(SORT==='gruppe'){
    const g=o=>{const i=GRUPPE.findIndex(x=>x[0]===groupOf(o));return i<0?9:i;};
    const w=o=>typeof o.w==='number'?o.w:9;
    return arr.slice().sort((a,b)=>g(a)-g(b)||w(a)-w(b)||a.n.localeCompare(b.n));
  }
  return arr.slice().sort((a,b)=>{const w=o=>typeof o.w==='number'?o.w:9;return w(a)-w(b)||a.n.localeCompare(b.n);});
}
function listI(){
  const q=$('#qI').value.trim().toLowerCase();
  return I.map((x,i)=>({...x,_i:i})).filter(i=>{
    if(FS.r!=='all'&&i.r!==+FS.r) return false;
    if(FS.flag&&!i.f.includes(FS.flag)) return false;
    if(q&&![i.t,i.d,i.m,i.x,...i.s.map(s=>Array.isArray(s)?s.join(' '):s)].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
}
function noGoShown(){ return FS.r==='all'&&!FS.flag&&!$('#qI').value.trim(); }

/* Navigation innerhalb der gerade sichtbaren Liste */
function navOfP(){ return listP().map(p=>({kind:'p',id:p.id,n:p.n})); }
function navOfI(){
  const arr=listI().map(x=>({kind:'i',id:x._i,n:x.t}));
  if(noGoShown()) NOGO.forEach((n,k)=>arr.push({kind:'n',id:k,n:n.t}));
  return arr;
}

function renderP(){
  const list=listP();
  $('#nP').textContent=list.length+' von '+P.length;
  $('#cP').textContent=P.length+' Wege · Klick öffnet das Tutorial';
  $('#eP').style.display=list.length?'none':'block';
  if(SORT==='gruppe'){
    const G={ok:['●','Nimmt dich auf','Sofort machbar oder mit einem Formular erledigt','#2C6A4E'],
             bedingt:['◐','Nimmt dich auf — aber jede verlangt etwas','Erst eine Bedingung erfüllen, dann bewerben','#8A5A00'],
             unklar:['○','Ungeklärt','Eine Frage muss noch geklärt werden','#5A6470'],
             nein:['✕','Nimmt dich nicht auf','Zeitverschwendung — oder erst in einem Jahr','#9A2B2B']};
    let html='';
    GRUPPE.forEach(([g,label])=>{
      const arr=list.filter(p=>groupOf(p)===g);
      if(!arr.length) return;
      html+=`<div class="pgrpwrap"><div class="pgrpband" style="--pc:${G[g][3]}"><span class="pb-dot">${G[g][0]}</span><b>${G[g][1]}</b><span class="pb-r">${G[g][2]}</span><span class="pb-n">${arr.length}</span></div><div class="tiles">${arr.map(p=>tileP(p)).join('')}</div></div>`;
    });
    $('#gridP').innerHTML=html;
  } else {
    $('#gridP').innerHTML='<div class="pgrpwrap"><div class="tiles">'+list.map(p=>tileP(p)).join('')+'</div></div>';
  }
  syncChips();
}

function renderI(){
  const list=listI();
  $('#nI').textContent=list.length+' von '+I.length;
  $('#cI').textContent=I.length+' Ideen · 4 Ringe';
  $('#eI').style.display=list.length?'none':'block';
  let html='',cur=null;
  list.forEach((it,idx)=>{
    if(it.r!==cur){ cur=it.r; html+=`<div class="sec"><span class="n">0${it.r}</span><h2>${RINGN[it.r]}</h2><span class="r">${{1:'sofort prüfbar',2:'mit dem, was du hast',3:'Monat 6–12',4:'Jahr 2–3'}[it.r]}</span></div><div class="tiles">`; }
    html+=tileI(it,it._i);
    const nx=list[idx+1];
    if(!nx||nx.r!==it.r) html+='</div>';
  });
  if(noGoShown()){
    html+=`<div class="sec"><span class="n">✕</span><h2>Was ich verwerfen würde</h2><span class="r">trotz Verlockung</span></div><div class="tiles">`;
    NOGO.forEach((n,k)=>html+=tileNoGo(n,k));
    html+='</div>';
  }
  $('#wrapI').innerHTML=html;
  syncChips();
}
