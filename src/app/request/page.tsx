import React from "react";
import { MdLocalPostOffice } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import Image from "next/image";
import RequestCard from "@/components/RequestCard";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="mt-20 ml-10 bg-white w-[70vw] h-[80vh] rounded-lg flex flex-col shadow-md">
        <div className="w-full text-2xl ml-10 mt-6 font-rollingStone text-base-400 flex flex-row items-center gap-2">
          <MdLocalPostOffice className="mb-1" />
          Team Requests ( 4 )
        </div>

        <div className="px-4 mt-6 h-full pb-4">
          <div className="w-full flex flex-col gap-3 py-3 bg-black/5 px-4 h-full">
            <div className="w-full grid grid-flow-row grid-cols-4 text-amber-800/80 font-rollingStone">
              <div className="w-full flex justify-center pr-4">Name</div>
              <div className="w-full flex justify-center">Event</div>
              <div className="w-full flex justify-center">Requested (ago)</div>
              <div className="w-full flex justify-center">Status</div>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <RequestCard />
              <RequestCard />
              {/* Change these below card to Request card and pass status */}
              <div className="w-full grid grid-flow-row grid-cols-4 rounded-md">
                <div className="col-span-3 grid grid-flow-row grid-cols-3 rounded-md bg-white hover:border-base-300 border-[1px] border-base-300/30 cursor-pointer transition-all duration-300">
                  <div className="w-full flex flex-row items-center pl-8 gap-4 py-2 rounded-l-md text-base-400/80 font-bold">
                    <Image
                      src={"/golang.webp"}
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                    />
                    MingPV
                  </div>
                  <div className="w-full flex justify-center items-center py-2 text-base-400/80 font-bold">
                    EventA
                  </div>
                  <div className="w-full flex justify-center items-center py-2 rounded-r-md text-base-400/80 font-bold">
                    3 days
                  </div>
                </div>
                <div className="w-full flex justify-center h-full items-center">
                  <div className="px-7 py-2 rounded-md text-lime-600 border border-lime-600 font-bold cursor-default">
                    ACCEPTED
                  </div>
                </div>
              </div>
              <div className="w-full grid grid-flow-row grid-cols-4 rounded-md">
                <div className="col-span-3 grid grid-flow-row grid-cols-3 rounded-md bg-white hover:border-base-300 border-[1px] border-base-300/30 cursor-pointer transition-all duration-300">
                  <div className="w-full flex flex-row items-center pl-8 gap-4 py-2 rounded-l-md text-base-400/80 font-bold">
                    <Image
                      src={"/golang.webp"}
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                    />
                    MingPV
                  </div>
                  <div className="w-full flex justify-center items-center py-2 text-base-400/80 font-bold">
                    EventA
                  </div>
                  <div className="w-full flex justify-center items-center py-2 rounded-r-md text-base-400/80 font-bold">
                    3 days
                  </div>
                </div>
                <div className="w-full flex justify-center h-full items-center">
                  <div className="px-10 py-2 rounded-md text-red-600/80 border border-red-600/80 font-bold cursor-default">
                    DENIED
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center font-bold text-base-400/80">
              <div className="font-bold text-sm">1/5</div>
              <div className="w-full flex flex-row justify-center items-center gap-1">
                <div className="p-2 cursor-pointer hover:bg-black/10 rounded-md flex gap-1 items-center">
                  <MdNavigateBefore className="text-xl" />
                  <div>Prev</div>
                </div>
                <div className="p-2 cursor-pointer hover:bg-black/10 rounded-md flex gap-1 items-center">
                  <div>Next</div>
                  <MdNavigateNext className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
