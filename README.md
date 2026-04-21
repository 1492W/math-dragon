# 🐉 Dragon Math

A fast-math practice app for kids with a dragon-collecting twist.
Built for **Pordee** by Dad.

**Live:** https://1492w.github.io/math-dragon/

## Modes

- **Train** — Sprint (60s), Streak, or Beat Your Time. Hard +/− by default.
- **Dragon Tower** — Fight enemy dragons floor by floor. Answer speed = damage. Every 5 floors = boss fight with a guaranteed rare+ dragon drop.
- **Shop** — Spend gold to summon dragons with abilities.
- **Hoard** — Your collection.

## How answering works

- Fast answer (< 2s) = **Critical!** (big damage / 3 gold)
- Medium (2–4s) = normal hit / 2 gold
- Slow = weak hit / 1 gold
- Wrong answer or time-out in battle = lose a heart

## Dragon abilities

Dragons affect both Training (gold earned) and Battle (damage, time, shields).
Pick up to 3 before each run.

| Dragon | Rarity | Effect |
|---|---|---|
| 🐣 Hatchling | Common | Starter companion (free) |
| 🐲 Ember Wyrm | Common | +20% damage, +20% gold |
| 🪽 Swiftwing | Rare | +3s per battle question, gold bonus on fast answers |
| 🔥 Flame Sovereign | Rare | +50% damage, 2× gold |
| 🛡️ Iron Guardian | Rare | Survive 1 wrong per battle, streak protection |
| 🍀 Fortune Drake | Epic | +25% crit chance, 20% bonus gold drops |
| 💎 Crystal Wyrm | Epic | +40% damage, 80% sell-back value |
| 👑 Elder Sovereign | Legendary | +30% damage, +2s, +50% gold |

## Tech

- Pure HTML / CSS / JS (no build step, no frameworks)
- Saves progress to `localStorage`
- Mobile-first, works offline once loaded
- Hosted on GitHub Pages

## Local development

Just open `index.html` in a browser. No build required.
