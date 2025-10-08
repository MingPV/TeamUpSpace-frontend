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
  getRecommendedFriend,
  addFriend,
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

  recommemdFriends: Friend[];
  setRecommendFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
  addFriendFromRecommend: (username: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [recommemdFriends, setRecommendFriends] = useState<Friend[]>([]);

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

  const refreshRecommendFriends = async (): Promise<void> => {
    const res = await getRecommendedFriend(user);
    setRecommendFriends(res);
    console.log("recommended friend", res);
  };

  const addFriendFromRecommend = async (username: string): Promise<void> => {
    await addFriend(username, user?.id ?? "Unkown User");
    refreshRecommendFriends();
  };

  // const addFriends =
  useEffect(() => {
    if (user?.id) {
      refreshFriends();
      refreshFriendRequests();
      refreshRecommendFriends();
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
        recommemdFriends,
        setRecommendFriends,
        addFriendFromRecommend,
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
