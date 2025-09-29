"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "@/app/types/user";
import { Friend, FriendRequest } from "@/app/types/friend";
import { Chatroom } from "@/app/types/chatroom";
import {
  createChatGroup,
  getAllFriendChatroomsByUserId,
  getAllGroupsByUserId,
} from "@/app/api/chatroom";
import {
  acceptFriendRequest,
  deleteFriend,
  getAllFriendRequests,
  getAllFriendsByUserId,
} from "@/app/api/friend";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;

  //friend
  friends: Friend[];
  acceptFriend: (id: string) => Promise<void>;
  denyFriend: (id: string) => Promise<void>;
  friendRequests: FriendRequest[];
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);

  const logout = () => {
    setUser(undefined);
  };

  //friends
  const refreshFriends = async (): Promise<void> => {
    const res = await getAllFriendsByUserId(user);
    setFriends(res);
  };

  const acceptFriend = async (id: string): Promise<void> => {
    await acceptFriendRequest(id);
    refreshFriends();
    refreshFriendRequests();
  };

  const denyFriend = async (id: string): Promise<void> => {
    await deleteFriend(id);
    refreshFriends();
    refreshFriendRequests();
  };

  const refreshFriendRequests = async (): Promise<void> => {
    const res = await getAllFriendRequests(user);
    setFriendRequests(res);
  };

  useEffect(() => {
    if (user?.id) {
      refreshFriends();
      refreshFriendRequests();
    }
  }, [user?.id]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        friends,
        acceptFriend,
        denyFriend,
        friendRequests,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
}
