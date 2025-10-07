"use server";

import { fetchApi } from "./utils";

export async function getAllNotifications(userID: string) {
  const res = await fetchApi(`/api/v1/notifications/user/${userID}`, {
    method: "GET",
  });
  return res.notifications;
}

export async function markNotificationAsRead(userID: string) {
  return fetchApi(`/api/v1/notifications/read/${userID}`, {
    method: "PATCH",
    body: JSON.stringify({}),
  });
}
