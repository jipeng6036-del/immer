'use strict';
for(const mode of ['plain','baseline','candidate']){
 const file=mode==='candidate'?'./candidate-v4.cjs':'./baseline.cjs';delete require.cache[require.resolve(file)];const x=require(file);if(mode!=='plain')x.enableArrayMethods();const im=new x.Immer({autoFreeze:false});const base={a:[{n:0}]};let observed;
 const out=im.produce(base,d=>{im.produce(d.a,inner=>{const item=inner.pop();item.n++;inner.push(item)});observed=d.a[0].n;});
 console.log(JSON.stringify({scenario:'nested-produce-discard-inner-result',mode,observed,base:base.a[0].n,out:out.a[0].n}));
}
for(const mode of ['plain','baseline','candidate']){
 const file=mode==='candidate'?'./candidate-v4.cjs':'./baseline.cjs';delete require.cache[require.resolve(file)];const x=require(file);if(mode!=='plain')x.enableArrayMethods();const im=new x.Immer({autoFreeze:false});let reads=0;const arr=[];Object.defineProperty(arr,0,{enumerable:true,configurable:true,get(){reads++;return {n:0}}});arr.push({n:1});let error;
 try{im.produce({a:arr},d=>{d.a.pop()})}catch(e){error=e.message}console.log(JSON.stringify({scenario:'getter-count-on-other-element',mode,reads,error}));
}
