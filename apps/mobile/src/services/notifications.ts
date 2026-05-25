/**
 * Expo push notification service stub.
 *
 * To activate: run `npx expo install expo-notifications`
 * Then replace this file with real implementation.
 */

export async function registerForPushNotificationsAsync(): Promise<string | null> {
  console.warn("[notifications] Stub — install expo-notifications to enable");
  return null;
}

export function addNotificationReceivedListener(
  _callback: (notification: { request: { content: { body?: string; title?: string } } }) => void
): (() => void) | null {
  return null;
}

export function addNotificationResponseReceivedListener(
  _callback: (response: { notification: { request: { content: { body?: string; title?: string } } } }) => void
): (() => void) | null {
  return null;
}
