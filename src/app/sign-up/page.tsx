/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { signUp } from "../api/auth";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FaHandPointLeft } from "react-icons/fa6";
import { getUserByEmail, getUserByUsername } from "../api/auth";
import { Profile } from "../types/profile";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  // Check username unique
  useEffect(() => {
    if (!username) {
      setIsUsernameValid(true);
      return;
    }

    setCheckingUsername(true);
    setError("");

    const timeout = setTimeout(async () => {
      if (username.length < 3) {
        setIsUsernameValid(false);
        setError("Username must be at least 3 characters long");
        setCheckingUsername(false);
        return;
      } else {
        setError("");
      }

      try {
        const existingUser = await getUserByUsername(username);
        if (existingUser.username) {
          setIsUsernameValid(false);
          setError("Username is already in use");
        } else {
          setIsUsernameValid(true);
        }
      } catch (err) {
        console.error("Error checking username", err);
        setIsUsernameValid(false);
      } finally {
        setCheckingUsername(false);
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [username]);

  // Check email unique
  useEffect(() => {
    if (!email) {
      setIsEmailValid(true);
      return;
    }

    setCheckingEmail(true);
    setError("");

    const timeout = setTimeout(async () => {
      // check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setIsEmailValid(false);
        setError("Invalid email format");
        setCheckingEmail(false);
        return;
      } else {
        setError("");
      }

      try {
        const existingUser = await getUserByEmail(email);
        console.log(existingUser);
        if (existingUser.email) {
          setError("Email is already in use");
          setIsEmailValid(false);
          return;
        } else {
          setIsEmailValid(true);
        }
      } catch (err) {
        console.error("Error checking email", err);
        setIsEmailValid(false);
      } finally {
        setCheckingEmail(false);
      }
    }, 700);

    return () => clearTimeout(timeout);
  }, [email]);

  useEffect(() => {
    if (password && password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (password && repeatPassword && password !== repeatPassword) {
      setError("Password and Repeat Password do not match");
    } else {
      setError("");
    }
  }, [password, repeatPassword]);

  const handleSignUp = async () => {
    if (!email || !username || !password || !repeatPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (error) {
      return;
    }
    if (!isEmailValid) {
      setError("Email is not valid");
      return;
    }
    if (!isUsernameValid) {
      setError("Username is not valid");
      return;
    }

    setLoading(true);
    setError("");
    const profile: Profile = {
      display_name: username,
    };
    try {
      const res = await signUp(email, password, username, profile);
      if (res.error) {
        setError("Something went wrong, please try again");
      }
      console.log("Sign up successful");
      router.push("/sign-in");
    } catch (err: any) {
      setError("Invalid email/username or password");
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
        <div className="w-[30vw] px-12 py-16 bg-white flex flex-col gap-4 shadow-2xl mb-24">
          <div className="text-4xl font-rollingStone text-base-400 mb-4">
            TeamUpSpace
          </div>
          <div className="flex flex-col">
            <div className="w-full flex items-center text-sm text-base-400">
              {`Let's join out community 👋 create an account.`}
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-row justify-between border-[1px] border-base-300 rounded-md">
              <input
                className="flex-1 items-center p-4 focus:outline-none focus:ring-0"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {email ? (
                checkingEmail ? (
                  <span className="mr-6 text-base-400 text-center flex justify-center items-center">
                    Checking
                  </span>
                ) : isEmailValid ? (
                  <span className="mr-6 text-lime-300 text-center flex justify-center items-center">
                    <FaCheck />
                  </span>
                ) : (
                  <span className="mr-6 text-red-600/80 text-center flex justify-center items-center">
                    <ImCross />
                  </span>
                )
              ) : null}
            </div>

            <div className="flex flex-row justify-between border-[1px] border-base-300 rounded-md">
              <input
                className="flex-1 items-center p-4 focus:outline-none focus:ring-0"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              {username ? (
                checkingUsername ? (
                  <span className="mr-6 text-base-400 text-center flex justify-center items-center">
                    Checking
                  </span>
                ) : isUsernameValid ? (
                  <span className="mr-6 text-lime-300 text-center flex justify-center items-center">
                    <FaCheck />
                  </span>
                ) : (
                  <span className="mr-6 text-red-600/80 text-center flex justify-center items-center">
                    <ImCross />
                  </span>
                )
              ) : null}
            </div>
            <input
              className="p-4 items-center border-[1px] border-base-300 rounded-md"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <input
              className="p-4 items-center border-[1px] border-base-300 rounded-md"
              type="password"
              placeholder="RepeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={`h-3`}>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
          <button
            className="w-full bg-base-200 hover:bg-base-300 cursor-pointer rounded-xl p-4 flex justify-center items-center font-bold text-base-400 text-lg"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Creating an account" : "Create an account"}
          </button>
          <div className="w-full flex items-center text-sm text-base-400 gap-2">
            <div className="text-base-400/70 text-sm">
              Already have an account?
            </div>
            <Link
              href={"/sign-in"}
              className="text-base-400 font-bold hover:text-amber-800/90 hover:underline underline-offset-2"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
