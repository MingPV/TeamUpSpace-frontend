import { FriendRequest } from "../types/friend";
import { getUserByUserId, getUserByUsername } from "./auth";
import { getAllFriendChatroomsByUserId } from "./chatroom";
import { fetchApi } from "./utils";
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
  const addedFriend = await fetchApi(`${BASE_URL}/friends`, {
    method: "POST",
    body: JSON.stringify({
      user_id: userId,
      friend_id: friendId.id,
      status: "pending",
    }),
  });

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

export async function deleteFriend(id: string) {
  await fetchApi(`${BASE_URL}/friends/${id}`, {
    method: "DELETE",
  });
  return;
}
