import { Chatroom } from "../types/chatroom";
import { User } from "../types/user";
import { getUserByUsername } from "./auth";
import { fetchApi } from "./utils";
import { useUser } from "@/context/UserContext";

const BASE_URL = "/api/v1";

export async function createChatGroup(roomName: string, user: any) {
  console.log("call createChatroom");
  console.log("user", user);
  const createdChatroom = await fetchApi(`${BASE_URL}/chatrooms`, {
    method: "POST",
    body: JSON.stringify({
      room_name: roomName,
      is_group: true,
    }),
  });

  console.log(createdChatroom.chatroom.id);

  const addToRoomMember = await fetchApi(`${BASE_URL}/roommembers`, {
    method: "POST",
    body: JSON.stringify({
      room_id: createdChatroom.chatroom.id,
      user_ids: [user.id],
    }),
  });

  console.log("add you to room member");

  return addToRoomMember;
}

export async function getAllGroupsByUserId(user: any) {
  console.log("call getAllGroupsByUserId");
  console.log("user id", user.id);

  const allGroups = await fetchApi(`${BASE_URL}/roommembers/user/${user.id}`, {
    method: "GET",
  });

  const adapteredGroups = allGroups.chatrooms.map((group: any) => ({
    roomName: group.roomName,
    roomId: group.roomId,
    isGroup: true,
    updatedAt: group.updatedAt,
  }));
  console.log("filter", adapteredGroups);
  return adapteredGroups;
}

export async function getAllMessages(roomId: number) {
  console.log("call getAllMessages of room id ", roomId);

  const allMessages = await fetchApi(`${BASE_URL}/messages/${roomId}`, {
    method: "GET",
  });

  console.log(allMessages);
  return allMessages;
}
