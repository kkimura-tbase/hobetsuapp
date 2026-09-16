/* Vocabulary Quest: fixed progression, first-attempt stars, mandatory retries. */
const VocabQuest = (function createVocabQuest() {
    const KEY = 'hobetsu-vocabulary-quest-v1';
    const ranks = ['A', 'B', 'C', '会話'];
    const mascots = ['🐣','🐱','🦊','🐼','🐨','🐸','🐧','🦉','🐰','🐻','🐯','🦁','🐮','🐷','🐵','🐺','🦄','🐲','🦋','🐢','🐬','🐙','🦜','🦚','🦅','👑'];
    const words = [...vocabularyData].sort((a,b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank) || a.id - b.id);
    const stages = [];
    for (let i = 0; i < words.length; i += 10) {
        const number = i / 10 + 1;
        stages.push({key: `stage-${number}`, number, rank: words[i].rank, words: words.slice(i, i + 10), boss: false});
        if (number % 5 === 0 || i + 10 >= words.length) stages.push({key: `boss-${number}`, number, rank: words[i].rank, words: words.slice(Math.max(0, i - 40), i + 10), boss: true});
    }
    let progress = {stars: {}, mistakes: {}, mascot: -1};
    let storageOK = true;
    try {
        const saved = JSON.parse(localStorage.getItem(KEY));
        if (saved && typeof saved === 'object') {
            for (const stage of stages) {
                const value = saved.stars?.[stage.key];
                if (Number.isInteger(value) && value >= 1 && value <= 3) progress.stars[stage.key] = value;
            }
            for (const word of words) {
                const count = saved.mistakes?.[word.id];
                if (Number.isSafeInteger(count) && count > 0) progress.mistakes[word.id] = count;
            }
            if (Number.isInteger(saved.mascot) && saved.mascot >= -1 && saved.mascot < mascots.length) progress.mascot = saved.mascot;
        }
    } catch { storageOK = false; }
    let run = null;
    let advanceTimer = null;
    let countdownTimer = null;
    function cancelAdvance() {
        clearTimeout(advanceTimer);
        clearTimeout(countdownTimer);
        advanceTimer = null;
        countdownTimer = null;
    }
    const el = () => document.getElementById('view-vocab');
    const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    function choiceLabel(meaning) {
        const splitAt = meaning.search(/[／/]/);
        const primary = splitAt < 0 ? meaning : meaning.slice(0, splitAt);
        const secondary = splitAt < 0 ? '' : meaning.slice(splitAt);
        return `<div class="vq-meaning"><strong class="vq-meaning-primary">${esc(primary)}</strong>${secondary ? `<small class="vq-meaning-secondary">${esc(secondary)}</small>` : ''}</div>`;
    }
    function shuffle(list) {
        const result = [...list];
        for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
        return result;
    }
    function save() {
        try { localStorage.setItem(KEY, JSON.stringify(progress)); storageOK = true; }
        catch { storageOK = false; }
    }
    function unlocked(index) { return stages.slice(0, index).every(s => progress.stars[s.key] > 0); }
    function stars(score, count) { return score === count ? 3 : score >= Math.ceil(count * .9) ? 2 : score >= Math.ceil(count * .8) ? 1 : 0; }
    function earned() { return stages.filter(s => s.boss && progress.stars[s.key]).map(s => Math.ceil(s.number / 5) - 1); }
    function avatar() { return earned().includes(progress.mascot) ? mascots[progress.mascot] : '🧑‍🚀'; }
    function warning() { return storageOK ? '<p class="vq-note">進捗はこのブラウザに自動保存されます。</p>' : '<p class="vq-warning" role="alert">進捗を保存できません。この画面では遊べますが、閉じると今回の進捗が失われる場合があります。</p>'; }
    function shell(body) {
        el().innerHTML = `<div class="vq-hero"><div class="vq-avatar">${avatar()}</div><div><p class="vq-eyebrow">WORD QUEST</p><h2>単語クエスト</h2><p>重要度Aから、一歩ずつ冒険しよう。</p></div></div>${body}${warning()}`;
    }
    function open() {
        cancelAdvance();
        run = null;
        const next = stages.findIndex((s,i) => unlocked(i) && !progress.stars[s.key]);
        const cleared = stages.filter(s => !s.boss && progress.stars[s.key]).length;
        const totalStars = Object.values(progress.stars).reduce((a,b) => a + b, 0);
        shell(`<div class="vq-stats"><span>🚩 ${cleared} / 130 ステージ</span><span>⭐ ${totalStars} / ${stages.length * 3}</span><span>🎁 ${earned().length} / ${mascots.length}</span></div>
            <div class="vq-card"><h3>${next < 0 ? '全ステージ制覇！' : '次の冒険へ'}</h3><p>10問中8問正解でクリア。9問で★★、全問で★★★。間違えた問題は最後に解き直そう。時間制限はありません。</p><p>5ステージごとに復習ボスが登場。宝箱から仲間を集めよう！</p>${next < 0 ? '' : `<button class="vq-primary" data-start="${next}">${stages[next].boss ? '🐲 復習ボス' : `ステージ ${stages[next].number}`} に挑む →</button>`}</div>
            <details class="vq-card"><summary>仲間コレクション (${earned().length} / ${mascots.length})</summary><div class="vq-collection">${mascots.map((m,i) => `<button data-mascot="${i}" ${earned().includes(i) ? '' : 'disabled'} aria-label="仲間${i+1}${progress.mascot === i ? ' 選択中' : ''}" aria-pressed="${progress.mascot === i}" class="${progress.mascot === i ? 'vq-selected' : ''}">${earned().includes(i) ? m : '🔒'}<small>ボス${i+1}</small></button>`).join('')}</div></details>
            ${ranks.map(rank => { const items = stages.map((s,i) => ({...s,index:i})).filter(s => s.rank === rank); const active = next >= 0 && stages[next].rank === rank; return `<details class="vq-card" ${active ? 'open' : ''}><summary>${rank === '会話' ? '会話表現（重要度指定なし）' : `重要度 ${rank}`} <span class="vq-note">${items.filter(s=>progress.stars[s.key]).length} / ${items.length} クリア</span></summary><div class="vq-map">${items.map(s=>`<button data-start="${s.index}" ${unlocked(s.index) ? '' : 'disabled'} ${s.index === next ? 'aria-current="step"' : ''} class="${s.boss ? 'vq-boss' : ''} ${s.index === next ? 'vq-current' : ''}"><span>${unlocked(s.index) ? s.boss ? '🐲' : progress.stars[s.key] ? '🏁' : '🌱' : '🔒'}</span><strong>${s.boss ? `ボス ${s.number / 5}` : `STAGE ${s.number}`}</strong><small>${'★'.repeat(progress.stars[s.key] || 0)}${'☆'.repeat(3-(progress.stars[s.key] || 0))}</small></button>`).join('')}</div></details>`; }).join('')}`);
    }
    function start(index) {
        if (!Number.isInteger(index) || !stages[index] || !unlocked(index)) return;
        cancelAdvance();
        const stage = stages[index];
        let pool = shuffle(stage.words);
        if (stage.boss) pool.sort((a,b) => (progress.mistakes[b.id] || 0) - (progress.mistakes[a.id] || 0));
        run = {index, stage, queue: pool.slice(0,10), cursor: 0, score: 0, wrong: [], retry: false, locked: false, finished: false};
        question();
    }
    // Exclude overlapping meanings and the same English expression from distractors.
    function meanings(word) { return word.ja.split(/[／/、。；;（）()]/).map(s=>s.replace(/[〜～…\s]/g,'')).filter(Boolean); }
    function options(word) {
        const correct = meanings(word);
        const pool = words.filter(w => w.id !== word.id && w.en.toLowerCase() !== word.en.toLowerCase() && !meanings(w).some(m => correct.includes(m)));
        const ordered = [...shuffle(pool.filter(w=>w.category === word.category)), ...shuffle(pool.filter(w=>w.category !== word.category))];
        const choices = [word.ja];
        for (const other of ordered) { if (!choices.includes(other.ja)) choices.push(other.ja); if (choices.length === 4) break; }
        return shuffle(choices);
    }
    function question() {
        run.locked = false;
        const word = run.queue[run.cursor];
        const choices = options(word);
        shell(`<div class="vq-stats"><button data-map>← マップへ</button><span>${run.stage.boss ? '🐲 復習ボス' : `STAGE ${run.stage.number}`} · ${run.retry ? '解き直し' : `問題 ${run.cursor+1} / ${run.queue.length}`}</span><span>⭐ ${run.score} 正解</span></div>
            <progress class="vq-progress" max="${run.queue.length}" value="${run.cursor}"></progress>
            <div class="vq-question vq-card"><p class="vq-eyebrow">${run.retry ? 'RETRY · 星は最初の回答で決まります' : run.stage.boss ? 'BOSS REVIEW · 苦手を乗り越えよう' : `重要度 ${esc(word.rank)} · ${esc(word.category)}`}</p><h3>${esc(word.en)}</h3><p>日本語の意味を選ぼう</p></div>
            <div class="vq-options">${choices.map((choice,i)=>`<button data-answer="${i}"><span>${i+1}</span>${choiceLabel(choice)}</button>`).join('')}</div>
            <div id="vq-feedback" class="vq-feedback" role="status" aria-live="polite"></div><button id="vq-next" class="vq-primary" data-next hidden>次へ →</button>`);
        run.choices = choices;
        el().querySelector('[data-answer]')?.focus({preventScroll:true});
    }
    function answer(index) {
        if (!run || run.locked || run.finished || !Number.isInteger(index) || index < 0 || index >= run.choices.length) return;
        run.locked = true;
        const word = run.queue[run.cursor];
        const correct = run.choices[index] === word.ja;
        if (!run.retry && correct) run.score++;
        if (!correct) {
            progress.mistakes[word.id] = (progress.mistakes[word.id] || 0) + 1;
            if (run.retry) run.queue.push(word); else run.wrong.push(word);
        } else if (!run.retry) {
            progress.mistakes[word.id] = Math.max(0, (progress.mistakes[word.id] || 0) - 1);
        }
        save();
        el().querySelectorAll('[data-answer]').forEach((button,i) => { button.disabled = true; if (run.choices[i] === word.ja) button.classList.add('vq-right'); else if (i === index) button.classList.add('vq-wrong'); });
        const feedback = document.getElementById('vq-feedback');
        feedback.textContent = correct ? '✨ 正解！' : `正解：${word.ja} — あとでもう一度挑戦しよう。`;
        const nextButton = document.getElementById('vq-next');
        nextButton.hidden = false;
        nextButton.focus({preventScroll:true});
        if (correct) {
            feedback.textContent = '✨ 正解！ 2秒後に自動で進みます';
            nextButton.textContent = '今すぐ次へ →';
            countdownTimer = setTimeout(() => {
                feedback.textContent = '✨ 正解！ 1秒後に自動で進みます';
            }, 1000);
            advanceTimer = setTimeout(next, 2000);
        }
    }
    function next() {
        cancelAdvance();
        if (!run || !run.locked || run.finished) return;
        run.cursor++;
        if (run.cursor < run.queue.length) return question();
        if (!run.retry && run.wrong.length) {
            run.retry = true; run.queue = shuffle(run.wrong); run.cursor = 0;
            return question();
        }
        finish();
    }
    function finish() {
        if (run.finished) return;
        run.finished = true;
        const rating = stars(run.score, Math.min(10, run.stage.words.length));
        const fresh = !progress.stars[run.stage.key];
        if (rating) progress.stars[run.stage.key] = Math.max(rating, progress.stars[run.stage.key] || 0);
        const reward = rating && fresh && run.stage.boss;
        if (reward) progress.mascot = Math.ceil(run.stage.number / 5) - 1;
        save();
        shell(`<div class="vq-result vq-card"><div class="vq-avatar">${reward ? mascots[progress.mascot] : rating ? '🏆' : '🌱'}</div><h3>${rating ? 'ステージクリア！' : 'もう一度チャレンジ！'}</h3><div class="vq-stars">${'★'.repeat(rating)}${'☆'.repeat(3-rating)}</div><p>最初の回答：${run.score} / ${Math.min(10,run.stage.words.length)}問正解</p><p>${run.wrong.length ? '間違えた単語の解き直しも完了！' : '全問、最初の挑戦で正解！'}</p><p>${reward ? '🎁 宝箱オープン！ 新しい仲間が加わった！' : rating ? '星を集めて、次の冒険へ。' : '8問以上正解で次のステージが解放されます。'}</p><div class="vq-actions">${rating && run.index+1 < stages.length ? `<button class="vq-primary" data-start="${run.index+1}">次の冒険へ →</button>` : ''}<button class="vq-primary" data-start="${run.index}">もう一度挑戦</button><button data-map>マップへ戻る</button></div></div>`);
    }
    function mount() {
        document.getElementById('vocabulary-quest-style')?.remove();
        const style = document.createElement('style');
        style.id = 'vocabulary-quest-style';
        style.textContent = `#view-vocab{color:#27334b}.vq-hero{display:flex;gap:18px;align-items:center;padding:24px;border-radius:20px;background:linear-gradient(125deg,#312e81,#635bda);color:white;margin-bottom:18px}.vq-hero h2{font-size:26px;font-weight:900}.vq-hero p{font-size:13px}.vq-avatar{font-size:52px}.vq-eyebrow{font-size:12px;font-weight:800;letter-spacing:.09em}.vq-stats{display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;font-weight:700;font-size:13px;margin:16px 0}.vq-card{padding:20px;border:1px solid #dfe3f1;border-radius:18px;background:#fff;margin:16px 0;box-shadow:0 4px 12px #312e8107}.vq-card h3{font-size:21px;font-weight:800}.vq-card p{margin:8px 0;line-height:1.7}.vq-card summary{cursor:pointer;font-weight:800}.vq-primary{display:inline-block;background:#5145cd;color:white;border-radius:12px;padding:13px 20px;font-weight:800;margin-top:12px;min-height:48px}.vq-primary[hidden]{display:none}.vq-map{display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:12px;margin-top:18px}.vq-map button{border:2px solid #e3e5f1;border-radius:16px;min-height:112px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;background:#f8f9ff}.vq-map button span{font-size:26px}.vq-map small,.vq-stars{color:#a86600}.vq-map button.vq-boss{background:#fff6e4;border-color:#f1c980}.vq-map button.vq-current{border-color:#5145cd;box-shadow:0 0 0 3px #e2ddff}.vq-map button:disabled{opacity:.5}.vq-note{font-size:12px;color:#64748b;margin-top:14px}.vq-warning{color:#92400e;background:#fff4d6;padding:12px;border-radius:12px}.vq-collection{display:grid;grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:8px;margin-top:16px}.vq-collection button{padding:8px;border:2px solid #e5e7eb;border-radius:12px;font-size:30px}.vq-collection small{display:block;font-size:10px}.vq-collection .vq-selected{border-color:#5145cd;background:#eeebff}.vq-question{text-align:center;padding:30px 16px}.vq-question h3{font-size:clamp(24px,5vw,38px);overflow-wrap:anywhere;margin:18px 0}.vq-options{display:grid;grid-template-columns:1fr 1fr;gap:12px}.vq-options button{display:flex;gap:12px;align-items:center;text-align:left;padding:18px;border:2px solid #dfe3f1;border-radius:14px;background:white;font-weight:700;min-height:76px;overflow-wrap:anywhere}.vq-options button span{font-size:12px;background:#f0edff;padding:3px 8px;border-radius:6px;color:#5145cd}.vq-options .vq-right{background:#dcfce7;border-color:#16a34a;color:#14532d}.vq-options .vq-wrong{background:#fee2e2;border-color:#dc2626;color:#7f1d1d}.vq-feedback{min-height:56px;padding:16px 0;font-weight:700}.vq-progress{width:100%;height:10px;accent-color:#635bda}.vq-result{text-align:center;padding:30px 18px}.vq-stars{font-size:42px;letter-spacing:8px}.vq-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}#view-vocab button:focus-visible{outline:3px solid #f59e0b;outline-offset:3px}@media(max-width:520px){.vq-options{grid-template-columns:1fr}.vq-hero{padding:18px}.vq-hero h2{font-size:22px}.vq-card{padding:16px}.vq-options button{min-height:64px;padding:14px}}`;
        style.textContent += `.vq-options button > span{flex-shrink:0}.vq-meaning{min-width:0;line-height:1.5}.vq-meaning-primary{display:block;font-size:19px;font-weight:800;color:#3730a3}.vq-meaning-secondary{display:block;margin-top:5px;font-size:13px;font-weight:400;color:#64748b}.vq-right .vq-meaning-primary{color:#14532d}.vq-wrong .vq-meaning-primary{color:#7f1d1d}.vq-right .vq-meaning-secondary,.vq-wrong .vq-meaning-secondary{color:#475569}`;
        document.head.appendChild(style);
        el().addEventListener('click', event => {
            const button = event.target.closest('button');
            if (!button || button.disabled) return;
            if (button.hasAttribute('data-start')) start(Number(button.dataset.start));
            else if (button.hasAttribute('data-answer')) answer(Number(button.dataset.answer));
            else if (button.hasAttribute('data-next')) next();
            else if (button.hasAttribute('data-map')) { if (!run || run.finished || confirm('マップへ戻りますか？ この挑戦の途中経過は保存されません。')) open(); }
            else if (button.hasAttribute('data-mascot')) { const i = Number(button.dataset.mascot); if (earned().includes(i)) { progress.mascot = i; save(); open(); } }
        });
    }
    mount();
    return {open, leave: () => { cancelAdvance(); run = null; }, stages, options, stars,
        exportSource: () => `const vocabularyData = ${JSON.stringify(vocabularyData).replace(/</g, '\\u003c')};\nconst VocabQuest = (${createVocabQuest.toString()})();`};
})();
