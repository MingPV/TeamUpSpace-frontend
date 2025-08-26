import React from "react";
import Image from "next/image";
import { BsChevronCompactRight } from "react-icons/bs";

export default function IncomingEventCard() {
  return (
    <div className="flex gap-4 hover:bg-black/10 cursor-pointer rounded-lg p-2 items-center md:min-w-[40vw] lg:min-w-0 lg:w-auto">
      <Image
        src={"/images/dental_1.png"}
        width={100}
        height={100}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-md h-12 w-12"
      />
      <div className="flex flex-1 flex-col">
        <div className="font-bold text-sm">Example Event Name</div>
        <div className="text-xs">Example event description</div>
        <div className="flex gap-1 mt-1">
          <div className="text-xs font-bold text-base-400">Closes in</div>
          <div className="text-xs font-bold text-lime-700">10 days</div>
        </div>
      </div>
      <BsChevronCompactRight />
    </div>
  );
}
