export interface Profile {
  user_id?: string; // UUID as string
  display_name?: string;
  description?: string;
  age?: number;
  university?: string;
  major?: string;
  location?: string;
  year?: number;
  is_graduated?: boolean;
  profile_url?: string;
  background_url?: string;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
}

export interface ProfileCamelCase {
  userId?: string; // UUID as string
  displayName?: string;
  description?: string;
  age?: number;
  university?: string;
  major?: string;
  location?: string;
  year?: number;
  isGraduated?: boolean;
  profileUrl?: string;
  backgroundUrl?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
