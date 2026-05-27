#!/usr/bin/env bash
set -euo pipefail

API_URL="${API_URL:-http://localhost:3001}"

echo "=== Auth Smoke Test ==="

# 1. Register
echo "POST /api/auth/register"
REGISTER=$(curl -sS -X POST "${API_URL}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@test.com","name":"Smoke User","locale":"vi"}')
echo "$REGISTER"
echo ""

# 2. Login
echo "POST /api/auth/login"
LOGIN=$(curl -sS -X POST "${API_URL}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"smoke@test.com"}')
echo "$LOGIN"
echo ""

TOKEN=$(echo "$LOGIN" | python3 -c "import sys,json; print(json.load(sys.stdin)['data']['session']['token'])" 2>/dev/null || echo "")

if [ -z "$TOKEN" ]; then
  echo "ERROR: Could not extract token from login response"
  exit 1
fi

# 3. GET /api/auth/me with token
echo "GET /api/auth/me (with Bearer token)"
ME=$(curl -sS "${API_URL}/api/auth/me" \
  -H "Authorization: Bearer ${TOKEN}")
echo "$ME"
echo ""

if ! echo "$ME" | grep -q '"success":true'; then
  echo "ERROR: /api/auth/me failed"
  exit 1
fi

# 4. Logout
echo "POST /api/auth/logout"
LOGOUT=$(curl -sS -X POST "${API_URL}/api/auth/logout" \
  -H "Authorization: Bearer ${TOKEN}")
echo "$LOGOUT"
echo ""

# 5. GET /api/auth/me after logout should fail
echo "GET /api/auth/me after logout (should fail)"
ME2=$(curl -sS "${API_URL}/api/auth/me" \
  -H "Authorization: Bearer ${TOKEN}")
echo "$ME2"
echo ""

if echo "$ME2" | grep -q '"success":true'; then
  echo "ERROR: /api/auth/me should fail after logout"
  exit 1
fi

echo "=== All auth smoke tests passed ==="
