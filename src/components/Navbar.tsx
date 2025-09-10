/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import MobileNav from "./MobileNavbar";
import Switch from "./Switch";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/api/auth";
import { useRouter } from "next/navigation";

export default function Navbar({ user }: { user: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    signOut().then(() => {
      window.location.href = "/sign-in";
    });
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-40 bg-white dark:bg-base-500 shadow-md
        dark:text-base-100 text-base-500 flex justify-between sm:justify-center items-center gap-20
      `}
    >
      <div className="flex gap-2 items-center px-2 ">
        <div
          className="p-2 font-bold text-base-400 rounded-md cursor-pointer"
          onClick={() => router.push("/")}
        >
          TeamUp-Space
        </div>
        <div className="hidden sm:flex gap-2 px-2 w-72 border border-base-300 rounded-full py-1.5 items-center">
          <IoMdSearch />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none w-full text-sm"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center items-center">
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
        <div className="hidden lg:flex flex-col border-b-2 border-b-white items-center px-8 border-r border-r-base-200 relative">
          {user ? (
            <div className="flex flex-col px-0 md:px-4 items-center rounded-md">
              <div
                className="flex flex-col items-center px-4 pt-1 rounded-md hover:bg-black/10 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Image
                  src={"/golang.webp"}
                  width={100}
                  height={100}
                  alt="profile-pic"
                  style={{ objectFit: "cover" }}
                  className="rounded-full h-7 w-7"
                />
                <div className="flex items-center">
                  <div className="text-sm text-base-400">Me</div>
                  <FaCaretDown className="text-base-400 ml-1" />
                </div>
              </div>
              {/* Dropdown */}
              <div
                className={`absolute top-14 right-0 min-w-[160px] bg-white dark:bg-base-500 shadow-lg rounded-md border border-base-200 opacity-0 ${
                  isMenuOpen ? "opacity-100" : null
                } transition-opacity z-50`}
              >
                <div className="flex flex-col py-2">
                  <Link
                    className="px-4 py-2 text-base-400 hover:bg-black/5 cursor-pointer"
                    href={"/profile"}
                  >
                    Profile
                  </Link>
                  <div className="px-4 py-2 text-base-400 hover:bg-black/5 cursor-pointer">
                    Saved Events
                  </div>
                  <div
                    className="px-4 py-2 text-red-500 hover:bg-black/5 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="opacity-0 h-8">|</div>
          )}
        </div>

        <div className="flex flex-col items-center px-2 text-base-400/70 hover:text-base-500 scale-60">
          <Switch />
        </div>

        <div className="lg:hidden p-0 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md mb-1 sm:ml-8 text-2xl flex items-center justify-center">
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
