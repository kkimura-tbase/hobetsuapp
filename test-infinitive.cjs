const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const game = require('./infinitive-battle.js');
const {questions, createRun, typeCharacter, advance, sentence, hintHTML} = game.rules;
const letters = text => text.replace(/[ .]/g, '');

assert.deepEqual(Object.fromEntries(['noun', 'adjective', 'adverb'].map(usage =>
    [usage, questions.filter(q => q.usage === usage).length])), {noun: 4, adjective: 5, adverb: 7});
assert.equal(new Set(questions.map(sentence)).size, questions.length);
for (const q of questions) assert.match(sentence(q), /^[A-Z][A-Za-z ]+\.$/);

const library = questions.find(q => q.before === 'She went to the library ');
assert.equal(hintHTML(library, 'practice'), 'She went to the library <mark>to borrow some books</mark>.');
const normalHint = hintHTML(library, 'normal');
assert.match(normalHint, /^She went to the library <span/);
assert(!normalHint.includes('borrow'));
assert.equal(hintHTML(library, 'hard'), '');

const run = createRun(() => .4);
assert.equal(new Set(run.deck.slice(0, 3).map(q => q.usage)).size, 3);
const first = sentence(run.deck[0]);
const firstWord = first.split(' ')[0];
const firstPrefix = first.slice(0, first[1] === ' ' ? 2 : 1);
assert.equal(typeCharacter(run, '0'), null);
assert.equal(typeCharacter(run, 'z').kind, 'miss');
assert.equal(run.typed, '');
assert.equal(run.enemyHp, run.enemyMaxHp);
assert.equal(typeCharacter(run, first[0].toLowerCase()).damage, 9);
assert.equal(run.enemyHp, run.enemyMaxHp - 9);
assert(advance(run, run.interval));
assert.equal(run.typed, firstPrefix.toLowerCase());
assert.equal(run.hp, 2);
assert.equal(run.combo, 0);
for (const char of firstWord.slice(1)) typeCharacter(run, char);
assert.equal(run.typed.toLowerCase(), firstWord.toLowerCase() + ' ');
const hpAfterWord = run.enemyHp;
const comboAfterWord = run.combo;
assert.equal(typeCharacter(run, ' '), null);
assert.equal(typeCharacter(run, '.'), null);
assert.equal(run.enemyHp, hpAfterWord);
assert.equal(run.combo, comboAfterWord);
let attack;
for (const char of letters(first).slice(firstWord.length)) attack = typeCharacter(run, char);
assert(attack.completed && attack.damage > 9);
assert.equal(run.index, 1);
assert.equal(run.typed, '');
assert.equal(run.charge, 0);
assert(advance(run, run.interval * 2));
assert(run.finished && !run.won);
assert.equal(typeCharacter(run, 's'), null);

for (const [course, count] of Object.entries({all: 16, noun: 4, adjective: 5, adverb: 7})) {
    for (const withMisses of [false, true]) {
        const battle = createRun(() => .4, 'normal', 'normal', course);
        assert.equal(battle.deck.length, count);
        assert.equal(new Set(battle.deck).size, count);
        if (course !== 'all') assert(battle.deck.every(q => q.usage === course));
        const keys = [...battle.deck.map(q => letters(sentence(q))).join('')];
        let specialCount = 0;
        keys.forEach((char, index) => {
            if (withMisses) {
                const hp = battle.enemyHp;
                assert.equal(typeCharacter(battle, char.toLowerCase() === 'z' ? 'x' : 'z').kind, 'miss');
                assert.equal(battle.enemyHp, hp);
            }
            const result = typeCharacter(battle, char);
            if (result.kind === 'special') specialCount++;
            if (index < keys.length - 1) assert(!battle.finished && battle.enemyHp > 0);
            else assert(result.completed && result.damage > 9 && battle.won && battle.enemyHp === 0);
        });
        assert.equal(battle.completed.length, count);
        assert.equal(battle.deck.length, count);
        assert.equal(specialCount > 0, !withMisses);
        assert.equal(battle.correctKeys, keys.length);
        assert.equal(battle.mistakes, withMisses ? keys.length : 0);
        assert.equal(battle.score, keys.length * 10 + count * 100 + specialCount * 50);
    }
}

