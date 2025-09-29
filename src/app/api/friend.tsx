import { getUserByUserId, getUserByUsername } from "./auth";
import { fetchApi } from "./utils";
import { useUser } from "@/context/UserContext";
const BASE_URL = "/api/v1";

export async function getAllFriendsByUserId(userId: string) {
  console.log("call fetchAllFriendsByUserId");

  const allFriends = await fetchApi(`${BASE_URL}/friends/${userId}`);

  console.log("allfriends", allFriends);

  const adaptedFriends = await Promise.all(
    allFriends.friends.map(async (friend: any) => {
      const info = await getUserByUserId(friend.friendId);

      console.log(info);
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
  console.log(addedFriend);

  return;
}
