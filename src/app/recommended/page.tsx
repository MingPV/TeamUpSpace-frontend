"use client";

import React, { useState } from "react";
import RecommendedFriendCard2 from "@/components/RecommendedFriendCard2";
import { RxCross2 } from "react-icons/rx";

export default function RecommendedPage() {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  return (
    <>
      <div className="w-full h-screen">
        <div className="pt-20 pb-10 flex flex-row h-full">
          {isAddFriendOpen ? (
            <div className="w-[62vw] h-full ml-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center relative">
              <div
                className="absolute flex flex-row gap-2 items-center right-6 top-6 font-bold px-3 py-2 rounded-md text-base-400 bg-base-200 transition-all duration-300 select-none cursor-pointer hover:bg-amber-800 hover:text-white"
                onClick={() => {
                  setIsAddFriendOpen(false);
                  setIsCreateGroupOpen(false);
                }}
              >
                <RxCross2 className="text-2xl" />
                Exit Add Friend
              </div>
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
            <div className="w-[62vw] h-full ml-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center relative">
              <div
                className="absolute flex flex-row gap-2 items-center right-6 top-6 font-bold px-3 py-2 rounded-md text-base-400 bg-base-200 transition-all duration-300 select-none cursor-pointer hover:bg-amber-800 hover:text-white"
                onClick={() => {
                  setIsAddFriendOpen(false);
                  setIsCreateGroupOpen(false);
                }}
              >
                <RxCross2 className="text-2xl" />
                Exit Create Group
              </div>
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
            className={`flex flex-row flex-1 bg-white mx-4 rounded-lg shadow-md ${
              isAddFriendOpen || isCreateGroupOpen ? "hidden" : "block"
            }`}
          >
            <div className="flex-1 flex flex-col items-center gap-4">
              <div className="mt-6 font-rollingStone text-xl text-amber-900">
                Recommended Friends
              </div>
              <div className="flex flex-row justify-center gap-4 overflow-y-scroll w-full items-center flex-wrap pb-12">
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
                <div className="px-4 py-4 bg-black/5 rounded-md w-96">
                  <RecommendedFriendCard2 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
