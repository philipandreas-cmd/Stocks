#\!/usr/bin/env bash
# Notification wrapper. Posts to a ClickUp Chat channel.
# Usage: bash scripts/clickup.sh "<message>"
# If credentials are unset, appends to a local fallback file.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
FALLBACK="$ROOT/DAILY-SUMMARY.md"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
fi

if [[ $# -gt 0 ]]; then
  msg="$*"
else
  msg="$(cat)"
fi

if [[ -z "${msg// /}" ]]; then
  echo "usage: bash scripts/clickup.sh \"<message>\"" >&2
  exit 1
fi

stamp="$(date '+%Y-%m-%d %H:%M %Z')"

if [[ -z "${CLICKUP_API_KEY:-}" || -z "${CLICKUP_WORKSPACE_ID:-}" || -z "${CLICKUP_CHANNEL_ID:-}" ]]; then
  printf "\n---\n## %s (fallback — ClickUp not configured)\n%s\n" "$stamp" "$msg" >> "$FALLBACK"
  echo "[clickup fallback] appended to DAILY-SUMMARY.md"
  echo "$msg"
  exit 0
fi

# Find a Python interpreter that actually executes Python code.
# Order: python3 (Linux/cloud convention) -> python (Anaconda on Windows).
# The Microsoft Store stub fails the json/sys import check, so it gets skipped.
# Override with PYTHON=/path/to/python in .env if auto-detection picks the wrong one.
if [[ -z "${PYTHON:-}" ]]; then
  for cand in python3 python; do
    if command -v "$cand" >/dev/null 2>&1 && "$cand" -c "import json,sys" >/dev/null 2>&1; then
      PYTHON="$cand"
      break
    fi
  done
fi

if [[ -z "${PYTHON:-}" ]]; then
  echo "ERROR: no working Python interpreter found." >&2
  echo "Tried 'python3' and 'python'. Either:" >&2
  echo "  - Add your Python to PATH (Anaconda: open 'Anaconda Prompt', or set PATH manually)" >&2
  echo "  - Or set PYTHON=/full/path/to/python.exe in .env" >&2
  echo "  - On Windows: also disable the Microsoft Store python aliases" >&2
  echo "    (Settings -> Apps -> Advanced app settings -> App execution aliases)" >&2
  exit 1
fi

payload="$("$PYTHON" -c "
import json, sys
print(json.dumps({'type': 'message', 'content': sys.argv[1], 'content_format': 'text/md'}))
" "$msg")"

curl -fsS -X POST \
  "https://api.clickup.com/api/v3/workspaces/$CLICKUP_WORKSPACE_ID/chat/channels/$CLICKUP_CHANNEL_ID/messages" \
  -H "Authorization: $CLICKUP_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$payload"

echo
