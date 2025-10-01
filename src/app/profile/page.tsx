/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PostBox from "@/components/PostBox";
import PostCreateBox from "@/components/PostCreateBox";
import { IoCaretDownSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ProfileTopMe from "@/components/ProfileTopMe";
import { useUser } from "@/context/UserContext";
import { Post } from "../types/post";
import { useState } from "react";

export default function Home() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  console.log(user);

  if (!user) {
    // router.push("/sign-in");
    return <div>loading</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full mt-20">
        <div className="w-[90vw] lg:w-[70vw]">
          <ProfileTopMe user={user} />
        </div>
        <div className="flex flex-col md:w-full lg:w-[55vw] px-8">
          <PostCreateBox user={user} setPosts={setPosts} />
          <div className="flex flex-row items-center my-2">
            <div className="flex-1 border-b border-base-300"></div>
            <div className="flex text-xs gap-1 pl-2 cursor-pointer">
              Sort by:{" "}
              <span className="font-bold flex items-center gap-1">
                Top <IoCaretDownSharp />
              </span>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="bg-white rounded-full font-bold text-base-400 px-2 py-1 text-sm">
              All
            </div>
            <div className="border-[1px] border-base-300 rounded-full px-2 py-1 text-sm font-bold text-base-400 cursor-pointer hover:bg-black/10">
              + Filter by
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <PostBox />
            <PostBox />
            <PostBox />
            <PostBox />
            <PostBox />
          </div>
        </div>
      </div>
    </>
  );
}
