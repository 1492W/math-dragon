/* ============================================================
   DRAGON MATH - Game Logic
   ============================================================ */

// ---------- Dragon catalog ----------
const DRAGONS = {
  hatchling: {
    id: 'hatchling', name: 'Hatchling', emoji: '🐣',
    rarity: 'common', price: 0,
    desc: 'A loyal starter. No power, but always by your side.',
    ability: {}
  },
  ember: {
    id: 'ember', name: 'Ember Wyrm', emoji: '🐲',
    rarity: 'common', price: 120,
    desc: '+20% battle damage. +20% gold in training.',
    ability: { damageMul: 1.2, coinMul: 1.2 }
  },
  swift: {
    id: 'swift', name: 'Swiftwing', emoji: '🪽',
    rarity: 'rare', price: 350,
    desc: '+3 seconds per battle question. Extra gold on fast answers.',
    ability: { timeBonus: 3, speedCoinBonus: 1 }
  },
  fire: {
    id: 'fire', name: 'Flame Sovereign', emoji: '🔥',
    rarity: 'rare', price: 500,
    desc: '+50% battle damage. 2x gold in training.',
    ability: { damageMul: 1.5, coinMul: 2.0 }
  },
  guardian: {
    id: 'guardian', name: 'Iron Guardian', emoji: '🛡️',
    rarity: 'rare', price: 600,
    desc: 'Survive 1 wrong answer per battle. Protects your streak.',
    ability: { shield: 1, streakShield: 1 }
  },
  fortune: {
    id: 'fortune', name: 'Fortune Drake', emoji: '🍀',
    rarity: 'epic', price: 900,
    desc: '+25% critical chance. 20% bonus gold drops.',
    ability: { critChance: 0.25, luckyCoin: 0.2 }
  },
  crystal: {
    id: 'crystal', name: 'Crystal Wyrm', emoji: '💎',
    rarity: 'epic', price: 1200,
    desc: '+40% battle damage. Sell back at 80% value.',
    ability: { damageMul: 1.4, sellBonus: 0.3 }
  },
  elder: {
    id: 'elder', name: 'Elder Sovereign', emoji: '👑',
    rarity: 'legendary', price: 2800,
    desc: 'Ancient power: +30% damage, +2s, +50% gold.',
    ability: { damageMul: 1.3, timeBonus: 2, coinMul: 1.5 }
  }
};

const DRAGON_ORDER = ['hatchling','ember','swift','fire','guardian','fortune','crystal','elder'];

// Enemy names by floor tier
const ENEMIES = [
  { tier: 1, emoji: '🐲', names: ['Shadow Wyrmling', 'Cave Drakeling', 'Ember Whelp'] },
  { tier: 2, emoji: '🦎', names: ['Stone Basilisk', 'Frost Lindworm', 'Mist Wyvern'] },
  { tier: 3, emoji: '🐉', names: ['Obsidian Wyrm', 'Storm Drake', 'Cinder Serpent'] },
  { tier: 4, emoji: '👹', names: ['Hollow King', 'Ashen Tyrant', 'Void Hydra'] },
  { tier: 5, emoji: '💀', names: ['Bone Sovereign', 'Deathless Wyrm', 'The Old One'] }
];

// ---------- State ----------
const DEFAULT_STATE = {
  name: 'Pordee',
  coins: 0,
  owned: ['hatchling'],  // start with hatchling free
  highestFloor: 1,
  currentFloor: 1,
  bestSprint: 0,
  bestBeatTime: null,
  bestStreak: 0
};

let state = loadState();
let settings = {
  mode: 'sprint',
  operations: ['add', 'sub'],
  selectedDragons: []  // dragon ids picked for a run
};

function loadState() {
  try {
    const raw = localStorage.getItem('dragonMath_v1');
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  try { localStorage.setItem('dragonMath_v1', JSON.stringify(state)); } catch {}
}

function resetState() {
  state = { ...DEFAULT_STATE };
  saveState();
  refreshAllUI();
  nav('home');
  toast('Progress reset. Fresh start, dragon rider.');
}

// ---------- Helpers ----------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function toast(msg, ms = 2200) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), ms);
}

