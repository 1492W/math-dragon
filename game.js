/* ============================================================
   DRAGON MATH - Game Logic
   ============================================================ */

// ---------- Dragon catalog ----------
const DRAGONS = {
  // ----- Common -----
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
  // ----- Rare -----
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
  frost: {
    id: 'frost', name: 'Frost Wyrm', emoji: '❄️',
    rarity: 'rare', price: 650,
    desc: '+2 seconds per question. +25% battle damage.',
    ability: { timeBonus: 2, damageMul: 1.25 }
  },
  earth: {
    id: 'earth', name: 'Earth Titan', emoji: '🗿',
    rarity: 'rare', price: 700,
    desc: 'Survive 1 wrong answer. +20% battle damage.',
    ability: { shield: 1, damageMul: 1.2 }
  },
  // ----- Epic -----
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
  storm: {
    id: 'storm', name: 'Storm Drake', emoji: '⚡',
    rarity: 'epic', price: 1400,
    desc: '+60% damage on fast answers. Lightning strikes twice.',
    ability: { damageMul: 1.6, critChance: 0.2 }
  },
  shadow: {
    id: 'shadow', name: 'Shadow Serpent', emoji: '🌑',
    rarity: 'epic', price: 1600,
    desc: '+30% gold, +35% crit, 25% bonus drops.',
    ability: { coinMul: 1.3, critChance: 0.35, luckyCoin: 0.25 }
  },
  // ----- Legendary -----
  elder: {
    id: 'elder', name: 'Elder Sovereign', emoji: '👑',
    rarity: 'legendary', price: 2800,
    desc: 'Ancient power: +30% damage, +2s, +50% gold.',
    ability: { damageMul: 1.3, timeBonus: 2, coinMul: 1.5 }
  },
  celestial: {
    id: 'celestial', name: 'Celestial Drake', emoji: '⭐',
    rarity: 'legendary', price: 3500,
    desc: '+60% gold. +40% crit. +30% bonus drops. Starborn power.',
    ability: { coinMul: 1.6, critChance: 0.4, luckyCoin: 0.3 }
  },
  void: {
    id: 'void', name: 'Void Wyrm', emoji: '🌀',
    rarity: 'legendary', price: 4200,
    desc: '+80% damage. Survive 2 wrong answers. Unstoppable.',
    ability: { damageMul: 1.8, shield: 2, streakShield: 1 }
  },
  // ----- Mythic (new tier) -----
  cosmos: {
    id: 'cosmos', name: 'Cosmos Sovereign', emoji: '🌌',
    rarity: 'mythic', price: 8000,
    desc: 'All stats blessed: +50% dmg, +3s, +75% gold, +30% crit.',
    ability: { damageMul: 1.5, timeBonus: 3, coinMul: 1.75, critChance: 0.3 }
  },
  solar: {
    id: 'solar', name: 'Solar Tyrant', emoji: '☀️',
    rarity: 'mythic', price: 9500,
    desc: 'Sun-forged: 2.2× damage, 50% crit, shield x2.',
    ability: { damageMul: 2.2, critChance: 0.5, shield: 2 }
  },
  primordial: {
    id: 'primordial', name: 'Primordial Wyrm', emoji: '🌋',
    rarity: 'mythic', price: 12000,
    desc: 'First of dragons: 2× damage, 2× gold, +5s, +40% crit.',
    ability: { damageMul: 2.0, coinMul: 2.0, timeBonus: 5, critChance: 0.4 }
  },
  // ----- Ascended forms (created by upgrading, not buyable) -----
  hatchling_a: { id: 'hatchling_a', name: 'Radiant Hatchling', emoji: '✨🐣', rarity: 'rare', price: 0, ascendedFrom: 'hatchling', desc: '(Ascended) +20% gold, +1s. Grown with love.', ability: { coinMul: 1.2, timeBonus: 1 } },
  ember_a:     { id: 'ember_a',     name: 'Ember Lord',        emoji: '✨🐲', rarity: 'epic',     price: 0, ascendedFrom: 'ember',     desc: '(Ascended) +50% damage, +50% gold.', ability: { damageMul: 1.5, coinMul: 1.5 } },
  swift_a:     { id: 'swift_a',     name: 'Skywing Sovereign',  emoji: '✨🪽', rarity: 'epic',     price: 0, ascendedFrom: 'swift',    desc: '(Ascended) +5s per question, big speed gold.', ability: { timeBonus: 5, speedCoinBonus: 2, coinMul: 1.2 } },
  fire_a:      { id: 'fire_a',      name: 'Inferno Tyrant',    emoji: '✨🔥', rarity: 'legendary', price: 0, ascendedFrom: 'fire',    desc: '(Ascended) +90% damage, 3× gold.', ability: { damageMul: 1.9, coinMul: 3.0 } },
  guardian_a:  { id: 'guardian_a',  name: 'Adamant Bulwark',   emoji: '✨🛡️', rarity: 'epic',    price: 0, ascendedFrom: 'guardian', desc: '(Ascended) Survive 2 wrongs, streak-proof.', ability: { shield: 2, streakShield: 2 } },
  frost_a:     { id: 'frost_a',     name: 'Glacial Sovereign', emoji: '✨❄️', rarity: 'epic',    price: 0, ascendedFrom: 'frost',    desc: '(Ascended) +5s, +60% damage.', ability: { timeBonus: 5, damageMul: 1.6 } },
  earth_a:     { id: 'earth_a',     name: 'Mountain Lord',     emoji: '✨🗿', rarity: 'epic',    price: 0, ascendedFrom: 'earth',    desc: '(Ascended) Shield x2, +60% damage.', ability: { shield: 2, damageMul: 1.6 } },
  fortune_a:   { id: 'fortune_a',   name: 'Fortune Sovereign', emoji: '✨🍀', rarity: 'legendary', price: 0, ascendedFrom: 'fortune', desc: '(Ascended) +55% crit, +40% bonus gold.', ability: { critChance: 0.55, luckyCoin: 0.4, coinMul: 1.3 } },
  crystal_a:   { id: 'crystal_a',   name: 'Diamond Wyrm',      emoji: '✨💎', rarity: 'legendary', price: 0, ascendedFrom: 'crystal', desc: '(Ascended) +80% damage, 100% sell rate.', ability: { damageMul: 1.8, sellBonus: 0.5 } },
  storm_a:     { id: 'storm_a',     name: 'Thunder Emperor',   emoji: '✨⚡', rarity: 'legendary', price: 0, ascendedFrom: 'storm',    desc: '(Ascended) Double damage, 40% crit.', ability: { damageMul: 2.0, critChance: 0.4 } },
  shadow_a:    { id: 'shadow_a',    name: 'Eclipse Serpent',   emoji: '✨🌑', rarity: 'legendary', price: 0, ascendedFrom: 'shadow',   desc: '(Ascended) +60% gold, 65% crit, 50% drops.', ability: { coinMul: 1.6, critChance: 0.65, luckyCoin: 0.5 } },
  elder_a:     { id: 'elder_a',     name: 'Eternal Sovereign', emoji: '✨👑', rarity: 'mythic',   price: 0, ascendedFrom: 'elder',    desc: '(Ascended) +60% dmg, +4s, double gold.', ability: { damageMul: 1.6, timeBonus: 4, coinMul: 2.0 } },
  celestial_a: { id: 'celestial_a', name: 'Astral Monarch',    emoji: '✨⭐', rarity: 'mythic',   price: 0, ascendedFrom: 'celestial', desc: '(Ascended) Triple gold, 70% crit, 60% drops.', ability: { coinMul: 3.0, critChance: 0.7, luckyCoin: 0.6 } },
  void_a:      { id: 'void_a',      name: 'Abyss Sovereign',   emoji: '✨🌀', rarity: 'mythic',   price: 0, ascendedFrom: 'void',      desc: '(Ascended) 2.5× damage, shield x4.', ability: { damageMul: 2.5, shield: 4, streakShield: 2 } },
  cosmos_a:    { id: 'cosmos_a',    name: 'Galactic Overlord', emoji: '✨🌌', rarity: 'mythic',   price: 0, ascendedFrom: 'cosmos',   desc: '(Ascended) +90% dmg, +5s, +125% gold, 50% crit.', ability: { damageMul: 1.9, timeBonus: 5, coinMul: 2.25, critChance: 0.5 } },
  solar_a:     { id: 'solar_a',     name: 'Sun Emperor',       emoji: '✨☀️', rarity: 'mythic',   price: 0, ascendedFrom: 'solar',    desc: '(Ascended) 3× damage, 75% crit, shield x4.', ability: { damageMul: 3.0, critChance: 0.75, shield: 4 } },
  primordial_a: { id: 'primordial_a', name: 'World Wyrm',      emoji: '✨🌋', rarity: 'mythic',   price: 0, ascendedFrom: 'primordial', desc: '(Ascended) 3× dmg & gold, +8s, 60% crit.', ability: { damageMul: 3.0, coinMul: 3.0, timeBonus: 8, critChance: 0.6 } }
};

