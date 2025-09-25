/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useRouter } from "next/navigation";

type FriendCardProps = {
  displayName?: string;
  username?: string;
  mutualFriends?: number;
  profilePicUrl?: string;
};

export default function FriendCard(data: FriendCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleChatClick = () => {
    router.push(`/profile/${data.username}`);
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuSelect = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    console.log("action", action);
    console.log(data);
    if (action === "viewProfile") {
      router.push(`/profile/${data.username}`);
    } else if (action === "message") {
      router.push(`/chat`);
    } else if (action === "removeFriend") {
      console.log("Remove friend");
    }
  };

  return (
    <>
      <div
        className="flex flex-row w-full gap-4 px-2 pt-3 pb-2 pl-4 items-center cursor-pointer select-none group hover:bg-black/5 relative"
        onClick={handleChatClick}
      >
        <Image
          src={"/golang.webp"}
          width={200}
          height={200}
          alt="profile-pic"
          style={{ objectFit: "cover" }}
          className="rounded-full h-16 w-16"
        />
        <div className="flex flex-col justify-center">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <div className="font-bold tetx-base-400">{"MingPV"}</div>
            </div>
          </div>
          <div className="text-base-400/70 text-sm mb-2">
            {12} mutual friends
          </div>
        </div>

        {/* This ignores parent hover */}
        <div className="flex-1 justify-end items-center flex pointer-events-none">
          <div
            className="p-2 rounded-full cursor-pointer pointer-events-auto hover:bg-black/5"
            onClick={handleMenuClick}
          >
            <HiOutlineDotsHorizontal />
          </div>
        </div>
        {isMenuOpen && (
          <div className="absolute right-8 top-2/3 bg-white rounded-md rounded-tr-none border border-base-300/60 shadow-xl z-50 flex flex-col pointer-events-none">
            <div
              className="py-3 hover:bg-black/5 cursor-pointer pointer-events-auto px-6"
              onClick={(e) => handleMenuSelect(e, "viewProfile")}
            >
              View Profile
            </div>
            <div
              className="py-3 hover:bg-black/5 cursor-pointer pointer-events-auto px-6"
              onClick={(e) => handleMenuSelect(e, "message")}
            >
              Message
            </div>
            <div
              className="py-3 text-red-600 hover:bg-black/5 cursor-pointer pointer-events-auto px-6"
              onClick={(e) => handleMenuSelect(e, "removeFriend")}
            >
              Remove Friend
            </div>
          </div>
        )}
      </div>
    </>
  );
}
