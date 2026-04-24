---
description: Run midday scan manually (local mode, uses .env)
---

Run the midday scan workflow locally. Uses credentials from .env.
Does NOT commit or push — local runs are for testing only.

Follow the same steps as routines/midday.md:

STEP 1 — Read memory:
- memory/TRADING-STRATEGY.md (exit rules)
- tail of memory/TRADE-LOG.md (entries, thesis, stops)
- today's memory/RESEARCH-LOG.md entry

STEP 2 — Pull current state:
  bash scripts/alpaca.sh positions
  bash scripts/alpaca.sh orders

STEP 3 — Cut losers (unrealized_plpc <= -0.07): close position + cancel stop.

STEP 4 — Tighten trailing stops on winners:
- Up >= +20% → trail_percent "5"
- Up >= +15% → trail_percent "7"
Never within 3% of current price. Never move a stop down.

STEP 5 — Thesis check: cut if thesis broke even if not at -7%.

STEP 6 — Optional WebSearch research if something moving sharply unexplained.

STEP 7 — Notify via ClickUp only if action was taken.
