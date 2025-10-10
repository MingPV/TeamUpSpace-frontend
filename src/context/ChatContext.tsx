"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useChatroom } from "./ChatroomContext";
import { useUser } from "./UserContext";
// import { getAllMessagesUnread } from "@/app/api/chatroom";

interface ChatEvent {
  type: string;
  room_id: number;
  message?: string;
  sender: string;
  sent_at_unix?: number;
  [key: string]: any;
}

interface ChatContextValue {
  connected: boolean;
  events: ChatEvent[];
  send: (roomId: string, message: string, senderUuid: string) => void;
  disconnect: () => void;
  error: string | null;
  setEvents: React.Dispatch<React.SetStateAction<ChatEvent[]>>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<ChatEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { friendChatrooms, groups, setFriendChatrooms, setGroups } =
    useChatroom();
  const { user } = useUser();
  // useEffect(() => {
  //   const fetchUnread = async () => {
  //     if (user) {
  //       const res = await getAllMessagesUnread(user);
  //       if (res) {
  //         setEvents((prev) => {
  //           const all = [...res];

  //           // Remove duplicates by Delivered.id
  //           const unique = Array.from(
  //             new Map(all.map((m: any) => [m.Payload.Delivered.id, m])).values()
  //           );

  //           return unique;
  //         });
  //       }
  //       console.log("res unread msg", res);
  //     }
  //   };
  //   // fetchUnread();
  // }, [user]);

  useEffect(() => {
    console.log("user", user);
    const ws = new WebSocket(`ws://localhost:8080/api/v1/ws/rooms/`);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setError(null);

      if (user && (friendChatrooms || groups)) {
        console.log("here");
        console.log(friendChatrooms.length, groups.length);
        // Join all rooms immediately
        friendChatrooms?.forEach((chatroom) => {
          console.log(chatroom);
          if (!chatroom?.id) return; // skip invalid room id
          ws.send(
            JSON.stringify({
              type: "join",
              room_id: Number(chatroom.id), // ensure string type
              sender: user.id,
            })
          );
          console.log("events", events);
        });
        groups?.forEach((chatroom) => {
          if (!chatroom?.id) return; // skip invalid room id
          ws.send(
            JSON.stringify({
              type: "join",
              room_id: Number(chatroom.id), // ensure string type
              sender: user.id,
            })
          );
        });
      }
    };

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        setEvents((prev) => [...prev, data]);
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === data.Payload.Delivered.room_id
              ? {
                  ...group,
                  latestMessage: data.Payload.Delivered.text,
                  latestMessageTimestamp:
                    data.Payload.Delivered.created_at_unix,
                }
              : group
          )
        );
        setFriendChatrooms((prevGroups) =>
          prevGroups.map((friendChatroom) =>
            friendChatroom.id === data.Payload.Delivered.room_id
              ? {
                  ...friendChatroom,
                  latestMessage: data.Payload.Delivered.text,
                  latestMessageTimestamp:
                    data.Payload.Delivered.created_at_unix,
                }
              : friendChatroom
          )
        );
      } catch (err) {
        console.error("Failed to parse message:", err);
      }
    };

    ws.onclose = (event) => {
      setConnected(false);
      if (event.code !== 1000) {
        setError(`Connection closed: ${event.code} ${event.reason}`);
      }
    };

    ws.onerror = () => {
      setConnected(false);
      setError("WebSocket error occurred");
    };

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close(1000, "Component unmounting");
      }
    };
  }, [user, friendChatrooms, groups]);

  const send = useCallback(
    (roomId: string, message: string, senderUuid: string) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "send",
            room_id: roomId,
            message: message,
            sender: senderUuid,
            sent_at_unix: Math.floor(Date.now() / 1000),
          })
        );
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === roomId
              ? {
                  ...group,
                  latestMessage: message,
                  latestMessageTimestamp: new Date().toISOString(),
                }
              : group
          )
        );
        setFriendChatrooms((prevGroups) =>
          prevGroups.map((friendChatroom) =>
            friendChatroom.id === roomId
              ? {
                  ...friendChatroom,
                  latestMessage: message,
                  latestMessageTimestamp: new Date().toISOString(),
                }
              : friendChatroom
          )
        );
      } else {
        console.warn("WebSocket not connected");
      }
    },
    []
  );

  const disconnect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close(1000, "User disconnected");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{ connected, events, send, disconnect, error, setEvents }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
}
