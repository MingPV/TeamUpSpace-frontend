import React, { useRef } from "react";

import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { IoSend } from "react-icons/io5";

export default function PostModal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
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
          <div className="mt-18 mb-24">{children}</div>
          <div className="absolute bottom-0 border-b border-b-base-300 w-full flex items-center justify-center pt-3 pb-5 px-4 text-xl bg-white rounded-b-xl border-t border-t-base-300/30 gap-2">
            <Image
              src={"/golang.webp"}
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
                  onInput={handleInput}
                  rows={1}
                />
              </div>
              <IoSend className="text-xl mr-4 text-base-300 self-end mb-1 cursor-pointer hover:text-base-500" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
