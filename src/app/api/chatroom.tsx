import { fetchApi } from "./utils";
import { ChatMessage } from "../types/chatroom";
import { getUserByUserId } from "./auth";
import { BASE_URL } from "@/constants/constants";

export async function createChatGroup(roomName: string, user: any) {
  const createdChatroom = await fetchApi(`${BASE_URL}/chatrooms`, {
    method: "POST",
    body: JSON.stringify({
      room_name: roomName,
      is_group: true,
      owner: user.id,
    }),
  });

  const addToRoomMember = await fetchApi(`${BASE_URL}/roommembers`, {
    method: "POST",
    body: JSON.stringify({
      room_id: createdChatroom.chatroom.id,
      user_ids: [user.id],
    }),
  });

  return addToRoomMember;
}

export async function getAllGroupsByUserId(user: any) {
  const allGroups = await fetchApi(`${BASE_URL}/roommembers/user/${user.id}`, {
    method: "GET",
  });

  const adaptedGroups = allGroups.chatrooms
    .filter((group: any) => group.chatroom.isGroup === true)
    .map((group: any) => ({
      roomName: group.chatroom.roomName,
      roomId: group.roomId,
      isGroup: group.chatroom.isGroup,
      owner: group.chatroom.owner,
      updatedAt: group.chatroom.updatedAt,
    }));
  return adaptedGroups;
}

export async function getAllFriendChatroomsByUserId(user: any) {
  const allChatrooms = await fetchApi(
    `${BASE_URL}/roommembers/user/${user.id}`,
    {
      method: "GET",
    }
  );

  const adaptedChatrooms = await Promise.all(
    allChatrooms.chatrooms
      .filter((group: any) => group.chatroom.isGroup === false)
      .map(async (group: any) => {
        const members = await getAllMembersInGroup(group.roomId);

        const otherMember = members.find((m: any) => m.userId !== user.id);

        return {
          roomName:
            otherMember?.displayName || otherMember?.userId || "Unknown",
          roomId: group.roomId,
          isGroup: group.chatroom.isGroup,
          updatedAt: group.chatroom.updatedAt,
        };
      })
  );

  return adaptedChatrooms;
}

export async function getAllMessages(roomId: string) {
  const allMessages = await fetchApi(`${BASE_URL}/messages/${roomId}`, {
    method: "GET",
  });

  const adaptedMessages: ChatMessage[] = allMessages.message.map(
    (msg: any) => ({
      id: msg.id.toString(),
      text: msg.message,
      sender: msg.sender,
      timestamp: msg.createdAt,
    })
  );

  return adaptedMessages;
}

export async function getAllMembersInGroup(roomId: string) {
  const allMembers = await fetchApi(`${BASE_URL}/roommembers/room/${roomId}`, {
    method: "GET",
  });

  const adaptedMembers = await Promise.all(
    allMembers.members.map(async (member: any) => {
      const info = await getUserByUserId(member.userId);
      return {
        id: member.id,
        userId: member.userId,
        username: info.username,
        displayName: info.profile.display_name,
        profileUrl: info.profile.profile_url,
      };
    })
  );

  return adaptedMembers;
}

export async function createInviteMembers(
  roomId: string,
  userId: string,
  inviteeIds: string[]
) {
  for (const invitee of inviteeIds) {
    const createInvites = await fetchApi(`${BASE_URL}/roominvite`, {
      method: "POST",
      body: JSON.stringify({
        room_id: roomId,
        sender: userId,
        invite_to: invitee,
        is_accepted: false,
        is_denied: false,
      }),
    });
  }
  return;
}

export async function getAllInvitedMembersByRoomId(roomId: string) {
  const allInvites = await fetchApi(`${BASE_URL}/roominvite/room/${roomId}`);
  const adaptedInvites = await Promise.all(
    allInvites.invites.map(async (invite: any) => {
      const info = await getUserByUserId(invite.inviteTo);
      return {
        id: Number(invite.id),
        inviteToId: invite.inviteTo,
        username: invite.username,
        displayName: info.profile.display_name,
        profileUrl: info.profile.profile_url,
      };
    })
  );

  return adaptedInvites;
}

export async function cancelInvite(id: number) {
  const cancel = await fetchApi(`${BASE_URL}/roominvite/${id}`, {
    method: "DELETE",
  });

  return;
}

export async function deleteMember(id: number) {
  const res = await fetchApi(`${BASE_URL}/roommembers/${id}`, {
    method: "DELETE",
  });

  return;
}