// ---------- Navigation ----------
function nav(screen) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + screen);
  if (target) target.classList.add('active');
  if (screen === 'home') refreshHome();
  if (screen === 'practice') refreshPracticeSetup();
  if (screen === 'shop') renderShop();
  if (screen === 'hoard') renderHoard();
  if (screen === 'battle-setup') refreshBattleSetup();
  window.scrollTo(0, 0);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-nav]');
  if (btn) nav(btn.dataset.nav);
});

// ---------- Math generator ----------
// Hard-bucket combos that require mental effort
const HARD_ADD = [
  [6,7],[6,8],[6,9],[7,7],[7,8],[7,9],[8,8],[8,9],[9,9],
  [6,5],[7,6],[8,7],[9,8],[5,9],[4,8],[4,9],[3,9],[3,8],
  [12,9],[13,8],[14,7],[15,6],[16,5],[11,9],[13,9],[14,8],[15,7],[16,8],[17,6],[17,7],[18,6],[18,4],[18,5],[19,4]
];
const HARD_SUB = [
  [11,3],[11,4],[11,5],[12,3],[12,4],[12,5],[12,6],[12,7],[13,4],[13,5],[13,6],[13,7],[13,8],[13,9],
  [14,5],[14,6],[14,7],[14,8],[14,9],[15,6],[15,7],[15,8],[15,9],[16,7],[16,8],[16,9],[17,8],[17,9],[18,9],
  [21,6],[22,7],[23,8],[24,9],[25,6],[25,7],[32,7],[33,8],[34,6],[41,9],[42,8],[43,7]
];

function genProblem() {
  const op = pick(settings.operations);
  let a, b, answer, sym;
  if (op === 'add') {
    [a, b] = pick(HARD_ADD);
    if (Math.random() < 0.5) [a, b] = [b, a];
    answer = a + b; sym = '+';
  } else if (op === 'sub') {
    [a, b] = pick(HARD_SUB);
    answer = a - b; sym = '−';
  } else if (op === 'mul') {
    a = rand(2, 12); b = rand(2, 12);
    answer = a * b; sym = '×';
  } else { // div
    b = rand(2, 12);
    const q = rand(2, 12);
    a = b * q;
    answer = q; sym = '÷';
  }
  return { a, b, answer, sym, text: `${a} ${sym} ${b}` };
}

// ---------- Dragon helpers ----------
function ownedDragons() { return state.owned.map(id => DRAGONS[id]).filter(Boolean); }

function combinedAbility() {
  const combined = { damageMul: 1, coinMul: 1, critChance: 0, luckyCoin: 0,
                     shield: 0, streakShield: 0, timeBonus: 0, speedCoinBonus: 0, sellBonus: 0 };
  settings.selectedDragons.forEach(id => {
    const d = DRAGONS[id];
    if (!d) return;
    Object.keys(d.ability).forEach(k => {
      if (k === 'damageMul' || k === 'coinMul') combined[k] *= d.ability[k];
      else combined[k] += d.ability[k];
    });
  });
  return combined;
}

// ---------- Home ----------
function refreshHome() {
  $('#player-name').textContent = state.name;
  $('#home-coins').textContent = state.coins.toLocaleString();
  $('#home-dragons').textContent = state.owned.length;
  $('#home-floor').textContent = state.highestFloor;
  $('#menu-floor').textContent = state.currentFloor;
}

// ---------- Practice setup ----------
function refreshPracticeSetup() {
  $('#practice-coins').textContent = state.coins.toLocaleString();
  // modes
  $$('.mode-option').forEach(b => b.classList.toggle('selected', b.dataset.mode === settings.mode));
  // ops
  $$('.op-chip').forEach(b => b.classList.toggle('selected', settings.operations.includes(b.dataset.op)));
  // dragon picker
  renderDragonPicker('#practice-dragon-picker');
}

