/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileTopMe({ user }: { user: any }) {
  const router = useRouter();

  if (!user) {
    return <div>not found</div>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="flex flex-col w-full rounded-lg bg-white">
        <Image
          src={"/golang.webp"}
          width={300}
          height={300}
          alt="bg-profile-pic"
          style={{ objectFit: "cover" }}
          className="w-full h-52 rounded-t-lg"
        />
        <div className="flex flex-col mx-8 relative -top-8 gap-2">
          <div className="flex items-center gap-8">
            <Image
              src={user?.profile?.profile_url || "/golang.webp"}
              width={150}
              height={150}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-[150px] w-[150px] border-4 border-white"
            />
            <div className="relative top-2 flex flex-row gap-2 items-end">
              <div className="mr-8">
                {user?.profile?.display_name ? (
                  <div className="text-4xl font-bold">
                    {user.profile.display_name}
                  </div>
                ) : (
                  <div className="text-xl font-bold opacity-50">Unknown</div>
                )}
              </div>
              <div className="text-lg text-base-400 font-bold">47 friends</div>
              <div className="text-lg text-base-400 font-bold">4 posts</div>
            </div>

            <div className="flex-1 flex justify-end">
              <FaPencilAlt
                className="text-xl text-base-300 cursor-pointer hover:text-base-500"
                onClick={() => {}}
              />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col relative top-1 gap-2 ml-4">
              <div className="">username: mingpv</div>
              {user?.profile?.faculty ? (
                <div className="text-xl">{user.profile.faculty}</div>
              ) : (
                <div className="text-xl opacity-50">faculty not set</div>
              )}
              {user?.profile?.location ? (
                <div className="text-xl text-base-400">
                  {user.profile.location}
                </div>
              ) : (
                <div className="text-xl text-base-400 opacity-50">
                  location not set
                </div>
              )}
              {user?.profile?.university ? (
                <div className="flex flex-row gap-1 items-center relative top-1">
                  <Image
                    src={"/golang.webp"}
                    width={50}
                    height={50}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-lg h-8 w-8 border-white"
                  />
                  <div className="font-bold text-lg">
                    {user.profile.university}
                  </div>
                  {/* <div className="relative -top-16 ml-6">
                      <FaPencilAlt
                        className="text-xl text-base-300 cursor-pointer hover:text-base-500"
                        onClick={() => {
                          router.push("/profile");
                        }}
                      />
                    </div> */}
                </div>
              ) : null}

              <div className="w-full mt-4 flex flex-row gap-2">
                <div className="px-4 py-1 text-base-500 bg-base-200 font-bold rounded-full hover:bg-base-300/80 cursor-pointer">
                  Get Resume
                </div>
                <div className="px-4 py-1 text-amber-800/90 font-bold rounded-full border-[1px] border-amber-800/90 hover:bg-amber-800/20 cursor-pointer">
                  Check Team Requests (0)
                </div>
              </div>
            </div>
            <div className="flex-1 flex xl:justify-end mt-4 xl:mt-0">
              <div className="w-fit flex flex-col gap-2 border-[1px] border-base-200 rounded-md py-2 px-4">
                <div className="ml-2 mt-2 flex flex-row justify-between items-center">
                  <div className="font-bold">Friend (47 friends)</div>
                  <div className="font-bold hover:underline underline-offset-2 text-base-400 text-sm mr-2 cursor-pointer">
                    View all
                  </div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  <div className="flex flex-col gap-1 items-center hover:bg-black/10 rounded-md cursor-pointer p-1">
                    <Image
                      src={user?.profile?.profile_url || "/golang.webp"}
                      width={120}
                      height={120}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-md h-[120px] w-[120px]"
                    />
                    <div className="text-xs font-bold text-base-400">
                      Example friend name
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-center hover:bg-black/10 rounded-md cursor-pointer p-1">
                    <Image
                      src={user?.profile?.profile_url || "/golang.webp"}
                      width={120}
                      height={120}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-md h-[120px] w-[120px]"
                    />
                    <div className="text-xs font-bold text-base-400">
                      Example friend name
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-center hover:bg-black/10 rounded-md cursor-pointer p-1">
                    <Image
                      src={user?.profile?.profile_url || "/golang.webp"}
                      width={120}
                      height={120}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-md h-[120px] w-[120px]"
                    />
                    <div className="text-xs font-bold text-base-400">
                      Example friend name
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-12 pt-6 pb-2 px-4 border-t-[1px] border-base-300/50">
            <div className="font-rollingStone text-2xl text-base-400">
              About me
            </div>
            <div className="bg-base-200/30 p-4 h-52">detail</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center w-full mt-6 mb-6">
        <div className="border-b-[1px] border-base-300 flex-1"></div>
        {user?.profile?.display_name ? (
          <div className="text-4xl text-base-400 font-rollingStone">{`${user.profile.display_name} Posts`}</div>
        ) : (
          <div className="text-4xl text-base-400 font-rollingStone opacity-50">{`Unknown Posts`}</div>
        )}
        <div className="border-b-[1px] border-base-300 flex-1"></div>
      </div>
    </div>
  );
}
