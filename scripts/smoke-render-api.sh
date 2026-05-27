#!/usr/bin/env bash
set -euo pipefail

ENDPOINT="${ENDPOINT:-https://api.computer.iai.one}"
MIN_MIGRATIONS="${MIN_MIGRATIONS:-5}"

if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl is required" >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "ERROR: node is required for JSON assertions" >&2
  exit 1
fi

tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT

host="$(node - "$ENDPOINT" <<'NODE'
const endpoint = process.argv[2];
try {
  console.log(new URL(endpoint).hostname);
} catch {
  process.exit(1);
}
NODE
)"

if ! node - "$host" <<'NODE'
const dns = require("node:dns");
const host = process.argv[2];
dns.lookup(host, (err, address) => {
  if (err) {
    console.error(`ERROR: DNS lookup failed for ${host}: ${err.code || err.message}`);
    console.error("ACTION: create the DNS/custom-domain mapping before running API smoke.");
    process.exit(1);
  }
  console.log(`PASS DNS ${host} -> ${address}`);
});
NODE
then
  exit 1
fi

request_json() {
  local path="$1"
  local output="$2"
  local status
  status="$(curl -sS -o "$output" -w "%{http_code}" "$ENDPOINT$path")"
  if [ "$status" -lt 200 ] || [ "$status" -gt 299 ]; then
    echo "ERROR: $path returned HTTP $status" >&2
    cat "$output" >&2
    exit 1
  fi
}

echo "Smoke target: $ENDPOINT"

health_json="$tmpdir/health.json"
request_json "/api/health" "$health_json"
node - "$health_json" <<'NODE'
const fs = require("node:fs");
const data = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
if (!["healthy", "ok"].includes(data.status)) {
  console.error("ERROR: /api/health status is not healthy/ok:", data.status);
  process.exit(1);
}
console.log("PASS /api/health", data.status);
NODE

deep_json="$tmpdir/health-deep.json"
request_json "/api/health/deep" "$deep_json"
node - "$deep_json" "$MIN_MIGRATIONS" <<'NODE'
const fs = require("node:fs");
const data = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const minMigrations = Number(process.argv[3]);
const migrations = data.checks?.migrations;
if (!migrations || migrations.status !== "pass") {
  console.error("ERROR: migrations check did not pass:", migrations);
  process.exit(1);
}
if (Number(migrations.count) < minMigrations) {
  console.error(`ERROR: expected at least ${minMigrations} migrations, got ${migrations.count}`);
  process.exit(1);
}
if (!data.checks?.database || data.checks.database.status !== "pass") {
  console.error("ERROR: database check did not pass:", data.checks?.database);
  process.exit(1);
}
console.log("PASS /api/health/deep", `status=${data.status}`, `migrations=${migrations.count}`);
NODE

metrics_text="$tmpdir/metrics.txt"
status="$(curl -sS -o "$metrics_text" -w "%{http_code}" "$ENDPOINT/api/metrics")"
if [ "$status" -lt 200 ] || [ "$status" -gt 299 ]; then
  echo "ERROR: /api/metrics returned HTTP $status" >&2
  cat "$metrics_text" >&2
  exit 1
fi

if ! grep -q "^app_uptime_seconds " "$metrics_text"; then
  echo "ERROR: /api/metrics missing app_uptime_seconds" >&2
  cat "$metrics_text" >&2
  exit 1
fi

if ! grep -q "^db_health_status " "$metrics_text"; then
  echo "ERROR: /api/metrics missing db_health_status" >&2
  cat "$metrics_text" >&2
  exit 1
fi

echo "PASS /api/metrics"
echo "SMOKE_PASS endpoint=$ENDPOINT"
