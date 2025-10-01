"use client";

import React, { useEffect } from "react";
import { Comment } from "@/app/types/comment";
import { useState } from "react";
import CommentCard from "./CommentCard";
import { useUser } from "@/context/UserContext";

type Props = {
  comment: Comment;
  comments?: Comment[];
  setComments?: React.Dispatch<React.SetStateAction<Comment[]>>;
};

export default function RecursiveComment({
  comment,
  comments,
  setComments,
}: Props) {
  const [subComments, setSubComments] = useState<Comment[]>();
  const [isShowReply, setIsShowReply] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const filteredSubComments = comments?.filter(
      (c) => c.parentId === comment.commentId
    );
    if (filteredSubComments && filteredSubComments.length > 0) {
      setSubComments(filteredSubComments);
    }
  }, [comment.commentId, comments]);

  return (
    <div className="flex flex-col gap-2">
      <CommentCard
        comment={comment}
        comments={comments}
        setComments={setComments}
        setSubComments={setSubComments}
        setIsShowReply={setIsShowReply}
        user={user}
      />
      {subComments && subComments.length > 0 && !isShowReply && (
        <div
          className="text-sm text-base-400/80 hover:underline cursor-pointer pl-12 ml-3 border-l border-base-300"
          onClick={() => setIsShowReply(true)}
        >
          view {subComments?.length} reply comments
        </div>
      )}

      {subComments && isShowReply && (
        <div className="flex flex-col gap-2 pl-8 ml-3 border-l border-base-300">
          {subComments.map((subComment) => (
            <RecursiveComment
              key={subComment.commentId}
              comment={subComment}
              comments={comments}
              setComments={setComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
