/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import HomeLeft from "@/components/HomeLeft";
import HomeRight from "@/components/HomeRight";
import Navbar from "@/components/Navbar";
import PostBox from "@/components/PostBox";
import PostCreateBox from "@/components/PostCreateBox";
import { IoCaretDownSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import EventList from "@/components/EventList";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { Event } from "../types/event";
import { fetchAllEvents } from "../api/event";

export default function Home() {
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  const [user, setUser] = useState(null);

  useEffect(() => {
    //load cookie "token" to get user info
    const fetchUserInfo = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));
        if (!token) {
          setUser(null);
          return;
        } else {
          // token is jwtsecret
          const userInfo = JSON.parse(atob(token.split(".")[1]));
          setUser(userInfo);
          console.log(userInfo);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoadingEvent(false);
      }
    };
    const loadAllEvents = async () => {
      setIsLoadingEvent(true);
      const events = await fetchAllEvents();
      setEvents(events);
      setIsLoadingEvent(false);
    };
    fetchUserInfo();
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
      <Navbar user={user} />
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
            <div className="bg-white px-6 py-2 text-center rounded-md flex flex-row items-center gap-2 font-bold text-base-400/80 border-[1px] border-base-300/50 hover:bg-black/5 cursor-pointer">
              <FaFilter className="text-lg text-amber-800/50" />
              Filter
            </div>
            <div className="bg-white px-6 py-2 text-center rounded-md flex flex-row items-center gap-2 font-bold text-base-400/80 border-[1px] border-base-300/50 hover:bg-black/5 cursor-pointer">
              <FaBookmark className="text-lg  text-amber-800" /> Saved Events
            </div>
          </div>
          <div className="flex justify-center w-full flex-row gap-6">
            <div className="flex flex-col md:w-full lg:w-[60vw]">
              <EventList events={events} />
            </div>
            <div className="hidden md:flex flex-row md:w-full lg:w-[20vw]">
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
