# Research Log

Daily pre-market research entries appended here. One entry per day.

---

## 2026-06-19 — Pre-market Research

### Account
- **BLOCKED**: ALPACA_API_KEY not set in remote environment — live account data unavailable.
- Trade log shows Day 0 baseline: $10,000 cash, 0 positions (no positions opened yet per TRADE-LOG.md).

### Market Context
- **WTI / Brent**: WTI ~$77+, Brent ~$79.24. Both erasing gains from Middle East conflict after US-Iran interim peace deal; tankers flowing again through Strait of Hormuz; Kuwait signaling production increase. Source: [newsonair.gov.in](https://www.newsonair.gov.in/crude-oil-prices-rise-brent-at-67-73-wti-at-63-68-per-barrel)
- **S&P 500 futures**: **MARKET CLOSED — Juneteenth holiday.** Next trading day Monday June 22. Source: [Schwab](https://www.schwab.com/learn/story/stock-market-update-open)
- **VIX**: ~16.41 as of June 16 close; spiked to 22.22 on June 10, recovering from ~31 peak in late March. Moderate fear. Source: [tradingeconomics.com](https://tradingeconomics.com/united-states/cboe-volatility-index-vix-fed-data.html)
- **Today's catalysts**: None — market closed. This week's main event was FOMC June 16-17 (Warsh's first meeting as chair): Fed signaled possible rate hike this year → markets sold off Wednesday, partial recovery Thursday. Source: [Schwab](https://www.schwab.com/learn/story/stock-market-update-open)
- **Earnings before open**: None (holiday). 2 minor reports scheduled for June 19 but market closed. Source: [earningswhispers.com](https://www.earningswhispers.com/calendar/20260619/1)
- **Economic calendar**: No releases today (Juneteenth). All delayed releases to Monday June 22. Source: [federalreserve.gov](https://www.federalreserve.gov/newsevents/2026-june.htm)
- **Sector momentum YTD 2026**: Industrials (XLI) leading; Healthcare (XLV) surprise outperformer (flight-to-safety); Communications (XLC) close second. Energy (XLE) negative YTD — impacted by Iran deal unwinding supply-risk premium. Tech (XLK) cooling after 2025 AI run. Source: [spglobal.com](https://www.spglobal.com/spdji/en/documents/performance-reports/dashboard-us-sector.pdf)

### Trade Ideas
No trades today — market closed (Juneteenth). Watchlist for Monday June 22:
1. **XLI / Industrials names** — sector momentum leader YTD; look for pullback entry on individual industrial stocks with strong earnings. Entry TBD Monday pre-market.
2. **UAL / DAL (Airlines)** — fuel cost tailwind from oil decline; cruise lines (CCL, RCL) also moving higher. Watch for continuation Monday AM. Entry TBD; stop 10% below entry; target +20-25% R:R 2:1.
3. **Healthcare name** — XLV outperforming as flight-to-safety; identify individual stock with upcoming catalyst for Monday research.

### Risk Factors
- FOMC hawkish shift (potential rate hike 2026) — headwind for growth/tech
- US-Iran deal fragile — oil could spike again if deal breaks down, hitting travel/industrials
- ALPACA_API_KEY missing in remote env — bot cannot trade until fixed; **critical blocker**
- VIX at 16 but recently spiked to 22 — elevated volatility regime, size conservatively

### Decision
**HOLD** — Market closed (Juneteenth). No action possible today.
**ACTION REQUIRED**: Set ALPACA_API_KEY, ALPACA_SECRET_KEY, CLICKUP_API_KEY, CLICKUP_WORKSPACE_ID, CLICKUP_CHANNEL_ID as environment secrets in the remote session before next run (Monday June 22).

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
