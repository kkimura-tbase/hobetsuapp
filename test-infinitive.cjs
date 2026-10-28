const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const game=require('./infinitive-battle.js');
const {questions,createRun,select,advance,battleScene}=game.rules;
assert.equal(questions.length,24);
assert.equal(new Set(questions.map(q=>q.id)).size,24);
for(const q of questions) {
 assert.equal(new Set(q.choices).size,3);
 assert(!game.rules.illustration(q).includes('undefined'));
}
assert.equal(questions.filter(q=>q.usage==='名詞的用法').length,12);
assert.equal(questions.filter(q=>q.usage==='形容詞的用法').length,12);
for(const q of questions) {
 assert.equal(new Set(q.firstChoices).size,3);
 assert(q.firstChoices.includes(q.first));
 assert(q.choices.includes(q.second));
 const answer=game.rules.answerHTML(q);
 assert(answer.includes('<mark>'+q.infinitive+'</mark>'));
 assert(!answer.includes('undefined'));
 assert(q.first!=='to' && q.second!=='to');
 const run=createRun();run.deck=[{...q,firstCards:q.firstChoices,secondCards:q.choices}];
 assert.equal(select(run,'second',q.second),false);
 assert.equal(select(run,'first',q.first),'jab');
 assert.equal(select(run,'second',q.second),'strike');
 assert.equal(run.completed.id,q.id);
}
for(let i=0;i<300;i++){
 const r=createRun();
 assert.equal(new Set(r.deck.map(q=>q.id)).size,24);
 assert.equal(new Set(r.deck.map(q=>q.usage)).size,2);
 r.deck.forEach(q=>{assert(q.firstCards.includes(q.first));assert(q.secondCards.includes(q.second));assert(game.rules.illustration(q).includes('<svg'));});
}
{
 const r=createRun(),q=r.deck[0];
 assert.equal(select(r,'second',q.second),false);
 advance(r,4000);
 assert.equal(select(r,'first',q.firstCards.find(v=>v!==q.first)),'miss');
 assert.equal(r.hp,3);assert.equal(r.charge,4000);
 assert.equal(select(r,'first',q.first),'jab');assert(r.charge<4000);
 assert.equal(select(r,'first',q.first),false); // Cannot farm stuns.
 const held=r.first;advance(r,8000);
 assert.equal(r.hp,2);assert.equal(r.first,held);assert.equal(r.index,0);
 assert(battleScene(r).includes('ib-received'));
 assert.equal(select(r,'second',q.second),'strike');
 assert.equal(r.index,1);assert.equal(r.charge,0);assert.equal(r.perfect,0);
}
{
 const r=createRun();
 for(let i=0;i<5;i++){
  const q=r.deck[r.index];
  assert.equal(select(r,'first',q.first),'jab');
  assert.equal(select(r,'second',q.second),i===2?'special':'strike');
  if(i===2)assert(battleScene(r).includes('ib-fight-cutin'));
 }
 assert(!r.finished,'five questions must not end battle');assert.equal(r.bestCombo,10);assert.equal(r.perfect,5);
 assert.equal(r.enemyHp,1100);
 while(!r.finished) {
  const q=r.deck[r.index];
  select(r,'first',q.first);
  if(!r.finished) select(r,'second',q.second);
  assert(r.index<20);
 }
 assert(r.won);assert.equal(r.enemyHp,0);assert.equal(r.damage,1800);
 assert(battleScene(r).includes('K.O.'));
 const score=r.damage;assert.equal(select(r,'first','is'),false);advance(r,100000);assert.equal(r.damage,score);assert.equal(r.hp,3);
}
// Both attack types can finish a battle; overkill is clamped.
for(const finishingKind of ['first','second']) {
 const r=createRun(), q=r.deck[0];
 if(finishingKind==='second') select(r,'first',q.first);
 r.enemyHp=7;
 const damageBefore=r.damage;
 select(r,finishingKind,q[finishingKind]);
 assert(r.won&&r.finished);assert.equal(r.enemyHp,0);assert.equal(r.damage-damageBefore,7);
 assert.equal(r.hits.length,finishingKind==='second'?1:0);
}
// Exhausting the question pool refills it without ending or repeating the boundary question.
{
 const r=createRun(()=>.3);r.enemyHp=100000;r.enemyMaxHp=100000;
 const count=questions.length;
 for(let i=0;i<count;i++) {
  const q=r.deck[r.index];select(r,'first',q.first);select(r,'second',q.second);
 }
 assert(!r.finished);assert.equal(r.index,count);assert.equal(r.deck.length,count*2);
 assert.notEqual(r.deck[count-1].id,r.deck[count].id);
 assert.equal(new Set(r.deck.slice(count).map(q=>q.id)).size,count);
 assert.equal(r.hits.length,count);
}
{
 const r=createRun(),q=r.deck[0];
 select(r,'first',q.first);
 assert.equal(r.enemyHp,1780);assert.equal(r.damage,20);
 assert(battleScene(r).includes('HP 1780 / 1800'));
 const hp=r.enemyHp;
 select(r,'second',q.secondCards.find(v=>v!==q.second));
 assert.equal(r.enemyHp,hp);assert.equal(r.hp,3);
}
for(const speed of ['slow','normal','fast']){
 const r=createRun(Math.random,speed);
 advance(r,r.interval-1);assert.equal(r.hp,3);
 advance(r,1);assert.equal(r.hp,2);
 advance(r,r.interval*2);assert.equal(r.hp,0);assert(r.finished&&!r.won);
}
{
 const r=createRun();
 advance(r,NaN);advance(r,-20);assert.equal(r.charge,0);
 assert.equal(select(r,'other','x'),false);
}
const source=fs.readFileSync('infinitive-battle.js','utf8');
new vm.Script(game.exportSource());
const html=fs.readFileSync('index.html','utf8');
for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))if(match[1].trim())new vm.Script(match[1]);
// Exercise real UI events and animation clock without a browser.
const handlers={},docHandlers={},frames=new Map();
let now=0,nextId=0;
const arena={innerHTML:'',classList:{toggle(){}}},panel={innerHTML:''},bar={style:{}};
const host={innerHTML:'',contains:()=>true,addEventListener:(k,f)=>handlers[k]=f,
 querySelector:s=>s==='.ib-live-arena'?arena:s==='.ib-console'?panel:s==='.ib-enemy-track i'?bar:null};
