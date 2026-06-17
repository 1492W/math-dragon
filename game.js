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
  primordial_a: { id: 'primordial_a', name: 'World Wyrm',      emoji: '✨🌋', rarity: 'mythic',   price: 0, ascendedFrom: 'primordial', desc: '(Ascended) 3× dmg & gold, +8s, 60% crit.', ability: { damageMul: 3.0, coinMul: 3.0, timeBonus: 8, critChance: 0.6 } },
  // ----- Divine (radiant top tier) -----
  aurora: {
    id: 'aurora', name: 'Aurora Empress', emoji: '🌈',
    rarity: 'divine', price: 16000,
    desc: 'Prismatic majesty: 2.4× damage, 2.4× gold, +6s, 45% crit.',
    ability: { damageMul: 2.4, coinMul: 2.4, timeBonus: 6, critChance: 0.45 }
  },
  eclipse: {
    id: 'eclipse', name: 'Eclipse Deity', emoji: '🌗',
    rarity: 'divine', price: 22000,
    desc: 'Devourer of light: 3× damage, shield ×3, 60% crit.',
    ability: { damageMul: 3.0, shield: 3, critChance: 0.6 }
  },
  genesis: {
    id: 'genesis', name: 'Genesis Dragon', emoji: '🌠',
    rarity: 'divine', price: 30000,
    desc: 'Maker of worlds: 3× damage & gold, +8s, 55% crit.',
    ability: { damageMul: 3.0, coinMul: 3.0, timeBonus: 8, critChance: 0.55 }
  },
  aurora_a:  { id: 'aurora_a',  name: 'Aurora Sovereign', emoji: '✨🌈', rarity: 'divine', price: 0, ascendedFrom: 'aurora',  desc: '(Ascended) 3× dmg & gold, +8s, 60% crit.', ability: { damageMul: 3.0, coinMul: 3.0, timeBonus: 8, critChance: 0.6 } },
  eclipse_a: { id: 'eclipse_a', name: 'Eclipse Overlord', emoji: '✨🌗', rarity: 'divine', price: 0, ascendedFrom: 'eclipse', desc: '(Ascended) 3.5× dmg, shield ×5, 70% crit.', ability: { damageMul: 3.5, shield: 5, critChance: 0.7 } },
  genesis_a: { id: 'genesis_a', name: 'Genesis Sovereign', emoji: '✨🌠', rarity: 'divine', price: 0, ascendedFrom: 'genesis', desc: '(Ascended) 3.5× dmg & gold, +10s, 65% crit, shield ×3.', ability: { damageMul: 3.5, coinMul: 3.5, timeBonus: 10, critChance: 0.65, shield: 3 } }
};

const DRAGON_ORDER = [
  'hatchling','ember',
  'swift','fire','guardian','frost','earth',
  'fortune','crystal','storm','shadow',
  'elder','celestial','void',
  'cosmos','solar','primordial',
  'aurora','eclipse','genesis'
];

const ASCENDED_ORDER = [
  'hatchling_a','ember_a','swift_a','fire_a','guardian_a','frost_a','earth_a',
  'fortune_a','crystal_a','storm_a','shadow_a',
  'elder_a','celestial_a','void_a',
  'cosmos_a','solar_a','primordial_a',
  'aurora_a','eclipse_a','genesis_a'
];

// Rarity tiers (for sorting, drop weights, egg hatching)
const RARITY_TIER = { common: 0, rare: 1, epic: 2, legendary: 3, mythic: 4, divine: 5 };

