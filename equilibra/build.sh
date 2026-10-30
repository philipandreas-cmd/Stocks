#!/usr/bin/env bash
# Wrap site/index.html (page body, as published to claude.ai) into a standalone
# dist/index.html for any static host (Vercel, Netlify, GitHub Pages).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p dist
{
  printf '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n'
  cat site/index.html
  printf '\n</body></html>\n'
} > dist/index.html
echo "Built dist/index.html"
