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
import {
  acceptFriendRequest,
  deleteFriend,
  getAllFriendRequests,
  getAllFriendsByUserId,
} from "@/app/api/friend";
import { useChatroom } from "./ChatroomContext";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;

  //friend
  friends: Friend[];
  acceptFriend: (id: string) => Promise<void>;
  denyFriend: (friend: string) => Promise<void>;
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
    console.log("friends", res);
  };

  const acceptFriend = async (id: string): Promise<void> => {
    await acceptFriendRequest(id);
    refreshFriends();
    refreshFriendRequests();
  };

  const denyFriend = async (id: string): Promise<void> => {
    await deleteFriend(id, friends);
    refreshFriends();
    refreshFriendRequests();
  };

  const refreshFriendRequests = async (): Promise<void> => {
    const res = await getAllFriendRequests(user);
    setFriendRequests(res);
    console.log("friend request", res);
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
