export type NotificationType = "success" | "info" | "warning" | "error";

export interface Notification {
  type: NotificationType;
  title: string;
  description: string;
}
