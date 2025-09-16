import React from "react";
import Image from "next/image";
import NotificationCard from "./NotificationCard";
import FriendRequestCard from "./FriendRequestCard";

export default function NotificationList() {
  return (
    <div className="flex flex-col items-center w-full overflow-y-scroll overflow-x-hidden">
      <div className="w-full flex text-sm font-bold text-base-400/70">
        <div className="ml-4 mb-2 flex flex-row justify-between w-full">
          <div>Friend requests</div>
          <div className="text-base-300 tetx-sm mr-4 hover:underline underline-offset-2 cursor-pointer">
            view all
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-b-base-300/50 w-[90%]"></div>
      <FriendRequestCard />
      <div className="border-b-[1px] border-b-base-300/50 w-[90%]"></div>
      <FriendRequestCard />
      <div className="border-b-[1px] border-b-base-300/50 w-[90%]"></div>
      <div className="w-full flex text-sm font-bold text-base-400/70 mt-2">
        <div className="ml-4 mb-2">Others</div>
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
}