$$('.mode-option').forEach(b => {
  b.addEventListener('click', () => {
    settings.mode = b.dataset.mode;
    refreshPracticeSetup();
  });
});
$$('.op-chip').forEach(b => {
  b.addEventListener('click', () => {
    const op = b.dataset.op;
    if (settings.operations.includes(op)) {
      if (settings.operations.length > 1) {
        settings.operations = settings.operations.filter(o => o !== op);
      }
    } else {
      settings.operations.push(op);
    }
    refreshPracticeSetup();
  });
});

function renderDragonPicker(containerSel) {
  const container = $(containerSel);
  container.innerHTML = '';
  const owned = ownedDragons();
  if (owned.length === 0) {
    container.innerHTML = '<div class="hoard-empty">No dragons yet. Visit the Shop.</div>';
    return;
  }
  owned.forEach(d => {
    const selected = settings.selectedDragons.includes(d.id);
    const idx = settings.selectedDragons.indexOf(d.id);
    const card = document.createElement('button');
    card.className = 'dragon-pick' + (selected ? ' selected' : '');
    card.innerHTML = `
      <span class="dp-rarity rarity-${d.rarity}"></span>
      ${selected ? `<span class="dp-badge">${idx + 1}</span>` : ''}
      <span class="dp-emoji">${d.emoji}</span>
      <span class="dp-name">${d.name}</span>
    `;
    card.addEventListener('click', () => {
      if (selected) {
        settings.selectedDragons = settings.selectedDragons.filter(id => id !== d.id);
      } else {
        if (settings.selectedDragons.length >= 3) {
          toast('3 dragons max per run.');
          return;
        }
        settings.selectedDragons.push(d.id);
      }
      // re-render current picker
      renderDragonPicker(containerSel);
    });
    container.appendChild(card);
  });
}

// ---------- Practice play ----------
let play = null;

$('#practice-start').addEventListener('click', () => {
  startPractice();
});

function startPractice() {
  play = {
    mode: settings.mode,
    score: 0,
    coins: 0,
    streak: 0,
    correct: 0,
    total: 0,
    fastest: null,
    sumTime: 0,
    current: null,
    qStart: 0,
    answer: '',
    finished: false,
    startTime: Date.now(),
    abil: combinedAbility()
  };
  if (play.mode === 'sprint') {
    play.timeLeft = 60;
  } else if (play.mode === 'beat') {
    play.qRemaining = 20;
  }
  // init UI
  $('#play-score').textContent = 0;
  $('#play-coins-run').textContent = 0;
  updatePlayTimer();
  nav('play');
  nextProblem();
  if (play.mode === 'sprint') {
    play.tickInterval = setInterval(() => {
      play.timeLeft--;
      updatePlayTimer();
      if (play.timeLeft <= 0) endPractice();
    }, 1000);
  }
}

function updatePlayTimer() {
  if (!play) return;
  let text = '';
  if (play.mode === 'sprint') text = play.timeLeft;
  else if (play.mode === 'streak') text = '∞';
  else if (play.mode === 'beat') text = ((Date.now() - play.startTime)/1000).toFixed(1);
  $('#play-timer').textContent = text;
}

function nextProblem() {
  play.current = genProblem();
  play.qStart = Date.now();
  play.answer = '';
  $('#play-question').textContent = play.current.text;
  const ans = $('#play-answer');
  ans.textContent = '\u00A0';
  ans.classList.remove('correct', 'wrong');
  // restart animation
  $('#play-question').style.animation = 'none';
  void $('#play-question').offsetWidth;
  $('#play-question').style.animation = '';
}

