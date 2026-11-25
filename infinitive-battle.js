/* Self-contained infinitive typing battle. */
const InfinitiveBattle = (function createInfinitiveBattle(fighterArt) {
    'use strict';
    const usages = {noun: '名詞的用法', adjective: '形容詞的用法', adverb: '副詞的用法'};
    const courses = {all: '全用法', ...usages};
    const modes = {
        practice: {label: '練習', detail: '英文をすべて表示'},
        normal: {label: 'ノーマル', detail: '不定詞の部分を隠す'},
        hard: {label: 'ハード', detail: '英文をすべて隠す'}
    };
    const speeds = {slow: 12000, normal: 8000, fast: 5000};
    const playerMaxHp = 3;
    const specialInterval = 20;
    const hitDamage = 9;
    const finishBonus = 75;
    const minimumFinishBonus = 30;
    const points = {letter: 10, sentence: 100, special: 50};

    // The first 13 items are from the worksheet; the final three are new.
    const questions = [
        {usage: "noun", before: "Ken wants ", infinitive: "to study abroad", after: ".",
            ja: "ケンは留学したいです。", explanation: "留学することを望んでいます。"},
        {usage: "noun", before: "Hayato likes ", infinitive: "to listen to music", after: ".",
            ja: "ハヤトは音楽を聴くことが好きです。", explanation: "好きなことを表しています。"},
        {usage: "noun", before: "You want ", infinitive: "to go to the park", after: ".",
            ja: "あなたは公園に行きたいです。", explanation: "行きたいことを表しています。"},
        {usage: "adjective", before: "We need someone ", infinitive: "to help us", after: ".",
            ja: "私たちには、私たちを助けてくれる人が必要です。", explanation: "someone を説明しています。"},
        {usage: "adjective", before: "She needs someone ", infinitive: "to help her", after: ".",
            ja: "彼女には、自分を助けてくれる人が必要です。", explanation: "someone を説明しています。"},
        {usage: "adjective", before: "He was the first student ", infinitive: "to answer the question", after: ".",
            ja: "彼はその質問に最初に答えた生徒でした。", explanation: "the first student を説明しています。"},
        {usage: "adjective", before: "I am looking for a good movie ", infinitive: "to watch", after: ".",
            ja: "私は見るためのいい映画を探しています。", explanation: "a good movie を説明しています。"},
        {usage: "adverb", before: "She went to the library ", infinitive: "to borrow some books", after: ".",
            ja: "彼女は本を何冊か借りるために図書館に行きました。", explanation: "目的（何のために行ったか）を表しています。"},
        {usage: "adverb", before: "He studied hard ", infinitive: "to become a doctor", after: ".",
            ja: "彼は医者になるために一生懸命勉強しました。", explanation: "目的（何のために勉強したか）を表しています。"},
        {usage: "adverb", before: "She was excited ", infinitive: "to hear the news", after: ".",
            ja: "彼女はその知らせを聞いてわくわくしました。", explanation: "感情の原因（なぜわくわくしたか）を表しています。"},
        {usage: "adverb", before: "I was surprised ", infinitive: "to see him", after: ".",
            ja: "私は彼を見てびっくりしました。", explanation: "感情の原因（なぜびっくりしたか）を表しています。"},
        {usage: "adverb", before: "I woke up ", infinitive: "to find no one at home", after: ".",
            ja: "私は目を覚ますと、家に誰もいないことに気づきました。", explanation: "結果（目を覚ましたあとに分かったこと）を表しています。"},
        {usage: "adverb", before: "She grew up ", infinitive: "to become a famous singer", after: ".",
            ja: "彼女は成長して有名な歌手になりました。", explanation: "結果（成長してどうなったか）を表しています。"},
        {usage: "noun", before: "I like ", infinitive: "to read books", after: ".",
            ja: "私は本を読むことが好きです。", explanation: "好きなことを表しています。"},
        {usage: "adjective", before: "I want something ", infinitive: "to drink", after: ".",
            ja: "私は何か飲むものがほしいです。", explanation: "something を説明しています。"},
        {usage: "adverb", before: "I went to the park ", infinitive: "to play soccer", after: ".",
            ja: "私はサッカーをするために公園へ行きました。", explanation: "目的（何のために行ったか）を表しています。"},
    ];
    const sentence = q => q.before + q.infinitive + q.after;
    const questionsFor = course => course === 'all' ? questions : questions.filter(q => q.usage === course);
    const questionHp = q => sentence(q).replace(/[^a-z]/gi, '').length * hitDamage + finishBonus;
    const esc = value => String(value).replace(/[&<>"']/g, ch =>
        ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[ch]);

    function shuffle(items, random) {
        const shuffled = [...items];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function makeDeck(random, course) {
        if (course !== 'all') return shuffle(questionsFor(course), random);
        // Rotate through the three usages while all three still have questions.
        const groups = shuffle(Object.keys(usages), random).map(usage =>
            shuffle(questionsFor(usage), random));
        return Array.from({length: Math.max(...groups.map(group => group.length))}, (_, i) =>
            groups.flatMap(group => group[i] ? [group[i]] : [])).flat();
    }

    function createRun(random = Math.random, speed = 'normal', mode = 'normal', course = 'all') {
        const deck = makeDeck(random, course);
        const enemyMaxHp = deck.reduce((hp, question) => hp + questionHp(question), 0);
        return {
            deck, index: 0, typed: '', mode, course, interval: speeds[speed], charge: 0,
            hp: playerMaxHp, enemyHp: enemyMaxHp, enemyMaxHp, finishBonusLeft: finishBonus, finished: false, won: false,
            combo: 0, bestCombo: 0, correctKeys: 0, mistakes: 0, score: 0, completed: []
        };
    }

    function advance(run, elapsed) {
        if (!run || run.finished || !Number.isFinite(elapsed) || elapsed <= 0) return false;
        run.charge += elapsed;
        if (run.charge < run.interval) return false;
        const hits = Math.min(run.hp, Math.floor(run.charge / run.interval));
        run.charge %= run.interval;
        run.hp -= hits;
        run.combo = 0;
        run.finished = run.hp === 0;
        return true;
    }

    function typeCharacter(run, char) {
        if (!run || run.finished || typeof char !== 'string' || char.length !== 1 || !/^[a-z]$/i.test(char)) return null;
        const q = run.deck[run.index];
        const target = sentence(q);
        if (char.toLowerCase() !== target[run.typed.length].toLowerCase()) {
            run.combo = 0;
            run.mistakes++;
            return {kind: 'miss'};
        }
        run.typed += char;
        while (run.typed.length < target.length && /[ .]/.test(target[run.typed.length])) {
            run.typed += target[run.typed.length];
        }
        run.combo++;
        run.correctKeys++;
        run.bestCombo = Math.max(run.bestCombo, run.combo);
        const completed = run.typed.length === target.length;
        const special = run.combo % specialInterval === 0;
        run.score += points.letter + (completed ? points.sentence : 0) + (special ? points.special : 0);
        // Specials use some of this sentence's damage early. Every sentence still
        // has the same total damage and retains a strong final hit.
        const earlyBonus = special ? Math.min(45, run.finishBonusLeft - minimumFinishBonus) : 0;
        const damage = hitDamage + (completed ? run.finishBonusLeft : earlyBonus);
        run.enemyHp -= damage;
        if (completed) {
            run.completed.push(q);
            run.charge = 0;
            run.won = run.finished = run.completed.length === run.deck.length;
            if (!run.finished) {
                run.index++;
                run.typed = '';
                run.finishBonusLeft = finishBonus;
            }
        } else {
            run.finishBonusLeft -= earlyBonus;
        }
        return {kind: special ? 'special' : completed ? 'finish' : 'hit', damage, completed};
    }

    function answerHTML(q) {
        return esc(q.before) + '<mark>' + esc(q.infinitive) + '</mark>' + esc(q.after);
    }

    function hintHTML(q, mode) {
        if (mode === 'practice') return answerHTML(q);
        if (mode === 'hard') return '';
        return esc(q.before) + '<span class="ib-blank" aria-label="不定詞の空欄">' +
            q.infinitive.split(' ').map(word => '_'.repeat(word.length)).join(' ') + '</span>' + esc(q.after);
    }

    // Main typing area of a Japanese JIS keyboard. Widths are in quarter-key units.
    const keyboardRows = [
        [['半/全','Backquote',4], ...'1234567890'.split(''), '-','^','¥', ['BS','Backspace',4]],
        [['Tab','Tab',6], ...'QWERTYUIOP'.split(''), '@','[', ['Enter','Enter',6]],
        [['英数','CapsLock',7], ...'ASDFGHJKL'.split(''), ';',':',']', ['',null,5]],
        [['Shift','Shift',9], ...'ZXCVBNM'.split(''), ',','.','/', ['ろ','IntlRo',4], ['Shift','Shift',7]],
        [['Ctrl','Control',6], ['Win','Meta',5], ['Alt','Alt',5], ['無変換','NonConvert',6],
            ['Space',' ',15], ['変換','Convert',6], ['かな','KanaMode',6], ['Alt','Alt',5], ['Ctrl','Control',6]]
    ];

    function keyboardHTML() {
        return keyboardRows.map((row, index) => '<div class="ib-key-row" data-row="' + index + '">' + row.map(item => {
            const [label, key, units] = Array.isArray(item) ? item : [item, item, 4];
            if (!key) return '<span class="ib-key-gap" style="--units:' + units + '"></span>';
            return '<kbd class="ib-key" data-key="' + esc(key) + '" style="--units:' + units + '">' + esc(label) + '</kbd>';
        }).join('') + '</div>').join('');
    }

    // Original vector fighters. Separate limbs allow a real wind-up / strike / recoil.
    function fighterSVG(side = 'player') {
        const enemy = side === 'enemy';
        const main = enemy ? '#d54e88' : '#26d4e2';
        const light = enemy ? '#ffadcb' : '#b4ffff';
        return `<svg viewBox="0 0 240 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g stroke="#101526" stroke-width="4" stroke-linejoin="round"><ellipse cx="119" cy="284" rx="81" ry="9" fill="#030714" opacity=".5" stroke="none"/><g class="ib-fighter-body"><g class="ib-leg-back"><path d="m103 165-25 52-27 47 27 14 39-51 23-44Z" fill="#26334b"/><path d="m49 261 32 10-3 17H24q-3-13 25-27Z" fill="#141c2e"/><path d="m48 269 30 7" stroke="${main}" stroke-width="7"/></g><g class="ib-leg-front"><path d="m121 165 36 17-9 49 26 36-26 14-40-48 4-34-18-14Z" fill="#34465e"/><path d="m146 265 29-8 26 24-4 10h-52Z" fill="#172137"/><path d="m155 275 28 7" stroke="${main}" stroke-width="7"/></g><g class="ib-arm-back"><path d="m99 96-25-5-25 32-15-27-17 12 21 45 18 3 41-30Z" fill="${enemy ? '#74849b' : '#d99b77'}"/><path d="m16 107-5-22 14-13 16 11-7 24Z" fill="${main}"/><path d="m19 87 12 6" stroke="${light}"/></g><path d="m104 84-24 22 8 54 18 24 48-8 11-50-24-34Z" fill="${main}"/><path d="m107 91-4 37 24 22 20-49-16-13Z" fill="#17263d"/><path d="m92 112 10 47 39-7 13-31" fill="none" stroke="${light}" stroke-width="5"/><path d="m90 157 63-5 3 20-53 12Z" fill="#0d172a"/><path d="m112 160 19-2 2 13-19 2Z" fill="#f1d877"/><path d="m102 87 4-26 27-2 7 35-19 12Z" fill="${enemy ? '#74849b' : '#e9b08b'}"/><path d="m94 37 17-18 31 8 10 24-10 28-26 7-19-20Z" fill="${enemy ? '#8594ac' : '#efbb98'}"/><path d="m92 47-4-21 19-17 12 9 19-8 17 15-6 22-18-14-21 7-3 14Z" fill="#16243a"/><path d="m99 47 47-7 3 13-47 8Z" fill="${main}"/><path d="m117 51 18-3" stroke="${light}" stroke-width="4"/><path d="m134 58 9 6-10 3m-16 8 12-2" fill="none" stroke-width="2"/>${enemy ? '<path d="m103 60 38-4-2 21-21 8-13-10Z" fill="#25304a"/><path d="m117 68 15-3" stroke="#ffadc8"/>' : `<path class="ib-scarf" d="m100 48-35-3-26 12 32 2 27 3-27 9-28-4 21 18 38-19Z" fill="${main}"/>`}<g class="ib-arm-front"><path d="m146 99 21 14-9 28 27-11 10 20-39 24-21-11-6-33Z" fill="${enemy ? '#8594ac' : '#efbb98'}"/><path d="m143 99 20 8-6 23-24-8Z" fill="${main}"/><path d="m180 130 15-12 20 7 4 20-22 14-13-9Z" fill="${main}"/><path d="m197 125 6 23m-15-10 25-5" stroke="${light}" stroke-width="3"/></g><path d="m95 111 2 17m48 46-14 41" stroke="#fff" opacity=".25" fill="none"/></g></g></svg>`;
    }
    const style = `
        #view-infinitive {max-width: 760px; margin: auto; color: #26344b}
        #view-infinitive button:focus-visible {outline: 3px solid #d78618; outline-offset: 3px}
        #view-infinitive mark {background: #ffe19c; color: #30200b; border-radius: 4px}
        .ib-menu, .ib-result {background: #f6f7ff; border: 1px solid #dfe5f4; border-radius: 18px; padding: clamp(14px, 4vw, 28px)}
        .ib-title {font-size: clamp(20px, 4vw, 28px); font-weight: 900; margin-bottom: 6px}
        .ib-menu p, .ib-result p {font-size: 14px; line-height: 1.7}
        .ib-options {margin-top: 16px; border: 0; padding: 0; min-width: 0}
        .ib-options legend {font-size: 13px; font-weight: 800; margin-bottom: 6px}
        .ib-choices {display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px}
        .ib-options[data-group="course"] .ib-choices {grid-template-columns: repeat(4, minmax(0, 1fr))}
        .ib-option, .ib-primary {border-radius: 10px; padding: 10px 6px; font-weight: 800; cursor: pointer}
        .ib-option {min-width: 0; background: #fff; border: 1px solid #b9c6df; font-size: 14px}
        .ib-option small {display: block; margin-top: 4px; font-size: 10px; font-weight: 500; line-height: 1.4}
        .ib-option[aria-pressed="true"], .ib-primary {background: #5146bd; border-color: #5146bd; color: #fff}
        .ib-primary {display: block; width: 100%; margin-top: 18px}
        .ib-shell {background: #101a2e; border: 1px solid #405474; border-radius: 15px; overflow: hidden; color: #edf4ff}
        .ib-fight-hud {display: grid; grid-template-columns: 1fr auto 1fr; gap: 12px; padding: 10px 14px; align-items: center; background: #192740; font-size: 12px}
        .ib-fight-hud b, .ib-hp {display: block}
        .ib-foe {text-align: right}
        .ib-hp {color: #d9e4f5; margin: 3px 0 6px; font-size: 11px}
        .ib-meter, .ib-enemy-track {height: 7px; overflow: hidden; border-radius: 7px; background: #303c55}
        .ib-meter i, .ib-enemy-track i {display: block; height: 100%; transform-origin: left; background: #61e2d7}
        .ib-foe .ib-meter i {background: #f48197; transform-origin: right}
        .ib-round {color: #ffe4a2; font-weight: 900; white-space: nowrap}
        .ib-fight-stage {--stage-height: clamp(112px, 25vw, 190px); position: relative; isolation: isolate; height: var(--stage-height); overflow: hidden; background: radial-gradient(ellipse at 48% 15%, #333d72, #100f24 80%)}
        .ib-moon {position: absolute; inset: 12% auto auto 21%; height: 34px; aspect-ratio: 1; border-radius: 50%; background: #b3c9ec; box-shadow: 0 0 26px #648dd0}
        .ib-city {position: absolute; inset: 20% 0 18%; display: flex; align-items: end; gap: 7px}
        .ib-city i {flex: 1; height: 76%; background: repeating-linear-gradient(0deg, transparent 0 12px, #80bce229 12px 15px), repeating-linear-gradient(90deg, #111b32 0 13px, #27476c 13px 16px); border-top: 2px solid #53739c}
        .ib-city i:nth-child(2n) {height: 100%}
        .ib-city i:nth-child(3n) {height: 48%}
        .ib-floor {position: absolute; inset: 78% 0 0; border-top: 2px solid #847dc6; background: repeating-linear-gradient(104deg, #21213d 0 51px, #4a456c 52px 54px); box-shadow: 0 -4px 28px #8775eb60}
        .ib-combatant {position: absolute; bottom: 1%; width: min(43%, calc(var(--stage-height) * 1.22)); aspect-ratio: 5 / 4; z-index: 1; transform-origin: center 86%}
        .ib-combatant svg, .ib-sprite {width: 100%; height: 100%}
        .ib-sprite {background-image: var(--ib-fighter-art); background-repeat: no-repeat; background-size: 300% 200%; background-position: 0% 0%; filter: drop-shadow(0 3px 3px #080a18a0); animation: ib-stance 1.6s ease-in-out infinite}
        .ib-rival .ib-sprite {background-position-y: 100%; transform: scaleX(-1)}
        .ib-fight[data-outcome] .ib-sprite {animation: none}
        @keyframes ib-stance {50% {translate: 0 2%; scale: 1 .98}}
        @media (prefers-reduced-motion: reduce) {.ib-sprite {animation: none}}
        .ib-player {left: 11%}
        .ib-rival {right: 11%}
        .ib-rival svg {transform: scaleX(-1)}
        .ib-spark {position: absolute; left: 68%; top: 46%; z-index: 2; width: 34px; aspect-ratio: 1; opacity: 0; pointer-events: none; background: #a5fff5; clip-path: polygon(50% 0, 61% 36%, 100% 12%, 76% 53%, 100% 79%, 63% 71%, 49% 100%, 39% 67%, 0 86%, 23% 49%, 0 27%, 38% 36%)}
        .ib-spark[data-effect="enemy"] {left: 25%; background: #ff9ba3}
        .ib-spark[data-effect="miss"] {background: #cedaef}
        .ib-spark[data-effect="special"], .ib-spark[data-effect="finish"] {background: #ffe478}
        .ib-callout {position: absolute; inset: 10% auto auto 8px; z-index: 3; color: #fff3bf; font-size: clamp(15px, 4vw, 30px); font-weight: 900; font-style: italic; text-shadow: 2px 3px #13162f; pointer-events: none}
        .ib-callout[data-effect="enemy"] {color: #ffb1bc}
        .ib-strike-trail {position: absolute; left: 36%; top: 29%; width: 31%; height: 44%; border: 4px solid #ffe47e; border-left-color: transparent; border-bottom-color: transparent; border-radius: 50%; box-shadow: 0 -5px 20px -9px #ffe47e; z-index: 2; pointer-events: none; opacity: 0}
        .ib-technique {position: absolute; right: 2%; bottom: 9%; z-index: 4; color: #090e1b; background: #ffe589; padding: 4px 11px; border-radius: 2px; font-size: clamp(11px, 2.8vw, 20px); font-weight: 900; opacity: 0; pointer-events: none}
        .ib-special-scene {position: absolute; inset: 0; z-index: 5; pointer-events: none}
        .ib-special-shade {position: absolute; inset: 0; background: linear-gradient(115deg, #120a38cf, #17225c45 70%, #24256a9c); animation: ib-special-shade 820ms both}
        .ib-special-cut {
            position: absolute; inset: 8% 0 auto; height: 55%; overflow: hidden;
            border-block: 2px solid #99f3ff;
            background: repeating-linear-gradient(167deg, transparent 0 15px, #abacff20 16px 18px),
                linear-gradient(100deg, #25246d 12%, #18285c 44%, #125177 84%, #1a3264);
            box-shadow: 0 0 24px #70dbef95; animation: ib-special-cutin 720ms cubic-bezier(.2,.7,.2,1) both;
        }
        .ib-special-art {position: absolute; width: min(49%, 295px); aspect-ratio: 5 / 4; left: 0; top: -7%; transform: scale(1.75); transform-origin: 42% 5%}
        .ib-special-art .ib-sprite {animation: none; filter: drop-shadow(0 2px 9px #75f5ff8f)}
        .ib-special-art svg {width: 100%; height: 100%}
        .ib-special-name {position: absolute; display: flex; flex-direction: column; justify-content: center; inset: 0 3% 0 36%; color: #fff; font-weight: 950; line-height: 1.05; text-shadow: 2px 2px 0 #171846, 0 0 14px #6af0ff}
        .ib-special-name small {color: #fff19d; font: 900 clamp(8px, 2vw, 12px)/1.1 ui-monospace, monospace; letter-spacing: .17em; margin-bottom: 4px}
        .ib-special-name strong {font-size: clamp(22px, 5.7vw, 50px); white-space: nowrap; font-style: italic}
        .ib-special-bolt {
            position: absolute; left: 19%; top: 48%; width: 66%; height: 35%; z-index: 1;
            background: linear-gradient(90deg, #848cff08, #a0f7ff 66%, #fff0a0);
            clip-path: polygon(0 60%, 48% 38%, 43% 16%, 80% 31%, 100% 0, 68% 64%, 52% 58%, 53% 82%, 18% 74%);
            animation: ib-special-bolt 360ms 130ms ease-out both;
        }
        .ib-special-bolt.ib-special-echo {top: 41%; height: 49%; background: linear-gradient(90deg,#662ae000,#ac80ff,#ecffff); animation-delay: 276ms}
        .ib-special-impact {position: absolute; left: 72%; top: 50%; width: clamp(36px, 12vw, 85px); aspect-ratio: 1; border-radius: 50%; border: 3px solid #d0faff; box-shadow: 0 0 14px #89dcfb, inset 0 0 12px #ffdd92; animation: ib-special-impact 320ms 220ms ease-out both}
        .ib-special-impact.ib-special-echo {border-color: #fff1a3; animation-delay: 400ms}
        .ib-special-damage {position: absolute; z-index: 2; right: 9%; bottom: 6%; color: #fff2a7; font: 950 clamp(18px, 5vw, 38px)/1 ui-monospace, monospace; text-shadow: 2px 2px 0 #171333, 0 0 12px #fbb437; animation: ib-special-damage 380ms 350ms ease-out both}
        @keyframes ib-special-shade {0%, 100% {opacity: 0} 20%, 60% {opacity: 1}}
        @keyframes ib-special-cutin {
            0% {opacity: 0; transform: translateX(-75%) skewX(-12deg)}
            17%, 67% {opacity: 1; transform: translateX(0) skewX(-7deg)}
            100% {opacity: 0; transform: translateX(24%) skewX(-7deg)}
        }
        @keyframes ib-special-bolt {
            from {opacity: 0; transform: translateX(-32%) scaleX(.42)}
            30% {opacity: .95; transform: translateX(7%) scaleX(1)}
            to {opacity: 0; transform: translateX(42%) scaleX(1.18)}
        }
        @keyframes ib-special-impact {from {opacity: .85; transform: translate(-50%, -50%) scale(.28)} to {opacity: 0; transform: translate(-50%, -50%) scale(1.85)}}
        @keyframes ib-special-damage {from {opacity: 0; transform: translateY(6px)} 32%, 62% {opacity: 1} to {opacity: 0; transform: translateY(-8px)}}
        @keyframes ib-special-quiet {0%, 100% {opacity: 0} 12%, 82% {opacity: 1}}
        @media (prefers-reduced-motion: reduce) {
            .ib-special-shade, .ib-special-bolt, .ib-special-impact, .ib-special-damage {display: none}
            .ib-special-cut {animation: ib-special-quiet 800ms linear both}
        }
        .ib-fight.ib-threat .ib-rival {filter: drop-shadow(0 0 9px #ff5279)}
        .ib-fight[data-outcome="won"] .ib-rival {transform: translate(35%, 23%) rotate(72deg)}
        .ib-fight[data-outcome="lost"] .ib-player {transform: translate(-35%, 23%) rotate(-72deg)}
        .ib-danger {padding: 6px 14px 8px; font-size: 11px; color: #ffd2db; background: #1c2540}
        .ib-enemy-track {margin-top: 4px; height: 5px}
        .ib-enemy-track i {background: #fb7391; transform: scaleX(0)}
        .ib-console {padding: 12px; background: linear-gradient(150deg, #192842, #111a2e)}
        .ib-console-top {display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; color: #ffdfa4}
        .ib-link {border-radius: 8px; background: #2d3e5d; color: #e6f1ff; font-weight: 700; padding: 6px 10px; cursor: pointer; font-size: 12px}
        .ib-usage {display: inline-block; font-size: 11px; font-weight: 800; color: #b4e9f0; margin-top: 8px}
        .ib-prompt {font-size: clamp(14px, 3.5vw, 18px); font-weight: 750; line-height: 1.5; margin: 4px 0 8px}
        .ib-sentence {padding: 8px 10px; background: #0e192e; border: 1px solid #526482; border-radius: 8px; font-size: clamp(14px, 3.1vw, 20px); line-height: 1.6; overflow-wrap: anywhere}
        .ib-sentence[hidden], .ib-review-line[hidden], .ib-menu-link[hidden] {display: none}
        .ib-blank {color: #fce098; overflow-wrap: anywhere}
        .ib-typing-label {display: block; color: #c5d7ed; font-size: 12px; margin: 8px 0 4px}
        .ib-typing {width: 100%; background: #0a1325; color: #b2fff3; border: 1px solid #7393b8; border-radius: 8px; padding: 8px 10px; font: 600 17px/1.5 ui-monospace, monospace}
        .ib-typing:focus {outline: 2px solid #8beadd; outline-offset: 1px}
        .ib-typing[aria-invalid="true"] {border-color: #ff979f}
        .ib-controls {display: flex; gap: 4px; flex-wrap: wrap; justify-content: flex-end}
        .ib-sound[aria-pressed="false"] {color: #b8c4d8; background: #212d42}
        .ib-keyboard {margin: 8px 0 6px; padding: 6px; border: 1px solid #425575; border-radius: 9px; background: #0b1527}
        .ib-key-label {display: flex; align-items: center; justify-content: space-between; min-height: 24px; margin-bottom: 4px; font-size: 11px; color: #c8daee}
        .ib-key-last {padding: 1px 7px; border-radius: 4px; background: #253851; color: #e4f1ff; font: 800 13px/1.4 ui-monospace, monospace}
        .ib-key-row {position: relative; display: flex; gap: clamp(1px, .45vw, 4px); margin-bottom: 3px; height: clamp(20px, 4.6vw, 33px)}
        .ib-key-row:last-child {margin-bottom: 0}
        .ib-key, .ib-key-gap {display: grid; min-width: 0; flex: var(--units) 1 0; place-items: center}
        .ib-key {background: #233650; border: 1px solid #415676; border-bottom: 2px solid #0c1628; border-radius: 4px; color: #dcecff; font: 700 clamp(7px, 2.5vw, 13px)/1 ui-monospace, monospace; white-space: nowrap; overflow: hidden}
        .ib-key[data-key="Enter"] {height: calc(200% + 3px); z-index: 1; clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%, 15% 50%, 0 50%)}
        .ib-key[data-state="tap"], .ib-key-last[data-state="tap"] {background: #c5dbff; color: #132643}
        .ib-key[data-state="hit"], .ib-key-last[data-state="hit"] {background: #affff0; color: #082f30; border-color: #ecfffd}
        .ib-key[data-state="miss"], .ib-key-last[data-state="miss"] {background: #ff9fae; color: #4f101f; border-color: #ffd8e0}
        .ib-feedback {color: #ffd0d8; font-size: 12px; min-height: 1.5em; margin-top: 4px}
        .ib-review-line {border-top: 1px solid #3c516f; padding-top: 6px; font-size: 13px; overflow-wrap: anywhere}
        .ib-review-line small, .ib-review small {display: block; font-size: 11px; margin-top: 3px}
        .ib-result {margin-top: 10px}
        .ib-result-metrics {display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 12px 0}
        .ib-result-metrics > div {padding: 10px 12px; background: #fff; border: 1px solid #dce3f3; border-radius: 10px}
        .ib-result-metrics dt {font-size: 12px; font-weight: 800; color: #435679}
        .ib-result-metrics dd {margin: 2px 0 0; color: #332e8f; font-size: clamp(20px, 5vw, 32px); font-weight: 900; font-variant-numeric: tabular-nums}
        .ib-review {list-style: none; margin: 10px 0 0; padding: 0}
        .ib-review li {border-top: 1px solid #d7e0f0; padding: 8px 0; line-height: 1.5; font-size: 14px}
        @media (max-width: 450px) {
            .ib-fight-hud {padding: 6px 8px; gap: 6px}
            .ib-console {padding: 8px}
            .ib-option {font-size: 12px}
            .ib-options[data-group="course"] .ib-choices {grid-template-columns: repeat(2, minmax(0, 1fr))}
        }
    `;


    const root = () => document.getElementById('view-infinitive');
    let run = null;
    let mode = 'normal';
    let speed = 'normal';
    let course = 'all';
    let active = false;
    let paused = false;
    let frame = null;
    let lastTime = 0;
    let ui;
    let animations = [];
    let techniqueAnimations = [];
    let soundEnabled = true;
    let audioContext;
    let soundOutput;
    let impactNoise;

    function syncSoundOutput() {
        if (soundOutput) soundOutput.gain.value = soundEnabled && active && !paused && !document.hidden ? 1 : 0;
    }

    function unlockSound() {
        const Audio = globalThis.AudioContext || globalThis.webkitAudioContext;
        if (!soundEnabled || !Audio) return;
        try {
            if (!audioContext) {
                audioContext = new Audio();
                soundOutput = audioContext.createGain();
                soundOutput.connect(audioContext.destination);
                impactNoise = audioContext.createBuffer(1, Math.ceil(audioContext.sampleRate * .18), audioContext.sampleRate);
                const samples = impactNoise.getChannelData(0);
                for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
            }
            syncSoundOutput();
            if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
        } catch {
            audioContext = null;
        }
    }

    const sounds = {
        hit: {pitch: 170, low: 64, filter: 1050, duration: .075, level: .16},
        finish: {pitch: 120, low: 47, filter: 720, duration: .15, level: .25},
        enemy: {pitch: 105, low: 43, filter: 570, duration: .14, level: .19},
        miss: {pitch: 210, low: 120, filter: 450, duration: .04, level: .075}
    };

    const specialSound = [
        {delay: 0, pitch: 185, low: 780, filter: 1950, duration: .22, level: .17},
        {delay: .09, pitch: 355, low: 1040, filter: 2900, duration: .14, level: .09},
        {delay: .23, pitch: 178, low: 54, filter: 1460, duration: .15, level: .27},
        {delay: .40, pitch: 106, low: 41, filter: 820, duration: .24, level: .31}
    ];

    function playSound(kind) {
        if (!soundEnabled || audioContext?.state !== 'running') return;
        const start = audioContext.currentTime;
        if (kind === 'special') {
            for (const part of specialSound) playImpact(part, start + part.delay);
        } else {
            playImpact(sounds[kind], start);
        }
    }

    function playImpact({pitch, low, filter, duration, level}, start) {
        const end = start + duration;
        const tone = audioContext.createOscillator();
        const grit = audioContext.createBufferSource();
        const noiseFilter = audioContext.createBiquadFilter();
        const envelope = audioContext.createGain();
        tone.type = 'triangle';
        tone.frequency.setValueAtTime(pitch, start);
        tone.frequency.exponentialRampToValueAtTime(low, end);
        grit.buffer = impactNoise;
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = filter;
        envelope.gain.setValueAtTime(level, start);
        envelope.gain.exponentialRampToValueAtTime(.001, end);
        tone.connect(envelope);
        grit.connect(noiseFilter).connect(envelope);
        envelope.connect(soundOutput);
        tone.start(start);
        grit.start(start);
        tone.stop(end);
        grit.stop(end);
        tone.onended = () => {
            tone.disconnect();
            grit.disconnect();
            noiseFilter.disconnect();
            envelope.disconnect();
        };
    }

    function soundLabel() {
        return soundEnabled ? '音 ON' : '音 OFF';
    }

    function sprite(side) {
        if (!fighterArt) return fighterSVG(side);
        return '<div class="ib-sprite"></div>';
    }

    function paintKey(key, state) {
        for (const el of ui.litKeys) el.removeAttribute('data-state');
        const normalized = key.length === 1 ? key.toUpperCase() : key;
        ui.litKeys = ui.keys.get(normalized) || [];
        for (const el of ui.litKeys) el.dataset.state = state;
        ui.lastKey.textContent = ui.litKeys[0]?.textContent || normalized;
        ui.lastKey.dataset.state = state;
    }

    function handleKeyDown(event) {
        if (event.target !== ui?.input || !canPlay() || event.isComposing ||
            event.ctrlKey || event.metaKey || event.altKey) return;
        const specialKeys = {IntlYen: '¥', IntlRo: 'IntlRo', Backquote: 'Backquote'};
        const key = specialKeys[event.code] || event.key;
        if (!key) return;
        const normal = key.length === 1 ? key.toUpperCase() : key;
        // Letters get their final color from the input event that scores them.
        if (!/^[a-z]$/i.test(key) && ui.keys.has(normal)) paintKey(key, 'tap');
    }

    function choices(label, group, options, selected) {
        return `<fieldset class="ib-options" data-group="${group}"><legend>${label}</legend><div class="ib-choices">
            ${options.map(([key, name, detail]) => `<button type="button" class="ib-option" data-action="${group}"
                data-value="${key}" aria-pressed="${key === selected}">${name}${detail ? `<small>${detail}</small>` : ''}</button>`).join('')}
            </div></fieldset>`;
    }

    function renderMenu() {
        ui = null;
        root().innerHTML = `<div class="ib-menu">
            <h2 class="ib-title">不定詞バトル</h2>
            <p>日本語を手がかりに英文を打とう。正しい１文字ごとに攻撃！</p>
            <p>最後の英字で旋風キック。20文字連続正解で雷光ラッシュ。</p>
            <p>選んだ用法の問題を１回ずつ打ち切れば勝利！</p>
            ${choices('出題する用法', 'course', Object.entries(courses).map(([key, label]) => [key, label, questionsFor(key).length + '問']), course)}
            ${choices('ゲームモード', 'mode', Object.entries(modes).map(([key, m]) => [key, m.label, m.detail]), mode)}
            ${choices('相手の攻撃速度', 'speed', [['slow', 'ゆっくり'], ['normal', 'ふつう'], ['fast', '速い']], speed)}
            <button type="button" class="ib-primary" data-action="start">バトル開始</button>
            <button type="button" class="ib-link ib-sound" style="margin-top:8px" data-action="sound" aria-pressed="${soundEnabled}">${soundLabel()}</button>
            </div>`;
    }

    function renderBattle() {
        const arenaArt = fighterArt ? `style="--ib-fighter-art:url(${fighterArt})"` : '';
        root().innerHTML = `<div class="ib-shell">
            <div class="ib-fight" aria-label="対戦ステージ" ${arenaArt}>
                <div class="ib-fight-hud">
                    <div><b>AOI / 自分</b><span class="ib-hp" data-part="playerHp"></span>
                        <div class="ib-meter" aria-hidden="true"><i data-part="playerBar"></i></div></div>
                    <span class="ib-round" data-part="round"></span>
                    <div class="ib-foe"><b>GOU / 相手</b><span class="ib-hp" data-part="enemyHp"></span>
                        <div class="ib-meter" aria-hidden="true"><i data-part="enemyBar"></i></div></div>
                </div>
                <div class="ib-fight-stage" aria-hidden="true">
                    <div class="ib-moon"></div><div class="ib-city"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
                    <div class="ib-floor"></div>
                    <div class="ib-combatant ib-player" data-part="player">${sprite('player')}</div>
                    <div class="ib-combatant ib-rival" data-part="rival">${sprite('enemy')}</div>
                    <i class="ib-strike-trail" data-part="trail"></i><span class="ib-technique" data-part="technique"></span>
                    <i class="ib-spark" data-part="spark"></i><span class="ib-callout" data-part="callout"></span>
                    <div data-part="specialFx"></div>
                </div>
                <div class="ib-danger" data-part="danger">相手の攻撃まで
                    <div class="ib-enemy-track" aria-hidden="true"><i data-part="charge"></i></div>
                </div>
            </div>
            <div class="ib-console" data-part="console">
                <div class="ib-console-top"><span>${courses[run.course]}・${modes[run.mode].label} ／ <span data-part="combo"></span></span>
                    <div class="ib-controls"><button type="button" class="ib-link ib-sound" data-action="sound" aria-pressed="${soundEnabled}">${soundLabel()}</button>
                        <button type="button" class="ib-link ib-menu-link" data-action="menu" hidden>メニュー</button>
                        <button type="button" class="ib-link" data-action="pause">一時停止</button></div></div>
                <div class="ib-usage" data-part="usage"></div>
                <p class="ib-prompt" data-part="prompt"></p>
                <div class="ib-sentence" lang="en" data-part="hint"></div>
                <label class="ib-typing-label" for="ib-typing">英字を入力（スペースとピリオドは自動）</label>
                <input id="ib-typing" class="ib-typing" data-part="input" type="text" inputmode="text" lang="en"
                    autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false"
                    aria-describedby="ib-feedback">
                <p id="ib-feedback" class="ib-feedback" data-part="feedback" role="status"></p>
                <div class="ib-keyboard" aria-hidden="true">
                    <div class="ib-key-label"><span>JIS キーボード</span><span>押したキー <kbd class="ib-key-last" data-part="lastKey">…</kbd></span></div>
                    ${keyboardHTML()}
                </div>
                <div class="ib-review-line" data-part="review" hidden></div>
            </div>
        </div><div class="ib-result" data-part="result" hidden></div>`;
        ui = Object.fromEntries([...root().querySelectorAll('[data-part]')].map(node => [node.dataset.part, node]));
        ui.arena = root().querySelector('.ib-fight');
        ui.pause = root().querySelector('[data-action="pause"]');
        ui.menu = root().querySelector('.ib-menu-link');
        ui.keys = new Map();
        ui.litKeys = [];
        for (const key of root().querySelectorAll('[data-key]')) {
            const label = key.dataset.key;
            if (!ui.keys.has(label)) ui.keys.set(label, []);
            ui.keys.get(label).push(key);
        }
        ui.playerSprite = ui.player.querySelector('.ib-sprite');
        ui.rivalSprite = ui.rival.querySelector('.ib-sprite');
        paintStatus();
        if (run.finished) showResult();
        else {
            paintQuestion();
            paintPause();
        }
    }

    function paintQuestion() {
        const q = run.deck[run.index];
        ui.usage.textContent = usages[q.usage];
        ui.prompt.textContent = q.ja;
        ui.hint.hidden = run.mode === 'hard';
        ui.hint.innerHTML = hintHTML(q, run.mode);
        ui.input.value = run.typed;
        const previous = run.completed.at(-1);
        ui.review.hidden = !previous;
        if (previous) {
            ui.review.innerHTML = `<span lang="en">${answerHTML(previous)}</span>
                <small>${usages[previous.usage]}　${esc(previous.explanation)}</small>`;
        }
    }

    function paintStatus() {
        ui.round.textContent = `第${run.index + 1}問 / ${run.deck.length}`;
        ui.playerHp.textContent = `HP ${run.hp} / ${playerMaxHp}`;
        ui.enemyHp.textContent = `HP ${run.enemyHp} / ${run.enemyMaxHp}`;
        ui.playerBar.style.transform = `scaleX(${run.hp / playerMaxHp})`;
        ui.enemyBar.style.transform = `scaleX(${run.enemyHp / run.enemyMaxHp})`;
        ui.combo.textContent = `${run.combo} COMBO`;
    }

    function paintPause() {
        ui.pause.textContent = paused ? '再開' : '一時停止';
        ui.menu.hidden = !paused;
        ui.input.readOnly = paused;
        ui.input.value = run.typed;
        ui.feedback.textContent = paused ? '一時停止中' : '';
    }

    function showResult() {
        stopClock();
        ui.console.hidden = true;
        ui.danger.hidden = true;
        ui.arena.classList.remove('ib-threat');
        ui.arena.dataset.outcome = run.won ? 'won' : 'lost';
        ui.callout.textContent = 'K.O.';
        ui.result.hidden = false;
        const attempted = run.deck.slice(0, run.index + 1);
        const keyAttempts = run.correctKeys + run.mistakes;
        const accuracy = keyAttempts ? (100 * run.correctKeys / keyAttempts).toFixed(1) + '%' : '—';
        const victoryTitle = run.course === 'all' ? 'バトル勝利！' : '１周クリア！';
        ui.result.innerHTML = `<h2 class="ib-title" tabindex="-1">${run.won ? victoryTitle : '自分のHPが０になりました'}</h2>
            <dl class="ib-result-metrics">
                <div><dt>正解率</dt><dd>${accuracy}</dd></div>
                <div><dt>スコア</dt><dd>${run.score.toLocaleString('ja-JP')}</dd></div>
            </dl>
            <p>${courses[run.course]} ／ ${run.completed.length} / ${run.deck.length} 文完成</p>
            <p>最大 ${run.bestCombo} COMBO ／ ミス ${run.mistakes}回</p>
            <button type="button" class="ib-primary" data-action="start">もう一度挑戦</button>
            <button type="button" class="ib-link" data-action="menu" style="margin-top:8px">モード選択に戻る</button>
            <ol class="ib-review">${attempted.map(q => `<li><span lang="en">${answerHTML(q)}</span>
                <small>${esc(q.ja)}<br>${usages[q.usage]}　${esc(q.explanation)}</small></li>`).join('')}</ol>`;
        ui.result.querySelector('h2')?.focus();
    }

    function clearAnimations() {
        for (const animation of [...animations, ...techniqueAnimations]) animation.cancel();
        animations = [];
        techniqueAnimations = [];
        if (ui?.specialFx) ui.specialFx.innerHTML = '';
    }

    function showSpecial(damage) {
        // Separate from the per-key attack animation so later input cannot cut it short.
        ui.specialFx.innerHTML = `<div class="ib-special-scene">
            <i class="ib-special-shade"></i>
            <div class="ib-special-cut">
                <div class="ib-special-art">${sprite('player')}</div>
                <div class="ib-special-name"><small>SUPER COMBO</small><strong>雷光ラッシュ</strong></div>
            </div>
            <i class="ib-special-bolt"></i><i class="ib-special-bolt ib-special-echo"></i>
            <i class="ib-special-impact"></i><i class="ib-special-impact ib-special-echo"></i>
            <span class="ib-special-damage">−${damage}</span>
        </div>`;
    }

    function playAttack(kind, damage = 0) {
        playSound(kind);
        for (const animation of animations) animation.cancel();
        animations = [];
        const labels = {hit: 'HIT', finish: '旋風キック', special: '雷光ラッシュ', enemy: '被弾', miss: 'ミス'};
        ui.callout.textContent = damage ? `${labels[kind]}  −${damage}` : labels[kind];
        ui.callout.dataset.effect = ui.spark.dataset.effect = kind;
        if (kind === 'special') showSpecial(damage);
        if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const animate = (node, frames, duration, effects = animations) => {
            if (typeof node?.animate === 'function') {
                effects.push(node.animate(frames, {duration, easing: 'ease-out'}));
            }
        };
        const heavy = kind === 'special' || kind === 'finish';
        const enemyAttack = kind === 'enemy';
        const direction = enemyAttack ? -1 : 1;
        const attacker = enemyAttack ? ui.rival : ui.player;
        const defender = enemyAttack ? ui.player : ui.rival;
        const attackerArt = enemyAttack ? ui.rivalSprite : ui.playerSprite;
        const strike = kind === 'finish' ? '100%' : '50%';
        const fightersDistance = (ui.arena.clientWidth || 480) * (heavy ? .22 : .15);
        const travel = `${direction * fightersDistance}px`;
        const pose = (node, frame, duration) => animate(node, [
            {backgroundPositionX: frame, easing: 'steps(1,end)'},
            {backgroundPositionX: '0%'}
        ], duration);
        if (kind !== 'miss') {
            pose(attackerArt, strike, heavy ? 220 : 115);
            if (!enemyAttack) pose(ui.rivalSprite, '100%', heavy ? 240 : 115);
            const push = kind === 'finish' ? '-16px' : (run.combo % 2 ? '-3px' : '0px');
            const attackPose = `translate(${travel}, ${push})`;
            animate(attacker, [
                {transform: attackPose}, {transform: attackPose, offset: .24}, {transform: 'none'}
            ], heavy ? 250 : 145);
            animate(defender, [
                {transform: `translate(${direction * (heavy ? 34 : 13)}px, ${heavy ? -7 : 0}px) rotate(${direction * (heavy ? 13 : 4)}deg)`},
                {transform: 'none'}
            ], heavy ? 270 : 145);
        }
        if (kind === 'finish') {
            for (const animation of techniqueAnimations) animation.cancel();
            techniqueAnimations = [];
            ui.technique.textContent = labels[kind];
            const trailFrames = [
                {opacity: .9, transform: 'scale(.75) rotate(-45deg)'},
                {opacity: 0, transform: 'scale(1.45) rotate(32deg)'}
            ];
            animate(ui.trail, trailFrames, 460, techniqueAnimations);
            animate(ui.technique, [{opacity: 1}, {opacity: 1, offset: .68}, {opacity: 0}], 600, techniqueAnimations);
        }
        animate(ui.spark, [{opacity: 0.9, transform: 'scale(.65) rotate(-15deg)'},
            {opacity: 0, transform: `scale(${heavy ? 2.5 : 1.45}) rotate(30deg)`}], heavy ? 300 : 165);
    }

    function stopClock() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
    }

    function canPlay() {
        return active && !paused && run && !run.finished && !document.hidden;
    }

    function paintCharge() {
        const progress = run.charge / run.interval;
        ui.charge.style.transform = `scaleX(${progress})`;
        ui.arena.classList.toggle('ib-threat', progress > 0.75);
    }

    function tick(now) {
        frame = null;
        if (!canPlay()) return;
        const hit = advance(run, Math.max(0, now - lastTime));
        lastTime = now;
        if (hit) {
            paintStatus();
            playAttack('enemy');
            if (run.finished) {
                showResult();
                return;
            }
            ui.feedback.textContent = '相手の攻撃！ 入力したところから続けよう。';
        }
        paintCharge();
        frame = requestAnimationFrame(tick);
    }

    function syncClock() {
        if (!canPlay() || frame !== null) return;
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
    }

    function handleInput(event) {
        if (event.target !== ui?.input || event.isComposing || !canPlay()) return;
        const input = ui.input;
        const value = input.value;
        if (value === run.typed) return;
        const added = value.startsWith(run.typed) ? value.slice(run.typed.length) : '';
        const canScore = added.length === 1 && !/paste|drop|replacement/i.test(event.inputType || '');
        const result = canScore ? typeCharacter(run, added) : null;
        if (result?.completed) paintQuestion();
        if (input.value !== run.typed) input.value = run.typed;
        if (canScore && ui.keys.has(added.toUpperCase())) {
            paintKey(added, result ? (result.kind === 'miss' ? 'miss' : 'hit') : 'tap');
        }
        if (!result) return;

        const missed = result.kind === 'miss';
        input.setAttribute('aria-invalid', String(missed));
        ui.feedback.textContent = missed ? 'その文字は違います。同じ位置から続けよう。' :
            result.completed ? '英文完成！' : '';
        paintStatus();
        paintCharge();
        playAttack(result.kind, result.damage);

        if (run.finished) showResult();
    }

    function handleClick(event) {
        const button = event.target.closest('button[data-action]');
        if (!active || !button || !root().contains(button)) return;
        const {action, value} = button.dataset;
        if (action === 'sound') {
            soundEnabled = !soundEnabled;
            unlockSound();
            syncSoundOutput();
            button.textContent = soundLabel();
            button.setAttribute('aria-pressed', String(soundEnabled));
            if (canPlay()) ui.input.focus({preventScroll: true});
        } else if (action === 'course' || action === 'mode' || action === 'speed') {
            if (action === 'course') course = value;
            else if (action === 'mode') mode = value;
            else speed = value;
            root().querySelectorAll(`[data-action="${action}"]`).forEach(option =>
                option.setAttribute('aria-pressed', String(option === button)));
        } else if (action === 'start') {
            stopClock();
            clearAnimations();
            paused = false;
            run = createRun(Math.random, speed, mode, course);
            unlockSound();
            renderBattle();
            ui.input.focus();
            syncClock();
        } else if (action === 'pause' && run && !run.finished) {
            paused = !paused;
            syncSoundOutput();
            stopClock();
            paintPause();
            if (!paused) ui.input.focus();
            syncClock();
        } else if (action === 'menu') {
            stopClock();
            clearAnimations();
            run = null;
            renderMenu();
            root().querySelector('[data-action="start"]')?.focus();
        }
    }

    if (typeof document !== 'undefined') {
        if (!document.getElementById('infinitive-battle-style')) {
            const css = document.createElement('style');
            css.id = 'infinitive-battle-style';
            css.textContent = style;
            document.head.appendChild(css);
        }
        root()?.addEventListener('click', handleClick);
        root()?.addEventListener('keydown', handleKeyDown);
        root()?.addEventListener('input', handleInput);
        root()?.addEventListener('compositionend', handleInput);
        for (const type of ['paste', 'drop']) {
            root()?.addEventListener(type, event => {
                if (event.target === ui?.input) event.preventDefault();
            });
        }
        document.addEventListener('visibilitychange', () => {
            syncSoundOutput();
            stopClock();
            syncClock();
        });
    }

    return {
        open() {
            active = true;
            syncSoundOutput();
            if (run) renderBattle();
            else renderMenu();
            syncClock();
        },
        leave() {
            active = false;
            syncSoundOutput();
            stopClock();
            clearAnimations();
        },
        exportSource: () => `const InfinitiveBattle = (${createInfinitiveBattle.toString()})(${JSON.stringify(fighterArt)});`,
        rules: {questions, createRun, advance, typeCharacter, sentence, answerHTML, hintHTML}
    };
})(typeof InfinitiveFighterArt === 'string' ? InfinitiveFighterArt : '');
if (typeof module !== 'undefined' && module.exports) module.exports = InfinitiveBattle;
