"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@/app/types/comment";
import { IoSend } from "react-icons/io5";
import { createComment } from "@/app/api/post";
import { User } from "@/app/types/user";
import { ProfileCamelCase } from "@/app/types/profile";
import { getProfileByUserId, getUserById } from "@/app/api/auth";
import { useRouter } from "next/navigation";

type Props = {
  comment: Comment;
  setSubComments?: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
  setComments?: React.Dispatch<React.SetStateAction<Comment[]>>;
  setIsShowReply?: React.Dispatch<React.SetStateAction<boolean>>;
  comments?: Comment[];
  user?: User;
};

export default function CommentCard({
  comment,
  setSubComments,
  setComments,
  setIsShowReply,
  comments,
  user,
}: Props) {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commenter, setCommenter] = useState<User>();

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    setCommentText(textarea?.value || "");
  };

  const handlePostComment = () => {
    if (!comment.postId || !user) {
      return;
    }

    // Handle posting the comment
    console.log("Posting comment:", commentText);

    createComment(comment.postId, user.id, commentText, comment.commentId).then(
      (newComment) => {
        console.log("Comment created:", newComment);
        if (setComments && setSubComments && newComment && newComment.comment) {
          setSubComments((prevComments) => [
            newComment.comment,
            ...(prevComments ?? []),
          ]);
          setComments((prevComments) => [
            newComment.comment,
            ...(prevComments ?? []),
          ]);
        }
        console.log("Comments updated", comments);
      }
    );

    // Clear the textarea after posting
    setCommentText("");
    if (setIsShowReply) {
      setIsShowReply(true);
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  useEffect(() => {
    const loadCommenter = async () => {
      if (comment && comment.commentBy) {
        const res = (await getUserById(comment.commentBy)) as User;
        if (res) {
          setCommenter(res);
        }
      }
    };
    loadCommenter();
  }, [comment]);

  return (
    <div className="flex gap-2">
      <Image
        src={commenter?.profile?.profile_url || "/golang.webp"}
        width={100}
        height={100}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-full h-8 w-8 cursor-pointer hover:opacity-80"
        onClick={() => {
          router.push(`/profile/${commenter?.username}`);
        }}
      />
      <div className="flex flex-col w-full">
        <div className="flex-wrap w-fit max-w-2/3 lg:max-w-1/2 py-2 px-4 bg-base-300/20 rounded-xl flex">
          <div className="flex flex-col">
            <div
              className="text-sm font-bold hover:underline underline-offset-2 cursor-pointer w-fit"
              onClick={() => {
                router.push(`/profile/${commenter?.username}`);
              }}
            >
              {commenter?.profile?.display_name || "Unknown"}
            </div>
            <div className="text-sm">{comment.detail}</div>
          </div>
        </div>
        <div className="flex gap-3 ml-2 mt-0.5">
          <div className="text-xs text-base-400/70 font-bold">
            {formatDistanceToNow(new Date(comment.createdAt ?? 0))}
          </div>
          <div
            className="text-xs text-base-400/70 font-bold cursor-pointer hover:underline hover:text-base-500"
            onClick={() => setIsOpenComment(!isOpenComment)}
          >
            Reply
          </div>
        </div>
        {isOpenComment && (
          <div className="w-1/2 py-1 pt-2 bg-base-300/20 rounded-3xl flex items-center justify-between mt-2 ml-2">
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
        )}
      </div>
    </div>
  );
}
