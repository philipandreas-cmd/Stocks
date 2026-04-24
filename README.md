# Trading Bot

Autonomous swing-trading agent built on Claude Code cloud routines.

## How It Works

Five cron jobs fire each weekday. Each spins up a fresh Claude Code cloud container that:
1. Clones this repo (reads latest memory)
2. Pulls live Alpaca account state
3. Does its job (research / execute / scan / summarize / review)
4. Commits any memory updates back to `main`
5. Sends a ClickUp notification (per workflow rules)

**Claude is the bot.** No separate Python process. Research runs through
Claude's native WebSearch tool — no third-party research API required.

## Quick Start

1. Copy `env.template` → `.env`, fill in credentials
2. Open this repo in Claude Code locally
3. Run `/portfolio` to verify Alpaca connection
4. Set up the five cloud routines per the setup guide (Part 7)

## Execution Modes

| Mode | Trigger | Credentials |
|------|---------|-------------|
| Local | `/slash-command` in Claude Code | `.env` file |
| Cloud | Cron routine | Routine env vars (no `.env`) |

## Cron Schedule (America/Chicago)

| Routine | Cron | Time |
|---------|------|------|
| Pre-market | `0 6 * * 1-5` | 6:00 AM weekdays |
| Market-open | `30 8 * * 1-5` | 8:30 AM weekdays |
| Midday | `0 12 * * 1-5` | Noon weekdays |
| Daily-summary | `0 15 * * 1-5` | 3:00 PM weekdays |
| Weekly-review | `0 16 * * 5` | 4:00 PM Fridays |

## Strategy (Hard Rules)

- **Stocks only** — no options, ever
- Max 5-6 open positions
- Max 20% equity per position
- Max 3 new trades per week
- 10% trailing stop GTC on every position
- Cut losers at -7%
- Tighten trail: 7% at +15%, 5% at +20%
- Never within 3% of price; never move a stop down
- Exit sector after 2 consecutive failed trades

## Memory Files

All state lives in `memory/` — committed to `main` after every run.

| File | Purpose |
|------|---------|
| `TRADING-STRATEGY.md` | Rulebook (read first every session) |
| `TRADE-LOG.md` | Every trade + daily EOD snapshots |
| `RESEARCH-LOG.md` | Daily pre-market research entries |
| `WEEKLY-REVIEW.md` | Friday recaps with letter grade |
| `PROJECT-CONTEXT.md` | Static background and mission |

## Prerequisites

- GitHub account
- Alpaca brokerage account (paper to start)
- ClickUp account (chat channel for notifications)
- Claude Code with cloud routines access
