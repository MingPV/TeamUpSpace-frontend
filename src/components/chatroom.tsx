"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useChatroom } from "@/context/ChatroomContext";

export function useRoomChat(roomId: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [manuallyDisconnected, setManuallyDisconnected] = useState(false);
  const { setFriendChatrooms, setGroups } = useChatroom();

  useEffect(() => {
    // Don't create connection if manually disconnected
    if (manuallyDisconnected) return;

    const url = `ws://localhost:8080/api/v1/ws/rooms/${roomId}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setError(null);
    };

    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        console.log("Received message:", data); // Debug log
        setEvents((prev) => [...prev, data]);
      } catch (err) {
        console.log("Failed to parse message:", err);
      }
    };

    ws.onclose = (event) => {
      setConnected(false);
      if (event.code !== 1000) {
        // not normal closure
        setError(`Connection closed: ${event.code} ${event.reason}`);
      }
    };

    ws.onerror = (err) => {
      setConnected(false);
      setError("WebSocket error occurred");
      // console.error("WebSocket error:", err);
    };

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close(1000, "Component unmounting");
      }
    };
  }, [roomId, manuallyDisconnected]);

  const send = useCallback(
    (text: string, senderUuid: string) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        const messageData = { message: text, sender: senderUuid };
        console.log("Sending message:", messageData); // Debug log
        wsRef.current.send(JSON.stringify(messageData));

        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === roomId
              ? {
                  ...group,
                  latestMessage: text,
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
                  latestMessage: text,
                  latestMessageTimestamp: new Date().toISOString(),
                }
              : friendChatroom
          )
        );
      } else {
        console.warn("WebSocket not connected");
      }
    },
    [setGroups, roomId]
  );

  const disconnect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.close(1000, "User disconnected");
    }
    setManuallyDisconnected(true);
  }, []);

  const reconnect = useCallback(() => {
    setManuallyDisconnected(false);
    setError(null);
  }, []);

  return {
    connected,
    events,
    send,
    disconnect,
    reconnect,
    error,
    manuallyDisconnected,
  };
}
