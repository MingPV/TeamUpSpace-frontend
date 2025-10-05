import { Profile } from "./profile";

export interface User {
  id: string; // UUID as string
  email: string;
  username: string;
  is_admin: boolean;
  is_ban: boolean;
  ban_until?: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  profile: Profile; // Optional Profile object
}

export interface UserFollow {
  userId: string;
  followTo: string;
  createdAt: string; // ISO date string
}
