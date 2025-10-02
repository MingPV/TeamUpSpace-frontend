"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Event } from "@/app/types/event";

type EventProps = {
  event: Event;
};

export default function ManageEventCard({ event }: EventProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<Event>();

  useEffect(() => {
    if (event) {
      setEventInfo(event);
    }
    console.log(event);
  }, [event]);

  return (
    <div
      className={`w-full bg-white px-6 py-4 gap-2 flex flex-col shadow-md rounded-xs overflow-hidden ${
        isOpen ? "max-h-[350px]" : "max-h-72"
      } transition-all duration-300`}
    >
      <div className="flex flex-col gap-2 h-[350px]">
        <div className="flex flex-row items-center">
          <div className="flex-1 flex flex-row gap-2 items-center">
            <div className="font-bold text-base-400 text-xl">
              {eventInfo?.eventName}
            </div>
            <div className="flex flex-row gap-1">
              <div className="text-base-400/60">{`[`}</div>
              <div className="text-base-400/60">{`closes in`}</div>
              <div className="text-red-700">{`3 days`}</div>
              <div className="text-base-400/60">{`]`}</div>
            </div>
          </div>

          <div
            className="hover:bg-black/5 p-3 rounded-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaChevronDown className="text-base-400" />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex-1">{eventInfo?.eventDescription}</div>
          <Image
            src={"/golang.webp"}
            width={230}
            height={230}
            alt="event-pic"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div
          className={`flex flex-row gap-2 mt-4 ${
            isOpen ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div className="py-2 px-3 bg-amber-800/30 rounded-full text-sm">
            tagExample
          </div>
          <div className="py-2 px-3 bg-amber-800/30 rounded-full text-sm">
            tagExample
          </div>
          <div className="py-2 px-3 bg-amber-800/30 rounded-full text-sm">
            tagExample
          </div>
          <div className="py-2 px-3 bg-amber-800/30 rounded-full text-sm">
            tagExample
          </div>
        </div>
        <div className="border-2 border-base-300 rounded-full py-2 px-3 cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300 font-bold hover:border-red-800">
          Remove
        </div>
      </div>
    </div>
  );
}
