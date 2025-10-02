"use server";

import { createClient } from "@/utils/supabase/server";
import { Profile } from "../types/profile";
import { fetchApi } from "./utils";

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
