import React from "react";
import Image from "next/image";
import { Notification } from "@/app/types/notification";
import { formatDistanceToNow } from "date-fns";

export default function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  return (
    <div className="flex flex-row w-[95%] gap-4 p-2 rounded-md items-center hover:bg-black/5 cursor-pointer">
      <Image
        src={"/golang.webp"}
        width={200}
        height={200}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-full h-13 w-13"
      />
      <div className="flex-1 flex flex-col mr-4">
        <div className="flex flex-row gap-2">
          <div>{notification.message}</div>
        </div>
        <div className="text-sm text-base-400/70">
          {formatDistanceToNow(new Date(notification.createdAt ?? 0))} ago
        </div>
      </div>
    </div>
  );
}
