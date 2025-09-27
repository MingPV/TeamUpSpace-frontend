import { getUserByUserId } from "./auth";
import { fetchApi } from "./utils";

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
