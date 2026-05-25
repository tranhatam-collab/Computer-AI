# Mobile Production Readiness — Computer.iai.one

**Status:** PENDING — apps/mobile is an Expo starter shell. Not production-ready.

---

## Required for iOS/Android build

| Requirement | Status | Action |
|-------------|--------|--------|
| Expo account | ❌ EAS_ACCOUNT_PENDING | Create account at https://expo.dev |
| EAS CLI configured | ❌ | `npx eas-cli login && npx eas init` |
| app.json icon/splash | ⚠️ Placeholder 1×1 PNGs | Replace with real assets (1024×1024 icon, 1284×2778 splash) |
| Environment: API_BASE_URL | ❌ | Set `EXPO_PUBLIC_API_URL` for API target |
| TypeScript check | ✅ Passes | `pnpm exec tsc --noEmit` exit 0 |
| Mobile screens | ⚠️ 4 screens (TaskList, Detail, Approvals, Results) | Real API integration untested |

## EAS Build commands

```bash
# Login + init (one-time)
npx eas-cli login
npx eas init

# Build iOS (requires Apple Developer account)
npx eas build --platform ios

# Build Android (no account required)
npx eas build --platform android

# Submit to stores
npx eas submit --platform ios
npx eas submit --platform android
```

## Required env vars for mobile build

```
EXPO_PUBLIC_API_URL=https://computer-iai-one.pages.dev/api
```

## Current blockers

1. No Expo account logged in
2. No Apple Developer account for iOS
3. Placeholder assets (icon, splash, favicon)
4. API URL not configured
5. No device test performed

---

**Do not claim mobile production complete without EAS build artifact.**
