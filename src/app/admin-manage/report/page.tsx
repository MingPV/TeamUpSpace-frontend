"use client";

import React, { useEffect } from "react";
import { MdOutlineReport } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import ReportUserCard from "@/components/ReportUserCard";
import ReportPostCard from "@/components/ReportPostCard";
import { getAllPostReports, getAllUserReports } from "@/app/api/report";
import { PostReport, UserReport } from "@/app/types/post";

export default function Report() {
  const [isUserReport, setIsUserReport] = useState(true);
  const [postReports, setPostReports] = useState([]);
  const [userReports, setUserReports] = useState([]);
  // fetch post reports and user reports from backend

  useEffect(() => {
    const loadPostReports = async () => {
      const res = await getAllPostReports();
      setPostReports(res);
      console.log("post reports:", res);
    };
    const loadUserReports = async () => {
      const res = await getAllUserReports();
      setUserReports(res);
      console.log("user reports:", res);
    };
    loadUserReports();
    loadPostReports();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="mt-20 ml-10 bg-white w-[70vw] h-[80vh] rounded-lg flex flex-col shadow-md">
        <div className="w-full pl-10 pt-6 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2 text-2xl font-rollingStone text-base-400">
            <MdOutlineReport className="mt-0.5" />
            Reports ( 4 )
          </div>
          <div className="flex flex-row bg-base-100 rounded-full p-1 mr-4">
            <div
              className={`px-4 py-2 ${
                isUserReport
                  ? "text-white bg-red-800"
                  : "text-base-300 bg-transparent"
              } font-rollingStone flex justify-center items-center rounded-full cursor-pointer select-none`}
              onClick={() => setIsUserReport(true)}
            >
              user report
            </div>
            <div
              className={`px-4 py-2 ${
                isUserReport
                  ? "text-base-300 bg-transparent"
                  : "text-white bg-red-800"
              } font-rollingStone flex justify-center items-center rounded-full cursor-pointer select-none`}
              onClick={() => setIsUserReport(false)}
            >
              post report
            </div>
          </div>
        </div>

        <div className="px-4 mt-6 h-full pb-4">
          <div className="w-full flex flex-col gap-3 py-3 bg-black/5 px-4 h-full">
            <div className="w-full grid grid-flow-row grid-cols-4 text-amber-800/80 font-rollingStone">
              <div className="w-full flex justify-center pr-4">Name</div>
              <div className="w-full flex justify-center">Report By</div>
              <div className="w-full flex justify-center">Reported (ago)</div>
              <div className="w-full flex justify-center">Status</div>
            </div>
            <div
              className={`flex-1 flex flex-col gap-3 ${
                isUserReport ? "" : "hidden"
              }`}
            >
              {/* User Reports */}
              {userReports &&
                userReports.map((report: UserReport) => (
                  <ReportUserCard key={report.id} report={report} />
                ))}
            </div>
            <div
              className={`flex-1 flex flex-col gap-3 ${
                isUserReport ? "hidden" : ""
              }`}
            >
              {/* Post Reports */}
              {postReports &&
                postReports.map((report: PostReport) => (
                  <ReportPostCard key={report.id} report={report} />
                ))}
            </div>
            <div className="w-full flex flex-col justify-center items-center font-bold text-base-400/80">
              <div className="font-bold text-sm">1/5</div>
              <div className="w-full flex flex-row justify-center items-center gap-1">
                <div className="p-2 cursor-pointer hover:bg-black/10 rounded-md flex gap-1 items-center">
                  <MdNavigateBefore className="text-xl" />
                  <div>Prev</div>
                </div>
                <div className="p-2 cursor-pointer hover:bg-black/10 rounded-md flex gap-1 items-center">
                  <div>Next</div>
                  <MdNavigateNext className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
