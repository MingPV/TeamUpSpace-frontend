"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import PostModal from "./PostModal";

export default function PostBox() {
  const [isOpenComment, setIsOpenComment] = useState(false);

  useEffect(() => {
    if (isOpenComment) {
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = "auto"; // unlock scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isOpenComment]);

  return (
    <>
      <PostModal isOpen={isOpenComment} onClose={() => setIsOpenComment(false)}>
        <div className="bg-white px-4 pt-4 pb-1 flex flex-col w-full rounded-lg">
          <div className="flex gap-4 mb-3">
            <Image
              src={"/golang.webp"}
              width={100}
              height={100}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-14 w-14 cursor-pointer hover:opacity-80"
            />
            <div className="flex flex-1 flex-col">
              <div className="font-bold cursor-pointer hover:underline underline-offset-2">
                Example Name
              </div>
              <div className="text-xs">4 hours ago</div>
            </div>
            <div className="flex text-xs">dd/mm/yyyy</div>
          </div>
          <div className="mb-3">
            {`Hi! 👋 I’m looking for friends/teammates to join BananaGame.
        I’m currently studying Computer Engineering and would love to team up and build something cool together.
        If you’re also joining, feel free to reach out! 🚀`}
          </div>
          <Image
            src={"/golang.webp"}
            width={1000}
            height={1000}
            alt="post-pic"
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
          <div className="flex flex-row gap-2 items-center my-1 text-sm text-base-400 mt-2">
            <div className="flex gap-1">
              {/* Draw icons and use them instead of these icons */}
              <FcLike className="" />
              <AiOutlineLike className="" />
            </div>
            <div className="flex-1">Pavee Jeungtanasirikul and 18 others</div>
            <div
              className="cursor-pointer hover:underline underline-offset-2"
              onClick={() => setIsOpenComment(true)}
            >
              12 comments
            </div>
          </div>
          <div className="flex-1 border-b border-base-300 my-1"></div>
          <div className="grid grid-cols-5">
            <div className="flex justify-center items-center font-bold text-base-400 text-xs md:text-sm cursor-pointer hover:bg-base-300/20 rounded-md py-2">
              <div className="flex gap-1">
                <AiOutlineLike className="text-xl" />
                Like
              </div>
            </div>
            <div
              className="flex justify-center items-center font-bold text-base-400 text-xs md:text-sm cursor-pointer hover:bg-base-300/20 rounded-md py-2"
              onClick={() => setIsOpenComment(true)}
            >
              <div className="flex gap-1">
                <FaRegComment className="text-xl" />
                Comment
              </div>
            </div>
            <div className="flex justify-center items-center font-bold text-base-400 text-xs md:text-sm cursor-pointer hover:bg-base-300/20 rounded-md py-2">
              <div className="flex gap-1">
                <IoIosSend className="text-xl" />
                Send
              </div>
            </div>
            <div className="flex justify-center items-center font-bold text-base-400 text-xs md:text-sm cursor-pointer hover:bg-base-300/20 rounded-md py-2 col-span-2">
              <div className="flex gap-1">
                <FaPersonWalkingArrowRight className="text-xl" />
                Request to join team
              </div>
            </div>
          </div>
        </div>
        <div className={`${isOpenComment ? "" : "hidden"}`}>
          <div className="bg-white px-4 py-2 gap-2 flex flex-col">
            {Array.from({ length: 20 }).map((_, idx) => (
              <div key={idx} className="flex gap-2">
                <Image
                  src={"/golang.webp"}
                  width={100}
                  height={100}
                  alt="profile-pic"
                  style={{ objectFit: "cover" }}
                  className="rounded-full h-8 w-8 cursor-pointer hover:opacity-80"
                />
                <div className="flex flex-col w-full">
                  <div className="flex-wrap w-fit max-w-2/3 lg:max-w-1/2 py-2 px-4 bg-base-300/20 rounded-xl flex">
                    <div className="flex flex-col">
                      <div className="text-sm font-bold hover:underline underline-offset-2 cursor-pointer w-fit">
                        Name
                      </div>
                      <div className="text-sm">
                        Example comment Example comment Example comment Example
                        comment Example comment Example comment Example comment
                        Example comment Example comment
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 ml-2 mt-0.5">
                    <div className="text-xs text-base-400/70 font-bold">
                      3 days
                    </div>
                    <div className="text-xs text-base-400/70 font-bold cursor-pointer hover:underline hover:text-base-500">
                      Like
                    </div>
                    <div className="text-xs text-base-400/70 font-bold cursor-pointer hover:underline hover:text-base-500">
                      Reply
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PostModal>
    </>
  );
}
