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
  chatDisplays?: any[];
  setChatDisplays?: React.Dispatch<React.SetStateAction<any[]>>;
  chatInfo: Chatroom;
};

export default function ChatCard(chatList: ChatCardProps) {
  const { setSelectedChatroom } = useChatroom();
  const [chat, setChat] = useState<any>(chatList.chat);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const pathname = usePathname();
  const ischatPage = pathname.includes("/chat");

  const fetchChatHistory = async () => {
    const res = await getAllMessages(String(chatList.chatInfo.id));
    setMessages(res);
  };
  function formatDateToMonthDay(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
  const handleChatClick = () => {
    if (ischatPage) {
      console.log(chatList.chatInfo);
      console.log("click");
      setSelectedChatroom(chatList.chatInfo);
    }

    if (chatList.setChatDisplays && chatList.chatDisplays) {
      if (!chatList.chatDisplays.includes(chat)) {
        let newChatDisplays = [];
        // check that chatDisplays can contain only 3 Chat
        if (chatList.chatDisplays.length >= 3) {
          // remove last chat
          newChatDisplays = chatList.chatDisplays.slice(0, 2);
          // append chat to chatDisplays
          const savedChatDisplays = [...newChatDisplays, chat];
          chatList.setChatDisplays(savedChatDisplays);
        } else {
          // append chat to chatDisplays
          newChatDisplays = [...chatList.chatDisplays, chat];
          chatList.setChatDisplays(newChatDisplays);
        }
      } else {
        // remove chat from chatDisplays
        const newChatDisplays = chatList.chatDisplays.filter((c) => c !== chat);
        chatList.setChatDisplays(newChatDisplays);
      }
    }
  };

  useEffect(() => {
    setChat(chatList.chat);
  }, [chatList.chat]);

  return (
    <div
      className="flex flex-row w-full gap-4 px-2 pt-3 pb-2 pl-4 items-center hover:bg-black/5 cursor-pointer select-none"
      onClick={handleChatClick}
    >
      <Image
        src={"/golang.webp"}
        width={200}
        height={200}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-full h-12 w-12"
      />
      <div className="flex-1 flex flex-col mr-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2">
            <div className="font-bold text-sm tetx-base-400">
              {chatList.chatInfo?.roomName ?? "null"}
            </div>
          </div>
          <div className="text-base-400 text-sm mr-2">{"date 00"}</div>
        </div>
        <div className="text-base-400/70 text-sm mb-2 w-[82%]">
          {chatList.chatDisplays && chatList.chatDisplays[0]}
        </div>
      </div>
    </div>
  );
}