const DRAGON_ORDER = [
  'hatchling','ember',
  'swift','fire','guardian','frost','earth',
  'fortune','crystal','storm','shadow',
  'elder','celestial','void',
  'cosmos','solar','primordial'
];

const ASCENDED_ORDER = [
  'hatchling_a','ember_a','swift_a','fire_a','guardian_a','frost_a','earth_a',
  'fortune_a','crystal_a','storm_a','shadow_a',
  'elder_a','celestial_a','void_a',
  'cosmos_a','solar_a','primordial_a'
];

// Rarity tiers (for sorting, drop weights, egg hatching)
const RARITY_TIER = { common: 0, rare: 1, epic: 2, legendary: 3, mythic: 4 };

// Egg types
const EGGS = {
  common: { id: 'common', name: 'Mystery Egg', emoji: '🥚', price: 300,
            weights: { common: 0.65, rare: 0.30, epic: 0.05 } },
  rare:   { id: 'rare',   name: 'Rare Egg',    emoji: '🟢', price: 900,
            weights: { rare: 0.40, epic: 0.45, legendary: 0.15 } },
  mythic: { id: 'mythic', name: 'Mythic Egg',  emoji: '🟣', price: 2500,
            weights: { epic: 0.55, legendary: 0.35, mythic: 0.10 } }
};

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
  version: 2,
  name: 'Pordee',
  coins: 0,
  dragons: { hatchling: 1 },  // map of id → count (supports duplicates for upgrade)
  highestFloor: 1,
  currentFloor: 1,
  bestSprint: 0,
  bestBeatTime: null,
  bestStreak: 0,
  // Daily bonus
  lastClaimDate: null,    // YYYY-MM-DD
  dailyStreak: 0,         // consecutive days claimed
  // Stats for fun
  totalCorrect: 0,
  totalEggsHatched: 0,
  totalAscensions: 0
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
    // --- Migration from v1 (owned array) to v2 (dragons map) ---
    if (Array.isArray(parsed.owned) && !parsed.dragons) {
      parsed.dragons = {};
      parsed.owned.forEach(id => { parsed.dragons[id] = (parsed.dragons[id] || 0) + 1; });
      delete parsed.owned;
      parsed.version = 2;
    }
    // Ensure hatchling always exists
    if (!parsed.dragons) parsed.dragons = {};
    if (!parsed.dragons.hatchling) parsed.dragons.hatchling = 1;
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState() {
  try { localStorage.setItem('dragonMath_v1', JSON.stringify(state)); } catch {}
}

