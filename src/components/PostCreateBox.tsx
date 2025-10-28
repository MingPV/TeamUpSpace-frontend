"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import { User } from "@/app/types/user";
import { IoImagesOutline } from "react-icons/io5";
import { createPost, createQuestion } from "@/app/api/post";
import { Post } from "@/app/types/post";
import { fetchAllEvents } from "@/app/api/event";
import { Event } from "@/app/types/event";
import { set } from "date-fns";

export default function PostCreateBox({
  user,
  setPosts,
}: {
  user: User | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}) {
  const [isPostBoxOpen, setIsPostBoxOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [isEnableTeamRequest, setIsEnableTeamRequest] = useState(false);
  const [open, setOpen] = useState(false);

  const [postImage, setPostImage] = useState<File | undefined>(undefined);
  const [postImagePreview, setPostImagePreview] = useState<string>("");

  const [isShowQuestion2, setIsShowQuestion2] = useState(false);
  const [isShowQuestion3, setIsShowQuestion3] = useState(false);

  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  const TemplateText = [
    "Looking for teammates! If you’re interested, please comment or send me a message.",
    "I’m searching for teammates. Feel free to reach out if you’d like to join.",
    "Need teammates. Let me know if you’re interested in teaming up.",
    "I am seeking team members. Kindly contact me if you’d like to collaborate.",
    "Looking to form a team. Anyone who wants to join is welcome!",
  ];
  const [templateIndex, setTemplateIndex] = useState(0);

  const handlePostImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setPostImage(newFiles[0]);
    setPostImagePreview(newPreviews[0]);
  };

  const handlePost = async () => {
    if (!postContent.trim()) return;

    if (!user) {
      return;
    }

    createPost(
      user.id,
      postContent,
      postImage,
      "",
      selectedEvent ? selectedEvent.id : 0
    )
      .then((res) => {
        setPosts((prevPosts) => [res.post as Post, ...prevPosts]);

        // Insert Questions
        if (isShowQuestion2 && isShowQuestion3) {
          if (res.post && res.post.id) {
            if (value1.trim() != "") {
              createQuestion(res.post.id, value1);
            }
            if (value2.trim() != "") {
              createQuestion(res.post.id, value2);
            }
            if (value3.trim() != "") {
              createQuestion(res.post.id, value3);
            }
          }
        } else if (isShowQuestion2) {
          if (res.post && res.post.id) {
            if (value1.trim() != "") {
              createQuestion(res.post.id, value1);
            }
            if (value2.trim() != "") {
              createQuestion(res.post.id, value2);
            }
          }
        } else {
          if (res.post && res.post.id) {
            if (value1.trim() != "") {
              createQuestion(res.post.id, value1);
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error creating post:", err);
      });

    // Reset
    setPostContent("");
    setPostImage(undefined);
    setPostImagePreview("");
    setIsPostBoxOpen(false);
    setIsEnableTeamRequest(false);
    setValue1("");
    setValue2("");
    setValue3("");
    setIsShowQuestion2(false);
    setIsShowQuestion3(false);
    setSelectedEvent(null);
    setOpen(false);
  };

  useEffect(() => {
    const loadEvents = async () => {
      fetchAllEvents().then((fetchedEvents) => {
        if (fetchedEvents && fetchedEvents.length > 0) {
          setEvents(fetchedEvents);
          setFilteredEvents(fetchedEvents);
        }
      });
    };
    loadEvents();
  }, []);

  return (
    <>
      {isPostBoxOpen && (
        <div
          className="w-screen h-screen bg-black/50 fixed z-48 top-0 left-0"
          onClick={() => {
            setIsPostBoxOpen(false);
          }}
        ></div>
      )}
      <div
        className={`fixed w-[32vw] h-[75vh] bg-white z-49 top-[5vh] right-[1vw] flex flex-col rounded-xl overflow-scroll ${
          isPostBoxOpen && isEnableTeamRequest ? "block" : "hidden"
        }`}
      >
        <div className="w-full flex justify-center items-center py-4 font-rollingStone text-lg text-base-400">
          Select Event
        </div>
        {/* Create drop down to select event */}
        <div className="w-full px-6 mb-6 relative">
          <label
            className="block text-base-400 font-semibold mb-2"
            htmlFor="event-dropdown"
          >
            Choose an event
          </label>
          {/* Custom dropdown */}

          <div className="relative" id="event-dropdown">
            <button
              type="button"
              className="w-full p-3 pr-10 border border-base-300 rounded-xl bg-base-100 text-base-400 flex justify-between items-center"
              onClick={() => setOpen((prev) => !prev)}
            >
              {selectedEvent ? selectedEvent.eventName : "Select an event..."}
              <span className="ml-2">&#9662;</span>
            </button>
            {open && (
              <ul className="absolute left-0 top-full w-full bg-white border border-base-300 rounded-xl shadow-lg mt-1 z-10">
                {/* Search input (This is only for test, Need to change)*/}
                <textarea
                  className="w-full p-2 border-b border-base-300 outline-none resize-none"
                  placeholder="Search..."
                  rows={1}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    const query = e.target.value.toLowerCase();
                    const filteredEvents = events.filter((event) =>
                      event?.eventName?.toLowerCase().includes(query)
                    );
                    if (filteredEvents.length > 0) {
                      setFilteredEvents(filteredEvents);
                    }
                  }}
                />

                {filteredEvents.map((event) => (
                  <li
                    key={event.eventName}
                    className={`p-3 cursor-pointer hover:bg-base-100 ${
                      selectedEvent?.eventName === event.eventName
                        ? "bg-base-200"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedEvent(event);
                      setOpen(false);
                    }}
                  >
                    {event.eventName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="text-lg font-bold text-base-400 my-2 ml-6">
            Question 1
          </div>
          <div className="bg-base-100 p-4 mx-4">
            <textarea
              className="w-full ring-0 focus:outline-none resize-none leading-relaxed overflow-hidden"
              placeholder="Anything you want to ask"
              rows={1}
              value={value1}
              onChange={(e) => {
                const textarea = e.target;
                setValue1(textarea.value);

                // auto resize
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
              }}
            />
          </div>

          {isShowQuestion2 && (
            <>
              <div className="flex flex-row justify-between my-2 ml-6 items-center">
                <div className="text-lg font-bold text-base-400 ">
                  Question 2
                </div>
                <div
                  className="font-bold text-sm text-base-400 mr-8 border hover:text-white border-base-300/50 rounded-md p-1 cursor-pointer hover:bg-red-700"
                  onClick={() => {
                    if (isShowQuestion3) {
                      setValue2(value3);
                      setValue3("");
                      setIsShowQuestion3(false);
                    } else {
                      setValue2("");
                      setIsShowQuestion2(false);
                    }
                  }}
                >
                  Remove
                </div>
              </div>
              <div className="bg-base-100 p-4 mx-4">
                <textarea
                  className="w-full ring-0 focus:outline-none resize-none leading-relaxed overflow-hidden"
                  placeholder="Anything you want to ask"
                  rows={1}
                  value={value2}
                  onChange={(e) => {
                    const textarea = e.target;
                    setValue2(textarea.value);

                    // auto resize
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                  }}
                />
              </div>
            </>
          )}

          {isShowQuestion3 ? (
            <>
              <div className="flex flex-row justify-between my-2 ml-6 items-center">
                <div className="text-lg font-bold text-base-400 ">
                  Question 3
                </div>
                <div
                  className="font-bold text-sm text-base-400 mr-8 border hover:text-white border-base-300/50 rounded-md p-1 cursor-pointer hover:bg-red-700"
                  onClick={() => {
                    setIsShowQuestion3(false);
                    setValue3("");
                  }}
                >
                  Remove
                </div>
              </div>
              <div className="bg-base-100 p-4 mx-4">
                <textarea
                  className="w-full ring-0 focus:outline-none resize-none leading-relaxed overflow-hidden"
                  placeholder="Anything you want to ask"
                  rows={1}
                  value={value3}
                  onChange={(e) => {
                    const textarea = e.target;
                    setValue3(textarea.value);

                    // auto resize
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                  }}
                />
              </div>
            </>
          ) : null}
        </div>
        <div
          className={`w-full my-8 flex justify-center items-center ${
            isShowQuestion3 && isShowQuestion2 ? "hidden" : ""
          }`}
        >
          <div
            className="text-xl text-base-400 py-1 mx-4 rounded-md w-full border-[1px] border-base-300/50 cursor-pointer hover:bg-base-200 text-center"
            onClick={() => {
              if (!isShowQuestion2) {
                setIsShowQuestion2(true);
              } else if (!isShowQuestion3) {
                setIsShowQuestion3(true);
              }
            }}
          >
            +
          </div>
        </div>
      </div>
      <div
        className={`fixed h-[75vh] bg-white z-50 top-[5vh] left-[20vw] flex flex-col rounded-xl  ${
          isPostBoxOpen ? "block" : "hidden"
        } ${isEnableTeamRequest ? "w-[46vw]" : "w-[60vw]"}`}
      >
        <div className="absolute py-5 w-full flex justify-end right-4 -top-1">
          <span
            className="text-base-400 p-2 rounded-full cursor-pointer hover:bg-black/10"
            onClick={() => {
              setIsPostBoxOpen(false);
            }}
          >
            <RxCross2 className="text-xl font-bold" />
          </span>
        </div>
        <div className="flex gap-4 ml-12 mt-8">
          <Image
            src={user?.profile?.profile_url || "/golang.webp"}
            width={200}
            height={200}
            alt="profile-pic"
            style={{ objectFit: "cover" }}
            className="rounded-full h-16 w-16"
          />
          <div className="flex flex-col">
            <div className="font-bold text-2xl">
              {user?.profile?.display_name}
            </div>
            <div className="text-sm">Post to Anyone</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-y-scroll gap-2 mt-4">
          <div className="flex gap-2 flex-wrap ml-8">
            {postImagePreview && (
              <div className="relative">
                <Image
                  src={postImagePreview}
                  width={120}
                  height={120}
                  alt="post-image"
                  className="rounded-md h-[120px] w-[120px] object-cover"
                />
                <span
                  className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 cursor-pointer"
                  onClick={() => {
                    setPostImage(undefined);
                    setPostImagePreview("");
                  }}
                >
                  <RxCross2 />
                </span>
              </div>
            )}
          </div>
          <div
            className="flex-1 mt-4 ml-8 cursor-text w-[95%] pr-[5%] gap-4"
            onClick={() => {
              const input = document.getElementById("post-input");
              input?.focus();
            }}
          >
            <textarea
              className="text-xl placeholder:text-base-300 w-full focus:outline-none ring-0 resize-none leading-relaxed overflow-hidden"
              placeholder="What do you want to talk about?"
              rows={1}
              id="post-input"
              value={postContent}
              onChange={(e) => {
                const textarea = e.target;
                setPostContent(textarea.value);

                // auto resize
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
              }}
            />
          </div>
        </div>
        <div className="my-4 ml-6 flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <label className="inline-flex items-center relative cursor-pointer">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isEnableTeamRequest}
                onChange={() => {
                  setIsEnableTeamRequest(!isEnableTeamRequest);
                }}
              />{" "}
              <div className="relative w-16 h-8 bg-white peer-checked:bg-base-300 peer-checked:border-base-400/60 rounded-full after:absolute after:content-[''] after:w-5 after:h-5 after:bg-gradient-to-r border-[1px] border-base-300  from-orange-500 to-yellow-400 peer-checked:after:from-base-400/80 peer-checked:after:to-base-400/80 after:border-[1px] after:border-base-400/80 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-4 peer-checked:after:left-14 peer-checked:after:translate-x-[-100%] duration-300 after:duration-300 after:shadow-lg" />
            </label>
            <div className="font-bold text-base-400 text-sm">
              Enable team requests
            </div>
            <div
              className="p-3 cursor-pointer hover:bg-black/5 rounded-full w-fit"
              onClick={() => document.getElementById("postImageInput")?.click()}
            >
              <IoImagesOutline className="text-2xl" />
            </div>
            <input
              type="file"
              id="postImageInput"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handlePostImageSelect}
            />
            <div
              className="bg-base-200 px-4 py-1 rounded-full text-base-400/70 font-rollingStone text-sm cursor-pointer hover:text-base-400 select-none"
              onClick={() => {
                setPostContent(TemplateText[templateIndex]);
                setTemplateIndex((templateIndex + 1) % TemplateText.length);
              }}
            >{`Don't know what to post? Click me :)`}</div>
          </div>
        </div>
        <div className="w-full flex justify-end py-4 border-t-[1px] border-t-base-300/30">
          <div
            className={`px-5 py-1.5 font-bold bg-base-200 rounded-full mr-7 ${
              postContent.trim()
                ? "cursor-pointer hover:bg-base-300"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={handlePost}
          >
            Post
          </div>
        </div>
      </div>
      <div className="bg-white p-4 flex flex-col w-full rounded-lg">
        <div className="flex gap-4">
          <Image
            src={user?.profile?.profile_url || "/golang.webp"}
            width={100}
            height={100}
            alt="profile-pic"
            style={{ objectFit: "cover" }}
            className="rounded-full h-14 w-14"
          />
          <div
            className="border border-base-300 text-base-400 hover:bg-base-100 cursor-pointer text-sm font-bold rounded-full flex items-center pl-6 flex-1"
            onClick={() => {
              setIsPostBoxOpen(!isPostBoxOpen);
            }}
          >
            Start a post
          </div>
        </div>
        <div className="text-xs text-base-400 mt-2">
          {`Tip: Don't forget to put event tags on your post to make it easier for others at the event to find
        you.`}
        </div>
      </div>
    </>
  );
}
