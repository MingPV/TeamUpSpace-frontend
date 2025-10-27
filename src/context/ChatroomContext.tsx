"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Chatroom, ChatroomInvite } from "@/app/types/chatroom";
import {
  getAllFriendChatroomsByUserId,
  getAllGroupsByUserId,
  createChatGroup,
  getAllGroupInvites,
  acceptGroupInvite,
  denyGroupInvite,
  getRoomMemberByRoomIdAndUserId,
  deleteMember,
} from "@/app/api/chatroom";
import { useUser } from "./UserContext";
import { createFriendToSendMessage } from "@/app/api/friend";

// Context value type
interface ChatroomContextType {
  selectedChatroom: Chatroom | null;
  setSelectedChatroom: (chatroom: Chatroom | null) => void;

  //group
  groups: Chatroom[];
  setGroups: React.Dispatch<React.SetStateAction<Chatroom[]>>;
  createChatroom: (roomName: string) => Promise<void>;
  refreshGroups: () => Promise<void>;
  leaveGroup: (roomId: string) => Promise<void>;

  //groupInvite
  groupInvites: ChatroomInvite[];
  acceptInvite: (id: string) => Promise<void>;
  denyInvite: (id: string) => Promise<void>;

  //friendgroup
  friendChatrooms: Chatroom[];
  setFriendChatrooms: React.Dispatch<React.SetStateAction<Chatroom[]>>;
  refreshFriendChatrooms: () => Promise<void>;

  //stranger
  strangerChatroom: Chatroom[];
  setStrangerChatroom: React.Dispatch<React.SetStateAction<Chatroom[]>>;
  addStrangerFriend: (username: string) => Promise<void>;
  acceptFriend: (id: string) => Promise<void>;
}

// Create context with default value
const ChatroomContext = createContext<ChatroomContextType | undefined>(
  undefined
);

// Provider component
export const ChatroomProvider = ({ children }: { children: ReactNode }) => {
  const { user, acceptFriend } = useUser();
  const [selectedChatroom, setSelectedChatroom] = useState<Chatroom | null>(
    null
  );
  const [groups, setGroups] = useState<Chatroom[]>([]);

  const [friendChatrooms, setFriendChatrooms] = useState<Chatroom[]>([]);
  const [groupInvites, setGroupInvites] = useState<ChatroomInvite[]>([]);
  const [strangerChatroom, setStrangerChatroom] = useState<Chatroom[]>([]);

  //groups
  const refreshGroups = async (): Promise<void> => {
    const res = await getAllGroupsByUserId(user);
    setGroups(res);
    setSelectedChatroom(res[0]);
  };

  const createChatroom = async (roomName: string): Promise<void> => {
    await createChatGroup(roomName, user);
    refreshGroups();
  };

  const refreshFriendChatrooms = async (): Promise<void> => {
    const res = await getAllFriendChatroomsByUserId(user);
    setFriendChatrooms(res.friendChatrooms);
    setStrangerChatroom(res.chatChatrooms);
    setSelectedChatroom(res.friendChatrooms[0]);
    console.log("chatroom", res);
  };

  const handleAcceptFriend = async (id: string) => {
    await acceptFriend(id);
    await refreshFriendChatrooms();
  };

  const addStrangerFriend = async (username: string): Promise<void> => {
    await createFriendToSendMessage(user, username);
    refreshFriendChatrooms();
  };

  const refreshGroupInvites = async (): Promise<void> => {
    const res = await getAllGroupInvites(user);
    setGroupInvites(res);
  };

  const acceptInvite = async (id: string): Promise<void> => {
    await acceptGroupInvite(id);
    refreshGroups();
    refreshGroupInvites();
  };

  const denyInvite = async (id: string): Promise<void> => {
    await denyGroupInvite(id);
    refreshGroupInvites();
  };

  const leaveGroup = async (roomId: string): Promise<void> => {
    const roomMember = await getRoomMemberByRoomIdAndUserId(roomId, user);
    await deleteMember(roomMember.member.id);
    refreshGroups();
  };

  useEffect(() => {
    if (user?.id) {
      refreshGroups();
      refreshFriendChatrooms();
      refreshGroupInvites();
    }
  }, [user?.id]);

  return (
    <ChatroomContext.Provider
      value={{
        selectedChatroom,
        setSelectedChatroom,
        groups,
        setGroups,
        createChatroom,
        refreshGroups,
        leaveGroup,
        friendChatrooms,
        setFriendChatrooms,
        strangerChatroom,
        setStrangerChatroom,
        refreshFriendChatrooms,
        groupInvites,
        acceptInvite,
        denyInvite,
        addStrangerFriend,
        acceptFriend: handleAcceptFriend,
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
