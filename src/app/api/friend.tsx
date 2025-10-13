import { useUser } from "@/context/UserContext";
import { FriendRequest } from "../types/friend";
import { getUserByUserId, getUserByUsername } from "./auth";
import { deleteChatroom, getAllFriendChatroomsByUserId } from "./chatroom";
import { fetchApi } from "./utils";
import { Friend } from "../types/friend";
const BASE_URL = "/api/v1";
import { User } from "../types/user";

export async function getAllFriendsByUserId(user: any) {
  const allFriends = await fetchApi(`${BASE_URL}/friends/${user?.id}`, {
    method: "GET",
  });
  const myFriendIds = allFriends.friends.map((f: any) => f.friendId);

  const chatroom = await getAllFriendChatroomsByUserId(user);

  const adaptedFriends = await Promise.all(
    allFriends.friends.map(async (friend: any) => {
      const info = await getUserByUserId(friend.friendId);
      const matchedRoom = chatroom.friendChatrooms.find(
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
        roomId: matchedRoom?.id ?? "unknown",
      };
    })
  );
  return adaptedFriends;
}

export async function addFriend(username: string, userId: string) {
  const friendId = await getUserByUsername(username);
  const isFriend = await isMyFriend({ id: userId }, friendId.id);

  if (
    isFriend.friend.status === "not friend" ||
    isFriend.friend.status === "meet"
  ) {
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

  if (friends) {
    const friend = friends.find((f) => f.id == id);
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
  return res;
}

export async function getRecommendedFriend(user: any) {
  const myFriends = await fetchApi(`${BASE_URL}/friends/${user?.id}`, {
    method: "GET",
  });

  const myAllFriends = await fetchApi(`${BASE_URL}/friends/user/${user?.id}`, {
    method: "GET",
  });
  const myAllFriendIds = new Set(
    myAllFriends.friends?.map((f: any) => f.friendId)
  );

  const myFriendIds = new Set(myFriends.friends?.map((f: any) => f.friendId));

  const allFriends = await fetchApi(`${BASE_URL}/allfriends`, {
    method: "GET",
  });

  const allFriendIds = new Set<string>();
  allFriends.friends.forEach((f: any) => {
    allFriendIds.add(f.userId);
    allFriendIds.add(f.friendId);
  });

  const notMyFriendIds = [...allFriendIds].filter(
    (id: string) => !myAllFriendIds.has(id) && id !== user.id
  );

  const recommended: Friend[] = [];

  for (const id of notMyFriendIds) {
    const friend = await fetchApi(`${BASE_URL}/friends/${id}`, {
      method: "GET",
    }); //หาเพื่อนของคนที่ไม่ใช่เพื่อน

    const friendIds = new Set(friend.friends.map((f: any) => f.friendId)); //เอาไอดีทั้งหมดมา
    const mutualIds = [...friendIds].filter((id) => myFriendIds.has(id)); //หาคนที่เป็น mutual friends กับเรา
    const mutualCount = mutualIds.length;

    if (recommended.some((r) => r.userInfo?.id === id)) continue;

    const info = await getUserByUserId(id);
    recommended.push({
      id: "0",
      userInfo: info,
      roomId: "unknown",
      mutualFriends: mutualCount,
    });
  }
  // const myFriends = await fetchApi(`${BASE_URL}/friends/${user?.id}`, {
  //   method: "GET",
  // });
  // console.log("my friends", myFriends);
  // const myFriendIds = new Set(myFriends.friends?.map((f: any) => f.friendId));
  // console.log("myFirend ids", myFriendIds);

  // const recommended: Friend[] = [];
  // for (const friendId of myFriendIds) {
  //   if (recommended.length >= 20) break;
  //   const res = await fetchApi(`${BASE_URL}/friends/${friendId}`, {
  //     method: "GET",
  //   });

  //   const ffIds = new Set(res.friends.map((f: any) => f.friendId));

  //   for (const ff_friendId of ffIds) {
  //     if (recommended.length >= 20) break;
  //     if (ff_friendId === user?.id) continue;

  //     const res = await fetchApi(`${BASE_URL}/friends/${ff_friendId}`, {
  //       method: "GET",
  //     });
  //     const fffIds = new Set(res.friends.map((f: any) => f.friendId));
  //     const mutualIds = [...fffIds].filter((id) => myFriendIds.has(id));
  //     const mutualCount = mutualIds.length;
  //     const notMutualIds = [...fffIds].filter((id) => !myFriendIds.has(id));
  //     for (const id of notMutualIds) {
  //       if (id === user?.id) continue;
  //       if (recommended.some((r) => r.userInfo?.id === id)) continue;
  //       const info = await getUserByUserId(String(id));
  //       recommended.push({
  //         id: "0",
  //         userInfo: info,
  //         roomId: "unknown",
  //         mutualFriends: mutualCount,
  //       });
  //     }
  //   }
  // }
  return recommended;
}

export async function createFriendToSendMessage(user: any, username: string) {
  const friendId = await getUserByUsername(username);
  const isFriend = await isMyFriend({ id: user.id }, friendId.id);

  if (isFriend.friend.status === "not friend") {
    return await fetchApi(`${BASE_URL}/friends`, {
      method: "POST",
      body: JSON.stringify({
        user_id: user.id,
        friend_id: friendId.id,
        status: "meet",
      }),
    });
  }

  return;
}