function submitPracticeAnswer() {
  if (!play || play.finished) return;
  if (play.answer === '' || play.answer === '-') return;
  const userAns = parseInt(play.answer, 10);
  if (isNaN(userAns)) return;
  const correct = userAns === play.current.answer;
  const elapsed = (Date.now() - play.qStart) / 1000;
  play.total++;
  const ansEl = $('#play-answer');
  if (correct) {
    play.correct++;
    play.streak++;
    play.sumTime += elapsed;
    play.fastest = play.fastest === null ? elapsed : Math.min(play.fastest, elapsed);
    ansEl.classList.add('correct');
    // coin math: 1 base + fast bonus
    let reward = 1;
    if (elapsed < 2) reward = 3;
    else if (elapsed < 4) reward = 2;
    // dragon multipliers
    reward *= play.abil.coinMul;
    if (play.abil.speedCoinBonus && elapsed < 2) reward += 2;
    if (play.abil.luckyCoin && Math.random() < play.abil.luckyCoin) reward += 2;
    reward = Math.round(reward);
    play.coins += reward;
    // streak bonus
    if (play.streak > 0 && play.streak % 10 === 0) {
      play.coins += 20;
      showFeedback('Streak x' + play.streak + '!  +20 🪙', 'good');
    } else if (elapsed < 2) {
      showFeedback('Lightning! +' + reward, 'crit');
    } else {
      showFeedback('+' + reward, 'good');
    }
    $('#play-score').textContent = play.correct;
    $('#play-coins-run').textContent = play.coins;
    setTimeout(() => {
      if (play.finished) return;
      if (play.mode === 'beat') {
        play.qRemaining--;
        if (play.qRemaining <= 0) { endPractice(); return; }
      }
      nextProblem();
    }, 350);
  } else {
    // wrong
    ansEl.classList.add('wrong');
    if (play.mode === 'streak') {
      // check shield
      if (play.abil.streakShield > 0) {
        play.abil.streakShield--;
        showFeedback('Shield saved you!', 'good');
        play.streak = 0;  // still reset? or keep? let's reset streak progress but don't end
        setTimeout(() => { if (!play.finished) nextProblem(); }, 500);
      } else {
        showFeedback('Streak broken. Answer: ' + play.current.answer, 'miss');
        setTimeout(() => endPractice(), 1200);
        play.finished = true;
      }
    } else {
      play.streak = 0;
      showFeedback('✗ ' + play.current.answer, 'miss');
      setTimeout(() => { if (!play.finished) nextProblem(); }, 700);
    }
  }
}

function showFeedback(text, kind) {
  const fx = $('#play-feedback');
  fx.textContent = text;
  fx.className = 'feedback show-' + kind;
  setTimeout(() => { fx.className = 'feedback'; }, 900);
}

function endPractice() {
  if (!play) return;
  play.finished = true;
  clearInterval(play.tickInterval);
  const totalTime = (Date.now() - play.startTime) / 1000;
  const avgTime = play.correct ? (play.sumTime / play.correct).toFixed(2) : '—';

  // Save best stats
  if (play.mode === 'sprint' && play.correct > state.bestSprint) state.bestSprint = play.correct;
  if (play.mode === 'streak' && play.streak > state.bestStreak) state.bestStreak = play.streak;
  if (play.mode === 'beat' && play.correct >= 20) {
    if (state.bestBeatTime === null || totalTime < state.bestBeatTime) state.bestBeatTime = totalTime;
  }
  state.coins += play.coins;
  saveState();

  // Results
  const titles = {
    sprint: play.correct >= 15 ? 'Dragonbreath!' : play.correct >= 8 ? 'Well fought' : 'Onward',
    streak: play.streak >= 15 ? 'Unbroken!' : play.streak >= 5 ? 'Fierce' : 'Try again',
    beat: play.correct >= 20 ? 'Record!' : 'Incomplete'
  };
  const subs = {
    sprint: `${play.correct} answers in 60 seconds`,
    streak: `${play.streak} in a row`,
    beat: play.correct >= 20 ? `20 questions · ${totalTime.toFixed(1)}s` : `Only ${play.correct}/20 answered`
  };
  $('#results-title').textContent = titles[play.mode];
  $('#results-sub').textContent = subs[play.mode];
  const grid = $('#results-grid');
  grid.innerHTML = '';
  const stats = [
    { label: 'Correct', value: play.correct },
    { label: 'Avg Time', value: avgTime + 's' },
    { label: 'Fastest', value: play.fastest ? play.fastest.toFixed(2) + 's' : '—' },
    { label: play.mode === 'sprint' ? 'Best Ever' : play.mode === 'streak' ? 'Best Streak' : 'Best Time',
      value: play.mode === 'sprint' ? state.bestSprint : play.mode === 'streak' ? state.bestStreak
             : (state.bestBeatTime ? state.bestBeatTime.toFixed(1) + 's' : '—') }
  ];
  stats.forEach(s => {
    const el = document.createElement('div');
    el.className = 'result-stat';
    el.innerHTML = `<div class="result-stat-value">${s.value}</div><div class="result-stat-label">${s.label}</div>`;
    grid.appendChild(el);
  });
  $('#results-coins').textContent = play.coins;
  $('#results-drop').classList.add('hidden'); // no drops in practice

  $('#results-again').onclick = () => {
    if (play.mode === 'sprint') startPractice();
    else if (play.mode === 'streak') startPractice();
    else startPractice();
  };

  nav('results');
}

