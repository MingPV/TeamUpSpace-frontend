import React, { useEffect } from "react";
import Image from "next/image";
import { Friend } from "@/app/types/friend";
import { addFriend } from "@/app/api/friend";
import { useUser } from "@/context/UserContext";
import { UserFollow } from "@/app/types/user";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "@/app/api/user";

export default function RecommendedFriendCard2({ friend }: { friend: Friend }) {
  const { user, addFriendFromRecommend } = useUser();

  const [isFollowed, setIsFollowed] = React.useState<boolean>(false);
  const [userFollowings, setUserFollowings] = React.useState<UserFollow[]>([]);
  const handleFollow = () => {
    if (!user) return;
    if (isFollowed) {
      // if already follow, do unfollow
      unfollowUser(user.id, friend.userInfo.id);
      setUserFollowings(
        userFollowings.filter((f) => f.userId !== friend.userInfo.id)
      );
      setIsFollowed(false);
    } else {
      // if already follow, do nothing
      if (userFollowings.find((f) => f.followTo === friend.userInfo.id)) return;
      followUser(user.id, friend.userInfo.id);
      setUserFollowings([
        ...userFollowings,
        {
          userId: user.id,
          followTo: friend.userInfo.id,
          createdAt: new Date().toISOString(),
        },
      ]);
      setIsFollowed(true);
    }
  };

  const handleClickAddFriend = async () => {
    if (user) {
      await addFriendFromRecommend(friend.userInfo.username);
      console.log("here");
    }
  };

  useEffect(() => {
    const loadFollowers = async () => {
      if (!user || !user.id) {
        return;
      }
      const res = await getFollowing(user.id);
      setUserFollowings(res);
      console.log("followers", res);
      if (friend) {
        setIsFollowed(
          res.some(
            (f: UserFollow) =>
              f.userId === user.id && f.followTo === friend.userInfo.id
          )
        );
      }
    };

    loadFollowers();
  }, [friend, user]);

  return (
    <div className="flex gap-4">
      <Image
        src={"/golang.webp"}
        width={100}
        height={100}
        alt="profile-pic"
        style={{ objectFit: "cover" }}
        className="rounded-full h-14 w-14 hover:opacity-80 cursor-pointer"
      />
      <div className="flex flex-1 flex-col">
        <div className="font-bold hover:underline underline-offset-2 cursor-pointer">
          {friend.userInfo.profile.display_name}
        </div>
        <div className="text-xs">{friend.userInfo.profile.university}</div>
        <div className="text-xs text-base-400/50">
          {friend.mutualFriends} mutual friend(s)
        </div>
        <div className="flex flex-row gap-2">
          <div
            className="px-4 py-1 border border-base-300 rounded-full w-fit h-fit mt-2  cursor-pointer hover:bg-black/10 hover:border-base-400"
            onClick={handleFollow}
          >
            {/* <div className="flex flex-row gap-2 justify-center items-center font-bold text-base-400">
              <div>+</div>
              <div>Follow</div>
            </div> */}
            {isFollowed ? (
              <div className="flex flex-row gap-2 justify-center items-center font-bold">
                <div>✓</div>
                <div>Following</div>
              </div>
            ) : (
              <div className="flex flex-row gap-2 justify-center items-center font-bold">
                <div>+</div>
                <div>Follow</div>
              </div>
            )}
          </div>
          <div className="px-4 py-1 rounded-full w-fit h-fit mt-2  cursor-pointer bg-base-200 hover:bg-base-300">
            <div className="flex flex-row gap-2 justify-center items-center font-bold text-base-400">
              <button onClick={handleClickAddFriend}>Add Friend</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
