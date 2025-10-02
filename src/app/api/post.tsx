"use server";

import { createClient } from "@/utils/supabase/server";
import { fetchApi } from "./utils";

export async function fetchAllPosts() {
  const res = await fetchApi(`/api/v1/posts`);
  return res.posts;
}

export async function fetchPostByID(postID: string) {
  const res = await fetchApi(`/api/v1/posts/${postID}`);
  return res.post;
}

export async function createPost(
  postBy: string,
  detail: string,
  imageFile?: File,
  imageUrl = "",
  eventId?: number
) {
  const supabase = await createClient();

  if (imageFile) {
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `post-${postBy}-${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, imageFile, { upsert: true });

    if (error) {
      console.error("Post image upload error:", error);
      return;
    }

    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    imageUrl = data.publicUrl;
  }

  return fetchApi("/api/v1/posts", {
    method: "POST",
    body: JSON.stringify({
      post_by: postBy,
      detail: detail,
      image_url: imageUrl,
      event_id: eventId,
    }),
  });
}

export async function deletePost(postId: number) {
  const res = await fetchApi(`/api/v1/posts/${postId}`);
  return res;
}

export async function fetchAllComments(postId: number) {
  const res = await fetchApi(`/api/v1/comments/post/${postId}`);
  return res.comments;
}

export async function fetchCommentByParentId(parentId: number) {
  const res = await fetchApi(`/api/v1/comments/parent/${parentId}`);
  return res.comments;
}

export async function createComment(
  postId: number,
  commentBy: string,
  detail: string,
  parentId = 0
) {
  return fetchApi("/api/v1/comments", {
    method: "POST",
    body: JSON.stringify({
      post_id: postId,
      comment_by: commentBy,
      detail: detail,
      parent_id: parentId,
    }),
  });
}

export async function likePost(postId: number, userId: string) {
  return fetchApi(`/api/v1/postLikes`, {
    method: "POST",
    body: JSON.stringify({ user_id: userId, post_id: postId }),
  });
}

export async function unLikePost(postId: number, userId: string) {
  return fetchApi(`/api/v1/postLikes/${postId}/${userId}`, {
    method: "DELETE",
  });
}

export async function getLikeByPostId(postId: number) {
  return fetchApi(`/api/v1/postLikes/post/${postId}`, {
    method: "GET",
  });
}

export async function getLikeByUserId(userId: string) {
  return fetchApi(`/api/v1/postLikes/user/${userId}`, {
    method: "GET",
  });
}

export async function createQuestion(post_id: number, question: string) {
  return fetchApi("/api/v1/questions", {
    method: "POST",
    body: JSON.stringify({
      post_id: post_id,
      question: question,
    }),
  });
}

export async function fetchQuestionByPostId(postId: number) {
  const res = await fetchApi(`/api/v1/questions/post/${postId}`);
  return res.questions;
}

export async function createAnswer(
  post_id: number,
  user_id: string,
  question: string,
  answer: string
) {
  return fetchApi("/api/v1/answers", {
    method: "POST",
    body: JSON.stringify({
      post_id: post_id,
      user_id: user_id,
      question: question,
      answer: answer,
    }),
  });
}

export async function fetchAnswerByPostIdUserId(
  postId: number,
  userId: string
) {
  const res = await fetchApi(`/api/v1/answers/post/user/${postId}/${userId}`);
  return res.answers[0];
}

export async function fetchAnswerByPostId(postId: number) {
  const res = await fetchApi(`/api/v1/answers/post/${postId}`);
  return res.answers;
}

export async function fetchAnswerByUserId(userId: string) {
  const res = await fetchApi(`/api/v1/answers/user/${userId}`);
  return res.answers;
}
