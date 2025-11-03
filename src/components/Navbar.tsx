"use client";

import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineFullscreen, AiOutlineMessage } from "react-icons/ai";
import { FaCaretDown } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import Image from "next/image";
import MobileNav from "./MobileNavbar";
import Switch from "./Switch";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchUserInfo, signOut } from "@/app/api/auth";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import ChatList from "./ChatList";
import NotificationList from "./NotificationList";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import { GoScreenFull } from "react-icons/go";
import { MdLocalPostOffice } from "react-icons/md";
import { BsChatDotsFill } from "react-icons/bs";

import {
  getAllNotifications,
  markNotificationAsRead,
} from "@/app/api/notification";
import { Notification } from "@/app/types/notification";

export default function Navbar() {
  const path = usePathname();
  const { user, logout, setUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("friend");
  const [searchFriend, setSearchFriend] = useState<string>("");

  const [notification, setNotification] = useState<Notification[]>([]);
  const [unReadCount, setUnreadCount] = useState(0);

  const handleLogout = () => {
    logout();
    signOut().then(() => {
      window.location.href = "/sign-in";
    });
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        // token is jwtsecret
        const res = await fetchUserInfo();
        if (res.ok) {
          const userInfo = await res.json();
          setUser(userInfo);
        }
      } catch (error) {
        setUser(undefined);
        console.error("Error fetching user info:", error);
      } finally {
        // setIsLoadingEvent(false);
      }
    };
    if (!user) {
      console.log("Loading user info...");
      loadUserInfo();
    }
  }, [setUser, user]);

  useEffect(() => {
    const loadNotification = async () => {
      if (!user) return;
      const res = await getAllNotifications(user.id);
      setNotification(res);
      const unRead = res.filter((notif: Notification) => !notif.isRead).length;
      setUnreadCount(unRead);
      console.log("Unread notifications:", unRead);
      console.log("All notifications:", res);
    };
    loadNotification();
  }, [user]);

  if (path === "/sign-in" || path === "/sign-up") {
    return null;
  }

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 w-full z-40 bg-white dark:bg-base-500 shadow-md
        dark:text-white text-base-500 flex justify-between sm:justify-center items-center gap-20 select-none
      `}
      >
        <div className="flex gap-2 items-center px-2 ">
          <div
            className="p-2 font-bold text-base-400 rounded-md dark:text-base-100 cursor-pointer"
            onClick={() => {
              if (user?.is_admin) {
                router.push("/admin-manage");
              } else {
                router.push("/");
              }
            }}
          >
            TeamUp-Space
          </div>
          <div className="hidden sm:flex gap-2 px-2 w-72 border border-base-300 rounded-full py-1.5 items-center opacity-0 cursor-none">
            <IoMdSearch />
            <input
              type="text"
              placeholder="Search"
              disabled
              className="bg-transparent focus:outline-none w-full text-sm"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          {user?.is_admin ? (
            <>
              <div
                className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 dark:hover:border-b-base-100 cursor-pointer items-center px-6 text-base-400/70 hover:text-base-500"
                onClick={() => router.push("/admin-manage")}
              >
                <IoHomeSharp className="text-xl dark:text-base-100 " />
                {/* make this text can't select */}
                <div className="text-sm select-none dark:text-base-100">
                  Home
                </div>
              </div>
              <div
                className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 dark:hover:border-b-base-100 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500"
                onClick={() => router.push("/admin-manage/report")}
              >
                <FaUserFriends className="text-xl dark:text-base-100" />
                <div className="text-sm select-none dark:text-base-100">
                  Manage Report
                </div>
              </div>
              <div
                className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 dark:hover:border-b-base-100 cursor-pointer items-center px-6 text-base-400/70 hover:text-base-500"
                onClick={() => router.push("/admin-manage/event")}
              >
                <MdEmojiEvents className="text-xl dark:text-base-100" />
                <div className="text-sm select-none dark:text-base-100">
                  Manage Event
                </div>
              </div>
              {user && (
                <div
                  className="hidden lg:flex flex-col p-3 rounded-full bg-black/10 hover:bg-black/20 cursor-pointer items-center text-base-400/70 hover:text-base-500 mx-1 ml-10  relative"
                  onClick={() => {
                    setIsChatOpen(!isChatOpen);
                    setIsNotificationOpen(false);
                  }}
                >
                  <div className="absolute -top-1 -right-2 bg-amber-800 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    1
                  </div>
                  <BsChatDotsFill className="text-xl dark:text-base-100 " />
                  {/* <div className="text-sm select-none dark:text-base-100">Messages</div> */}
                </div>
              )}

              {user && (
                <div
                  className="hidden lg:flex flex-col p-2.5 rounded-full bg-black/10 hover:bg-black/20 cursor-pointer items-center text-base-400/70 hover:text-base-500 mx-1 relative"
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsChatOpen(false);
                    setUnreadCount(0);
                    if (user && user.id) {
                      console.log(
                        "Marking notifications as read for user ID:",
                        user.id
                      );
                      markNotificationAsRead(user.id);
                    }
                  }}
                >
                  {unReadCount != 0 && (
                    <div className="absolute -top-1 -right-2 bg-amber-800 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {unReadCount}
                    </div>
                  )}

                  <IoNotifications className="text-xl dark:text-base-100 " />
                  {/* <div className="text-sm select-none dark:text-base-100">Notification</div> */}
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 dark:hover:border-b-base-100 cursor-pointer items-center px-6 text-base-400/70 hover:text-base-500"
                onClick={() => router.push("/")}
              >
                <IoHomeSharp className="text-xl dark:text-base-100 " />
                {/* make this text can't select */}
                <div className="text-sm select-none dark:text-base-100">
                  Home
                </div>
              </div>
              <div
                className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 dark:hover:border-b-base-100 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500"
                onClick={() => router.push("/friend-group")}
              >
                <FaUserFriends className="text-xl dark:text-base-100" />
                <div className="text-sm select-none dark:text-base-100">
                  Friend
                </div>
              </div>
              <div
                className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 dark:hover:border-b-base-100 cursor-pointer items-center px-6 text-base-400/70 hover:text-base-500"
                onClick={() => router.push("/event")}
              >
                <MdEmojiEvents className="text-xl dark:text-base-100" />
                <div className="text-sm select-none dark:text-base-100">
                  Event
                </div>
              </div>
              <div
                className="hidden lg:flex flex-col py-2 border-b-2 border-b-transparent hover:border-b-base-500 dark:hover:border-b-base-100 cursor-pointer items-center px-2 text-base-400/70 hover:text-base-500"
                onClick={() => router.push("/request")}
              >
                <MdLocalPostOffice className="text-xl dark:text-base-100" />
                <div className="text-sm select-none dark:text-base-100">
                  Team Request
                </div>
              </div>
              {user && (
                <div
                  className="hidden lg:flex flex-col p-3 rounded-full bg-black/10 hover:bg-black/20 cursor-pointer items-center text-base-400/70 hover:text-base-500 mx-1 ml-10  relative"
                  onClick={() => {
                    setIsChatOpen(!isChatOpen);
                    setIsNotificationOpen(false);
                  }}
                >
                  {/* <div className="absolute -top-1 -right-2 bg-amber-800 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    1
                  </div> */}
                  <BsChatDotsFill className="text-xl dark:text-base-100 " />
                  {/* <div className="text-sm select-none dark:text-base-100">Messages</div> */}
                </div>
              )}

              {user && (
                <div
                  className="hidden lg:flex flex-col p-2.5 rounded-full bg-black/10 hover:bg-black/20 cursor-pointer items-center text-base-400/70 hover:text-base-500 mx-1 relative"
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsChatOpen(false);
                    setUnreadCount(0);
                    if (user && user.id) {
                      console.log(
                        "Marking notifications as read for user ID:",
                        user.id
                      );
                      markNotificationAsRead(user.id);
                    }
                  }}
                >
                  {unReadCount != 0 && (
                    <div className="absolute -top-1 -right-2 bg-amber-800 text-white font-bold rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {unReadCount}
                    </div>
                  )}

                  <IoNotifications className="text-xl dark:text-base-100 " />
                  {/* <div className="text-sm select-none dark:text-base-100">Notification</div> */}
                </div>
              )}
            </>
          )}

          <div className="hidden lg:flex flex-col border-b-2 border-b-white items-center pl-2 pr-8 border-r border-r-base-200 dark:border-base-500 relative">
            {user ? (
              <div className="flex flex-col px-0 md:px-4 items-center rounded-md">
                <div
                  className="flex flex-col items-center px-4 pt-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 dark:text-base-100 cursor-pointer"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Image
                    src={user?.profile?.profile_url || "/golang.webp"}
                    width={100}
                    height={100}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-7 w-7"
                  />
                  <div className="flex items-center">
                    <div className="text-sm text-base-400 dark:text-base-100">
                      Me
                    </div>
                    <FaCaretDown className="text-base-400 ml-1 dark:text-base-100" />
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
                      onClick={() => router.push("/event?saved=true")}
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
        className={`fixed w-[25%] h-[90%] right-3 bottom-0 bg-white dark:bg-base-400 z-40 rounded-t-md border-[1px] border-base-300/50  transition-all duration-300 flex flex-col shadow-lg shadow-base-400/30 ${
          isChatOpen ? "max-h-full" : "max-h-14"
        } ${path == "/chat" ? "hidden" : ""}  `}
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
              src={user?.profile?.profile_url || "/golang.webp"}
              width={100}
              height={100}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-7 w-7"
            />
            <div className="text-base-400 dark:text-base-100">Messaging</div>
            <div
              className="p-1 border border-base-300/30 text-base-400 dark:text-base-100 rounded-md hover:bg-amber-800 hover:text-white flex items-center gap-1 z-41"
              onClick={(e) => {
                e.stopPropagation();
                router.push("/chat");
              }}
            >
              Full screen{" "}
              <GoScreenFull className="font-bold dark:text-base-400" />
            </div>
          </div>
          <div className="text-lg text-base-400 mr-4 dark:text-base-100">
            <FaChevronUp />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full flex px-2 items-center justify-center mb-2">
            <div className="flex flex-row bg-base-100/50 dark:bg-base-500 w-full items-center rounded-md">
              <IoMdSearch className="text-base-400 dark:text-base-100 ml-4 text-lg" />
              <input
                type="text"
                placeholder="search messages"
                value={searchFriend}
                onChange={(e) => setSearchFriend(e.target.value)}
                className="pl-2 ring-0 focus:outline-0 rounded-md p-1 py-2 "
              />
            </div>
          </div>
          <div className="flex flex-row w-full border-b-[1px] border-b-base-300/30 mt-5">
            <div
              className={`flex-1 py-1 flex items-center justify-center border-b-2 ${
                selectedTab == "chat"
                  ? "border-b-lime-700 dark:border-b-lime-600 text-lime-700 dark:text-lime-600"
                  : "text-base-300 border-b-transparent hover:text-base-400 hover:bg-black/5"
              }  cursor-pointer font-bold select-none`}
              onClick={() => setSelectedTab("chat")}
            >
              Chat
            </div>
            <div
              className={`flex-1 py-1 flex items-center justify-center border-b-2 ${
                selectedTab == "friend"
                  ? "border-b-lime-700 dark:border-b-lime-600 text-lime-700 dark:text-lime-600"
                  : "text-base-300 border-b-transparent hover:text-base-400 hover:bg-black/5"
              }  cursor-pointer font-bold select-none`}
              onClick={() => setSelectedTab("friend")}
            >
              Friend
            </div>
            <div
              className={`flex-1 py-1 flex items-center justify-center border-b-2 ${
                selectedTab == "group"
                  ? "border-b-lime-700 dark:border-b-lime-600 text-lime-700 dark:text-lime-600"
                  : "text-base-300 border-b-transparent hover:text-base-400 hover:bg-black/5"
              }  cursor-pointer font-bold select-none`}
              onClick={() => setSelectedTab("group")}
            >
              Group
            </div>
          </div>
        </div>
        <ChatList selectedTab={selectedTab} searchFriend={searchFriend} />
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
            if (user && user.id) {
              console.log(
                "Marking notifications as read for user ID:",
                user.id
              );
              markNotificationAsRead(user.id);
            }
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
        <NotificationList user={user} notifications={notification} />
      </div>
    </>
  );
}
