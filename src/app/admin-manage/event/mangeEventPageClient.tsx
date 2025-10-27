/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use, useEffect, useState } from "react";
import EventList from "@/components/EventList";
import { IoMdSearch } from "react-icons/io";
import { FaCheck, FaFilter, FaPlus } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { Event } from "../../types/event";
import Image from "next/image";
import {
  fetchAllEvents,
  fetchAllTags,
  fetchAllEventTags,
  createEvent,
  addTagToEvent,
} from "../../api/event";
import { Tag } from "../../types/tag";
import { EventTag } from "../../types/eventTag";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { useUser } from "@/context/UserContext";
import { IoImagesOutline } from "react-icons/io5";
import ManageEventList from "@/components/ManageEventList";

export default function ManageEventPageClient() {
  const searchParams = useSearchParams();

  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [eventTags, setEventTags] = useState<EventTag[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");
  const [eventContent, setEventContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [registerStartDt, setRegisterStartDt] = useState<string>("");
  const [registerCloseDt, setRegisterCloseDt] = useState<string>("");
  const [selectedTagsForNewEvent, setSelectedTagsForNewEvent] = useState<
    number[]
  >([]);
  const [createEventError, setCreateEventError] = useState<string>("");
  //   const [TagNames, setFilterNames] = useState<string[]>([]);

  const [eventImage, setEventImage] = useState<File | undefined>(undefined);
  const [eventImagePreview, setEventImagePreview] = useState<string>("");

  const [isCrateEventBoxOpen, setIsCreateEventBoxOpen] = useState(false);

  const { user, setUser } = useUser();

  const router = useRouter();

  // const [user, setUser] = useState(null);

  const handleEventImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setEventImage(newFiles[0]);
    setEventImagePreview(newPreviews[0]);
  };

  const handlePostEvent = async () => {
    if (!eventContent.trim()) return;

    if (!user) {
      return;
    }

    if (!registerCloseDt || !registerStartDt || !startDate || !endDate) {
      setCreateEventError("Please fill in all date fields.");
      return;
    }

    createEvent(
      eventName,
      eventContent,
      startDate,
      endDate,
      registerStartDt,
      registerCloseDt,
      eventImage
    ).then((res) => {
      console.log("Event created:", res);
      setAllEvents((prevEvents) => [res.event as Event, ...prevEvents]);
      setFilteredEvents((prevEvents) => [res.event as Event, ...prevEvents]);

      // Insert Tags
      if (res.event && res.event.id) {
        selectedTagsForNewEvent.forEach((tagId) => {
          addTagToEvent(res.event.id, tagId);
        });
      }
    });
    // Reset
    setCreateEventError("");
    setEventName("");
    setSelectedTagsForNewEvent([]);
    setStartDate("");
    setEndDate("");
    setRegisterStartDt("");
    setRegisterCloseDt("");
    setEventContent("");
    setEventImage(undefined);
    setEventImagePreview("");
    setIsCreateEventBoxOpen(false);
  };

  useEffect(() => {
    const loadAllEvents = async () => {
      setIsLoadingEvent(true);
      const events = await fetchAllEvents();
      setAllEvents(events);
      setFilteredEvents(events);
      setIsLoadingEvent(false);
    };

    const loadAllTags = async () => {
      const allTags = await fetchAllTags();
      setAllTags(allTags);
    };

    const loadEventTags = async () => {
      const eventTags = await fetchAllEventTags();
      setEventTags(eventTags);
    };

    loadAllEvents();
    loadAllTags();
    loadEventTags();
  }, []);

  const debouncedSetFilteredEvents = useDebouncedCallback(() => {
    // console.log("Selected Tags Updated: ", selectedTags);
    // console.log("Search Text Updated: ", searchText);
    if (selectedTags.length === 0 && searchText === "") {
      setFilteredEvents(allEvents);
    } else {
      setFilteredEvents((prev) => {
        // Calculate these ONCE outside the filter loop
        const searchWords = searchText
          .toLowerCase()
          .split(/\s+/)
          .filter((word) => word.length > 0);
        const hasSearchText = searchWords.length > 0;
        const hasSelectedTags = selectedTags.length > 0;

        return allEvents.filter((event) => {
          // Early return if no filters applied
          if (!hasSearchText && !hasSelectedTags) return true;

          // Check tag filter first (often faster to check)
          if (hasSelectedTags) {
            const hasMatchingTag = eventTags.some(
              (et) => et.eventId === event.id && selectedTags.includes(et.tagId)
            );
            if (!hasMatchingTag) return false;
          }

          // Check text search
          if (hasSearchText) {
            const eventName = event.eventName?.toLowerCase() || "";
            const eventDescription =
              event.eventDescription?.toLowerCase() || "";
            const searchableText = `${eventName} ${eventDescription}`;

            // Use EVERY instead of SOME - usually what users expect
            const hasAllSearchWords = searchWords.every((word) =>
              searchableText.includes(word)
            );

            if (!hasAllSearchWords) return false;
          }

          return true;
        });
      });
    }
  }, 500);

  useEffect(() => {
    setIsLoadingEvent(true);
    debouncedSetFilteredEvents();
  }, [selectedTags, searchText]);

  const handleTagToggle = (tagId: number) => {
    if (tagId === 0) return; // tagId is undefined
    const isSelected = selectedTags.includes(tagId);
    setSelectedTags((prev) => {
      if (isSelected) {
        // Remove tag if already selected
        return prev.filter((id) => id !== tagId);
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
      {isCrateEventBoxOpen && (
        <div
          className="w-screen h-screen bg-black/50 fixed z-48 top-0 left-0"
          onClick={() => {
            setIsCreateEventBoxOpen(false);
          }}
        ></div>
      )}
      <div
        className={`fixed h-[90vh] bg-white z-50 top-[5vh] left-[20vw] flex flex-col rounded-xl  ${
          isCrateEventBoxOpen ? "block" : "hidden"
        } w-[60vw]`}
      >
        <div className="absolute py-5 w-full flex justify-end right-4 -top-1">
          <span
            className="text-base-400 p-2 rounded-full cursor-pointer hover:bg-black/10"
            onClick={() => {
              setIsCreateEventBoxOpen(false);
            }}
          >
            <RxCross2 className="text-xl font-bold" />
          </span>
        </div>
        <div className="flex gap-4 ml-12 mt-12 z-50">
          <div className="border border-base-300 rounded-md p-2 w-1/2">
            <textarea
              className="w-full ring-0 text-xl font-bold text-base-400 focus:outline-none resize-none leading-relaxed overflow-hidden"
              placeholder="Event name..."
              rows={1}
              value={eventName}
              onChange={(e) => {
                const textarea = e.target;
                setEventName(textarea.value);

                // auto resize
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
              }}
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap ml-8 mt-4">
          {eventImagePreview && (
            <div className="relative">
              <Image
                src={eventImagePreview}
                width={120}
                height={120}
                alt="post-image"
                className="rounded-md h-[120px] w-[120px] object-cover"
              />
              <span
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 cursor-pointer"
                onClick={() => {
                  setEventImage(undefined);
                  setEventImagePreview("");
                }}
              >
                <RxCross2 />
              </span>
            </div>
          )}
        </div>
        <div
          className="flex-1 mt-6 ml-13 cursor-text w-[95%] pr-[5%] overflow-scroll"
          onClick={() => {
            const input = document.getElementById("post-input");
            input?.focus();
          }}
        >
          <textarea
            className="text-xl placeholder:text-base-300 w-full focus:outline-none ring-0 resize-none leading-relaxed overflow-hidden"
            placeholder="Event details..."
            rows={1}
            id="post-input"
            value={eventContent}
            onChange={(e) => {
              const textarea = e.target;
              setEventContent(textarea.value);

              // auto resize
              textarea.style.height = "auto";
              textarea.style.height = textarea.scrollHeight + "px";
            }}
          />
        </div>
        <div className="flex flex-row items-center gap-4 flex-wrap">
          <div className="flex flex-col gap-2 ml-8">
            <div className="flex flex-row gap-2 items-center">
              <span className="font-rollingStone ">Register Duration </span>
              {createEventError && (
                <span>
                  <div className="text-sm text-red-600 font-normal mb-1">
                    ({createEventError})
                  </div>
                </span>
              )}
            </div>
            <div className="flex flex-row gap-4 items-center">
              {/* date select */}
              <input
                type="date"
                className="border border-base-300 rounded-full px-4 py-1 text-base-400/70 font-rollingStone text-sm cursor-pointer select-none"
                value={registerStartDt}
                onChange={(e) => setRegisterStartDt(e.target.value)}
              />
              <div className="font-bold text-base-400">to</div>
              <input
                type="date"
                className="border border-base-300 rounded-full px-4 py-1 text-base-400/70 font-rollingStone text-sm cursor-pointer select-none"
                value={registerCloseDt}
                onChange={(e) => setRegisterCloseDt(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 ml-8">
            <div className="flex flex-row gap-2 items-center">
              <span className="font-rollingStone ">Event Duration </span>
              {createEventError && (
                <span>
                  <div className="text-sm text-red-600 font-normal mb-1">
                    ({createEventError})
                  </div>
                </span>
              )}
            </div>
            <div className="flex flex-row gap-4 items-center">
              {/* date select */}
              <input
                type="date"
                className="border border-base-300 rounded-full px-4 py-1 text-base-400/70 font-rollingStone text-sm cursor-pointer select-none"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div className="font-bold text-base-400">to</div>
              <input
                type="date"
                className="border border-base-300 rounded-full px-4 py-1 text-base-400/70 font-rollingStone text-sm cursor-pointer select-none"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 ml-8">
          <div className="font-rollingStone">Select event tags</div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="flex flex-row gap-2 flex-1 flex-wrap items-center">
              {allTags.map((tag, index) =>
                tag.id ? (
                  <div
                    className={`border border-base-300 rounded-full font-bold text-base-400 px-2 py-1 text-sm cursor-pointer select-none flex gap-2 items-center ${
                      selectedTagsForNewEvent.includes(tag.id)
                        ? "bg-base-200 text-base-400 border-base-200"
                        : "hover:bg-black/10"
                    }`}
                    key={index}
                    onClick={() => {
                      if (!tag.id || !tag.tagName) return;
                      if (selectedTagsForNewEvent.includes(tag.id!)) {
                        setSelectedTagsForNewEvent(
                          selectedTagsForNewEvent.filter((f) => f !== tag.id)
                        );
                      } else {
                        setSelectedTagsForNewEvent([
                          ...selectedTagsForNewEvent,
                          tag.id,
                        ]);
                      }
                    }}
                  >
                    {selectedTagsForNewEvent.includes(tag.id) ? (
                      <FaCheck className="text-base-400" />
                    ) : null}
                    {tag.tagName}
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
        <div className="my-4 ml-6 flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div
              className="p-3 cursor-pointer hover:bg-black/5 rounded-full w-fit"
              onClick={() =>
                document.getElementById("eventImageInput")?.click()
              }
            >
              <IoImagesOutline className="text-2xl" />
            </div>
            <input
              type="file"
              id="eventImageInput"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleEventImageSelect}
            />
            <div className="bg-base-200 px-4 py-1 rounded-full text-base-400/70 font-rollingStone text-sm cursor-default select-none">{`Add an image`}</div>
          </div>
        </div>
        <div className="w-full flex justify-end py-4 border-t-[1px] border-t-base-300/30">
          <div
            className={`px-5 py-1.5 font-bold border border-base-300/30 rounded-full mr-2 cursor-pointer hover:bg-black/5`}
            onClick={() => setIsCreateEventBoxOpen(false)}
          >
            Cancel
          </div>
          <div
            className={`px-5 py-1.5 font-bold bg-base-200 rounded-full mr-7 ${
              eventContent.trim() && eventName.trim()
                ? "cursor-pointer hover:bg-base-300"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              if (eventContent.trim()) {
                handlePostEvent();
              }
            }}
          >
            Create
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-col w-full items-center">
        <div className="w-[80vw] flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-center">
            <div className="text-3xl font-rollingStone">Search for Events</div>
            {/* <div className="bg-white p-2">All</div> */}
            <div className="text-base-400 font-semibold">
              {filteredEvents.length} items
            </div>
          </div>
          <div className="w-full flex flex-row gap-4 items-center">
            <div className="flex-1 bg-white px-2 pl-4 flex flex-row items-center gap-8 focus-within:ring-2 rounded-sm border-[1px] border-base-300/50">
              <input
                type="text"
                className="flex-1 ring-0 outline-none text-base-400 placeholder:text-base-300/80 font-bold"
                placeholder="search event name"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="p-2 rounded-full cursor-pointer hover:bg-black/5">
                <IoMdSearch className="text-3xl rounded-full text-base-400" />
              </div>
            </div>
            <div
              className="bg-white px-6 py-2 text-center rounded-md flex flex-row items-center gap-2 font-bold text-base-400/80 border-[1px] border-base-300/50 hover:bg-black/5 cursor-pointer select-none"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter
                className={`text-lg ${
                  isFilterOpen ? "text-amber-800/50" : "text-base-300"
                } `}
              />
              Filter
            </div>
            <div
              className="bg-white px-6 py-2 text-center rounded-md flex flex-row items-center gap-2 font-bold text-base-400/80 border-[1px] border-base-300/50 hover:bg-black/5 cursor-pointer"
              onClick={() => setIsCreateEventBoxOpen(true)}
            >
              <FaPlus className="text-lg  text-amber-800" /> Add Event
            </div>
          </div>
          <div className="flex justify-center w-full flex-row gap-6">
            <div
              className={`flex flex-col md:w-full ${
                isFilterOpen ? "lg:w-[60vw]" : "lg:w-[80vw]"
              }`}
            >
              <ManageEventList events={filteredEvents} />
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
                    <div className="text-base-300 font-rollingStone">
                      Filter
                    </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