// Keypad handlers (practice)
$$('#keypad button').forEach(b => {
  b.addEventListener('click', () => pressKey(b.dataset.key));
});
function pressKey(key) {
  if (!play || play.finished) return;
  if (key === 'del') {
    play.answer = play.answer.slice(0, -1);
  } else if (key === '-') {
    if (play.answer === '') play.answer = '-';
    else if (play.answer === '-') play.answer = '';
  } else {
    play.answer += key;
    if (play.answer.length > 4) play.answer = play.answer.slice(0, 4);
  }
  $('#play-answer').textContent = play.answer || '\u00A0';
  // Auto-submit when answer is plausible and length matches
  if (play.answer && play.answer !== '-') {
    // Submit when length matches expected length, or after pause
    const expectedLen = String(play.current.answer).length;
    if (play.answer.length >= expectedLen) {
      clearTimeout(pressKey._t);
      pressKey._t = setTimeout(submitPracticeAnswer, 200);
    }
  }
}

// Quit play
$('#quit-play').addEventListener('click', () => {
  if (!play) { nav('home'); return; }
  if (confirm('Quit this run? Progress this round will be lost.')) {
    play.finished = true;
    clearInterval(play.tickInterval);
    state.coins += play.coins;  // keep coins earned
    saveState();
    nav('home');
  }
});

// ---------- Shop ----------
function renderShop() {
  $('#shop-coins').textContent = state.coins.toLocaleString();
  const grid = $('#shop-grid');
  grid.innerHTML = '';
  DRAGON_ORDER.forEach(id => {
    const d = DRAGONS[id];
    if (d.price === 0) return; // hatchling is free/starter
    const owned = state.owned.includes(id);
    const canAfford = state.coins >= d.price;
    const card = document.createElement('div');
    card.className = 'shop-card' + (owned ? ' owned' : '');
    card.innerHTML = `
      <div class="shop-emoji">${d.emoji}</div>
      <div class="shop-info">
        <div class="shop-name">
          <span class="shop-rarity-dot rarity-${d.rarity}"></span>${d.name}
        </div>
        <div class="shop-desc">${d.desc}</div>
      </div>
      ${owned
        ? `<button class="shop-sell" data-sell="${id}">Sell<br><small>🪙 ${Math.round(d.price * sellRate())}</small></button>`
        : `<button class="shop-buy" data-buy="${id}" ${canAfford ? '' : 'disabled'}>
             <span class="shop-buy-price">🪙 ${d.price}</span>
             <span class="shop-buy-label">Summon</span>
           </button>`}
    `;
    grid.appendChild(card);
  });
  // Buy / Sell handlers
  grid.querySelectorAll('[data-buy]').forEach(b => b.addEventListener('click', () => buy(b.dataset.buy)));
  grid.querySelectorAll('[data-sell]').forEach(b => b.addEventListener('click', () => sell(b.dataset.sell)));
}

function sellRate() {
  // 0.5 base, +0.3 if Crystal Wyrm owned
  return state.owned.includes('crystal') ? 0.8 : 0.5;
}

function buy(id) {
  const d = DRAGONS[id];
  if (!d) return;
  if (state.coins < d.price) { toast('Not enough gold.'); return; }
  if (state.owned.includes(id)) return;
  state.coins -= d.price;
  state.owned.push(id);
  saveState();
  toast(`${d.name} summoned! 🔥`);
  renderShop();
}

