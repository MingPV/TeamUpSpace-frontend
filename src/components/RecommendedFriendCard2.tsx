import React, { useEffect } from "react";
import Image from "next/image";
import { Friend } from "@/app/types/friend";
import { addFriend } from "@/app/api/friend";
import { useUser } from "@/context/UserContext";

export default function RecommendedFriendCard2({ friend }: { friend: Friend }) {
  const { user, addFriendFromRecommend } = useUser();

  const handleClickAddFriend = async () => {
    if (user) {
      await addFriendFromRecommend(friend.userInfo.username);
      console.log("here");
    }
  };
  return (
    <div className="flex gap-4">
      <Image
        src={"/golang.webp"}
        width={100}
        height={100}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-full h-14 w-14 hover:opacity-80 cursor-pointer"
      />
      <div className="flex flex-1 flex-col">
        <div className="font-bold hover:underline underline-offset-2 cursor-pointer">
          {friend.userInfo.profile.display_name}
        </div>
        <div className="text-xs">{friend.userInfo.profile.university}</div>
        <div className="text-xs text-base-400/50">
          {friend.mutualFriends} mutual friend(s)
        </div>
        <div className="flex flex-row gap-2">
          <div className="px-4 py-1 border border-base-300 rounded-full w-fit h-fit mt-2  cursor-pointer hover:bg-black/10 hover:border-base-400">
            <div className="flex flex-row gap-2 justify-center items-center font-bold text-base-400">
              <div>+</div>
              <div>Follow</div>
            </div>
          </div>
          <div className="px-4 py-1 rounded-full w-fit h-fit mt-2  cursor-pointer bg-base-200 hover:bg-base-300">
            <div className="flex flex-row gap-2 justify-center items-center font-bold text-base-400">
              <button onClick={handleClickAddFriend}>Add Friend</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
