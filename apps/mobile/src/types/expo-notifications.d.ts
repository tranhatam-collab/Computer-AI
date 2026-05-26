declare module "expo-notifications" {
  export interface Notification {
    request: {
      content: {
        title?: string;
        body?: string;
        data?: Record<string, any>;
      };
      identifier: string;
    };
    date: number;
  }

  export interface NotificationResponse {
    notification: Notification;
    actionIdentifier: string;
  }

  export function getPermissionsAsync(): Promise<{ status: "granted" | "denied" | "undetermined" }>;
  export function requestPermissionsAsync(): Promise<{ status: "granted" | "denied" | "undetermined" }>;
  export function getExpoPushTokenAsync(): Promise<{ data: string }>;

  export function addNotificationReceivedListener(
    callback: (notification: Notification) => void
  ): { remove: () => void };

  export function addNotificationResponseReceivedListener(
    callback: (response: NotificationResponse) => void
  ): { remove: () => void };
}
