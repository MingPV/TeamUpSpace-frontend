/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import ManageEventList from "@/components/ManageEventList";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { Event } from "@/app/types/event";
import { fetchAllEvents } from "../../api/event";
import { useUser } from "@/context/UserContext";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { IoImagesOutline } from "react-icons/io5";

export default function ManageEvent() {
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isCrateEventBoxOpen, setIsCreateEventBoxOpen] = useState(false);
  const [eventContent, setEventContent] = useState("");

  const { user, setUser } = useUser();

  // const [user, setUser] = useState(null);

  useEffect(() => {
    const loadAllEvents = async () => {
      setIsLoadingEvent(true);
      const events = await fetchAllEvents();
      setEvents(events);
      setIsLoadingEvent(false);
    };
    loadAllEvents();
  }, []);

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
        className={`fixed h-[75vh] bg-white z-50 top-[5vh] left-[20vw] flex flex-col rounded-xl  ${
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
        <div className="flex gap-4 ml-12 mt-8">
          <Image
            src={user?.profile?.profile_url || "/golang.webp"}
            width={200}
            height={200}
            alt="profile-pic"
            style={{ objectFit: "cover" }}
            className="rounded-full h-16 w-16"
          />
          <div className="flex flex-col">
            <div className="font-bold text-2xl">
              {user?.profile.display_name}
            </div>
            <div className="text-sm">Post to Anyone</div>
          </div>
        </div>
        <div
          className="flex-1 mt-12 ml-8 cursor-text w-[95%] pr-[5%] overflow-scroll"
          onClick={() => {
            const input = document.getElementById("post-input");
            input?.focus();
          }}
        >
          <textarea
            className="text-xl placeholder:text-base-300 w-full focus:outline-none ring-0 resize-none leading-relaxed overflow-hidden"
            placeholder="Event details..."
            rows={1}
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
        <div className="my-4 ml-6 flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <div className="p-3 cursor-pointer hover:bg-black/5 rounded-full w-fit">
              <IoImagesOutline className="text-2xl" />
            </div>
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
              eventContent.trim()
                ? "cursor-pointer hover:bg-base-300"
                : "opacity-50 cursor-not-allowed"
            }`}
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
              <ManageEventList events={events} />
            </div>
            <div
              className={`flex flex-row md:w-full lg:w-[20vw] ${
                isFilterOpen ? "" : "hidden"
              }`}
            >
              <div className="bg-white w-full pl-6 pr-2 py-6 flex flex-col gap-12 rounded-sm h-fit sticky top-20 shadow-md">
                {/* Filter by A */}
                <div className="flex flex-col">
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
                </div>
                {/* Filter by B */}
                <div className="flex flex-col">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
