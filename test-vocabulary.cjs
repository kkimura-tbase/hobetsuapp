const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const nodes = new Map();
function node(id) {
    if (!nodes.has(id)) nodes.set(id, {innerHTML:'', textContent:'', hidden:true, remove(){}, classList:{add(){}}, focus(){}, querySelector(){return null;}, querySelectorAll(){return [];}, addEventListener(type, fn){this[type] = fn;}});
    return nodes.get(id);
}
const storage = new Map();
const timers = new Map();
let timerId = 0;
function boot() {
    const context = vm.createContext({console, Math, setTimeout:(fn,ms)=>{timers.set(++timerId,{fn,ms});return timerId;}, clearTimeout:id=>timers.delete(id), confirm:()=>true, localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}, document:{getElementById:node,createElement:()=>({}),head:{appendChild(){}}}});
    vm.runInContext(fs.readFileSync('vocabulary-data.js','utf8') + fs.readFileSync('vocabulary-quest.js','utf8'),context);
    return context;
}
let context = boot();
const execute = code => vm.runInContext(code,context);
function click(key, value='') {
    const button = {disabled:false,dataset:{[key]:String(value)},hasAttribute:name=>name === 'data-'+key};
    node('view-vocab').click({target:{closest:()=>button}});
}
function answer(correct=true, advance=true) {
    const html=node('view-vocab').innerHTML;
    const en=html.match(/<h3>(.*?)<\/h3>/)[1].replace(/<[^>]*>/g,'').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
    const ja=execute(`vocabularyData.find(w=>w.en===${JSON.stringify(en)}).ja`);
    const opts=[...html.matchAll(/data-answer="(\d)"><span>\d<\/span>(.*?)<\/button>/g)];
    const right=opts.findIndex(m=>m[2].replace(/<[^>]*>/g,'').replace(/&#39;/g,"'").replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>') === ja);
    assert(right>=0);
    click('answer',correct?right:(right+1)%4);
    if (advance) click('next');
}
assert.equal(execute('vocabularyData.length'),1300);
assert.equal(execute('new Set(vocabularyData.map(w=>w.id)).size'),1300);
assert.equal(execute('VocabQuest.stages.length'),156);
assert.equal(execute('VocabQuest.stages.filter(s=>!s.boss).flatMap(s=>s.words).length'),1300);
assert.equal(execute('VocabQuest.stages[0].rank'),'A');
assert.equal(execute('VocabQuest.stages[60].rank'),'B');
assert.equal(execute('VocabQuest.stages[108].rank'),'C');
assert.equal(execute('VocabQuest.stages[144].rank'),'会話');
assert.deepEqual([7,8,9,10].map(n=>execute(`VocabQuest.stars(${n},10)`)),[0,1,2,3]);
execute('for(const w of vocabularyData){const o=VocabQuest.options(w);if(o.length!==4||new Set(o).size!==4||!o.includes(w.ja))throw Error(w.id)}');
execute('VocabQuest.open()');
const map = node('view-vocab').innerHTML;
click('start',1); assert.equal(node('view-vocab').innerHTML,map,'locked stage cannot launch');
click('start',0);
for(let i=0;i<10;i++)answer(i>=2);
assert(node('view-vocab').innerHTML.includes('RETRY'));
answer(false); answer(); answer(); // repeated retry does not add score
assert(node('view-vocab').innerHTML.includes('8 / 10問正解'));
assert.equal(JSON.parse([...storage.values()][0]).stars['stage-1'],1);
context=boot(); execute('VocabQuest.open()');
assert(node('view-vocab').innerHTML.includes('1 / 130 ステージ'));
click('start',0); for(let i=0;i<10;i++)answer(i>=3); for(let i=0;i<3;i++)answer();
assert.equal(JSON.parse([...storage.values()][0]).stars['stage-1'],1,'lower replay keeps best');
for(let s=1;s<6;s++){click('start',s);for(let i=0;i<10;i++)answer();}
let p=JSON.parse([...storage.values()][0]);
assert.equal(p.stars['boss-5'],3); assert.equal(p.mascot,0);
assert(node('view-vocab').innerHTML.includes('宝箱オープン'));
click('start',5);for(let i=0;i<10;i++)answer();
assert(!node('view-vocab').innerHTML.includes('宝箱オープン'),'no duplicate first-clear reward');
const html=fs.readFileSync('index.html','utf8');
click('start',0);
answer(true,false);
assert.equal(timers.size,1);
assert(node('vq-feedback').textContent.includes('1秒後'));
assert(node('view-vocab').innerHTML.includes('問題 1 / 10'));
const scheduled=[...timers.values()][0];
assert.equal(scheduled.ms,1000);
scheduled.fn();
assert(node('view-vocab').innerHTML.includes('問題 2 / 10'));
assert.equal(timers.size,0);
answer(false,false);
assert.equal(timers.size,0,'wrong answers wait for manual next');
click('next');
answer(true,false); click('next');
assert.equal(timers.size,0,'manual next cancels timer');
answer(true,false); execute('VocabQuest.open()');
assert.equal(timers.size,0,'map cancels timer');
click('start',0); answer(true,false); execute('VocabQuest.leave()');
assert.equal(timers.size,0,'tab exit cancels timer');
new vm.Script(execute('VocabQuest.exportSource()'));
storage.clear(); context=boot(); execute('VocabQuest.open()');
const freshMap=node('view-vocab').innerHTML;
click('start',145); assert.equal(node('view-vocab').innerHTML,freshMap,'conversation 2 initially locked');
click('start',144);
assert(node('view-vocab').innerHTML.includes('会話 ステージ 1'));
for(let i=0;i<10;i++)answer();
assert.equal(JSON.parse([...storage.values()][0]).stars['stage-121'],3);
assert.equal(JSON.parse([...storage.values()][0]).stars['stage-1'],undefined,'separate progress');
context=boot(); execute('VocabQuest.open()');
click('start',145); assert(node('view-vocab').innerHTML.includes('会話 ステージ 2'));
execute('VocabQuest.open()'); const separateMap=node('view-vocab').innerHTML;
click('start',1); assert.equal(node('view-vocab').innerHTML,separateMap,'conversation does not unlock vocabulary');
for(let s=145;s<=149;s++){click('start',s);for(let i=0;i<10;i++)answer();}
assert.equal(JSON.parse([...storage.values()][0]).stars['boss-125'],3);
assert.equal(JSON.parse([...storage.values()][0]).mascot,24,'stable existing reward IDs');
click('start',150); assert(node('view-vocab').innerHTML.includes('会話 ステージ 6'));
click('speak');
assert(node('vq-speech-status').textContent.includes('対応していません'));
const speechCalls=[];
let cancelled=0;
context.SpeechSynthesisUtterance = class {constructor(text){this.text=text;}};
context.speechSynthesis={getVoices:()=>[{lang:'ja-JP'},{lang:'en-US'}],speak:u=>speechCalls.push(u),cancel:()=>cancelled++};
click('speak');
assert.equal(speechCalls.length,1);
assert.equal(speechCalls[0].lang,'en-US');
assert.equal(speechCalls[0].voice.lang,'en-US');
assert(execute(`vocabularyData.some(w=>w.rank==='会話' && w.en===${JSON.stringify(speechCalls[0].text)})`));
click('speak'); assert.equal(cancelled,1,'repeated taps cancel previous speech');
speechCalls[0].onend(); assert(node('vq-speech-status').textContent.includes('発音中'));
execute('VocabQuest.leave()');
assert.equal(cancelled,2,'tab exit cancels speech');
click('start',0);click('speak');answer();
assert.equal(cancelled,3,'next question cancels speech');
click('speak');speechCalls.at(-1).onerror();
assert(node('vq-speech-status').textContent.includes('読み上げできません'));
for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi))new vm.Script(match[1]);
console.log('PASS: 1300 words, 156 stages, all options, thresholds, locks, retries, persistence, best score, boss reward, syntax');
