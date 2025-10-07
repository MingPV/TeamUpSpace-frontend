import { Profile } from "./profile";
import { User } from "./user";

export interface Notification {
  id: number;
  sendTo: string; // User ID of the notification recipient
  type: string; // Type of notification (e.g., "FriendRequest", "PostLikeCreated")
  message: string; // Notification message
  isRead: boolean; // Read status of the notification
  createdAt: string; // ISO date string for when the notification was created
  updatedAt: string; // ISO date string for when the notification was last updated
}
