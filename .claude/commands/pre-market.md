---
description: Run pre-market research manually (local mode, uses .env)
---

Run the pre-market research workflow locally. Uses credentials from .env.
Does NOT commit or push — local runs are for testing only.

Follow the same steps as routines/pre-market.md:

STEP 1 — Read memory for context:
- memory/TRADING-STRATEGY.md
- tail of memory/TRADE-LOG.md
- tail of memory/RESEARCH-LOG.md

STEP 2 — Pull live account state:
  bash scripts/alpaca.sh account
  bash scripts/alpaca.sh positions
  bash scripts/alpaca.sh orders

STEP 3 — Research via native WebSearch (cite URLs):
- "WTI and Brent oil price right now"
- "S&P 500 futures premarket today"
- "VIX level today"
- "Top stock market catalysts today"
- "Earnings reports today before market open"
- "Economic calendar today CPI PPI FOMC jobs data"
- "S&P 500 sector momentum YTD"
- News on any currently-held ticker

STEP 4 — Write dated entry to memory/RESEARCH-LOG.md:
- Account snapshot
- Market context
- 2-3 trade ideas with catalyst/entry/stop/target
- Risk factors
- Decision: TRADE or HOLD

STEP 5 — Notification: silent unless urgent.