// Egg types
const EGGS = {
  common: { id: 'common', name: 'Mystery Egg', emoji: '🥚', price: 300,
            weights: { common: 0.65, rare: 0.30, epic: 0.05 } },
  rare:   { id: 'rare',   name: 'Rare Egg',    emoji: '🟢', price: 900,
            weights: { rare: 0.40, epic: 0.45, legendary: 0.15 } },
  mythic: { id: 'mythic', name: 'Mythic Egg',  emoji: '🟣', price: 2500,
            weights: { epic: 0.55, legendary: 0.35, mythic: 0.10 } },
  divine: { id: 'divine', name: 'Divine Egg',  emoji: '🔮', price: 6000,
            weights: { legendary: 0.45, mythic: 0.45, divine: 0.10 } }
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
  totalAscensions: 0,
  // Times-table trials: factId ("7x8") -> mastery level 0..3
  multFacts: {},
  // Facts answered slowly/wrong, collected for focused practice: factId -> 1
  multSlow: {},
  // Best answer time per fact (seconds) — for speed tiers / records
  multBest: {},
  // Factor Forge: best time per item, and the slow pile
  forgeBest: {},
  forgeSlow: {}
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

/* ============ WORLD OF DRAGONS — tribe bridge (Tower climb) ============ */
const WORLD_KEY = 'worldofdragons_v1';
const MATH_MILESTONES = [
  { floor: 90,  id:'math_add',   e:'🐲', name:'Ascendant Wyrm' },
  { floor: 100, id:'math_sub',   e:'🐉', name:'Centurion Drake' },
  { floor: 110, id:'math_mul',   e:'🔥', name:'Infernal Climber' },
  { floor: 120, id:'math_div',   e:'🐊', name:'Apex Leviathan' },
  { floor: 130, id:'math_speed', e:'💎', name:'Crystalline Sovereign' },
  { floor: 140, id:'math_king',  e:'👑', name:'Tower King Dragon', legend:true },
];
function awardMathTribe(id){
  try{
    const W = JSON.parse(localStorage.getItem(WORLD_KEY) || '{}');
    W.tribes = W.tribes || {}; W.tribes.math = W.tribes.math || [];
    if(!W.tribes.math.includes(id)){
      W.tribes.math.push(id); W.updated = Date.now();
      localStorage.setItem(WORLD_KEY, JSON.stringify(W));
      return true;
    }
  }catch(e){}
  return false;
}
// award when a milestone floor is just cleared; returns milestone if newly earned
function checkMathMilestone(floor){
  const ms = MATH_MILESTONES.find(m => m.floor === floor);
  if(ms && awardMathTribe(ms.id)) return ms;
  return null;
}
// catch-up: award any already-passed milestones (after restore / approx floor)
// แสดง reveal ทีละตัวสำหรับมังกรที่ "เพิ่งได้" เพื่อให้พอดีเห็นตอนได้
function backfillMathTribe(){
  const newly = [];
  MATH_MILESTONES.forEach(m => {
    if((state.highestFloor||1) >= m.floor && awardMathTribe(m.id)) newly.push(m);
  });
  if(newly.length){
    let i = 0;
    const showNext = () => {
      if(i >= newly.length) return;
      const m = newly[i]; i++;
      showTribeReveal(m, showNext);
    };
    setTimeout(showNext, 1300);   // หลังเกมโหลดเสร็จ ค่อยโชว์ทีละตัว
  }
}
function injectTribeOverlay(){
  if(document.getElementById('mathTribeRev')) return;
  const css = document.createElement('style');
  css.textContent = `
  #mathTribeRev{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;
    background:radial-gradient(circle at 50% 38%,rgba(60,40,110,.96),rgba(15,10,30,.98));
    flex-direction:column;text-align:center;padding:24px;font-family:'Cinzel',serif;}
  #mathTribeRev.show{display:flex;animation:mtFade .4s ease;}
  @keyframes mtFade{from{opacity:0}to{opacity:1}}
  #mathTribeRev .mtLabel{color:#ffd86b;font-size:17px;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;font-weight:700;}
  #mathTribeRev .mtDrag{font-size:118px;line-height:1;filter:drop-shadow(0 0 30px rgba(255,200,80,.8));animation:mtPop .6s cubic-bezier(.2,1.6,.4,1);}
  @keyframes mtPop{0%{transform:scale(0) rotate(-20deg)}100%{transform:scale(1) rotate(0)}}
  #mathTribeRev .mtName{color:#fff;font-size:29px;font-weight:800;margin:14px 0 6px;text-shadow:0 0 16px rgba(255,180,60,.6);}
  #mathTribeRev .mtSub{color:#cdbfe8;font-size:15px;font-family:'Cormorant Garamond',serif;font-style:italic;margin-bottom:26px;}
  #mathTribeRev .mtBtn{background:linear-gradient(180deg,#ffcf5a,#e89b2a);border:none;color:#3a2410;font-family:'Cinzel',serif;
    font-weight:700;font-size:16px;padding:13px 32px;border-radius:30px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.4);}
  #mathTribeRev .mtBtn:active{transform:scale(.96);}
  #mathTribeRev .mtKing .mtDrag{animation:mtPop .6s cubic-bezier(.2,1.6,.4,1),mtGlow 1.6s ease-in-out infinite alternate .6s;}
  @keyframes mtGlow{from{filter:drop-shadow(0 0 20px rgba(255,200,80,.6))}to{filter:drop-shadow(0 0 52px rgba(255,230,120,1))}}
  .mtConf{position:fixed;top:-24px;z-index:10000;pointer-events:none;animation:mtFall linear forwards;}
  @keyframes mtFall{to{transform:translateY(108vh) rotate(540deg);opacity:.2}}
  `;
  document.head.appendChild(css);
  const ov = document.createElement('div');
  ov.id = 'mathTribeRev';
  ov.innerHTML = `<div class="mtInner">
    <div class="mtLabel" id="mtLabel">Tower Floor Conquered</div>
    <div class="mtDrag" id="mtDrag">🐲</div>
    <div class="mtName" id="mtName">Dragon</div>
    <div class="mtSub" id="mtSub">Joined your World of Dragons</div>
    <button class="mtBtn">Claim \u2728</button>
  </div>`;
  document.body.appendChild(ov);
}
function mtConfetti(n){
  const em = ['\u2728','🎉','\u2B50','🔶','💫'];
  for(let i=0;i<n;i++){
    const c=document.createElement('div'); c.className='mtConf'; c.textContent=em[i%em.length];
    c.style.left=Math.random()*100+'vw'; c.style.animationDuration=(1.6+Math.random()*1.4)+'s';
    c.style.animationDelay=(Math.random()*.4)+'s'; c.style.fontSize=(14+Math.random()*16)+'px';
    document.body.appendChild(c); setTimeout(()=>c.remove(),3400);
  }
}
function showTribeReveal(ms, onClose){
  injectTribeOverlay();
  const ov=document.getElementById('mathTribeRev');
  document.getElementById('mtDrag').textContent=ms.e;
  document.getElementById('mtName').textContent=ms.name;
  document.getElementById('mtLabel').textContent= ms.legend ? '👑 TOWER MASTER!' : '\u2694\uFE0F Tower Floor '+ms.floor+' Conquered';
  document.getElementById('mtSub').textContent= ms.legend ? 'Pordee rules the Math Tribe!' : 'Joined your World of Dragons';
  ov.querySelector('.mtInner').classList.toggle('mtKing', !!ms.legend);
  ov.classList.add('show');
  mtConfetti(ms.legend?90:55);
  if(ms.legend) setTimeout(()=>mtConfetti(70),650);
  // ปุ่ม Claim → ปิด + เรียกตัวถัดไป (ถ้ามี chain)
  ov.querySelector('.mtBtn').onclick = () => { ov.classList.remove('show'); if(onClose) setTimeout(onClose, 420); };
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
  if (screen === 'tables') renderTables();
  if (screen === 'forge') renderForge();
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
  $('#results-slow') && $('#results-slow').classList.add('hidden');

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
  const _ms = checkMathMilestone(battle.floor);
  showBattleResults({ win: true, dropped, freeEgg });
  if(_ms) setTimeout(()=>showTribeReveal(_ms), 1100);
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
  $('#results-slow') && $('#results-slow').classList.add('hidden');
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

// Restore button (emergency recovery for Pordee)
document.getElementById('restore-btn').addEventListener('click', () => {
  if (state.pordeeGifted) {
    toast("You've already claimed the restoration gift.");
    return;
  }
  if (!confirm('Restore Phase 1 dragons + 3,000 gold + Floor 10?\n\n(Can be claimed once)')) return;
  applyPordeeGift();
  alert('Welcome back, Pordee! 🐉\n\nRestored:\n• All 8 Phase 1 dragons\n• +3,000 gold\n• Tower Floor 10');
});

function applyPordeeGift() {
  const phase1Dragons = ['hatchling','ember','swift','fire','guardian','fortune','crystal','elder'];
  phase1Dragons.forEach(id => {
    state.dragons[id] = Math.max(state.dragons[id] || 0, 1);
  });
  state.coins = (state.coins || 0) + 3000;
  state.highestFloor = Math.max(state.highestFloor || 1, 10);
  state.currentFloor = Math.max(state.currentFloor || 1, state.highestFloor);
  state.pordeeGifted = true;
  saveState();
  refreshHome();
}

// Modal handlers
document.querySelectorAll('[data-close-modal]').forEach(b => {
  b.addEventListener('click', () => closeModal('#' + b.dataset.closeModal));
});
document.getElementById('daily-claim-btn').addEventListener('click', claimDaily);
document.getElementById('daily-close-btn').addEventListener('click', () => $('#modal-daily').classList.remove('show'));

// ---------- Restoration gift (one-time per flag) ----------
function checkGift() {
  try {
    const params = new URLSearchParams(window.location.search);
    const gift = params.get('gift');
    if (!gift) return;

    if (gift === 'pordee' && !state.pordeeGifted) {
      applyPordeeGift();
      setTimeout(() => {
        alert('Welcome back, Pordee! 🐉\n\nRestored:\n• All 8 Phase 1 dragons\n• +3,000 gold\n• Tower Floor 10 unlocked\n\nDad says sorry for the cache trouble!');
      }, 400);
    }

    if (gift === 'mega' && !state.megaGifted) {
      Object.keys(DRAGONS).forEach(id => {
        if (!id.endsWith('_a') && DRAGONS[id].rarity !== 'mythic') {
          state.dragons[id] = Math.max(state.dragons[id] || 0, 1);
        }
      });
      state.coins += 10000;
      state.megaGifted = true;
      saveState();
      refreshHome();
      setTimeout(() => alert('Mega restoration: 14 dragons + 10,000 gold! 🔥'), 400);
    }
  } catch (e) {
    console.error('Gift check failed:', e);
  }
}

/* =====================================================================
   TIMES-TABLE TRIALS  (added phase3) — isolated; does not touch battle/practice engine
   Per-table drill (×2..×12). Mastery stored in state.multFacts ("7x8" -> 0..3).
   ===================================================================== */
const TT_MASTER = 3;                       // fast+correct answers to master a fact
const TT_FAST = 3.0;                        // under this counts as fluent (clears)
const TT_SWIFT = 2.0;                       // speed tier 2
const TT_BLAZE = 1.5;                       // speed tier 3 (lightning)
const TT_MAX_ATTEMPTS = 5;                  // safety cap: stop looping one fact forever
const TT_GAUNTLET_SIZE = 6;                 // facts per Gauntlet level
const TT_TABLES = [2,3,4,5,6,7,8,9,10,11,12];
const TT_TIPS = {
  2:  'Doubles — add the number to itself.',
  3:  'Count up in 3s: 3, 6, 9, 12…',
  4:  'Double, then double again (×2 twice).',
  5:  'Always ends in 0 or 5.',
  6:  '×5 plus one more of the number.',
  7:  'The tricky one — drill it often. 7×8 = 56.',
  8:  'Double three times. All answers are even.',
  9:  'The two digits add up to 9 (9×4=36 → 3+6=9).',
  10: 'Just add a 0 to the number.',
  11: '×1–9 gives a doubled digit (11×4 = 44).',
  12: '×10 plus ×2 (12×n = 10×n + 2×n).'
};
function ttId(a, b) { return a + 'x' + b; }
function ttLevel(a, b) { return (state.multFacts && state.multFacts[ttId(a, b)]) || 0; }
function ttSetLevel(a, b, v) {
  if (!state.multFacts) state.multFacts = {};
  state.multFacts[ttId(a, b)] = Math.max(0, Math.min(TT_MASTER, v));
}
function ttMasteredInTable(a) {
  let n = 0;
  for (let b = 1; b <= 12; b++) if (ttLevel(a, b) >= TT_MASTER) n++;
  return n;
}
function ttSlowIds() { return state.multSlow ? Object.keys(state.multSlow) : []; }
function ttMarkSlow(a, b) { if (!state.multSlow) state.multSlow = {}; state.multSlow[ttId(a, b)] = 1; }
function ttClearSlow(a, b) { if (state.multSlow) delete state.multSlow[ttId(a, b)]; }
function ttBest(a, b) { return (state.multBest && state.multBest[ttId(a, b)]) || null; }
function ttRecordBest(a, b, t) {
  if (!state.multBest) state.multBest = {};
  const id = ttId(a, b), prev = state.multBest[id];
  if (prev == null || t < prev) { state.multBest[id] = Math.round(t * 100) / 100; return true; }
  return false;
}
function ttTableBlazing(a) { // all 12 facts mastered AND best < swift
  for (let b = 1; b <= 12; b++) {
    if (ttLevel(a, b) < TT_MASTER) return false;
    const bt = ttBest(a, b);
    if (bt == null || bt >= TT_SWIFT) return false;
  }
  return true;
}
// Split the slow pile into ordered Gauntlet levels (stubborn first, deterministic)
function gauntletLevels() {
  const facts = ttSlowIds().map(id => { const [a, b] = id.split('x').map(Number); return { a, b }; });
  facts.sort((x, y) => (ttLevel(x.a, x.b) - ttLevel(y.a, y.b)) || (x.a - y.a) || (x.b - y.b));
  const levels = [];
  for (let i = 0; i < facts.length; i += TT_GAUNTLET_SIZE) levels.push(facts.slice(i, i + TT_GAUNTLET_SIZE));
  return levels;
}

// ----- Table-select screen -----
function renderTables() {
  const coinsEl = $('#tables-coins'); if (coinsEl) coinsEl.textContent = state.coins.toLocaleString();
  // Dragon's Gauntlet (the slow pile), split into levels
  const wrap = $('#gauntlet-wrap'); const ggrid = $('#gauntlet-grid');
  const levels = gauntletLevels();
  if (levels.length) {
    wrap.classList.remove('hidden');
    ggrid.innerHTML = '';
    levels.forEach((facts, idx) => {
      const btn = document.createElement('button');
      btn.className = 'gauntlet-card';
      const preview = facts.slice(0, 4).map(f => f.a + '×' + f.b).join('  ');
      btn.innerHTML = `
        <span class="gauntlet-emoji">👹</span>
        <span class="gauntlet-body">
          <span class="gauntlet-title">Gauntlet ${roman(idx + 1)}</span>
          <span class="gauntlet-desc">${facts.length} rune${facts.length > 1 ? 's' : ''} · ${preview}${facts.length > 4 ? ' …' : ''}</span>
        </span>
        <span class="gauntlet-go">⚔️</span>`;
      btn.addEventListener('click', () => startGauntlet(idx));
      ggrid.appendChild(btn);
    });
  } else {
    wrap.classList.add('hidden');
  }
  const grid = $('#tables-grid');
  grid.innerHTML = '';
  TT_TABLES.forEach(a => {
    const m = ttMasteredInTable(a);
    const pct = Math.round(m / 12 * 100);
    const done = m === 12;
    const blazing = done && ttTableBlazing(a);
    const card = document.createElement('button');
    card.className = 'rune-card' + (done ? ' rune-done' : '') + (blazing ? ' rune-blaze' : '');
    card.innerHTML = `
      <span class="rune-x">×${a}</span>
      <span class="rune-count">${m}/12</span>
      <span class="rune-bar"><i style="width:${pct}%"></i></span>
      ${blazing ? '<span class="rune-seal">⚡</span>' : (done ? '<span class="rune-seal">🐉</span>' : '')}`;
    card.addEventListener('click', () => startTable(a));
    grid.appendChild(card);
  });
}
function roman(n) { return ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][n - 1] || ('' + n); }

// ----- Table run -----
let ttRun = null;
function startTable(a) {
  let facts = [];
  for (let b = 1; b <= 12; b++) facts.push({ a, b });
  facts.sort(() => Math.random() - 0.5);
  facts.sort((x, y) => ttLevel(x.a, x.b) - ttLevel(y.a, y.b));
  beginRun({ table: a, slow: false, queue: facts, retry: () => startTable(a) });
  $('#tablerun-title').textContent = 'Trial of ×' + a;
  $('#tablerun-tip').textContent = TT_TIPS[a] || '';
}
function startGauntlet(idx) {
  const levels = gauntletLevels();
  const facts = levels[idx];
  if (!facts || !facts.length) { toast('That gauntlet is cleared! 🐉'); nav('tables'); return; }
  const queue = facts.slice().sort(() => Math.random() - 0.5);
  beginRun({ table: 'gauntlet', slow: true, queue, retry: () => startGauntlet(idx) });
  $('#tablerun-title').textContent = '👹 Gauntlet ' + roman(idx + 1);
  $('#tablerun-tip').textContent = 'Answer fast (under ' + TT_FAST + 's) without slipping to reclaim each rune.';
}
function beginRun(opts) {
  ttRun = {
    table: opts.table, slow: opts.slow, retry: opts.retry,
    queue: opts.queue, goal: opts.queue.length,
    cleared: 0, correct: 0, attemptsTotal: 0,
    times: [], attempts: {}, stumbled: {}, lightning: 0, finished: false, locked: false, coins: 0
  };
  nav('tablerun');
  ttNext();
}
function ttNext() {
  if (!ttRun) return;
  if (!ttRun.queue.length) return ttFinish();
  ttRun.cur = ttRun.queue.shift();
  ttRun.answer = '';
  ttRun.qStart = Date.now();
  const left = ttRun.queue.length + 1;
  $('#tablerun-prog').textContent = ttRun.cleared + ' / ' + ttRun.goal + (ttRun.slow ? '' : ' · ' + left + ' left');
  $('#tablerun-q').textContent = ttRun.cur.a + ' × ' + ttRun.cur.b;
  const ans = $('#tablerun-answer');
  ans.textContent = '\u00A0'; ans.className = 'battle-answer';
  $('#tablerun-feedback').textContent = '';
  $('#tablerun-feedback').className = 'feedback';
  ttDrawDots(ttLevel(ttRun.cur.a, ttRun.cur.b));
}
function ttDrawDots(lvl) {
  const d = $('#tablerun-mastery'); d.innerHTML = '';
  for (let i = 0; i < TT_MASTER; i++) {
    const s = document.createElement('i');
    s.className = 'tt-dot' + (i < lvl ? ' on' : '');
    d.appendChild(s);
  }
}
function flashStage(kind) {
  const st = document.querySelector('#screen-tablerun .play-stage');
  if (!st) return;
  st.classList.add('stage-' + kind);
  setTimeout(() => st.classList.remove('stage-' + kind), 420);
}
function sparkle(ch) {
  try {
    const s = document.createElement('div');
    s.textContent = ch;
    s.style.cssText = 'position:fixed;left:50%;top:46%;transform:translate(-50%,-50%);font-size:30px;pointer-events:none;z-index:9999;';
    document.body.appendChild(s);
    if (s.animate) s.animate(
      [{ opacity: 1, transform: 'translate(-50%,-50%) scale(.6)' },
       { opacity: 0, transform: 'translate(-50%,-150%) scale(1.5)' }],
      { duration: 900, easing: 'ease-out' });
    setTimeout(() => s.remove(), 950);
  } catch (e) {}
}
function ttPress(key) {
  if (!ttRun || ttRun.finished || ttRun.locked) return;
  if (key === 'ok') { clearTimeout(ttPress._t); return ttSubmit(); }
  if (key === 'del') ttRun.answer = ttRun.answer.slice(0, -1);
  else { ttRun.answer += key; if (ttRun.answer.length > 4) ttRun.answer = ttRun.answer.slice(0, 4); }
  $('#tablerun-answer').textContent = ttRun.answer || '\u00A0';
  const expected = String(ttRun.cur.a * ttRun.cur.b).length;
  if (ttRun.answer.length >= expected) {
    clearTimeout(ttPress._t);
    ttPress._t = setTimeout(ttSubmit, 220);
  }
}
function ttSubmit() {
  if (!ttRun || ttRun.finished || ttRun.locked) return;
  if (ttRun.answer === '') return;
  const val = parseInt(ttRun.answer, 10);
  if (isNaN(val)) return;
  ttRun.locked = true;
  const cur = ttRun.cur, correct = cur.a * cur.b;
  const id = ttId(cur.a, cur.b);
  const elapsed = (Date.now() - ttRun.qStart) / 1000;
  ttRun.attemptsTotal++;
  ttRun.attempts[id] = (ttRun.attempts[id] || 0) + 1;
  const capped = ttRun.attempts[id] >= TT_MAX_ATTEMPTS;
  const ans = $('#tablerun-answer'), fb = $('#tablerun-feedback');
  const right = val === correct;
  const fast = elapsed < TT_FAST;

  if (right) { ttRun.correct++; ttRun.times.push(elapsed); }
  const record = right ? ttRecordBest(cur.a, cur.b, elapsed) : false;

  if (right && fast) {
    // fluent this attempt — clear from the active loop so the run can progress
    ttSetLevel(cur.a, cur.b, ttLevel(cur.a, cur.b) + 1);
    if (!ttRun.stumbled[id]) ttClearSlow(cur.a, cur.b);
    else ttMarkSlow(cur.a, cur.b);
    ttRun.cleared++;
    // speed tier
    let tier, reward, label;
    if (elapsed < TT_BLAZE) { tier = 'blaze'; reward = 5; label = '⚡ LIGHTNING!'; ttRun.lightning = (ttRun.lightning || 0) + 1; }
    else if (elapsed < TT_SWIFT) { tier = 'swift'; reward = 3; label = '⚡ Swift!'; }
    else { tier = 'fast'; reward = 2; label = '✓ Fast'; }
    if (record) { reward += 1; label += ' · Record! 🏅'; }
    ttRun.coins = (ttRun.coins || 0) + reward;
    state.totalCorrect = (state.totalCorrect || 0) + 1;
    ans.classList.add('correct', 'tier-' + tier);
    fb.textContent = label + '  ' + elapsed.toFixed(1) + 's  +' + reward + ' 🪙';
    fb.className = 'feedback show-good';
    if (tier === 'blaze') { sparkle('⚡'); flashStage('blaze'); }
    else if (tier === 'swift') sparkle('✨');
    ttDrawDots(ttLevel(cur.a, cur.b));
    saveState();
    setTimeout(() => { ttRun.locked = false; ttNext(); }, 460);
  } else if (right && !fast) {
    // correct but slow — needs more practice, and it goes to the Gauntlet pile
    ttRun.stumbled[id] = true;
    ttMarkSlow(cur.a, cur.b);
    state.totalCorrect = (state.totalCorrect || 0) + 1;
    ans.classList.add('correct');
    if (capped) {
      ttRun.cleared++;
      fb.textContent = '🐢 ' + correct + ' · ' + elapsed.toFixed(1) + 's — added to the Gauntlet';
    } else {
      ttRun.queue.splice(Math.min(2, ttRun.queue.length), 0, cur); // comes back soon
      fb.textContent = '🐢 ' + elapsed.toFixed(1) + 's — a bit slow, try again faster!';
    }
    fb.className = 'feedback show-miss';
    saveState();
    setTimeout(() => { ttRun.locked = false; ttNext(); }, 1050);
  } else {
    // wrong — to the Gauntlet pile
    ttSetLevel(cur.a, cur.b, 0);
    ttRun.stumbled[id] = true;
    ttMarkSlow(cur.a, cur.b);
    ans.classList.add('wrong');
    if (capped) {
      ttRun.cleared++;
      fb.textContent = '✗ ' + cur.a + ' × ' + cur.b + ' = ' + correct;
    } else {
      ttRun.queue.splice(Math.min(2, ttRun.queue.length), 0, cur);
      fb.textContent = '✗ ' + cur.a + ' × ' + cur.b + ' = ' + correct;
    }
    fb.className = 'feedback show-miss';
    ttDrawDots(0);
    saveState();
    setTimeout(() => { ttRun.locked = false; ttNext(); }, 1300);
  }
}
function ttFinish() {
  if (!ttRun) return;
  ttRun.finished = true;
  const a = ttRun.table;
  ttRun.coins = ttRun.coins || 0;
  // speed stats
  const times = ttRun.times.slice();
  const avg = times.length ? (times.reduce((s, t) => s + t, 0) / times.length) : null;
  const fastest = times.length ? Math.min(...times) : null;
  const stillSlow = ttSlowIds().length;
  // completion bonus
  let bonus = 0;
  if (!ttRun.slow && ttMasteredInTable(a) === 12) bonus = 25;
  if (ttRun.slow && stillSlow === 0) bonus = 40;
  ttRun.coins += bonus;
  state.coins += ttRun.coins;
  saveState();
  // Results screen
  $('#results-title').textContent = ttRun.slow
    ? (stillSlow === 0 ? 'Gauntlet cleared! 🐉' : '👹 Gauntlet')
    : (ttMasteredInTable(a) === 12 ? '×' + a + ' Mastered! 🐉' : 'Trial of ×' + a);
  $('#results-sub').textContent = ttRun.slow
    ? (stillSlow + ' runes still in the Gauntlet')
    : (ttMasteredInTable(a) + ' / 12 facts fluent');
  const grid = $('#results-grid'); grid.innerHTML = '';
  const stats = [
    { label: 'Avg speed', value: avg ? avg.toFixed(1) + 's' : '—' },
    { label: 'Fastest', value: fastest ? fastest.toFixed(1) + 's' : '—' },
    { label: '⚡ Lightning', value: ttRun.lightning || 0 },
    { label: 'In Gauntlet', value: stillSlow }
  ];
  stats.forEach(s => {
    const el = document.createElement('div');
    el.className = 'result-stat';
    el.innerHTML = `<div class="result-stat-value">${s.value}</div><div class="result-stat-label">${s.label}</div>`;
    grid.appendChild(el);
  });
  $('#results-coins').textContent = ttRun.coins;
  $('#results-drop').classList.add('hidden');
  const rslow = $('#results-slow');
  const slowList = ttSlowIds();
  if (slowList.length) {
    rslow.classList.remove('hidden');
    rslow.innerHTML =
      '<div class="slow-list-title">👹 Waiting in the Gauntlet</div><div class="slow-list">' +
      slowList.slice(0, 12).map(id => { const [x, y] = id.split('x'); return `<span class="slow-chip">${x}×${y}</span>`; }).join('') +
      (slowList.length > 12 ? '<span class="slow-chip">+' + (slowList.length - 12) + '</span>' : '') +
      '</div>';
  } else {
    rslow.classList.add('hidden');
  }
  $('#results-again').onclick = ttRun.retry || (() => nav('tables'));
  nav('results');
}

// keypad wiring (table run)
$$('#tablerun-keypad button').forEach(b => {
  b.addEventListener('click', () => ttPress(b.dataset.tkey));
});
$('#quit-tablerun').addEventListener('click', () => {
  if (ttRun && !ttRun.finished) { state.coins += ttRun.coins; ttRun.finished = true; saveState(); }
  nav('tables');
});
// physical keyboard support on table run
document.addEventListener('keydown', (e) => {
  const active = document.querySelector('.screen.active');
  if (!active || active.id !== 'screen-tablerun') return;
  if (e.key >= '0' && e.key <= '9') ttPress(e.key);
  else if (e.key === 'Backspace') ttPress('del');
  else if (e.key === 'Enter') ttPress('ok');
});

/* =====================================================================
   FACTOR FORGE (phase4) — prime factorization + fraction simplify
   Isolated. State: forgeBest{key->t}, forgeSlow{key->1}.
   ===================================================================== */
const FF_FAST  = { shatter: 9,   simplify: 7   };  // under = fluent (clears)
const FF_SWIFT = { shatter: 6,   simplify: 4.5 };
const FF_BLAZE = { shatter: 4,   simplify: 3   };
const FF_GAUNTLET_SIZE = 6;
const FF_SHATTER = [12,18,20,24,27,28,30,36,40,42,45,48,50,54,56,60,63,72,75,80,84,90,96,98,99,100];
const FF_SIMPLIFY = [[27,15],[18,12],[24,36],[20,8],[16,12],[30,45],[14,21],[28,35],[40,24],[12,9],[45,30],[36,48],[50,20],[33,22],[35,14],[60,45],[24,18],[9,6],[15,10],[48,32]];

function ffIsPrime(n){ if(n<2) return false; for(let i=2;i*i<=n;i++) if(n%i===0) return false; return true; }
function ffGcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const t=a%b; a=b; b=t; } return a; }
function ffPrimes(n){ const f=[]; let m=n; for(let p=2;p*p<=m;p++){ while(m%p===0){ f.push(p); m/=p; } } if(m>1) f.push(m); return f; }
function ffExp(n){ const f=ffPrimes(n), c={}; f.forEach(p=>c[p]=(c[p]||0)+1);
  return Object.keys(c).map(p=> c[p]>1 ? p+'^'+c[p] : p).join(' × '); }
