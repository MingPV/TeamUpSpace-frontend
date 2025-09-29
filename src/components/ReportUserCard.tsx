"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { IoMdDownload } from "react-icons/io";

export default function ReportUserCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [questionMenuOpen, setQuestionMenuOpen] = useState(false);
  const [questionSelected, setQuestionSelected] = useState<string | null>(null);
  const [isBanned, setIsBanned] = useState(false);

  const questions = [
    { value: "question1", label: "🎉 Question 1" },
    { value: "question2", label: "🚀 Question 2" },
    { value: "question3", label: "🌟 Question 3" },
  ];

  return (
    <>
      {isOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bg-white h-[80vh] w-[60vw] top-[10vh] left-[20vw] rounded-lg z-50 flex flex-col">
            <div className="absolute py-5 w-full flex justify-end right-6 top-0">
              <span
                className="text-base-400 bg-black/10 p-2 rounded-full cursor-pointer hover:bg-black/20"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 className="text-xl font-bold" />
              </span>
            </div>
            <div className="w-full text-2xl font-rollingStone pl-10 pt-6 text-base-400/80">
              Report to : MingPV2
            </div>
            <div className="w-full flex-1 flex flex-row gap-4 px-4 py-4 h-full overflow-hidden">
              <div className="rounded-md w-1/2 flex flex-col shadow-lg ml-4">
                <div className="w-full flex flex-col items-center">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className=" h-32 w-full rounded-t-md cursor-pointer hover:opacity-80"
                  />
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-28 w-28 relative -top-16 cursor-pointer border-2 border-transparent hover:border-base-200"
                  />
                </div>
                <div className="relative -top-14 h-full flex flex-col px-3">
                  <div className="w-full flex justify-center text-lg font-bold mb-2 items-center">
                    <div className="p-2 rounded-md hover:bg-black/5 cursor-pointer">
                      MingPV
                    </div>
                    <div className="text-red-600">(Banned)</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Universitry:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          Chulalongkorn University
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Major:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          Computer Engineering
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Year:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          4
                        </div>
                        <div className="font-bold text-sm text-base-400 ml-4">
                          Age:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          21
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Location:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          Bangkok
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-end">
                      <div className="mr-4 mb-2 p-2 border-[1px] border-base-300/30 rounded-md flex items-center font-bold text-base-400 hover:bg-black/5 cursor-pointer">
                        <IoMdDownload className="inline-block mr-2  text-base-400 text-lg" />
                        Resume
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full mt-2 flex flex-col p-2 border-[1px] border-base-300/30 rounded-md">
                    <div className="font-bold ml-2">Description</div>
                    <div className="ml-2 mt-2 text-sm overflow-y-scroll h-32 pr-4">
                      hello w-full flex justify-center text-lg font-bold w-full
                      flex justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold hello w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold hello w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold w-full flex
                      justify-center text-lg font-bold
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md w-1/2 flex flex-col h-full">
                <div className="flex-1 flex flex-col h-full">
                  <div className="mt-2 ml-4 cursor-default font-bold text-base-400">
                    Report Reason
                  </div>
                  <div className="m-4 border border-base-300/30 rounded-md h-64 bg-black/5">
                    <div className="px-4 py-2 h-full overflow-y-scroll">
                      detail detail detail detail detail detail detail detail
                      detail detail detail detail detail detail detail detail
                      detail detail detail detail detail v detail detail detail
                      detail detail detail detail detail detail detail detail
                      detail detail detail detail detail detail detail detail
                      detail detail detail detail detail detail detail detail
                      detail detail detail detail detail detail detail detail
                      detail detail detail detail detail detail detail detail
                      detail detail detail detail detail detail
                    </div>
                    <div className="flex flex-row gap-1 pt-3 pr-2 items-center">
                      {/* <div className="px-3 py-1 border border-base-300/30 rounded-md font-bold text-base-400 hover:bg-black/5 cursor-pointer">
                        Prev
                      </div> */}
                      <input
                        className="p-2 border border-base-300/30 rounded-md"
                        placeholder="ban duration (day)"
                        type="number"
                      />
                      <div
                        className="px-3 py-1 border border-base-300/30 rounded-md font-bold text-red-700 hover:bg-black/5 cursor-pointer"
                        onClick={() => setIsBanned(true)}
                      >
                        Ban User
                      </div>
                    </div>
                    {isBanned ? (
                      <div className="text-xs text-red-600 pt-2">
                        {`Banned successfully`}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-row gap-2 justify-end pr-4 pb-2">
                  <div
                    className="px-4 py-2 border border-red-600 text-red-600 hover:border-red-700  hover:bg-red-700 hover:text-white font-bold rounded-md cursor-pointer transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </div>
                  <div className="px-4 py-2 bg-lime-600 text-white hover:bg-lime-700 font-bold rounded-md cursor-pointer transition-all duration-300">
                    Mark as Resolved
                  </div>
                </div>
                <div className="text-xs text-red-600 text-end pr-4 pb-2">
                  {`Please make sure you have checked the profile.`}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div className="w-full grid grid-flow-row grid-cols-4 rounded-md">
        <div
          className="col-span-3 grid grid-flow-row grid-cols-3 rounded-md bg-white hover:border-base-300 border-[1px] border-base-300/30 cursor-pointer transition-all duration-300"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
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
            MingPV2
          </div>
          <div className="w-full flex justify-center items-center py-2 rounded-r-md text-base-400/80 font-bold">
            3 days
          </div>
        </div>
        <div className="w-full flex justify-center h-full items-center">
          <div
            className="px-4 py-2 bg-amber-800/90 rounded-md text-white font-bold cursor-pointer hover:bg-amber-800 transition-all duration-300"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Check Detail
          </div>
        </div>
      </div>
    </>
  );
}
