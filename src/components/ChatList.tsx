/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ChatCard from "./ChatCard";
import { useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";

// I want to send a list of chat's useState to ChatCard

export default function ChatList() {
  const [chatDisplays, setChatDisplays] = useState<any[]>([]);

  return (
    <>
      {chatDisplays.length > 0 && (
        <div className="fixed w-[70%] h-[48%] flex flex-row-reverse bottom-0 right-[25%] mr-5 gap-2">
          {chatDisplays.map((chat, index) => (
            <div
              key={index}
              className="w-1/3 bg-white h-full flex flex-col rounded-t-md shadow-md shadow-base-400/30 border-[1px] border-base-300/50"
            >
              <div className="w-full flex flex-row justify-between items-center py-2 px-3 border-b-[1px] border-b-base-300/30">
                <div className="flex flex-row gap-3 items-center cursor-pointer hover:bg-black/5 p-1 rounded-md">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-9 w-9"
                  />
                  <div className="font-bold text-sm text-base-400">MingPV</div>
                </div>
                <div
                  className="p-1.5 cursor-pointer hover:bg-black/5 rounded-full"
                  onClick={() => {
                    // remove chat from chatDisplays
                    console.log("remove chat", chat);
                    const newChatDisplays = chatDisplays.filter(
                      (c) => c !== chat
                    );
                    setChatDisplays(newChatDisplays);
                  }}
                >
                  <RxCross2 className="text-xl" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3 overflow-scroll px-2">
                <div className="h-8">{chat}</div>
                <div className="w-full flex items-center justify-center text-xs text-base-300">
                  Aug 12
                </div>
                {/* Other messages */}
                <div className="flex flex-row gap-2 items-end">
                  <div>
                    <Image
                      src={"/golang.webp"}
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-8 w-8 cursor-pointer hover:opacity-90"
                    />
                  </div>
                  <div className="text-base-400 flex flex-col">
                    <div className="text-xs ml-2 text-base-400 cursor-default">
                      MingPV
                    </div>
                    <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                      <div className="text-sm">Hi mingming</div>
                    </div>
                  </div>
                </div>
                {/* My message */}
                <div className="flex flex-row-reverse gap-2 items-end">
                  <div>
                    <Image
                      src={"/golang.webp"}
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-8 w-8"
                    />
                  </div>
                  <div className="text-base-400 flex flex-col">
                    <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                      <div className="text-sm">Hi mingming</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full p-2 pb-3 h-auto max-h-[40vh] border-t-[1px] border-base-300/30 flex flex-row gap-2 items-start">
                <textarea
                  className="flex-1 h-full max-h-full pl-3 py-1 ring-0 focus:outline-none resize-none leading-relaxed overflow-hidden border-[1px] border-base-300/40 rounded-xl bg-base-200/30 placeholder:text-base-300 text-base-400 overflow-y-scroll"
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
          ))}
        </div>
      )}

      <div className="w-full flex flex-col overflow-y-scroll">
        <ChatCard
          chat={"chat1"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat2"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat3"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat4"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat5"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat6"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat7"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat8"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat9"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat10"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat11"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat12"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
        <ChatCard
          chat={"chat13"}
          chatDisplays={chatDisplays}
          setChatDisplays={setChatDisplays}
        />
        <div className="border-b-[1px] border-b-base-300/50"></div>
      </div>
    </>
  );
}
