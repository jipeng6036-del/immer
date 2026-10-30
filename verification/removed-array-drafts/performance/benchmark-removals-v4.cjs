const {performance}=require('node:perf_hooks');
const baseline=require('./baseline-current.cjs');baseline.enableArrayMethods();
const candidate=require('./experiment-v4.cjs');candidate.enableArrayMethods();
delete require.cache[require.resolve('./baseline-current.cjs')];
const plain=require('./baseline-current.cjs');
const libs={oldPlugin:baseline,candidatePlugin:candidate,ordinaryProxy:plain};
const results=[];
for(const [name,size,count] of [['pop',1000,100],['shift',1000,100],['splice',1000,100],['splice-all',1000,1000],['pop',10000,1]]) {
 const base=Array.from({length:size},(_,i)=>({n:i}));const samples={oldPlugin:[],candidatePlugin:[],ordinaryProxy:[]};
 for(let round=0;round<5;round++) for(const [label,lib] of Object.entries(libs)) {
  const im=new lib.Immer({autoFreeze:false});const t=performance.now();
  for(let iteration=0;iteration<10;iteration++) im.produce(base,d=>{
   if(name==='splice-all') d.splice(0,count);
   else for(let i=0;i<count;i++) {if(name==='splice') d.splice(d.length-1,1);else d[name]();}
  });samples[label].push(performance.now()-t);
 }
 const median=x=>x.sort((a,b)=>a-b)[2];const values=Object.fromEntries(Object.entries(samples).map(([k,v])=>[k,median(v)]));
 results.push({name,size,count,iterations:10,...values,candidateVsOrdinary:values.candidatePlugin/values.ordinaryProxy});
}
console.log(JSON.stringify({node:process.version,note:'Removed values ignored in timing; old plugin returns raw values while candidate and ordinary proxy provide drafts. No performance superiority claim.',results},null,2));
