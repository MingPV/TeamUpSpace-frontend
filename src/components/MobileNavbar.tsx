import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { IoHomeSharp } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import Image from "next/image";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="">
      {/* Toggle button */}
      <div
        onClick={toggleSidebar}
        className="p-2  hover:bg-black/10 dark:hover:bg-white/10 rounded-md ml-4 flex items-center justify-center text-2xl"
      >
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          {isOpen ? <RxCross1 /> : <GiHamburgerMenu />}
        </span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-1/2 bg-white shadow-lg transform transition-transform duration-300 lg:hidden z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-4 " onClick={toggleSidebar}>
          <div className="flex w-full items-end justify-end">
            {isOpen ? <RxCross1 /> : <GiHamburgerMenu />}
          </div>

          <div className="flex flex-row py-2 border-b-2 cursor-pointer items-center justify-start ">
            <IoHomeSharp className="text-xl text-base-500" />
            <div className="text-sm px-3  text-base-400">Home</div>
          </div>
          <div className="flex flex-row py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center justify-start  text-base-400/70 hover:text-base-500">
            <FaUserFriends className="text-xl" />
            <div className="text-sm px-3">Friends</div>
          </div>
          <div className="flex flex-row py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center justify-start  text-base-400/70 hover:text-base-500">
            <MdEmojiEvents className="text-xl " />
            <div className="text-sm px-3  ">Events</div>
          </div>
          <div className="flex flex-row py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center justify-start  text-base-400/70 hover:text-base-500">
            <AiOutlineMessage className="text-xl " />
            <div className="text-sm px-3  ">Messages</div>
          </div>
          <div className="flex flex-row py-2 border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center justify-start  text-base-400/70 hover:text-base-500">
            <IoNotifications className="text-xl " />
            <div className="text-sm px-3  ">Notification</div>
          </div>
          <div className="flex flex-row  border-b-2 border-b-transparent hover:border-b-base-500 cursor-pointer items-center justify-start  text-base-400/70 hover:text-base-500">
            <div className="flex flex-row px-0 pt-1 hover:bg-black/10 cursor-pointer items-center rounded-md">
              <Image
                src={"/golang.webp"}
                width={100}
                height={100}
                alt="profile-pic"
                style={{ objectFit: "cover" }}
                className="rounded-full h-7 w-7"
              />
              <div className="flex items-center">
                <div className="text-sm px-3 ">Profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
        />
      )}
    </div>
  );
}
