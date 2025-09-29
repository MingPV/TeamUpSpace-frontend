"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Chatroom } from "@/app/types/chatroom";
import { Friend } from "@/app/types/friend";
import {
  getAllFriendChatroomsByUserId,
  getAllGroupsByUserId,
  createChatGroup,
} from "@/app/api/chatroom";
import { useUser } from "./UserContext";

// Context value type
interface ChatroomContextType {
  selectedChatroom: Chatroom | null;
  setSelectedChatroom: (chatroom: Chatroom | null) => void;

  //group
  groups: Chatroom[];
  createChatroom: (roomName: string) => Promise<void>;
  refreshGroups: () => Promise<void>;

  //friendgroup
  friendChatrooms: Chatroom[];
  refreshFriendChatrooms: () => Promise<void>;
}

// Create context with default value
const ChatroomContext = createContext<ChatroomContextType | undefined>(
  undefined
);

// Provider component
export const ChatroomProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [selectedChatroom, setSelectedChatroom] = useState<Chatroom | null>(
    null
  );
  const [groups, setGroups] = useState<Chatroom[]>([]);

  const [friendChatrooms, setFriendChatrooms] = useState<Chatroom[]>([]);

  //groups
  const refreshGroups = async (): Promise<void> => {
    const res = await getAllGroupsByUserId(user);
    setGroups(res);
  };

  const createChatroom = async (roomName: string): Promise<void> => {
    await createChatGroup(roomName, user);
    refreshGroups();
  };

  const refreshFriendChatrooms = async (): Promise<void> => {
    const res = await getAllFriendChatroomsByUserId(user);
    setFriendChatrooms(res);
  };

  useEffect(() => {
    if (user?.id) {
      console.log("call this function", user.id);
      refreshGroups();
      refreshFriendChatrooms();
    }
  }, [user?.id]);

  return (
    <ChatroomContext.Provider
      value={{
        selectedChatroom,
        setSelectedChatroom,
        groups,
        createChatroom,
        refreshGroups,
        friendChatrooms,
        refreshFriendChatrooms,
      }}
    >
      {children}
    </ChatroomContext.Provider>
  );
};

// Custom hook for easier usage
export const useChatroom = () => {
  const context = useContext(ChatroomContext);
  if (!context) {
    throw new Error("useChatroom must be used within a ChatroomProvider");
  }
  return context;
};
