import React from "react";
import { BsFillInfoSquareFill } from "react-icons/bs";
import RecommendedFriendCard from "./RecommendedFriendCard";
import { FaRightLong } from "react-icons/fa6";
import IncomingEventCard from "./IncomingEventCard";

export default function HomeRight() {
  return (
    <div className="w-full flex flex-col gap-2 md:mb-4 md:mt-2 lg:mb-0">
      <div className="hidden lg:flex w-4/5 flex-col rounded-lg bg-white">
        <div className="flex flex-col mx-5 my-3 gap-5">
          <div className="flex justify-between items-center">
            <div className="font-bold">Recommended for you</div>
            <BsFillInfoSquareFill className="text-xs" />
          </div>
          <RecommendedFriendCard />
          <RecommendedFriendCard />
          <div className="my-1 flex gap-2 items-center cursor-pointer py-1 px-2 hover:bg-black/10 rounded-lg w-fit transition-all duration-300">
            <div className="text-sm text-base-400 font-bold">
              View all recommendations
            </div>
            <FaRightLong />
          </div>
        </div>
      </div>
      <div className="md:w-full lg:w-4/5 flex flex-col rounded-lg bg-white sticky top-20 overflow-hidden">
        <div className="flex flex-col mx-5 my-3 gap-2">
          <div className="flex justify-between items-center">
            <div className="font-bold">Incoming Events</div>
            <BsFillInfoSquareFill className="text-xs" />
          </div>
          <div className="flex md:flex-row lg:flex-col md:border-t-1 md:border-b-1 md:py-2 lg:py-0 border-base-200 lg:border-none gap-2 md:overflow-x-scroll lg:overflow-visible">
            <IncomingEventCard />
            <IncomingEventCard />
            <IncomingEventCard />
            <IncomingEventCard />
            <IncomingEventCard />
            {/* <div className="gap-2 md:flex-row lg:flex-col hidden lg:flex"> */}
            <IncomingEventCard />
            <IncomingEventCard />
            {/* </div> */}
          </div>

          <div className="my-1 flex gap-2 items-center cursor-pointer py-1 px-2 hover:bg-black/10 rounded-lg w-fit transition-all duration-300">
            <div className="text-sm text-base-400 font-bold">View all</div>
            <FaRightLong />
          </div>
        </div>
      </div>
    </div>
  );
}
