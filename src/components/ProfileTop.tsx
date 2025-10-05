/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { reportUser } from "@/app/api/report";
import { useUser } from "@/context/UserContext";
import { IoWarning } from "react-icons/io5";

export default function ProfileTop({ user }: { user: any }) {
  const { user: currentUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isReportOpen, setIsReportOpen] = React.useState(false);
  const [selectedReportIndex, setSelectedReportIndex] = React.useState(0);
  const [reason, setReason] = React.useState("");
  const [otherReportText, setOtherReportText] = React.useState("");

  const handleReport = () => {
    if (!user || !currentUser) {
      return;
    }
    if (selectedReportIndex == 6) {
      reportUser(currentUser.id, user.id, otherReportText);
    } else {
      reportUser(currentUser.id, user.id, reason);
    }
    setIsReportOpen(false);
    setSelectedReportIndex(0);
    setOtherReportText("");
    setReason("");
  };

  if (!user) {
    return <div>not found</div>;
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
                Why are you reporting this user?{" "}
              </div>
              <div className="font-bold text-sm text-base-400/80">
                Let us know what’s wrong with this user.
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
                        "This user is sending spam or unsolicited messages."
                      );
                    }}
                  />
                  <div>This user is sending spam or unsolicited messages.</div>
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
                        "This user is engaging in harassment, bullying, or abusive behavior."
                      );
                    }}
                  />
                  <div>
                    This user is engaging in harassment, bullying, or abusive
                    behavior.
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <input
                    type="radio"
                    checked={selectedReportIndex == 3}
                    readOnly
                    className="w-6"
                    onClick={() => {
                      setSelectedReportIndex(3);
                      setReason("This user is impersonating someone else.");
                    }}
                  />
                  <div>This user is impersonating someone else.</div>
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
                        "This user is sharing false or misleading information."
                      );
                    }}
                  />
                  <div>
                    This user is sharing false or misleading information.
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
                        "This user is using hate speech or discriminatory language."
                      );
                    }}
                  />
                  <div>
                    This user is using hate speech or discriminatory language.
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
                  onClick={() => setIsReportOpen(false)}
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

      <div className="w-full flex flex-col items-center gap-2">
        <div className="flex flex-col w-full rounded-lg bg-white">
          <Image
            src={"/golang.webp"}
            width={300}
            height={300}
            alt="bg-profile-pic"
            style={{ objectFit: "cover" }}
            className="w-full h-52 rounded-t-lg"
          />
          <div className="flex flex-col mx-8 relative -top-8 gap-2">
            <div className="flex items-center gap-8">
              <Image
                src={user?.profile?.profile_url || "/golang.webp"}
                width={150}
                height={150}
                alt="profile-pic"
                style={{ objectFit: "cover" }}
                className="rounded-full h-[150px] w-[150px] border-4 border-white"
              />
              <div className="relative top-2 flex flex-row gap-2 items-end">
                <div className="mr-8">
                  {user?.profile?.display_name ? (
                    <div className="text-4xl font-bold">
                      {user.profile.display_name}
                    </div>
                  ) : (
                    <div className="text-xl font-bold opacity-50">Unknown</div>
                  )}
                </div>
                <div className="text-lg text-base-400 font-bold">
                  47 friends
                </div>
                <div className="text-lg text-base-400 font-bold">4 posts</div>
              </div>

              <div className="flex-1 flex justify-end">
                {/* <FaPencilAlt
                className="text-xl text-base-300 hidden cursor-pointer hover:text-base-500"
                onClick={() => {}}
              /> */}
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
                    <div className="absolute right-2 top-10 w-48 py-1 bg-white select-none rounded-md rounded-tr-none shadow-xl border border-base-300/60 flex flex-col z-10">
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
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="flex flex-col relative top-1 gap-2 ml-4">
                <div className="">username: mingpv</div>
                {user?.profile?.faculty ? (
                  <div className="text-xl">{user.profile.faculty}</div>
                ) : (
                  <div className="text-xl opacity-50">faculty not set</div>
                )}
                {user?.profile?.location ? (
                  <div className="text-xl text-base-400">
                    {user.profile.location}
                  </div>
                ) : (
                  <div className="text-xl text-base-400 opacity-50">
                    location not set
                  </div>
                )}
                {user?.profile?.university ? (
                  <div className="flex flex-row gap-1 items-center relative top-1">
                    <Image
                      src={"/golang.webp"}
                      width={50}
                      height={50}
                      alt="profile-pic"
                      style={{ objectFit: "cover" }}
                      className="rounded-lg h-8 w-8 border-white"
                    />
                    <div className="font-bold text-lg">
                      {user.profile.university}
                    </div>
                    {/* <div className="relative -top-16 ml-6">
                      <FaPencilAlt
                        className="text-xl text-base-300 cursor-pointer hover:text-base-500"
                        onClick={() => {
                          router.push("/profile");
                        }}
                      />
                    </div> */}
                  </div>
                ) : null}

                <div className="w-full mt-4 flex flex-row gap-2">
                  <div className="px-4 py-1 text-base-500 bg-base-200 font-bold rounded-full hover:bg-base-300/80 cursor-pointer">
                    Get Resume
                  </div>
                  <div className="px-4 py-1 text-amber-800/90 font-bold rounded-full border-[1px] border-amber-800/90 hover:bg-amber-800/20 cursor-pointer">
                    Add Friend
                  </div>
                  <div className="px-4 py-1 text-base-400 font-bold rounded-full border-[1px] border-base-300 hover:bg-black/10 cursor-pointer">
                    Send Message
                  </div>
                </div>
              </div>
              <div className="flex-1 flex xl:justify-end mt-4 xl:mt-0">
                <div className="w-fit flex flex-col gap-2 border-[1px] border-base-200 rounded-md py-2 px-4">
                  <div className="ml-2 mt-2 flex flex-row justify-between items-center">
                    <div className="font-bold">Friend (47 friends)</div>
                    <div className="font-bold hover:underline underline-offset-2 text-base-400 text-sm mr-2 cursor-pointer">
                      View all
                    </div>
                  </div>

                  <div className="flex flex-row flex-wrap gap-2">
                    <div className="flex flex-col gap-1 items-center hover:bg-black/10 rounded-md cursor-pointer p-1">
                      <Image
                        src={user?.profile?.profile_url || "/golang.webp"}
                        width={120}
                        height={120}
                        alt="profile-pic"
                        style={{ objectFit: "cover" }}
                        className="rounded-md h-[120px] w-[120px]"
                      />
                      <div className="text-xs font-bold text-base-400">
                        Example friend name
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-center hover:bg-black/10 rounded-md cursor-pointer p-1">
                      <Image
                        src={user?.profile?.profile_url || "/golang.webp"}
                        width={120}
                        height={120}
                        alt="profile-pic"
                        style={{ objectFit: "cover" }}
                        className="rounded-md h-[120px] w-[120px]"
                      />
                      <div className="text-xs font-bold text-base-400">
                        Example friend name
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-center hover:bg-black/10 rounded-md cursor-pointer p-1">
                      <Image
                        src={user?.profile?.profile_url || "/golang.webp"}
                        width={120}
                        height={120}
                        alt="profile-pic"
                        style={{ objectFit: "cover" }}
                        className="rounded-md h-[120px] w-[120px]"
                      />
                      <div className="text-xs font-bold text-base-400">
                        Example friend name
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-12 pt-6 pb-2 px-4 border-t-[1px] border-base-300/50">
              <div className="font-rollingStone text-2xl text-base-400">
                About me
              </div>
              <div className="bg-base-200/30 p-4 h-52">detail</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center items-center w-full mt-6 mb-6">
          <div className="border-b-[1px] border-base-300 flex-1"></div>
          {user?.profile?.display_name ? (
            <div className="text-4xl text-base-400 font-rollingStone">{`${user.profile.display_name} Posts`}</div>
          ) : (
            <div className="text-4xl text-base-400 font-rollingStone opacity-50">{`Unknown Posts`}</div>
          )}
          <div className="border-b-[1px] border-base-300 flex-1"></div>
        </div>
      </div>
    </>
  );
}
