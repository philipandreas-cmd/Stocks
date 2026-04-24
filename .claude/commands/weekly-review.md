---
description: Run weekly review manually (local mode, uses .env)
---

Run the Friday weekly review workflow locally. Uses credentials from .env.
Does NOT commit or push — local runs are for testing only.

Follow the same steps as routines/weekly-review.md:

STEP 1 — Read memory for full week:
- memory/WEEKLY-REVIEW.md
- ALL this week's TRADE-LOG entries
- ALL this week's RESEARCH-LOG entries
- memory/TRADING-STRATEGY.md

STEP 2 — Pull week-end state:
  bash scripts/alpaca.sh account
  bash scripts/alpaca.sh positions

STEP 3 — Compute week metrics (including S&P 500 via Perplexity).

STEP 4 — Append full review section to memory/WEEKLY-REVIEW.md
(stats table, closed trades, open positions, what worked, what didn't,
lessons, adjustments, letter grade A-F).

STEP 5 — Update memory/TRADING-STRATEGY.md if a rule needs changing.

STEP 6 — Send ONE ClickUp message with headline numbers.
