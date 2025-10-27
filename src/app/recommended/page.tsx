"use client";

import React, { useEffect, useState } from "react";
import RecommendedFriendCard2 from "@/components/RecommendedFriendCard2";
import { RxCross2 } from "react-icons/rx";
import { Friend } from "../types/friend";
import { getRecommendedFriend } from "../api/friend";
import { useUser } from "@/context/UserContext";
export default function RecommendedPage() {
  const { user } = useUser();
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [recommended, setReccommended] = useState<Friend[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isClickAddFriend, setIsClickAddFriend] = useState<boolean>(false);

  const { recommemdFriends } = useUser();

  return (
    <>
      <div className="w-full h-screen">
        <div className="pt-20 pb-10 flex flex-row h-full">
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
                {recommemdFriends?.map((friend, index) => (
                  <div
                    key={index}
                    className="px-4 py-4 bg-black/5 rounded-md w-96"
                  >
                    <RecommendedFriendCard2 friend={friend} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
