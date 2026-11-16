/**
 * ELVARIA Core Store & Utilities
 */
const mem={};
const store={
  get(k){ try{ const v=localStorage.getItem(k); if(v!==null) return v; }catch(e){} return mem[k]!==undefined?mem[k]:null; },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} mem[k]=v; }
};
let DONE={};
try{ DONE=JSON.parse(store.get('elvaria-done')||'{}'); }catch(e){ DONE={}; }
function saveDone(){ store.set('elvaria-done',JSON.stringify(DONE)); }
const totalAll = P.reduce((a,p)=>a+p.steps.length,0) + I.reduce((a,i)=>a+i.s.length,0);
let totalAllDeep=totalAll; /* nach DEEP-Auswertung gesetzt */
function doneCount(){ return Object.keys(DONE).reduce((a,k)=>a+progOf(k,(DONE[k]||[]).length),0); }
function progOf(id,len){
  const arr=DONE[id];
  if(!arr) return 0;
  return Array.isArray(arr)?arr.filter(Boolean).length:0;
}

const $=(s,c=document)=>c.querySelector(s);
const $$=(s,c=document)=>[...c.querySelectorAll(s)];

function announce(m){ const a=$('#announce'); if(a) a.textContent=m; }
let toastT=null;
function toast(m){
  const t=$('#toast'); if(!t) return;
  t.textContent=m; t.classList.add('on');
  clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('on'),2300);
}
function syncChips(){ $$('.chip').forEach(c=>c.setAttribute('aria-pressed',c.classList.contains('on')?'true':'false')); }

/* ══════════════════════════════════════════
   QUERVERWEISE: Idee ↔ Plattform
   ══════════════════════════════════════════ */
const REL={
  0:['ev','wu','at','rh'],
  9:['ev','cb'],
  10:['ev','cb'],
  11:['ev','cb'],
  12:['cb','ed','px','gv'],
  13:['cb','ev'],
  14:['gk','gy','ev'],
  15:['gk','js'],
  30:['gy','ab','ev'],
  31:['ev','cb']
};
const RELP={};
Object.keys(REL).forEach(k=>REL[k].forEach(pid=>{ (RELP[pid]=RELP[pid]||[]).push(+k); }));

function relItems(kind,id){
  const out=[];
  if(kind==='i'){
    (REL[+id]||[]).forEach(pid=>{ const p=P.find(x=>x.id===pid); if(p) out.push({k:'p',id:p.id,n:p.n,s:'Plattform · '+p.dauer,t:'Plattform'}); });
  } else if(kind==='p'){
    (RELP[id]||[]).forEach(i=>{ const it=I[i]; if(it) out.push({k:'i',id:i,n:it.t,s:'Idee · Ring '+it.r,t:'Idee'}); });
  }
  const base = kind==='i'?I[+id]:null;
  let pool = I.map((x,i)=>({...x,_i:i}));
  if(base){
    const same=pool.filter(x=>x.r===base.r&&x._i!==+id);
    const ov=x=>x.f.filter(f=>base.f.includes(f)).length;
    same.sort((a,b)=>ov(b)-ov(a));
    pool=same;
  } else {
    pool=pool.filter(x=>x.f.includes('emp'));
  }
  pool.slice(0,3).forEach(x=>{
    if(out.some(o=>o.k==='i'&&String(o.id)===String(x._i))) return;
    out.push({k:'i',id:x._i,n:x.t,s:'Idee · Ring '+x.r,t:base?'Gleicher Ring':'Empfohlen'});
  });
  return out.slice(0,5);
}
function paintRel(kind,id){
  const items=relItems(kind,id);
  const box=$('#dRel'); if(!box) return;
  if(!items.length){ box.innerHTML=''; return; }
  box.innerHTML='<div class="relhead">Passt dazu</div><div class="relgrid">'+
    items.map(o=>`<button class="rel" data-t="${o.k}" data-id="${o.id}"><span class="rk">${o.t}</span><b>${o.n}</b><span>${o.s}</span></button>`).join('')+'</div>';
}
