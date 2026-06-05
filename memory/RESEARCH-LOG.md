# Research Log

Daily pre-market research entries appended here. One entry per day.

---

## 2026-06-05 — Pre-market Research

### Account
- Equity: N/A — no .env credentials present in session; Alpaca API calls skipped
- Cash: N/A
- Buying power: N/A
- Daytrade count: N/A
- Note: TRADE-LOG shows no open positions (Day 0 baseline, bot pre-launch)

### Market Context
- WTI / Brent: ~$95/bbl both benchmarks — elevated; Brent $95.25 (+0.23% Jun 5); WTI near $95 after -3% drop previous session then partial recovery. Geopolitical premium from US-Iran military exchange threatening Strait of Hormuz. Source: [TradingEconomics](https://tradingeconomics.com/commodity/brent-crude-oil), [Robinhood Prediction Market](https://robinhood.com/us/en/prediction-markets/commodities/events/brent-crude-oil-price-on-june-05-2026-at-5-00-pm-edt-jun-05-2026/)
- S&P 500 futures: ES futures -0.61% premarket; Polymarket implied only 21% probability index opens higher. US-Iran conflict and May jobs report weighing. Source: [Benzinga](https://www.benzinga.com/markets/prediction-markets/26/06/53021990/sp500-june-5-open-up-or-down-polymarket-jobs-report-fed-outlook)
- VIX: ~15.40 as of Jun 4 close (-4.11% that day); prior close Jun 1 was 16.05. Moderate fear, not extreme. Source: [StreetStats](https://streetstats.finance/markets/volatility)
- Today's catalysts: May nonfarm payrolls before open — consensus 80-85K (weak; April was 115K); unemployment expected 4.3%. Weak print likely. PCE slightly below estimates last week (mild positive), but annual PCE at multi-year highs. Q1 GDP second estimate light. Source: [Benzinga](https://www.benzinga.com/markets/prediction-markets/26/06/53021990/sp500-june-5-open-up-or-down-polymarket-jobs-report-fed-outlook), [Schwab](https://www.schwab.com/learn/story/stock-market-update-open)
- Earnings before open: 28 reports scheduled Jun 5 per Earnings Whispers; no marquee names identified in snippets. Source: [EarningsWhispers](https://www.earningswhispers.com/calendar/20260605/3)
- Economic calendar: May NFP (key), April JOLTS, weekly jobless claims. FOMC meeting begins Jun 6 (Kevin Warsh's first meeting as Fed chair — policy stance uncertain). May CPI due Jun 10. Source: [Kiplinger](https://www.kiplinger.com/investing/economy/this-weeks-economic-calendar)
- Sector momentum YTD: Energy +22% (leader), Healthcare strong (flight-to-safety), Consumer Staples at ATH. Tech cooling (AI capex ROI doubts; AVGO, CRWD post-earnings declines). Financials -8.69%, Consumer Discretionary -4.99% worst. Source: [CSIMarket](https://csimarket.com/markets/markets_glance.php?days=ytd), [FT Portfolios](https://www.ftportfolios.com/blogs/MarketBlog/2026/3/10/top-performing-sp-500-index-subsectors-ytd-thru-36)

### Trade Ideas
1. **XOM** — Energy leading YTD +22%; Middle East conflict sustaining $95 oil; XOM has direct upstream leverage to WTI. Entry ~$125 on open, stop $112.50 (10% trail), target $150 (+20%); R:R ~2.5:1. Wait for NFP to settle (first 30min rule) before entry.
2. **XLV (Healthcare ETF)** — Defensive rotation into healthcare as economic data softens and geopolitical risk elevated; lower single-stock risk vs individual name. Entry ~$155 on open, stop $139.50 (10% trail), target $180; R:R ~2.0:1.
3. **DVN or EOG** — E&P names with higher beta to oil prices if Strait of Hormuz risk escalates further; smaller position (~10% of account) for leverage. Entry on strength after NFP print, stop -10%, target +25%.

### Risk Factors
- US-Iran military exchange could de-escalate rapidly, collapsing oil premium and XOM/DVN
- May NFP weak print (80K) could trigger broad sell-off; stronger-than-expected print (>100K) could be hawkish surprise
- Kevin Warsh FOMC (Jun 6) — unknown policy stance; potential for hawkish surprise
- VIX at 15.40 is moderate — not pricing extreme tail risk; gap-down possible if NFP misses badly
- No open positions = no stop-loss exposure today, but also no existing gains to protect
- Alpaca credentials unavailable — cannot execute trades this session

### Decision
**HOLD** — Do not enter any position today.
- NFP is binary; market already leaning bearish (-0.61% futures) — wait for post-report stabilization
- Warsh FOMC begins tomorrow — added policy uncertainty
- US-Iran situation fluid; oil could spike or collapse on headlines
- Credentials unavailable anyway — no trades can be placed this session
- Revisit energy (XOM) and healthcare (XLV) Monday if energy sector holds leadership and geopolitical risk persists

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
