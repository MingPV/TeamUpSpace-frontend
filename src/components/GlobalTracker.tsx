"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";
// import { timestampLastvisit } from "@/app/api/user";

export default function GlobalTracker() {
  const { user } = useUser(); // assuming your context provides user data

  useEffect(() => {
    if (!user) return;

    const handleUnload = async () => {
      console.log("unload");
      // comment this because unuse by ming
      // await timestampLastvisit(user.id);
      const data = JSON.stringify({ user_id: user.id });

      //   navigator.sendBeacon("/api/v1/lastvisit", data);
    };

    // const handleVisibilityChange = async () => {
    //   // Only trigger when tab is NOT visible
    //   if (document.visibilityState === "hidden" && user?.id) {
    //     console.log("close tab");
    //     await timestampLastvisit(user.id);

    //     const data = JSON.stringify({ user_id: user.id });
    //     // navigator.sendBeacon("/api/v1/lastvisit", data);
    //   }
    // };

    window.addEventListener("beforeunload", handleUnload);
    // document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      //   document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [user]);

  return null; // no UI, just effect
}
