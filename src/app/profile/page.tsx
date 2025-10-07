/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PostBox from "@/components/PostBox";
import PostCreateBox from "@/components/PostCreateBox";
import { IoCaretDownSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ProfileTopMe from "@/components/ProfileTopMe";
import { useUser } from "@/context/UserContext";
import { Post } from "../types/post";
import { useEffect, useState } from "react";
import { fetchAllPostsByUserID } from "../api/post";
import { User } from "../types/user";

export default function Home() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  console.log(user);

  useEffect(() => {
    const loadPosts = async () => {
      if (!user) return;
      if (user) {
        const res = await fetchAllPostsByUserID(user.id);
        setPosts(res);
      }
    };
    loadPosts();
  }, [user]);

  if (!user) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full mt-20">
        <div className="w-[90vw] lg:w-[70vw]">
          <ProfileTopMe user={user} postCount={posts.length} />
        </div>
        <div className="flex flex-col md:w-full lg:w-[55vw] px-8">
          <PostCreateBox user={user} setPosts={setPosts} />
          <div className="flex-1 border-b border-base-300 my-4"></div>

          <div className="flex flex-col gap-2">
            {posts.length === 0 && (
              <div className="w-full h-24 flex justify-center items-center text-base-400 font-bold">
                No posts yet
              </div>
            )}
            {posts.map((post) => (
              <PostBox key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
