# 🐉 Dragon Math

A fast-math practice app for kids with a dragon-collecting twist.
Built for **Pordee** by Dad.

**Live:** https://1492w.github.io/math-dragon/

## Modes

- **Train** — Sprint (60s), Streak, or Beat Your Time. Hard +/− by default.
- **Dragon Tower** — Fight enemy dragons floor by floor. Answer speed = damage. Regular boss every 5 floors. **Legendary boss every 10 floors** with a guaranteed mythic egg drop!
- **Shop** — Spend gold on specific dragons or mystery eggs.
- **Hoard** — Your collection. Stack 3 of the same dragon to **Ascend** into a more powerful form.

## How answering works

- Fast answer (< 2s) = **Critical!** (big damage / 3 gold)
- Medium (2–4s) = normal hit / 2 gold
- Slow = weak hit / 1 gold
- Wrong answer or time-out in battle = lose a heart

## Phase 2 Features

### 🥚 Dragon Eggs
Hatch eggs for random dragons with weighted rarities:
- Mystery Egg (300g) — mostly common/rare
- Rare Egg (900g) — rare to legendary
- Mythic Egg (2500g) — epic, legendary, or mythic!

### ✨ Ascend System
Combine 3 of the same dragon into 1 ascended form with boosted stats. Ascended dragons have higher rarity and unique names (e.g. Ember Wyrm → Ember Lord).

### 🎁 Daily Bonus
Log in every day to build a streak:
- Day 1-6: 30-300 gold
- **Day 7: Free Rare Egg**
- **Day 14: Free Mythic Egg**
- Miss a day = streak resets

### 💎 Legendary Bosses
Every 10 floors of the Tower, a Legendary boss awaits with a guaranteed Mythic Egg reward.

## Dragon Catalog (17 base + 17 ascended = 34 total)

| Rarity | Base Dragons |
|---|---|
| Common | 🐣 Hatchling · 🐲 Ember Wyrm |
| Rare | 🪽 Swiftwing · 🔥 Flame Sovereign · 🛡️ Iron Guardian · ❄️ Frost Wyrm · 🗿 Earth Titan |
| Epic | 🍀 Fortune Drake · 💎 Crystal Wyrm · ⚡ Storm Drake · 🌑 Shadow Serpent |
| Legendary | 👑 Elder Sovereign · ⭐ Celestial Drake · 🌀 Void Wyrm |
| **Mythic** | 🌌 Cosmos Sovereign · ☀️ Solar Tyrant · 🌋 Primordial Wyrm |

## Tech

- Pure HTML / CSS / JS (no build step, no frameworks)
- Saves progress to `localStorage` (with v1→v2 migration)
- Mobile-first, works offline once loaded
- Hosted on GitHub Pages
