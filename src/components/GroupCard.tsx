/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useChatroom } from "@/context/ChatroomContext";
import { Chatroom } from "@/app/types/chatroom";
import { getRoomMemberByRoomIdAndUserId } from "@/app/api/chatroom";
import { useUser } from "@/context/UserContext";
export default function GroupCard({ group }: { group: Chatroom }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setSelectedChatroom, groups, leaveGroup } = useChatroom();
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, [user]);

  const router = useRouter();

  const handleCardClick = () => {
    getChatroom();
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLeaveGroup = async () => {
    await leaveGroup(group.id);
  };

  const getChatroom = () => {
    const chatroom = groups.find((chatroom) => chatroom.id == group.id);
    setSelectedChatroom(chatroom ?? null);
    router.push(`/chat`);
  };

  const handleMenuSelect = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    console.log("action", action);
    console.log(group);
    if (action === "message") {
      getChatroom();
    } else if (action === "leaveGroup") {
      handleLeaveGroup();
      console.log("leave group");
    }
  };

  return (
    <>
      <div
        className="flex flex-row w-full gap-4 px-2 pt-3 pb-2 pl-4 items-center cursor-pointer select-none group hover:bg-black/5 relative"
        onClick={handleCardClick}
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
              <div className="font-bold tetx-base-400">{group.roomName}</div>
            </div>
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
              onClick={(e) => handleMenuSelect(e, "message")}
            >
              Message
            </div>
            <div
              className="py-3 text-red-600 hover:bg-black/5 cursor-pointer pointer-events-auto px-6"
              onClick={(e) => handleMenuSelect(e, "leaveGroup")}
            >
              Leave Group
            </div>
          </div>
        )}
      </div>
    </>
  );
}
