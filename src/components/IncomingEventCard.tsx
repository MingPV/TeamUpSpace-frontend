"use client";

import React from "react";
import Image from "next/image";
import { BsChevronCompactRight } from "react-icons/bs";
import { Event } from "@/app/types/event";
import { useRouter } from "next/navigation";

type EventProps = {
  event: Event;
};

export default function IncomingEventCard({ event }: EventProps) {
  const router = useRouter();

  return (
    <div
      className="flex gap-4 hover:bg-black/10 cursor-pointer rounded-lg p-2 items-center md:min-w-[40vw] lg:min-w-0 lg:w-auto"
      onClick={() => router.push(`/event/${event.id}`)}
    >
      <Image
        src={event.mainImageUrl || "/images/dental_1.png"}
        width={100}
        height={100}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-md h-12 w-12"
      />
      <div className="flex flex-1 flex-col">
        <div className="font-bold text-sm">{event.eventName}</div>
        <div className="text-xs">
          {event.eventDescription && event.eventDescription.length > 30
            ? event.eventDescription.slice(0, 60) + "..."
            : event.eventDescription}
        </div>
        <div className="flex gap-1 mt-1">
          <div className="text-xs font-bold text-base-400">Closes in</div>
          <div className="text-xs font-bold text-red-700">
            {(() => {
              if (!event.registerCloseDt) return "N/A";
              const endDate = new Date(event.registerCloseDt);
              const today = new Date();
              const diffTime = endDate.getTime() - today.getTime();
              const diffDays = Math.max(
                Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
                0
              );
              return `${diffDays} days`;
            })()}
          </div>
        </div>
      </div>
      <BsChevronCompactRight />
    </div>
  );
}
