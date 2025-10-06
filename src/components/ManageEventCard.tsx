"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Event } from "@/app/types/event";
import {
  deleteEvent,
  fetchTagByEventID,
  getSavedEvent,
  removeSavedEvent,
  saveEvent,
} from "@/app/api/event";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";
import { EventTag } from "@/app/types/eventTag";

type EventProps = {
  event: Event;
};

export default function ManageEventCard({ event }: EventProps) {
  const searchParams = useSearchParams();

  // get params isSavedEvent
  const { saved } = Object.fromEntries([...searchParams.entries()]);

  const [isOpen, setIsOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<Event>();
  const [eventTags, setEventTags] = useState<string[]>([]);
  const { user } = useUser();

  const [isSaved, setIsSaved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (!event) return;
    if (event) {
      setEventInfo(event);
    }
    if (!user) return;
    const loadSavedStatus = async () => {
      if (event.id === undefined) return;
      const res = await getSavedEvent(user.id, event.id);
      if (res) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    };
    const loadTags = async () => {
      if (event.id === undefined) return;
      // fetch event tags by event id
      const res = await fetchTagByEventID(event.id);
      if (res) {
        setEventTags(res);
      } else {
        setEventTags([]);
      }
    };
    loadSavedStatus();
    loadTags();
    // console.log(event);
  }, [event, user]);

  const handleRemoveEvent = () => {
    if (!user || !eventInfo || !eventInfo.id) return;
    deleteEvent(eventInfo.id).then((res) => {
      if (res) {
        setIsDeleted(true);
        setIsDeleteOpen(false);
        setEventInfo(undefined);
      } else {
        alert("Failed to remove event");
      }
    });
  };

  return (
    <>
      {/* Delete Post */}
      {isDeleteOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setIsDeleteOpen(false)}
          />
          <div className="fixed bg-white h-44 w-[30vw] top-[35vh] left-[35vw] rounded-lg z-50 flex flex-col">
            <div className="w-full text-2xl font-rollingStone pl-8 pt-6 text-base-400/80">
              Remove Event
            </div>
            <div className="w-full font-rollingStone pl-8 pt-3 text-base-400/80">
              Are you sure? Removing this event is permanent.
            </div>
            <div className="flex-1 flex flex-row gap-2 justify-end pr-4 pb-4 items-end">
              <div
                className="px-4 py-2 border border-base-400 text-base-400 hover:border-base-400  hover:bg-base-400 hover:text-white font-bold rounded-md cursor-pointer transition-all duration-300"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </div>
              <div
                className="px-4 py-2 bg-red-700 text-white hover:bg-red-800 font-bold rounded-md cursor-pointer transition-all duration-300"
                onClick={handleRemoveEvent}
              >
                Remove
              </div>
            </div>
          </div>
        </>
      ) : null}
      <div
        className={`w-full bg-white px-6 py-4 gap-2 flex flex-col shadow-md rounded-xs overflow-hidden ${
          isOpen ? "max-h-[750px]" : "max-h-72"
        } ${saved ? (isSaved ? "" : "hidden") : ""} ${
          isDeleted ? "hidden" : ""
        } transition-all duration-300`}
      >
        <div
          className={`flex flex-col gap-2 ${
            isOpen ? "h-full min-h-[190px]" : "h-[190px]"
          }`}
        >
          <div className="flex flex-row items-center">
            <div className="flex-1 flex flex-row gap-2 items-center">
              <div className="font-bold text-base-400 text-xl">
                {eventInfo?.eventName}
              </div>
              <div className="flex flex-row gap-1">
                <div className="text-base-400/60">{`[`}</div>
                {/* if closed */}
                {eventInfo && eventInfo.registerCloseDt ? (
                  new Date(eventInfo.registerCloseDt) < new Date() ? (
                    <div className="text-red-700">closed</div>
                  ) : (
                    <>
                      <div className="text-base-400/60">{`closes in`}</div>
                      <div className="text-green-700">
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
                    </>
                  )
                ) : (
                  <div className="text-red-700">N/A</div>
                )}

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
          <div className="flex flex-row overflow-y-hidden">
            <div className="flex-1 flex flex-col gap-2 overflow-y-scroll">
              <div className="flex flex-row gap-2">
                <div className="text-sm font-bold text-base-400/80">
                  event duration :
                </div>
                <div className="text-sm font-bold text-amber-800">
                  {eventInfo?.startAt} - {eventInfo?.endAt}
                </div>
              </div>

              <div className="pr-4">{eventInfo?.eventDescription}</div>
            </div>
            <Image
              src={eventInfo?.mainImageUrl || "/golang.webp"}
              width={230}
              height={230}
              alt="event-pic"
              className="object-cover h-fit max-h-[150px]"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div
            className={`flex flex-row gap-2 mt-4 ${
              isOpen ? "opacity-100" : "opacity-0"
            } `}
          >
            {eventTags &&
              eventTags.map((tag: string, index: number) => (
                <div
                  key={index}
                  className="py-2 px-3 bg-base-200 rounded-full text-sm"
                >
                  {tag}
                </div>
              ))}
            {/* hard code tags */}
          </div>
          <div className="flex flex-row gap-2">
            <div
              className="border-2 border-base-300 rounded-full py-2 px-3 cursor-pointer hover:bg-red-700 hover:text-white transition-all duration-300 font-bold hover:border-red-800 select-none"
              onClick={() => setIsDeleteOpen(true)}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
