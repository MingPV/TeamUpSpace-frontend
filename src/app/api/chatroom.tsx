import { fetchApi } from "./utils";
import { ChatMessage } from "../types/chatroom";
import { getUserByUserId } from "./auth";
import { BASE_URL } from "@/constants/constants";
import { isMyFriend } from "./friend";

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
  return adaptedGroups;
}

// export async function getAllFriendChatroomsByUserId(user: any) {
//   const allChatrooms = await fetchApi(
//     `${BASE_URL}/roommembers/user/${user.id}`,
//     {
//       method: "GET",
//     }
//   );

//   const adaptedChatrooms = await Promise.all(
//     allChatrooms.chatrooms
//       .filter((group: any) => group.chatroom.isGroup === false)
//       .map(async (group: any) => {
//         const members = await getAllMembersInGroup(group.roomId);
//         const latestMessage = await getLatestMessageByRoomId(group.roomId);
//         const otherMember = members.find(
//           (m: any) => m.profile.user_id !== user.id
//         );

//         return {
//           roomName: otherMember?.profile.display_name || "Unknown",
//           id: group.roomId,
//           isGroup: group.chatroom.isGroup,
//           updatedAt: group.chatroom.updatedAt,
//           latestMessage: latestMessage?.text ?? null,
//           latestMessageTimestamp: latestMessage?.timestamp ?? null,
//           imageUrl: otherMember.profile.profile_url,
//         };
//       })
//   );

//   return adaptedChatrooms;
// }

export async function getAllFriendChatroomsByUserId(user: any) {
  const allChatrooms = await fetchApi(
    `${BASE_URL}/roommembers/user/${user.id}`,
    {
      method: "GET",
    }
  );

  // Prepare arrays
  const chatChatrooms: any[] = [];
  const friendChatrooms: any[] = [];

  // Process each private chat
  await Promise.all(
    allChatrooms.chatrooms
      .filter((group: any) => group.chatroom.isGroup === false)
      .map(async (group: any) => {
        const members = await getAllMembersInGroup(group.roomId);
        const latestMessage = await getLatestMessageByRoomId(group.roomId);
        const otherMember = members.find(
          (m: any) => m.profile.user_id !== user.id
        );

        if (!otherMember) return; // skip if no partner found
        const friend = await isMyFriend(user, otherMember.profile.user_id);

        const chatroomData = {
          roomName: otherMember.profile.display_name || "Unknown",
          id: group.roomId,
          isGroup: group.chatroom.isGroup,
          updatedAt: group.chatroom.updatedAt,
          latestMessage: latestMessage?.text ?? null,
          latestMessageTimestamp: latestMessage?.timestamp ?? null,
          imageUrl: otherMember.profile.profile_url,
        };

        if (friend.friend.status !== "friend") {
          chatChatrooms.push(chatroomData);
        } else if (friend.friend.status === "friend") {
          friendChatrooms.push(chatroomData);
        }
      })
  );

  // Return both types
  return { chatChatrooms, friendChatrooms };
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
        profile: info.profile,
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
  await fetchApi(`${BASE_URL}/roominvite/accepted/${id}`, {
    method: "PATCH",
  });
  return;
}

export async function denyGroupInvite(id: string) {
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

export async function getAllMessagesUnread(user: any, roomId: string) {
  const allMessages = await fetchApi(
    `${BASE_URL}/messages/unread/${user.id}/${roomId}`
  );
  console.log("allMessages unread", allMessages);
  if (allMessages.messages) {
    const adaptedMessage = allMessages.messages?.map((m: any) => ({
      Payload: {
        Delivered: {
          id: m.id,
          room_id: m.roomId,
          text: m.message,
          sender_id: m.sender,
          created_at_unix: Math.floor(new Date(m.createdAt).getTime() / 1000), // convert to unix timestamp
        },
      },
    }));
    console.log("adapt unread messages", adaptedMessage);
    return adaptedMessage;
  }
  return null;
}
