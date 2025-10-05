import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type FriendStatus = "friend" | "asked" | "pending" | "not friend";

interface Props {
  friendStatus: string;
  user: any; // the other user's id
  currentUser: any; // your id
  friends: any[]; // your friends list
  friendRequests: any[]; // pending requests
  fetchFriendStatus: () => void; // refresh function
  deleteFriend: (id: string) => Promise<void>;
  acceptFriend: (id: string) => Promise<void>;
  addFriend: (username: string, id: string) => Promise<void>;
  getAllFriendRequests: (user: any) => Promise<any[]>;
}

export const FriendStatusButton = ({
  friendStatus,
  user,
  currentUser,
  friends,
  friendRequests,
  fetchFriendStatus,
  deleteFriend,
  acceptFriend,
  addFriend,
  getAllFriendRequests,
}: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  const handleClickFriendStatus = async (action?: string) => {
    try {
      switch (friendStatus) {
        case "friend": {
          if (!action || action === "delete") {
            const friend = friends.find((f) => f.userInfo.id === user.id);
            if (friend) await deleteFriend(friend.id);
          }
          break;
        }

        case "asked": {
          if (!action) return;
          const request = friendRequests.find((f) => f.friendId === user.id);
          if (request) {
            if (action === "accept") await acceptFriend(request.id);
            else if (action === "deny") await deleteFriend(request.id);
          }
          break;
        }

        case "pending": {
          if (!action || action === "unrequest") {
            const hisRequests = await getAllFriendRequests({ id: user.id });
            const requestToCancel = hisRequests.find(
              (f) => f.friendId === currentUser.id
            );
            if (requestToCancel) await deleteFriend(requestToCancel.id);
          }
          break;
        }

        case "not friend":
        default: {
          if (!action || action === "send") {
            await addFriend(user.username, currentUser.id);
          }
          break;
        }
      }

      fetchFriendStatus();
      setOpenDropdown(false); // close dropdown after action
    } catch (err) {
      console.error("Error handling friend status:", err);
    }
  };

  // Determine main button text and dropdown options
  let buttonText = "";
  let dropdownOptions: { label: string; action: string }[] = [];

  switch (friendStatus) {
    case "friend":
      buttonText = "Friend";
      dropdownOptions = [{ label: "Delete Friend", action: "delete" }];
      break;
    case "asked":
      buttonText = "Request To You";
      dropdownOptions = [
        { label: "Accept", action: "accept" },
        { label: "Deny", action: "deny" },
      ];
      break;
    case "pending":
      buttonText = "Pending";
      dropdownOptions = [{ label: "Un Request", action: "unrequest" }];
      break;
    case "not friend":
      buttonText = "Not Your Friend";
      dropdownOptions = [{ label: "Send Request", action: "send" }];
      break;
  }

  return (
    <div className="relative inline-block">
      <button
        className="px-3 py-1 w-auto bg-transparent font-bold text-amber-800 border-amber-800/90 border rounded-full hover:bg-amber-900/20 flex flex-row items-center gap-2"
        onClick={toggleDropdown}
      >
        {buttonText} {openDropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {openDropdown && (
        <div className="absolute mt-1 border-amber-800/90 rounded-lg  z-10 w-36 text-right bg-base-100 font-bold">
          {dropdownOptions.map((opt) => (
            <button
              key={opt.action}
              className="block px-4 py-2  w-full text-left hover:bg-base-300/50 rounded-lg"
              onClick={() => handleClickFriendStatus(opt.action)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
