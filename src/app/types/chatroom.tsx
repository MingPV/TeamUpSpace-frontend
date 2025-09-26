export interface Chatroom {
  roomId: number;
  roomName: string;
  isGroup?: boolean;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}
