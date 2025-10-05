/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Friend } from "@/app/types/friend";
import { useState } from "react";
import { Chatroom } from "@/app/types/chatroom";
import { getAllMessages } from "@/app/api/chatroom";
import { ChatMessage } from "@/app/types/chatroom";
import { usePathname } from "next/navigation";
import { useChatroom } from "@/context/ChatroomContext";

type ChatCardProps = {
  chat?: any;
  chatDisplays?: Chatroom[];
  setChatDisplays?: React.Dispatch<React.SetStateAction<Chatroom[]>>;
  chatInfo: Chatroom;
};

export default function ChatCard(chatList: ChatCardProps) {
  const { setSelectedChatroom, selectedChatroom } = useChatroom();
  const [chat, setChat] = useState<any>(chatList.chat);
  const pathname = usePathname();
  const ischatPage = pathname.includes("/chat");

  function formatDate(dateString?: string): string {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    // Check if it's today
    const isToday =
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate();

    if (isToday) {
      // Return time in HH:MM format
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    // Return month + day
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  const handleChatClick = () => {
    if (ischatPage) {
      console.log(chatList.chatInfo);
      console.log("click");
      setSelectedChatroom(chatList.chatInfo);
    }

    if (chatList.setChatDisplays && chatList.chatDisplays) {
      console.log("here");
      if (!chatList.chatDisplays.includes(chatList.chatInfo)) {
        console.log("here2");
        let newChatDisplays: Chatroom[] = [];
        // check that chatDisplays can contain only 3 Chat
        if (chatList.chatDisplays.length >= 3) {
          // remove last chat
          console.log("here3");

          newChatDisplays = chatList.chatDisplays.slice(0, 2);
          // append chat to chatDisplays
          const savedChatDisplays = [...newChatDisplays, chatList.chatInfo];
          chatList.setChatDisplays(savedChatDisplays);
        } else {
          console.log("here4");

          // append chat to chatDisplays
          newChatDisplays = [...chatList.chatDisplays, chatList.chatInfo];
          console.log(newChatDisplays);
          chatList.setChatDisplays(newChatDisplays);
        }
      } else {
        console.log("here5");

        // remove chat from chatDisplays
        const newChatDisplays = chatList.chatDisplays.filter(
          (c) => c !== chatList.chatInfo
        );
        chatList.setChatDisplays(newChatDisplays);
      }
    }
  };

  useEffect(() => {
    setChat(chatList.chat);
  }, [chatList.chat]);

  return (
    <div
      className={`flex flex-row w-full gap-4 px-2 pt-3 pb-2 pl-4 items-center hover:bg-black/5 cursor-pointer select-none ${
        selectedChatroom?.id === chatList.chatInfo?.id && ischatPage
          ? "bg-base-200/50"
          : "bg-transparent"
      }`}
      onClick={handleChatClick}
    >
      <Image
        src={chatList.chatInfo.imageUrl ?? "/golang.webp"}
        width={200}
        height={200}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-full h-12 w-12"
      />
      <div className="flex-1 flex flex-col mr-2">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-0">
            <div className="font-bold text-sm text-base-400">
              {chatList.chatInfo?.roomName ?? "null"}
            </div>
            <div className="text-sm text-base-300 truncate w-48">
              {chatList.chatInfo?.latestMessage ?? ""}
            </div>
          </div>
          <div className="text-base-400 text-xs text-right">
            {formatDate(chatList.chatInfo.latestMessageTimestamp ?? "")}
          </div>
        </div>
      </div>
    </div>
  );
}