function sell(id) {
  const d = DRAGONS[id];
  if (!d) return;
  if (id === 'hatchling') { toast('You cannot sell your first companion.'); return; }
  if (!confirm(`Sell ${d.name} for ${Math.round(d.price * sellRate())} gold?`)) return;
  state.coins += Math.round(d.price * sellRate());
  state.owned = state.owned.filter(x => x !== id);
  settings.selectedDragons = settings.selectedDragons.filter(x => x !== id);
  saveState();
  toast(`${d.name} released.`);
  renderShop();
}

// ---------- Hoard ----------
function renderHoard() {
  $('#hoard-coins').textContent = state.coins.toLocaleString();
  const grid = $('#hoard-grid');
  grid.innerHTML = '';
  DRAGON_ORDER.forEach(id => {
    const d = DRAGONS[id];
    const owned = state.owned.includes(id);
    const card = document.createElement('div');
    card.className = 'hoard-card' + (owned ? '' : ' locked');
    card.innerHTML = `
      <span class="hc-rarity rarity-${d.rarity}"></span>
      <span class="hc-emoji">${owned ? d.emoji : '❓'}</span>
      <span class="hc-name">${owned ? d.name : '???'}</span>
    `;
    grid.appendChild(card);
  });
}

// ---------- Battle ----------
function enemyForFloor(floor) {
  const isBoss = floor % 5 === 0;
  const tierIdx = Math.min(Math.floor((floor - 1) / 5), ENEMIES.length - 1);
  const tier = ENEMIES[tierIdx];
  const name = pick(tier.names);
  const baseHP = 80 + floor * 20;
  const hp = isBoss ? Math.round(baseHP * 1.6) : baseHP;
  const reward = 20 + floor * 5 + (isBoss ? 50 : 0);
  return {
    emoji: isBoss ? '👑' + tier.emoji : tier.emoji,
    name: isBoss ? `${name} (Boss)` : name,
    hp, maxHp: hp, reward, isBoss
  };
}

function refreshBattleSetup() {
  $('#battle-coins').textContent = state.coins.toLocaleString();
  $('#battle-floor-label').textContent = state.currentFloor;
  const enemy = enemyForFloor(state.currentFloor);
  $('#enemy-emoji').textContent = enemy.emoji;
  $('#enemy-name').textContent = enemy.name;
  $('#enemy-hp').textContent = enemy.hp;
  $('#enemy-reward').textContent = enemy.reward;
  renderDragonPicker('#battle-dragon-picker');
}

$('#battle-start').addEventListener('click', startBattle);

let battle = null;

function startBattle() {
  const enemy = enemyForFloor(state.currentFloor);
  const abil = combinedAbility();
  battle = {
    floor: state.currentFloor,
    enemy,
    enemyHP: enemy.hp,
    playerHP: 3,
    finished: false,
    current: null,
    qStart: 0,
    answer: '',
    abil,
    shieldLeft: abil.shield || 0,
    coins: 0,
    correct: 0,
    total: 0,
    perQTime: 10 + (abil.timeBonus || 0),
    qTimer: null,
    droppedDragon: null
  };
  updateBattleUI();
  nav('battle');
  nextBattleQuestion();
}

function updateBattleUI() {
  $('#battle-floor-num').textContent = battle.floor;
  $('#battle-enemy-emoji').textContent = battle.enemy.emoji;
  $('#battle-enemy-name').textContent = battle.enemy.name;
  $('#battle-hp-cur').textContent = Math.max(0, battle.enemyHP);
  $('#battle-hp-max').textContent = battle.enemy.maxHp;
  const pct = Math.max(0, battle.enemyHP) / battle.enemy.maxHp * 100;
  $('#battle-hp-fill').style.width = pct + '%';
  // hearts
  const hearts = [];
  for (let i = 0; i < 3; i++) {
    hearts.push(i < battle.playerHP ? '❤️' : '<span class="lost">❤️</span>');
  }
  $('#battle-hearts').innerHTML = hearts.join('');
}

