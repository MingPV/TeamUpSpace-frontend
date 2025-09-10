/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "../api/auth";
import { FaHandPointLeft } from "react-icons/fa6";
import { signInWithGoogle } from "../api/auth";

export default function Home() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await signIn(emailOrUsername, password);
      if (res.error) {
        setError("Invalid email/username or password");
        return;
      }
      console.log(res);
      console.log("Sign in successful");
      //redirect with reload browser
      window.location.href = "/";
    } catch (err: any) {
      setError("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link
        className="fixed top-6 left-6 text-base-400 font-bold flex flex-row gap-2 items-center py-2 px-4 border-t-[1px] border-b-[1px] border-base-300 text-xl hover:bg-black/5 cursor-pointer"
        href={"/"}
      >
        <FaHandPointLeft />
        Home
      </Link>
      <Image
        src={"/images/cat1.png"}
        width={300}
        height={300}
        alt="LoginCat"
        className="fixed right-0 -bottom-24"
      />
      <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col">
        <Image
          src={"/images/dog1.png"}
          width={100}
          height={100}
          alt="LoginCat"
          className="relative top-7 right-28"
          style={{ rotate: "20deg" }}
        />
        <div className="w-[30vw] px-12 py-16 bg-white flex flex-col gap-4 shadow-2xl mb-32">
          <div className="text-4xl font-rollingStone text-base-400 mb-4">
            TeamUpSpace
          </div>
          <div className="flex flex-col">
            <div className="w-full flex items-center text-sm text-base-400">
              {`Good to see you again 👋 Log in to your account.`}
            </div>
          </div>
          <input
            className="p-4 items-center border-[1px] border-base-300 rounded-md"
            type="text"
            placeholder="Email or username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            disabled={loading}
          />
          <input
            className="p-4 items-center border-[1px] border-base-300 rounded-md"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <div className="flex justify-between w-full">
            <div className="flex gap-1">
              <input type="checkbox" disabled={loading} />
              <div className="text-sm text-base-400">remember me</div>
            </div>
            <div className="text-sm text-base-400 hover:underline underline-offset-2 cursor-pointer">
              forgot password?
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            className="w-full bg-base-200 hover:bg-base-300 cursor-pointer rounded-xl p-4 flex justify-center items-center font-bold text-base-400 text-lg"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <div className="w-full flex items-center text-sm text-base-400 gap-2">
            <div className="text-base-400/70 text-sm">Are you new here?</div>
            <Link
              href={"/sign-up"}
              className="text-base-400 font-bold hover:text-amber-800/90 hover:underline underline-offset-2"
            >
              Create an account
            </Link>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center w-full my-4">
            <div className="flex-1 border-b-[1px] border-base-300/50"></div>
            <div className="text-base-400 text-sm"> or sign in with</div>
            <div className="flex-1 border-b-[1px] border-base-300/50"></div>
          </div>
          <div
            className="w-full bg-white border border-base-300 text-base-400/70 font-bold p-2 rounded-sm flex gap-2 justify-center items-center items-cente cursor-pointer hover:bg-black/5"
            onClick={signInWithGoogle}
          >
            <FcGoogle className="text-xl" />
            <div>Sign in with google</div>
          </div>
        </div>
      </div>
    </>
  );
}
