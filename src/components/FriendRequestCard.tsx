import React from "react";
import Image from "next/image";
import { FriendRequest } from "@/app/types/friend";
import { useUser } from "@/context/UserContext";
import { acceptFriendRequest, deleteFriend } from "@/app/api/friend";
export default function FriendRequestCard({
  friendRequest,
}: {
  friendRequest: FriendRequest;
}) {
  const { acceptFriend, denyFriend } = useUser();
  const handleAcceptFriend = async () => {
    try {
      await acceptFriend(friendRequest.id);
    } catch (err) {
      console.error("Failed to accept friend:", err);
    }
  };

  const handleDenyFriend = async () => {
    try {
      await denyFriend(friendRequest.id);
    } catch (err) {
      console.error("Failed to delete friend:", err);
    }
  };
  return (
    <div className="w-full my-2 flex flex-col gap-2">
      <div className="flex flex-row w-full gap-4 mx-2 p-2 rounded-md items-center">
        <Image
          src={"/golang.webp"}
          width={200}
          height={200}
          alt="profile-pic"
          style={{ objectFit: "cover" }}
          className="rounded-full h-14 w-14"
        />
        <div className="flex-1 flex flex-col mr-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <div className="font-bold">{friendRequest?.friendUsername}</div>
              <div>sent friend request.</div>
            </div>
            <div className="text-base-400 text-sm mr-2">{}</div>
          </div>
          <div className="text-base-400/70 text-sm mb-2">
            {friendRequest?.mutualFriendCount} mutual friends
          </div>
          <div className="flex flex-row gap-4 w-full items-center justify-center">
            <button
              onClick={handleAcceptFriend}
              className="p-1.5 w-full bg-base-100 cursor-pointer hover:bg-base-200 rounded-md text-center font-bold text-base-400"
            >
              Accept
            </button>
            <button
              onClick={handleDenyFriend}
              className="p-1.5 w-full bg-base-100 cursor-pointer hover:bg-base-200 rounded-md text-center font-bold text-base-400"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