function ffKey(it){ return it.mode==='shatter' ? ('s'+it.n) : ('f'+it.a+'/'+it.b); }
function ffItemFromKey(k){ if(k[0]==='s') return { mode:'shatter', n:parseInt(k.slice(1),10) };
  const m=k.slice(1).split('/'); return { mode:'simplify', a:parseInt(m[0],10), b:parseInt(m[1],10) }; }
function ffSlowIds(){ return state.forgeSlow ? Object.keys(state.forgeSlow) : []; }
function ffMarkSlow(it){ if(!state.forgeSlow) state.forgeSlow={}; state.forgeSlow[ffKey(it)]=1; }
function ffClearSlow(it){ if(state.forgeSlow) delete state.forgeSlow[ffKey(it)]; }
function ffRecordBest(it,t){ if(!state.forgeBest) state.forgeBest={}; const k=ffKey(it),p=state.forgeBest[k];
  if(p==null||t<p){ state.forgeBest[k]=Math.round(t*100)/100; return true; } return false; }

function renderForge(){
  const c=$('#forge-coins'); if(c) c.textContent=state.coins.toLocaleString();
  const wrap=$('#forge-gauntlet-wrap'), grid=$('#forge-gauntlet-grid');
  const ids=ffSlowIds();
  if(ids.length){
    wrap.classList.remove('hidden'); grid.innerHTML='';
    const levels=[]; for(let i=0;i<ids.length;i+=FF_GAUNTLET_SIZE) levels.push(ids.slice(i,i+FF_GAUNTLET_SIZE));
    levels.forEach((chunk,idx)=>{
      const btn=document.createElement('button'); btn.className='gauntlet-card';
      const prev=chunk.slice(0,4).map(k=>{ const it=ffItemFromKey(k); return it.mode==='shatter'?it.n:(it.a+'/'+it.b); }).join('  ');
      btn.innerHTML=`<span class="gauntlet-emoji">👹</span><span class="gauntlet-body">
        <span class="gauntlet-title">Forge Gauntlet ${roman(idx+1)}</span>
        <span class="gauntlet-desc">${chunk.length} item${chunk.length>1?'s':''} · ${prev}${chunk.length>4?' …':''}</span>
        </span><span class="gauntlet-go">⚔️</span>`;
      btn.addEventListener('click',()=>startForgeGauntlet(idx));
      grid.appendChild(btn);
    });
  } else wrap.classList.add('hidden');
}