function resetState() {
  state = { ...DEFAULT_STATE, dragons: { hatchling: 1 } };
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
function ownedIds() {
  return Object.keys(state.dragons).filter(id => state.dragons[id] > 0 && DRAGONS[id]);
}
function ownedDragons() {
  return ownedIds().map(id => DRAGONS[id]);
}
function ownedCount(id) { return state.dragons[id] || 0; }
function uniqueOwnedCount() { return ownedIds().length; }
function totalDragonsCount() {
  return Object.values(state.dragons).reduce((a, b) => a + b, 0);
}

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
  $('#home-dragons').textContent = uniqueOwnedCount();
  $('#home-floor').textContent = state.highestFloor;
  $('#menu-floor').textContent = state.currentFloor;
  // Daily bonus dot
  const dot = $('#daily-dot');
  if (dot) dot.style.display = canClaimDaily() ? 'block' : 'none';
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
let shopTab = 'dragons'; // 'dragons' or 'eggs'

function renderShop() {
  $('#shop-coins').textContent = state.coins.toLocaleString();
  // tab highlighting
  $$('.shop-tab').forEach(b => b.classList.toggle('selected', b.dataset.tab === shopTab));
  if (shopTab === 'eggs') { renderEggShop(); return; }

  const grid = $('#shop-grid');
  grid.innerHTML = '';
  DRAGON_ORDER.forEach(id => {
    const d = DRAGONS[id];
    if (d.price === 0) return;
    const count = ownedCount(id);
    const canAfford = state.coins >= d.price;
    const card = document.createElement('div');
    card.className = 'shop-card';
    card.innerHTML = `
      <div class="shop-emoji">${d.emoji}</div>
      <div class="shop-info">
        <div class="shop-name">
          <span class="shop-rarity-dot rarity-${d.rarity}"></span>${d.name}
          ${count > 0 ? `<span class="owned-count">×${count}</span>` : ''}
        </div>
        <div class="shop-desc">${d.desc}</div>
      </div>
      <button class="shop-buy" data-buy="${id}" ${canAfford ? '' : 'disabled'}>
        <span class="shop-buy-price">🪙 ${d.price.toLocaleString()}</span>
        <span class="shop-buy-label">${count > 0 ? 'Summon another' : 'Summon'}</span>
      </button>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll('[data-buy]').forEach(b => b.addEventListener('click', () => buy(b.dataset.buy)));
}

function renderEggShop() {
  const grid = $('#shop-grid');
  grid.innerHTML = '';
  const intro = document.createElement('p');
  intro.className = 'egg-intro';
  intro.innerHTML = 'Hatch eggs to discover rare dragons. Even duplicates are useful — <strong>3 of a kind</strong> can ascend in your Hoard.';
  grid.appendChild(intro);
  Object.values(EGGS).forEach(egg => {
    const canAfford = state.coins >= egg.price;
    const card = document.createElement('div');
    card.className = 'egg-card egg-' + egg.id;
    // weights display
    const weights = Object.entries(egg.weights).map(([r, w]) => {
      const pct = Math.round(w * 100);
      return `<span class="weight-chip weight-${r}">${r} ${pct}%</span>`;
    }).join('');
    card.innerHTML = `
      <div class="egg-emoji">${egg.emoji}</div>
      <div class="egg-info">
        <div class="egg-name">${egg.name}</div>
        <div class="egg-weights">${weights}</div>
      </div>
      <button class="shop-buy egg-buy" data-hatch="${egg.id}" ${canAfford ? '' : 'disabled'}>
        <span class="shop-buy-price">🪙 ${egg.price.toLocaleString()}</span>
        <span class="shop-buy-label">Hatch</span>
      </button>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll('[data-hatch]').forEach(b => b.addEventListener('click', () => hatchEgg(b.dataset.hatch)));
}

$$('.shop-tab').forEach(b => {
  b.addEventListener('click', () => { shopTab = b.dataset.tab; renderShop(); });
});

function sellRate() {
  const hasCrystal = ownedCount('crystal') > 0 || ownedCount('crystal_a') > 0;
  const hasDiamond = ownedCount('crystal_a') > 0;
  if (hasDiamond) return 1.0;
  if (hasCrystal) return 0.8;
  return 0.5;
}

function buy(id) {
  const d = DRAGONS[id];
  if (!d) return;
  if (state.coins < d.price) { toast('Not enough gold.'); return; }
  state.coins -= d.price;
  state.dragons[id] = (state.dragons[id] || 0) + 1;
  saveState();
  toast(`${d.name} summoned! 🔥`);
  renderShop();
}

function sell(id) {
  const d = DRAGONS[id];
  if (!d) return;
  if (id === 'hatchling' && ownedCount('hatchling') <= 1) {
    toast('You cannot sell your only Hatchling.');
    return;
  }
  const price = d.price > 0 ? Math.round(d.price * sellRate()) : 50;
  if (!confirm(`Sell one ${d.name} for ${price} gold?`)) return;
  state.coins += price;
  state.dragons[id] = Math.max(0, (state.dragons[id] || 0) - 1);
  if (state.dragons[id] === 0) delete state.dragons[id];
  // Also remove from selected if we no longer own any
  if (!ownedCount(id)) {
    settings.selectedDragons = settings.selectedDragons.filter(x => x !== id);
  }
  saveState();
  toast(`${d.name} released.`);
  renderHoard();
}

// ---------- Hoard ----------
function renderHoard() {
  $('#hoard-coins').textContent = state.coins.toLocaleString();
  const grid = $('#hoard-grid');
  grid.innerHTML = '';

  // Summary header
  const summary = document.createElement('div');
  summary.className = 'hoard-summary';
  summary.innerHTML = `
    <div><strong>${uniqueOwnedCount()}</strong> / ${DRAGON_ORDER.length + ASCENDED_ORDER.length} discovered</div>
    <div><strong>${totalDragonsCount()}</strong> dragons total</div>
  `;
  grid.appendChild(summary);

  // Base dragons
  const baseHeader = document.createElement('h3');
  baseHeader.className = 'hoard-section-title';
  baseHeader.textContent = 'Dragons';
  grid.appendChild(baseHeader);
  const baseRow = document.createElement('div');
  baseRow.className = 'hoard-row';
  grid.appendChild(baseRow);
  DRAGON_ORDER.forEach(id => renderHoardCard(baseRow, id));

  // Ascended section (show only if any unlocked)
  const anyAscended = ASCENDED_ORDER.some(id => ownedCount(id) > 0);
  if (anyAscended) {
    const h = document.createElement('h3');
    h.className = 'hoard-section-title';
    h.textContent = '✨ Ascended';
    grid.appendChild(h);
    const row = document.createElement('div');
    row.className = 'hoard-row';
    grid.appendChild(row);
    ASCENDED_ORDER.forEach(id => { if (ownedCount(id) > 0) renderHoardCard(row, id); });
  }
}

function renderHoardCard(container, id) {
  const d = DRAGONS[id];
  const count = ownedCount(id);
  const owned = count > 0;
  const canAscend = !id.endsWith('_a') && count >= 3 && DRAGONS[id + '_a'];
  const isAscended = id.endsWith('_a');

  const card = document.createElement('div');
  card.className = 'hoard-card' + (owned ? '' : ' locked') + (isAscended ? ' ascended' : '') + (canAscend ? ' can-ascend' : '');
  card.innerHTML = `
    <span class="hc-rarity rarity-${d.rarity}"></span>
    ${count > 1 ? `<span class="hc-count">×${count}</span>` : ''}
    <span class="hc-emoji">${owned ? d.emoji : '❓'}</span>
    <span class="hc-name">${owned ? d.name : '???'}</span>
    ${canAscend ? `<button class="hc-ascend" data-ascend="${id}">✨ Ascend</button>` : ''}
    ${owned && !isAscended && d.price > 0 ? `<button class="hc-sell" data-sell-hoard="${id}">Sell 🪙${Math.round(d.price * sellRate())}</button>` : ''}
  `;
  container.appendChild(card);

  if (canAscend) {
    card.querySelector('[data-ascend]').addEventListener('click', (e) => {
      e.stopPropagation();
      ascendDragon(id);
    });
  }
  if (owned && !isAscended && d.price > 0) {
    const sellBtn = card.querySelector('[data-sell-hoard]');
    if (sellBtn) sellBtn.addEventListener('click', (e) => { e.stopPropagation(); sell(id); });
  }
}

function ascendDragon(id) {
  const baseId = id;
  const ascendedId = baseId + '_a';
  if (!DRAGONS[ascendedId]) return;
  if (ownedCount(baseId) < 3) { toast('Need 3 to ascend.'); return; }
  const baseName = DRAGONS[baseId].name;
  const newName = DRAGONS[ascendedId].name;
  if (!confirm(`Ascend 3 ${baseName} → 1 ${newName}?\n\nThis cannot be undone.`)) return;
  state.dragons[baseId] -= 3;
  if (state.dragons[baseId] === 0) delete state.dragons[baseId];
  state.dragons[ascendedId] = (state.dragons[ascendedId] || 0) + 1;
  state.totalAscensions = (state.totalAscensions || 0) + 1;
  // Remove old id from selected dragons if we no longer own any
  if (!ownedCount(baseId)) {
    settings.selectedDragons = settings.selectedDragons.filter(x => x !== baseId);
  }
  saveState();
  showAscendAnim(ascendedId);
  renderHoard();
}

function showAscendAnim(ascendedId) {
  const d = DRAGONS[ascendedId];
  const m = $('#modal-ascend');
  $('#ascend-emoji').textContent = d.emoji;
  $('#ascend-name').textContent = d.name;
  $('#ascend-desc').textContent = d.desc;
  $('#ascend-rarity').className = 'modal-rarity rarity-' + d.rarity;
  $('#ascend-rarity').textContent = d.rarity;
  m.classList.add('show');
}

// ---------- Battle ----------
function enemyForFloor(floor) {
  const isLegendary = floor > 0 && floor % 10 === 0;  // every 10 = legendary boss
  const isBoss = !isLegendary && floor % 5 === 0;     // regular boss every 5
  const tierIdx = Math.min(Math.floor((floor - 1) / 5), ENEMIES.length - 1);
  const tier = ENEMIES[tierIdx];
  const name = pick(tier.names);
  const baseHP = 80 + floor * 20;
  let hp = baseHP;
  let reward = 20 + floor * 5;
  let emoji = tier.emoji;
  let prefix = '';
  if (isLegendary) {
    hp = Math.round(baseHP * 2.4);
    reward = 40 + floor * 8 + 150;
    emoji = '👁️';  // legendary sigil
    prefix = '💎 ';
  } else if (isBoss) {
    hp = Math.round(baseHP * 1.6);
    reward = 20 + floor * 5 + 50;
    prefix = '👑';
  }
  return {
    emoji: prefix + emoji,
    name: isLegendary ? `${name} (LEGENDARY)` : isBoss ? `${name} (Boss)` : name,
    hp, maxHp: hp, reward, isBoss, isLegendary
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
  let dropped = null;
  let freeEgg = null;
  if (battle.enemy.isLegendary) {
    // Legendary boss: guaranteed mythic egg
    freeEgg = 'mythic';
  } else if (battle.enemy.isBoss) {
    // Regular boss: 70% chance of dragon drop
    if (Math.random() < 0.7) dropped = rollDragonDrop(['epic','legendary']);
  } else {
    // Normal: 8% chance, lower rarity pool
    if (Math.random() < 0.08) dropped = rollDragonDrop(['common','rare']);
  }
  if (dropped) {
    state.dragons[dropped] = (state.dragons[dropped] || 0) + 1;
  }
  saveState();
  showBattleResults({ win: true, dropped, freeEgg });
}

// Drop pool weighted toward listed rarities
function rollDragonDrop(preferredRarities) {
  const pool = DRAGON_ORDER.filter(id => DRAGONS[id].price > 0 && preferredRarities.includes(DRAGONS[id].rarity));
  if (pool.length === 0) {
    // fallback: any non-free dragon
    const all = DRAGON_ORDER.filter(id => DRAGONS[id].price > 0);
    return pick(all);
  }
  return pick(pool);
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

function showBattleResults({ win, dropped, freeEgg }) {
  $('#results-title').textContent = win ? (battle.enemy.isLegendary ? 'LEGENDARY!' : 'Victory!') : 'Defeated';
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
  const drops = [];
  if (dropped) {
    const d = DRAGONS[dropped];
    drops.push(`${d.emoji} <span class="dn">${d.name}</span>`);
  }
  if (freeEgg) {
    // give the egg: immediately hatch it as reward
    const eggD = EGGS[freeEgg];
    drops.push(`${eggD.emoji} <span class="dn">${eggD.name} (auto-hatch)</span>`);
    // queue the hatch after results close
    battle.queuedHatch = freeEgg;
  }
  if (drops.length > 0) {
    dropEl.classList.remove('hidden');
    $('#results-drop-card').innerHTML = drops.join('<br>');
  } else {
    dropEl.classList.add('hidden');
  }
  $('#results-again').textContent = win ? 'Next Floor' : 'Try Again';
  $('#results-again').onclick = () => {
    if (battle.queuedHatch) {
      const eggId = battle.queuedHatch;
      battle.queuedHatch = null;
      doHatch(eggId, true);  // free hatch
    } else {
      nav('battle-setup');
    }
  };
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

// ---------- Egg Hatch ----------
function hatchEgg(eggId) {
  const egg = EGGS[eggId];
  if (!egg) return;
  if (state.coins < egg.price) { toast('Not enough gold.'); return; }
  state.coins -= egg.price;
  saveState();
  doHatch(eggId, false);
}

function doHatch(eggId, isFree) {
  const egg = EGGS[eggId];
  // Pick rarity by weighted chance
  const rarity = weightedPick(egg.weights);
  // Pick a random non-ascended dragon of that rarity
  const pool = DRAGON_ORDER.filter(id => DRAGONS[id].rarity === rarity && DRAGONS[id].price > 0);
  if (pool.length === 0) { toast('The egg was empty... try again.'); return; }
  const dragonId = pick(pool);
  state.dragons[dragonId] = (state.dragons[dragonId] || 0) + 1;
  state.totalEggsHatched = (state.totalEggsHatched || 0) + 1;
  saveState();
  showHatchAnim(egg, DRAGONS[dragonId], isFree);
}

function weightedPick(weights) {
  const total = Object.values(weights).reduce((a,b) => a+b, 0);
  let r = Math.random() * total;
  for (const [k, w] of Object.entries(weights)) {
    r -= w;
    if (r <= 0) return k;
  }
  return Object.keys(weights)[0];
}

function showHatchAnim(egg, dragon, isFree) {
  const m = $('#modal-hatch');
  $('#hatch-egg').textContent = egg.emoji;
  $('#hatch-title').textContent = isFree ? 'A gift from the Legendary!' : 'The egg hatches...';
  $('#hatch-emoji').textContent = dragon.emoji;
  $('#hatch-name').textContent = dragon.name;
  $('#hatch-desc').textContent = dragon.desc;
  $('#hatch-rarity').className = 'modal-rarity rarity-' + dragon.rarity;
  $('#hatch-rarity').textContent = dragon.rarity;
  m.classList.add('show');
  $('#hatch-egg').className = 'hatch-egg-phase phase-shake';
  $('#hatch-reveal').classList.remove('show');
  setTimeout(() => {
    $('#hatch-egg').className = 'hatch-egg-phase phase-crack';
  }, 1400);
  setTimeout(() => {
    $('#hatch-egg').style.display = 'none';
    $('#hatch-reveal').classList.add('show');
  }, 2200);
}

function closeModal(id) {
  $(id).classList.remove('show');
  $('#hatch-egg').style.display = '';
  refreshHome();
  const active = document.querySelector('.screen.active');
  if (active && active.id === 'screen-shop') renderShop();
  if (active && active.id === 'screen-hoard') renderHoard();
}

// ---------- Daily Bonus ----------
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function canClaimDaily() {
  return state.lastClaimDate !== todayStr();
}

const DAILY_REWARDS = [
  { day: 1, coins: 30 },
  { day: 2, coins: 50 },
  { day: 3, coins: 80 },
  { day: 4, coins: 120 },
  { day: 5, coins: 200 },
  { day: 6, coins: 300 },
  { day: 7, coins: 0, egg: 'rare', label: 'FREE RARE EGG' },
  { day: 14, coins: 0, egg: 'mythic', label: 'FREE MYTHIC EGG' }
];

function computeDailyReward(streakDay) {
  // Map streak day to reward:
  // day 1-6: direct
  // day 7: rare egg
  // day 8-13: cycle 50→300
  // day 14: mythic egg
  // day 15+: repeat small rewards
  if (streakDay === 7) return { egg: 'rare', label: 'Rare Egg!' };
  if (streakDay === 14) return { egg: 'mythic', label: 'MYTHIC EGG!' };
  if (streakDay <= 6) return { coins: DAILY_REWARDS[streakDay - 1].coins };
  if (streakDay <= 13) return { coins: 50 + (streakDay - 7) * 50 };
  // day 15+
  return { coins: 100 + Math.min(streakDay - 14, 10) * 25 };
}

function claimDaily() {
  if (!canClaimDaily()) return;
  // Update streak
  if (state.lastClaimDate === yesterdayStr()) {
    state.dailyStreak = (state.dailyStreak || 0) + 1;
  } else {
    state.dailyStreak = 1;
  }
  const reward = computeDailyReward(state.dailyStreak);
  state.lastClaimDate = todayStr();

  // Apply reward
  let msg = `Day ${state.dailyStreak}! `;
  if (reward.coins) {
    state.coins += reward.coins;
    msg += `+${reward.coins} 🪙`;
  }
  saveState();
  $('#modal-daily').classList.remove('show');
  refreshHome();

  if (reward.egg) {
    // Auto-hatch the reward egg
    toast(`Day ${state.dailyStreak}: ${reward.label}!`);
    setTimeout(() => doHatch(reward.egg, true), 400);
  } else {
    toast(msg);
  }
}

function maybeShowDaily() {
  if (!canClaimDaily()) return;
  // Compute what the reward would be (streak +1 if yesterday, else 1)
  let projectedStreak = (state.lastClaimDate === yesterdayStr()) ? (state.dailyStreak || 0) + 1 : 1;
  const reward = computeDailyReward(projectedStreak);
  $('#daily-streak-preview').textContent = projectedStreak;
  let rewardText = '';
  if (reward.coins) rewardText = `+${reward.coins} Gold`;
  if (reward.egg) rewardText = reward.label || reward.egg + ' egg';
  $('#daily-reward-preview').textContent = rewardText;
  $('#modal-daily').classList.add('show');
}

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

// Reset button
document.getElementById('reset-btn').addEventListener('click', () => {
  if (confirm('Reset ALL progress? This cannot be undone.')) resetState();
});

// Modal handlers
document.querySelectorAll('[data-close-modal]').forEach(b => {
  b.addEventListener('click', () => closeModal('#' + b.dataset.closeModal));
});
document.getElementById('daily-claim-btn').addEventListener('click', claimDaily);
document.getElementById('daily-close-btn').addEventListener('click', () => $('#modal-daily').classList.remove('show'));

refreshAllUI();
nav('home');
// Show daily bonus if available
setTimeout(maybeShowDaily, 300);
