"use client";

import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { FaPerson } from "react-icons/fa6";
import { BsFilePost } from "react-icons/bs";
import { MdOutlineReport } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function AdminManage() {
  const router = useRouter();

  const postData = [
    { month: "Jan", posts: 220 },
    { month: "Feb", posts: 280 },
    { month: "Mar", posts: 300 },
    { month: "Apr", posts: 260 },
    { month: "May", posts: 310 },
    { month: "Jun", posts: 400 },
  ];
  const userData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 200 },
    { month: "Mar", users: 250 },
    { month: "Apr", users: 300 },
    { month: "May", users: 350 },
    { month: "Jun", users: 400 },
  ];

  return (
    <div className="w-screen h-screen pt-20 pb-4">
      <div className="w-[70vw] ml-[2.5vw] h-full bg-white flex flex-row gap-4">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-4 items-center ml-10 mt-8 bg-black/5 rounded-md px-8 py-4 pb-12 h-fit">
            <div className="text-2xl font-rollingStone text-base-400">Menu</div>
            <div
              className="w-48 py-2 rounded-md flex justify-center bg-base-200 text-base-400 font-bold shadow-md border border-base-300/30 select-none cursor-pointer hover:bg-base-300"
              onClick={() => router.push("/admin-manage/report")}
            >
              Manage Report
            </div>
            <div
              className="w-48 py-2 rounded-md flex justify-center bg-base-200 text-base-400 font-bold shadow-md border border-base-300/30 select-none cursor-pointer hover:bg-base-300"
              onClick={() => router.push("/admin-manage/event")}
            >
              Manage Event
            </div>
            {/* <div
              className="w-48 py-2 rounded-md flex justify-center bg-base-200 text-base-400 font-bold shadow-md border border-base-300/30 select-none cursor-pointer hover:bg-base-300"
              onClick={() => router.push("/admin-manage/user-post")}
            >
              Manage User & Post
            </div> */}
          </div>
          <div className="flex flex-col gap-4 items-center ml-10 mt-2 bg-black/5 rounded-md px-8 py-4 pb-12 h-fit">
            <div className="text-2xl font-rollingStone text-base-400">
              Overall
            </div>
            <div className="flex flex-row gap-2 items-center bg-base-200 p-2 rounded-lg w-56">
              <div className="p-4 bg-black/5 rounded-md">
                <FaPerson />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className="text-base-400 font-bold">Current Users</div>
                <div className="text-amber-800 font-bold text-lg ml-10">
                  124
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center bg-base-200 p-2 rounded-lg w-56">
              <div className="p-4 bg-black/5 rounded-md">
                <BsFilePost />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className="text-base-400 font-bold">Current Posts</div>
                <div className="text-amber-800 font-bold text-lg ml-10">20</div>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center bg-base-200 p-2 rounded-lg w-56">
              <div className="p-4 bg-black/5 rounded-md">
                <MdOutlineReport />
              </div>
              <div className="flex flex-col justify-center flex-1">
                <div className="text-base-400 font-bold">Incoming Reports</div>
                <div className="text-amber-800 font-bold text-lg ml-10">3</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 h-full">
          <Card sx={{ p: 2 }} className="mb-4 mt-4">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Growth (Monthly)
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#197612"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Posts Growth (Monthly)
              </Typography>
              <Box sx={{ height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={postData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="posts"
                      stroke="#197612"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
