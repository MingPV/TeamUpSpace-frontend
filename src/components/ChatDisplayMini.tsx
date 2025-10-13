import { Chatroom } from "@/app/types/chatroom";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { ChatMessage } from "@/app/types/chatroom";
import { Member } from "@/app/types/chatroom";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { useChat } from "@/context/ChatContext";

import { getAllMembersInGroup, getAllMessages } from "@/app/api/chatroom";
export default function ChatDisplayMini({ chatroom }: { chatroom: Chatroom }) {
  console.log(chatroom);

  const { connected, send, events, setEvents } = useChat();
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
  const [userId, setUserId] = useState<string>("");
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<Map<string, Member>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loading

        const [messages, members] = await Promise.all([
          getAllMessages(chatroom.id),
          getAllMembersInGroup(chatroom.id),
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

    if (chatroom.id && chatroom.id !== "undefined") {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [chatroom.id]);

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

  // useEffect(() => {
  //   if (events.length > 0) {
  //     const last = events[events.length - 1];
  //     const msg = mapPayloadToMessage(last);

  //     if (msg) {
  //       setDisplayMessages((prev) => [...prev, msg]);
  //     }
  //   }
  // }, [events]);
  useEffect(() => {
    if (events.length > 0) {
      const last = events[events.length - 1];
      if (last.Payload.Delivered.room_id.toString() !== chatroom.id) return;
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

  // const handleSend = (msg: string) => {
  //   if (msg.trim() && connected) {
  //     send(msg, userId ?? "Test");
  //     setInputMessage("");
  //   }
  // };
  const handleSend = (msg: string) => {
    if (msg.trim() && connected) {
      send(chatroom?.id ?? "0", msg, user?.id ?? "unknown user");
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
    <div className=" h-full flex flex-col justify-between">
      <div className="flex-1 flex flex-col gap-3 px-1  h-full">
        <div className="overflow-y-scroll h-72 py-1">
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
                      <span className="text-[0.5rem] flex items-end opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <div className="text-sm mt-1 p-2 px-4 bg-base-200/40 rounded-xl">
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
                      {members.get(msg.sender)?.profile.display_name || "User"}{" "}
                      {/* Replace with sender name */}
                    </div>
                    <div className="flex flex-row gap-2">
                      <div className="text-sm  mt-1 p-2 px-4 bg-base-100/50 rounded-xl">
                        {msg.text}
                      </div>
                      <span className="text-[0.5rem] opacity-70 flex items-end">
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
      </div>

      <div className="w-full p-2 justify-end  border-t-[1px] border-base-300/30 flex flex-row gap-2 items-start">
        <textarea
          className="flex-1 h-full max-h-full pl-3 py-1 ring-0 focus:outline-none resize-none leading-relaxed overflow-hidden border-[1px] border-base-300/40 rounded-xl bg-base-200/30 placeholder:text-base-300 text-base-400 overflow-y-scroll"
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
  );
}
