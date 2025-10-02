"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import PostModal from "./PostModal";
import { Post, PostLike } from "@/app/types/post";
import { formatDistanceToNow, set } from "date-fns";
import { getUserById } from "@/app/api/auth";
import { Comment } from "@/app/types/comment";
import { IoTrashBin } from "react-icons/io5";
import { IoWarning } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import {
  createAnswer,
  fetchAllComments,
  fetchAnswerByPostIdUserId,
  fetchQuestionByPostId,
  getLikeByPostId,
  getLikeByUserId,
  likePost,
  unLikePost,
} from "@/app/api/post";
import RecursiveComment from "./RecursiveComment";
import { User } from "@/app/types/user";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { AiFillLike } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { reportPost } from "@/app/api/report";
import { Question } from "@/app/types/question";

type PostProps = {
  post?: Post;
};

export default function PostBox({ post }: PostProps) {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [poster, setPoster] = useState<User>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAnswered, setIsAnswered] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answerError, setAnswerError] = useState<string>("");

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isQuestionBoxOpen, setIsQuestionBoxOpen] = useState(false);

  const [selectedReportIndex, setSelectedReportIndex] = useState(0);
  const [otherReportText, setOtherReportText] = useState("");
  const [reason, setReason] = useState("");

  const { user } = useUser();

  const router = useRouter();

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

  useEffect(() => {
    const loadPostByName = async () => {
      if (post && post.postBy) {
        const res = (await getUserById(post.postBy)) as User;
        if (res) {
          setPoster(res);
        }
      }
    };

    const loadComments = async () => {
      if (post && post.id) {
        // Fetch comments for the post
        const res = await fetchAllComments(post.id);
        console.log("comments", res);
        setComments(res);
      }
    };

    const loadUserLikes = async () => {
      if (post && post.id && user && user.id) {
        const res = await getLikeByUserId(user.id);
        const postLikes = res.postlikes as PostLike[];
        console.log("likePosts", postLikes);
        postLikes.map((pl) => {
          if (pl.postId == post.id) {
            setIsLiked(true);
            return;
          }
        });
      }
    };

    const loadPostLikes = async () => {
      if (post && post.id && user && user.id) {
        const res = await getLikeByPostId(post.id);
        const postLikes = res.postlikes as PostLike[];
        console.log("likePosts", postLikes);
        setLikeCount(postLikes.length);
      }
    };

    const loadQuestions = async () => {
      if (post && post.id && user && user.id) {
        const res = await fetchQuestionByPostId(post.id);
        console.log("questions", res);
        setQuestions(res);
      }
    };

    const loadAnswered = () => {
      if (post && post.id && user && user.id) {
        // Check if user has answered the questions
        fetchAnswerByPostIdUserId(post.id, user.id).then((res) => {
          if (res) {
            setIsAnswered(true);
          }
        });
      }
    };

    loadPostByName();
    loadComments();
    loadUserLikes();
    loadPostLikes();
    loadQuestions();
    loadAnswered();
  }, [post, user]);

  const handleLike = () => {
    if (!user || !post || !post.id) {
      return;
    }
    if (!isLiked) {
      setIsLiked(true);
      likePost(post.id, user.id);

      setLikeCount(likeCount + 1);
    } else {
      setIsLiked(false);
      unLikePost(post.id, user.id).then((data) => {
        console.log(data, "Mingming");
      });

      setLikeCount(likeCount - 1);
    }
  };

  const handleReport = () => {
    if (!user || !post || !post.id || !post.postBy) {
      return;
    }
    if (selectedReportIndex == 6) {
      reportPost(post.id, user.id, post.postBy, otherReportText);
    } else {
      reportPost(post.id, user.id, post.postBy, reason);
    }
    setIsReportOpen(false);
    setSelectedReportIndex(0);
    setOtherReportText("");
    setReason("");
  };

  const handleSendRequest = () => {
    if (!user || !post || !post.id || !post.postBy) {
      return;
    }
    if (
      (!answer1 && questions.length >= 1) ||
      (!answer2 && questions.length >= 2) ||
      (!answer3 && questions.length >= 3)
    ) {
      setAnswerError("Please answer all the questions.");
      return;
    }
    if (
      questions.length >= 1 &&
      questions[0] &&
      questions[0].question &&
      answer1
    ) {
      createAnswer(post.id, user.id, questions[0].question, answer1);
    }
    if (
      questions.length >= 2 &&
      questions[1] &&
      questions[1].question &&
      answer2
    ) {
      createAnswer(post.id, user.id, questions[1].question, answer2);
    }
    if (
      questions.length >= 3 &&
      questions[2] &&
      questions[2].question &&
      answer3
    ) {
      createAnswer(post.id, user.id, questions[2].question, answer3);
    }
    setIsQuestionBoxOpen(false);
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setIsAnswered(true);
  };

  if (!post || (!post.detail && !post.imageUrl)) {
    return <></>;
  }

  return (
    <>
      {/* Report Post */}
      {isReportOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setIsReportOpen(false)}
          />
          <div className="fixed bg-white h-[70vh] w-[50vw] top-[10vh] left-[25vw] rounded-lg z-50 flex flex-col">
            <div className="absolute py-5 w-full flex justify-end right-6 top-0">
              <span
                className="text-base-400 bg-black/10 p-2 rounded-full cursor-pointer hover:bg-black/20"
                onClick={() => setIsReportOpen(false)}
              >
                <RxCross2 className="text-xl font-bold" />
              </span>
            </div>
            <div className="w-full flex-1 flex flex-col gap-4 px-4 py-4 mt-10 pl-12 h-full overflow-hidden">
              <div className="w-full text-xl font-bold text-base-400">
                Why are you reporting this post?{" "}
              </div>
              <div className="font-bold text-sm text-base-400/80">
                Let us know what’s wrong with this post.
              </div>
              <div className="flex flex-col gap-8 ml-4">
                <div className="flex flex-row gap-4">
                  <input
                    type="radio"
                    checked={selectedReportIndex == 1}
                    readOnly
                    className="w-6"
                    onClick={() => {
                      setSelectedReportIndex(1);
                      setReason(
                        "This post contains spam or unsolicited content."
                      );
                    }}
                  />
                  <div>This post contains spam or unsolicited content.</div>
                </div>
                <div className="flex flex-row gap-4">
                  <input
                    type="radio"
                    checked={selectedReportIndex == 2}
                    readOnly
                    className="w-6"
                    onClick={() => {
                      setSelectedReportIndex(2);
                      setReason(
                        "This post shares false or misleading information."
                      );
                    }}
                  />
                  <div>This post shares false or misleading information.</div>
                </div>
                <div className="flex flex-row gap-4">
                  <input
                    type="radio"
                    checked={selectedReportIndex == 3}
                    readOnly
                    className="w-6"
                    onClick={() => {
                      setSelectedReportIndex(3);
                      setReason(
                        "This post includes hate speech or discriminatory content."
                      );
                    }}
                  />
                  <div>
                    This post includes hate speech or discriminatory content.
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <input
                    type="radio"
                    checked={selectedReportIndex == 4}
                    readOnly
                    className="w-6"
                    onClick={() => {
                      setSelectedReportIndex(4);
                      setReason(
                        "This post involves harassment, bullying, or abusive behavior."
                      );
                    }}
                  />
                  <div>
                    This post involves harassment, bullying, or abusive
                    behavior.
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <input
                    type="radio"
                    checked={selectedReportIndex == 5}
                    readOnly
                    className="w-6"
                    onClick={() => {
                      setSelectedReportIndex(5);
                      setReason(
                        "This post promotes violence, self-harm, or other dangerous activity."
                      );
                    }}
                  />
                  <div>
                    This post promotes violence, self-harm, or other dangerous
                    activity.
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-start">
                  <input
                    type="radio"
                    checked={selectedReportIndex == 6}
                    readOnly
                    className="w-6 h-6"
                    onClick={() => setSelectedReportIndex(6)}
                  />
                  <div>Other</div>
                  <input
                    type="text"
                    onChange={(e) => setOtherReportText(e.target.value)}
                    className="w-1/2 flex-wrap text-wrap p-2 pl-4 pb-6 border rounded-md border-base-300/30 ring-0 focus:outline-0 text-start"
                  />
                </div>
              </div>
              <div className="flex-1 flex flex-row gap-2 justify-end pr-8 pb-4 items-end">
                <div
                  className="px-4 py-2 border border-base-400 text-base-400 hover:border-base-400  hover:bg-base-400 hover:text-white font-bold rounded-md cursor-pointer transition-all duration-300"
                  onClick={() => setIsDeleteOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className="px-4 py-2 bg-red-700 text-white hover:bg-red-800 font-bold rounded-md cursor-pointer transition-all duration-300"
                  onClick={handleReport}
                >
                  Report
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* Delete Post */}
      {isDeleteOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setIsDeleteOpen(false)}
          />
          <div className="fixed bg-white h-44 w-[30vw] top-[35vh] left-[35vw] rounded-lg z-50 flex flex-col">
            <div className="w-full text-2xl font-rollingStone pl-8 pt-6 text-base-400/80">
              Delete Post
            </div>
            <div className="w-full font-rollingStone pl-8 pt-3 text-base-400/80">
              Are you sure? Deleting this post is permanent.
            </div>
            <div className="flex-1 flex flex-row gap-2 justify-end pr-4 pb-4 items-end">
              <div
                className="px-4 py-2 border border-base-400 text-base-400 hover:border-base-400  hover:bg-base-400 hover:text-white font-bold rounded-md cursor-pointer transition-all duration-300"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </div>
              <div className="px-4 py-2 bg-red-700 text-white hover:bg-red-800 font-bold rounded-md cursor-pointer transition-all duration-300">
                Delete
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* Send Request */}
      {isQuestionBoxOpen ? (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-45"
            onClick={() => setIsQuestionBoxOpen(false)}
          />
          <div className="fixed bg-white h-[70vh] w-[50vw] top-[10vh] left-[25vw] rounded-lg z-50 flex flex-col">
            <div className="absolute py-5 w-full flex justify-end right-6 top-0">
              <span
                className="text-base-400 bg-black/10 p-2 rounded-full cursor-pointer hover:bg-black/20"
                onClick={() => setIsQuestionBoxOpen(false)}
              >
                <RxCross2 className="text-xl font-bold" />
              </span>
            </div>
            <div className="w-full flex-1 flex flex-col gap-4 px-4 py-4 mt-6 pl-12 h-full overflow-hidden">
              <div className="w-full text-xl font-bold text-base-400">
                Asked by the post owner{" "}
              </div>
              <div className="font-bold text-sm text-base-400/80">
                All answer responses are private to the post owner.
              </div>
              <div className="flex flex-col gap-4 ml-4 flex-1 overflow-y-scroll">
                {questions.length == 0 ? (
                  <div className="text-base-400/80">
                    No questions for this post.
                  </div>
                ) : null}
                {questions.length >= 1 ? (
                  <>
                    <div className="w-full text-lg font-bold text-base-400">
                      1.{questions[0].question}
                    </div>
                    <textarea
                      className="placeholder:text-base-300 px-4 py-2 w-[90%] focus:outline-none ring-0 resize-none leading-relaxed overflow-hidden border border-base-300/40 rounded-md min-h-16"
                      placeholder="Event details..."
                      rows={1}
                      value={answer1}
                      onChange={(e) => {
                        const textarea = e.target;
                        setAnswer1(textarea.value);

                        // auto resize
                        textarea.style.height = "auto";
                        textarea.style.height = textarea.scrollHeight + "px";
                      }}
                    />
                  </>
                ) : null}
                {questions.length >= 2 ? (
                  <>
                    <div className="w-full text-lg font-bold text-base-400">
                      2.{questions[1].question}
                    </div>
                    <textarea
                      className="placeholder:text-base-300 px-4 py-2 w-[90%] focus:outline-none ring-0 resize-none leading-relaxed overflow-hidden border border-base-300/40 rounded-md min-h-16"
                      placeholder="Event details..."
                      rows={1}
                      value={answer2}
                      onChange={(e) => {
                        const textarea = e.target;
                        setAnswer2(textarea.value);

                        // auto resize
                        textarea.style.height = "auto";
                        textarea.style.height = textarea.scrollHeight + "px";
                      }}
                    />
                  </>
                ) : null}
                {questions.length >= 3 ? (
                  <>
                    <div className="w-full text-lg font-bold text-base-400">
                      3.{questions[2].question}
                    </div>
                    <textarea
                      className="placeholder:text-base-300 px-4 py-2 w-[90%] focus:outline-none ring-0 resize-none leading-relaxed overflow-hidden border border-base-300/40 rounded-md min-h-16"
                      placeholder="Event details..."
                      rows={1}
                      value={answer3}
                      onChange={(e) => {
                        const textarea = e.target;
                        setAnswer3(textarea.value);

                        // auto resize
                        textarea.style.height = "auto";
                        textarea.style.height = textarea.scrollHeight + "px";
                      }}
                    />
                  </>
                ) : null}
              </div>
              <div className="text-red-700 text-sm pl-3">{answerError}</div>
              <div className="flex flex-row gap-2 justify-end pr-8 pb-4 items-end">
                <div
                  className="px-4 py-2 border border-base-400 text-base-400 hover:border-base-400  hover:bg-base-400 hover:text-white font-bold rounded-md cursor-pointer transition-all duration-300"
                  onClick={() => setIsQuestionBoxOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className="px-4 py-2 bg-amber-800 border border-amber-800 text-white hover:bg-amber-900 font-bold rounded-md cursor-pointer transition-all duration-300"
                  onClick={handleSendRequest}
                >
                  Send Request
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <PostModal
        isOpen={isOpenComment}
        onClose={() => setIsOpenComment(false)}
        post={post}
        setComments={setComments}
        comments={comments}
      >
        <div className="bg-white px-4 pt-4 pb-1 flex flex-col w-full rounded-lg">
          <div className="flex gap-3 mb-3">
            <Image
              src={poster?.profile?.profile_url || "/golang.webp"}
              width={100}
              height={100}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-14 w-14 cursor-pointer hover:opacity-80"
              onClick={() => {
                router.push(`/profile/${poster?.username}`);
              }}
            />
            <div className="flex flex-1 flex-col">
              <div
                className="font-bold cursor-pointer hover:underline underline-offset-2 w-fit"
                onClick={() => {
                  router.push(`/profile/${poster?.username}`);
                }}
              >
                {poster?.profile?.display_name || "Unknown"}
              </div>
              {/* <div className="text-xs">4 hours ago</div> */}

              <div className="text-xs">
                {formatDistanceToNow(new Date(post.createdAt ?? 0))} ago
              </div>
            </div>
            {/* <div className="flex text-xs">dd/mm/yyyy</div> */}
            <div className="flex text-xs items-center h-fit">
              {new Date(post.createdAt ?? 0).toLocaleDateString("en-GB")}
              <div
                className="p-2 rounded-full cursor-pointer pointer-events-auto hover:bg-black/5 h-fit ml-2"
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <HiOutlineDotsHorizontal className="text-xl" />
              </div>
              <div className="relative">
                {isMenuOpen && (
                  <div className="absolute right-1 top-5 w-48 py-1 bg-white select-none rounded-md rounded-tr-none shadow-xl border border-base-300/60 flex flex-col z-10">
                    <div
                      className={`text-base text-base-400 py-2 pl-4 border-l-2 border-transparent hover:bg-black/5 select-none cursor-pointer flex items-center gap-2 
                    
                  `}
                      onClick={() => {
                        setIsReportOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <IoWarning className="text-lg" />
                      Report
                    </div>
                    <div
                      className={`text-base text-base-400 py-2 pl-4 border-l-2 border-transparent hover:bg-black/5 select-none cursor-pointer flex items-center gap-2 ${
                        post.postBy == user?.id ? "" : "hidden"
                      }
              `}
                      onClick={() => {
                        setIsDeleteOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      <IoTrashBin className="text-lg" />
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-3">{post.detail}</div>
          {post.imageUrl && (
            <Image
              src={post.imageUrl || "/golang.webp"}
              width={1000}
              height={1000}
              alt="post-pic"
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          )}
          <div className="flex flex-row gap-2 items-center my-1 text-sm text-base-400 mt-2">
            <div className="flex gap-1">
              {/* Draw icons and use them instead of these icons */}
              <FcLike className="" />
              <AiOutlineLike className="" />
            </div>
            {/* <div className="flex-1">Pavee Jeungtanasirikul and 18 others</div> */}
            <div className="flex-1">{likeCount} people like this</div>
            {/* <div className="flex-1">Liked by {likeCount} people</div> */}
            <div
              className="cursor-pointer hover:underline underline-offset-2"
              onClick={() => setIsOpenComment(true)}
            >
              {comments.length} comments
            </div>
          </div>
          <div className="flex-1 border-b border-base-300 my-1"></div>
          <div
            className={`grid ${
              post.eventId != 0 ? "grid-cols-5" : "grid-cols-3"
            } select-none`}
          >
            <div
              className="flex justify-center items-center font-bold text-base-400 text-xs md:text-sm cursor-pointer hover:bg-base-300/20 rounded-md py-2"
              onClick={handleLike}
            >
              <div className="flex gap-1">
                <AiOutlineLike
                  className={`text-xl ${isLiked ? "hidden" : ""}`}
                />
                <AiFillLike
                  className={`text-xl text-sky-600 ${isLiked ? "" : "hidden"}`}
                />
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
            <div
              className={`flex justify-center items-center font-bold text-base-400 text-xs md:text-sm cursor-pointer hover:bg-base-300/20 rounded-md py-2`}
            >
              <div className="flex gap-1">
                <IoIosSend className="text-xl" />
                Send
              </div>
            </div>
            {post.eventId != 0 && (
              <div
                className={`flex justify-center items-center font-bold text-base-400 text-xs md:text-sm ${
                  isAnswered
                    ? "cursor-default"
                    : "cursor-pointer hover:bg-base-300/20"
                }  rounded-md py-2 col-span-2`}
                onClick={() => {
                  if (isAnswered) {
                    return;
                  }
                  setIsQuestionBoxOpen(true);
                }}
              >
                {!isAnswered ? (
                  <div className="flex gap-1">
                    <FaPersonWalkingArrowRight className="text-xl" />
                    Request to join team
                  </div>
                ) : (
                  <div className="flex gap-2 text-green-700 font-bold items-center">
                    <FaCheck className="" />
                    Request sent
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={`${isOpenComment ? "" : "hidden"}`}>
          <div className="bg-white px-4 py-2 gap-2 flex flex-col">
            {comments.map((comment) =>
              comment.parentId == 0 ? (
                <RecursiveComment
                  key={comment.commentId}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                />
              ) : null
            )}
            {comments.length === 0 && (
              <div className="text-center text-base-400/70 italic h-16 flex items-center justify-center">
                No comments yet
              </div>
            )}
          </div>
        </div>
      </PostModal>
    </>
  );
}