new vm.Script(game.exportSource());
const source = fs.readFileSync('infinitive-battle.js', 'utf8');
const art = fs.readFileSync('infinitive-fighter-art.js', 'utf8');
const mockDocument = makeDocument();
const frames = new Map();
let time = 0;
let nextFrame = 0;
let strikesHeard = 0;
const strikeTimes = [];
const gainNodes = [];
const math = Object.create(Math);
math.random = () => .4;
const context = vm.createContext({
    document: mockDocument, Math: math, performance: {now: () => time},
    AudioContext: class {
        state = 'running';
        sampleRate = 1000;
        currentTime = 0;
        destination = {};
        createBuffer() { return {getChannelData: () => new Float32Array(180)}; }
        createOscillator() {
            return {...audioNode(), start(time) { strikesHeard++; strikeTimes.push(time); }};
        }
        createBufferSource() { return audioNode(); }
        createBiquadFilter() { return audioNode(); }
        createGain() {
            const node = audioNode();
            gainNodes.push(node);
            return node;
        }
    },
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { frames.delete(id); }
});
vm.runInContext(art + source + ';globalThis.game = InfinitiveBattle;', context);
assert(context.game.exportSource().includes('data:image/webp;base64,'));
new vm.Script(context.game.exportSource());
const {host} = mockDocument;
const tap = action => host.handlers.click({target: {closest: () => ({dataset: action, setAttribute() {}})}});
const input = (value, inputType) => {
    const field = host.parts.input;
    field.value = value;
    host.handlers.input({target: field, inputType});
};
const tick = elapsed => {
    time += elapsed;
    const jobs = [...frames.values()];
    frames.clear();
    jobs.forEach(job => job(time));
};

context.game.open();
assert(host.innerHTML.includes('ゲームモード'));
assert(host.innerHTML.includes('出題する用法'));
assert(host.innerHTML.includes('全用法<small>16問'));
tap({action: 'mode', value: 'practice'});
tap({action: 'start'});
assert(host.innerHTML.includes('JIS キーボード'));
assert(host.innerHTML.includes('data:image/webp;base64,'));
for (const key of ['¥', 'IntlRo', '@', '[', 'A', 'Z', ' ']) assert(host.keys.some(cap => cap.dataset.key === key));
assert.equal(host.parts.hint.innerHTML, hintHTML(run.deck[0], 'practice'));
assert.equal(frames.size, 1);
const field = host.parts.input;
assert(field.focused);
const oldHP = host.parts.enemyHp.textContent;
input(first[0], 'insertFromPaste');
assert.equal(field.value, '');
assert.equal(host.parts.enemyHp.textContent, oldHP);
input(first[0]);
assert.equal(field.value, firstPrefix);
assert.equal(host.parts.enemyHp.textContent, 'HP ' + (run.enemyMaxHp - 9) + ' / ' + run.enemyMaxHp);
assert.equal(host.parts.player.animations, 1);
assert.equal(host.parts.spark.animations, 1);
assert.equal(host.parts.lastKey.textContent, first[0]);
assert.equal(host.keys.find(cap => cap.dataset.key === first[0]).dataset.state, 'hit');
assert.equal(strikesHeard, 1);
input(field.value + ' ');
input(field.value + '.');
assert.equal(field.value, firstPrefix);
assert.equal(host.parts.player.animations, 1);
assert.equal(strikesHeard, 1);
tap({action: 'sound'});
assert.equal(gainNodes[0].gain.value, 0);
input(field.value + 'z');
assert.equal(host.parts.lastKey.textContent, 'Z');
assert.equal(host.keys.find(cap => cap.dataset.key === 'Z').dataset.state, 'miss');
assert.equal(host.keys.find(cap => cap.dataset.key === first[0]).dataset.state, undefined);
assert.equal(strikesHeard, 1);
tap({action: 'sound'});
assert.equal(gainNodes[0].gain.value, 1);
tick(8000);
assert.equal(field.value, firstPrefix);
assert.equal(host.parts.playerHp.textContent, 'HP 2 / 3');
tap({action: 'pause'});
assert(field.readOnly);
assert.equal(frames.size, 0);
tick(50000);
tap({action: 'pause'});
assert(!field.readOnly);
assert.equal(frames.size, 1);
for (const char of letters(first).slice(1)) input(field.value + char);
assert.equal(host.parts.input, field);
assert.equal(field.value, '');
assert.equal(host.parts.round.textContent, '第2問 / 16');
assert(host.parts.review.innerHTML.includes('<mark>'));
assert(host.parts.technique.textContent === '旋風キック' || host.parts.technique.textContent === '雷光ラッシュ');
assert(strikesHeard > 1);

