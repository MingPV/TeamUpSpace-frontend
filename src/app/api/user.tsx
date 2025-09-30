"use server";

import { createClient } from "@/utils/supabase/server";
import { Profile } from "../types/profile";
import { fetchApi } from "./utils";

const API_GATEWAY_URL =
  process.env.NEXT_PUBLIC_API_GATEWAY_URL || "http://localhost:8080"; // Set your URL

// checking username unique
export async function getUserByUsername(username: string) {
  return fetchApi(`/api/v1/users/username/${username}`);
}

// checking email unique
export async function getUserByEmail(email: string) {
  return fetchApi(`/api/v1/users/email/${email}`);
}

// login with google
export async function signInWithGoogle() {
  // Redirect to backend Google OAuth endpoint
  window.location.href = `${API_GATEWAY_URL}/api/v1/auth/google/login`;
}

export async function updateUserProfile(
  userID: string,
  profile: Profile,
  profileFile?: File,
  backgroundFile?: File
) {
  console.log("Updating profile for userID:", userID, profile);

  const supabase = await createClient();

  // Upload profile picture
  if (profileFile) {
    const fileExt = profileFile.name.split(".").pop();
    const fileName = `profile-${userID}-${Date.now()}.${fileExt}`;
    const filePath = `profiles/${fileName}`;

    const { error } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, profileFile, { upsert: true });
    if (error) return console.error("Profile upload error:", error);

    const { data } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(filePath);
    profile.profile_url = data.publicUrl;
  }

  // Upload background image
  if (backgroundFile) {
    const fileExt = backgroundFile.name.split(".").pop();
    const fileName = `background-${userID}-${Date.now()}.${fileExt}`;
    const filePath = `backgrounds/${fileName}`;

    const { error } = await supabase.storage
      .from("profile-pictures")
      .upload(filePath, backgroundFile, { upsert: true });
    if (error) return console.error("Background upload error:", error);

    const { data } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(filePath);
    profile.background_url = data.publicUrl;
  }

  return fetchApi(`/api/v1/profiles/${userID}`, {
    method: "PATCH",
    body: JSON.stringify(profile),
  });
}
