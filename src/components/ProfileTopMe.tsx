"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FaChevronDown, FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { Profile } from "@/app/types/profile";
import { User, UserFollow } from "@/app/types/user";
import { UNIVERSITYS } from "@/constants/universitys";
import { getFollowers, updateUserProfile } from "@/app/api/user";

export default function ProfileTopMe({
  user,
  postCount,
}: {
  user: User;
  postCount: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  // const [newProfile, setNewProfile] = useState<Profile>(user?.profile || {});
  const [isUniversityOpen, setIsUniversityOpen] = useState(false);
  const [searchingName, setSearchingName] = useState("");

  const [userFollows, setUserFollows] = React.useState<UserFollow[]>([]);

  const [profile, setProfile] = useState<Profile>(user.profile || {});
  const [newProfile, setNewProfile] = useState<Profile>(user.profile || {});

  console.log("user profile:", user.profile);

  const [selectedProfileFile, setSelectedProfileFile] = useState<
    File | undefined
  >(undefined);
  const [selectedBackgroundFile, setSelectedBackgroundFile] = useState<
    File | undefined
  >(undefined);

  const [previewProfileUrl, setPreviewProfileUrl] = useState<string | null>(
    null
  );
  const [previewBackgroundUrl, setPreviewBackgroundUrl] = useState<
    string | null
  >(null);

  const [selectedResumeFile, setSelectedResumeFile] = useState<
    File | undefined
  >(undefined);
  const [isUploadedResume, setIsUploadedResume] = useState(false);
  const [previewResumeUrl, setPreviewResumeUrl] = useState<string | null>(null);

  const [fileUploadError, setFileUploadError] = useState<string | null>(null);

  const [filteredUniversitys, setFilteredUniversitys] =
    useState<string[]>(UNIVERSITYS);

  const handleToggleEdit = () => {
    if (isEditing) {
      setNewProfile(profile);
    }

    setIsEditing(!isEditing);
  };

  const handleOnSave = () => {
    updateUserProfile(
      user.id,
      newProfile,
      selectedProfileFile,
      selectedBackgroundFile,
      selectedResumeFile
    )
      .then((data) => {
        console.log("Profile updated:", data);
        setProfile(newProfile);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const handleSearchUniversity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchingName(e.target.value);
    const filtered = UNIVERSITYS.filter((university) =>
      university.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUniversitys(filtered);
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "background" | "resume"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // check file size less than 1MB
    if (file.size > 1 * 1024 * 1024) {
      setFileUploadError("File size should be less than 1MB");
      return;
    } else {
      setFileUploadError(null);
    }

    if (type === "profile") {
      setSelectedProfileFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewProfileUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else if (type === "background") {
      setSelectedBackgroundFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewBackgroundUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else if (type === "resume") {
      // Handle resume file if needed
      setSelectedResumeFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewResumeUrl(reader.result as string);
      reader.readAsDataURL(file);
      setIsUploadedResume(true);
    }
  };

  useEffect(() => {
    const loadFollowers = async () => {
      if (!user || !user.id) {
        return;
      }
      const res = await getFollowers(user.id);
      setUserFollows(res);
    };

    loadFollowers();
  }, [user]);

  if (!user) {
    return <div>not found</div>;
  }

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="flex flex-col w-full rounded-lg bg-white">
        {/* Background */}
        <div
          onClick={() => document.getElementById("backgroundUpload")?.click()}
          className="relative cursor-pointer"
        >
          <Image
            src={
              previewBackgroundUrl || profile?.background_url || "/golang.webp"
            }
            width={300}
            height={300}
            alt="background"
            style={{ objectFit: "cover" }}
            className="w-full h-52 rounded-t-lg hover:opacity-80"
          />
          <input
            id="backgroundUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e, "background")}
          />
        </div>
        <div className="flex flex-col mx-8 relative -top-8 gap-2">
          <div className="flex items-center gap-8">
            {/* Profile */}
            <div
              onClick={() => document.getElementById("profileUpload")?.click()}
              className="relative cursor-pointer"
            >
              <Image
                src={
                  previewProfileUrl || profile?.profile_url || "/golang.webp"
                }
                width={150}
                height={150}
                alt="profile-pic"
                style={{ objectFit: "cover" }}
                className="rounded-full h-[150px] w-[150px] border-4 border-white hover:opacity-80"
              />
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e, "profile")}
              />
            </div>
            <div className="relative top-2 flex flex-row gap-2 items-end">
              <div className="mr-8">
                {profile?.display_name ? (
                  <>
                    {isEditing ? (
                      <div className="p-1 bg-black/5 rounded-md border border-base-300/30">
                        <input
                          className="p-1 ring-0 focus:outline-0 text-4xl font-bold"
                          value={newProfile.display_name}
                          onChange={(e) => {
                            setNewProfile({
                              ...newProfile,
                              display_name: e.target.value,
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-4xl font-bold">
                        {profile.display_name}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-xl font-bold opacity-50">Unknown</div>
                )}
              </div>
              <div
                className={`text-lg text-base-400 font-bold ${
                  isEditing ? "hidden" : ""
                }`}
              >
                47 friends
              </div>
              <div
                className={`text-lg text-base-400 font-bold ${
                  isEditing ? "hidden" : ""
                }`}
              >
                {userFollows.length} followers
              </div>
              <div
                className={`text-lg text-base-400 font-bold ${
                  isEditing ? "hidden" : ""
                }`}
              >
                {postCount} posts
              </div>
            </div>

            <div className="flex-1 flex justify-end">
              <FaPencilAlt
                className="text-xl text-base-300 cursor-pointer hover:text-base-500"
                onClick={handleToggleEdit}
              />
            </div>
          </div>
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col relative top-1 gap-2 ml-4">
              {user?.username ? (
                <div className="">username: {user.username}</div>
              ) : (
                <div>username: unknown</div>
              )}
              {isEditing ? (
                <div className="flex flex-row gap-2 items-center">
                  <div className="font-bold text-base-400">Major: </div>
                  <div className="p-1 bg-base-200/30 rounded-md border border-base-300/30">
                    <input
                      value={newProfile.major ?? ""}
                      className="text-lg p-1 ring-0 focus:outline-0 font-bold text-base-400"
                      onChange={(e) => {
                        setNewProfile({
                          ...newProfile,
                          major: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              ) : profile?.major ? (
                <div className="text-xl font-bold text-base-400/90">
                  {profile.major}
                </div>
              ) : (
                <div className="text-xl opacity-50">major not set</div>
              )}
              {isEditing ? (
                <div className="flex flex-row gap-2 items-center">
                  <div className="font-bold text-base-400">Location: </div>
                  <div className="p-1 bg-base-200/30 rounded-md border border-base-300/30">
                    <input
                      value={newProfile.location ?? ""}
                      className="text-lg p-1 ring-0 focus:outline-0 font-bold text-base-400"
                      onChange={(e) => {
                        setNewProfile({
                          ...newProfile,
                          location: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              ) : profile?.location ? (
                <div className="text-xl font-bold text-base-400/90">
                  {profile.location}
                </div>
              ) : (
                <div className="text-xl opacity-50">location not set</div>
              )}
              {isEditing ? (
                <div className="flex flex-row gap-2 items-center">
                  <div className="font-bold text-base-400">University: </div>
                  <div
                    className="p-1 bg-base-200/30 rounded-md border border-base-300/30 font-bold text-base-400/60 px-2 py-2 cursor-pointer select-none hover:bg-black/10 flex gap-2 items-center"
                    onClick={() => setIsUniversityOpen(!isUniversityOpen)}
                  >
                    {newProfile.university ?? "Select university"}
                    <FaChevronDown />
                  </div>
                </div>
              ) : profile?.university ? (
                <div className="flex flex-row gap-1 items-center relative top-1 mt-2">
                  <Image
                    src={"/golang.webp"}
                    width={50}
                    height={50}
                    alt="profile-pic"
                    style={{ objectFit: "cover" }}
                    className="rounded-lg h-8 w-8 border-white"
                  />
                  <div className="font-bold text-lg ml-2">
                    {profile.university}
                  </div>
                </div>
              ) : (
                <div className="text-xl opacity-50">university not set</div>
              )}
              {isUniversityOpen && isEditing && (
                <div className="absolute right-8 top-46 w-60 h-80 overflow-scroll bg-white select-none rounded-md shadow-xl border border-base-300/60 flex flex-col z-10">
                  <input
                    className="p-2 border-b border-base-300/30 focus:outline-0 ring-0 bg-base-200/30"
                    placeholder="search name"
                    value={searchingName}
                    onChange={handleSearchUniversity}
                  />
                  {filteredUniversitys.map((university: string) => (
                    <div
                      key={university}
                      className={`text-base text-base-400 py-2 pl-4 border-l-2 border-transparent hover:bg-black/5 select-none cursor-pointer ${
                        newProfile.university === university
                          ? "bg-black/5 border-l-2 border-black font-bold"
                          : ""
                      }`}
                      onClick={() => {
                        setNewProfile({
                          ...newProfile,
                          university: university,
                        });
                        setIsUniversityOpen(false);
                      }}
                    >
                      {university}
                    </div>
                  ))}
                </div>
              )}

              {isEditing ? (
                <div className="flex flex-row gap-2 items-center">
                  <div className="font-bold text-base-400">
                    Resume / Portfolio:{" "}
                  </div>
                  <div className="p-1">
                    <div
                      className="px-4 py-1 bg-amber-800 text-white font-bold rounded-full cursor-pointer hover:bg-amber-900 transition-all duration-300"
                      onClick={() =>
                        document.getElementById("resumeUpload")?.click()
                      }
                    >
                      {isUploadedResume ? "File Uploaded" : "Upload File"}
                    </div>
                    <input
                      id="resumeUpload"
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handleFileSelect(e, "resume")}
                    />
                  </div>
                  {isUploadedResume && (
                    // click to download the file
                    <a
                      className="p-2 rounded-full cursor-pointer hover:underline underline-offset-2"
                      href={previewResumeUrl || "#"}
                      download
                    >
                      {selectedResumeFile?.name}
                    </a>
                  )}
                </div>
              ) : null}

              {/* file upload error */}
              {fileUploadError && isEditing && (
                <div className="text-red-500 text-sm">{fileUploadError}</div>
              )}

              <div
                className={`w-full mt-4 flex flex-row gap-2 ${
                  isEditing ? "hidden" : ""
                }`}
              >
                <a
                  className="px-4 py-1 text-base-500 bg-base-200 font-bold rounded-full hover:bg-base-300/80 cursor-pointer"
                  href={profile?.resume || "#"}
                  download
                >
                  Get Resume {profile?.resume ? "" : "(not set)"}
                </a>
                <div className="px-4 py-1 text-amber-800/90 font-bold rounded-full border-[1px] border-amber-800/90 hover:bg-amber-800/20 cursor-pointer">
                  Check Team Requests
                </div>
              </div>
            </div>
          </div>
          <div className={`flex-1 flex mt-8 ${isEditing ? "hidden" : ""}`}>
            <div className="w-fit flex flex-col gap-2 border-[1px] border-base-200 rounded-md py-2 px-4">
              <div className="ml-2 mt-2 flex flex-row justify-between items-center">
                <div className="font-bold">Friend (47 friends)</div>
                <div className="font-bold hover:underline underline-offset-2 text-base-400 text-sm mr-2 cursor-pointer">
                  View all
                </div>
              </div>

              <div className={`flex flex-row flex-wrap gap-2`}>
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

          <div className="flex flex-col gap-2 mt-12 pt-6 pb-2 px-4 border-t-[1px] border-base-300/50">
            <div className="font-rollingStone text-2xl text-base-400">
              About me
            </div>
            {isEditing ? (
              <textarea
                className="w-full h-24 p-2 bg-base-200/30 rounded-md border border-base-300/30 focus:outline-0 ring-0 resize-none"
                value={newProfile.description ?? ""}
                onChange={(e) => {
                  setNewProfile({
                    ...newProfile,
                    description: e.target.value,
                  });
                }}
              />
            ) : profile?.description ? (
              <div className="bg-base-200/30 p-4 h-52">
                {profile.description}
              </div>
            ) : (
              <div className="bg-base-200/30 p-4 h-52">description not set</div>
            )}
          </div>
          <div
            className={`flex flex-row gap-2 justify-end pr-4 pb-2 ${
              isEditing ? "" : "hidden"
            }`}
          >
            <div
              className="px-4 py-2 border border-base-400 text-base-400  hover:bg-black/10 font-bold rounded-md cursor-pointer transition-all duration-300"
              onClick={handleToggleEdit}
            >
              Cancel
            </div>
            <div
              className="px-4 py-2 bg-amber-700 text-white hover:bg-amber-800 font-bold rounded-md cursor-pointer transition-all duration-300"
              onClick={handleOnSave}
            >
              Save
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4 justify-center items-center w-full mt-6 mb-6">
        <div className="border-b-[1px] border-base-300 flex-1"></div>
        {user?.profile?.display_name ? (
          <div className="text-4xl text-base-400 font-rollingStone">{`${profile.display_name} Posts`}</div>
        ) : (
          <div className="text-4xl text-base-400 font-rollingStone opacity-50">{`Unknown Posts`}</div>
        )}
        <div className="border-b-[1px] border-base-300 flex-1"></div>
      </div>
    </div>
  );
}
