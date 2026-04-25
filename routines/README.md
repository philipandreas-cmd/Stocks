# Cloud Routine Prompts

Each routine is a verbatim prompt you paste into a Cowork "Routine" (Edit
routine dialog → Instructions field). The routine clones this repo, runs
your bash wrappers, and pushes memory updates back to `main`.

| File | Cron (America/Chicago) | Description |
|------|----------------------|-------------|
| pre-market.md | `0 6 * * 1-5` | Research catalysts, write trade ideas |
| market-open.md | `30 8 * * 1-5` | Execute planned trades, set stops |
| midday.md | `0 12 * * 1-5` | Scan positions, cut losers, tighten stops |
| daily-summary.md | `0 15 * * 1-5` | EOD snapshot, always sends ClickUp message |
| weekly-review.md | `0 16 * * 5` | Weekly stats, letter grade, strategy update |

## Setup Per Routine

1. **Name** — match the filename (e.g. `pre-market`).
2. **Instructions** — paste the file's full contents, then replace the
   `<...>` placeholders in the SETUP block at the top with your real keys
   from `.env`. The keys live ONLY in this routine prompt; never commit
   them to the repo.
3. **Repository** — `philipandreas-cmd/Stocks` branch `main`.
4. **Trigger** — schedule with the cron above. If the UI lacks a Chicago
   timezone, use 13:00 CEST (summer) / 13:00 CET (winter) for pre-market;
   adjust manually at DST boundaries.
5. **Connectors** — none. The bot uses bash + curl directly.
6. **Permissions** — toggle ON "Allow unrestricted git push".
7. **Run now** — smoke test before waiting for the scheduled run.

## Why credentials are in the prompt

Cowork routines do not have a separate environment-variables panel.
The prompt itself sets env vars via `export` before any wrapper is called.
This is private to your Cowork account; the wrappers and `.env` file in
the repo never see real credentials in version control.

## Research

Research uses Claude's native WebSearch tool — no separate API key.
Always cite source URLs in RESEARCH-LOG.md.
