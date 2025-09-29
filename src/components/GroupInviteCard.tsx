import React from "react";
import Image from "next/image";
import { ChatroomInvite } from "@/app/types/chatroom";
import { useChatroom } from "@/context/ChatroomContext";

export default function GroupInviteCard({
  groupInvite,
}: {
  groupInvite: ChatroomInvite;
}) {
  const { acceptInvite, denyInvite } = useChatroom();
  const handleAcceptInvite = async () => {
    try {
      await acceptInvite(groupInvite.id);
    } catch (err) {
      console.error("Failed to accept invite:", err);
    }
  };
  const handleDenyInvite = async () => {
    try {
      await denyInvite(groupInvite.id);
    } catch (err) {
      console.error("Failed to deny invite:", err);
    }
  };

  return (
    <div className="w-full my-2 flex flex-col gap-2">
      <div className="flex flex-row w-full gap-4 mx-2 p-2 rounded-md items-center">
        <Image
          src={groupInvite.sender.profile_url ?? "/golang.webp"}
          width={200}
          height={200}
          alt="profile-pic"
          style={{ objectFit: "cover" }}
          className="rounded-full h-14 w-14"
        />
        <div className="flex-1 flex flex-col mr-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <div className="font-bold">{groupInvite.sender.display_name}</div>
              <div>sent group invite.</div>
            </div>
            <div className="text-base-400 text-sm mr-2">3d</div>
          </div>
          <div className="text-base-400/70 text-sm">
            Group: {groupInvite.room.roomName}
          </div>
          <div className="flex flex-row gap-2 my-2 mb-4">
            <div className="text-base-400 font-bold text-sm mt-2">Member: </div>
            <div className="flex flex-col gap-2">
              {groupInvite.members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-row items-center gap-2 flex-wrap hover:bg-black/5 p-1 px-3 rounded-md cursor-pointer"
                >
                  <Image
                    src={member.profile.profile_url ?? "/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-8 w-8"
                  />
                  <div className="text-sm font-bold text-amber-900">
                    {member.profile.display_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-4 w-full items-center justify-center">
            <button
              onClick={handleAcceptInvite}
              className="p-1.5 w-full bg-base-100 cursor-pointer hover:bg-base-200 rounded-md text-center font-bold text-base-400"
            >
              Accept
            </button>
            <button
              onClick={handleDenyInvite}
              className="p-1.5 w-full bg-base-100 cursor-pointer hover:bg-base-200 rounded-md text-center font-bold text-base-400"
            >
              Deny
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
