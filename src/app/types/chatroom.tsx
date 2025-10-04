import { Profile } from "./profile";

export interface Chatroom {
  id: string;
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
  profile: Profile;
}

export interface InviteTo {
  id: number; //room_member_id
  invitee: Profile;
}

export interface ChatroomInvite {
  id: string;
  room: Chatroom;
  sender: Profile;
  createdAt: string;
  members: Member[];
}