let ffRun=null;
function startForge(mode){
  let items = mode==='shatter'
    ? FF_SHATTER.slice().sort(()=>Math.random()-0.5).slice(0,10).map(x=>({mode:'shatter',n:x}))
    : FF_SIMPLIFY.slice().sort(()=>Math.random()-0.5).slice(0,10).map(([a,b])=>({mode:'simplify',a,b}));
  beginForge({ kind:mode, queue:items, retry:()=>startForge(mode),
    title: mode==='shatter'?'💎 Prime Shatter':'✂️ Simplify' });
}
function startForgeGauntlet(idx){
  const ids=ffSlowIds(), levels=[];
  for(let i=0;i<ids.length;i+=FF_GAUNTLET_SIZE) levels.push(ids.slice(i,i+FF_GAUNTLET_SIZE));
  const chunk=levels[idx];
  if(!chunk||!chunk.length){ toast('That gauntlet is cleared! 🐉'); nav('forge'); return; }
  const items=chunk.map(ffItemFromKey).sort(()=>Math.random()-0.5);
  beginForge({ kind:'gauntlet', queue:items, retry:()=>startForgeGauntlet(idx), title:'👹 Forge Gauntlet '+roman(idx+1) });
}
function beginForge(opts){
  ffRun={ kind:opts.kind, retry:opts.retry, queue:opts.queue, goal:opts.queue.length,
    cleared:0, coins:0, lightning:0, times:[], finished:false, locked:false, answer:'' };
  $('#forgerun-title').textContent=opts.title;
  nav('forgerun'); ffNext();
}
function ffNext(){
  if(!ffRun) return;
  if(!ffRun.queue.length) return ffFinish();
  const it=ffRun.queue.shift(); ffRun.cur=it; ffRun.answer=''; ffRun.stumble=false; ffRun.qStart=Date.now();
  $('#forgerun-prog').textContent=ffRun.cleared+' / '+ffRun.goal;
  $('#forgerun-answer').textContent='\u00A0'; $('#forgerun-answer').className='battle-answer';
  $('#forgerun-feedback').textContent=''; $('#forgerun-feedback').className='feedback';
  $('#forgerun-work').innerHTML='';
  if(it.mode==='shatter'){
    it.current=it.n; it.shards=[];
    $('#forgerun-prompt').textContent='Break into primes — type a prime that divides it';
    ffRenderShatter();
  } else {
    it.ca=it.a; it.cb=it.b;
    $('#forgerun-prompt').textContent='Simplify — type a number that divides BOTH';
    ffRenderSimplify();
  }
}
function ffRenderShatter(){
  const cur=ffRun.cur;
  $('#forgerun-target').innerHTML=`<span class="ff-num">${cur.current}</span>`;
  $('#forgerun-work').innerHTML = cur.shards.length
    ? '<span class="ff-shards">'+cur.shards.map(p=>`<span class="ff-shard">${p}</span>`).join('<span class="ff-x">×</span>')+'</span>'
    : '<span class="ff-hint">shards will appear here</span>';
}
function ffRenderSimplify(){
  const cur=ffRun.cur;
  $('#forgerun-target').innerHTML=`<span class="ff-frac"><span class="ff-top">${cur.ca}</span><span class="ff-bar"></span><span class="ff-bot">${cur.cb}</span></span>`;
}
function ffPress(key){
  if(!ffRun||ffRun.finished||ffRun.locked) return;
  if(key==='del') ffRun.answer=ffRun.answer.slice(0,-1);
  else if(key==='ok'){ ffSubmit(); return; }
  else { ffRun.answer+=key; if(ffRun.answer.length>3) ffRun.answer=ffRun.answer.slice(0,3); }
  $('#forgerun-answer').textContent=ffRun.answer||'\u00A0';
}
function ffSubmit(){
  if(!ffRun||ffRun.finished||ffRun.locked) return;
  if(ffRun.answer==='') return;
  const v=parseInt(ffRun.answer,10); if(isNaN(v)) return;
  const cur=ffRun.cur, fb=$('#forgerun-feedback'), ans=$('#forgerun-answer');
  const flash=(msg)=>{ fb.textContent=msg; fb.className='feedback show-miss'; ffRun.stumble=true;
    ffRun.answer=''; $('#forgerun-answer').textContent='\u00A0'; ans.classList.add('wrong'); setTimeout(()=>ans.classList.remove('wrong'),300); };
  if(cur.mode==='shatter'){
    if(v>1 && ffIsPrime(v) && cur.current%v===0){
      cur.shards.push(v); cur.current=cur.current/v; ffRun.answer=''; $('#forgerun-answer').textContent='\u00A0';
      ffRenderShatter();
      if(cur.current===1) return ffComplete();
      fb.textContent='✓ keep going'; fb.className='feedback show-good'; setTimeout(()=>{ if(!ffRun.locked){fb.textContent='';fb.className='feedback';} },500);
    } else flash( (v<2||!ffIsPrime(v)) ? (v+' is not a prime') : (v+" doesn't divide "+cur.current) );
  } else {
    if(v>1 && cur.ca%v===0 && cur.cb%v===0){
      cur.ca/=v; cur.cb/=v; ffRun.answer=''; $('#forgerun-answer').textContent='\u00A0';
      ffRenderSimplify();
      if(ffGcd(cur.ca,cur.cb)===1) return ffComplete();
      fb.textContent='✓ smaller…'; fb.className='feedback show-good'; setTimeout(()=>{ if(!ffRun.locked){fb.textContent='';fb.className='feedback';} },500);
    } else flash( v<2 ? 'use a factor bigger than 1' : (v+" doesn't divide both") );
  }
}
function ffComplete(){
  const cur=ffRun.cur, fb=$('#forgerun-feedback'), ans=$('#forgerun-answer');
  ffRun.locked=true;
  const elapsed=(Date.now()-ffRun.qStart)/1000;
  ffRun.times.push(elapsed); ffRun.cleared++;
  const kind=cur.mode;
  const item = kind==='shatter' ? {mode:'shatter',n:cur.n} : {mode:'simplify',a:cur.a,b:cur.b};
  const record=ffRecordBest(item,elapsed);
  const B=FF_BLAZE[kind], S=FF_SWIFT[kind], F=FF_FAST[kind];
  // effort units = how many steps this problem really took
  const units = kind==='shatter'
    ? ffPrimes(cur.n).length                 // e.g. 72 -> 2·2·2·3·3 = 5
    : Math.max(1, ffPrimes(ffGcd(cur.a,cur.b)).length); // common-factor depth
  let tier,speedMult,clean=!ffRun.stumble,label;
  if(clean && elapsed<B){ tier='blaze'; speedMult=1.6; label='⚡ LIGHTNING!'; ffRun.lightning++; }
  else if(clean && elapsed<S){ tier='swift'; speedMult=1.3; label='⚡ Swift!'; }
  else if(clean && elapsed<F){ tier='fast'; speedMult=1.0; label='✓ Nice'; }
  else { tier='slow'; speedMult=0.6; label='Done — added to the Gauntlet'; }
  // base 3 + 2 per step, scaled by speed, + clean & record bonuses
  let reward=Math.round((3 + units*2) * speedMult);
  if(clean) reward+=2;
  if(record && tier!=='slow'){ reward+=2; label+=' · Record! 🏅'; }
  reward=Math.max(1,reward);
  if(ffRun.stumble || elapsed>=F) ffMarkSlow(item); else ffClearSlow(item);
  ffRun.coins+=reward; state.totalCorrect=(state.totalCorrect||0)+1;
  if(kind==='shatter') $('#forgerun-target').innerHTML=`<span class="ff-num">${cur.n}</span> <span class="ff-eq">= ${ffExp(cur.n)}</span>`;
  else $('#forgerun-work').innerHTML=`<span class="ff-done">= ${cur.ca}/${cur.cb}</span>`;
  ans.classList.add('correct','tier-'+(tier==='slow'?'fast':tier));
  const stepTxt = kind==='shatter' ? units+' shards' : units+'-step';
  fb.textContent=label+'  '+stepTxt+'  +'+reward+' 🪙';
  fb.className='feedback '+(tier==='slow'?'show-miss':'show-good');
  if(tier==='blaze'){ sparkle('⚡'); flashStage('blaze'); } else if(tier==='swift') sparkle('✨');
  saveState();
  setTimeout(()=>{ ffRun.locked=false; ffNext(); }, tier==='slow'?1600:1000);
}
function ffFinish(){
  if(!ffRun) return; ffRun.finished=true; ffRun.coins=ffRun.coins||0;
  const times=ffRun.times.slice();
  const avg=times.length?(times.reduce((s,t)=>s+t,0)/times.length):null;
  const fastest=times.length?Math.min(...times):null;
  const stillSlow=ffSlowIds().length;
  let bonus=0; if(ffRun.kind==='gauntlet' && stillSlow===0) bonus=40;
  ffRun.coins+=bonus; state.coins+=ffRun.coins; saveState();
  $('#results-title').textContent = ffRun.kind==='gauntlet'
    ? (stillSlow===0?'Forge Gauntlet cleared! 🐉':'👹 Forge Gauntlet')
    : '🔨 Forge complete';
  $('#results-sub').textContent = stillSlow + ' items in the Forge Gauntlet';
  const grid=$('#results-grid'); grid.innerHTML='';
  [{label:'Avg time',value:avg?avg.toFixed(1)+'s':'—'},
   {label:'Fastest',value:fastest?fastest.toFixed(1)+'s':'—'},
   {label:'⚡ Lightning',value:ffRun.lightning||0},
   {label:'In Gauntlet',value:stillSlow}].forEach(s=>{
    const el=document.createElement('div'); el.className='result-stat';
    el.innerHTML=`<div class="result-stat-value">${s.value}</div><div class="result-stat-label">${s.label}</div>`;
    grid.appendChild(el);
  });
  $('#results-coins').textContent=ffRun.coins;
  $('#results-drop').classList.add('hidden');
  $('#results-slow') && $('#results-slow').classList.add('hidden');
  $('#results-again').onclick = ffRun.retry || (()=>nav('forge'));
  nav('results');
}
$('#forge-mode-shatter').addEventListener('click',()=>startForge('shatter'));
$('#forge-mode-simplify').addEventListener('click',()=>startForge('simplify'));
$$('#forgerun-keypad button').forEach(b=>b.addEventListener('click',()=>ffPress(b.dataset.fkey)));
$('#quit-forgerun').addEventListener('click',()=>{ if(ffRun&&!ffRun.finished){ state.coins+=ffRun.coins; ffRun.finished=true; saveState(); } nav('forge'); });
document.addEventListener('keydown',e=>{
  const active=document.querySelector('.screen.active'); if(!active||active.id!=='screen-forgerun') return;
  if(e.key>='0'&&e.key<='9') ffPress(e.key);
  else if(e.key==='Backspace') ffPress('del');
  else if(e.key==='Enter') ffPress('ok');
});

refreshAllUI();
nav('home');
checkGift();
// Show daily bonus if available
setTimeout(maybeShowDaily, 300);
injectTribeOverlay();
backfillMathTribe();