mockDocument.hidden = true;
mockDocument.handlers.visibilitychange();
assert.equal(frames.size, 0);
tick(50000);
mockDocument.hidden = false;
mockDocument.handlers.visibilitychange();
tick(1);
assert.equal(host.parts.playerHp.textContent, 'HP 2 / 3');
context.game.leave();
assert.equal(frames.size, 0);
context.game.open();
assert.equal(host.parts.round.textContent, '第2問 / 16');
tick(16000);
assert(!host.parts.result.hidden);
assert(host.parts.result.innerHTML.includes('<mark>'));
const firstLetters = letters(first).length;
const firstAccuracy = (100 * firstLetters / (firstLetters + 1)).toFixed(1);
const firstScore = firstLetters * 10 + 100 + Math.floor((firstLetters - 1) / 20) * 50;
assert(host.parts.result.innerHTML.includes('<dt>正解率</dt><dd>' + firstAccuracy + '%</dd>'));
assert(host.parts.result.innerHTML.includes('<dt>スコア</dt><dd>' + firstScore.toLocaleString('ja-JP') + '</dd>'));
assert.equal(frames.size, 0);

tap({action: 'menu'});
tap({action: 'mode', value: 'hard'});
tap({action: 'course', value: 'adverb'});
tap({action: 'start'});
assert(host.parts.hint.hidden);
assert.equal(host.parts.hint.innerHTML, '');
assert.equal(host.parts.input.value, '');
assert.equal(host.parts.usage.textContent, '副詞的用法');
assert.equal(host.parts.round.textContent, '第1問 / 7');
const adverb = createRun(() => .4, 'normal', 'hard', 'adverb');
const adverbKeys = letters(adverb.deck.map(sentence).join(''));
for (const char of adverbKeys.slice(0, 19)) input(host.parts.input.value + char);
assert.equal(host.parts.specialFx.innerHTML, '');
const soundCountBeforeSpecial = strikeTimes.length;
input(host.parts.input.value + adverbKeys[19]);
assert.deepEqual(strikeTimes.slice(soundCountBeforeSpecial), [0, .09, .23, .40]);
const specialEffect = host.parts.specialFx.innerHTML;
assert(specialEffect.includes('雷光ラッシュ'));
assert(specialEffect.includes('ib-special-bolt'));
input(host.parts.input.value + adverbKeys[20]);
assert.equal(host.parts.specialFx.innerHTML, specialEffect);
for (const char of adverbKeys.slice(21)) input(host.parts.input.value + char);
assert.equal(host.arena.dataset.outcome, 'won');
assert.equal(host.parts.enemyHp.textContent, 'HP 0 / ' + adverb.enemyMaxHp);
assert(host.parts.result.innerHTML.includes('１周クリア！'));
assert(host.parts.result.innerHTML.includes('副詞的用法 ／ 7 / 7 文完成'));
const adverbScore = adverbKeys.length * 10 + 700 + Math.floor(adverbKeys.length / 20) * 50;
assert(host.parts.result.innerHTML.includes('<dt>正解率</dt><dd>100.0%</dd>'));
assert(host.parts.result.innerHTML.includes('<dt>スコア</dt><dd>' + adverbScore.toLocaleString('ja-JP') + '</dd>'));
assert.equal(frames.size, 0);
tap({action: 'start'});
tick(24000);
assert(host.parts.result.innerHTML.includes('<dt>正解率</dt><dd>—</dd>'));
assert(host.parts.result.innerHTML.includes('<dt>スコア</dt><dd>0</dd>'));
for (const [course, count] of [['noun', 4], ['adjective', 5]]) {
    tap({action: 'menu'});
    tap({action: 'course', value: course});
    tap({action: 'start'});
    assert.equal(host.parts.round.textContent, '第1問 / ' + count);
    const limited = createRun(() => .4, 'normal', 'hard', course);
    for (const q of limited.deck) {
        for (const char of letters(sentence(q))) input(host.parts.input.value + char);
    }
    assert.equal(host.arena.dataset.outcome, 'won');
    assert(host.parts.result.innerHTML.includes('１周クリア！'));
    assert(host.parts.result.innerHTML.includes(count + ' / ' + count + ' 文完成'));
    assert.equal(frames.size, 0);
}
context.game.leave();

