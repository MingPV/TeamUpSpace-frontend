import { useUser } from "@/context/UserContext";
import { FriendRequest } from "../types/friend";
import { getUserByUserId, getUserByUsername } from "./auth";
import { deleteChatroom, getAllFriendChatroomsByUserId } from "./chatroom";
import { fetchApi } from "./utils";
import { Friend } from "../types/friend";
const BASE_URL = "/api/v1";

export async function getAllFriendsByUserId(user: any) {
  const allFriends = await fetchApi(`${BASE_URL}/friends/${user?.id}`, {
    method: "GET",
  });
  const myFriendIds = allFriends.friends.map((f: any) => f.friendId);

  const chatroom = await getAllFriendChatroomsByUserId(user);

  const adaptedFriends = await Promise.all(
    allFriends.friends.map(async (friend: any) => {
      const info = await getUserByUserId(friend.friendId);
      const matchedRoom = chatroom.find(
        (room: any) => room.roomName === info.profile.display_name
      );
      const friendFriends = await fetchApi(
        `${BASE_URL}/friends/${friend.friendId}`,
        {
          method: "GET",
        }
      );
      const otherfriendIds = friendFriends.friends.map((f: any) => f.friendId);
      const intersectCount = myFriendIds.filter((x: any) =>
        otherfriendIds.includes(x)
      ).length;
      return {
        id: friend.id,
        userInfo: info,
        mutualFriends: intersectCount,
        roomId: matchedRoom.id ?? "unknown",
      };
    })
  );
  return adaptedFriends;
}

export async function addFriend(username: string, userId: string) {
  const friendId = await getUserByUsername(username);
  const isFriend = await isMyFriend({ id: userId }, friendId.id);

  if (isFriend === "not friend") {
    return await fetchApi(`${BASE_URL}/friends`, {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        friend_id: friendId.id,
        status: "pending",
      }),
    });
  }

  return;
}

export async function getAllFriendRequests(user: any) {
  const requests = await fetchApi(`${BASE_URL}/friends/requested/${user.id}`, {
    method: "GET",
  });

  const adaptedRequests: FriendRequest[] = [];
  const friends = await getAllFriendsByUserId(user);
  console.log(friends);

  for (const request of requests.friends) {
    const info = await getUserByUserId(request.friendId); // sequential call

    const matched = friends.find(
      (f: any) => f.userInfo.username == info.username
    );
    adaptedRequests.push({
      id: request.id,
      friendId: request.friendId,
      friendUsername: info.profile.display_name,
      createdAt: request.createdAt,
      mutualFriendCount: matched ? matched.mutualFriends : 0,
    });
  }

  return adaptedRequests;
}

export async function acceptFriendRequest(id: string) {
  await fetchApi(`${BASE_URL}/friends/accepted/${id}`, {
    method: "PATCH",
  });
  return;
}

export async function deleteFriend(id: string, friends?: Friend[]) {
  await fetchApi(`${BASE_URL}/friends/${id}`, {
    method: "DELETE",
  });
  console.log(friends);

  if (friends) {
    const friend = friends.find((f) => f.id == id);
    console.log("delete friendm chat", friend);
    if (friend) {
      await deleteChatroom(friend?.roomId);
    }
  }
  return;
}

export async function isMyFriend(user: any, friendId: string) {
  const res = await fetchApi(
    `${BASE_URL}/friends/ismyfriends/${user.id}/${friendId}`,
    {
      method: "GET",
    }
  );
  return res.status;
}
