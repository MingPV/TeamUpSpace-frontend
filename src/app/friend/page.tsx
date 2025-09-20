"use client";

import ChatCard from "@/components/ChatCard";
import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { IoMdMenu } from "react-icons/io";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-full h-screen">
      <div className="pt-20 pb-10 flex flex-row h-full">
        <div className="w-[32vw] ml-10 bg-white h-full rounded-lg shadow-md flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <div className="text-2xl font-rollingStone text-base-400 ml-8 mt-6">
              Friend & Group
            </div>
            <div className="flex flex-row gap-2 items-center pr-6">
              <div className="py-1 px-2 border-[1px] border-base-300/30 rounded-md mt-6 bg-base-200 font-bold text-sm text-base-400 cursor-pointer hover:border-base-400/50 hover:text-amber-800">
                + Add friend
              </div>
              <div className="flex flex-row items-center gap-1 py-1 px-2 border-[1px] border-base-300/30 rounded-md mt-6 bg-base-200/80 font-bold text-sm text-base-400 cursor-pointer hover:border-base-400/50 hover:text-amber-800">
                <FaUserFriends />
                Create group
              </div>
            </div>
          </div>

          <div className="w-full mt-4">
            {/* <div className="mx-4 border-[1px] border-base-300/30 rounded-full flex flex-row">
              <input type="text" className="p-1 ring-0 focus:outline-0" />
            </div> */}
            <div className="flex flex-row bg-base-100/50 items-center rounded-md mx-4">
              <IoMdSearch className="text-base-400 ml-4 text-lg" />
              <input
                type="text"
                placeholder="Serach friends"
                className="pl-2 ring-0 focus:outline-0 rounded-md p-1 py-2 flex-1"
              />
            </div>
            <div className="flex flex-row w-full border-b-[1px] border-b-base-300/30 mt-5">
              <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-transparent cursor-pointer text-base-300 font-bold">
                Chat
              </div>
              <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-lime-700 cursor-pointer text-lime-700 font-bold">
                Friend
              </div>
              <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-transparent cursor-pointer text-base-300 font-bold">
                Group
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col overflow-y-scroll px-2">
            <ChatCard
              chat={"chat1"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat2"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat3"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat4"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat5"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat6"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat7"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat8"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat9"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat10"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat11"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat12"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
            <ChatCard
              chat={"chat13"}
              chatDisplays={undefined}
              setChatDisplays={undefined}
            />
            <div className="border-b-[1px] border-b-base-300/50"></div>
          </div>
        </div>
        <div className="w-[62vw] ml-4 bg-white rounded-lg shadow-md flex flex-col">
          <div className="w-full py-6 pl-8 text-2xl flex flex-row gap-2 items-center text-base-400 font-bold cursor-defaul border-b-[1px] border-base-300/20">
            <div className="cursor-default">BananaGroup</div>

            <span className="flex flex-row gap-2 items-center p-1 px-3 bg-base-200 rounded-full">
              <div className="text-base font-bold text-base-400/70 cursor-default">
                {2}
              </div>
              <FaUserFriends className="text-lg text-base-400" />
            </span>
            <div className="flex-1 flex flex-row gap-4 justify-end text-base mr-12 items-center">
              <div className="px-3 py-1 bg-base-200 rounded-md flex flex-row gap-2 items-center cursor-pointer border-[1px] border-base-200 hover:border-base-400/50 hover:text-amber-800">
                Invite member{" "}
                <span className="">
                  <BsFillPersonPlusFill />
                </span>
              </div>
              <div className="cursor-pointer hover:bg-black/5 rounded-md p-2">
                <IoMdMenu className="text-2xl" />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex-1 flex flex-col gap-3 overflow-y-scroll px-6 pb-6 pt-6">
              <div className="w-full flex items-center justify-center text-xs text-base-300">
                Aug 12
              </div>
              {/* Other messages */}
              <div className="flex flex-row gap-3 items-end">
                <div>
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                </div>
                <div className="text-base-400 flex flex-col">
                  <div className="text-xs ml-2 text-base-400 cursor-default">
                    MingPV
                  </div>
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingming</div>
                  </div>
                </div>
              </div>
              {/* My message */}
              <div className="flex flex-row-reverse gap-2 items-end">
                <div className="text-base-400 flex flex-col">
                  <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                    <div className="text-base">Hi mingmingLast</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 pb-3 h-auto max-h-[40vh] border-t-[1px] border-base-300/30 flex flex-row gap-2 items-start">
              <textarea
                className="flex-1 h-full min-h-20 max-h-full pl-3 py-1 ring-0 focus:outline-none resize-none leading-relaxed overflow-hidden border-[1px] border-base-300/40 rounded-xl bg-base-200/30 placeholder:text-base-300 text-base-400 overflow-y-scroll"
                placeholder="Write a message..."
                rows={1}
                onChange={(e) => {
                  const textarea = e.target;

                  // auto resize
                  textarea.style.height = "auto";
                  textarea.style.height = textarea.scrollHeight + "px";
                }}
              />

              <div className="mt-1.5 cursor-pointer">
                <IoSend className="text-xl text-amber-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
