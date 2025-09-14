import { Profile } from "./profile";

export interface User {
  id: string; // UUID as string
  email: string;
  username: string;
  isAdmin: boolean;
  isBan: boolean;
  banUntil?: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  profile: Profile; // Optional Profile object
}
