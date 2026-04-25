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

## 2026-04-25 — Pre-market Research (Weekend; for Monday Apr 28 open)

### Account
- Equity: N/A — ALPACA_API_KEY / ALPACA_SECRET_KEY not set in process env; API calls skipped
- Cash: N/A
- Buying power: N/A
- Daytrade count: N/A
- Positions: None (Day 0 baseline per TRADE-LOG)

### Market Context
- WTI: ~$94.40/bbl | Brent: ~$105.33/bbl — Brent +16% / WTI +13% on the week; driven by geopolitical supply fears. Source: [Oneindia](https://www.oneindia.com/india/crude-oil-rates-today-april-25-2026-brent-crude-remains-105-per-barrel-check-latest-prices-of-g-8068929.html), [CNBC](https://www.cnbc.com/2026/04/24/oil-price-wti-brent-after-israel-lebanon-ceasefire-extension.html)
- S&P 500 futures: ~7,189 (+0.3% Fri); market near record highs. Source: [Time News](https://time.news/sp-500-futures-rise-as-oil-falls-intel-jumps-on-earnings/)
- VIX: ~19.0 (range 18.82–19.33 Fri); 52-wk high 35.30 (Mar 9), 52-wk low 13.38 (Dec 24). Source: [Yahoo Finance](https://finance.yahoo.com/quote/%5EVIX/)
- Today's catalysts (Saturday — market closed; forward-looking to Mon):
  - US-Iran nuclear talks expected in Pakistan → oil supply risk relief possible. Source: [CNBC](https://www.cnbc.com/2026/04/24/oil-price-wti-brent-after-israel-lebanon-ceasefire-extension.html)
  - Israel-Lebanon ceasefire extended 3 weeks
  - Intel (INTC) +25% on strong Q1; data center/AI revenue +22% — semis on 18-session win streak, SOX +50% YTD. Source: [CNBC](https://www.cnbc.com/2026/04/23/stock-market-today-live-updates.html)
  - Amazon/Anthropic deal: AMZN invests $25B in Anthropic, 10-yr AWS commitment >$100B. Source: [CNBC](https://www.cnbc.com/2026/04/23/stock-market-today-live-updates.html)
  - U. Michigan Consumer Sentiment final: 47.6 (record low preliminary) — released Fri Apr 24
  - 80%+ of S&P 500 reporters beat EPS and revenue so far
- Earnings before open Monday Apr 28: No major names flagged
- Big week ahead:
  - **Wed Apr 29**: FOMC rate decision + GOOGL / AMZN / META / MSFT report after close
  - **Thu Apr 30**: AAPL reports after close; PCE / GDP Q1 advance estimate likely
  - Source: [Kraken Blog](https://blog.kraken.com/economic-brief/april-22-2026)
- Economic calendar: GDP Q1 advance + PCE + FOMC decision all landing Apr 29-30; highest-impact macro week of Q2
- Sector momentum YTD 2026 (leading → lagging):
  - **Leading**: Energy +22.7%, Materials +16.3%, Industrials +14.3%, Consumer Staples
  - **Lagging**: Tech, Communications, Consumer Discretionary, Financials
  - Source: [WestMount Fundamentals](https://westmountfundamentals.com/best-performing-stocks-2026/), [Investing.com](https://www.investing.com/analysis/sector-rotation-a-guide-to-the-sp-500-momentum-status-200675903)

### Trade Ideas
1. **XLE / Energy individual (e.g., XOM, CVX)** — Energy sector #1 YTD (+22%); Brent at $105 with geopolitical supply risk; thesis intact if US-Iran talks stall. Entry on Mon open ~market, stop 10% trailing, target +20%. R:R ~2:1. *Do NOT enter until account env vars confirmed and position size verified.*
2. **XLI / Industrial name (e.g., HON, GE)** — Industrials +14% YTD, sector in Leading quadrant. Defense/infrastructure tailwind. Entry on pullback to 5-day MA. Stop 10% trailing, target +20%. R:R 2:1.
3. **INTC** — Post-earnings +25% gap; strong AI/data center beat. Sector (semis) on 18-session win streak. *Caution: chasing a gap is risky; wait for 3-5 day consolidation above breakout level before entry.*

### Risk Factors
- FOMC Apr 29: any hawkish surprise → broad sell-off
- Big Tech earnings Apr 29-30: if MSFT/AMZN/META miss on AI capex ROI → tech-led correction
- US-Iran talks collapse → oil spike, geopolitical risk premium
- Consumer Sentiment at record low 47.6 → demand destruction concern
- VIX at 19 is manageable but elevated vs Dec lows (13.4)
- Env vars missing → cannot confirm account equity, cash, or daytrade count before Monday open; **must resolve before placing any order**

### Decision
**HOLD** — No positions to manage. Entering a massive macro week (FOMC + Big Tech earnings Apr 29-30). Default patience. Watch Energy and Industrials for clean entries Mon/Tue *after* confirming account state. Do not trade Tue-Wed around FOMC unless setup is exceptional.

---
