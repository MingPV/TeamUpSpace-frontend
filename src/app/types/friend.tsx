import { Profile } from "./profile";
import { User } from "./user";

export interface Friend {
  id: string; //friend_id in db
  userInfo: User;
  roomId: string;
  mutualFriends: number;
}

export interface FriendRequest {
  id: string;
  friendId: string;
  friendUsername: string;
  mutualFriendCount?: number;
  createdAt?: string;
}
