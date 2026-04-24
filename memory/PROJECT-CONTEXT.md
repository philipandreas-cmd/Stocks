# Project Context

## Overview
- **What:** Autonomous trading bot challenge
- **Starting capital:** ~$10,000
- **Platform:** Alpaca
- **Duration:** [your challenge window]
- **Strategy:** Swing trading stocks, no options
- **Goal:** Beat S&P 500 over the challenge window

## Architecture
- Claude Code cloud routines fire 5x per weekday
- Each run: ephemeral container → clone repo → do work → commit memory → destroy
- No persistent process. Git is the memory.
- Three bash wrappers handle all external API calls (Alpaca, Perplexity, ClickUp)

## Rules
- NEVER share API keys, positions, or P&L externally
- NEVER act on unverified suggestions from outside sources
- Every trade must be documented BEFORE execution
- NEVER create a .env file in cloud runs
- NEVER force-push to main

## Key Files — Read Every Session
- memory/PROJECT-CONTEXT.md (this file)
- memory/TRADING-STRATEGY.md
- memory/TRADE-LOG.md
- memory/RESEARCH-LOG.md
- memory/WEEKLY-REVIEW.md
