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

export async function getRoomMemberByRoomIdAndUserId(
  roomId: string,
  user: any
) {
  return fetchApi(`${BASE_URL}/roommembers/room/${roomId}/${user.id}`, {
    method: "GET",
  });
}

export async function getChatroomById(id: string) {
  return await fetchApi(`${BASE_URL}/chatrooms/${id}`, {
    method: "GET",
  });
}

export async function getAllGroupsByUserId(user: any) {
  const allGroups = await fetchApi(`${BASE_URL}/roommembers/user/${user.id}`, {
    method: "GET",
  });

  const groups = allGroups.chatrooms.filter(
    (group: any) => group.chatroom.isGroup
  );

  const adaptedGroups = await Promise.all(
    groups.map(async (group: any) => {
      const latestMessage = await getLatestMessageByRoomId(group.roomId);

      return {
        roomName: group.chatroom.roomName,
        id: group.roomId,
        isGroup: group.chatroom.isGroup,
        owner: group.chatroom.owner,
        updatedAt: group.chatroom.updatedAt,
        latestMessage: latestMessage?.text ?? null,
        latestMessageTimestamp: latestMessage?.timestamp ?? null,
      };
    })
  );
  console.log(adaptedGroups);
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
        const latestMessage = await getLatestMessageByRoomId(group.roomId);
        const otherMember = members.find(
          (m: any) => m.profile.user_id !== user.id
        );
        console.log(otherMember);

        return {
          roomName: otherMember?.profile.display_name || "Unknown",
          id: group.roomId,
          isGroup: group.chatroom.isGroup,
          updatedAt: group.chatroom.updatedAt,
          latestMessage: latestMessage?.text ?? null,
          latestMessageTimestamp: latestMessage?.timestamp ?? null,
          imageUrl: otherMember.profile.profile_url,
        };
      })
  );
  console.log(adaptedChatrooms);

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
  console.log(`${BASE_URL}/roommembers/room/${roomId}`);
  const adaptedMembers = await Promise.all(
    allMembers.members.map(async (member: any) => {
      const info = await getUserByUserId(member.userId);
      return {
        id: member.id,
        profile: info.profile,
      };
    })
  );
  console.log(adaptedMembers);
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
        invitee: info.profile,
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

async function getRoomInfoById(id: string) {
  const res = await fetchApi(`${BASE_URL}/chatrooms/${id}`);
  return res;
}

export async function getAllGroupInvites(user: any) {
  const allInvites = await fetchApi(
    `${BASE_URL}/roominvite/inviteto/${user.id}`,
    {
      method: "GET",
    }
  );

  console.log(allInvites);

  const adaptedAllInvites = await Promise.all(
    allInvites.invites.map(async (invite: any) => {
      const info = await getUserByUserId(invite.sender);
      const room = await getRoomInfoById(invite.roomId);
      return {
        id: invite.id,
        room: room.chatroom,
        sender: info.profile,
        createdAt: invite.createdAt,
        members: await getAllMembersInGroup(invite.roomId),
      };
    })
  );

  return adaptedAllInvites;
}

export async function acceptGroupInvite(id: string) {
  console.log("call accept gropu invite", id);
  await fetchApi(`${BASE_URL}/roominvite/accepted/${id}`, {
    method: "PATCH",
  });
  return;
}

export async function denyGroupInvite(id: string) {
  console.log("call deny group invite", id);
  await fetchApi(`${BASE_URL}/roominvite/${id}`, {
    method: "DELETE",
  });
  return;
}

export async function getLatestMessageByRoomId(roomId: string) {
  const message = await fetchApi(`${BASE_URL}/message/latest/${roomId}`, {
    method: "GET",
  });

  if (message.code == 5) return;

  return {
    id: message.message.id,
    text: message.message.message,
    sender: message.message.sender,
    timestamp: message.message.createdAt,
  };
}

export async function deleteChatroom(id: string) {
  return await fetchApi(`${BASE_URL}/chatrooms/${id}`, {
    method: "DELETE",
  });
}
