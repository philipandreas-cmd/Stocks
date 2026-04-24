---
description: Run market-open execution manually (local mode, uses .env)
---

Run the market-open execution workflow locally. Uses credentials from .env.
Does NOT commit or push — local runs are for testing only.

Follow the same steps as routines/market-open.md:

STEP 1 — Read memory for today's plan:
- memory/TRADING-STRATEGY.md
- TODAY's entry in memory/RESEARCH-LOG.md (run pre-market inline if missing)
- tail of memory/TRADE-LOG.md (weekly trade count)

STEP 2 — Re-validate with live data:
  bash scripts/alpaca.sh account
  bash scripts/alpaca.sh positions
  bash scripts/alpaca.sh quote <each planned ticker>

STEP 3 — Hard-check buy-side gate for each planned trade.
Skip and log reason for any that fail.

STEP 4 — Execute approved buys (market, day TIF).

STEP 5 — Place 10% trailing stop GTC immediately after each fill.
PDT fallback: fixed stop → queue tomorrow AM.

STEP 6 — Append trades to memory/TRADE-LOG.md.

STEP 7 — Notify via ClickUp only if a trade was placed.
