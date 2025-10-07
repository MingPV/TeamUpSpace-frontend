"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { IoMdDownload } from "react-icons/io";
import { Answer, TeamRequest } from "@/app/types/answer";
import { User } from "@/app/types/user";
import { getUserById } from "@/app/api/auth";
import { deleteAnswerByPostIdAndUserId } from "@/app/api/post";

export default function RequestCard({
  request,
  isMyRequest,
}: {
  request: TeamRequest;
  isMyRequest?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [questionMenuOpen, setQuestionMenuOpen] = useState(false);
  const [questionSelected, setQuestionSelected] = useState<string | null>(null);
  const [answerSelected, setAnswerSelected] = useState<string | null>(null);
  const [requester, setRequester] = useState<User>();
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const loadRequester = async () => {
      if (!request.answers[0]) return;
      const res = await getUserById(request.answers[0].userId);
      console.log("Fetched requester:", res);
      setRequester(res);
    };
    loadRequester();
  }, [request.answers]);

  console.log("Rendering RequestCard with request:", request);

  const handleAccept = () => {
    deleteAnswerByPostIdAndUserId(
      request.answers[0].postId,
      request.answers[0].userId
    ).then(() => {
      console.log("Request accepted and removed from the list");
      // Optionally, you can add logic to remove the request from the UI
    });
    setIsDeleted(true);
    setIsOpen(false);
  };

  const handleDeny = () => {
    deleteAnswerByPostIdAndUserId(
      request.answers[0].postId,
      request.answers[0].userId
    ).then(() => {
      console.log("Request denied and removed from the list");
      // Optionally, you can add logic to remove the request from the UI
    });
    setIsDeleted(true);
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bg-white h-[80vh] w-[60vw] top-[10vh] left-[20vw] rounded-lg z-50 flex flex-col">
            <div className="absolute py-5 w-full flex justify-end right-6 top-0">
              <span
                className="text-base-400 bg-black/10 p-2 rounded-full cursor-pointer hover:bg-black/20"
                onClick={() => setIsOpen(false)}
              >
                <RxCross2 className="text-xl font-bold" />
              </span>
            </div>
            <div className="w-full text-2xl font-rollingStone pl-10 pt-6 text-base-400/80">
              Event : {request.event_name}
            </div>
            <div className="w-full flex-1 flex flex-row gap-4 px-4 py-4 h-full overflow-hidden">
              <div className="rounded-md w-1/2 flex flex-col shadow-lg ml-4">
                <div className="w-full flex flex-col items-center">
                  <Image
                    src={requester?.profile.background_url || "/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className=" h-32 w-full rounded-t-md cursor-pointer hover:opacity-80"
                  />
                  <Image
                    src={requester?.profile.profile_url || "/golang.webp"}
                    width={200}
                    height={200}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-full h-28 w-28 relative -top-16 cursor-pointer border-2 border-transparent hover:border-base-200"
                  />
                </div>
                <div className="relative -top-14 h-full flex flex-col px-3">
                  <div className="w-full flex justify-center text-lg font-bold mb-2">
                    <div className="p-2 rounded-md hover:bg-black/5 cursor-pointer">
                      {requester?.profile.display_name || "Loading..."}
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-full flex flex-col gap-3">
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Universitry:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          {requester?.profile.university || "N/A"}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Major:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          {requester?.profile.major || "N/A"}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Year:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          {requester?.profile.year || "N/A"}
                        </div>
                        <div className="font-bold text-sm text-base-400 ml-4">
                          Age:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          {requester?.profile.age || "N/A"}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <div className="font-bold text-sm text-base-400">
                          Location:
                        </div>
                        <div className="text-amber-800 font-bold text-sm">
                          {requester?.profile.location || "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-end">
                      <a
                        className="mr-4 mb-2 p-2 border-[1px] border-base-300/30 rounded-md flex items-center font-bold text-base-400 hover:bg-black/5 cursor-pointer"
                        download={true}
                        href={requester?.profile.resume || ""}
                      >
                        <IoMdDownload className="inline-block mr-2  text-base-400 text-lg" />
                        Resume
                      </a>
                    </div>
                  </div>

                  <div className="flex-1 w-full mt-2 flex flex-col p-2 border-[1px] border-base-300/30 rounded-md">
                    <div className="font-bold ml-2">Description</div>
                    <div className="ml-2 mt-2 text-sm overflow-y-scroll h-32 pr-4">
                      {requester?.profile.description || "N/A"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md w-1/2 flex flex-col h-full">
                <div className="flex-1 flex flex-col h-full">
                  <div className="font-rollingStone text-xl text-base-400 ml-2 mb-2">
                    Question
                  </div>
                  <div className="">
                    <div className="relative" id="event-dropdown">
                      <button
                        type="button"
                        className="w-full p-3 pr-10 border border-base-300 rounded-xl bg-base-100 text-base-400 flex justify-between items-center"
                        onClick={() => setQuestionMenuOpen((prev) => !prev)}
                      >
                        {questionSelected
                          ? request.answers.find(
                              (e) => e.question === questionSelected
                            )?.question
                          : "Select a question..."}
                        <span className="ml-2">&#9662;</span>
                      </button>
                      {questionMenuOpen && (
                        <ul className="absolute left-0 top-full w-full bg-white border border-base-300 rounded-xl shadow-lg mt-1 z-10">
                          {request.answers.map((answer) => (
                            <li
                              key={answer.id}
                              className={`p-3 cursor-pointer hover:bg-base-100 ${
                                questionSelected === answer.question
                                  ? "bg-base-200"
                                  : ""
                              }`}
                              onClick={() => {
                                setQuestionSelected(answer.question);
                                setAnswerSelected(answer.answer);
                                setQuestionMenuOpen(false);
                              }}
                            >
                              {answer.question}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="mt-8 ml-4 cursor-default font-bold text-base-400">
                    {questionSelected
                      ? request.answers.find(
                          (e) => e.question === questionSelected
                        )?.question
                      : "Please select a question to see the answer."}
                  </div>
                  <div className="m-4 border border-base-300/30 rounded-md h-64 bg-black/5">
                    <div className="px-4 py-2 h-full overflow-y-scroll">
                      {answerSelected}
                    </div>
                    {/* <div className="flex flex-row gap-1 justify-end pt-3 pr-2">
                      <div className="px-3 py-1 border border-base-300/30 rounded-md font-bold text-sm text-base-400 hover:bg-black/5 cursor-pointer">
                        Prev
                      </div>
                      <div className="px-3 py-1 border border-base-300/30 rounded-md font-bold text-sm text-base-400 hover:bg-black/5 cursor-pointer">
                        Next
                      </div>
                    </div> */}
                  </div>
                </div>
                {isMyRequest ? (
                  <div className="flex flex-row gap-2 justify-end pr-4 pb-2">
                    <div className="px-4 py-2 border border-amber-800/90 rounded-md text-amber-800 font-bold cursor-default">
                      Pending
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 justify-end pr-4 pb-2">
                    <div
                      className="px-4 py-2 border border-red-600 text-red-600 hover:border-red-700  hover:bg-red-700 hover:text-white font-bold rounded-md cursor-pointer transition-all duration-300"
                      onClick={handleDeny}
                    >
                      Deny
                    </div>
                    <div
                      className="px-4 py-2 bg-lime-600 text-white hover:bg-lime-700 font-bold rounded-md cursor-pointer transition-all duration-300"
                      onClick={handleAccept}
                    >
                      Accept
                    </div>
                  </div>
                )}

                <div className="text-xs text-red-600 text-end pr-4 pb-2">
                  {`Please make sure you have checked the applicant's profile.`}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {isDeleted ? null : (
        <div className="w-full grid grid-flow-row grid-cols-4 rounded-md">
          <div
            className="col-span-3 grid grid-flow-row grid-cols-3 rounded-md bg-white hover:border-base-300 border-[1px] border-base-300/30 cursor-pointer transition-all duration-300"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <div className="w-full flex flex-row items-center pl-8 gap-4 py-2 rounded-l-md text-base-400/80 font-bold">
              <Image
                src={requester?.profile.profile_url || "/golang.webp"}
                width={200}
                height={200}
                alt="profile-pic"
                style={{ objectFit: "cover" }}
                className="rounded-full h-10 w-10 cursor-pointer hover:opacity-90"
              />
              MingPV
            </div>
            <div className="w-full flex justify-center items-center py-2 text-base-400/80 font-bold">
              {request.event_name}
            </div>
            <div className="w-full flex justify-center items-center py-2 rounded-r-md text-base-400/80 font-bold">
              {/* 3 days */}
              {Math.floor(
                (new Date().getTime() -
                  new Date(request?.answers[0].createdAt || "").getTime()) /
                  (1000 * 60 * 60 * 24)
              )}
              {Math.floor(
                (new Date().getTime() -
                  new Date(request?.answers[0].createdAt || "").getTime()) /
                  (1000 * 60 * 60 * 24)
              ) === 1
                ? " day"
                : " days"}
            </div>
          </div>
          <div className="w-full flex justify-center h-full items-center">
            {isMyRequest ? (
              <div className="px-4 py-2 border border-amber-800/90 rounded-md text-amber-800 font-bold cursor-default">
                Pending
              </div>
            ) : (
              <div
                className="px-4 py-2 bg-amber-800/90 rounded-md text-white font-bold cursor-pointer hover:bg-amber-800 transition-all duration-300"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                Check Answer
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
