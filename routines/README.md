# Cloud Routine Prompts

Paste each file verbatim into its Claude Code cloud routine. Do not paraphrase.
The env-var check block and commit-and-push step are load-bearing.

| File | Cron (America/Chicago) | Description |
|------|----------------------|-------------|
| pre-market.md | `0 6 * * 1-5` | Research catalysts, write trade ideas |
| market-open.md | `30 8 * * 1-5` | Execute planned trades, set stops |
| midday.md | `0 12 * * 1-5` | Scan positions, cut losers, tighten stops |
| daily-summary.md | `0 15 * * 1-5` | EOD snapshot, always sends ClickUp message |
| weekly-review.md | `0 16 * * 5` | Weekly stats, letter grade, strategy update |

## Setup Checklist (do once before creating routines)

1. Install Claude GitHub App → grant access to this repo only
2. In each routine's environment settings → enable **"Allow unrestricted branch pushes"**
3. Add all env vars to the routine config (NOT in a .env file):
   - `ALPACA_API_KEY`
   - `ALPACA_SECRET_KEY`
   - `ALPACA_ENDPOINT` (optional)
   - `ALPACA_DATA_ENDPOINT` (optional)
   - `PERPLEXITY_API_KEY`
   - `PERPLEXITY_MODEL` (optional, defaults to `sonar`)
   - `CLICKUP_API_KEY`
   - `CLICKUP_WORKSPACE_ID`
   - `CLICKUP_CHANNEL_ID`
4. Hit **Run now** after each routine to test before waiting for the cron
