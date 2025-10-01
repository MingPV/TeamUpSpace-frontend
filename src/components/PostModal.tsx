"use client";

import React, { useRef, useState } from "react";

import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { IoSend } from "react-icons/io5";
import { createComment } from "@/app/api/post";
import { Post } from "@/app/types/post";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Comment } from "@/app/types/comment";

export default function PostModal({
  children,
  isOpen,
  onClose,
  post,
  setComments,
  comments,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  post: Post;
  setComments?: React.Dispatch<React.SetStateAction<Comment[]>>;
  comments?: Comment[];
}) {
  const [commentText, setCommentText] = useState("");

  const { user } = useUser();
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setCommentText(textarea?.value || "");
  };

  const handlePostComment = () => {
    if (!user) {
      console.log("User not logged in");
      router.push("/sign-in");
      return;
    }

    if (!post.id) {
      return;
    }

    // Handle posting the comment
    console.log("Posting comment:", commentText);

    createComment(post.id, user.id, commentText).then((newComment) => {
      console.log("Comment created:", newComment);
      if (setComments && newComment && newComment.comment) {
        setComments((prevComments) => [newComment.comment, ...prevComments]);
      }
      console.log("Comments updated", comments);
    });

    // Clear the textarea after posting

    setCommentText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  if (!isOpen) return <div>{children}</div>;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-45" onClick={onClose} />
      {/* Modal */}
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-full md:max-w-[90vw] lg:max-w-[50vw] max-h-[90vh] flex flex-col">
        <div
          className="bg-white rounded-xl shadow-lg overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute border-b border-b-base-300 w-full flex items-center justify-center py-5 text-xl font-bold bg-white rounded-t-xl">
            Posted by Example Name
          </div>
          <div className="absolute py-5 w-full flex justify-end right-4 -top-1">
            <span
              className="text-base-400 bg-black/10 p-2 rounded-full cursor-pointer hover:bg-black/20"
              onClick={onClose}
            >
              <RxCross2 className="text-xl font-bold" />
            </span>
          </div>
          <div className="mt-18 mb-24 z-49">{children}</div>
          <div className="absolute bottom-0 border-b border-b-base-300 w-full flex items-center justify-center pt-3 pb-5 px-4 text-xl bg-white rounded-b-xl border-t border-t-base-300/30 gap-2">
            <Image
              src={user?.profile.profile_url || "/golang.webp"}
              width={100}
              height={100}
              alt="profile-pic"
              style={{ objectFit: "cover" }}
              className="rounded-full h-8 w-8 cursor-pointer"
            />
            <div className="w-full py-3 bg-base-300/20 rounded-3xl flex items-center justify-between">
              <div className="flex-wrap w-2/3">
                <textarea
                  className="bg-transparent focus:outline-none w-full text-sm ml-4 placeholder:text-base-300 resize-none"
                  placeholder="Type your comment..."
                  ref={textareaRef}
                  value={commentText}
                  onInput={handleInput}
                  rows={1}
                />
              </div>
              <IoSend
                className="text-xl mr-4 text-base-300 self-end mb-1 cursor-pointer hover:text-base-500"
                onClick={handlePostComment}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
