"use client";

import { fetchUserInfo } from "@/app/api/auth";
import { useRoomChat } from "@/components/chatroom";
import { use, useState, useRef, useEffect } from "react";

type ChatMessage = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
};
export default function Page({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  const {
    connected,
    events,
    send,
    disconnect,
    reconnect,
    error,
    manuallyDisconnected,
  } = useRoomChat(roomId);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);
  const [user, setUser] = useState(); //TODO: set user id
  // const [user, setUser] = useState(() => crypto.randomUUID());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserInfo();
        console.log("user", response);
        if (response && response.ok) {
          const userInfo = await response.json();
          setUser(userInfo);
          console.log(userInfo);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

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
      send(msg, user ?? "test");
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputMessage);
    }
  };

  // Add a test message to verify UI is working

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chat Room: {roomId}</h1>
          <p>user : {user}</p>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-sm ${
                connected
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {connected ? "🟢 Connected" : "�� Disconnected"}
            </span>
            {connected ? (
              <button
                onClick={disconnect}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Disconnect
              </button>
            ) : manuallyDisconnected ? (
              <button
                onClick={reconnect}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Reconnect
              </button>
            ) : null}
          </div>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">Error: {error}</p>}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Show test message first */}
        <p>start chatting</p>
        {displayMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === user ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg shadow ${
                msg.sender === "10000000-0000-0000-000000000000"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-black rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs opacity-70 block">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={!connected}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            onClick={() => handleSend(inputMessage)}
            disabled={!connected || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
