# Research Log

Daily pre-market research entries appended here. One entry per day.

---

## 2026-05-14 — Pre-market Research

### Account
- Equity: N/A — ALPACA_API_KEY not set in environment (credentials missing from .env)
- Cash: N/A
- Buying power: N/A
- Daytrade count: N/A
- Positions: 0 (Day 0 baseline, bot just launched)

### Market Context
- **WTI:** ~$101.54 | **Brent:** ~$105.87 (+0.22%) — supported by Middle East tensions, declining inventories. Source: https://www.oilpriceapi.com/oil-prices-today
- **S&P 500 futures:** +0.12% premarket; prior close ~7,400.96 (Wed May 13). Source: https://www.benzinga.com/markets/prediction-markets/26/05/52551628/sp500-may-14-open-up-or-down-polymarket-inflation-ai-rally
- **VIX:** ~17.85–17.92, -2.1% from prior day — moderate fear, declining. Source: https://finance.yahoo.com/quote/%5EVIX/
- **Today's catalysts:**
  - **PPI April: +1.4% MoM** (vs +0.4% est); core +1.0% (vs +0.3% est) — massive inflation beat. Source: https://www.schwab.com/learn/story/stock-market-update-open
  - **Kevin Warsh confirmed as new Fed Chair** by Senate; Powell term expires May 15. Policy uncertainty elevated. Source: https://finance.yahoo.com/news/live/stock-market-today-dow-slides-sp-500-and-nasdaq-rise-as-ppi-inflation-data-comes-in-hot-223045547.html
  - **CSCO earnings beat (after close May 13):** Revenue $15.84B (+12% YoY) vs $15.56B est; EPS $1.06 vs $1.04 est; AI hyperscaler orders $1.9B (triple-digit growth); stock +17% AH. Source: https://www.cnbc.com/2026/05/13/cisco-csco-q3-earnings-report-2026.html
  - **NVDA** at ~$227.80 (+2.8%); Q1 FY2027 earnings May 20; guided ~$78B revenue (+75% YoY). Wells Fargo PT raised to $315. Source: https://finance.yahoo.com/quote/NVDA/
- **Earnings before open today:** Klarna Q1 2026 (8:30am ET webcast). 244 total reports today. Source: https://finance.yahoo.com/markets/stocks/articles/klarna-publish-q1-2026-earnings-123700781.html
- **Economic calendar:** No major scheduled US data confirmed for May 14 (PPI was May 13; CPI/FOMC dates TBD). Source: https://tradingeconomics.com/calendar
- **Sector momentum YTD:**
  - Leading: Semis (+64% since end-March; NVDA, AVGO), Energy (XLE, XOM), Consumer Staples, Industrials, Materials
  - Lagging: Tech (XLK), Comms (XLC), Discretionary (XLY), Financials (XLF)
  - Source: https://www.heygotrade.com/en/blog/sp-500-outlook-2026/ | https://www.spglobal.com/spdji/en/documents/performance-reports/dashboard-us-sector.pdf

### Trade Ideas
1. **XOM** — Energy sector leading YTD; WTI $101 with supply discipline; strong FCF. Entry ~$127–130 on intraday dip, stop 10% below entry (~$115–117), target +20% (~$152+). R:R ~2:1. Risk: hot PPI could hurt if Fed gets hawkish under Warsh.
2. **NVDA** — Pre-earnings momentum run into May 20 print; guided $78B (+75% YoY); Wells Fargo PT $315; AI capex cycle intact. Entry ~$225–228 on morning consolidation, stop $205 (-9.5%), target $260 (+15%). R:R ~1.6:1. Risk: pre-earnings IV, any miss would be catastrophic.
3. **CSCO** — Gap-up 17% post-beat. Do NOT chase the gap. Monitor for 3–5 day consolidation above breakout level; re-evaluate next week for entry on pullback.

### Risk Factors
- PPI +1.4% MoM is a major hawkish shock — could trigger rate-hike fears under new Fed Chair Warsh (reputation: hawkish)
- Fed chair transition May 15 creates policy uncertainty — markets could sell off if Warsh signals tighter policy
- Oil at $101 WTI adds to inflationary read-through
- Semi sector already +64% in 6 weeks — stretched; any miss from NVDA (May 20) unwinds the whole group
- No live account data (credentials missing) — cannot verify actual equity, positions, or stops

### Decision
**HOLD** — Hot PPI + Fed chair transition = elevated macro uncertainty. No positions open. Do not initiate new trades without live account confirmation. Resolve .env credentials before market open to enable live monitoring. Re-evaluate XOM / NVDA if macro calms post-open and account access is restored.

---

<!-- Entry format:
## YYYY-MM-DD — Pre-market Research

### Account
- Equity: $X
- Cash: $X
- Buying power: $X
- Daytrade count: N

### Market Context
- WTI / Brent:
- S&P 500 futures:
- VIX:
- Today's catalysts:
- Earnings before open:
- Economic calendar:
- Sector momentum:

### Trade Ideas
1. TICKER — catalyst, entry $X, stop $X, target $X, R:R X:1
2. TICKER — catalyst, entry $X, stop $X, target $X, R:R X:1

### Risk Factors
- ...

### Decision
TRADE or HOLD (default HOLD if no edge)

---
-->
