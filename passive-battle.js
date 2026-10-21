/* Self-contained, illustrated passive-voice card battle. */
const PassiveBattle = (function createPassiveBattle() {
    'use strict';
    const questions = [
        {id:1, subject:'The car', be:'is', verb:'washed', choices:['wash','washes','washed'], tail:'every Sunday.', ja:'その車は毎週日曜日に洗われます。', time:'毎週日曜日（いつものこと）', number:'The car は１台', scene:'car', plural:false},
        {id:2, subject:'The flowers', be:'are', verb:'watered', choices:['water','waters','watered'], tail:'every morning.', ja:'その花々は毎朝水をやってもらいます。', time:'毎朝（いつものこと）', number:'The flowers は複数', scene:'flowers', plural:true},
        {id:3, subject:'The window', be:'was', verb:'broken', choices:['break','broke','broken'], tail:'yesterday.', ja:'その窓は昨日割られました。', time:'昨日（過去）', number:'The window は１つ', scene:'window', plural:false},
        {id:4, subject:'The letters', be:'were', verb:'written', choices:['write','wrote','written'], tail:'last night.', ja:'その手紙は昨夜書かれました。', time:'昨夜（過去）', number:'The letters は複数', scene:'letter', plural:true},
        {id:5, subject:'A cake', be:'is', verb:'made', choices:['make','makes','made'], tail:'here every morning.', ja:'ここでは毎朝ケーキが１つ作られます。', time:'毎朝（いつものこと）', number:'A cake は１つ', scene:'cake', plural:false},
        {id:6, subject:'The doors', be:'are', verb:'painted', choices:['paint','paints','painted'], tail:'every year.', ja:'そのドアは毎年塗られます。', time:'毎年（いつものこと）', number:'The doors は複数', scene:'door', plural:true},
        {id:7, subject:'The cake', be:'was', verb:'made', choices:['make','makes','made'], tail:'by Tom yesterday.', ja:'そのケーキは昨日トムによって作られました。', time:'昨日（過去）', number:'The cake は１つ', scene:'cake', plural:false},
        {id:8, subject:'The cars', be:'were', verb:'washed', choices:['wash','washes','washed'], tail:'yesterday.', ja:'その車は昨日洗われました。', time:'昨日（過去）', number:'The cars は複数', scene:'car', plural:true},
        {id:9, subject:'A letter', be:'is', verb:'written', choices:['write','wrote','written'], tail:'by Emma every week.', ja:'毎週エマによって手紙が１通書かれます。', time:'毎週（いつものこと）', number:'A letter は１通', scene:'letter', plural:false},
        {id:10, subject:'The cakes', be:'are', verb:'made', choices:['make','makes','made'], tail:'here every day.', ja:'そのケーキはここで毎日作られます。', time:'毎日（いつものこと）', number:'The cakes は複数', scene:'cake', plural:true},
        {id:11, subject:'The door', be:'was', verb:'painted', choices:['paint','paints','painted'], tail:'last week.', ja:'そのドアは先週塗られました。', time:'先週（過去）', number:'The door は１つ', scene:'door', plural:false},
        {id:12, subject:'The flowers', be:'were', verb:'watered', choices:['water','waters','watered'], tail:'yesterday.', ja:'その花々は昨日水をやってもらいました。', time:'昨日（過去）', number:'The flowers は複数', scene:'flowers', plural:true}
        ,{"id":13,"subject":"The car","be":"was","verb":"cleaned","choices":["clean","cleans","cleaned"],"tail":"yesterday.","ja":"その車は昨日きれいにされました。","time":"昨日（過去）","number":"The car は１台","scene":"car","plural":false},
        {"id":14,"subject":"The cars","be":"are","verb":"cleaned","choices":["clean","cleans","cleaned"],"tail":"every morning.","ja":"その車々は毎朝きれいにされます。","time":"毎朝（いつものこと）","number":"The cars は複数","scene":"car","plural":true},
        {"id":15,"subject":"The car","be":"is","verb":"used","choices":["use","uses","used"],"tail":"every day.","ja":"その車は毎日使われます。","time":"毎日（いつものこと）","number":"The car は１台","scene":"car","plural":false},
        {"id":16,"subject":"The cars","be":"were","verb":"used","choices":["use","uses","used"],"tail":"last weekend.","ja":"その車々は先週末使われました。","time":"先週末（過去）","number":"The cars は複数","scene":"car","plural":true},
        {"id":17,"subject":"The letter","be":"was","verb":"sent","choices":["send","sent","sending"],"tail":"yesterday.","ja":"その手紙は昨日送られました。","time":"昨日（過去）","number":"The letter は１通","scene":"letter","plural":false},
        {"id":18,"subject":"The letters","be":"are","verb":"sent","choices":["send","sent","sending"],"tail":"every Friday.","ja":"その手紙は毎週金曜日に送られます。","time":"毎週金曜日（いつものこと）","number":"The letters は複数","scene":"letter","plural":true},
        {"id":19,"subject":"The letter","be":"is","verb":"delivered","choices":["deliver","delivers","delivered"],"tail":"every Monday.","ja":"その手紙は毎週月曜日に配達されます。","time":"毎週月曜日（いつものこと）","number":"The letter は１通","scene":"letter","plural":false},
        {"id":20,"subject":"The letters","be":"were","verb":"delivered","choices":["deliver","delivers","delivered"],"tail":"yesterday.","ja":"その手紙は昨日配達されました。","time":"昨日（過去）","number":"The letters は複数","scene":"letter","plural":true},
        {"id":21,"subject":"The cake","be":"was","verb":"eaten","choices":["eat","ate","eaten"],"tail":"by Ken yesterday.","ja":"そのケーキは昨日ケンに食べられました。","time":"昨日（過去）","number":"The cake は１つ","scene":"cake","plural":false},
        {"id":22,"subject":"The cakes","be":"are","verb":"sold","choices":["sell","sold","selling"],"tail":"here every day.","ja":"そのケーキはここで毎日売られます。","time":"毎日（いつものこと）","number":"The cakes は複数","scene":"cake","plural":true},
        {"id":23,"subject":"A cake","be":"is","verb":"baked","choices":["bake","bakes","baked"],"tail":"every morning.","ja":"ケーキが毎朝１つ焼かれます。","time":"毎朝（いつものこと）","number":"A cake は１つ","scene":"cake","plural":false},
        {"id":24,"subject":"The cakes","be":"were","verb":"baked","choices":["bake","bakes","baked"],"tail":"last night.","ja":"そのケーキは昨夜焼かれました。","time":"昨夜（過去）","number":"The cakes は複数","scene":"cake","plural":true},
        {"id":25,"subject":"The flowers","be":"are","verb":"grown","choices":["grow","grew","grown"],"tail":"here every year.","ja":"その花々は毎年ここで育てられます。","time":"毎年（いつものこと）","number":"The flowers は複数","scene":"flowers","plural":true},
        {"id":26,"subject":"The flowers","be":"were","verb":"picked","choices":["pick","picks","picked"],"tail":"yesterday.","ja":"その花々は昨日摘まれました。","time":"昨日（過去）","number":"The flowers は複数","scene":"flowers","plural":true},
        {"id":27,"subject":"The door","be":"is","verb":"opened","choices":["open","opens","opened"],"tail":"at nine every morning.","ja":"そのドアは毎朝９時に開けられます。","time":"毎朝（いつものこと）","number":"The door は１つ","scene":"entrance","plural":false},
        {"id":28,"subject":"The doors","be":"were","verb":"closed","choices":["close","closes","closed"],"tail":"last night.","ja":"そのドアは昨夜閉められました。","time":"昨夜（過去）","number":"The doors は複数","scene":"entrance","plural":true},
        {"id":29,"subject":"The book","be":"was","verb":"written","choices":["write","wrote","written"],"tail":"by Emma last year.","ja":"その本は昨年エマによって書かれました。","time":"昨年（過去）","number":"The book は１冊","scene":"book","plural":false},
        {"id":30,"subject":"The books","be":"are","verb":"used","choices":["use","uses","used"],"tail":"in class every day.","ja":"その本は毎日授業で使われます。","time":"毎日（いつものこと）","number":"The books は複数","scene":"book","plural":true},
        {"id":31,"subject":"The book","be":"is","verb":"sold","choices":["sell","sold","selling"],"tail":"at this shop every day.","ja":"その本は毎日この店で売られます。","time":"毎日（いつものこと）","number":"The book は１冊","scene":"book","plural":false},
        {"id":32,"subject":"The books","be":"were","verb":"bought","choices":["buy","bought","buying"],"tail":"yesterday.","ja":"その本は昨日買われました。","time":"昨日（過去）","number":"The books は複数","scene":"book","plural":true},
        {"id":33,"subject":"The shirt","be":"is","verb":"washed","choices":["wash","washes","washed"],"tail":"every Sunday.","ja":"そのシャツは毎週日曜日に洗われます。","time":"毎週日曜日（いつものこと）","number":"The shirt は１枚","scene":"shirt","plural":false},
        {"id":34,"subject":"The shirts","be":"are","verb":"made","choices":["make","makes","made"],"tail":"here every day.","ja":"そのシャツは毎日ここで作られます。","time":"毎日（いつものこと）","number":"The shirts は複数","scene":"shirt","plural":true},
        {"id":35,"subject":"The shirt","be":"was","verb":"bought","choices":["buy","bought","buying"],"tail":"last week.","ja":"そのシャツは先週買われました。","time":"先週（過去）","number":"The shirt は１枚","scene":"shirt","plural":false},
        {"id":36,"subject":"The shirts","be":"were","verb":"washed","choices":["wash","washes","washed"],"tail":"yesterday.","ja":"そのシャツは昨日洗われました。","time":"昨日（過去）","number":"The shirts は複数","scene":"shirt","plural":true}
    ];
    const beChoices = {is:['is','are','was'], are:['is','are','were'], was:['is','was','were'], were:['are','was','were']};
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
        return {deck:shuffle(picked,random).map(q=>({...q,beCards:shuffle(beChoices[q.be],random),verbCards:shuffle(q.choices,random)})),
            index:0,be:null,verb:null,finished:false,won:false,hp:3,enemyHp:1800,enemyMaxHp:1800,random,charge:0,interval:speeds[speed] || speeds.normal,
            combo:0,bestCombo:0,damage:0,perfect:0,hits:[],mistakes:0,feedback:'まずはbe動詞！',lastAttack:null};
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
        if (!run || run.finished || !['be','verb'].includes(kind)) return false;
        const q = run.deck[run.index];
        if ((kind === 'be' && run.be) || (kind === 'verb' && !run.be)) return false;
        if (!(kind === 'be' ? q.beCards : q.verbCards).includes(value)) return false;
        if (value !== q[kind]) {
            run.mistakes++; run.combo = 0;
            run.lastAttack = {grade:'miss',damage:0};
            run.feedback = kind === 'be' ? q.number+'・'+q.time+' → '+q.be+' を選ぼう！' : '過去分詞は '+q.verb+'。もう一度！';
            return 'miss';
        }
        run[kind] = value;
        run.combo++; run.bestCombo = Math.max(run.bestCombo,run.combo);
        const special = run.combo % 6 === 0;
        const enemyBefore = run.enemyHp;
        const damage = Math.min(run.enemyHp,special ? 200 : kind === 'be' ? 20 : 100);
        run.enemyHp -= damage;
        run.damage += damage;
        run.lastAttack = {grade:special ? 'perfect' : 'hit',damage,kind,enemyBefore};
        if (run.enemyHp === 0) { run.finished=true; run.won=true; }
        if (kind === 'be') {
            run.charge = Math.max(0,run.charge-run.interval*.22);
            run.feedback = 'JAB! 攻撃を足止め！ 次は過去分詞！';
            return 'jab';
        }
        run.charge = 0;
        run.hits.push(run.mistakes === 0);
        if (!run.mistakes) run.perfect++;
        run.feedback = q.subject+' '+q.be+' '+q.verb+' '+q.tail+' ✓';
        if (!run.finished) {
            if (run.index === run.deck.length-1) {
                // Refill indefinitely; never repeat the last question immediately.
                const batch=shuffle(questions,run.random);
                if (batch[0].id===q.id) [batch[0],batch[1]]=[batch[1],batch[0]];
                run.deck.push(...batch.map(item=>({...item,beCards:shuffle(beChoices[item.be],run.random),verbCards:shuffle(item.choices,run.random)})));
            }
            run.index++; run.be=null; run.verb=null; run.mistakes=0;
        }
        return special ? 'special' : 'strike';
    }
    const esc = text => String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    // Small native SVG illustrations stay sharp on phones and are included in code export.
    function illustration(q) {
        const shapes = {
            entrance:'<rect x="45" y="20" width="135" height="169" rx="5" fill="#b5cedc"/><rect x="57" y="32" width="111" height="157" fill="#f6c788"/><rect x="70" y="45" width="85" height="60" fill="#bce6ef"/><path d="M112 45v60M70 76h85"/><circle cx="149" cy="130" r="6" fill="#827156"/>',
            book:'<path d="M43 40h126l15 18v127H55l-12-16Z" fill="#807bd4"/><path d="M55 169h129v16H55q-15-8 0-16Z" fill="#fff7df"/><path d="M58 41v127" stroke="#d4ccff" stroke-width="6"/><rect x="79" y="65" width="76" height="65" rx="7" fill="#f7e7b0"/><path d="M91 84h51m-51 15h51m-51 15h30" stroke="#9c875a" stroke-width="4"/>',
            shirt:'<path d="m70 35-43 33 22 34 23-15v96h85V87l23 15 23-34-44-33-27 14h-34Z" fill="#89d9e1"/><path d="M86 37q28 47 58 0" fill="#e7fbff"/><path d="M84 171h60M52 73l13 18m98 0 14-18" stroke="#43a3b5" stroke-width="5"/><path d="M123 89h24v25h-24Z" fill="#d4f1ee"/>',
            car:'<path d="M38 112 57 77h100l25 35 18 8v40H22v-39Z" fill="#68c7cd"/><path d="m69 84-14 28h108l-17-28Z" fill="#e8f8ff"/><path d="M109 85v26"/><circle cx="60" cy="160" r="19" fill="#334155"/><circle cx="164" cy="160" r="19" fill="#334155"/><circle cx="60" cy="160" r="7" fill="white"/><circle cx="164" cy="160" r="7" fill="white"/><path d="M30 128h18m126 0h15" stroke="#fff7d6" stroke-width="8"/><g fill="white" stroke="#93c5fd"><circle cx="55" cy="63" r="13"/><circle cx="88" cy="51" r="9"/><circle cx="151" cy="63" r="15"/><circle cx="179" cy="44" r="8"/></g><path d="m166 87 17-18 22 17-17 18Z" fill="#ffcf66"/>',
            window:'<rect x="42" y="27" width="138" height="146" rx="6" fill="#f4c58c"/><rect x="53" y="38" width="116" height="124" fill="#c9eef7"/><path d="M111 38v124M53 100h116" stroke="#a87552" stroke-width="7"/><path d="m134 50-14 24 19 13-23 27 24 14-8 25" stroke="#53677c" fill="none"/><path d="m139 87 25-9m-48 36-23 13"/><circle cx="185" cy="157" r="23" fill="#fff"/><path d="m179 135-8 16 12 13 21-4m-21 4-6 14"/>',
            cake:'<ellipse cx="112" cy="168" rx="94" ry="15" fill="#c2cce9"/><path d="M43 113h137v48c0 18-137 18-137 0Z" fill="#f5c98e"/><ellipse cx="112" cy="111" rx="69" ry="20" fill="#fff9ed"/><path d="M43 115q8 23 17 4 9 25 19 2 10 23 22 0 10 20 21 0 12 22 24-2 14 18 34-4" stroke="#f5a6b8" stroke-width="9"/><g fill="#ee728c"><path d="m81 100-12-12q10-21 24 0Z"/><path d="m143 100-12-12q10-21 24 0Z"/></g><path d="m77 78 5 8 8-8m46 0 7 8 7-8" stroke="#63a67b"/><path d="m45 49 10 31 25-10-11-30Z" fill="#fff"/><path d="m82 30 8 35m5-37 8 33m6-38 8 36" stroke="#9cacc0"/><path d="m84 27 22-7 18 12-10 34-18 3Z" fill="none"/>',
            letter:'<rect x="45" y="28" width="128" height="150" rx="9" fill="#fffdf7"/><path d="M65 60h78M65 82h69M65 105h77M65 128h54M65 149h35" stroke="#a8b4d2" stroke-width="5"/><path d="m150 137 39-92 14 6-40 93-16 12Z" fill="#ffcf66"/><path d="m189 45 5-12 14 6-5 12" fill="#f69baa"/><path d="m150 137-3 19 16-12" fill="#e0bc98"/><path d="m147 156 3-8 5 3Z" fill="#394761"/>',
            door:'<rect x="48" y="24" width="116" height="155" rx="5" fill="#e2c4a0"/><rect x="59" y="35" width="94" height="144" fill="#a9ddd3"/><path d="M64 41h84v61q-13 17-25 0-14 22-29 0-14 20-30 2Z" fill="#7476cf"/><circle cx="137" cy="122" r="5" fill="#ffcf66"/><path d="M183 66v35h-17v28" stroke="#63768a" stroke-width="6" fill="none"/><rect x="162" y="51" width="41" height="20" rx="5" fill="#7476cf"/><path d="M166 129v24" stroke="#ecaa66" stroke-width="11"/><path d="M18 147h27l-4 33H22Z" fill="#7476cf"/>',
            flowers:'<g stroke="#66a580" stroke-width="6"><path d="M48 162V90m54 72V78m55 84v-55"/><path d="m48 130-20-13m74 6 20-18m35 38 19-14"/></g><g fill="#f59bac"><circle cx="38" cy="80" r="14"/><circle cx="60" cy="80" r="14"/><circle cx="48" cy="65" r="14"/><circle cx="48" cy="92" r="14"/></g><g fill="#aaa0e9"><circle cx="91" cy="62" r="14"/><circle cx="113" cy="62" r="14"/><circle cx="102" cy="47" r="14"/><circle cx="102" cy="74" r="14"/><circle cx="147" cy="100" r="14"/><circle cx="169" cy="100" r="14"/><circle cx="157" cy="86" r="14"/><circle cx="157" cy="113" r="14"/></g><g fill="#ffdc75"><circle cx="48" cy="80" r="10"/><circle cx="102" cy="62" r="10"/><circle cx="157" cy="100" r="10"/></g><path d="M25 159h156l-13 25H39Z" fill="#d5a685"/><path d="m153 25 42 2-7 40-32-5-19-25-10-3 2-9 13 4 14 14Z" fill="#72c9d1"/><path d="M194 29q29 12-3 25" fill="none"/><path d="m128 45-4 8m11-7-3 10m-12-15-5 8" stroke="#66b9e5" stroke-width="4"/>'
        };
        const pair = q.plural && q.scene !== 'flowers';
        return `<svg viewBox="0 0 440 220" role="img" aria-label="${esc(q.ja)}" xmlns="http://www.w3.org/2000/svg"><title>${esc(q.ja)}</title><rect width="440" height="220" rx="22" fill="#f1f5fb"/><circle cx="356" cy="53" r="34" fill="#fff0c8"/><path d="M0 180Q130 156 240 183T440 177v43H0Z" fill="#dfeae8"/><g fill="none" stroke="#58677b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${pair ? `<g transform="translate(13 19) scale(.9)">${shapes[q.scene]}</g><g transform="translate(232 19) scale(.9)">${shapes[q.scene]}</g>` : `<g transform="translate(110 4)">${shapes[q.scene]}</g>`}</g></svg>`;
    }
    function monster(defeated = false) {
        return `<svg viewBox="0 0 160 130" aria-hidden="true"><path d="M24 69Q10 27 51 39L62 14 85 38Q137 20 135 68q19 36-12 45l-19-8-24 11-24-11-18 8Q6 108 24 69Z" fill="${defeated ? '#beb9db' : '#8175c4'}" stroke="#514984" stroke-width="4"/><path d="m38 48 11 11m62-12-11 12" stroke="#514984" stroke-width="4"/><g fill="#fff"><ellipse cx="58" cy="70" rx="13" ry="15"/><ellipse cx="103" cy="70" rx="13" ry="15"/></g><g fill="#35334f">${defeated ? '<path d="m51 65 13 12m0-12-13 12m45-12 13 12m0-12-13 12" stroke="#35334f" stroke-width="3"/>' : '<circle cx="62" cy="72" r="6"/><circle cx="99" cy="72" r="6"/>'}</g><path d="M68 94q12 10 24 0" fill="none" stroke="#514984" stroke-width="4"/></svg>`;
    }
    // Original vector fighters. Separate limbs allow a real wind-up / strike / recoil.
    function fighterSVG(side = 'player') {
        const enemy = side === 'enemy';
        const main = enemy ? '#d54e88' : '#26d4e2';
        const light = enemy ? '#ffadcb' : '#b4ffff';
        return `<svg viewBox="0 0 240 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><g stroke="#101526" stroke-width="4" stroke-linejoin="round"><ellipse cx="119" cy="284" rx="81" ry="9" fill="#030714" opacity=".5" stroke="none"/><g class="pb-fighter-body"><g class="pb-leg-back"><path d="m103 165-25 52-27 47 27 14 39-51 23-44Z" fill="#26334b"/><path d="m49 261 32 10-3 17H24q-3-13 25-27Z" fill="#141c2e"/><path d="m48 269 30 7" stroke="${main}" stroke-width="7"/></g><g class="pb-leg-front"><path d="m121 165 36 17-9 49 26 36-26 14-40-48 4-34-18-14Z" fill="#34465e"/><path d="m146 265 29-8 26 24-4 10h-52Z" fill="#172137"/><path d="m155 275 28 7" stroke="${main}" stroke-width="7"/></g><g class="pb-arm-back"><path d="m99 96-25-5-25 32-15-27-17 12 21 45 18 3 41-30Z" fill="${enemy ? '#74849b' : '#d99b77'}"/><path d="m16 107-5-22 14-13 16 11-7 24Z" fill="${main}"/><path d="m19 87 12 6" stroke="${light}"/></g><path d="m104 84-24 22 8 54 18 24 48-8 11-50-24-34Z" fill="${main}"/><path d="m107 91-4 37 24 22 20-49-16-13Z" fill="#17263d"/><path d="m92 112 10 47 39-7 13-31" fill="none" stroke="${light}" stroke-width="5"/><path d="m90 157 63-5 3 20-53 12Z" fill="#0d172a"/><path d="m112 160 19-2 2 13-19 2Z" fill="#f1d877"/><path d="m102 87 4-26 27-2 7 35-19 12Z" fill="${enemy ? '#74849b' : '#e9b08b'}"/><path d="m94 37 17-18 31 8 10 24-10 28-26 7-19-20Z" fill="${enemy ? '#8594ac' : '#efbb98'}"/><path d="m92 47-4-21 19-17 12 9 19-8 17 15-6 22-18-14-21 7-3 14Z" fill="#16243a"/><path d="m99 47 47-7 3 13-47 8Z" fill="${main}"/><path d="m117 51 18-3" stroke="${light}" stroke-width="4"/><path d="m134 58 9 6-10 3m-16 8 12-2" fill="none" stroke-width="2"/>${enemy ? '<path d="m103 60 38-4-2 21-21 8-13-10Z" fill="#25304a"/><path d="m117 68 15-3" stroke="#ffadc8"/>' : `<path class="pb-scarf" d="m100 48-35-3-26 12 32 2 27 3-27 9-28-4 21 18 38-19Z" fill="${main}"/>`}<g class="pb-arm-front"><path d="m146 99 21 14-9 28 27-11 10 20-39 24-21-11-6-33Z" fill="${enemy ? '#8594ac' : '#efbb98'}"/><path d="m143 99 20 8-6 23-24-8Z" fill="${main}"/><path d="m180 130 15-12 20 7 4 20-22 14-13-9Z" fill="${main}"/><path d="m197 125 6 23m-15-10 25-5" stroke="${light}" stroke-width="3"/></g><path d="m95 111 2 17m48 46-14 41" stroke="#fff" opacity=".25" fill="none"/></g></g></svg>`;
    }
    function battleScene(current, idle = false) {
        const a = current.lastAttack || {grade:'hit',damage:0,critical:false};
        const miss = a.grade === 'miss';
        const special = !idle && a.grade === 'perfect';
        const ko = current.won;
        const remaining = current.enemyHp/current.enemyMaxHp*100;
        const before = (idle ? current.enemyHp : a.enemyBefore ?? current.enemyHp)/current.enemyMaxHp*100;
        const move = miss ? 'GUARD BREAK FAILED' : special ? 'THUNDER DRIVE' : a.grade === 'good' ? 'SONIC BURST' : 'IMPACT STRIKE';
        return `<div class="pb-fight ${special ? 'pb-super' : ''} ${idle ? 'pb-idle' : a.grade === 'enemy' ? 'pb-received' : miss ? 'pb-guarded' : 'pb-connected'} ${ko ? 'pb-knockout' : ''}" style="--bar-before:${before}%;--bar-after:${remaining}%"><div class="pb-fight-hud"><div><b>01 / AZURE</b><span>HP ${current.hp} / 3</span><div class="pb-player-meter" style="background:linear-gradient(90deg,#38dace ${current.hp/3*100}%,#192237 0)"></div></div><div class="pb-round-badge">${current.index+1}<small>ROUND</small></div><div class="pb-foe-hud"><b>VOLT / 02</b><span>HP ${current.enemyHp} / ${current.enemyMaxHp}</span><div class="pb-foe-meter"><i></i><em></em></div></div></div><div class="pb-fight-stage"><div class="pb-moon"></div><div class="pb-city"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="pb-neon-sign">PASSIVE<br><b>ARENA</b></div><div class="pb-floor"></div><div class="pb-stage-speed"></div><div class="pb-stage-flash"></div><div class="pb-combatant pb-player"><div class="pb-fighter-pose">${fighterSVG()}</div></div><div class="pb-combatant pb-rival"><div class="pb-fighter-pose">${fighterSVG('enemy')}</div></div><div class="pb-wave"><i></i><i></i><i></i></div><div class="pb-contact"><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="pb-floor-dust"></div>${special ? `<div class="pb-fight-cutin"><div>${fighterSVG()}</div><span>LIMIT RELEASE<big>THUNDER<br>DRIVE</big></span></div>` : ''}<div class="pb-fight-callout"><small>${a.grade === 'enemy' ? '相手の攻撃！' : miss ? 'もう一度！' : a.kind === 'be' ? '攻撃を足止め！' : '英文完成！'}</small><strong>${a.grade === 'enemy' ? 'DAMAGE!' : miss ? 'GUARD!' : special ? 'SUPER!' : a.kind === 'be' ? 'JAB!' : 'STRIKE!'}</strong>${miss ? '' : `<span>${a.damage}<small> DAMAGE</small></span>`}</div>${ko ? '<div class="pb-ko">K.O.<small>OPPONENT DEFEATED</small></div>' : ''}</div></div>`;
    }
    const style = `
    #view-passive{color:#26344b;max-width:760px;margin:auto;font-family:inherit}
    #view-passive *{box-sizing:border-box} #view-passive button{touch-action:manipulation;font:inherit;font-weight:800}
    #view-passive button:focus-visible{outline:3px solid #efac32;outline-offset:4px}
    .pb-shell{background:#f7f8ff;border:1px solid #e0e4f1;border-radius:22px;padding:18px}
    .pb-eyebrow{font-size:11px;letter-spacing:.16em;font-weight:900;color:#6763a3}.pb-title{font-size:clamp(21px,4vw,30px);font-weight:900;margin:6px 0}
    .pb-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}.pb-muted{font-size:12px;color:#67758a;line-height:1.7}
    .pb-link{font-size:12px!important;color:#686197;padding:9px;border-radius:10px;background:#edeaf9}
    .pb-primary{display:block;width:100%;padding:13px 16px;border-radius:14px;background:#6254bd;color:white;box-shadow:0 4px 0 #403584;transition:transform .15s,background .15s}
    .pb-primary:active:not(:disabled){transform:translateY(3px);box-shadow:0 1px 0 #403584}.pb-primary:disabled{background:#d7d9e6;color:#737a90;box-shadow:0 3px 0 #c4c9d8}
    .pb-hero{text-align:center;padding:8px 0 18px}.pb-demo{max-width:380px;margin:16px auto}.pb-demo svg{width:100%;max-height:185px}
    .pb-demo-pair{display:flex;justify-content:center;gap:10px;margin:-12px auto 16px;position:relative}.pb-mini{padding:12px 22px;border:2px solid #c3bbed;border-radius:12px;background:#f3efff;color:#6756b3;font-size:22px;font-weight:900;box-shadow:0 5px 0 #ded8f2;transform:rotate(-5deg)}.pb-mini:last-child{background:#ebf8f6;border-color:#a6d8cf;color:#267c76;transform:rotate(5deg)}
    .pb-rules{display:grid;gap:10px;text-align:left;margin:20px 0;padding:16px;background:#fff;border-radius:16px;font-size:13px;line-height:1.6}.pb-rules strong{color:#6254bd}
    .pb-arena{background:linear-gradient(120deg,#29294c,#484270);color:#fff;border-radius:17px;padding:12px 16px;display:flex;align-items:center;gap:14px;position:relative;overflow:hidden;min-height:106px}
    .pb-enemy{width:90px;flex-shrink:0}.pb-enemy svg{width:100%;height:78px}.pb-arena-info{flex:1;min-width:0}.pb-enemy-name{font-size:13px;font-weight:900}.pb-shields{display:flex;gap:5px;margin:9px 0}.pb-shield{height:9px;flex:1;border-radius:7px;background:#a99be8;transition:background .3s}.pb-shield.pb-broken{background:#ffffff24}.pb-arena small{color:#dfdaff;font-size:11px}.pb-combo{font-size:12px;font-weight:900;color:#ffe7a0;margin-top:6px}
    .pb-scene{margin:14px 0 10px;position:relative}.pb-scene svg{width:100%;max-height:210px;border-radius:18px;background:#f1f5fb}.pb-time{display:inline-block;background:#fff1d3;color:#805f1c;padding:6px 12px;border-radius:9px;font-size:12px;font-weight:800;margin-bottom:8px}
    .pb-prompt{text-align:center;font-size:14px;font-weight:700;margin:8px 0 12px}.pb-sentence{display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:8px;padding:16px 10px;background:white;border:1px solid #e2e5f0;border-radius:15px;font-size:clamp(16px,3vw,21px);font-weight:800;line-height:1.6}
    .pb-slot{min-width:70px;min-height:44px;border:2px dashed #c3bbed;border-radius:10px;color:#6756b3;background:#f3efff;padding:4px 10px;transition:transform .18s}.pb-slot[data-kind="verb"]{min-width:98px;background:#ebf8f6;color:#267c76;border-color:#a6d8cf}.pb-slot.pb-filled{border-style:solid;box-shadow:0 3px 0 #dfd9f1;animation:pb-place .25s ease-out}
    .pb-hand{margin:15px 0 18px}.pb-hand-label{display:flex;justify-content:space-between;align-items:center;margin:12px 0 8px;font-size:12px;font-weight:900;color:#6756b3}.pb-hand-label.pb-teal{color:#267c76}.pb-hand-label small{font-size:10px;font-weight:500;color:#67758a}.pb-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
    .pb-card{min-height:68px;border:2px solid #c3bbed;border-radius:13px;background:linear-gradient(155deg,#fff,#efebfc);color:#6756b3;box-shadow:0 5px 0 #ded8f2;font-size:clamp(17px,3.5vw,24px)!important;transition:transform .18s,box-shadow .18s,opacity .18s;position:relative;padding:10px 3px}
    .pb-card[data-kind="verb"]{background:linear-gradient(155deg,#fff,#e4f5f0);border-color:#a6d8cf;color:#267c76;box-shadow:0 5px 0 #cbe6e0}.pb-card[aria-pressed="true"]{transform:translateY(-5px);outline:2px solid currentColor;outline-offset:2px;box-shadow:0 8px 12px #4b3b6726}.pb-card[aria-pressed="true"]:after{content:'セット中';position:absolute;bottom:1px;left:0;right:0;font-size:9px;font-weight:700}.pb-card:disabled{opacity:.48}.pb-card:disabled[aria-pressed="true"]{opacity:1}
    .pb-feedback{font-size:13px;line-height:1.8;border-radius:12px;padding:12px;margin:14px 0;background:#fff2da;color:#775722}.pb-feedback.pb-success{background:#e7f5ed;color:#236d4e}.pb-feedback strong{display:block;font-size:16px}.pb-answer{font-size:16px;font-weight:900;overflow-wrap:anywhere}.pb-ready{text-align:center;font-size:12px;color:#7361b2;font-weight:800;min-height:22px;margin-bottom:6px}
    .pb-hit .pb-enemy{animation:pb-hit .5s ease-in-out}.pb-critical .pb-enemy{animation:pb-hit .65s ease-in-out}.pb-critical:after{content:'✦';position:absolute;left:34px;top:4px;color:#ffe08a;font-size:80px;pointer-events:none;animation:pb-spark .7s both}.pb-fusion .pb-slot{animation:pb-fuse .7s ease-in-out}
    .pb-result{text-align:center;padding:15px 0}.pb-result-art{position:relative;max-width:240px;margin:0 auto}.pb-result-art svg{height:145px;margin:auto}.pb-stars{color:#c08219;letter-spacing:5px;font-size:31px;margin:10px 0}.pb-score{font-size:18px;font-weight:900;margin:8px}.pb-review{text-align:left;margin:18px 0;display:grid;gap:8px}.pb-review li{padding:12px;background:#fff;border:1px solid #e1e4ef;border-radius:12px;font-size:13px;line-height:1.7}.pb-review b{color:#6254bd}.pb-review small{display:block;color:#67758a}.pb-ultimate .pb-result-art:after{content:'⚡';position:absolute;inset:-5px 0 0;font-size:125px;color:#ffcc55;text-shadow:0 0 24px #fff1ae;animation:pb-lightning 1.2s both;pointer-events:none}.pb-ultimate .pb-result-art svg{animation:pb-hit .6s .3s}.pb-flight{position:fixed;z-index:100;pointer-events:none;display:flex;align-items:center;justify-content:center;background:#fff9e9;border:2px solid #b9a5e0;border-radius:12px;font-size:22px;font-weight:900;color:#6354ad;box-shadow:0 8px 20px #40358430}
    @keyframes pb-place{from{transform:translateY(-7px) scale(.95)}to{transform:none}}@keyframes pb-hit{20%,60%{transform:translateX(-8px) rotate(-7deg)}40%,80%{transform:translateX(8px) rotate(7deg)}}@keyframes pb-spark{0%{opacity:0;transform:scale(.3) rotate(0)}30%{opacity:1}100%{opacity:0;transform:scale(1.7) rotate(50deg)}}@keyframes pb-fuse{40%{transform:scale(1.12);box-shadow:0 0 20px #e8bd56}100%{transform:none}}@keyframes pb-lightning{0%{opacity:0;transform:translateY(-60px)}20%,50%{opacity:1;transform:translateY(0)}35%{opacity:.2}100%{opacity:0;transform:scale(1.4)}}
    @media(hover:hover){.pb-card:hover:not(:disabled){transform:translateY(-5px)}}@media(max-width:440px){.pb-shell{padding:12px}.pb-cards{gap:8px}.pb-scene svg{max-height:164px}.pb-sentence{gap:6px;padding:12px 6px}.pb-arena{padding:9px 12px}.pb-enemy{width:70px}.pb-card{min-height:62px}.pb-top{gap:6px}}
    @media(min-width:600px){.pb-hand{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin:6px 0 15px}.pb-scene svg{max-height:132px}.pb-arena{min-height:80px;padding:8px 14px}.pb-enemy svg{height:64px}.pb-top{margin-bottom:8px}.pb-scene{margin-top:10px}.pb-prompt{margin:7px 0}.pb-sentence{padding:10px}.pb-card{min-height:62px}}
    .pb-enemy svg{animation:pb-hover 2s ease-in-out infinite}.pb-arena:before{content:'✧     ·     ✦     ·     ✧';position:absolute;inset:3px 10px auto;text-align:right;letter-spacing:16px;color:#ffffff45;animation:pb-dust 3s ease-in-out infinite;pointer-events:none}
    .pb-battle-overlay{position:fixed;inset:0;z-index:100;background:#1c1b39d9;display:grid;place-items:center;padding:16px;pointer-events:auto;backdrop-filter:blur(5px);font-family:inherit}.pb-duel{position:relative;width:min(620px,100%);border:2px solid #c3b4ff;border-radius:26px;background:radial-gradient(ellipse at center,#544889,#262342 75%);color:white;overflow:hidden;text-align:center;padding:26px 14px 20px;box-shadow:0 0 60px #a893eb50}.pb-duel:before{content:'';position:absolute;inset:0;background:repeating-conic-gradient(from 15deg at 50% 55%,transparent 0deg 15deg,#e0c9ff0b 15deg 25deg);pointer-events:none}.pb-grade{position:relative;font-size:clamp(30px,7vw,52px);font-weight:1000;letter-spacing:.05em;color:#ffe294;text-shadow:0 4px 0 #795535;animation:pb-pop .4s both}.pb-duel-subtitle{position:relative;font-size:13px;color:#e9e1ff;font-weight:800;margin-top:4px}.pb-duel-field{position:relative;height:180px;margin:12px auto;max-width:480px}.pb-caster{position:absolute;left:2%;top:53px;font-size:58px;animation:pb-cast .8s both}.pb-target{position:absolute;right:1%;top:25px;width:130px;animation:pb-impact 1.3s both}.pb-target svg{width:100%;height:120px}.pb-projectile{position:absolute;left:17%;top:65px;width:44px;height:44px;border-radius:50%;background:#fff9cc;box-shadow:0 0 22px 10px #ffd85c, -24px 0 35px 8px #a38aff;animation:pb-projectile 1.1s both}.pb-ring{position:absolute;left:8%;top:25px;width:130px;height:130px;border:3px dashed #d5bcff;border-radius:50%;animation:pb-rune 1.2s both}.pb-impact-stars{position:absolute;right:3%;top:18px;font-size:85px;color:#ffdf77;animation:pb-explode 1.25s both}.pb-damage{position:absolute;right:8%;top:30px;font-size:36px;font-weight:1000;color:#ffe08a;text-shadow:0 3px #433356;animation:pb-damage 1.35s both}.pb-duel-sentence{position:relative;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;font-size:20px;font-weight:900}.pb-duel-sentence span{background:#ffffff18;border:1px solid #ffffff50;border-radius:10px;padding:6px 16px;animation:pb-fuse .7s both}.pb-duel-note{position:relative;font-size:12px;color:#e5dcff;margin-top:15px}.pb-duel-close{position:relative;display:block;margin:18px auto 0;font-size:12px;background:#ffffff15;color:#eee7ff;padding:7px 16px;border:1px solid #ffffff30;border-radius:20px;cursor:pointer}.pb-grade-miss .pb-grade{color:#d4c9ed;text-shadow:none}.pb-grade-miss .pb-projectile{animation:pb-fizzle 1s both;background:#b4a1cc;box-shadow:0 0 15px #beadd4}.pb-grade-miss .pb-target{animation:pb-hover 1s infinite}.pb-grade-perfect .pb-duel{border-color:#ffe293}.pb-grade-perfect .pb-projectile{width:60px;height:60px;top:55px;box-shadow:0 0 30px 18px #ffd85c,-35px 0 45px 15px #a38aff}.pb-grade-perfect .pb-target{animation:pb-impact-big 1.3s both}.pb-grade-perfect .pb-duel{animation:pb-screen-impact 1.3s both}
    @keyframes pb-hover{50%{transform:translateY(-7px) rotate(3deg)}}@keyframes pb-dust{50%{opacity:.35;transform:translateY(5px)}}@keyframes pb-charge{50%{box-shadow:0 4px 0 #403584,0 0 18px #c6a7ff;filter:brightness(1.15)}}@keyframes pb-pop{from{opacity:0;transform:scale(.5)}70%{transform:scale(1.1)}to{opacity:1;transform:scale(1)}}@keyframes pb-cast{25%{transform:translateX(-8px) rotate(-15deg)}50%{transform:translateX(10px) rotate(12deg)}to{transform:none}}@keyframes pb-rune{0%{opacity:0;transform:scale(.2) rotate(0)}35%{opacity:1}70%,100%{opacity:0;transform:scale(1.3) rotate(180deg)}}@keyframes pb-projectile{0%,20%{opacity:0;transform:scale(.2)}30%{opacity:1;transform:translateX(0) scale(1)}65%{opacity:1;left:75%;transform:scale(1.3)}75%,100%{opacity:0;left:80%;transform:scale(2)}}@keyframes pb-impact{0%,52%{transform:none}60%{transform:translate(16px,-8px) rotate(15deg)}70%{transform:translate(-9px,4px) rotate(-12deg)}85%{transform:translate(6px,0) rotate(6deg)}100%{transform:none}}@keyframes pb-impact-big{0%,52%{transform:none}65%{transform:translate(28px,-30px) rotate(30deg)}85%{transform:translate(-8px,10px) rotate(-12deg)}100%{transform:none}}@keyframes pb-explode{0%,50%{opacity:0;transform:scale(.1)}65%{opacity:1;transform:scale(1.4) rotate(30deg)}100%{opacity:0;transform:scale(2) rotate(80deg)}}@keyframes pb-damage{0%,55%{opacity:0;transform:translateY(25px) scale(.5)}70%{opacity:1;transform:translateY(-15px) scale(1.25)}100%{opacity:1;transform:translateY(-32px) scale(1)}}@keyframes pb-fizzle{0%{opacity:0;transform:scale(.2)}30%{opacity:1;transform:scale(.8)}100%{opacity:0;left:40%;transform:translateY(40px) scale(.1)}}@keyframes pb-screen-impact{0%,52%,85%,100%{transform:none}60%{transform:translateX(-7px)}67%{transform:translateX(7px)}74%{transform:translateX(-4px)}}
    @media(max-width:440px){.pb-duel-field{height:150px}.pb-target{width:95px;top:35px}.pb-target svg{height:90px}.pb-caster{font-size:45px}.pb-ring{width:100px;height:100px;top:38px}.pb-duel{padding:20px 10px 16px}.pb-duel-sentence{font-size:17px}.pb-damage{font-size:28px}.pb-impact-stars{font-size:65px}}
    .pb-battle-overlay{padding:12px;background:#070b18e8;backdrop-filter:blur(6px)}
    .pb-fight{--windup:.15s;--impact:.72s;position:relative;width:min(900px,100%);max-height:calc(100dvh - 24px);overflow:auto;background:#0a1020;color:#f2f8ff;border:1px solid #435472;border-radius:8px;box-shadow:0 25px 100px #000b;font-family:Arial,'Noto Sans JP',sans-serif}.pb-fight.pb-super{--windup:.75s;--impact:1.32s;border-color:#f6d678;box-shadow:0 0 70px #eabf392e}.pb-fight-hud{display:grid;grid-template-columns:1fr 60px 1fr;gap:12px;align-items:center;padding:16px 22px;background:linear-gradient(180deg,#202e48,#10192b);position:relative;z-index:3}.pb-fight-hud b{display:block;font-size:14px;letter-spacing:.12em;font-style:italic}.pb-fight-hud span{display:block;font-size:9px;color:#aebfd6;letter-spacing:.15em;margin:4px 0 7px}.pb-foe-hud{text-align:right}.pb-round-badge{text-align:center;font-size:27px;line-height:1;font-weight:1000;color:#ffe6a2;transform:skew(-6deg)}.pb-round-badge small{display:block;font-size:8px;letter-spacing:.1em;margin-top:5px}.pb-player-meter,.pb-foe-meter{height:12px;background:#151e30;border:1px solid #586883;transform:skew(-12deg);position:relative;overflow:hidden}.pb-player-meter{background:linear-gradient(90deg,#168dbd,#6ef9ed)}.pb-foe-meter i,.pb-foe-meter em{position:absolute;right:0;top:0;bottom:0;width:var(--bar-before);background:#f1b753}.pb-foe-meter i{background:#ffedaf;animation:pb-meter-drain .6s calc(var(--impact) + .2s) forwards}.pb-foe-meter em{background:linear-gradient(90deg,#c83b65,#ff956c);animation:pb-meter-drain .13s var(--impact) forwards}.pb-fight-stage{height:clamp(240px,43vw,380px);position:relative;isolation:isolate;overflow:hidden;background:radial-gradient(ellipse at 50% 20%,#24336a,#11172e 65%)}.pb-moon{position:absolute;left:20%;top:20px;width:65px;height:65px;border-radius:50%;background:#a4b8d8;box-shadow:0 0 60px #83aaff35;opacity:.6}.pb-city{position:absolute;inset:25% -2% 17%;display:flex;align-items:flex-end;gap:8px;opacity:.65}.pb-city i{flex:1;height:70%;background:repeating-linear-gradient(0deg,transparent 0 15px,#86bcd422 15px 19px),repeating-linear-gradient(90deg,#10192d 0 14px,#254565 14px 18px);border-top:2px solid #4c7492}.pb-city i:nth-child(2n){height:95%}.pb-city i:nth-child(3n){height:52%}.pb-neon-sign{position:absolute;right:15%;top:25px;color:#ee8cd6;text-align:center;letter-spacing:.3em;font-size:9px;padding:9px 16px;border:2px solid #f480cb80;transform:rotate(-5deg);box-shadow:0 0 25px #ed4aba25;text-shadow:0 0 12px #f480cb}.pb-neon-sign b{font-size:20px;letter-spacing:.08em}.pb-floor{position:absolute;inset:78% 0 0;background:repeating-linear-gradient(0deg,transparent 0 15px,#7e88b320 15px 16px),repeating-linear-gradient(95deg,#1d2438 0 70px,#596582 71px 72px);border-top:3px solid #6f8aab;box-shadow:0 -5px 15px #78b2d520}.pb-combatant{position:absolute;bottom:8%;width:27%;max-width:235px;min-width:110px;z-index:2;will-change:transform}.pb-player{left:9%}.pb-rival{right:7%}.pb-combatant svg{width:100%;height:auto}.pb-rival .pb-fighter-pose{transform:scaleX(-1)}.pb-fighter-body{transform-origin:120px 270px;animation:pb-stance 1s ease-in-out infinite}.pb-scarf{transform-origin:98px 50px;animation:pb-scarf-wave .6s ease-in-out infinite}.pb-connected .pb-player,.pb-guarded .pb-player{animation:pb-lunge .95s var(--windup) both}.pb-player .pb-arm-front{transform-origin:144px 110px;animation:pb-punch .95s var(--windup) both}.pb-connected .pb-rival{animation:pb-recoil 1.1s var(--impact) both}.pb-super .pb-rival{animation-name:pb-launch}.pb-knockout .pb-rival{animation-name:pb-knockdown;animation-fill-mode:forwards}.pb-guarded .pb-rival{animation:pb-block .7s var(--impact) both}.pb-stage-speed{position:absolute;inset:0;background:repeating-linear-gradient(-8deg,transparent 0 26px,#7bf9ff35 26px 28px,transparent 28px 43px);opacity:0;animation:pb-speed .85s var(--windup) both;z-index:1}.pb-super .pb-stage-speed{background:repeating-linear-gradient(-8deg,transparent 0 20px,#f9e18270 20px 23px,transparent 23px 35px)}.pb-stage-flash{position:absolute;inset:0;background:#d7f7ff;opacity:0;z-index:4;pointer-events:none;animation:pb-impact-flash .17s var(--impact) both}.pb-guarded .pb-stage-flash{display:none}.pb-wave{position:absolute;left:37%;top:49%;width:18%;height:23%;z-index:3;opacity:0;animation:pb-energy .6s calc(var(--windup) + .2s) both;filter:drop-shadow(0 0 12px #5dfaff)}.pb-wave i{position:absolute;inset:0;border:4px solid #9ffff5;border-left:18px solid #fff;border-radius:50%;transform:skew(-15deg);background:linear-gradient(90deg,#23cbd766,#b9ffff55);box-shadow:inset 0 0 20px #fff}.pb-wave i:nth-child(2){inset:12% 15%;transform:rotate(-22deg)}.pb-wave i:nth-child(3){inset:25% 25%;background:#fff}.pb-super .pb-wave{height:35%;width:26%;top:42%;filter:drop-shadow(0 0 18px #ffcc4a)}.pb-super .pb-wave i{border-color:#ffe798;background:linear-gradient(90deg,#ef8d1570,#fff4ae)}.pb-guarded .pb-wave{animation-name:pb-energy-fail}.pb-contact{position:absolute;right:19%;top:48%;z-index:4;width:1px;height:1px}.pb-contact i{position:absolute;width:90px;height:7px;background:linear-gradient(90deg,#fff,#ffdc79,transparent);transform-origin:0 50%;opacity:0;--angle:0deg;animation:pb-slash .65s var(--impact) both}.pb-contact i:nth-child(2){--angle:60deg}.pb-contact i:nth-child(3){--angle:120deg}.pb-contact i:nth-child(4){--angle:180deg}.pb-contact i:nth-child(5){--angle:240deg}.pb-contact i:nth-child(6){--angle:300deg}.pb-guarded .pb-contact{display:none}.pb-floor-dust{position:absolute;bottom:6%;left:23%;width:30%;height:12%;border:8px solid #a7b3d15c;border-radius:50%;z-index:1;opacity:0;animation:pb-dust-burst .7s var(--windup) both}.pb-fight-callout{position:absolute;left:5%;top:9%;z-index:5;text-align:left;font-style:italic;opacity:0;animation:pb-hit-title 1.3s var(--impact) forwards;filter:drop-shadow(3px 4px 0 #10172b)}.pb-fight-callout>small{font-size:11px;font-weight:900;color:#d9edff;display:block;letter-spacing:.05em}.pb-fight-callout strong{display:block;color:#9efef3;font-size:clamp(28px,6vw,56px);font-weight:1000;line-height:1.05}.pb-super .pb-fight-callout strong{color:#ffe093}.pb-fight-callout>span{font-size:31px;font-weight:1000;color:#fff}.pb-fight-callout span small{font-size:11px}.pb-fight-cutin{position:absolute;inset:12% -3% 18%;z-index:6;background:linear-gradient(105deg,#0d4664,#0b142d 52%,#73511e);border-top:3px solid #ffecab;border-bottom:3px solid #ffecab;transform:skewY(-5deg);display:flex;align-items:center;overflow:hidden;animation:pb-cutin .75s both}.pb-fight-cutin>div{width:42%;height:150%;transform:translateY(35%) scale(1.65);opacity:.9}.pb-fight-cutin>span{z-index:2;font-size:10px;letter-spacing:.2em;color:#f6d37b;font-weight:900}.pb-fight-cutin big{display:block;font-size:clamp(27px,6vw,58px);font-style:italic;line-height:.95;letter-spacing:-.03em;color:#fff3c4;margin-top:8px;text-shadow:3px 3px #8d5424}.pb-ko{position:absolute;inset:25% 0 auto;z-index:7;text-align:center;font-size:clamp(65px,15vw,135px);font-weight:1000;line-height:1;color:#fff1b4;font-style:italic;text-shadow:5px 5px #c65334,-2px -2px #452434;opacity:0;animation:pb-ko-enter .6s calc(var(--impact) + .75s) forwards}.pb-ko small{display:block;font-size:10px;letter-spacing:.22em;text-shadow:none;color:#fff}.pb-knockout .pb-fight-callout{animation-name:pb-hit-title-ko}.pb-fight-footer{position:relative;text-align:center;background:linear-gradient(180deg,#152036,#0a1020);padding:14px 15px 12px;border-top:1px solid #374767}.pb-move-name{font-size:12px;letter-spacing:.22em;color:#90deda;font-weight:900;margin-bottom:9px}.pb-super .pb-move-name{color:#ffe298}.pb-fight-words{display:flex;align-items:center;justify-content:center;gap:8px;font-size:23px;font-weight:900}.pb-fight-words span{padding:5px 20px;background:#223651;border-left:3px solid #79eee6;transform:skew(-6deg);border-radius:3px}.pb-fight-words b{color:#6887a0;font-size:16px}.pb-fight-footer p{font-size:12px;color:#bbcce1;margin:10px 0}.pb-fight .pb-duel-close{margin:6px auto 0;padding:6px 15px;font-size:11px}.pb-guarded .pb-fight-callout strong{color:#aebed9}.pb-connected .pb-fight-stage{animation:pb-stage-hit .24s var(--impact) both}
    @keyframes pb-stance{50%{transform:translateY(3px) rotate(.5deg)}}@keyframes pb-scarf-wave{50%{transform:rotate(-9deg)}}@keyframes pb-lunge{0%{transform:none}18%{transform:translateX(-9%) skewX(-4deg)}42%{transform:translateX(78%) skewX(-6deg)}58%,72%{transform:translateX(81%) skewX(-3deg)}100%{transform:none}}@keyframes pb-punch{0%,20%{transform:rotate(20deg)}42%,72%{transform:translate(16px,-27px) rotate(-58deg)}100%{transform:none}}@keyframes pb-recoil{0%,10%{transform:translateX(8%) rotate(10deg)}35%{transform:translateX(25%) rotate(22deg)}60%{transform:translateX(12%) rotate(-8deg)}100%{transform:none}}@keyframes pb-launch{0%,10%{transform:translate(6%,-4%) rotate(10deg)}40%{transform:translate(30%,-30%) rotate(40deg)}70%{transform:translate(25%,5%) rotate(15deg)}100%{transform:none}}@keyframes pb-knockdown{0%,10%{transform:translate(6%,-4%) rotate(10deg)}40%{transform:translate(25%,-25%) rotate(45deg)}80%,100%{transform:translate(20%,22%) rotate(80deg)}}@keyframes pb-block{20%,45%{transform:translateX(6%) rotate(-6deg)}100%{transform:none}}@keyframes pb-energy{0%{opacity:0;transform:translateX(-50%) scale(.3)}20%{opacity:1}78%{opacity:1;transform:translateX(175%) scale(1.3)}100%{opacity:0;transform:translateX(180%) scale(1.6)}}@keyframes pb-energy-fail{0%{opacity:0;transform:scale(.3)}25%{opacity:1}100%{opacity:0;transform:translateX(40%) scale(.1)}}@keyframes pb-speed{0%,100%{opacity:0;transform:translateX(-5%)}35%,65%{opacity:1;transform:translateX(5%)}}@keyframes pb-slash{0%{opacity:1;transform:rotate(var(--angle)) scaleX(.2)}25%{opacity:1;transform:rotate(var(--angle)) scaleX(1.4)}100%{opacity:0;transform:rotate(var(--angle)) translateX(40px) scaleX(.7)}}@keyframes pb-impact-flash{0%,100%{opacity:0}15%,45%{opacity:.65}}@keyframes pb-stage-hit{20%{transform:translate(-5px,2px)}50%{transform:translate(5px,-2px)}80%{transform:translate(-2px,1px)}100%{transform:none}}@keyframes pb-dust-burst{0%{opacity:.7;transform:scale(.1)}100%{opacity:0;transform:scale(1.7)}}@keyframes pb-meter-drain{to{width:var(--bar-after)}}@keyframes pb-cutin{0%{opacity:0;translate:-100% 0}18%,78%{opacity:1;translate:0 0}100%{opacity:0;translate:110% 0;visibility:hidden}}@keyframes pb-hit-title{0%{opacity:0;transform:translateX(-20px) scale(1.4)}12%,100%{opacity:1;transform:none}}@keyframes pb-hit-title-ko{0%{opacity:0;transform:translateX(-20px) scale(1.4)}12%,60%{opacity:1;transform:none}100%{opacity:0}}@keyframes pb-ko-enter{0%{opacity:0;transform:scale(2)}50%{opacity:1;transform:scale(.95)}100%{opacity:1;transform:scale(1)}}
    @media(max-width:440px){.pb-fight-hud{padding:12px;gap:8px;grid-template-columns:1fr 40px 1fr}.pb-fight-hud b{font-size:10px}.pb-fight-stage{height:250px}.pb-combatant{width:37%;min-width:0}.pb-player{left:0}.pb-rival{right:1%}.pb-neon-sign{right:10%;top:17px}.pb-fight-callout{top:8%;left:4%}.pb-fight-callout>small{font-size:9px}.pb-fight-footer{padding:12px}.pb-fight-words{font-size:20px}.pb-fight-words span{padding:4px 16px}.pb-fight-callout strong{font-size:30px}.pb-fight-cutin big{font-size:32px}.pb-contact i{width:60px}}
    @media(prefers-reduced-motion:reduce){#view-passive *,#view-passive *:after,#view-passive *:before,.pb-flight,.pb-battle-overlay *{animation:none!important;transition:none!important}.pb-projectile,.pb-ring,.pb-impact-stars,.pb-fight-cutin,.pb-wave,.pb-stage-speed,.pb-stage-flash,.pb-contact,.pb-floor-dust{display:none}.pb-damage{top:0}.pb-fight-callout{opacity:1}.pb-ko{opacity:1}.pb-knockout .pb-fight-callout{display:none}.pb-foe-meter i,.pb-foe-meter em{width:var(--bar-after)}}
    `;
    const liveStyle = `
    #view-passive .pb-battle-layout{padding:0;background:#0b1426;border:1px solid #425572;border-radius:14px;color:#e5efff;isolation:isolate}
    .pb-live-arena{position:sticky;top:0;z-index:8;background:#0a1020;border-radius:13px 13px 0 0;box-shadow:0 8px 20px #0005;overflow:hidden}
    .pb-live-arena .pb-fight{width:100%;max-height:none;overflow:hidden;border:0;border-radius:0;box-shadow:none}
    .pb-live-arena .pb-fight-stage{height:190px}.pb-live-arena .pb-fight-hud{padding:9px 16px;gap:10px;grid-template-columns:1fr 44px 1fr}.pb-live-arena .pb-fight-hud b{font-size:11px}.pb-live-arena .pb-fight-hud span{font-size:8px;margin:3px 0 5px}.pb-live-arena .pb-round-badge{font-size:22px}.pb-live-arena .pb-round-badge small{font-size:7px}.pb-live-arena .pb-player-meter,.pb-live-arena .pb-foe-meter{height:8px}
    .pb-live-arena .pb-combatant{width:145px;min-width:0;max-width:30%;bottom:5%}.pb-live-arena .pb-player{left:16%}.pb-live-arena .pb-rival{right:14%}.pb-live-arena .pb-neon-sign{font-size:8px;top:14px;padding:6px 10px}.pb-live-arena .pb-neon-sign b{font-size:16px}.pb-live-arena .pb-moon{width:45px;height:45px;top:12px}.pb-live-arena .pb-fight-callout{top:6%;left:4%}.pb-live-arena .pb-fight-callout strong{font-size:30px}.pb-live-arena .pb-fight-callout>small{font-size:9px}.pb-live-arena .pb-fight-callout>span{font-size:24px}.pb-live-arena .pb-ko{font-size:74px}
    .pb-idle .pb-player,.pb-idle .pb-rival,.pb-idle .pb-arm-front{animation:none;transform:none}.pb-idle .pb-foe-meter i,.pb-idle .pb-foe-meter em{animation:none;width:var(--bar-after)}.pb-idle .pb-fight-callout,.pb-idle .pb-wave,.pb-idle .pb-contact,.pb-idle .pb-stage-speed,.pb-idle .pb-stage-flash,.pb-idle .pb-floor-dust{display:none}.pb-idle.pb-knockout .pb-rival{transform:translate(20%,22%) rotate(80deg)}.pb-idle .pb-ko{animation:none;opacity:1}
    .pb-console{padding:14px;background:linear-gradient(150deg,#16243b,#0c1427)}.pb-console-top{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:11px;color:#f5d78c;font-weight:900;margin-bottom:12px}.pb-console .pb-link{color:#c7d9ef;background:#26364f;padding:7px 10px;font-size:11px!important}.pb-question{display:grid;grid-template-columns:110px 1fr;gap:12px;align-items:center;margin-bottom:12px;padding:8px;background:#1c2d47;border:1px solid #354761;border-radius:10px}.pb-question-art svg{width:100%;height:68px;border-radius:8px;background:#e9eef5}.pb-console .pb-time{font-size:10px;padding:3px 7px;margin:0;background:#3e3540;color:#ffe0a2}.pb-console .pb-prompt{text-align:left;font-size:13px;margin:5px 0 0;line-height:1.5}.pb-console .pb-sentence{background:#0b1527;border-color:#3c5374;color:#ecf6ff;font-size:18px;padding:10px;gap:6px}.pb-console .pb-slot{background:#282750;color:#d7c4ff;border-color:#8f77c2;font-size:16px}.pb-console .pb-slot[data-kind="verb"]{background:#143a43;color:#9ef8ee;border-color:#5eaca9}.pb-console .pb-slot.pb-filled{box-shadow:0 2px 0 #080e1c}.pb-console .pb-hand{margin:6px 0 12px;gap:12px}.pb-console .pb-hand-label{color:#c5b4ef;margin:8px 0;font-size:11px}.pb-console .pb-hand-label.pb-teal{color:#8edcd9}.pb-console .pb-hand-label small{color:#9baec8;font-size:9px}.pb-console .pb-card{background:linear-gradient(145deg,#343258,#20203c);border-color:#77679f;color:#e2d7ff;box-shadow:0 4px 0 #080e1c;min-height:56px;font-size:20px!important}.pb-console .pb-card[data-kind="verb"]{background:linear-gradient(145deg,#204650,#142d37);color:#a9fff5;border-color:#4b8a90;box-shadow:0 4px 0 #080e1c}.pb-console .pb-card[aria-pressed="true"]{box-shadow:0 0 14px #8f9cff35}.pb-console .pb-card:disabled{opacity:.6}.pb-console .pb-card:disabled[aria-pressed="true"]{opacity:1}.pb-console .pb-ready{color:#bdc9f7;font-size:11px;margin-bottom:0;min-height:18px}.pb-console .pb-timing{background:#101b30;border-color:#536080;padding:9px 12px;margin:8px 0}.pb-console .pb-timing-heading{color:#d5dffa;font-size:11px;margin-bottom:8px}.pb-console .pb-timing-caption{color:#bdcce5;font-size:10px;margin-top:6px}.pb-console .pb-primary{background:linear-gradient(105deg,#225fab,#5145a1);border:1px solid #8fb9f5;box-shadow:0 4px 0 #060e1e;padding:12px}.pb-console .pb-primary:disabled{background:#26354c;color:#a6b4cc;border-color:#425572}.pb-console .pb-muted{color:#a6b8d1;font-size:10px}.pb-console .pb-feedback{background:#342e28;color:#ffe0a1;border:1px solid #756249;padding:10px;font-size:12px;margin:10px 0}.pb-console .pb-feedback.pb-success{background:#153930;color:#b6f2d4;border-color:#3a7063}.pb-console .pb-feedback strong{font-size:14px}.pb-console .pb-answer{font-size:15px}.pb-console .pb-skip{display:block;margin:10px auto 0}
    @media(max-width:440px){.pb-live-arena .pb-fight-stage{height:145px}.pb-live-arena .pb-fight-hud{padding:7px 10px;grid-template-columns:1fr 34px 1fr}.pb-live-arena .pb-fight-hud b{font-size:9px}.pb-live-arena .pb-combatant{width:113px;max-width:34%}.pb-live-arena .pb-player{left:8%}.pb-live-arena .pb-rival{right:6%}.pb-live-arena .pb-fight-callout strong{font-size:23px}.pb-live-arena .pb-fight-callout>small{font-size:8px}.pb-live-arena .pb-ko{font-size:58px}.pb-console{padding:10px}.pb-question{grid-template-columns:80px 1fr;gap:8px;margin-bottom:9px}.pb-question-art svg{height:56px}.pb-console .pb-prompt{font-size:12px}.pb-console .pb-time{font-size:9px}.pb-console .pb-card{min-height:50px;font-size:18px!important}.pb-console .pb-sentence{font-size:16px;padding:8px}.pb-console .pb-slot{font-size:15px;min-height:38px;min-width:60px}.pb-console .pb-slot[data-kind="verb"]{min-width:82px}.pb-console .pb-console-top{font-size:10px}.pb-live-arena .pb-fight-cutin big{font-size:27px}}
    @media(max-height:650px){.pb-live-arena .pb-fight-stage{height:105px}.pb-live-arena .pb-combatant{width:78px}.pb-live-arena .pb-fight-hud{padding:5px 10px}.pb-live-arena .pb-fight-hud span{display:none}.pb-live-arena .pb-neon-sign{display:none}.pb-live-arena .pb-fight-callout strong{font-size:22px}.pb-live-arena .pb-ko{font-size:50px}.pb-live-arena .pb-round-badge{font-size:18px}}
    @media(prefers-reduced-motion:reduce){.pb-live-arena *{animation:none!important;transition:none!important}.pb-live-arena .pb-fight-callout{opacity:1}.pb-live-arena .pb-idle .pb-fight-callout{display:none}}
    `;

    const comboStyle = `
    .pb-live-arena .pb-fight{--windup:0s;--impact:.08s}
    .pb-live-arena .pb-connected .pb-player,.pb-live-arena .pb-guarded .pb-player{animation-duration:.32s}
    .pb-live-arena .pb-player .pb-arm-front{animation-duration:.32s}
    .pb-live-arena .pb-fight-callout{animation-duration:.48s}
    .pb-live-arena .pb-fight-cutin{animation-duration:.38s;pointer-events:none}
    .pb-live-arena .pb-ko{animation-delay:.1s}
    .pb-received .pb-rival{animation:pb-enemy-rush .38s both}
    .pb-received .pb-player{animation:pb-recoil .4s .07s both}
    .pb-received .pb-contact{right:auto;left:24%}
    .pb-received .pb-wave{display:none}
    .pb-received .pb-fight-callout strong{color:#ff8299}
    .pb-received .pb-fight-stage{animation:pb-stage-hit .24s both}
    .pb-danger{padding:8px 12px;background:#141b30;color:#ffb9ca;font-size:12px}
    .pb-enemy-track{height:7px;background:#343047;border-radius:4px;overflow:hidden;margin-top:6px}
    .pb-enemy-track i{display:block;height:100%;width:100%;transform-origin:left;background:linear-gradient(90deg,#c34c90,#ff9363)}
    .pb-threat .pb-rival{filter:drop-shadow(0 0 14px #ff386c)}
    .pb-console .pb-feedback{min-height:42px;margin:6px 0;padding:8px;font-size:12px}
    .pb-card[aria-pressed="true"]:after{content:'HIT!'}
    .pb-speed{display:flex;justify-content:center;gap:8px;margin:16px 0}
    .pb-speed button{padding:10px;border:2px solid #aaa0d4;border-radius:10px}
    .pb-speed button[aria-pressed="true"]{background:#6254bd;color:#fff}
    .pb-paused{text-align:center;padding:10px}
    @keyframes pb-enemy-rush{35%{transform:translateX(-95%)}65%{transform:translateX(-85%)}100%{transform:none}}
    @media(prefers-reduced-motion:reduce){#view-passive .pb-fight *{animation:none!important}.pb-fight:not(.pb-idle) .pb-fight-callout,.pb-ko{opacity:1}}
    `;
    let run=null, active=false, paused=false, speed='normal', frame=null, lastTime=null, effectUntil=0;
    const root=()=>document.getElementById('view-passive');
    const button=(action,label)=>`<button type="button" class="pb-primary" data-action="${action}">${label}</button>`;
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
        const arena=root()?.querySelector('.pb-live-arena');
        if (arena) arena.innerHTML=battleScene(run,idle);
    }
    function paintCharge() {
        const bar=root()?.querySelector('.pb-enemy-track i');
        if (bar) bar.style.transform=`scaleX(${run.charge/run.interval})`;
        root()?.querySelector('.pb-live-arena')?.classList.toggle('pb-threat',run.charge/run.interval>.75);
    }
    function renderConsole() {
        const panel=root()?.querySelector('.pb-console');
        if (!panel) return;
        const q=run.deck[run.index];
        const hand=(kind,label,values)=>`<div><div class="pb-hand-label">${label}</div><div class="pb-cards">${values.map(v=>`<button type="button" class="pb-card" data-action="select" data-kind="${kind}" data-value="${v}" aria-pressed="${run[kind]===v}" ${paused || (kind==='be' ? !!run.be : !run.be) ? 'disabled' : ''}>${v}</button>`).join('')}</div></div>`;
        panel.innerHTML=`<div class="pb-console-top"><span>第${run.index+1}問 ・ ${run.combo} COMBO ・ ${run.damage} DAMAGE</span><button type="button" class="pb-link" data-action="pause">${paused?'再開':'一時停止'}</button></div>
        <div class="pb-question"><div class="pb-question-art">${illustration(q)}</div><div><span class="pb-time">${esc(q.time)}</span><p class="pb-prompt">${esc(q.ja)}</p></div></div>
        <div class="pb-sentence"><span>${esc(q.subject)}</span><span class="pb-slot">${run.be||'①'}</span><span class="pb-slot">${run.verb||'②'}</span><span>${esc(q.tail)}</span></div>
        <div class="pb-hand">${hand('be','① be動詞 → ジャブ',q.beCards)}${hand('verb','② 過去分詞 → 強攻撃',q.verbCards)}</div>
        <div class="pb-feedback" role="status" aria-live="polite">${esc(run.feedback)}</div>
        ${paused?'<div class="pb-paused">一時停止中<button type="button" class="pb-link" data-action="menu">遊び方に戻る</button></div>':''}`;
    }
    function render() {
        const host=root(); if (!host) return;
        if (!run) {
            host.innerHTML=`<div class="pb-shell pb-hero"><p class="pb-eyebrow">PASSIVE / COMBO BATTLE</p><h2 class="pb-title">正解をつなげて、攻め続けろ。</h2><div class="pb-demo">${illustration(questions[2])}</div><div class="pb-demo-pair"><span class="pb-mini">was</span><span class="pb-mini">broken</span></div><div class="pb-rules"><p><strong>① be動詞でジャブ</strong>　正解すると相手の攻撃を足止め！</p><p><strong>② 過去分詞で強攻撃</strong>　正解ですぐ次の問題。演出中も選べる！</p><p><strong>③ 相手の攻撃に注意</strong>　赤いゲージが満タンで被弾。自分か相手のHPが０になるまでバトル継続！ 自分は３回被弾で敗北。</p><p>相手のHPは1800。ジャブ20・強攻撃100・６枚連続正解で必殺技200ダメージ！ 全36問から出題。ミスしてもすぐ選び直せます。</p></div><p>相手の攻撃速度</p><div class="pb-speed">${[['slow','ゆっくり'],['normal','ふつう'],['fast','速い']].map(([key,label])=>`<button type="button" data-action="speed" data-value="${key}" aria-pressed="${speed===key}">${label}</button>`).join('')}</div>${button('start','バトル開始！')}</div>`;
        } else if (run.finished) {
            host.innerHTML=`<div class="pb-shell pb-result"><p class="pb-eyebrow">${run.won?'VICTORY':'TRY AGAIN'}</p><h2 class="pb-title">${run.won?'相手のHPが０！ バトル勝利！':'今回は相手の勝ち。もう一度！'}</h2><p class="pb-score">${run.hits.length} 文完成 ・ 最大 ${run.bestCombo} COMBO</p><p>${run.damage} DAMAGE ・ 残りHP ${run.hp} / 3</p><p class="pb-muted">英文一発正解 ${run.perfect} 問</p><ol class="pb-review">${run.deck.slice(0,run.index+1).map((q,i)=>`<li>${i<run.hits.length?'✓':'復習'} ${esc(q.subject)} <b>${q.be} ${q.verb}</b> ${esc(q.tail)}<small>${esc(q.ja)}</small></li>`).join('')}</ol>${button('start','もう一度挑戦')}<div style="margin-top:14px">${button('menu','速さ・遊び方を変更')}</div></div>`;
            stopClock();
        } else {
            host.innerHTML='<div class="pb-shell pb-battle-layout"><div class="pb-live-arena" aria-label="対戦ステージ"></div><div class="pb-danger">相手の攻撃まで <span>— 満タンで被弾！</span><div class="pb-enemy-track" aria-hidden="true"><i></i></div></div><div class="pb-console"></div></div>';
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
                root().querySelector(`[data-action="select"][data-kind="${run.be?'verb':'be'}"]:not(:disabled)`)?.focus({preventScroll:true});
            }
        } else if (action==='start') { stopClock(); run=createRun(Math.random,speed); paused=false; effectUntil=0; render(); }
        else if (action==='menu') { stopClock(); run=null; paused=false; effectUntil=0; render(); }
        else if (action==='speed' && !run && speeds[value]) { speed=value; render(); }
        else if (action==='pause') { paused=!paused; stopClock(); renderConsole(); syncClock(); }
    }
    if (typeof document!=='undefined') {
        if (!document.getElementById('passive-battle-style')) {
            const css=document.createElement('style'); css.id='passive-battle-style'; css.textContent=style+liveStyle+comboStyle; document.head.appendChild(css);
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
        exportSource:()=>`const PassiveBattle = (${createPassiveBattle.toString()})();`,
        rules:{questions,createRun,select,advance,speeds,illustration,fighterSVG,battleScene}
    };
})();
if (typeof module!=='undefined' && module.exports) module.exports=PassiveBattle;
