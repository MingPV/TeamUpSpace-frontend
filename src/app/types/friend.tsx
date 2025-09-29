export interface Friend {
  id: string; //friend_id in db
  friendId: string;
  username: string;
  displayName: string;
  profileUrl: string;
}

export interface FriendRequest {
  id: string;
  friendId: string;
  friendUsername: string;
  mutualFriendCount?: number;
  createdAt: string;
}
