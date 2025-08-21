"use client";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center w-full">
        <div className="flex flex-col w-[90vw] md:w-2/3 lg:w-1/2">
          <div className="h-52 ">test</div>
          <div className="h-52 ">test</div>
          <div className="h-52 ">test</div>
          <div className="h-52 ">test</div>
          <div className="h-52 ">test</div>
          <div className="h-52 ">test</div>
        </div>
      </div>
    </>
  );
}
