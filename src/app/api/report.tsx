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

export async function updatePostReportStatus(id: number, status: string) {
  return fetchApi(`/api/v1/postreports/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
