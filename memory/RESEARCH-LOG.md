# Research Log

Daily pre-market research entries appended here. One entry per day.

---

## 2026-06-20 — Pre-market Research (Weekend Prep for Monday June 22 Open)

> **NOTE:** `.env` missing in this remote environment — Alpaca API unavailable.
> Account data from memory only (no live pull). **Credentials must be re-added.**

### Account (from TRADE-LOG — last known state)
- Equity: ~$10,000.00 (baseline)
- Cash: ~$10,000.00 (100%)
- Open positions: 0
- Daytrade count: 0
- Buying power: ~$10,000

### Market Context
- **WTI:** ~$77.33/bbl (Jun 19) | **Brent:** ~$78.95/bbl — Middle East war sustaining supply crunch; Strait of Hormuz uncertainty; crude steadied near $77. Sources: [TradingEconomics](https://tradingeconomics.com/commodity/crude-oil), [OilPriceAPI](https://www.oilpriceapi.com/live/wti-crude-oil-price)
- **S&P 500 futures:** ~7,542 last print (Jun 19 pre-holiday); markets closed Jun 19 (Juneteenth). Next open: Monday June 22. Post-FOMC selloff mid-week; dip buyers re-entering. Sources: [Schwab](https://www.schwab.com/learn/story/stock-market-update-open), [IG](https://www.ig.com/en/indices/markets-indices/us-spx-500)
- **VIX:** ~16.41 (Jun 16) — below long-term avg; modest fear level. Source: [GuruFocus](https://www.gurufocus.com/economic_indicators/234/vix)
- **S&P 500 YTD:** ~+11%; S&P 500 Momentum Index: +26% YTD as of May 29. Source: [Chase](https://www.chase.com/personal/investments/learning-and-insights/article/stock-market-returns-may-2026)
- **FOMC:** Fed (Chair Kevin Warsh) just removed easing bias; dot plot shows no cuts in 2026; updated projections reflect higher inflation, lower unemployment. FOMC-induced selloff Jun 18; recovery attempt in progress. Source: [TradingView/Schwab](https://tw.tradingview.com/chart/ES1%21/yOvyxDWX-Market-Outlook-for-Next-Week-US)
- **Earnings this week:** No major names Mon Jun 22. FedEx (FDX) after close Tue Jun 23. **Micron (MU) Jun 24** (EPS consensus $19.72; Q2 was +196% YoY revenue, 75% gross margin, 33% EPS beat). Source: [Yahoo Finance/Kiplinger](https://www.kiplinger.com/investing/stocks/17494/next-week-earnings-calendar-stocks), [Seeking Alpha](https://seekingalpha.com/article/4915106-micron-technology-buy-ahead-of-earnings-preview)
- **Economic calendar:**
  - Tue Jun 23: Flash PMI — US, Germany, EU, UK (S&P Global)
  - Thu Jun 25: US PCE Price Index (May, key), Final GDP Q1, Japan CPI
  Source: [LiteFinance](https://www.litefinance.org/blog/analysts-opinions/weekly-economic-calendar-for-22062026-28062026/)
- **Sector momentum (YTD leaders):** Energy (XLE +29-31%), Consumer Staples, Industrials (XLI +12.8%), Materials. Laggards: Tech, Comms, Consumer Discretionary, Financials (big banks mostly flat to down).
  - **CAUTION:** XLE momentum indicator turned negative Jun 15; 10-day MA crossed below 50-day Jun 16 — energy showing short-term exhaustion.
  Source: [S&P Dow Jones Indices](https://www.spglobal.com/spdji/en/documents/performance-reports/dashboard-us-sector.pdf), [247WallSt](https://247wallst.com/investing/2026/06/09/energy-refuses-to-quit-xle-up-29-ytd-as-oil-stocks-wake-up-2/)

### Trade Ideas
1. **MU (Micron Technology)** — Earnings catalyst Jun 24; AI-driven HBM memory demand; 30/30 analyst Buy consensus; targets raised to $1,200-$1,500. **BUT:** Last quarter beat ~33% then sold off; high expectations already priced in. **Entry:** Only post-earnings Thursday if guidance strong and stock holds. Stop: 10% trail. Target: $300 (est. 15%+ from entry). R:R: 2:1+. Risk: "sell the news" reaction despite beat.
2. **EOG Resources (EOG)** — +36% YTD on oil supply crunch/Middle East tailwind; strong earnings; WTI holding $77. **BUT:** Energy MAs just crossed bearish Jun 15-16. **Entry:** Wait for energy sector MA recrossing or WTI base above $78 before considering. Stop: 10% trail. Target: prior high + 10%.
3. **Parker Hannifin (PH) or GE Aerospace (GE)** — Industrials sector (XLI +12.8% YTD) showing steady momentum without energy's volatility; manufacturing re-acceleration thesis intact. **Entry:** Monday dip open if market sells on FOMC overhang, target 2:1 R:R off 10% stop. Requires individual chart review before entry — need live Alpaca data unavailable today.

### Risk Factors
- No .env credentials — cannot confirm live account equity, open orders, or positions before Monday open. **Urgent: restore .env.**
- FOMC overhang: no cuts in 2026 is hawkish surprise for rate-sensitive sectors; volatility may persist early week.
- PCE Thursday is binary risk — hot print would extend selloff.
- MU earnings binary event — avoid holding through if position entered Monday.
- Energy short-term MA breakdown — don't chase XLE/EOG/COP until confirmed re-entry signal.
- PDT rule: account <$25k, max 3 day trades per 5 rolling days. Zero used this week.

### Decision
**HOLD** — No positions open, credentials unavailable for live order flow. Market digesting FOMC; wait for:
1. Monday open stability (confirm no gap-down continuation)
2. MU earnings Wednesday night — evaluate Thursday open for potential entry
3. PCE Thursday — if benign, supports recovery; could add industrials or defensive momentum name
4. Restore .env credentials before any trade execution is possible.

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
