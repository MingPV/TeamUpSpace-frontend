/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use, useEffect, useState } from "react";
import EventList from "@/components/EventList";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { Event } from "../types/event";
import { fetchAllEvents, fetchAllTags, fetchEventTags } from "../api/event";
import { fetchUserInfo } from "../api/auth";
import { useUser } from "@/context/UserContext";
import { Tag } from "../types/tag";
import { EventTag } from "../types/eventTag";
import { useDebouncedCallback } from "use-debounce";

export default function EventPage() {
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [eventTags, setEventTags] = useState<EventTag[]>([]);

  const { user, setUser } = useUser();

  // const [user, setUser] = useState(null);

  const loadAllEvents = useDebouncedCallback(async () => {
    setIsLoadingEvent(true);
    const events = await fetchAllEvents();
    setAllEvents(events);
    setFilteredEvents(events);
    setIsLoadingEvent(false);
  }, 300);

  const loadAllTags = useDebouncedCallback(async () => {
    const allTags = await fetchAllTags();
    setAllTags(allTags);
  }, 500);

  const loadEventTags = useDebouncedCallback(async () => {
    const eventTags = await fetchEventTags();
    setEventTags(eventTags);
  }, 500);

  useEffect(() => {
    loadAllEvents();
    loadAllTags();
    loadEventTags();
  }, []);

  useEffect(() => {
    // console.log("Selected Tags Updated: ", selectedTags);
    if (selectedTags.length === 0) {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents(prev => {
        return allEvents.filter(event => {
          const eventTag = eventTags.find(et => et.eventId === event.id && selectedTags.includes(et.tagId));
          return eventTag !== undefined;
        });
      });
    }
  }, [selectedTags]);

  const handleTagToggle = (tagId: number) => {
    if (tagId === 0) return; // tagId is undefined
    const isSelected = selectedTags.includes(tagId);
    setSelectedTags(prev => {
      if (isSelected) {
        // Remove tag if already selected
        return prev.filter(id => id !== tagId);
      } else {
        // Add tag if not selected
        return [...prev, tagId];
      }
    });
  };

  const LabelTag = ({ tag }: { tag: Tag }) => {
    return (
      <label className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={selectedTags.includes(tag.id ?? 0)}
          onChange={() => handleTagToggle(tag.id ?? 0)}
        />
        <div className="font-bold text-base-400">{tag.tagName}</div>
      </label>
    );
  };

  //   if (isLoadingEventEvent) {
  //     return (
  //       <>
  //         <div className="w-screen h-screen flex justify-center items-center text-base-400 font-bold">
  //           Loading . . .
  //         </div>
  //       </>
  //     );
  //   }

  return (
    <>
      <div className="mt-20 flex flex-col w-full items-center">
        <div className="w-[80vw] flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <div className="text-3xl font-rollingStone">Search for Events</div>
            {/* <div className="bg-white p-2">All</div> */}
          </div>
          <div className="w-full flex flex-row gap-4 items-center">
            <div className="flex-1 bg-white px-2 pl-4 flex flex-row items-center gap-8 focus-within:ring-2 rounded-sm border-[1px] border-base-300/50">
              <input
                type="text"
                className="flex-1 ring-0 outline-none text-base-400 placeholder:text-base-300/80 font-bold"
                placeholder="search event name"
              />
              <div className="p-2 rounded-full cursor-pointer hover:bg-black/5">
                <IoMdSearch className="text-3xl rounded-full text-base-400" />
              </div>
            </div>
            <div
              className="bg-white px-6 py-2 text-center rounded-md flex flex-row items-center gap-2 font-bold text-base-400/80 border-[1px] border-base-300/50 hover:bg-black/5 cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter className="text-lg text-amber-800/50" />
              Filter
            </div>
            <div className="bg-white px-6 py-2 text-center rounded-md flex flex-row items-center gap-2 font-bold text-base-400/80 border-[1px] border-base-300/50 hover:bg-black/5 cursor-pointer">
              <FaBookmark className="text-lg  text-amber-800" /> Saved Events
            </div>
          </div>
          <div className="flex justify-center w-full flex-row gap-6">
            <div
              className={`flex flex-col md:w-full ${
                isFilterOpen ? "lg:w-[60vw]" : "lg:w-[80vw]"
              }`}
            >
              <EventList events={filteredEvents} />
            </div>
            <div
              className={`flex flex-row md:w-full lg:w-[20vw] ${
                isFilterOpen ? "" : "hidden"
              }`}
            >
              <div className="bg-white w-full px-6 py-6 flex flex-col gap-12 rounded-sm h-fit sticky top-20 shadow-md mb-10">
                {/* Filter by A */}
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between items-center">
                    <div className="text-base-300 font-rollingStone">Filter</div>
                    <div
                      className="text-sm text-amber-800 font-bold cursor-pointer hover:underline"
                      onClick={() => setSelectedTags([])}
                    >
                      Clear
                    </div>
                  </div>
                  
                  {allTags.map((tag) => (
                    <LabelTag key={tag.id} tag={tag} />
                  ))}
                  {/* <div className="text-base-300 font-rollingStone">FilterA</div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                  </div> */}
                </div>
                {/* Filter by B */}
                {/* <div className="flex flex-col">
                  <div className="text-base-300 font-rollingStone">FilterA</div>
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                    <div className="flex flex-row gap-4 items-center cursor-pointer hover:bg-black/5 p-2.5">
                      <input
                        type="checkbox"
                        className="size-5 cursor-pointer"
                      />
                      <div className="font-bold text-base-400">choice</div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
