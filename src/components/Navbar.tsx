/* eslint-disable react-hooks/rules-of-hooks */
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
import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/api/auth";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import ChatList from "./ChatList";
import NotificationList from "./NotificationList";

export default function Navbar() {
  const path = usePathname();
  const { user, logout, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    signOut().then(() => {
      window.location.href = "/sign-in";
    });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      console.log("fetch user info from cookie");
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="));
        console.log("token", token);
        if (!token) {
          setUser(undefined);
          return;
        } else {
          // token is jwtsecret
          const userInfo = JSON.parse(atob(token.split(".")[1]));
          setUser(userInfo.user_info);
        }
      } catch (error) {
        setUser(undefined);
      } finally {
        // setIsLoadingEvent(false);
      }
    };
    if (!user) {
      fetchUserInfo();
    }
  }, [setUser, user]);

  if (path === "/sign-in" || path === "/sign-up") {
    return null;
  }

  return (
    <>
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
          <div
            className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-6 text-base-400/70 hover:text-base-500"
            onClick={() => router.push("/")}
          >
            <IoHomeSharp className="text-xl " />
            {/* make this text can't select */}
            <div className="text-sm select-none">Home</div>
          </div>
          <div
            className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500"
            onClick={() => router.push("/friend")}
          >
            <FaUserFriends className="text-xl" />
            <div className="text-sm select-none">Friends</div>
          </div>
          <div
            className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-6 text-base-400/70 hover:text-base-500"
            onClick={() => router.push("/event")}
          >
            <MdEmojiEvents className="text-xl" />
            <div className="text-sm select-none">Events</div>
          </div>
          <div
            className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500"
            onClick={() => {
              setIsChatOpen(!isChatOpen);
              setIsNotificationOpen(false);
            }}
          >
            <AiOutlineMessage className="text-xl " />
            <div className="text-sm select-none">Messages</div>
          </div>
          <div
            className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500"
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsChatOpen(false);
            }}
          >
            <IoNotifications className="text-xl " />
            <div className="text-sm select-none">Notification</div>
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
                  className={`absolute top-14 right-0 min-w-[160px] bg-white dark:bg-base-500 shadow-lg rounded-md border border-base-200 ${
                    isMenuOpen ? "" : "hidden"
                  } transition-opacity z-50`}
                >
                  <div className="flex flex-col py-2">
                    <Link
                      className="px-4 py-2 text-base-400 hover:bg-black/5 cursor-pointer"
                      href={"/profile"}
                    >
                      Profile
                    </Link>
                    <div
                      className="px-4 py-2 text-base-400 hover:bg-black/5 cursor-pointer"
                      onClick={() => router.push("/event/saved")}
                    >
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
      <div
        className={`fixed w-[25%] h-[90%] right-3 bottom-0 bg-white z-40 rounded-t-md border-[1px] border-base-300/50  transition-all duration-300 flex flex-col shadow-lg shadow-base-400/30 ${
          isChatOpen ? "max-h-full" : "max-h-14"
        } ${path == "/friend" ? "hidden" : ""}  `}
      >
        <div
          className="flex flex-row justify-between w-full items-center my-3 cursor-pointer border-b-[1px] border-base-300/30 pb-4"
          onClick={() => {
            setIsChatOpen(!isChatOpen);
            setIsNotificationOpen(false);
          }}
        >
          <div className="flex flex-row gap-3 ml-4 font-rollingStone items-center">
            <Image
              src={"/golang.webp"}
              width={100}
              height={100}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-7 w-7"
            />
            <div className="text-base-400">Messaging</div>
          </div>
          <div className="text-lg text-base-400 mr-4">
            <FaChevronUp />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex px-2 items-center justify-center mb-2">
            <div className="flex flex-row bg-base-100/50 w-full items-center rounded-md">
              <IoMdSearch className="text-base-400 ml-4 text-lg" />
              <input
                type="text"
                placeholder="Serach messages"
                className="pl-2 ring-0 focus:outline-0 rounded-md p-1 py-2 "
              />
            </div>
          </div>
          <div className="flex flex-row w-full border-b-[1px] border-b-base-300/30">
            <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-lime-700 cursor-pointer text-lime-700 font-bold">
              Chat
            </div>
            <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-transparent cursor-pointer text-base-300 font-bold">
              Friend
            </div>
            <div className="flex-1 py-1 flex items-center justify-center border-b-2 border-b-transparent cursor-pointer text-base-300 font-bold">
              Group
            </div>
          </div>
        </div>
        <ChatList />
      </div>
      <div
        className={`fixed w-[30%] h-[80%] right-6 bg-white z-40 rounded-md pb-4 border-[1px] border-base-300/50  transition-all duration-300 flex flex-col items-center shadow-lg shadow-base-400/30  ${
          isNotificationOpen ? "top-[10%]" : "-top-[100%]"
        } `}
      >
        <div
          className="flex flex-row justify-between w-full items-center my-3 cursor-pointer"
          onClick={() => {
            setIsChatOpen(false);
            setIsNotificationOpen(!isNotificationOpen);
          }}
        >
          <div className="flex flex-row gap-2 ml-4 font-rollingStone items-center">
            <div className="mb-1">
              <IoNotifications className="text-base-400" />
            </div>
            <div className="text-base-400 text-lg">Notifications</div>
          </div>
          <div className="text-lg text-base-400 mr-4">
            {isChatOpen ? <FaChevronDown /> : <FaChevronUp />}
          </div>
        </div>
        <NotificationList />
      </div>
    </>
  );
}
