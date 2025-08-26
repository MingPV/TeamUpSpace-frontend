"use client";
import React from "react";
import Image from "next/image";

export default function PostCreateBox() {
  return (
    <div className="bg-white p-4 flex flex-col w-full rounded-lg">
      <div className="flex gap-4">
        <Image
          src={"/golang.webp"}
          width={100}
          height={100}
          alt="profile-pic"
          style={{ objectFit: "cover" }}
          className="rounded-full h-14 w-14"
        />
        <div className="border border-base-300 text-base-400 hover:bg-base-100 cursor-pointer text-sm font-bold rounded-full flex items-center pl-6 flex-1">
          Start a post
        </div>
      </div>
      <div className="text-xs text-base-400 mt-2">
        {`Tip: Don't forget to put event tags on your post to make it easier for others at the event to find
        you.`}
      </div>
    </div>
  );
}
