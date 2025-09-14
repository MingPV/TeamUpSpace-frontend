import React from "react";
import { FaBookmark } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";

export default function LoadingHomeLeft() {
  return (
    <div className="w-full flex flex-col items-end gap-2">
      <div className="w-2/3 flex flex-col rounded-lg bg-white">
        <div className="flex flex-col gap-1 px-4 py-6">
          <div className="text-base-400 font-bold">Welcome to TeamUpSpace</div>
          <div className="text-base-300 text-sm">Your next team awaits.</div>
          <div className="my-1"></div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col rounded-lg bg-white">
        <div className="flex flex-col m-5 gap-5">
          <div className="flex gap-2 items-center">
            <FaBookmark />
            <div className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer">
              Saved Events
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <FaUserFriends />
            <div className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer">
              Friends
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <MdEmojiEvents />
            <div className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer">
              Events
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
