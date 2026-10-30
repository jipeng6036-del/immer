'use strict';
const assert=require('node:assert/strict');const rows=[];
for(const method of ['pop','shift','splice']){delete require.cache[require.resolve('./candidate-v4.cjs')];const x=require('./candidate-v4.cjs');x.enableArrayMethods();const im=new x.Immer({autoFreeze:false});class Bomb{};Object.defineProperty(Bomb.prototype,x.immerable,{get(){throw new Error('draftability getter failure')}});const items=method==='shift'?[new Bomb(),{n:0}]:[{n:0},new Bomb()];let calls=0,threw=false,afterDraft;
const next=im.produce({items},d=>{d.items.sort(()=>{if(calls++===0){try{if(method==='splice')d.items.splice({valueOf(){throw new Error('coercion failure')}});else d.items[method]();}catch(e){threw=true;}afterDraft=x.isDraft(d.items[method==='shift'?1:0]);}return 0;});});assert.equal(threw,true);assert.equal(afterDraft,false);assert.equal(next.items.length,2);rows.push({method,threw,afterDraft,length:next.items.length});}
console.log(JSON.stringify(rows,null,2));
