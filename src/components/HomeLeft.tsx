import React from "react";
import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useUser } from "@/context/UserContext";

export default function HomeLeft() {
  const { user } = useUser();
  const router = useRouter();

  if (!user) {
    return (
      <div className="w-full flex flex-col items-end gap-2">
        <div className="w-2/3 flex flex-col rounded-lg bg-white">
          <div className="flex flex-col gap-1 px-4 py-6">
            <div className="text-base-400 font-bold">
              Welcome to TeamUpSpace
            </div>
            <div className="text-base-300 text-sm">Your next team awaits.</div>
            <div className="my-1"></div>
            <div className="flex flex-row justify-between text-base-400/80">
              <Link
                className="flex-1 mx-2 py-1 border-[1px] border-base-300 rounded-xs hover:bg-black/5 text-center shadow-sm"
                href={"/sign-in"}
              >
                Sign In
              </Link>
              <Link
                className="flex-1 mx-2 py-1 hover:bg-black/5 text-center"
                href={"/sign-up"}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="w-2/3 flex flex-col rounded-lg bg-white">
          <div className="flex flex-col m-5 gap-5">
            <div className="flex gap-2 items-center">
              <FaBookmark />
              <div
                className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer"
                onClick={() => router.push("/sign-in")}
              >
                Saved Events
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaUserFriends />
              <div
                className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer"
                onClick={() => router.push("/sign-in")}
              >
                Friends
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <MdEmojiEvents />
              <div
                className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer"
                onClick={() => router.push("/event")}
              >
                Events
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-end gap-2">
      <div className="w-2/3 flex flex-col rounded-lg bg-white">
        <Image
          src={user?.profile?.background_url || "/golang.webp"}
          width={100}
          height={100}
          alt="profile-pic"
          style={{ objectFit: "cover" }}
          className="w-full h-18 rounded-t-lg"
        />
        <div className="flex flex-col mx-5 relative -top-8 gap-1">
          <div className="flex justify-between items-center">
            <Image
              src={user?.profile?.profile_url || "/golang.webp"}
              width={200}
              height={200}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-[86px] w-[86px] border-3 border-white"
            />
            <div className="relative top-2 left-2">
              <FaPencilAlt
                className="text-sm text-base-300 cursor-pointer hover:text-base-500"
                onClick={() => {
                  router.push("/profile");
                }}
              />
            </div>
          </div>
          <div className="flex flex-col relative top-1 gap-1">
            {user?.profile?.display_name ? (
              <div className="flex flex-row gap-2 items-center">
                <div className="text-xl font-bold">
                  {user.profile.display_name}
                </div>
                {user?.is_ban && (
                  <div className="text-red-600 font-bold">(Banned)</div>
                )}
              </div>
            ) : (
              <div className="text-xl font-bold opacity-50">Unknown</div>
            )}
            {user?.profile?.major ? (
              <div className="text-sm">{user.profile.major}</div>
            ) : (
              <div className="text-sm opacity-50">major not set</div>
            )}
            {user?.profile?.location ? (
              <div className="text-sm text-base-400">
                {user.profile.location}
              </div>
            ) : (
              <div className="text-sm text-base-400 opacity-50">
                location not set
              </div>
            )}
            {user?.profile?.university ? (
              <div className="flex flex-row gap-1 items-center relative top-1">
                <Image
                  src={"/U.jpg"}
                  width={16}
                  height={16}
                  alt="profile-pic"
                  style={{ objectFit: "cover" }}
                  className="rounded-lg h-5 w-5 border-white"
                />
                <div className="font-bold text-sm">
                  {user.profile.university}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col rounded-lg bg-white">
        <div className="flex flex-col m-5 gap-5">
          <div className="flex gap-2 items-center">
            <FaBookmark />
            <div
              className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer"
              onClick={() => router.push("/event?saved=true")}
            >
              Saved Events
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <FaUserFriends />
            <div
              className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer"
              onClick={() => router.push("/friend-group")}
            >
              Friends
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <MdEmojiEvents />
            <div
              className="text-sm font-bold hover:underline underline-offset-3 cursor-pointer"
              onClick={() => router.push("/event")}
            >
              Events
            </div>
          </div>
          <div
            className="flex gap-2 items-center justify-center bg-amber-800 hover:bg-amber-900 cursor-pointer py-2 rounded-sm"
            onClick={() => router.push("/request")}
          >
            <div className="text-sm font-bold text-white">
              Check Team Requests
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
