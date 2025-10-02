/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PostBox from "@/components/PostBox";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileTop from "@/components/ProfileTop";
import { getUserByUsername } from "@/app/api/auth";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
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
      } catch (error) {
        router.push("/not-found");
      } finally {
        setIsLoading(false);
      }
    };
    loadUserByUsername();
  }, [router]);

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
          <ProfileTop user={user} />
        </div>
        <div className="flex flex-col md:w-full lg:w-[55vw] px-8">
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
