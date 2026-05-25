# GIT COMMANDS TO APPLY GLOBAL INFRASTRUCTURE PLAN

Chạy trong repo local:

```bash
cd /Users/tranhatam/Documents/Devnewproject/Computer-AI
# hoặc đúng thư mục repo đang dùng cho Computer.iai.one

git checkout main
git pull origin main
git checkout -b docs/global-infrastructure-security-plan

mkdir -p docs/infrastructure docs/computer patches checklists
```

Copy bộ file vào repo, sau đó thay README và pnpm-workspace nếu chốt:

```bash
cp patches/README_REPLACEMENT.md README.md
cp patches/PNPM_WORKSPACE_REPLACEMENT.yaml pnpm-workspace.yaml
```

Kiểm tra:

```bash
pnpm install
pnpm run verify
git status --short
```

Commit:

```bash
git add README.md pnpm-workspace.yaml docs/ patches/ checklists/
git commit -m "docs: add global infrastructure and zero-trust security plan"
git push origin docs/global-infrastructure-security-plan
```

Mở PR vào `main`.

Không báo production-ready. Chỉ báo:

```text
GLOBAL INFRASTRUCTURE ARCHITECTURE READY
SECURITY MODEL DEFINED
NOT PRODUCTION-READY UNTIL VERIFIED
```
