/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import HomeLeft from "@/components/HomeLeft";
import HomeRight from "@/components/HomeRight";
import PostBox from "@/components/PostBox";
import PostCreateBox from "@/components/PostCreateBox";
import { IoCaretDownSharp } from "react-icons/io5";
import { fetchUserInfo } from "./api/auth";
import { use, useEffect, useState } from "react";
import LoadingHomeLeft from "@/components/LoadingHomeLeft";
import { FaCheck } from "react-icons/fa";

import { useUser } from "@/context/UserContext";
import { Post } from "./types/post";
import { fetchAllPosts } from "./api/post";
import { fetchAllEvents, fetchAllEventTags, fetchAllTags } from "./api/event";
import { Event } from "./types/event";
import { EventTag } from "./types/eventTag";
import { Tag } from "./types/tag";
import { set } from "date-fns";

export default function Home() {
  // const [isLoading, setIsLoading] = useState(true)

  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  const [filters, setFilters] = useState<number[]>([]);
  const [filterNames, setFilterNames] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Top");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [tags, setTags] = useState<Tag[]>([]);

  const { user, setUser } = useUser();

  const [postEventMap, setPostEventMap] = useState<Map<number, number[]>>();

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await fetchAllPosts();
      setPosts(posts);

      const SortedPost = posts.sort((a: Post, b: Post) => {
        if (sortBy === "Top") {
          // Sort by a score: likesCount * (1 + (14 - ageInDays) / 14) if post is less than 14 days old, else just likesCount
          const getPostScore = (post: Post) => {
            const likesCount = post.likesCount ?? 0;
            const createdAt = post.createdAt
              ? new Date(post.createdAt).getTime()
              : 0;
            const ageInDays = (Date.now() - createdAt) / (1000 * 60 * 60 * 24);
            if (ageInDays < 14) {
              return likesCount * (1 + (14 - ageInDays) / 14);
            }
            return likesCount;
          };
          const scoreDiff = getPostScore(b) - getPostScore(a);
          if (scoreDiff !== 0) {
            return scoreDiff;
          }
          // If scores are equal, sort by most recent
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        } else if (sortBy === "Recent") {
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        }
        return 0;
      });
      setFilteredPosts(SortedPost);
    };

    loadPosts();
  }, [sortBy]);

  useEffect(() => {
    const loadEventTags = async () => {
      const eventTags = await fetchAllEventTags();
      if (!eventTags) return;
      const tempMap = new Map<number, number[]>();
      eventTags.forEach((eventTag: EventTag) => {
        const tagId = eventTag.tagId;
        if (tempMap && tempMap.has(eventTag.eventId)) {
          tempMap.get(eventTag.eventId)?.push(tagId);
        } else {
          tempMap.set(eventTag.eventId, [tagId]);
        }
      });
      setPostEventMap(tempMap);
    };
    loadEventTags();
  }, []);

  useEffect(() => {
    const loadTags = async () => {
      const tags = await fetchAllTags();
      setTags(tags);
    };
    loadTags();
  }, []);

  const handlerFilterApply = () => {
    if (filters.length === 0) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) => {
        if (post.eventId && postEventMap && postEventMap.has(post.eventId)) {
          const tags = postEventMap.get(post.eventId) || [];
          return filters.some((filter) => tags.includes(filter));
        }
        return false;
      });
      setFilteredPosts(filtered);
    }
    setIsFilterOpen(false);
  };

  return (
    <>
      <div className="flex justify-center w-full md:flex-col-reverse lg:flex-row mt-20">
        <div className="hidden lg:flex flex-col lg:w-[25vw]">
          {/* {isLoading ? <LoadingHomeLeft /> : <HomeLeft user={user} />} */}
          <HomeLeft />
        </div>
        <div className="flex flex-col md:w-full lg:w-[45vw] px-8">
          <PostCreateBox user={user} setPosts={setFilteredPosts} />
          <div className="flex flex-row items-center my-2 relative">
            <div className="flex-1 border-b border-base-300"></div>
            <div
              className="flex text-xs gap-1 pl-2 cursor-pointer select-none"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              Sort by:{" "}
              <span className="font-bold flex items-center gap-1">
                {sortBy} <IoCaretDownSharp />
              </span>
            </div>
            {isSortOpen && (
              <div className="absolute right-0 top-6 w-48 py-1 bg-white select-none rounded-md rounded-tr-none shadow-xl border border-base-300/60 flex flex-col z-10">
                <div
                  className={`text-base text-base-400 py-2 pl-4 border-l-2 border-transparent hover:bg-black/5 select-none cursor-pointer ${
                    sortBy === "Top" ? "border-l-lime-700" : ""
                  }`}
                  onClick={() => {
                    setSortBy("Top");
                    setIsSortOpen(false);
                  }}
                >
                  Top
                </div>
                <div
                  className={`text-base text-base-400 py-2 pl-4 border-l-2 border-transparent hover:bg-black/5 select-none cursor-pointer ${
                    sortBy === "Recent" ? "border-l-lime-700" : ""
                  }`}
                  onClick={() => {
                    setSortBy("Recent");
                    setIsSortOpen(false);
                  }}
                >
                  Recent
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-2 mb-2">
            {filters.length === 0 && (
              <div className="bg-white rounded-full font-bold text-base-400 px-2 py-1 text-sm cursor-default select-none">
                All
              </div>
            )}

            {filterNames.map((filter, index) => (
              <div
                key={index}
                className="bg-white rounded-full font-bold text-base-400 px-3 py-1 text-sm cursor-default select-none"
              >
                {filter}
              </div>
            ))}
            <div
              className="border-[1px] border-base-300 rounded-full px-2 py-1 text-sm font-bold text-base-400 cursor-pointer hover:bg-black/10 select-none"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              + Filter by
            </div>
          </div>
          {/* Filter*/}
          {isFilterOpen && (
            <>
              <div className="flex flex-col gap-2 mb-4 mt-2 bg-white px-2 py-3 pl-6 rounded-lg">
                <div className="text-xl font-rollingStone text-amber-900 ml-1">
                  Select filters
                </div>
                <div className="flex flex-row gap-2">
                  <div className="flex flex-row gap-2 flex-1 flex-wrap">
                    {tags.map((tag, index) =>
                      tag.id ? (
                        <div
                          className={`border border-base-300 rounded-full font-bold text-base-400/50 px-2 py-1 text-sm cursor-default select-none flex gap-2 items-center ${
                            filters.includes(tag.id)
                              ? "bg-amber-800 text-white border-amber-800"
                              : "hover:bg-black/10"
                          }`}
                          key={index}
                          onClick={() => {
                            if (!tag.id || !tag.tagName) return;
                            if (filters.includes(tag.id!)) {
                              setFilters(filters.filter((f) => f !== tag.id));
                              setFilterNames(
                                filterNames.filter(
                                  (name) => name !== tag.tagName
                                )
                              );
                            } else {
                              setFilters([...filters, tag.id]);
                              setFilterNames([...filterNames, tag.tagName]);
                            }
                          }}
                        >
                          {filters.includes(tag.id) ? (
                            <FaCheck className="text-white" />
                          ) : null}
                          {tag.tagName}
                        </div>
                      ) : null
                    )}
                  </div>
                  <div className="flex justify-end items-end">
                    <div
                      className="px-4 py-1.5 rounded-full border-[1px] border-base-300/30 font-bold text-base-400 mr-4 h-fit cursor-pointer select-none hover:bg-black/5"
                      onClick={() => {
                        setFilters([]);
                        setFilterNames([]);
                      }}
                    >
                      Clear All
                    </div>
                    <div
                      className="px-4 py-1.5 rounded-full bg-base-200 font-bold text-base-400 mr-4 h-fit cursor-pointer select-none hover:bg-base-300"
                      onClick={handlerFilterApply}
                    >
                      Apply
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-2">
            {filteredPosts.map((post) => (
              <PostBox key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="hidden md:flex flex-row md:w-full lg:w-[30vw]">
          <HomeRight />
        </div>
      </div>
    </>
  );
}