const html = fs.readFileSync('index.html', 'utf8');
assert.match(html, /id="view-infinitive"/);
assert.match(html, /<script src="infinitive-fighter-art\.js"><\/script>\s*<script src="infinitive-battle\.js"><\/script>/);
console.log('PASS: course filters, final-question knockout, modes, JIS feedback, special cut-in, layered sound, mute and export');

function audioNode() {
    const parameter = {setValueAtTime() {}, exponentialRampToValueAtTime() {}};
    return {
        frequency: {...parameter}, gain: {...parameter},
        connect(target) { return target; },
        disconnect() {}, start() {}, stop() {}
    };
}

function makeDocument() {
    const node = () => ({
        innerHTML: '', textContent: '', dataset: {}, style: {}, attrs: {},
        classList: {toggle() {}, remove() {}},
        setAttribute(name, value) { this.attrs[name] = value; },
        removeAttribute(name) { if (name === 'data-state') delete this.dataset.state; },
        focus() { this.focused = true; },
        querySelector() { return null; },
        animate() {
            this.animations = (this.animations || 0) + 1;
            return {cancel() {}};
        }
    });
    const host = {
        handlers: {},
        contains: () => true,
        addEventListener(type, handler) { this.handlers[type] = handler; },
        set innerHTML(html) {
            this.markup = html;
            this.parts = Object.fromEntries([...html.matchAll(/data-part="([^"]+)"/g)].map(([, key]) =>
                [key, {...node(), dataset: {part: key}}]));
            this.keys = [...html.matchAll(/<kbd class="ib-key" data-key="([^"]+)"[^>]*>([^<]+)<\/kbd>/g)].map(([, key, label]) =>
                ({...node(), dataset: {key}, textContent: label}));
            this.arena = node();
            this.pause = node();
            this.menu = node();
        },
        get innerHTML() { return this.markup; },
        querySelectorAll(selector) {
            if (selector === '[data-part]') return Object.values(this.parts);
            return selector === '[data-key]' ? this.keys : [];
        },
        querySelector(selector) {
            return {'.ib-fight': this.arena, '[data-action="pause"]': this.pause, '.ib-menu-link': this.menu}[selector];
        }
    };
    return {
        host, hidden: false, handlers: {},
        getElementById(id) {
            return {'view-infinitive': host, 'infinitive-battle-style': {}}[id];
        },
        addEventListener(type, handler) { this.handlers[type] = handler; }
    };
}
