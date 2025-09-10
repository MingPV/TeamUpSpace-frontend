/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import HomeLeft from "@/components/HomeLeft";
import HomeRight from "@/components/HomeRight";
import Navbar from "@/components/Navbar";
import PostBox from "@/components/PostBox";
import PostCreateBox from "@/components/PostCreateBox";
import { IoCaretDownSharp } from "react-icons/io5";
import { fetchUserInfo } from "../../api/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProfileTop from "@/components/ProfileTop";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const response = await fetchUserInfo();
        if (response && response.ok) {
          const userInfo = await response.json();
          setUser(userInfo);
          console.log(userInfo);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

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
      <Navbar user={user} />
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
