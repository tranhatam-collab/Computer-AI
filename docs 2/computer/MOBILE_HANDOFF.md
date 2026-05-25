# MOBILE HANDOFF — computer.iai.one

## Status

Mobile is a starter command center, not a shipped app.

## Implemented

- Expo app under `apps/mobile`.
- API client at `apps/mobile/src/api/client.ts`.
- Task list screen.
- Task detail screen.
- Approvals screen.
- Results screen.
- Locale toggle and simple tab navigation.

## Verify

```bash
pnpm run typecheck:mobile
```

## Still missing

- Command creation screen.
- Auth/session handling.
- Push notifications.
- Offline cache.
- EAS/device build.
- Real production API URL configuration per environment.
