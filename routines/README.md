# Cloud Routine Prompts

Each routine is a verbatim prompt you paste into a Cowork "Routine" (Edit
routine dialog → Instructions field). The routine clones this repo, writes
.env from the SETUP block at the top of the prompt, runs the bash wrappers,
and pushes memory updates back to `main`.

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
   `<...>` placeholders in the SETUP block at the top with your real
   credentials. The bot writes a `.env` file from these every run; the
   `.env` is gitignored and never committed back to the repo.
3. **Repository** — `philipandreas-cmd/Stocks` branch `main`.
4. **Trigger** — schedule with the cron above. If the UI lacks a Chicago
   timezone, use 13:00 CEST (summer) / 12:00 CET (winter) for pre-market;
   adjust manually at DST boundaries.
5. **Connectors** — none. The bot uses bash + curl directly.
6. **Permissions** — toggle ON "Allow unrestricted git push".
7. **Run now** — smoke test before waiting for the scheduled run.

## Why credentials are in the prompt

Cowork routines do not have a separate environment-variables panel.
The prompt itself writes `.env` (which `scripts/alpaca.sh` and
`scripts/clickup.sh` source automatically) before any wrapper call.
This is private to your Cowork account.

`export` in the prompt would NOT work — every `bash` call starts a fresh
shell, so process-env exports don't persist across calls. Writing `.env`
once at the start of the session is the cleanest fix.

## Research

Research uses Claude's native WebSearch tool — no separate API key.
Always cite source URLs in RESEARCH-LOG.md.
