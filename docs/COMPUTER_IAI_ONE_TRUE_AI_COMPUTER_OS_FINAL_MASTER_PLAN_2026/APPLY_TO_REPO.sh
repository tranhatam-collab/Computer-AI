#!/usr/bin/env bash
set -euo pipefail

echo "Applying Computer.iai.one TRUE AI COMPUTER OS Final Master Plan..."

mkdir -p docs/true-ai-computer-os
mkdir -p docs/model-mesh
mkdir -p docs/tool-kernel
mkdir -p docs/super-apps
mkdir -p docs/error-recovery
mkdir -p docs/market-analysis
mkdir -p docs/production-gates

PACKAGE_DIR="./COMPUTER_IAI_ONE_TRUE_AI_COMPUTER_OS_FINAL_MASTER_PLAN_2026"

if [ -d "$PACKAGE_DIR/docs" ]; then
  cp -R "$PACKAGE_DIR/docs/"* docs/
fi

if [ -f "$PACKAGE_DIR/README_PATCH_TRUE_AI_COMPUTER.md" ]; then
  cp "$PACKAGE_DIR/README_PATCH_TRUE_AI_COMPUTER.md" ./README_PATCH_TRUE_AI_COMPUTER.md
fi

if [ -f "$PACKAGE_DIR/TEAM_COMMAND.md" ]; then
  cp "$PACKAGE_DIR/TEAM_COMMAND.md" ./TEAM_COMMAND.md
fi

echo "Applied docs only."
echo "No code was deleted."
echo "No deploy was run."
echo "No secrets were touched."
echo "No payment configuration was changed."
echo "Final allowed status:"
echo "TRUE AI COMPUTER OS MASTER PLAN APPLIED"
echo "AI COMPUTER INSTANCE ARCHITECTURE LOCKED"
echo "MODEL MESH AND TOOL KERNEL DEFINED"
echo "PRODUCTION GATES DEFINED"
echo "NOT PRODUCTION-READY"
