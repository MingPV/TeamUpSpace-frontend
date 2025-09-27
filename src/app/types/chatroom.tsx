export interface Chatroom {
  roomId: number;
  roomName: string;
  isGroup?: boolean;
  owner?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export interface Member {
  id: number; //room_member_id
  userId: string;
  username: string;
  displayName: string;
  profileUrl: string;
}

export interface InviteTo {
  id: number; //room_member_id
  inviteToId: string;
  username: string;
  displayName: string;
  profileUrl: string;
}
