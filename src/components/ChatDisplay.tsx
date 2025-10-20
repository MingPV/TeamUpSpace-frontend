"use client";

import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { IoMdMenu, IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Chatroom, InviteTo } from "@/app/types/chatroom";
import {
  createInviteMembers,
  getAllMembersInGroup,
  getAllMessages,
  getAllInvitedMembersByRoomId,
  cancelInvite,
  deleteMember,
} from "@/app/api/chatroom";

//chat streaming
import { useRoomChat } from "@/components/chatroom";
import { useUser } from "@/context/UserContext";
import { useState, useRef, useEffect } from "react";
import { ChatMessage, Member } from "@/app/types/chatroom";
import { useChatroom } from "@/context/ChatroomContext";
import { useChat } from "@/context/ChatContext";

export default function ChatDisplay({
  chatroom,
}: {
  chatroom: Chatroom | null;
}) {
  const { friends } = useUser();
  const { selectedChatroom, leaveGroup, setSelectedChatroom } = useChatroom();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const roomId = String(chatroom?.id);
  const [members, setMembers] = useState<Map<string, Member>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);
  const [searchFriend, setSearchFriend] = useState<string>("");
  const [invitees, setInvitees] = useState<string[]>([]);
  const [invitedMembers, setInvitedMembers] = useState<InviteTo[]>([]);
  //chat streaming
  // const { connected, events, send } = useRoomChat(
  //   selectedChatroom?.id ?? "undefined"
  // );
  const { connected, send, events, setEvents } = useChat();

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
  const [userId, setUserId] = useState<string>("");
  const { user } = useUser();
  const invitedSet = new Set(invitedMembers.map((m) => m.invitee.user_id));

  useEffect(() => {
    setIsInviteOpen(false);
    setIsMenuOpen(false);
    console.log(chatroom);
  }, [chatroom]);

  useEffect(() => {
    setEvents((prev) =>
      prev.filter((ev) => ev.Payload.Delivered.room_id.toString() !== roomId)
    );
  }, [displayMessages]);

  const fetchInviteData = async () => {
    const [invitedRes, memberRes] = await Promise.all([
      getAllInvitedMembersByRoomId(roomId),
      getAllMembersInGroup(roomId),
    ]);
    setInvitedMembers(invitedRes);
    const membersMap = new Map<string, Member>(
      memberRes.map((m: Member) => [m.profile.user_id ?? "", m])
    );

    setMembers(membersMap);
  };

  const handleClickInviteMember = () => {
    setIsInviteOpen(!isInviteOpen);
    setIsMenuOpen(false);
    fetchInviteData();
  };

  const handleLeaveGroup = async () => {
    await leaveGroup(chatroom?.id ?? "0");
  };

  const handleClickInvite = (id: string) =>
    setInvitees((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const handleClickSendInvites = async () => {
    try {
      await createInviteMembers(roomId, userId, invitees);
      setInvitees([]);
      await fetchInviteData();
    } catch {}
  };

  const handleDeleteMember = async (id: number) => {
    try {
      await deleteMember(id);
      await fetchInviteData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelInvite = async (id: number) => {
    try {
      await cancelInvite(id);
      await fetchInviteData();
    } catch {}
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loading

        const [messages, members] = await Promise.all([
          getAllMessages(roomId),
          getAllMembersInGroup(roomId),
        ]);

        const membersMap = new Map<string, Member>(
          members.map((m: Member) => [m.profile.user_id ?? "", m])
        );
        setDisplayMessages(messages);
        setMembers(membersMap);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // stop loading after both done
      }
    };

    if (roomId && roomId !== "undefined") {
      fetchData();
      // setEvents((prev) =>
      //   prev.filter((ev) => ev.Payload.Delivered.room_id.toString() !== roomId)
      // );
      console.log(events);
    } else {
      setLoading(false);
    }
  }, [roomId]);

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
      if (last.Payload.Delivered.room_id.toString() !== roomId) return;
      const msg = mapPayloadToMessage(last);
      console.log(events);
      if (msg) {
        setDisplayMessages((prev) => [...prev, msg]);
      }
    }
  }, [events]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);

  const handleSend = (msg: string) => {
    if (msg.trim() && connected) {
      send(chatroom?.id ?? "0", msg, userId ?? "Test");
      console.log(Math.floor(Date.now() / 1000).toString());
      const newMsg: ChatMessage = {
        id: displayMessages.length.toString(), // safer than displayMessages.length
        text: msg,
        sender: user?.id ?? "user",
        timestamp: new Date().toISOString(),
      };
      setDisplayMessages((prev) => [...prev, newMsg]);

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
            {members?.size ?? 0}
          </div>
          <FaUserFriends className="text-lg text-base-400" />
        </span>
        {chatroom?.isGroup && (
          <div className="flex-1 flex flex-row gap-4 justify-end text-base mr-12 items-center">
            <div
              className="px-3 py-1 bg-base-200 rounded-md flex flex-row gap-2 items-center cursor-pointer border-[1px] border-base-200 hover:border-base-400/50 hover:text-amber-800 select-none"
              onClick={handleClickInviteMember}
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
        )}
      </div>
      {isMenuOpen && (
        <div className="w-full h-full flex flex-row">
          <div className="w-6/12 h-5/6 m-4 flex-1 flex flex-col gap-4 border-[1px] border-base-300/30 rounded-md">
            <div className="h-full rounded-md p-2 flex flex-col pb-4">
              <div className="w-full flex justify-center font-rollingStone text-xl text-amber-800 mt-4">
                Current Members
              </div>
              <div className="h-full flex flex-col gap-3 overflow-y-scroll mt-4 px-4">
                {Array.from(members).map(([id, member]) => (
                  <div
                    key={id}
                    className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3"
                  >
                    <Image
                      // src={member.profile.profile_url ?? "/golang.webp"}
                      src={
                        member.profile.profile_url != "" &&
                        member.profile.profile_url
                          ? member.profile.profile_url
                          : "/golang.webp"
                      }
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                    />
                    <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                      {member.profile.display_name}
                    </div>
                    <div className="flex-1 flex gap-2 justify-end">
                      <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                        {id == chatroom?.owner ? "Owner" : "Member"}
                      </div>
                      {id !== chatroom?.owner && userId === chatroom?.owner && (
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="p-1 border-[1px] h-fit border-base-300/30 rounded-md font-bold text-red-600 hover:bg-red-700 hover:text-white cursor-pointer"
                        >
                          <RxCross2 className="font-bold text-2xl" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-2/6 flex justify-end items-end mb-12 pr-10">
            <div className="flex flex-row gap-2">
              <button
                onClick={handleLeaveGroup}
                className="px-4 py-2 bg-red-700 text-white font-bold rounded-md cursor-pointer hover:bg-red-800"
              >
                Leave Group
              </button>
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
                {Array.from(members).map(([id, member]) => (
                  <div
                    key={id}
                    className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3"
                  >
                    <Image
                      // src={member.profile.profile_url ?? "/golang.webp"}
                      src={
                        member.profile.profile_url != "" &&
                        member.profile.profile_url
                          ? member.profile.profile_url
                          : "/golang.webp"
                      }
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                    />
                    <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                      {member.profile.display_name}
                    </div>
                    <div className="flex-1 flex gap-2 justify-end">
                      <div className="px-2 py-1 border-[1px] border-base-300/30 rounded-md font-bold text-amber-800 select-none cursor-default">
                        {id === chatroom?.owner ? "Owner" : "Member"}
                      </div>
                    </div>
                  </div>
                ))}
                {/* friend */}
                {invitedMembers.map((invite) => (
                  <div
                    key={invite.invitee.user_id}
                    className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3"
                  >
                    <Image
                      // src={invite.invitee.profile_url ?? "/golang.webp"}
                      src={
                        invite.invitee.profile_url != "" &&
                        invite.invitee.profile_url
                          ? invite.invitee.profile_url
                          : "/golang.webp"
                      }
                      width={200}
                      height={200}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                    />
                    <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                      {invite.invitee.display_name}
                    </div>
                    <div className="flex-1 flex justify-end">
                      <button
                        onClick={() => handleCancelInvite(invite.id)}
                        className="px-2 py-1 border-[1px] border-base-300/30 rounded-md bg-red-700 hover:bg-red-800 text-white font-bold cursor-pointer "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
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
                  placeholder="search friends"
                  value={searchFriend}
                  onChange={(e) => setSearchFriend(e.target.value)}
                  className="pl-2 ring-0 focus:outline-0 rounded-md p-1 py-2 flex-1"
                />
              </div>
              <div className="h-full flex flex-col gap-3 overflow-y-scroll px-4">
                {/* friend */}
                {friends
                  .filter(
                    (friend) =>
                      !members.has(friend.userInfo.profile.user_id ?? "userId")
                  )
                  .filter((friend) =>
                    (
                      friend.userInfo.profile.display_name ?? "displayname"
                    ).includes(searchFriend)
                  ) // keep only not in members
                  .filter(
                    (friend) => !invitedSet.has(friend.userInfo.profile.user_id)
                  )
                  .map((friend) => (
                    <div
                      key={friend.userInfo.profile.user_id}
                      className="w-full p-2 border-[1px] border-base-300/30 rounded-md flex flex-row items-center gap-3 px-3"
                    >
                      <Image
                        // src={
                        //   friend.userInfo.profile.profile_url ?? "/golang.webp"
                        // }
                        src={
                          friend.userInfo.profile.profile_url != "" &&
                          friend.userInfo.profile.profile_url
                            ? friend.userInfo.profile.profile_url
                            : "/golang.webp"
                        }
                        width={200}
                        height={200}
                        alt="profile-pic"
                        style={{ objectFit: "cover" }}
                        className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
                      />
                      <div className="font-bold text-base-400 hover:underline underline-offset-2 cursor-pointer">
                        {friend.userInfo.profile.display_name}
                      </div>
                      <div className="flex-1 flex justify-end">
                        <button
                          onClick={() =>
                            handleClickInvite(
                              friend.userInfo.profile.user_id ?? "userId"
                            )
                          }
                          className={`px-2 py-1 border-[1px] border-base-300/30 rounded-md  font-bold cursor-pointer hover:bg-amber-900 ${
                            invitees.includes(
                              friend.userInfo.profile.user_id ?? "displayname"
                            )
                              ? "bg-amber-800 text-white hover:bg-amber-900"
                              : " border-amber-800 hover:border-amber-900 bg-white text-amber-800 hover:text-white"
                          }`}
                        >
                          {invitees.includes(
                            friend.userInfo.profile.user_id ?? "displayname"
                          )
                            ? "Selected"
                            : "Add"}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-row justify-end gap-2">
              <div className="mr-4 px-3 py-2 border-[1px] border-base-300/30 rounded-md font-bold text-base-400 cursor-pointer hover:bg-black/5">
                Cancel
              </div>
              <button
                onClick={handleClickSendInvites}
                className="mr-4 px-3 py-2 bg-base-200 rounded-md font-bold text-base-400 cursor-pointer hover:bg-amber-800 hover:text-white transition-all duration-300"
              >
                Send Invite
              </button>
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
            {displayMessages.length > 0 &&
              displayMessages?.map((msg, index) =>
                msg.sender === userId ? (
                  // My message
                  <div
                    key={`${index}_get`}
                    className="flex flex-row-reverse gap-2 items-end"
                  >
                    <div className="text-base-400 flex flex-col justify-end">
                      <div className="flex flex-row gap-2 ">
                        <span className="text-xs flex items-end opacity-70">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <div className="text-base mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Other messages
                  <div
                    key={`${index}_send`}
                    className="flex flex-row gap-3 items-end"
                  >
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
                        {members.get(msg.sender)?.profile.display_name ||
                          "User"}{" "}
                        {/* Replace with sender name */}
                      </div>
                      <div className="flex flex-row gap-2">
                        <div className="text-base  mt-1 p-2 px-4 bg-base-100/50 rounded-xl">
                          {msg.text}
                        </div>
                        <span className="text-xs opacity-70 flex items-end">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
