/* Spritzt website/plan.js in index.html zwischen die PLAN-Sentineln.
   Aufruf:  node website/sync_plan.js          -> einspielen, wenn abweichend
            node website/sync_plan.js --check  -> nur prüfen, Fehlercode 1 bei Abweichung */
const fs=require('fs'), path=require('path');
const dir=__dirname;
const plan=fs.readFileSync(path.join(dir,'plan.js'),'utf8').replace(/\n+$/,'');
const htmlPath=path.join(dir,'index.html');
const html=fs.readFileSync(htmlPath,'utf8');
const B='/* ═══ PLAN:BEGIN — Quelle ist website/plan.js, hier nicht editieren ═══ */';
const E='/* ═══ PLAN:END ═══ */';
const i=html.indexOf(B), j=html.indexOf(E);
if(i<0||j<0){ console.error('Sentineln fehlen in index.html'); process.exit(2); }
const cur=html.slice(i,j+E.length).replace(/\n+$/,'');
if(cur===plan){
  console.log('synchron: plan.js steckt wortgleich in index.html ('+plan.split('\n').length+' Zeilen)');
  process.exit(0);
}
if(process.argv.includes('--check')){
  console.error('UNSYNCHRON: index.html weicht von plan.js ab');
  process.exit(1);
}
fs.writeFileSync(htmlPath, html.slice(0,i)+plan+html.slice(j+E.length));
console.log('einspielt: '+plan.split('\n').length+' Zeilen plan.js -> index.html');
