# Research Log

Daily pre-market research entries appended here. One entry per day.

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

## 2026-06-16 — Pre-market Research

### Account
- **STATUS: .env missing** — Alpaca wrappers could not run; account snapshot unavailable
- Launch day (Day 1) — baseline $10,000 cash, no open positions per TRADE-LOG
- Daytrade count: 0 (assumed; could not verify via API)

### Market Context
- **WTI:** ~$77.31 | **Brent:** ~$80.47 (–5% overnight — US-Iran peace deal announced, Strait of Hormuz reopening expected by end of week) — [TradingEconomics](https://tradingeconomics.com/commodity/brent-crude-oil)
- **S&P 500 futures:** ESM26 +1.22%, NQM26 +1.99% premarket — bullish open expected following Monday's +1.65% close — [StockTwits/Benzinga](https://stocktwits.com/news-articles/markets/equity/nasdaq-sp500-futures-breather-ahead-of-first-warsh-led-fed-decision-why-spcx-tsla-rklb-baba-nvo-sti-in-focus/cZKWkRXR7Ek)
- **VIX:** ~15.77 (low; range 15.18–23.34 past month) — calm but event risk today — [TradingEconomics](https://tradingeconomics.com/united-states/cboe-volatility-index-vix-fed-data.html)
- **Today's catalysts:** First FOMC meeting under new Fed Chair Kevin Warsh (June 16–17); decision at 2:00pm ET, press conference 2:30pm ET. 99% probability of hold at 3.5–3.75%. Hawkish press conference tone is the tail risk — [Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/june-16-may-big-day-223000567.html), [TheStreet](https://www.thestreet.com/stock-market-today/stock-market-today-dow-jones-sp-500-nasdaq-updates-june-16-2026)
- **Earnings before open:** No major pre-market earnings scheduled for June 16 — [EarningsWhispers](https://www.earningswhispers.com/calendar/20260616/1)
- **Economic calendar:** FOMC rate decision dominates; dot plot and economic projections also released at 2pm ET; current rate 3.5–3.75% held 3 consecutive meetings — [Yahoo Finance](https://finance.yahoo.com/personal-finance/banking/article/when-is-the-next-fed-meeting-full-schedule-150709698.html)
- **Sector momentum (YTD 2026):** Tech led May; rotation into Industrials/Healthcare/Defense in progress. Financials worst YTD (–8.69% thru 3/10). Energy lagging on profitability despite geopolitical tailwinds. Consumer Staples/Defense at highs — [SPGlobal](https://www.spglobal.com/spdji/en/documents/performance-reports/dashboard-us-sector.pdf), [StockTitan](https://www.stocktitan.net/rankings/stock-gains-monthly/2026/6)

### Trade Ideas
1. **Airlines (e.g., UAL, DAL)** — US-Iran peace deal → Middle East routes reopen + Strait of Hormuz oil flow → lower jet fuel costs; double tailwind. Entry on open dip, stop –8%, target +16%, R:R ~2:1. Risk: if Warsh is hawkish, travel discretionary sells off.
2. **Defense (e.g., LMT, RTX)** — Peace deal may reduce near-term defense spending narrative; monitor for dip-buy if sector sells off on "peace dividend." Sector has been at highs — wait for a pullback entry post-Fed before committing.
3. **Industrials (e.g., CAT, GE)** — Top June momentum sector per StockTitan, supported by onshoring/AI infrastructure themes. Hawkish Fed is key risk. Set alerts; enter only post-2pm if tone is neutral/dovish.

### Risk Factors
- **Warsh hawkish surprise:** Any signal of rate hike bias at 2:30pm press conference → growth/tech multiple compression, broad selloff
- **Oil spike reversal:** US-Iran deal could collapse; Strait of Hormuz uncertainty remains
- **Missing .env:** Cannot confirm actual account state, buying power, or existing orders — MUST restore .env before placing any trades
- **PDT:** Day 1; 0 day trades used, but must track carefully once trading begins

### Decision
**HOLD** — Two reasons: (1) .env missing → cannot place orders safely. (2) FOMC decision at 2pm ET → entering positions before the announcement adds unnecessary event risk. Monitor post-Fed tone; reassess for Wednesday morning if Warsh is neutral/dovish. Restore .env as first priority.

---
