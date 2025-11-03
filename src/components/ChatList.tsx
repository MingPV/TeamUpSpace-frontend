/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ChatCard from "./ChatCard";
import { useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import { useChatroom } from "@/context/ChatroomContext";
import { Chatroom } from "@/app/types/chatroom";
import ChatDisplayMini from "./ChatDisplayMini";
// I want to send a list of chat's useState to ChatCard

export default function ChatList({
  selectedTab,
  searchFriend,
}: {
  selectedTab: string;
  searchFriend: string;
}) {
  const [chatDisplays, setChatDisplays] = useState<Chatroom[]>([]);
  const { friendChatrooms, groups, strangerChatroom } = useChatroom();
  return (
    <>
      {chatDisplays.length > 0 && (
        <div className="fixed w-[70%] h-[48%] flex flex-row-reverse bottom-0 right-[25%] mr-5 gap-2">
          {chatDisplays.map((chatroom, index) => (
            <div
              key={index}
              className="w-1/3 bg-white dark:bg-base-400 h-full flex flex-col rounded-t-md shadow-md shadow-base-400/30 border-[1px] border-base-300/50"
            >
              <div className="w-full flex flex-row justify-between items-center py-2 px-3 border-b-[1px] border-b-base-300/30">
                <div className="flex flex-row gap-3 items-center cursor-pointer hover:bg-black/5 p-1 rounded-md">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-9 w-9"
                  />
                  <div className="font-bold text-sm text-base-400 dark:text-base-100">
                    {chatroom.roomName}
                  </div>
                </div>
                <div
                  className="p-1.5 cursor-pointer hover:bg-black/5 rounded-full"
                  onClick={() => {
                    // remove chat from chatDisplays
                    console.log("remove chatroom", chatroom);
                    const newChatDisplays = chatDisplays.filter(
                      (c) => c !== chatroom
                    );
                    setChatDisplays(newChatDisplays);
                  }}
                >
                  <RxCross2 className="text-xl" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3  px-2 dark:bg-base-400">
                <ChatDisplayMini chatroom={chatroom} />
                {/* <div className="w-full flex items-center justify-center text-xs text-base-300">
                  Aug 12
                </div>
                <div className="flex flex-row gap-2 items-end">
                  <div>
                    <Image
                      src={"/golang.webp"}
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-8 w-8 cursor-pointer hover:opacity-90"
                    />
                  </div>
                  <div className="text-base-400 flex flex-col">
                    <div className="text-xs ml-2 text-base-400 cursor-default">
                      MingPV
                    </div>
                    <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                      <div className="text-sm">Hi mingming</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-2 items-end">
                  <div className="text-base-400 flex flex-col">
                    <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                      <div className="text-sm">Hi mingming</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex flex-col overflow-y-scroll px-2">
        {selectedTab === "chat" &&
          strangerChatroom
            ?.filter((friend) => (friend.roomName ?? "").includes(searchFriend))
            .map((friend, index) => (
              <div key={index}>
                <ChatCard
                  chat={"chat1"}
                  chatDisplays={chatDisplays}
                  setChatDisplays={setChatDisplays}
                  chatInfo={friend}
                />
                <div className="border-b-[1px] border-b-base-300/50"></div>
              </div>
            ))}
      </div>
      <div className="w-full flex flex-col overflow-y-scroll px-2">
        {selectedTab === "friend" &&
          friendChatrooms
            ?.filter((friend) => (friend.roomName ?? "").includes(searchFriend))
            .map((friend, index) => (
              <div key={index}>
                <ChatCard
                  chat={friend.id}
                  chatDisplays={chatDisplays}
                  setChatDisplays={setChatDisplays}
                  chatInfo={friend}
                />
                <div className="border-b-[1px] border-b-base-300/50"></div>
              </div>
            ))}
      </div>
      <div className="w-full flex flex-col overflow-y-scroll px-2">
        {selectedTab === "group" &&
          groups
            ?.filter((group) => (group.roomName ?? "").includes(searchFriend))
            .map((group, index) => (
              <div key={index}>
                <ChatCard
                  chat={group.id}
                  chatDisplays={chatDisplays}
                  setChatDisplays={setChatDisplays}
                  chatInfo={group}
                />
                <div className="border-b-[1px] border-b-base-300/50"></div>
              </div>
            ))}
      </div>
    </>
  );
}
