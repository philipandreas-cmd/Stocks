---
description: Run daily summary manually (local mode, uses .env)
---

Run the daily summary workflow locally. Uses credentials from .env.
Does NOT commit or push — local runs are for testing only.

Follow the same steps as routines/daily-summary.md:

STEP 1 — Read memory/TRADE-LOG.md tail:
- Find yesterday's equity (for Day P&L)
- Count today's trades
- Count this week's trades

STEP 2 — Pull final state:
  bash scripts/alpaca.sh account
  bash scripts/alpaca.sh positions
  bash scripts/alpaca.sh orders

STEP 3 — Compute:
- Day P&L ($ and %)
- Phase cumulative P&L
- Trades today / this week

STEP 4 — Append EOD snapshot to memory/TRADE-LOG.md.

STEP 5 — Send ONE ClickUp message (always, even on no-trade days, <= 15 lines).
