#!/usr/bin/env bash
set -euo pipefail

WEB_URL="${WEB_URL:-https://tranhatam-collab.github.io/Computer-AI/}"
API_URL="${API_URL:-http://localhost:3001}"

echo "Checking web:"
curl -L -s -o /tmp/computer-web.html -w "http=%{http_code} size=%{size_download} final=%{url_effective}\n" "$WEB_URL"

echo "Checking local API health if available:"
curl -sS "$API_URL/api/health" || true
