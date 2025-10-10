"use server";

import { createClient } from "@/utils/supabase/server";
import { Profile } from "../types/profile";
import { fetchApi } from "./utils";

export async function updateUserProfile(
  userID: string,
  profile: Profile,
  profileFile?: File,
  backgroundFile?: File,
  resumeFile?: File
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

  // Upload resume file
  if (resumeFile) {
    const fileExt = resumeFile.name.split(".").pop();
    const fileName = `resume-${userID}-${Date.now()}.${fileExt}`;
    const filePath = `resumes/${fileName}`;

    const { error } = await supabase.storage
      .from("user-files")
      .upload(filePath, resumeFile, { upsert: true });
    if (error) return console.error("Resume upload error:", error);

    const { data } = supabase.storage.from("user-files").getPublicUrl(filePath);
    profile.resume = data.publicUrl;
  }

  return fetchApi(`/api/v1/profiles/${userID}`, {
    method: "PATCH",
    body: JSON.stringify(profile),
  });
}

export async function banUser(userID: string, duration_day?: number) {
  const ban_until = duration_day
    ? new Date(Date.now() + duration_day * 24 * 60 * 60 * 1000).toISOString()
    : null;

  console.log("ban user until:", ban_until);

  const res = fetchApi(`/api/v1/users/${userID}`, {
    method: "PATCH",
    body: JSON.stringify({ is_ban: true, ban_until: ban_until }),
  });
  console.log("ban user response:", res);
  return res;
}

// export async function updatePostReportStatus(id: number, status: string) {
//   return fetchApi(`/api/v1/postreports/${id}`, {
//     method: "PATCH",
//     body: JSON.stringify({ status }),
//   });
// }

export async function followUser(follower: string, follow_to: string) {
  return fetchApi(`/api/v1/userFollows`, {
    method: "POST",
    body: JSON.stringify({ user_id: follower, follow_to }),
  });
}

export async function unfollowUser(follower: string, follow_to: string) {
  return fetchApi(`/api/v1/userFollows/${follower}/${follow_to}`, {
    method: "DELETE",
  });
}

export async function getFollowers(userID: string) {
  const res = await fetchApi(`/api/v1/userFollows/followers/${userID}`, {
    method: "GET",
  });
  return res.userFollows;
}

export async function getFollowing(userID: string) {
  const res = await fetchApi(`/api/v1/userFollows/followings/${userID}`, {
    method: "GET",
  });
  return res.userFollows;
}

export async function timestampLastvisit(userID: string, roomId: string) {
  console.log("timestamp !!!");
  return await fetchApi(`/api/v1/lastvisit`, {
    method: "POST",
    body: JSON.stringify({
      user_id: userID,
      room_id: roomId,
    }),
  });
}
