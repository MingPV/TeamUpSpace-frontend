"use client";

import HomeLeft from "@/components/HomeLeft";
import HomeRight from "@/components/HomeRight";
import Navbar from "@/components/Navbar";
import PostBox from "@/components/PostBox";
import PostCreateBox from "@/components/PostCreateBox";
import { IoCaretDownSharp } from "react-icons/io5";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full md:flex-col-reverse lg:flex-row mt-20">
        <div className="hidden lg:flex flex-col lg:w-[25vw]">
          <HomeLeft />
        </div>
        <div className="flex flex-col md:w-full lg:w-[45vw] px-8">
          <PostCreateBox />
          <div className="flex flex-row items-center my-2">
            <div className="flex-1 border-b border-base-300"></div>
            <div className="flex text-xs gap-1 pl-2 cursor-pointer">
              Sort by:{" "}
              <span className="font-bold flex items-center gap-1">
                Top <IoCaretDownSharp />
              </span>
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="bg-white rounded-full font-bold text-base-400 px-2 py-1 text-sm">
              All
            </div>
            <div className="border-[1px] border-base-300 rounded-full px-2 py-1 text-sm font-bold text-base-400 cursor-pointer hover:bg-black/10">
              + Filter by
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <PostBox />
            <PostBox />
            <PostBox />
            <PostBox />
            <PostBox />
          </div>
        </div>
        <div className="hidden md:flex flex-row md:w-full lg:w-[30vw]">
          <HomeRight />
        </div>
      </div>
    </>
  );
}
