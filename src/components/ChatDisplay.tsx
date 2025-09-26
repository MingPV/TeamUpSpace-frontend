"use client";

import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { IoMdMenu, IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Chatroom } from "@/app/types/chatroom";

//chat streaming
import { useRoomChat } from "@/components/chatroom";
import { useUser } from "@/context/UserContext";
import { use, useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/app/types/chatroom";

export default function ChatDisplay({
  chatroom,
}: {
  chatroom: Chatroom | undefined;
}) {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const roomId = String(chatroom?.roomId);

  const { connected, events, send } = useRoomChat(roomId);

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
  const [userId, setUserId] = useState<string | undefined>("");
  const { user } = useUser();
  //get all members --> create mapping user_id to display_name -->

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);

  function mapPayloadToMessage(payload: any): ChatMessage | null {
    if (!payload?.Payload?.Delivered) return null;

    const d = payload.Payload.Delivered;
    return {
      id: d.id,
      text: d.text,
      sender: d.sender_id,
      timestamp: new Date(d.created_at_unix * 1000).toISOString(),
    };
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (events.length > 0) {
      const last = events[events.length - 1];
      const msg = mapPayloadToMessage(last);

      if (msg) {
        setDisplayMessages((prev) => [...prev, msg]);
      }
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  const handleSend = (msg: string) => {
    if (msg.trim() && connected) {
      send(msg, userId ?? "Test");
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputMessage);
    }
  };

  return (
    <div className="w-[62vw] ml-4 bg-white rounded-lg shadow-md flex flex-col h-full">
      <div className="w-full py-6 pl-8 text-2xl flex flex-row gap-2 items-center text-base-400 font-bold cursor-defaul border-b-[1px] border-base-300/20">
        <div className="cursor-default select-none">{chatroom?.roomName}</div>

        <span className="flex flex-row gap-2 items-center p-1 px-3 bg-base-200 rounded-full select-none">
          <div className="text-base font-bold text-base-400/70 cursor-default">
            {2}
          </div>
          <FaUserFriends className="text-lg text-base-400" />
        </span>
        <div className="flex-1 flex flex-row gap-4 justify-end text-base mr-12 items-center">
          <div
            className="px-3 py-1 bg-base-200 rounded-md flex flex-row gap-2 items-center cursor-pointer border-[1px] border-base-200 hover:border-base-400/50 hover:text-amber-800 select-none"
            onClick={() => {
              setIsInviteOpen(!isInviteOpen);
              setIsMenuOpen(false);
            }}
          >
            Invite member{" "}
            <span className="">
              <BsFillPersonPlusFill />
            </span>
          </div>
          <div
            className="cursor-pointer hover:bg-black/5 rounded-md p-2"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsInviteOpen(false);
            }}
          >
            <IoMdMenu className="text-2xl" />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="w-full h-full flex flex-row">
          <div className="w-6/12 h-5/6 m-4 flex-1 flex flex-col gap-4 border-[1px] border-base-300/30 rounded-md">
            <div className="h-full rounded-md p-2 flex flex-col pb-4">
              <div className="w-full flex justify-center font-rollingStone text-xl text-amber-800 mt-4">
                Current Members
              </div>
              <div className="h-full flex flex-col gap-3 overflow-y-scroll mt-4 px-4">
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Owner
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Member
                    </div>
                    <div className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer">
                      <RxCross2 className="font-bold text-2xl" />
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Member
                    </div>
                    <div className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer">
                      <RxCross2 className="text-2xl" />
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Member
                    </div>
                    <div className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer">
                      <RxCross2 className="text-2xl" />
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Member
                    </div>
                    <div className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer">
                      <RxCross2 className="text-2xl" />
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Member
                    </div>
                    <div className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer">
                      <RxCross2 className="text-2xl" />
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Member
                    </div>
                    <div className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer">
                      <RxCross2 className="text-2xl" />
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex gap-2 justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                      Member
                    </div>
                    <div className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer">
                      <RxCross2 className="text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/6 flex justify-end items-end mb-12 pr-10">
            <div className="flex flex-row gap-2">
              <div className="px-4 py-2 bg-red-700 text-white font-bold rounded-md cursor-pointer hover:bg-red-800">
                Leave Group
              </div>
            </div>
          </div>
        </div>
      )}
      {isInviteOpen && (
        <div className="w-full h-5/6 flex flex-row">
          <div className="m-4 flex-1 flex flex-col gap-4 border-[1px] border-base-300/30 rounded-md">
            <div className="h-full rounded-md p-2 flex flex-col pb-4">
              <div className="w-full flex justify-center font-rollingStone text-xl text-amber-800 mt-4">
                Current Members
              </div>
              <div className="h-full flex flex-col gap-3 overflow-y-scroll mt-4 px-4">
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 cursor-default select-none">
                      Owner
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 cursor-default select-none">
                      Member
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 cursor-default select-none">
                      Member
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 cursor-default select-none">
                      Member
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-red-700 hover:bg-red-800 text-white font-bold cursor-pointer ">
                      Cancel
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-red-700 hover:bg-red-800 text-white font-bold cursor-pointer ">
                      Cancel
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-red-700 hover:bg-red-800 text-white font-bold cursor-pointer ">
                      Cancel
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-red-700 hover:bg-red-800 text-white font-bold cursor-pointer ">
                      Cancel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4 flex-1 flex flex-col gap-4">
            <div className="h-11/12 border-[1px] border-base-300/30 rounded-md p-2 flex flex-col pb-4">
              <div className="w-full flex justify-center font-rollingStone text-xl text-amber-800 mt-4">
                Search Friends
              </div>
              <div className="flex flex-row bg-base-100/50 items-center rounded-md mx-4 my-3">
                <IoMdSearch className="text-base-400 ml-4 text-lg" />
                <input
                  type="text"
                  placeholder="Serach friends"
                  className="pl-2 ring-0 focus:outline-0 rounded-md p-1 py-2 flex-1"
                />
              </div>
              <div className="h-full flex flex-col gap-3 overflow-y-scroll px-4">
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
                {/* friend */}
                <div className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3">
                  <Image
                    src={"/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                  />
                  <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                    MingPV
                  </div>
                  <div className="flex-1 flex justify-end">
                    <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-amber-800 text-white font-bold cursor-pointer hover:bg-amber-900">
                      Add
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2">
              <div className="mr-4 px-3 py-2 border-[1px] border-base-300/30 rounded-md font-bold text-base-400 cursor-pointer hover:bg-black/5">
                Cancel
              </div>
              <div className="mr-4 px-3 py-2 bg-base-200 rounded-md font-bold text-base-400 cursor-pointer hover:bg-amber-800 hover:text-white transition-all duration-300">
                Send Invite
              </div>
            </div>
          </div>
        </div>
      )}
      {!isInviteOpen && !isMenuOpen && (
        <div className="w-full flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 flex flex-col gap-3 overflow-y-scroll px-6 pb-6 pt-6">
            <div className="w-full flex items-center justify-center text-xs text-base-300">
              Aug 12
            </div>
            {displayMessages.map((msg) =>
              msg.sender === userId ? (
                // My message
                <div
                  key={msg.id}
                  className="flex flex-row-reverse gap-2 items-end"
                >
                  <div className="text-base-400 flex flex-col">
                    <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                      <div className="text-base">{msg.text}</div>
                      <span className="text-xs opacity-70 block">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                // Other messages
                <div key={msg.id} className="flex flex-row gap-3 items-end">
                  <div>
                    <Image
                      src={"/golang.webp"} // Replace with actual sender profile image
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                    />
                  </div>
                  <div className="text-base-400 flex flex-col">
                    <div className="text-xs ml-2 text-base-400 cursor-default">
                      {msg.sender || "User"} {/* Replace with sender name */}
                    </div>
                    <div className="flex flex-col gap-2 mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                      <div className="text-base">{msg.text}</div>
                      <span className="text-xs opacity-70 block">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="w-full p-2 pb-3 h-auto max-h-[40vh] border-t-[1px] border-base-300/30 flex flex-row gap-2 items-start">
            <textarea
              className="flex-1 h-full min-h-20 max-h-full pl-3 py-1 ring-0 focus:outline-none resize-none leading-relaxed overflow-hidden border-[1px] border-base-300/40 rounded-xl bg-base-200/30 placeholder:text-base-300 text-base-400 overflow-y-scroll"
              placeholder="Write a message..."
              value={inputMessage}
              onKeyPress={handleKeyPress}
              rows={1}
              onChange={(e) => {
                setInputMessage(e.target.value);
                const textarea = e.target;

                // auto resize
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
              }}
            />

            <button
              className="mt-1.5 cursor-pointer"
              onClick={() => handleSend(inputMessage)}
            >
              <IoSend className="text-xl text-amber-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
