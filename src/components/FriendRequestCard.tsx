import React from "react";
import Image from "next/image";

export default function FriendRequestCard() {
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
              <div className="font-bold">{"MingPV"}</div>
              <div>sent friend request.</div>
            </div>
            <div className="text-base-400 text-sm mr-2">3d</div>
          </div>
          <div className="text-base-400/70 text-sm mb-2">5 mutual friends</div>
          <div className="flex flex-row gap-4 w-full items-center justify-center">
            <div className="p-1.5 w-full bg-base-100 cursor-pointer hover:bg-base-200 rounded-md text-center font-bold text-base-400">
              Accept
            </div>
            <div className="p-1.5 w-full bg-base-100 cursor-pointer hover:bg-base-200 rounded-md text-center font-bold text-base-400">
              Deny
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
