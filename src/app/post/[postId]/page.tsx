"use client";

// this is /post/[postId]/page.tsx
import PostBox from "@/components/PostBox";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Post } from "@/app/types/post";
import { useState, useEffect, use } from "react";
import { fetchPostByID } from "@/app/api/post";

type Props = {
  params: Promise<{ postId: string }>;
};

export default function PostPage({ params }: Props) {
  const resolvedParams = use(params);
  const post_id = resolvedParams.postId;

  const [postId, setPostId] = useState(post_id ?? "");
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    // Fetch the post by ID when the component mounts
    const loadPost = async (postId: string) => {
      const res = await fetchPostByID(postId);
      setPost(res);
    };
    loadPost(postId);
  }, [postId]);

  if (!post) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-base-400 font-bold">
        Loading . . .
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center w-full mt-20">
        <div className="w-[90vw] lg:w-[45vw]">
          <PostBox post={post} />
        </div>
      </div>
    </>
  );
}