function nextBattleQuestion() {
  if (!battle || battle.finished) return;
  battle.current = genProblem();
  battle.qStart = Date.now();
  battle.answer = '';
  battle.timeLeft = battle.perQTime;
  $('#battle-question').textContent = battle.current.text;
  $('#battle-answer').textContent = '\u00A0';
  // Timer ring
  const ring = $('#timer-ring-fg');
  ring.style.strokeDashoffset = 0;
  $('.timer-ring').classList.remove('warn');
  startBattleTimer();
}

function startBattleTimer() {
  if (battle.qTimer) clearInterval(battle.qTimer);
  const start = Date.now();
  battle.qTimer = setInterval(() => {
    const elapsed = (Date.now() - start) / 1000;
    const remaining = battle.perQTime - elapsed;
    $('#battle-time').textContent = Math.max(0, Math.ceil(remaining));
    // ring
    const pct = Math.max(0, remaining / battle.perQTime);
    $('#timer-ring-fg').style.strokeDashoffset = (1 - pct) * 283;
    if (remaining < 3) $('.timer-ring').classList.add('warn');
    if (remaining <= 0) {
      clearInterval(battle.qTimer);
      battleWrong(true);
    }
  }, 100);
}

function submitBattleAnswer() {
  if (!battle || battle.finished) return;
  if (battle.answer === '' || battle.answer === '-') return;
  clearInterval(battle.qTimer);
  const userAns = parseInt(battle.answer, 10);
  if (isNaN(userAns)) return;
  const elapsed = (Date.now() - battle.qStart) / 1000;
  battle.total++;
  if (userAns === battle.current.answer) {
    battle.correct++;
    // damage
    let dmg;
    let label;
    if (elapsed < 2) { dmg = 30; label = 'CRITICAL!'; }
    else if (elapsed < 4) { dmg = 20; label = 'Hit! −20'; }
    else if (elapsed < 6) { dmg = 15; label = '−15'; }
    else { dmg = 10; label = '−10'; }
    // crit chance from dragon
    if (battle.abil.critChance && Math.random() < battle.abil.critChance) {
      dmg = 30; label = 'CRITICAL!';
    }
    dmg = Math.round(dmg * (battle.abil.damageMul || 1));
    battle.enemyHP -= dmg;
    showBattleFX('−' + dmg);
    $('#battle-enemy-emoji').classList.add('hit');
    setTimeout(() => $('#battle-enemy-emoji').classList.remove('hit'), 300);
    updateBattleUI();
    if (battle.enemyHP <= 0) return winBattle();
    setTimeout(() => { if (!battle.finished) nextBattleQuestion(); }, 500);
  } else {
    battleWrong(false);
  }
}

function battleWrong(isTimeout) {
  if (battle.shieldLeft > 0) {
    battle.shieldLeft--;
    showBattleFX('🛡️ BLOCKED');
    setTimeout(() => { if (!battle.finished) nextBattleQuestion(); }, 700);
    return;
  }
  battle.playerHP--;
  showBattleFX(isTimeout ? 'TOO SLOW' : 'MISS');
  updateBattleUI();
  if (battle.playerHP <= 0) return loseBattle();
  setTimeout(() => { if (!battle.finished) nextBattleQuestion(); }, 800);
}

function showBattleFX(text) {
  const fx = $('#battle-fx');
  fx.textContent = text;
  fx.className = 'floating-fx';
  void fx.offsetWidth;
  fx.classList.add('show');
}

function winBattle() {
  battle.finished = true;
  clearInterval(battle.qTimer);
  const coins = battle.enemy.reward;
  battle.coins = coins;
  state.coins += coins;
  state.currentFloor++;
  if (state.currentFloor > state.highestFloor) state.highestFloor = state.currentFloor;

  // Dragon drop chance
  const dropChance = battle.enemy.isBoss ? 0.7 : 0.08;
  let dropped = null;
  if (Math.random() < dropChance) {
    // pick an unowned dragon, weighted by rarity
    const pool = DRAGON_ORDER.filter(id => !state.owned.includes(id) && DRAGONS[id].price > 0);
    if (pool.length > 0) {
      // prefer rarer ones on boss
      const weighted = battle.enemy.isBoss
        ? pool.sort((a,b) => DRAGONS[b].price - DRAGONS[a].price).slice(0, 3)
        : pool;
      dropped = pick(weighted);
      state.owned.push(dropped);
    }
  }
  saveState();
  showBattleResults({ win: true, dropped });
}

