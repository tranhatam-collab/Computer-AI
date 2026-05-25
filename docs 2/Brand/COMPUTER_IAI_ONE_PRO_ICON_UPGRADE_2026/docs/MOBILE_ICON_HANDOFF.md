# Mobile Developer Handoff

## Copy into repo

Recommended destination:

```text
apps/mobile/assets/brand/
```

Copy these folders:

```text
svg/
png/
ios/
android/
```

## Expo quick mapping

```text
icon: assets/brand/png/app-icons/app-icon-1024.png
adaptive foreground: assets/brand/png/adaptive/adaptive-foreground-1024.png
favicon: assets/brand/png/favicons/computer-iai-one-pro-symbol-32.png
```

## iOS native

Use:

```text
ios/AppIcon.appiconset/
```

## Android native

Use:

```text
android/mipmap-mdpi/
android/mipmap-hdpi/
android/mipmap-xhdpi/
android/mipmap-xxhdpi/
android/mipmap-xxxhdpi/
```

## QA checklist

- Icon readable at 16px
- Icon recognizable at 32px
- App Store icon has no transparent background
- Android adaptive foreground uses transparent PNG
- Monochrome icon available for Android themed icons
- No text inside the icon
- Symbol does not depend on tiny details
