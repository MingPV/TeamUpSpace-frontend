import React from "react";
import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";

export default function HomeLeft() {
  return (
    <div className="w-full flex flex-col items-end gap-2">
      <div className="w-2/3 flex flex-col rounded-lg bg-white">
        <Image
          src={"/golang.webp"}
          width={100}
          height={100}
          alt="profile-pic"
          style={{ objectFit: "cover" }}
          className="w-full h-18 rounded-t-lg"
        />
        <div className="flex flex-col mx-5 relative -top-8 gap-1">
          <Image
            src={"/golang.webp"}
            width={200}
            height={200}
            alt="profile-pic"
            style={{ objectFit: "cover" }}
            className="rounded-full h-[86px] w-[86px] border-3 border-white"
          />
          <div className="flex flex-col relative top-1 gap-1">
            <div className="text-xl font-bold">Pavee Jeungtanasirikul</div>
            <div className="text-sm">A Computer Engineering Student</div>
            <div className="text-sm text-base-400">Bangkok, Bangkok City</div>
            <div className="flex flex-row gap-1 items-center relative top-1">
              <Image
                src={"/golang.webp"}
                width={16}
                height={16}
                alt="profile-pic"
                style={{ objectFit: "cover" }}
                className="rounded-lg h-5 w-5 border-white"
              />
              <div className="font-bold text-sm">Chulalongkorn University</div>
            </div>
          </div>
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
