#!/usr/bin/env bash
set -euo pipefail

TARGET="${1:-.}"
PACK_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Writing Computer-AI missing files into: $TARGET"

rsync -av   --exclude "WRITE_TO_REPO.sh"   --exclude "COMPUTER_AI_MISSING_FILES_PACK_2026.zip"   "$PACK_DIR"/ "$TARGET"/

echo "Done. Next commands:"
echo "cd $TARGET"
echo "pnpm install"
echo "pnpm --filter computer-iai-web build"
echo "pnpm --filter computer-iai-mobile exec tsc --noEmit"
echo "git status"