function loseBattle() {
  battle.finished = true;
  clearInterval(battle.qTimer);
  // consolation coins - half of what floor would give
  const consolation = Math.floor(battle.enemy.reward / 3);
  battle.coins = consolation;
  state.coins += consolation;
  saveState();
  showBattleResults({ win: false });
}

function showBattleResults({ win, dropped }) {
  $('#results-title').textContent = win ? 'Victory!' : 'Defeated';
  $('#results-sub').textContent = win
    ? `Floor ${battle.floor} cleared`
    : `The ${battle.enemy.name} bested you. Try again.`;
  const grid = $('#results-grid');
  grid.innerHTML = '';
  const stats = [
    { label: 'Correct', value: battle.correct },
    { label: 'Total Qs', value: battle.total },
    { label: 'Next Floor', value: state.currentFloor },
    { label: 'Highest', value: state.highestFloor }
  ];
  stats.forEach(s => {
    const el = document.createElement('div');
    el.className = 'result-stat';
    el.innerHTML = `<div class="result-stat-value">${s.value}</div><div class="result-stat-label">${s.label}</div>`;
    grid.appendChild(el);
  });
  $('#results-coins').textContent = battle.coins;
  const dropEl = $('#results-drop');
  if (dropped) {
    const d = DRAGONS[dropped];
    dropEl.classList.remove('hidden');
    $('#results-drop-card').innerHTML = `${d.emoji} <span class="dn">${d.name}</span>`;
  } else {
    dropEl.classList.add('hidden');
  }
  $('#results-again').textContent = win ? 'Next Floor' : 'Try Again';
  $('#results-again').onclick = () => nav('battle-setup');
  nav('results');
}

// Battle keypad
$$('#battle-keypad button').forEach(b => {
  b.addEventListener('click', () => pressBattleKey(b.dataset.bkey));
});
function pressBattleKey(key) {
  if (!battle || battle.finished) return;
  if (key === 'del') {
    battle.answer = battle.answer.slice(0, -1);
  } else if (key === '-') {
    if (battle.answer === '') battle.answer = '-';
    else if (battle.answer === '-') battle.answer = '';
  } else {
    battle.answer += key;
    if (battle.answer.length > 4) battle.answer = battle.answer.slice(0, 4);
  }
  $('#battle-answer').textContent = battle.answer || '\u00A0';
  if (battle.answer && battle.answer !== '-') {
    const expectedLen = String(battle.current.answer).length;
    if (battle.answer.length >= expectedLen) {
      clearTimeout(pressBattleKey._t);
      pressBattleKey._t = setTimeout(submitBattleAnswer, 150);
    }
  }
}

$('#quit-battle').addEventListener('click', () => {
  if (!battle) { nav('home'); return; }
  if (confirm('Flee this battle? You keep gold earned but lose the floor.')) {
    battle.finished = true;
    clearInterval(battle.qTimer);
    nav('home');
  }
});

// ---------- Reset ----------
$('#reset-btn').addEventListener('click', () => {
  if (confirm('Reset ALL progress? This cannot be undone.')) resetState();
});

// ---------- Keyboard support ----------
document.addEventListener('keydown', (e) => {
  const active = document.querySelector('.screen.active');
  if (!active) return;
  const id = active.id;
  if (id === 'screen-play') {
    if (/^[0-9]$/.test(e.key)) pressKey(e.key);
    else if (e.key === 'Backspace') pressKey('del');
    else if (e.key === '-') pressKey('-');
    else if (e.key === 'Enter') submitPracticeAnswer();
  } else if (id === 'screen-battle') {
    if (/^[0-9]$/.test(e.key)) pressBattleKey(e.key);
    else if (e.key === 'Backspace') pressBattleKey('del');
    else if (e.key === '-') pressBattleKey('-');
    else if (e.key === 'Enter') submitBattleAnswer();
  }
});

// ---------- Init ----------
function refreshAllUI() {
  refreshHome();
}

refreshAllUI();
nav('home');
