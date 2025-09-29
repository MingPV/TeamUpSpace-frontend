import { FriendRequest } from "../types/friend";
import { getUserByUserId, getUserByUsername } from "./auth";
import { fetchApi } from "./utils";
const BASE_URL = "/api/v1";

export async function getAllFriendsByUserId(userId: string) {
  const allFriends = await fetchApi(`${BASE_URL}/friends/${userId}`);

  const adaptedFriends = await Promise.all(
    allFriends.friends.map(async (friend: any) => {
      const info = await getUserByUserId(friend.friendId);

      return {
        id: friend.id,
        friendId: friend.friendId,
        displayName: info.profile.display_name,
        profileUrl: info.profile.profile_url,
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

async function findMutualFriendsCount(userId: string, friendId: string) {
  const myFriends = await getAllFriendsByUserId(userId);
  const myFriendIds = myFriends.map((f) => f.friendId);
  const otherfriends = await getAllFriendsByUserId(friendId);
  const otherfriendIds = otherfriends.map((f) => f.friendId);
  const intersectCount = myFriendIds.filter((x) =>
    otherfriendIds.includes(x)
  ).length;

  return intersectCount;
}

export async function getAllFriendRequests(userId: string) {
  const requests = await fetchApi(`${BASE_URL}/friends/requested/${userId}`, {
    method: "GET",
  });

  const adaptedRequests: FriendRequest[] = [];

  for (const request of requests.friends) {
    const info = await getUserByUserId(request.friendId); // sequential call
    const count = await findMutualFriendsCount(userId, request.friendId);

    adaptedRequests.push({
      id: request.id,
      friendId: request.friendId,
      friendUsername: info.profile.display_name,
      createdAt: request.createdAt,
      mutualFriendCount: count,
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