const document={hidden:false,getElementById:id=>id==='view-infinitive'?host:id==='infinitive-battle-style'?{}:null,
 addEventListener:(k,f)=>docHandlers[k]=f};
const math=Object.create(Math);math.random=()=>.3;
const ctx={document,Math:math,performance:{now:()=>now},requestAnimationFrame:f=>{frames.set(++nextId,f);return nextId;},cancelAnimationFrame:id=>frames.delete(id)};
vm.createContext(ctx);vm.runInContext(source+';globalThis.game=InfinitiveBattle;',ctx);
const press=(action,kind,value,type='click',extra={})=>{
 const b={disabled:false,dataset:{action,kind,value}};
 handlers[type]({target:{closest:()=>b},button:0,isPrimary:true,detail:0,preventDefault(){},...extra});
};
const tick=ms=>{now+=ms;const jobs=[...frames.values()];frames.clear();jobs.forEach(f=>f(now));};
ctx.game.open();
assert(host.innerHTML.includes('バトル開始'));
press('start');
assert.equal(frames.size,1);
assert(!host.innerHTML.includes('ib-timing'));
assert(panel.innerHTML.includes('①を正解すると、②のカードが出現！'));
assert(!panel.innerHTML.includes('data-kind="second"'));
const deck=createRun(()=>.3).deck;
press('select','first',deck[0].first,'pointerdown');
assert(arena.innerHTML.includes('JAB!'));
assert(panel.innerHTML.includes('文を完成 → 強攻撃'));
press('select','second',deck[0].second,'pointerdown'); // No animation lock.
assert(panel.innerHTML.includes('第2問'));
assert(panel.innerHTML.includes('<mark>'+deck[0].infinitive+'</mark>'));
press('select','first',deck[1].first,'click',{detail:1}); // Synthesized mouse click ignored.
assert(!panel.innerHTML.includes('JAB! 攻撃を足止め'));
tick(8000);
assert(arena.innerHTML.includes('HP 2 / 3'));
press('pause');assert.equal(frames.size,0);
tick(50000);
press('pause');assert.equal(frames.size,1);
tick(100);assert(arena.innerHTML.includes('HP 2 / 3'));
document.hidden=true;docHandlers.visibilitychange();assert.equal(frames.size,0);
tick(50000);document.hidden=false;docHandlers.visibilitychange();
tick(100);assert(arena.innerHTML.includes('HP 2 / 3'));
ctx.game.leave();assert.equal(frames.size,0);
tick(50000);ctx.game.open();assert(arena.innerHTML.includes('HP 2 / 3'));
press('select','first',deck[1].first,'keydown',{key:'Enter',repeat:true});
assert(!panel.innerHTML.includes('JAB! 攻撃を足止め'));
press('select','first',deck[1].first,'keydown',{key:'Enter',repeat:false});
assert(panel.innerHTML.includes('JAB! 攻撃を足止め'));
press('select','second',deck[1].second); // Assistive click.
assert(panel.innerHTML.includes('第3問'));
tick(24000);assert(host.innerHTML.includes('TRY AGAIN'));assert.equal(frames.size,0);
press('start');assert.equal(frames.size,1);
press('pause');press('menu');assert.equal(frames.size,0);
console.log('PASS: coverage, immediate attacks, combos, stun, damage, defeat, victory, pause, hidden tab, input, export and scripts.');
