/* Self-contained, illustrated infinitive card battle. */
const InfinitiveBattle = (function createInfinitiveBattle() {
    'use strict';
    const questions = [
    {
        "id": 1,
        "usage": "名詞的用法",
        "subject": "I want to",
        "first": "first",
        "second": "a cook",
        "tail": ".",
        "ja": "私は料理人になりたいです。",
        "firstChoices": [
            "first",
            "have",
            "play"
        ],
        "choices": [
            "a teacher",
            "a cook",
            "a singer"
        ],
        "infinitive": "to first a cook",
        "explanation": "料理人になること",
        "icon": "👨‍🍳"
    },
    {
        "id": 2,
        "usage": "名詞的用法",
        "subject": "I want to",
        "first": "learn",
        "second": "English",
        "tail": ".",
        "ja": "私は英語を学びたいです。",
        "firstChoices": [
            "learn",
            "eat",
            "buy"
        ],
        "choices": [
            "English",
            "music",
            "math"
        ],
        "infinitive": "to learn English",
        "explanation": "英語を学ぶこと",
        "icon": "📚"
    },
    {
        "id": 3,
        "usage": "名詞的用法",
        "subject": "She hopes to",
        "first": "visit",
        "second": "Kyoto",
        "tail": "next year.",
        "ja": "彼女は来年、京都を訪れたいと思っています。",
        "firstChoices": [
            "visit",
            "make",
            "read"
        ],
        "choices": [
            "Tokyo",
            "Kyoto",
            "Osaka"
        ],
        "infinitive": "to visit Kyoto",
        "explanation": "京都を訪れること",
        "icon": "⛩️"
    },
    {
        "id": 4,
        "usage": "名詞的用法",
        "subject": "We decided to",
        "first": "play",
        "second": "soccer",
        "tail": "today.",
        "ja": "私たちは今日サッカーをすることに決めました。",
        "firstChoices": [
            "play",
            "watch",
            "buy"
        ],
        "choices": [
            "tennis",
            "baseball",
            "soccer"
        ],
        "infinitive": "to play soccer",
        "explanation": "サッカーをすること",
        "icon": "⚽"
    },
    {
        "id": 5,
        "usage": "名詞的用法",
        "subject": "He wants to",
        "first": "eat",
        "second": "pizza",
        "tail": ".",
        "ja": "彼はピザを食べたいです。",
        "firstChoices": [
            "eat",
            "make",
            "buy"
        ],
        "choices": [
            "pizza",
            "rice",
            "cake"
        ],
        "infinitive": "to eat pizza",
        "explanation": "ピザを食べること",
        "icon": "🍕"
    },
    {
        "id": 6,
        "usage": "名詞的用法",
        "subject": "I hope to",
        "first": "see",
        "second": "my friend",
        "tail": "tomorrow.",
        "ja": "私は明日友達に会いたいと思っています。",
        "firstChoices": [
            "see",
            "help",
            "call"
        ],
        "choices": [
            "my teacher",
            "my friend",
            "my sister"
        ],
        "infinitive": "to see my friend",
        "explanation": "友達に会うこと",
        "icon": "🤝"
    },
    {
        "id": 7,
        "usage": "名詞的用法",
        "subject": "My dream is",
        "first": "to become",
        "second": "a doctor",
        "tail": ".",
        "ja": "私の夢は医師になることです。",
        "firstChoices": [
            "to become",
            "to help",
            "to meet"
        ],
        "choices": [
            "a doctor",
            "a dancer",
            "a pilot"
        ],
        "infinitive": "to become a doctor",
        "explanation": "医師になること",
        "icon": "🩺"
    },
    {
        "id": 8,
        "usage": "名詞的用法",
        "subject": "My hobby is",
        "first": "to take",
        "second": "pictures",
        "tail": ".",
        "ja": "私の趣味は写真を撮ることです。",
        "firstChoices": [
            "to take",
            "to draw",
            "to collect"
        ],
        "choices": [
            "pictures",
            "lessons",
            "notes"
        ],
        "infinitive": "to take pictures",
        "explanation": "写真を撮ること",
        "icon": "📷"
    },
    {
        "id": 9,
        "usage": "名詞的用法",
        "subject": "",
        "first": "To read",
        "second": "books",
        "tail": "is fun.",
        "ja": "本を読むことは楽しいです。",
        "firstChoices": [
            "To read",
            "To write",
            "To buy"
        ],
        "choices": [
            "books",
            "letters",
            "emails"
        ],
        "infinitive": "To read books",
        "explanation": "本を読むこと",
        "icon": "📖"
    },
    {
        "id": 10,
        "usage": "名詞的用法",
        "subject": "",
        "first": "To swim",
        "second": "in the sea",
        "tail": "is exciting.",
        "ja": "海で泳ぐことはわくわくします。",
        "firstChoices": [
            "To swim",
            "To fish",
            "To dive"
        ],
        "choices": [
            "in the sea",
            "in the pool",
            "in the river"
        ],
        "infinitive": "To swim in the sea",
        "explanation": "海で泳ぐこと",
        "icon": "🏊"
    },
    {
        "id": 11,
        "usage": "名詞的用法",
        "subject": "I like",
        "first": "to listen to",
        "second": "music",
        "tail": ".",
        "ja": "私は音楽を聴くことが好きです。",
        "firstChoices": [
            "to listen to",
            "to talk about",
            "to write about"
        ],
        "choices": [
            "music",
            "the news",
            "the radio"
        ],
        "infinitive": "to listen to music",
        "explanation": "音楽を聴くこと",
        "icon": "🎧"
    },
    {
        "id": 12,
        "usage": "名詞的用法",
        "subject": "They plan to",
        "first": "watch",
        "second": "a movie",
        "tail": "tonight.",
        "ja": "彼らは今夜映画を見る予定です。",
        "firstChoices": [
            "watch",
            "make",
            "discuss"
        ],
        "choices": [
            "a movie",
            "a game",
            "a show"
        ],
        "infinitive": "to watch a movie",
        "explanation": "映画を見ること",
        "icon": "🎬"
    },
    {
        "id": 13,
        "usage": "形容詞的用法",
        "subject": "I want",
        "first": "something cold",
        "second": "to drink",
        "tail": ".",
        "ja": "私は何か冷たい飲み物がほしいです。",
        "firstChoices": [
            "something cold",
            "something sweet",
            "something hot"
        ],
        "choices": [
            "to eat",
            "to drink",
            "to read"
        ],
        "infinitive": "to drink",
        "explanation": "飲むための（何か冷たいもの）",
        "icon": "🥤"
    },
    {
        "id": 14,
        "usage": "形容詞的用法",
        "subject": "She wants",
        "first": "something sweet",
        "second": "to eat",
        "tail": ".",
        "ja": "彼女は何か甘い食べ物がほしいです。",
        "firstChoices": [
            "something sweet",
            "something hot",
            "something cold"
        ],
        "choices": [
            "to eat",
            "to drink",
            "to wear"
        ],
        "infinitive": "to eat",
        "explanation": "食べるための（何か甘いもの）",
        "icon": "🍰"
    },
    {
        "id": 15,
        "usage": "形容詞的用法",
        "subject": "I need",
        "first": "a book",
        "second": "to read",
        "tail": ".",
        "ja": "私は読むための本が必要です。",
        "firstChoices": [
            "a book",
            "a pen",
            "a bag"
        ],
        "choices": [
            "to write",
            "to read",
            "to carry"
        ],
        "infinitive": "to read",
        "explanation": "読むための（本）",
        "icon": "📘"
    },
    {
        "id": 16,
        "usage": "形容詞的用法",
        "subject": "We need",
        "first": "a place",
        "second": "to practice",
        "tail": ".",
        "ja": "私たちは練習するための場所が必要です。",
        "firstChoices": [
            "a place",
            "a friend",
            "a reason"
        ],
        "choices": [
            "to sleep",
            "to eat",
            "to practice"
        ],
        "infinitive": "to practice",
        "explanation": "練習するための（場所）",
        "icon": "🏟️"
    },
    {
        "id": 17,
        "usage": "形容詞的用法",
        "subject": "I have",
        "first": "homework",
        "second": "to do",
        "tail": "today.",
        "ja": "私は今日するべき宿題があります。",
        "firstChoices": [
            "homework",
            "a letter",
            "a song"
        ],
        "choices": [
            "to sing",
            "to send",
            "to do"
        ],
        "infinitive": "to do",
        "explanation": "するべき（宿題）",
        "icon": "📝"
    },
    {
        "id": 18,
        "usage": "形容詞的用法",
        "subject": "He has",
        "first": "a letter",
        "second": "to write",
        "tail": ".",
        "ja": "彼には書くべき手紙があります。",
        "firstChoices": [
            "a letter",
            "a book",
            "a picture"
        ],
        "choices": [
            "to read",
            "to write",
            "to send"
        ],
        "infinitive": "to write",
        "explanation": "書くべき（手紙）",
        "icon": "✉️"
    },
    {
        "id": 19,
        "usage": "形容詞的用法",
        "subject": "I need",
        "first": "time",
        "second": "to study",
        "tail": ".",
        "ja": "私は勉強するための時間が必要です。",
        "firstChoices": [
            "time",
            "money",
            "a place"
        ],
        "choices": [
            "to study",
            "to rest",
            "to play"
        ],
        "infinitive": "to study",
        "explanation": "勉強するための（時間）",
        "icon": "⏰"
    },
    {
        "id": 20,
        "usage": "形容詞的用法",
        "subject": "She has",
        "first": "a friend",
        "second": "to help",
        "tail": ".",
        "ja": "彼女には助けるべき友達がいます。",
        "firstChoices": [
            "a friend",
            "a dog",
            "a child"
        ],
        "choices": [
            "to help",
            "to call",
            "to visit"
        ],
        "infinitive": "to help",
        "explanation": "助けるべき（友達）",
        "icon": "🤝"
    },
    {
        "id": 21,
        "usage": "形容詞的用法",
        "subject": "We have",
        "first": "a room",
        "second": "to clean",
        "tail": ".",
        "ja": "私たちには掃除するべき部屋があります。",
        "firstChoices": [
            "a room",
            "a car",
            "a desk"
        ],
        "choices": [
            "to clean",
            "to paint",
            "to use"
        ],
        "infinitive": "to clean",
        "explanation": "掃除するべき（部屋）",
        "icon": "🚪"
    },
    {
        "id": 22,
        "usage": "形容詞的用法",
        "subject": "I have",
        "first": "many things",
        "second": "to learn",
        "tail": ".",
        "ja": "私には学ぶべきことがたくさんあります。",
        "firstChoices": [
            "many things",
            "many books",
            "many words"
        ],
        "choices": [
            "to buy",
            "to learn",
            "to carry"
        ],
        "infinitive": "to learn",
        "explanation": "学ぶべき（たくさんのこと）",
        "icon": "💡"
    },
    {
        "id": 23,
        "usage": "形容詞的用法",
        "subject": "He needs",
        "first": "something warm",
        "second": "to wear",
        "tail": ".",
        "ja": "彼には何か暖かい着るものが必要です。",
        "firstChoices": [
            "something warm",
            "something light",
            "something new"
        ],
        "choices": [
            "to eat",
            "to drink",
            "to wear"
        ],
        "infinitive": "to wear",
        "explanation": "着るための（何か暖かいもの）",
        "icon": "🧥"
    },
    {
        "id": 24,
        "usage": "形容詞的用法",
        "subject": "I have",
        "first": "a question",
        "second": "to ask",
        "tail": ".",
        "ja": "私には尋ねるべき質問があります。",
        "firstChoices": [
            "a question",
            "a story",
            "a song"
        ],
        "choices": [
            "to tell",
            "to ask",
            "to sing"
        ],
        "infinitive": "to ask",
        "explanation": "尋ねるべき（質問）",
        "icon": "❓"
    }
];
    function shuffle(items, random = Math.random) {
        const copy = [...items];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }
    const speeds = {slow:12000, normal:8000, fast:5000};
    function createRun(random = Math.random, speed = 'normal') {
        const picked = questions;
        return {deck:shuffle(picked,random).map(q=>({...q,firstCards:shuffle(q.firstChoices,random),secondCards:shuffle(q.choices,random)})),
            index:0,first:null,second:null,finished:false,won:false,hp:3,enemyHp:1800,enemyMaxHp:1800,random,charge:0,interval:speeds[speed] || speeds.normal,
            combo:0,bestCombo:0,damage:0,perfect:0,hits:[],mistakes:0,feedback:'まずは意味に合うカード！',lastAttack:null};
    }
    function advance(run, elapsed) {
        if (!run || run.finished || !Number.isFinite(elapsed) || elapsed <= 0) return false;
        run.charge += elapsed;
        let hit = false;
        while (run.charge >= run.interval && !run.finished) {
            run.charge -= run.interval;
            run.hp--; run.combo = 0; hit = true;
            run.lastAttack = {grade:'enemy',damage:1};
            run.feedback = '被弾！ 選んだカードはそのまま。反撃しよう！';
            if (!run.hp) { run.finished = true; run.won = false; }
        }
        return hit;
    }
    function select(run, kind, value) {
        if (!run || run.finished || !['first','second'].includes(kind)) return false;
        const q = run.deck[run.index];
        if ((kind === 'first' && run.first) || (kind === 'second' && !run.first)) return false;
        if (!(kind === 'first' ? q.firstCards : q.secondCards).includes(value)) return false;
        if (value !== q[kind]) {
            run.mistakes++; run.combo = 0;
            run.lastAttack = {grade:'miss',damage:0};
            run.feedback = '意味を確認！ '+(kind === 'first' ? q.first : q.second)+' を選ぼう。';
            return 'miss';
        }
        run[kind] = value;
        run.combo++; run.bestCombo = Math.max(run.bestCombo,run.combo);
        const special = run.combo % 6 === 0;
        const enemyBefore = run.enemyHp;
        const damage = Math.min(run.enemyHp,special ? 200 : kind === 'first' ? 20 : 100);
        run.enemyHp -= damage;
        run.damage += damage;
        run.lastAttack = {grade:special ? 'perfect' : 'hit',damage,kind,enemyBefore};
        if (run.enemyHp === 0) { run.finished=true; run.won=true; }
        if (kind === 'first') {
            run.charge = Math.max(0,run.charge-run.interval*.22);
            run.feedback = 'JAB! 攻撃を足止め！ 次は②のまとまり！';
            return 'jab';
        }
        run.charge = 0;
        run.hits.push(run.mistakes === 0);
        if (!run.mistakes) run.perfect++;
        run.completed = q;
        run.feedback = q.subject+' '+q.first+' '+q.second+' '+q.tail+' ✓';
        if (!run.finished) {
            if (run.index === run.deck.length-1) {
                // Refill indefinitely; never repeat the last question immediately.
                const batch=shuffle(questions,run.random);
                if (batch[0].id===q.id) [batch[0],batch[1]]=[batch[1],batch[0]];
                run.deck.push(...batch.map(item=>({...item,firstCards:shuffle(item.firstChoices,run.random),secondCards:shuffle(item.choices,run.random)})));
            }
            run.index++; run.first=null; run.second=null; run.mistakes=0;
        }
        return special ? 'special' : 'strike';
    }
    const esc = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    function illustration(q) {
        return `<svg viewBox="0 0 440 220" role="img" aria-label="${esc(q.ja)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(q.ja)}</title><rect width="440" height="220" rx="22" fill="#ecf3ff"/><circle cx="220" cy="108" r="84" fill="#fff"/><text x="220" y="150" text-anchor="middle" font-size="116">${q.icon}</text></svg>`;
    }
    function answerHTML(q) {
        const sentence=[q.subject,q.first,q.second,q.tail].filter(Boolean).join(' ').replace(/ \./g,'.');
        const index=sentence.indexOf(q.infinitive);
        return esc(sentence.slice(0,index))+'<mark>'+esc(q.infinitive)+'</mark>'+esc(sentence.slice(index+q.infinitive.length));
    }
    // Original vector fighters. Separate limbs allow a real wind-up / strike / recoil.
    function fighterSVG(side = 'player') {
        const enemy = side === 'enemy';
        const main = enemy ? '#d54e88' : '#26d4e2';
        const light = enemy ? '#ffadcb' : '#b4ffff';
        return `<svg viewBox="0 0 240 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g stroke="#101526" stroke-width="4" stroke-linejoin="round"><ellipse cx="119" cy="284" rx="81" ry="9" fill="#030714" opacity=".5" stroke="none"/><g class="ib-fighter-body"><g class="ib-leg-back"><path d="m103 165-25 52-27 47 27 14 39-51 23-44Z" fill="#26334b"/><path d="m49 261 32 10-3 17H24q-3-13 25-27Z" fill="#141c2e"/><path d="m48 269 30 7" stroke="${main}" stroke-width="7"/></g><g class="ib-leg-front"><path d="m121 165 36 17-9 49 26 36-26 14-40-48 4-34-18-14Z" fill="#34465e"/><path d="m146 265 29-8 26 24-4 10h-52Z" fill="#172137"/><path d="m155 275 28 7" stroke="${main}" stroke-width="7"/></g><g class="ib-arm-back"><path d="m99 96-25-5-25 32-15-27-17 12 21 45 18 3 41-30Z" fill="${enemy ? '#74849b' : '#d99b77'}"/><path d="m16 107-5-22 14-13 16 11-7 24Z" fill="${main}"/><path d="m19 87 12 6" stroke="${light}"/></g><path d="m104 84-24 22 8 54 18 24 48-8 11-50-24-34Z" fill="${main}"/><path d="m107 91-4 37 24 22 20-49-16-13Z" fill="#17263d"/><path d="m92 112 10 47 39-7 13-31" fill="none" stroke="${light}" stroke-width="5"/><path d="m90 157 63-5 3 20-53 12Z" fill="#0d172a"/><path d="m112 160 19-2 2 13-19 2Z" fill="#f1d877"/><path d="m102 87 4-26 27-2 7 35-19 12Z" fill="${enemy ? '#74849b' : '#e9b08b'}"/><path d="m94 37 17-18 31 8 10 24-10 28-26 7-19-20Z" fill="${enemy ? '#8594ac' : '#efbb98'}"/><path d="m92 47-4-21 19-17 12 9 19-8 17 15-6 22-18-14-21 7-3 14Z" fill="#16243a"/><path d="m99 47 47-7 3 13-47 8Z" fill="${main}"/><path d="m117 51 18-3" stroke="${light}" stroke-width="4"/><path d="m134 58 9 6-10 3m-16 8 12-2" fill="none" stroke-width="2"/>${enemy ? '<path d="m103 60 38-4-2 21-21 8-13-10Z" fill="#25304a"/><path d="m117 68 15-3" stroke="#ffadc8"/>' : `<path class="ib-scarf" d="m100 48-35-3-26 12 32 2 27 3-27 9-28-4 21 18 38-19Z" fill="${main}"/>`}<g class="ib-arm-front"><path d="m146 99 21 14-9 28 27-11 10 20-39 24-21-11-6-33Z" fill="${enemy ? '#8594ac' : '#efbb98'}"/><path d="m143 99 20 8-6 23-24-8Z" fill="${main}"/><path d="m180 130 15-12 20 7 4 20-22 14-13-9Z" fill="${main}"/><path d="m197 125 6 23m-15-10 25-5" stroke="${light}" stroke-width="3"/></g><path d="m95 111 2 17m48 46-14 41" stroke="#fff" opacity=".25" fill="none"/></g></g></svg>`;
    }
    function battleScene(current, idle = false) {
        const a = current.lastAttack || {grade:'hit',damage:0,critical:false};
        const miss = a.grade === 'miss';
        const special = !idle && a.grade === 'perfect';
        const ko = current.won;
        const remaining = current.enemyHp/current.enemyMaxHp*100;
        const before = (idle ? current.enemyHp : a.enemyBefore ?? current.enemyHp)/current.enemyMaxHp*100;
        const move = miss ? 'GUARD BREAK FAILED' : special ? 'THUNDER DRIVE' : a.grade === 'good' ? 'SONIC BURST' : 'IMPACT STRIKE';
        return `<div class="ib-fight ${special ? 'ib-super' : ''} ${idle ? 'ib-idle' : a.grade === 'enemy' ? 'ib-received' : miss ? 'ib-guarded' : 'ib-connected'} ${ko ? 'ib-knockout' : ''}" style="--bar-before:${before}%;--bar-after:${remaining}%"><div class="ib-fight-hud"><div><b>01 / AZURE</b><span>HP ${current.hp} / 3</span><div class="ib-player-meter" style="background:linear-gradient(90deg,#38dace ${current.hp/3*100}%,#192237 0)"></div></div><div class="ib-round-badge">${current.index+1}<small>ROUND</small></div><div class="ib-foe-hud"><b>VOLT / 02</b><span>HP ${current.enemyHp} / ${current.enemyMaxHp}</span><div class="ib-foe-meter"><i></i><em></em></div></div></div><div class="ib-fight-stage"><div class="ib-moon"></div><div class="ib-city"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="ib-neon-sign">INFINITIVE<br><b>ARENA</b></div><div class="ib-floor"></div><div class="ib-stage-speed"></div><div class="ib-stage-flash"></div><div class="ib-combatant ib-player"><div class="ib-fighter-pose">${fighterSVG()}</div></div><div class="ib-combatant ib-rival"><div class="ib-fighter-pose">${fighterSVG('enemy')}</div></div><div class="ib-wave"><i></i><i></i><i></i></div><div class="ib-contact"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="ib-floor-dust"></div>${special ? `<div class="ib-fight-cutin"><div>${fighterSVG()}</div><span>LIMIT RELEASE<big>THUNDER<br>DRIVE</big></span></div>` : ''}<div class="ib-fight-callout"><small>${a.grade === 'enemy' ? '相手の攻撃！' : miss ? 'もう一度！' : a.kind === 'first' ? '攻撃を足止め！' : '英文完成！'}</small><strong>${a.grade === 'enemy' ? 'DAMAGE!' : miss ? 'GUARD!' : special ? 'SUPER!' : a.kind === 'first' ? 'JAB!' : 'STRIKE!'}</strong>${miss ? '' : `<span>${a.damage}<small> DAMAGE</small></span>`}</div>${ko ? '<div class="ib-ko">K.O.<small>OPPONENT DEFEATED</small></div>' : ''}</div></div>`;
    }
    const style = `
    #view-infinitive{color:#26344b;max-width:760px;margin:auto;font-family:inherit}
    #view-infinitive *{box-sizing:border-box} #view-infinitive button{touch-action:manipulation;font:inherit;font-weight:800}
    #view-infinitive button:focus-visible{outline:3px solid #efac32;outline-offset:4px}
    .ib-shell{background:#f7f8ff;border:1px solid #e0e4f1;border-radius:22px;padding:18px}
    .ib-eyebrow{font-size:11px;letter-spacing:.16em;font-weight:900;color:#6763a3}.ib-title{font-size:clamp(21px,4vw,30px);font-weight:900;margin:6px 0}
    .ib-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}.ib-muted{font-size:12px;color:#67758a;line-height:1.7}
    .ib-link{font-size:12px!important;color:#686197;padding:9px;border-radius:10px;background:#edeaf9}
    .ib-primary{display:block;width:100%;padding:13px 16px;border-radius:14px;background:#6254bd;color:white;box-shadow:0 4px 0 #403584;transition:transform .15s,background .15s}
    .ib-primary:active:not(:disabled){transform:translateY(3px);box-shadow:0 1px 0 #403584}.ib-primary:disabled{background:#d7d9e6;color:#737a90;box-shadow:0 3px 0 #c4c9d8}
    .ib-hero{text-align:center;padding:8px 0 18px}.ib-demo{max-width:380px;margin:16px auto}.ib-demo svg{width:100%;max-height:185px}
    .ib-demo-pair{display:flex;justify-content:center;gap:10px;margin:-12px auto 16px;position:relative}.ib-mini{padding:12px 22px;border:2px solid #c3bbed;border-radius:12px;background:#f3efff;color:#6756b3;font-size:22px;font-weight:900;box-shadow:0 5px 0 #ded8f2;transform:rotate(-5deg)}.ib-mini:last-child{background:#ebf8f6;border-color:#a6d8cf;color:#267c76;transform:rotate(5deg)}
    .ib-rules{display:grid;gap:10px;text-align:left;margin:20px 0;padding:16px;background:#fff;border-radius:16px;font-size:13px;line-height:1.6}.ib-rules strong{color:#6254bd}
    .ib-arena{background:linear-gradient(120deg,#29294c,#484270);color:#fff;border-radius:17px;padding:12px 16px;display:flex;align-items:center;gap:14px;position:relative;overflow:hidden;min-height:106px}
    .ib-enemy{width:90px;flex-shrink:0}.ib-enemy svg{width:100%;height:78px}.ib-arena-info{flex:1;min-width:0}.ib-enemy-name{font-size:13px;font-weight:900}.ib-shields{display:flex;gap:5px;margin:9px 0}.ib-shield{height:9px;flex:1;border-radius:7px;background:#a99be8;transition:background .3s}.ib-shield.ib-broken{background:#ffffff24}.ib-arena small{color:#dfdaff;font-size:11px}.ib-combo{font-size:12px;font-weight:900;color:#ffe7a0;margin-top:6px}
    .ib-scene{margin:14px 0 10px;position:relative}.ib-scene svg{width:100%;max-height:210px;border-radius:18px;background:#f1f5fb}.ib-time{display:inline-block;background:#fff1d3;color:#805f1c;padding:6px 12px;border-radius:9px;font-size:12px;font-weight:800;margin-bottom:8px}
    .ib-prompt{text-align:center;font-size:14px;font-weight:700;margin:8px 0 12px}.ib-sentence{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px;padding:16px 10px;background:white;border:1px solid #e2e5f0;border-radius:15px;font-size:clamp(16px,3vw,21px);font-weight:800;line-height:1.6}
    .ib-slot{min-width:70px;min-height:44px;border:2px dashed #c3bbed;border-radius:10px;color:#6756b3;background:#f3efff;padding:4px 10px;transition:transform .18s}.ib-slot[data-kind="second"]{min-width:98px;background:#ebf8f6;color:#267c76;border-color:#a6d8cf}.ib-slot.ib-filled{border-style:solid;box-shadow:0 3px 0 #dfd9f1;animation:ib-place .25s ease-out}
    .ib-hand{margin:15px 0 18px}.ib-hand-label{display:flex;justify-content:space-between;align-items:center;margin:12px 0 8px;font-size:12px;font-weight:900;color:#6756b3}.ib-hand-label.ib-teal{color:#267c76}.ib-hand-label small{font-size:10px;font-weight:500;color:#67758a}.ib-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .ib-card{min-height:68px;border:2px solid #c3bbed;border-radius:13px;background:linear-gradient(155deg,#fff,#efebfc);color:#6756b3;box-shadow:0 5px 0 #ded8f2;font-size:clamp(17px,3.5vw,24px)!important;transition:transform .18s,box-shadow .18s,opacity .18s;position:relative;padding:10px 3px}
    .ib-card[data-kind="second"]{background:linear-gradient(155deg,#fff,#e4f5f0);border-color:#a6d8cf;color:#267c76;box-shadow:0 5px 0 #cbe6e0}.ib-card[aria-pressed="true"]{transform:translateY(-5px);outline:2px solid currentColor;outline-offset:2px;box-shadow:0 8px 12px #4b3b6726}.ib-card[aria-pressed="true"]:after{content:'セット中';position:absolute;bottom:1px;left:0;right:0;font-size:9px;font-weight:700}.ib-card:disabled{opacity:.48}.ib-card:disabled[aria-pressed="true"]{opacity:1}
    .ib-feedback{font-size:13px;line-height:1.8;border-radius:12px;padding:12px;margin:14px 0;background:#fff2da;color:#775722}.ib-feedback.ib-success{background:#e7f5ed;color:#236d4e}.ib-feedback strong{display:block;font-size:16px}.ib-answer{font-size:16px;font-weight:900;overflow-wrap:anywhere}.ib-ready{text-align:center;font-size:12px;color:#7361b2;font-weight:800;min-height:22px;margin-bottom:6px}
    .ib-hit .ib-enemy{animation:ib-hit .5s ease-in-out}.ib-critical .ib-enemy{animation:ib-hit .65s ease-in-out}.ib-critical:after{content:'✦';position:absolute;left:34px;top:4px;color:#ffe08a;font-size:80px;pointer-events:none;animation:ib-spark .7s both}.ib-fusion .ib-slot{animation:ib-fuse .7s ease-in-out}
    .ib-result{text-align:center;padding:15px 0}.ib-result-art{position:relative;max-width:240px;margin:0 auto}.ib-result-art svg{height:145px;margin:auto}.ib-stars{color:#c08219;letter-spacing:5px;font-size:31px;margin:10px 0}.ib-score{font-size:18px;font-weight:900;margin:8px}.ib-review{text-align:left;margin:18px 0;display:grid;gap:8px}.ib-review li{padding:12px;background:#fff;border:1px solid #e1e4ef;border-radius:12px;font-size:13px;line-height:1.7}.ib-review b{color:#6254bd}.ib-review small{display:block;color:#67758a}.ib-ultimate .ib-result-art:after{content:'⚡';position:absolute;inset:-5px 0 0;font-size:125px;color:#ffcc55;text-shadow:0 0 24px #fff1ae;animation:ib-lightning 1.2s both;pointer-events:none}.ib-ultimate .ib-result-art svg{animation:ib-hit .6s .3s}.ib-flight{position:fixed;z-index:100;pointer-events:none;display:flex;align-items:center;justify-content:center;background:#fff9e9;border:2px solid #b9a5e0;border-radius:12px;font-size:22px;font-weight:900;color:#6354ad;box-shadow:0 8px 20px #40358430}
    @keyframes ib-place{from{transform:translateY(-7px) scale(.95)}to{transform:none}}@keyframes ib-hit{20%,60%{transform:translateX(-8px) rotate(-7deg)}40%,80%{transform:translateX(8px) rotate(7deg)}}@keyframes ib-spark{0%{opacity:0;transform:scale(.3) rotate(0)}30%{opacity:1}100%{opacity:0;transform:scale(1.7) rotate(50deg)}}@keyframes ib-fuse{40%{transform:scale(1.12);box-shadow:0 0 20px #e8bd56}100%{transform:none}}@keyframes ib-lightning{0%{opacity:0;transform:translateY(-60px)}20%,50%{opacity:1;transform:translateY(0)}35%{opacity:.2}100%{opacity:0;transform:scale(1.4)}}
    @media(hover:hover){.ib-card:hover:not(:disabled){transform:translateY(-5px)}}@media(max-width:440px){.ib-shell{padding:12px}.ib-cards{gap:8px}.ib-scene svg{max-height:164px}.ib-sentence{gap:6px;padding:12px 6px}.ib-arena{padding:9px 12px}.ib-enemy{width:70px}.ib-card{min-height:62px}.ib-top{gap:6px}}
    @media(min-width:600px){.ib-hand{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:6px 0 15px}.ib-scene svg{max-height:132px}.ib-arena{min-height:80px;padding:8px 14px}.ib-enemy svg{height:64px}.ib-top{margin-bottom:8px}.ib-scene{margin-top:10px}.ib-prompt{margin:7px 0}.ib-sentence{padding:10px}.ib-card{min-height:62px}}
    .ib-enemy svg{animation:ib-hover 2s ease-in-out infinite}.ib-arena:before{content:'✧     ·     ✦     ·     ✧';position:absolute;inset:3px 10px auto;text-align:right;letter-spacing:16px;color:#ffffff45;animation:ib-dust 3s ease-in-out infinite;pointer-events:none}
    .ib-battle-overlay{position:fixed;inset:0;z-index:100;background:#1c1b39d9;display:grid;place-items:center;padding:16px;pointer-events:auto;backdrop-filter:blur(5px);font-family:inherit}.ib-duel{position:relative;width:min(620px,100%);border:2px solid #c3b4ff;border-radius:26px;background:radial-gradient(ellipse at center,#544889,#262342 75%);color:white;overflow:hidden;text-align:center;padding:26px 14px 20px;box-shadow:0 0 60px #a893eb50}.ib-duel:before{content:'';position:absolute;inset:0;background:repeating-conic-gradient(from 15deg at 50% 55%,transparent 0deg 15deg,#e0c9ff0b 15deg 25deg);pointer-events:none}.ib-grade{position:relative;font-size:clamp(30px,7vw,52px);font-weight:1000;letter-spacing:.05em;color:#ffe294;text-shadow:0 4px 0 #795535;animation:ib-pop .4s both}.ib-duel-subtitle{position:relative;font-size:13px;color:#e9e1ff;font-weight:800;margin-top:4px}.ib-duel-field{position:relative;height:180px;margin:12px auto;max-width:480px}.ib-caster{position:absolute;left:2%;top:53px;font-size:58px;animation:ib-cast .8s both}.ib-target{position:absolute;right:1%;top:25px;width:130px;animation:ib-impact 1.3s both}.ib-target svg{width:100%;height:120px}.ib-projectile{position:absolute;left:17%;top:65px;width:44px;height:44px;border-radius:50%;background:#fff9cc;box-shadow:0 0 22px 10px #ffd85c, -24px 0 35px 8px #a38aff;animation:ib-projectile 1.1s both}.ib-ring{position:absolute;left:8%;top:25px;width:130px;height:130px;border:3px dashed #d5bcff;border-radius:50%;animation:ib-rune 1.2s both}.ib-impact-stars{position:absolute;right:3%;top:18px;font-size:85px;color:#ffdf77;animation:ib-explode 1.25s both}.ib-damage{position:absolute;right:8%;top:30px;font-size:36px;font-weight:1000;color:#ffe08a;text-shadow:0 3px #433356;animation:ib-damage 1.35s both}.ib-duel-sentence{position:relative;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;font-size:20px;font-weight:900}.ib-duel-sentence span{background:#ffffff18;border:1px solid #ffffff50;border-radius:10px;padding:6px 16px;animation:ib-fuse .7s both}.ib-duel-note{position:relative;font-size:12px;color:#e5dcff;margin-top:15px}.ib-duel-close{position:relative;display:block;margin:18px auto 0;font-size:12px;background:#ffffff15;color:#eee7ff;padding:7px 16px;border:1px solid #ffffff30;border-radius:20px;cursor:pointer}.ib-grade-miss .ib-grade{color:#d4c9ed;text-shadow:none}.ib-grade-miss .ib-projectile{animation:ib-fizzle 1s both;background:#b4a1cc;box-shadow:0 0 15px #beadd4}.ib-grade-miss .ib-target{animation:ib-hover 1s infinite}.ib-grade-perfect .ib-duel{border-color:#ffe293}.ib-grade-perfect .ib-projectile{width:60px;height:60px;top:55px;box-shadow:0 0 30px 18px #ffd85c,-35px 0 45px 15px #a38aff}.ib-grade-perfect .ib-target{animation:ib-impact-big 1.3s both}.ib-grade-perfect .ib-duel{animation:ib-screen-impact 1.3s both}
    @keyframes ib-hover{50%{transform:translateY(-7px) rotate(3deg)}}@keyframes ib-dust{50%{opacity:.35;transform:translateY(5px)}}@keyframes ib-charge{50%{box-shadow:0 4px 0 #403584,0 0 18px #c6a7ff;filter:brightness(1.15)}}@keyframes ib-pop{from{opacity:0;transform:scale(.5)}70%{transform:scale(1.1)}to{opacity:1;transform:scale(1)}}@keyframes ib-cast{25%{transform:translateX(-8px) rotate(-15deg)}50%{transform:translateX(10px) rotate(12deg)}to{transform:none}}@keyframes ib-rune{0%{opacity:0;transform:scale(.2) rotate(0)}35%{opacity:1}70%,100%{opacity:0;transform:scale(1.3) rotate(180deg)}}@keyframes ib-projectile{0%,20%{opacity:0;transform:scale(.2)}30%{opacity:1;transform:translateX(0) scale(1)}65%{opacity:1;left:75%;transform:scale(1.3)}75%,100%{opacity:0;left:80%;transform:scale(2)}}@keyframes ib-impact{0%,52%{transform:none}60%{transform:translate(16px,-8px) rotate(15deg)}70%{transform:translate(-9px,4px) rotate(-12deg)}85%{transform:translate(6px,0) rotate(6deg)}100%{transform:none}}@keyframes ib-impact-big{0%,52%{transform:none}65%{transform:translate(28px,-30px) rotate(30deg)}85%{transform:translate(-8px,10px) rotate(-12deg)}100%{transform:none}}@keyframes ib-explode{0%,50%{opacity:0;transform:scale(.1)}65%{opacity:1;transform:scale(1.4) rotate(30deg)}100%{opacity:0;transform:scale(2) rotate(80deg)}}@keyframes ib-damage{0%,55%{opacity:0;transform:translateY(25px) scale(.5)}70%{opacity:1;transform:translateY(-15px) scale(1.25)}100%{opacity:1;transform:translateY(-32px) scale(1)}}@keyframes ib-fizzle{0%{opacity:0;transform:scale(.2)}30%{opacity:1;transform:scale(.8)}100%{opacity:0;left:40%;transform:translateY(40px) scale(.1)}}@keyframes ib-screen-impact{0%,52%,85%,100%{transform:none}60%{transform:translateX(-7px)}67%{transform:translateX(7px)}74%{transform:translateX(-4px)}}
    @media(max-width:440px){.ib-duel-field{height:150px}.ib-target{width:95px;top:35px}.ib-target svg{height:90px}.ib-caster{font-size:45px}.ib-ring{width:100px;height:100px;top:38px}.ib-duel{padding:20px 10px 16px}.ib-duel-sentence{font-size:17px}.ib-damage{font-size:28px}.ib-impact-stars{font-size:65px}}
    .ib-battle-overlay{padding:12px;background:#070b18e8;backdrop-filter:blur(6px)}
    .ib-fight{--windup:.15s;--impact:.72s;position:relative;width:min(900px,100%);max-height:calc(100dvh - 24px);overflow:auto;background:#0a1020;color:#f2f8ff;border:1px solid #435472;border-radius:8px;box-shadow:0 25px 100px #000b;font-family:Arial,'Noto Sans JP',sans-serif}.ib-fight.ib-super{--windup:.75s;--impact:1.32s;border-color:#f6d678;box-shadow:0 0 70px #eabf392e}.ib-fight-hud{display:grid;grid-template-columns:1fr 60px 1fr;gap:12px;align-items:center;padding:16px 22px;background:linear-gradient(180deg,#202e48,#10192b);position:relative;z-index:3}.ib-fight-hud b{display:block;font-size:14px;letter-spacing:.12em;font-style:italic}.ib-fight-hud span{display:block;font-size:9px;color:#aebfd6;letter-spacing:.15em;margin:4px 0 7px}.ib-foe-hud{text-align:right}.ib-round-badge{text-align:center;font-size:27px;line-height:1;font-weight:1000;color:#ffe6a2;transform:skew(-6deg)}.ib-round-badge small{display:block;font-size:8px;letter-spacing:.1em;margin-top:5px}.ib-player-meter,.ib-foe-meter{height:12px;background:#151e30;border:1px solid #586883;transform:skew(-12deg);position:relative;overflow:hidden}.ib-player-meter{background:linear-gradient(90deg,#168dbd,#6ef9ed)}.ib-foe-meter i,.ib-foe-meter em{position:absolute;right:0;top:0;bottom:0;width:var(--bar-before);background:#f1b753}.ib-foe-meter i{background:#ffedaf;animation:ib-meter-drain .6s calc(var(--impact) + .2s) forwards}.ib-foe-meter em{background:linear-gradient(90deg,#c83b65,#ff956c);animation:ib-meter-drain .13s var(--impact) forwards}.ib-fight-stage{height:clamp(240px,43vw,380px);position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(ellipse at 50% 20%,#24336a,#11172e 65%)}.ib-moon{position:absolute;left:20%;top:20px;width:65px;height:65px;border-radius:50%;background:#a4b8d8;box-shadow:0 0 60px #83aaff35;opacity:.6}.ib-city{position:absolute;inset:25% -2% 17%;display:flex;align-items:flex-end;gap:8px;opacity:.65}.ib-city i{flex:1;height:70%;background:repeating-linear-gradient(0deg,transparent 0 15px,#86bcd422 15px 19px),repeating-linear-gradient(90deg,#10192d 0 14px,#254565 14px 18px);border-top:2px solid #4c7492}.ib-city i:nth-child(2n){height:95%}.ib-city i:nth-child(3n){height:52%}.ib-neon-sign{position:absolute;right:15%;top:25px;color:#ee8cd6;text-align:center;letter-spacing:.3em;font-size:9px;padding:9px 16px;border:2px solid #f480cb80;transform:rotate(-5deg);box-shadow:0 0 25px #ed4aba25;text-shadow:0 0 12px #f480cb}.ib-neon-sign b{font-size:20px;letter-spacing:.08em}.ib-floor{position:absolute;inset:78% 0 0;background:repeating-linear-gradient(0deg,transparent 0 15px,#7e88b320 15px 16px),repeating-linear-gradient(95deg,#1d2438 0 70px,#596582 71px 72px);border-top:3px solid #6f8aab;box-shadow:0 -5px 15px #78b2d520}.ib-combatant{position:absolute;bottom:8%;width:27%;max-width:235px;min-width:110px;z-index:2;will-change:transform}.ib-player{left:9%}.ib-rival{right:7%}.ib-combatant svg{width:100%;height:auto}.ib-rival .ib-fighter-pose{transform:scaleX(-1)}.ib-fighter-body{transform-origin:120px 270px;animation:ib-stance 1s ease-in-out infinite}.ib-scarf{transform-origin:98px 50px;animation:ib-scarf-wave .6s ease-in-out infinite}.ib-connected .ib-player,.ib-guarded .ib-player{animation:ib-lunge .95s var(--windup) both}.ib-player .ib-arm-front{transform-origin:144px 110px;animation:ib-punch .95s var(--windup) both}.ib-connected .ib-rival{animation:ib-recoil 1.1s var(--impact) both}.ib-super .ib-rival{animation-name:ib-launch}.ib-knockout .ib-rival{animation-name:ib-knockdown;animation-fill-mode:forwards}.ib-guarded .ib-rival{animation:ib-block .7s var(--impact) both}.ib-stage-speed{position:absolute;inset:0;background:repeating-linear-gradient(-8deg,transparent 0 26px,#7bf9ff35 26px 28px,transparent 28px 43px);opacity:0;animation:ib-speed .85s var(--windup) both;z-index:1}.ib-super .ib-stage-speed{background:repeating-linear-gradient(-8deg,transparent 0 20px,#f9e18270 20px 23px,transparent 23px 35px)}.ib-stage-flash{position:absolute;inset:0;background:#d7f7ff;opacity:0;z-index:4;pointer-events:none;animation:ib-impact-flash .17s var(--impact) both}.ib-guarded .ib-stage-flash{display:none}.ib-wave{position:absolute;left:37%;top:49%;width:18%;height:23%;z-index:3;opacity:0;animation:ib-energy .6s calc(var(--windup) + .2s) both;filter:drop-shadow(0 0 12px #5dfaff)}.ib-wave i{position:absolute;inset:0;border:4px solid #9ffff5;border-left:18px solid #fff;border-radius:50%;transform:skew(-15deg);background:linear-gradient(90deg,#23cbd766,#b9ffff55);box-shadow:inset 0 0 20px #fff}.ib-wave i:nth-child(2){inset:12% 15%;transform:rotate(-22deg)}.ib-wave i:nth-child(3){inset:25% 25%;background:#fff}.ib-super .ib-wave{height:35%;width:26%;top:42%;filter:drop-shadow(0 0 18px #ffcc4a)}.ib-super .ib-wave i{border-color:#ffe798;background:linear-gradient(90deg,#ef8d1570,#fff4ae)}.ib-guarded .ib-wave{animation-name:ib-energy-fail}.ib-contact{position:absolute;right:19%;top:48%;z-index:4;width:1px;height:1px}.ib-contact i{position:absolute;width:90px;height:7px;background:linear-gradient(90deg,#fff,#ffdc79,transparent);transform-origin:0 50%;opacity:0;--angle:0deg;animation:ib-slash .65s var(--impact) both}.ib-contact i:nth-child(2){--angle:60deg}.ib-contact i:nth-child(3){--angle:120deg}.ib-contact i:nth-child(4){--angle:180deg}.ib-contact i:nth-child(5){--angle:240deg}.ib-contact i:nth-child(6){--angle:300deg}.ib-guarded .ib-contact{display:none}.ib-floor-dust{position:absolute;bottom:6%;left:23%;width:30%;height:12%;border:8px solid #a7b3d15c;border-radius:50%;z-index:1;opacity:0;animation:ib-dust-burst .7s var(--windup) both}.ib-fight-callout{position:absolute;left:5%;top:9%;z-index:5;text-align:left;font-style:italic;opacity:0;animation:ib-hit-title 1.3s var(--impact) forwards;filter:drop-shadow(3px 4px 0 #10172b)}.ib-fight-callout>small{font-size:11px;font-weight:900;color:#d9edff;display:block;letter-spacing:.05em}.ib-fight-callout strong{display:block;color:#9efef3;font-size:clamp(28px,6vw,56px);font-weight:1000;line-height:1.05}.ib-super .ib-fight-callout strong{color:#ffe093}.ib-fight-callout>span{font-size:31px;font-weight:1000;color:#fff}.ib-fight-callout span small{font-size:11px}.ib-fight-cutin{position:absolute;inset:12% -3% 18%;z-index:6;background:linear-gradient(105deg,#0d4664,#0b142d 52%,#73511e);border-top:3px solid #ffecab;border-bottom:3px solid #ffecab;transform:skewY(-5deg);display:flex;align-items:center;overflow:hidden;animation:ib-cutin .75s both}.ib-fight-cutin>div{width:42%;height:150%;transform:translateY(35%) scale(1.65);opacity:.9}.ib-fight-cutin>span{z-index:2;font-size:10px;letter-spacing:.2em;color:#f6d37b;font-weight:900}.ib-fight-cutin big{display:block;font-size:clamp(27px,6vw,58px);font-style:italic;line-height:.95;letter-spacing:-.03em;color:#fff3c4;margin-top:8px;text-shadow:3px 3px #8d5424}.ib-ko{position:absolute;inset:25% 0 auto;z-index:7;text-align:center;font-size:clamp(65px,15vw,135px);font-weight:1000;line-height:1;color:#fff1b4;font-style:italic;text-shadow:5px 5px #c65334,-2px -2px #452434;opacity:0;animation:ib-ko-enter .6s calc(var(--impact) + .75s) forwards}.ib-ko small{display:block;font-size:10px;letter-spacing:.22em;text-shadow:none;color:#fff}.ib-knockout .ib-fight-callout{animation-name:ib-hit-title-ko}.ib-fight-footer{position:relative;text-align:center;background:linear-gradient(180deg,#152036,#0a1020);padding:14px 15px 12px;border-top:1px solid #374767}.ib-move-name{font-size:12px;letter-spacing:.22em;color:#90deda;font-weight:900;margin-bottom:9px}.ib-super .ib-move-name{color:#ffe298}.ib-fight-words{display:flex;align-items:center;justify-content:center;gap:8px;font-size:23px;font-weight:900}.ib-fight-words span{padding:5px 20px;background:#223651;border-left:3px solid #79eee6;transform:skew(-6deg);border-radius:3px}.ib-fight-words b{color:#6887a0;font-size:16px}.ib-fight-footer p{font-size:12px;color:#bbcce1;margin:10px 0}.ib-fight .ib-duel-close{margin:6px auto 0;padding:6px 15px;font-size:11px}.ib-guarded .ib-fight-callout strong{color:#aebed9}.ib-connected .ib-fight-stage{animation:ib-stage-hit .24s var(--impact) both}
    @keyframes ib-stance{50%{transform:translateY(3px) rotate(.5deg)}}@keyframes ib-scarf-wave{50%{transform:rotate(-9deg)}}@keyframes ib-lunge{0%{transform:none}18%{transform:translateX(-9%) skewX(-4deg)}42%{transform:translateX(78%) skewX(-6deg)}58%,72%{transform:translateX(81%) skewX(-3deg)}100%{transform:none}}@keyframes ib-punch{0%,20%{transform:rotate(20deg)}42%,72%{transform:translate(16px,-27px) rotate(-58deg)}100%{transform:none}}@keyframes ib-recoil{0%,10%{transform:translateX(8%) rotate(10deg)}35%{transform:translateX(25%) rotate(22deg)}60%{transform:translateX(12%) rotate(-8deg)}100%{transform:none}}@keyframes ib-launch{0%,10%{transform:translate(6%,-4%) rotate(10deg)}40%{transform:translate(30%,-30%) rotate(40deg)}70%{transform:translate(25%,5%) rotate(15deg)}100%{transform:none}}@keyframes ib-knockdown{0%,10%{transform:translate(6%,-4%) rotate(10deg)}40%{transform:translate(25%,-25%) rotate(45deg)}80%,100%{transform:translate(20%,22%) rotate(80deg)}}@keyframes ib-block{20%,45%{transform:translateX(6%) rotate(-6deg)}100%{transform:none}}@keyframes ib-energy{0%{opacity:0;transform:translateX(-50%) scale(.3)}20%{opacity:1}78%{opacity:1;transform:translateX(175%) scale(1.3)}100%{opacity:0;transform:translateX(180%) scale(1.6)}}@keyframes ib-energy-fail{0%{opacity:0;transform:scale(.3)}25%{opacity:1}100%{opacity:0;transform:translateX(40%) scale(.1)}}@keyframes ib-speed{0%,100%{opacity:0;transform:translateX(-5%)}35%,65%{opacity:1;transform:translateX(5%)}}@keyframes ib-slash{0%{opacity:1;transform:rotate(var(--angle)) scaleX(.2)}25%{opacity:1;transform:rotate(var(--angle)) scaleX(1.4)}100%{opacity:0;transform:rotate(var(--angle)) translateX(40px) scaleX(.7)}}@keyframes ib-impact-flash{0%,100%{opacity:0}15%,45%{opacity:.65}}@keyframes ib-stage-hit{20%{transform:translate(-5px,2px)}50%{transform:translate(5px,-2px)}80%{transform:translate(-2px,1px)}100%{transform:none}}@keyframes ib-dust-burst{0%{opacity:.7;transform:scale(.1)}100%{opacity:0;transform:scale(1.7)}}@keyframes ib-meter-drain{to{width:var(--bar-after)}}@keyframes ib-cutin{0%{opacity:0;translate:-100% 0}18%,78%{opacity:1;translate:0 0}100%{opacity:0;translate:110% 0;visibility:hidden}}@keyframes ib-hit-title{0%{opacity:0;transform:translateX(-20px) scale(1.4)}12%,100%{opacity:1;transform:none}}@keyframes ib-hit-title-ko{0%{opacity:0;transform:translateX(-20px) scale(1.4)}12%,60%{opacity:1;transform:none}100%{opacity:0}}@keyframes ib-ko-enter{0%{opacity:0;transform:scale(2)}50%{opacity:1;transform:scale(.95)}100%{opacity:1;transform:scale(1)}}
    @media(max-width:440px){.ib-fight-hud{padding:12px;gap:8px;grid-template-columns:1fr 40px 1fr}.ib-fight-hud b{font-size:10px}.ib-fight-stage{height:250px}.ib-combatant{width:37%;min-width:0}.ib-player{left:0}.ib-rival{right:1%}.ib-neon-sign{right:10%;top:17px}.ib-fight-callout{top:8%;left:4%}.ib-fight-callout>small{font-size:9px}.ib-fight-footer{padding:12px}.ib-fight-words{font-size:20px}.ib-fight-words span{padding:4px 16px}.ib-fight-callout strong{font-size:30px}.ib-fight-cutin big{font-size:32px}.ib-contact i{width:60px}}
    @media(prefers-reduced-motion:reduce){#view-infinitive *,#view-infinitive *:after,#view-infinitive *:before,.ib-flight,.ib-battle-overlay *{animation:none!important;transition:none!important}.ib-projectile,.ib-ring,.ib-impact-stars,.ib-fight-cutin,.ib-wave,.ib-stage-speed,.ib-stage-flash,.ib-contact,.ib-floor-dust{display:none}.ib-damage{top:0}.ib-fight-callout{opacity:1}.ib-ko{opacity:1}.ib-knockout .ib-fight-callout{display:none}.ib-foe-meter i,.ib-foe-meter em{width:var(--bar-after)}}
    `;
    const liveStyle = `
    #view-infinitive .ib-battle-layout{padding:0;background:#0b1426;border:1px solid #425572;border-radius:14px;color:#e5efff;isolation:isolate}
    .ib-live-arena{position:sticky;top:0;z-index:8;background:#0a1020;border-radius:13px 13px 0 0;box-shadow:0 8px 20px #0005;overflow:hidden}
    .ib-live-arena .ib-fight{width:100%;max-height:none;overflow:hidden;border:0;border-radius:0;box-shadow:none}
    .ib-live-arena .ib-fight-stage{height:190px}.ib-live-arena .ib-fight-hud{padding:9px 16px;gap:10px;grid-template-columns:1fr 44px 1fr}.ib-live-arena .ib-fight-hud b{font-size:11px}.ib-live-arena .ib-fight-hud span{font-size:8px;margin:3px 0 5px}.ib-live-arena .ib-round-badge{font-size:22px}.ib-live-arena .ib-round-badge small{font-size:7px}.ib-live-arena .ib-player-meter,.ib-live-arena .ib-foe-meter{height:8px}
    .ib-live-arena .ib-combatant{width:145px;min-width:0;max-width:30%;bottom:5%}.ib-live-arena .ib-player{left:16%}.ib-live-arena .ib-rival{right:14%}.ib-live-arena .ib-neon-sign{font-size:8px;top:14px;padding:6px 10px}.ib-live-arena .ib-neon-sign b{font-size:16px}.ib-live-arena .ib-moon{width:45px;height:45px;top:12px}.ib-live-arena .ib-fight-callout{top:6%;left:4%}.ib-live-arena .ib-fight-callout strong{font-size:30px}.ib-live-arena .ib-fight-callout>small{font-size:9px}.ib-live-arena .ib-fight-callout>span{font-size:24px}.ib-live-arena .ib-ko{font-size:74px}
    .ib-idle .ib-player,.ib-idle .ib-rival,.ib-idle .ib-arm-front{animation:none;transform:none}.ib-idle .ib-foe-meter i,.ib-idle .ib-foe-meter em{animation:none;width:var(--bar-after)}.ib-idle .ib-fight-callout,.ib-idle .ib-wave,.ib-idle .ib-contact,.ib-idle .ib-stage-speed,.ib-idle .ib-stage-flash,.ib-idle .ib-floor-dust{display:none}.ib-idle.ib-knockout .ib-rival{transform:translate(20%,22%) rotate(80deg)}.ib-idle .ib-ko{animation:none;opacity:1}
    .ib-console{padding:14px;background:linear-gradient(150deg,#16243b,#0c1427)}.ib-console-top{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;color:#f5d78c;font-weight:900;margin-bottom:12px}.ib-console .ib-link{color:#c7d9ef;background:#26364f;padding:7px 10px;font-size:11px!important}.ib-question{display:grid;grid-template-columns:110px 1fr;gap:12px;align-items:center;margin-bottom:12px;padding:8px;background:#1c2d47;border:1px solid #354761;border-radius:10px}.ib-question-art svg{width:100%;height:68px;border-radius:8px;background:#e9eef5}.ib-console .ib-time{font-size:10px;padding:3px 7px;margin:0;background:#3e3540;color:#ffe0a2}.ib-console .ib-prompt{text-align:left;font-size:13px;margin:5px 0 0;line-height:1.5}.ib-console .ib-sentence{background:#0b1527;border-color:#3c5374;color:#ecf6ff;font-size:18px;padding:10px;gap:6px}.ib-console .ib-slot{background:#282750;color:#d7c4ff;border-color:#8f77c2;font-size:16px}.ib-console .ib-slot[data-kind="second"]{background:#143a43;color:#9ef8ee;border-color:#5eaca9}.ib-console .ib-slot.ib-filled{box-shadow:0 2px 0 #080e1c}.ib-console .ib-hand{margin:6px 0 12px;gap:12px}.ib-console .ib-hand-label{color:#c5b4ef;margin:8px 0;font-size:11px}.ib-console .ib-hand-label.ib-teal{color:#8edcd9}.ib-console .ib-hand-label small{color:#9baec8;font-size:9px}.ib-console .ib-card{background:linear-gradient(145deg,#343258,#20203c);border-color:#77679f;color:#e2d7ff;box-shadow:0 4px 0 #080e1c;min-height:56px;font-size:20px!important}.ib-console .ib-card[data-kind="second"]{background:linear-gradient(145deg,#204650,#142d37);color:#a9fff5;border-color:#4b8a90;box-shadow:0 4px 0 #080e1c}.ib-console .ib-card[aria-pressed="true"]{box-shadow:0 0 14px #8f9cff35}.ib-console .ib-card:disabled{opacity:.6}.ib-console .ib-card:disabled[aria-pressed="true"]{opacity:1}.ib-console .ib-ready{color:#bdc9f7;font-size:11px;margin-bottom:0;min-height:18px}.ib-console .ib-timing{background:#101b30;border-color:#536080;padding:9px 12px;margin:8px 0}.ib-console .ib-timing-heading{color:#d5dffa;font-size:11px;margin-bottom:8px}.ib-console .ib-timing-caption{color:#bdcce5;font-size:10px;margin-top:6px}.ib-console .ib-primary{background:linear-gradient(105deg,#225fab,#5145a1);border:1px solid #8fb9f5;box-shadow:0 4px 0 #060e1e;padding:12px}.ib-console .ib-primary:disabled{background:#26354c;color:#a6b4cc;border-color:#425572}.ib-console .ib-muted{color:#a6b8d1;font-size:10px}.ib-console .ib-feedback{background:#342e28;color:#ffe0a1;border:1px solid #756249;padding:10px;font-size:12px;margin:10px 0}.ib-console .ib-feedback.ib-success{background:#153930;color:#b6f2d4;border-color:#3a7063}.ib-console .ib-feedback strong{font-size:14px}.ib-console .ib-answer{font-size:15px}.ib-console .ib-skip{display:block;margin:10px auto 0}
    @media(max-width:440px){.ib-live-arena .ib-fight-stage{height:145px}.ib-live-arena .ib-fight-hud{padding:7px 10px;grid-template-columns:1fr 34px 1fr}.ib-live-arena .ib-fight-hud b{font-size:9px}.ib-live-arena .ib-combatant{width:113px;max-width:34%}.ib-live-arena .ib-player{left:8%}.ib-live-arena .ib-rival{right:6%}.ib-live-arena .ib-fight-callout strong{font-size:23px}.ib-live-arena .ib-fight-callout>small{font-size:8px}.ib-live-arena .ib-ko{font-size:58px}.ib-console{padding:10px}.ib-question{grid-template-columns:80px 1fr;gap:8px;margin-bottom:9px}.ib-question-art svg{height:56px}.ib-console .ib-prompt{font-size:12px}.ib-console .ib-time{font-size:9px}.ib-console .ib-card{min-height:50px;font-size:18px!important}.ib-console .ib-sentence{font-size:16px;padding:8px}.ib-console .ib-slot{font-size:15px;min-height:38px;min-width:60px}.ib-console .ib-slot[data-kind="second"]{min-width:82px}.ib-console .ib-console-top{font-size:10px}.ib-live-arena .ib-fight-cutin big{font-size:27px}}
    @media(max-height:650px){.ib-live-arena .ib-fight-stage{height:105px}.ib-live-arena .ib-combatant{width:78px}.ib-live-arena .ib-fight-hud{padding:5px 10px}.ib-live-arena .ib-fight-hud span{display:none}.ib-live-arena .ib-neon-sign{display:none}.ib-live-arena .ib-fight-callout strong{font-size:22px}.ib-live-arena .ib-ko{font-size:50px}.ib-live-arena .ib-round-badge{font-size:18px}}
    @media(prefers-reduced-motion:reduce){.ib-live-arena *{animation:none!important;transition:none!important}.ib-live-arena .ib-fight-callout{opacity:1}.ib-live-arena .ib-idle .ib-fight-callout{display:none}}
    `;

    const comboStyle = `
    #view-infinitive .ib-card{font-size:clamp(12px,2.8vw,18px)!important;overflow-wrap:anywhere;padding:8px 4px}
    #view-infinitive mark{background:#ffe09a;color:#35260b;border-radius:4px;padding:1px 3px}
    .ib-last-answer{border-top:1px solid #756249;margin-top:6px;padding-top:6px;font-size:13px}.ib-last-answer small{display:block;margin-top:4px}.ib-next-hand{display:flex;align-items:center;justify-content:center;font-size:12px;color:#b9c8db;min-height:70px}

    .ib-live-arena .ib-fight{--windup:0s;--impact:.08s}
    .ib-live-arena .ib-connected .ib-player,.ib-live-arena .ib-guarded .ib-player{animation-duration:.32s}
    .ib-live-arena .ib-player .ib-arm-front{animation-duration:.32s}
    .ib-live-arena .ib-fight-callout{animation-duration:.48s}
    .ib-live-arena .ib-fight-cutin{animation-duration:.38s;pointer-events:none}
    .ib-live-arena .ib-ko{animation-delay:.1s}
    .ib-received .ib-rival{animation:ib-enemy-rush .38s both}
    .ib-received .ib-player{animation:ib-recoil .4s .07s both}
    .ib-received .ib-contact{right:auto;left:24%}
    .ib-received .ib-wave{display:none}
    .ib-received .ib-fight-callout strong{color:#ff8299}
    .ib-received .ib-fight-stage{animation:ib-stage-hit .24s both}
    .ib-danger{padding:8px 12px;background:#141b30;color:#ffb9ca;font-size:12px}
    .ib-enemy-track{height:7px;background:#343047;border-radius:4px;overflow:hidden;margin-top:6px}
    .ib-enemy-track i{display:block;height:100%;width:100%;transform-origin:left;background:linear-gradient(90deg,#c34c90,#ff9363)}
    .ib-threat .ib-rival{filter:drop-shadow(0 0 14px #ff386c)}
    .ib-console .ib-feedback{min-height:42px;margin:6px 0;padding:8px;font-size:12px}
    .ib-card[aria-pressed="true"]:after{content:'HIT!'}
    .ib-speed{display:flex;justify-content:center;gap:8px;margin:16px 0}
    .ib-speed button{padding:10px;border:2px solid #aaa0d4;border-radius:10px}
    .ib-speed button[aria-pressed="true"]{background:#6254bd;color:#fff}
    .ib-paused{text-align:center;padding:10px}
    @keyframes ib-enemy-rush{35%{transform:translateX(-95%)}65%{transform:translateX(-85%)}100%{transform:none}}
    @media(prefers-reduced-motion:reduce){#view-infinitive .ib-fight *{animation:none!important}.ib-fight:not(.ib-idle) .ib-fight-callout,.ib-ko{opacity:1}}
    `;
    let run=null, active=false, paused=false, speed='normal', frame=null, lastTime=null, effectUntil=0;
    const root=()=>document.getElementById('view-infinitive');
    const button=(action,label)=>`<button type="button" class="ib-primary" data-action="${action}">${label}</button>`;
    function stopClock() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame=null; lastTime=null;
    }
    function canTick() { return active && !paused && run && !run.finished && !document.hidden; }
    function syncClock() {
        if (!canTick() || frame !== null) return;
        lastTime=performance.now();
        const tick=now=>{
            frame=null;
            if (!canTick()) { lastTime=null; return; }
            const hit=advance(run,Math.max(0,now-lastTime)); lastTime=now;
            if (hit) {
                effectUntil=now+480;
                if (run.finished) { render(); return; }
                renderConsole(); renderArena(false);
            }
            if (effectUntil && now>=effectUntil) { effectUntil=0; renderArena(true); }
            paintCharge();
            frame=requestAnimationFrame(tick);
        };
        frame=requestAnimationFrame(tick);
    }
    function renderArena(idle=true) {
        const arena=root()?.querySelector('.ib-live-arena');
        if (arena) arena.innerHTML=battleScene(run,idle);
    }
    function paintCharge() {
        const bar=root()?.querySelector('.ib-enemy-track i');
        if (bar) bar.style.transform=`scaleX(${run.charge/run.interval})`;
        root()?.querySelector('.ib-live-arena')?.classList.toggle('ib-threat',run.charge/run.interval>.75);
    }
    function renderConsole() {
        const panel=root()?.querySelector('.ib-console');
        if (!panel) return;
        const q=run.deck[run.index];
        const hand=(kind,label,values)=>`<div><div class="ib-hand-label">${label}</div><div class="ib-cards">${values.map(v=>`<button type="button" class="ib-card" data-action="select" data-kind="${kind}" data-value="${v}" aria-pressed="${run[kind]===v}" ${paused || (kind==='first' ? !!run.first : !run.first) ? 'disabled' : ''}>${v}</button>`).join('')}</div></div>`;
        panel.innerHTML=`<div class="ib-console-top"><span>第${run.index+1}問 ・ ${run.combo} COMBO ・ ${run.damage} DAMAGE</span><button type="button" class="ib-link" data-action="pause">${paused?'再開':'一時停止'}</button></div>
        <div class="ib-question"><div class="ib-question-art">${illustration(q)}</div><div><span class="ib-time">${esc(q.usage)}</span><p class="ib-prompt">${esc(q.ja)}</p></div></div>
        <div class="ib-sentence"><span>${esc(q.subject)}</span><span class="ib-slot">${run.first||'①'}</span><span class="ib-slot">${run.second||'②'}</span><span>${esc(q.tail)}</span></div>
        <div class="ib-hand">${hand('first','① 意味に合うカード → ジャブ',q.firstCards)}${run.first ? hand('second','② 文を完成 → 強攻撃',q.secondCards) : '<div class="ib-next-hand">①を正解すると、②のカードが出現！</div>'}</div>
        <div class="ib-feedback" role="status" aria-live="polite">${esc(run.feedback)}${run.completed ? `<div class="ib-last-answer">${answerHTML(run.completed)}<small>${esc(run.completed.usage)}：${esc(run.completed.explanation)}</small></div>` : ''}</div>
        ${paused?'<div class="ib-paused">一時停止中<button type="button" class="ib-link" data-action="menu">遊び方に戻る</button></div>':''}`;
    }
    function render() {
        const host=root(); if (!host) return;
        if (!run) {
            host.innerHTML=`<div class="ib-shell ib-hero"><p class="ib-eyebrow">INFINITIVE / COMBO BATTLE</p><h2 class="ib-title">不定詞バトル</h2><p class="ib-muted">日本語の意味に合う２つのまとまりで英文を完成！</p><div class="ib-demo">${illustration(questions[0])}</div><div class="ib-demo-pair"><span class="ib-mini">be</span><span class="ib-mini">a cook</span></div><div class="ib-rules"><p><strong>① 意味に合うカードでジャブ</strong>　正解すると相手の攻撃を足止め！</p><p><strong>② 続きのまとまりで強攻撃</strong>　正解ですぐ次の問題。演出中も選べる！</p><p><strong>③ 相手の攻撃に注意</strong>　赤いゲージが満タンで被弾。自分か相手のHPが０になるまでバトル継続！ 自分は３回被弾で敗北。</p><p>相手のHPは1800。ジャブ20・強攻撃100・６枚連続正解で必殺技200ダメージ！ 名詞的用法・形容詞的用法の全24問から出題。ミスしてもすぐ選び直せます。</p></div><p>相手の攻撃速度</p><div class="ib-speed">${[['slow','ゆっくり'],['normal','ふつう'],['fast','速い']].map(([key,label])=>`<button type="button" data-action="speed" data-value="${key}" aria-pressed="${speed===key}">${label}</button>`).join('')}</div>${button('start','バトル開始！')}</div>`;
        } else if (run.finished) {
            host.innerHTML=`<div class="ib-shell ib-result"><p class="ib-eyebrow">${run.won?'VICTORY':'TRY AGAIN'}</p><h2 class="ib-title">${run.won?'相手のHPが０！ バトル勝利！':'今回は相手の勝ち。もう一度！'}</h2><p class="ib-score">${run.hits.length} 文完成 ・ 最大 ${run.bestCombo} COMBO</p><p>${run.damage} DAMAGE ・ 残りHP ${run.hp} / 3</p><p class="ib-muted">英文一発正解 ${run.perfect} 問</p><ol class="ib-review">${run.deck.slice(0,run.index+1).map((q,i)=>`<li>${i<run.hits.length?'✓':'復習'} ${answerHTML(q)}<small>${esc(q.ja)}<br>${esc(q.usage)}：${esc(q.explanation)}</small></li>`).join('')}</ol>${button('start','もう一度挑戦')}<div style="margin-top:14px">${button('menu','速さ・遊び方を変更')}</div></div>`;
            stopClock();
        } else {
            host.innerHTML='<div class="ib-shell ib-battle-layout"><div class="ib-live-arena" aria-label="対戦ステージ"></div><div class="ib-danger">相手の攻撃まで <span>— 満タンで被弾！</span><div class="ib-enemy-track" aria-hidden="true"><i></i></div></div><div class="ib-console"></div></div>';
            renderArena(); renderConsole(); paintCharge();
        }
        syncClock();
    }
    function act(b) {
        if (!active || !b || b.disabled || !root().contains(b)) return;
        const {action,kind,value}=b.dataset;
        if (action==='select') {
            if (paused || document.hidden) return;
            const result=select(run,kind,value);
            if (!result) return;
            if (run.finished) { render(); }
            else {
                renderConsole(); renderArena(false); paintCharge();
                effectUntil=performance.now()+480;
                root().querySelector(`[data-action="select"][data-kind="${run.first?'second':'first'}"]:not(:disabled)`)?.focus({preventScroll:true});
            }
        } else if (action==='start') { stopClock(); run=createRun(Math.random,speed); paused=false; effectUntil=0; render(); }
        else if (action==='menu') { stopClock(); run=null; paused=false; effectUntil=0; render(); }
        else if (action==='speed' && !run && speeds[value]) { speed=value; render(); }
        else if (action==='pause') { paused=!paused; stopClock(); renderConsole(); syncClock(); }
    }
    if (typeof document!=='undefined') {
        if (!document.getElementById('infinitive-battle-style')) {
            const css=document.createElement('style'); css.id='infinitive-battle-style'; css.textContent=style+liveStyle+comboStyle; document.head.appendChild(css);
        }
        root()?.addEventListener('pointerdown',event=>{
            const b=event.target.closest('button[data-action="select"]');
            if (!b || event.button!==0 || event.isPrimary===false) return;
            event.preventDefault(); act(b);
        });
        root()?.addEventListener('keydown',event=>{
            const b=event.target.closest('button[data-action="select"]');
            if (!b || !['Enter',' '].includes(event.key)) return;
            event.preventDefault(); if (!event.repeat) act(b);
        });
        root()?.addEventListener('click',event=>{
            const b=event.target.closest('button[data-action]');
            if (b?.dataset.action==='select' && event.detail>0) return;
            act(b);
        });
        document.addEventListener('visibilitychange',()=>{ stopClock(); if (!document.hidden) syncClock(); });
    }
    return {
        open(){active=true;effectUntil=0;render();},
        leave(){active=false;stopClock();},
        exportSource:()=>`const InfinitiveBattle = (${createInfinitiveBattle.toString()})();`,
        rules:{answerHTML,questions,createRun,select,advance,speeds,illustration,fighterSVG,battleScene}
    };
})();
if (typeof module!=='undefined' && module.exports) module.exports=InfinitiveBattle;
