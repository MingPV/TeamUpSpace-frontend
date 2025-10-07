/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PostBox from "@/components/PostBox";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileTop from "@/components/ProfileTop";
import { getUserByUsername } from "@/app/api/auth";
import { fetchAllPostsByUserID } from "@/app/api/post";
import { Post } from "@/app/types/post";
import { User } from "@/app/types/user";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const router = useRouter();

  useEffect(() => {
    const loadPosts = async (userId: string) => {
      const res = await fetchAllPostsByUserID(userId);
      setPosts(res);
    };
    const loadUserByUsername = async () => {
      const username = window.location.pathname.split("/").pop();
      if (!username) {
        router.push("/profile");
        return;
      }
      try {
        const response = await getUserByUsername(username);
        setUser(response);
        if (response.error) {
          router.push("/not-found");
        }
        loadPosts(response.id);
      } catch (error) {
        router.push("/not-found");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserByUsername();
  }, []);

  // useEffect(() => {
  //   const loadPosts = async () => {
  //     if (!user) return;
  //     if (user) {
  //       const res = await fetchAllPostsByUserID((user as User).id);
  //       setPosts(res);
  //     }
  //   };
  //   loadPosts();
  // }, []);

  if (isLoading) {
    return (
      <>
        <div className="w-screen h-screen flex justify-center items-center text-base-400 font-bold">
          Loading . . .
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center w-full mt-20">
        <div className="w-[90vw] lg:w-[70vw]">
          <ProfileTop user={user} postCount={posts.length} />
        </div>
        <div className="flex flex-col md:w-full lg:w-[55vw] px-8">
          <div className="flex flex-col gap-2">
            {posts.map((post) => (
              <PostBox key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
              <div className="w-full h-32 flex justify-center items-center text-base-400 font-bold">
                No posts yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
