import React from "react";
import { Button, notification, Space } from "antd";
import { Notification } from "../Models/Notification";
export default function useNotify() {
  const [api, contextHolder] = notification.useNotification();
  return {
    sendNotif: (notification: Notification) => {
      api[notification.type]({
        message: notification.title,
        description: notification.description,
      });
    },
    contextHolder,
  };
}
