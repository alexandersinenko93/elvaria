/**
 * ELVARIA Plan Scroll Spy & Anhang Panes Switcher
 */
let spyOn=false;
function spyPlan(){
  if(spyOn) return; spyOn=true;
  requestAnimationFrame(()=>{
    spyOn=false;
    if(!$('#v-plan').classList.contains('on')) return;
    const ids=['rechner'].concat(PLAN.map(c=>c.id)).concat(['meilensteine']);
    let cur=ids[0];
    ids.forEach(id=>{ const el=$('#pl-'+id); if(!el) return; if(el.getBoundingClientRect().top<150) cur=id; });
    if(cur!==PST.open){
      PST.open=cur; savePlan();
      $$('#plNav button').forEach(b=>b.classList.toggle('on',b.dataset.go===cur));
    }
  });
}

/* ── Anhang-Paneele ── */
function bindPlanSpy(){ window.addEventListener('scroll',function(){ spyPlan(); planProgress(); },{passive:true}); }
function planProgress(){
  const bar=$('#plProg'); if(!bar) return;
  const live=$('#v-plan').classList.contains('on')||$('#v-wiz').classList.contains('on');
  bar.classList.toggle('on',live);
  if(!live) return;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  bar.style.width=(h>80?Math.min(100,window.scrollY/h*100):0).toFixed(1)+'%';
}
function setAnhang(pane){
  const map={plat:'anPlat',ideen:'anIdeen',faq:'anFaq'};
  $$('#hnav button').forEach(x=>{ const on=x.dataset.v==='anhang';
    x.classList.toggle('on',on); x.setAttribute('aria-current',on?'page':'false'); });
  Object.keys(map).forEach(k=>{
    const el=$('#'+map[k]); if(el) el.classList.toggle('on',k===pane);
  });
  $$('#anbar button').forEach(b=>{
    const on=b.dataset.pane===pane;
    b.classList.toggle('on',on); b.setAttribute('aria-selected',on?'true':'false');
  });
  try{ store.set('elvaria-anhang',pane); }catch(e){}
}
function bindAnhang(){
  $$('#anbar button').forEach(b=>b.onclick=()=>setAnhang(b.dataset.pane));
}
