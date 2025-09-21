"use client";

import ChatCard from "@/components/ChatCard";
import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import ChatDisplay from "@/components/ChatDisplay";

export default function FriendPage() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("chat");

  return (
    <>
      <div className="w-full h-screen">
        <div className="pt-20 pb-10 flex flex-row h-full">
          <div className="w-[32vw] ml-10 bg-white h-full rounded-lg shadow-md flex flex-col">
            <div className="flex flex-row justify-between items-center">
              <div className="text-2xl font-rollingStone text-base-400 ml-8 mt-6 cursor-default select-none">
                Friend & Group
              </div>
              <div className="flex flex-row gap-2 items-center pr-6">
                <div
                  className="py-1 px-2 border-[1px] border-base-300/30 rounded-md mt-6 bg-base-200 font-bold text-sm text-base-400 cursor-pointer hover:border-base-400/50 hover:text-amber-800 cursor select-none"
                  onClick={() => {
                    setIsAddFriendOpen(!isAddFriendOpen);
                    setIsCreateGroupOpen(false);
                  }}
                >
                  + Add friend
                </div>
                <div
                  className="flex flex-row items-center gap-1 py-1 px-2 border-[1px] border-base-300/30 rounded-md mt-6 bg-base-200/80 font-bold text-sm text-base-400 cursor-pointer hover:border-base-400/50 hover:text-amber-800 select-none"
                  onClick={() => {
                    setIsCreateGroupOpen(!isCreateGroupOpen);
                    setIsAddFriendOpen(false);
                  }}
                >
                  <FaUserFriends />
                  Create group
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              {/* <div className="mx-4 border-[1px] border-base-300/30 rounded-full flex flex-row">
              <input type="text" className="p-1 ring-0 focus:outline-0" />
            </div> */}
              <div className="flex flex-row bg-base-100/50 items-center rounded-md mx-4">
                <IoMdSearch className="text-base-400 ml-4 text-lg" />
                <input
                  type="text"
                  placeholder="Serach friends"
                  className="pl-2 ring-0 focus:outline-0 rounded-md p-1 py-2 flex-1"
                />
              </div>
              <div className="flex flex-row w-full border-b-[1px] border-b-base-300/30 mt-5">
                {/* <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-transparent cursor-pointer text-base-300 font-bold select-none">
                  Chat
                </div> */}
                {/* <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-lime-700 cursor-pointer text-lime-700 font-bold select-none">
                  Friend
                </div> */}
                {/* <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-transparent cursor-pointer text-base-300 font-bold select-none">
                  Group
                </div> */}
                <div
                  className={`flex-1 py-1 flex items-center justify-center border-b-2 ${
                    selectedTab == "chat"
                      ? "border-b-lime-700 text-lime-700"
                      : "text-base-300 border-b-transparent hover:text-base-400 hover:bg-black/5"
                  }  cursor-pointer font-bold select-none`}
                  onClick={() => setSelectedTab("chat")}
                >
                  Chat
                </div>
                <div
                  className={`flex-1 py-1 flex items-center justify-center border-b-2 ${
                    selectedTab == "friend"
                      ? "border-b-lime-700 text-lime-700"
                      : "text-base-300 border-b-transparent hover:text-base-400 hover:bg-black/5"
                  }  cursor-pointer font-bold select-none`}
                  onClick={() => setSelectedTab("friend")}
                >
                  Friend
                </div>
                <div
                  className={`flex-1 py-1 flex items-center justify-center border-b-2 ${
                    selectedTab == "group"
                      ? "border-b-lime-700 text-lime-700"
                      : "text-base-300 border-b-transparent hover:text-base-400 hover:bg-black/5"
                  }  cursor-pointer font-bold select-none`}
                  onClick={() => setSelectedTab("group")}
                >
                  Group
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col overflow-y-scroll px-2">
              <ChatCard
                chat={"chat1"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat2"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat3"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat4"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat5"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat6"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat7"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat8"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat9"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat10"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat11"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat12"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
              <ChatCard
                chat={"chat13"}
                chatDisplays={undefined}
                setChatDisplays={undefined}
              />
              <div className="border-b-[1px] border-b-base-300/50"></div>
            </div>
          </div>
          {isAddFriendOpen ? (
            <div className="w-[62vw] h-full ml-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2 p-8 bg-black/5 rounded-md mb-12">
                <div className="font-rollingStone text-xl text-amber-800/80 cursor-default select-none">
                  Find user by username & Add Friend
                </div>
                <div className="flex flex-row gap-4 ">
                  <input
                    className="p-2 pl-4 flex-1 border rounded-md border-base-300/50 focus:outline-amber-800 bg-white font-bold placeholder:font-medium"
                    placeholder="username"
                  />
                  <div className="font-bold px-3 py-2 rounded-md text-base-400 bg-base-200 transition-all duration-300 select-none cursor-pointer hover:bg-amber-800 hover:text-white">
                    Add
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {isCreateGroupOpen ? (
            <div className="w-[62vw] h-full ml-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
              <div className="flex flex-col gap-2 p-8 bg-black/5 rounded-md mb-12">
                <div className="font-rollingStone text-xl text-amber-800/80 cursor-default select-none">
                  Create a new group & Invite friends
                </div>
                <div className="flex flex-row gap-4 ">
                  <input
                    className="p-2 pl-4 flex-1 border rounded-md border-base-300/50 focus:outline-amber-800 bg-white font-bold placeholder:font-medium"
                    placeholder="group name"
                  />
                  <div className="font-bold px-3 py-2 rounded-md text-base-400 bg-base-200 transition-all duration-300 select-none cursor-pointer hover:bg-amber-800 hover:text-white">
                    Create
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div
            className={`${
              isAddFriendOpen || isCreateGroupOpen ? "hidden" : "block"
            } h-full`}
          >
            <ChatDisplay />
          </div>
        </div>
      </div>
    </>
  );
}
