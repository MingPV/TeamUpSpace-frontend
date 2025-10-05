"use server";

import { fetchApi } from "./utils";

export async function likePost(postId: number, userId: string) {
  return fetchApi(`/api/v1/postLikes`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId, post_id: postId }),
  });
}

export async function reportPost(
  post_id: number,
  reporter: string,
  report_to: string,
  detail: string
) {
  return fetchApi("/api/v1/postreports", {
    method: "POST",
    body: JSON.stringify({ post_id, reporter, report_to, detail }),
  });
}

export async function reportUser(
  reporter: string,
  report_to: string,
  detail: string
) {
  return fetchApi("/api/v1/userReports", {
    method: "POST",
    body: JSON.stringify({ reporter, report_to, detail }),
  });
}

export async function updatePostReportStatus(id: number, status: string) {
  return fetchApi(`/api/v1/postreports/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function updateUserReportStatus(id: number, status: string) {
  return fetchApi(`/api/v1/userReports/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function getAllPostReports() {
  const res = await fetchApi("/api/v1/postreports", {
    method: "GET",
  });
  return res.postReports;
}

export async function getAllUserReports() {
  const res = await fetchApi("/api/v1/userReports", {
    method: "GET",
  });
  console.log("res in getAllUserreports:", res);
  return res.userReports;
}
