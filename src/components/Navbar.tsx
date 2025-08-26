"use client";

import { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { RxMoon } from "react-icons/rx";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // Sync theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-40 bg-white dark:bg-base-500 shadow-md
        dark:text-base-100 text-base-500 flex justify-center items-center pt-1 gap-20
      `}
    >
      <div className="flex gap-2 items-center mb-1">
        <div className="p-2 font-bold text-base-400 rounded-md cursor-pointer">
          TeamUp-Space
        </div>
        <div className="flex gap-2 px-2 w-72 border border-base-300 rounded-full py-1.5 items-center">
          <IoMdSearch />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-full text-sm"
          />
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center">
        <div className="hidden lg:flex flex-col py-2 border-b-2 cursor-pointer items-center px-6">
          <IoHomeSharp className="text-xl text-base-500" />
          <div className="text-sm  text-base-400">Home</div>
        </div>
        <div className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500">
          <FaUserFriends className="text-xl" />
          <div className="text-sm">Friends</div>
        </div>
        <div className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-6 text-base-400/70 hover:text-base-500">
          <MdEmojiEvents className="text-xl " />
          <div className="text-sm  ">Events</div>
        </div>
        <div className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500">
          <AiOutlineMessage className="text-xl " />
          <div className="text-sm  ">Messages</div>
        </div>
        <div className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500">
          <IoNotifications className="text-xl " />
          <div className="text-sm  ">Notification</div>
        </div>
        <div className="flex flex-col border-b-2 border-b-white items-center px-8 border-r border-r-base-200 ">
          <div className="flex flex-col px-4 pt-1 hover:bg-black/10 cursor-pointer items-center rounded-md">
            <Image
              src={"/golang.webp"}
              width={100}
              height={100}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-7 w-7"
            />
            <div className="flex items-center">
              <div className="text-sm  text-base-400">Me</div>
              <FaCaretDown className="text-base-400" />
            </div>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md mb-1 ml-8"
        >
          {isDark ? (
            <BsSun className="text-amber-400 text-xl" />
          ) : (
            <RxMoon className="text-indigo-500 text-xl" />
          )}
        </button>
      </div>
    </nav>
  );
}
