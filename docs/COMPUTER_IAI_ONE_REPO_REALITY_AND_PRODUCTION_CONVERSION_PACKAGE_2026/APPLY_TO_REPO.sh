#!/usr/bin/env bash
set -euo pipefail

echo "Applying Computer.iai.one repo reality and production conversion package..."

mkdir -p docs/production-conversion
mkdir -p docs/computer

PKG_DIR="./COMPUTER_IAI_ONE_REPO_REALITY_AND_PRODUCTION_CONVERSION_PACKAGE_2026"
if [ -d "$PKG_DIR/docs/production-conversion" ]; then
  cp -R "$PKG_DIR/docs/production-conversion/"* docs/production-conversion/
fi
if [ -d "$PKG_DIR/docs/computer" ]; then
  cp -R "$PKG_DIR/docs/computer/"* docs/computer/
fi

echo "Done."
echo "No secrets were created."
echo "No deploy was run."
echo "No source code was deleted or moved."
echo "Next required report: REPO_REALITY_CONVERSION_APPLIED_REPORT.md"
