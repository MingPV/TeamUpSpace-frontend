"use client";

import { useEffect, useState } from "react";
import { BsSun } from "react-icons/bs";
import { RxMoon } from "react-icons/rx";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaFireAlt } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Toggle dark mode
  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Listen to scroll position
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", onScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 bg-base-100/70 dark:bg-base-400/50 md:bg-white/50 md:dark:bg-base-500/50 backdrop-blur-sm 
        ${
          scrolled
            ? ""
            : " md:bg-transparent md:backdrop-blur-none dark:md:bg-transparent"
        }
            ${isMenuOpen ? "border-b-1 md:border-b-0 border-base-400/10" : ""}
        dark:text-base-100 text-base-500 flex flex-col justify-center items-center py-4 md:py-6
      `}
    >
      <div className="hidden md:w-2/3 lg:w-1/2 md:flex justify-between items-center">
        <div className="flex-1 flex flex-row gap-6">
          <div className="text-base-500/70 dark:text-base-100 hover:text-base-500 dark:hover:text-white cursor-pointer hover:border-base-500 dark:hover:border-base-100 border-b border-transparent">
            home
          </div>
          <div className="text-base-500/70 dark:text-base-100 hover:text-base-500 dark:hover:text-white cursor-pointer hover:border-base-500 dark:hover:border-base-100 border-b border-transparent">
            menu
          </div>
          <div className="text-base-500/70 dark:text-base-100 hover:text-base-500 dark:hover:text-white cursor-pointer hover:border-base-500 dark:hover:border-base-100 border-b border-transparent">
            menu
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
          className="p-2 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 rounded-md"
        >
          {isDark ? (
            <BsSun className="text-amber-400" />
          ) : (
            <RxMoon className="text-indigo-500" />
          )}
        </button>
      </div>
      <div className="w-[90vw] md:hidden flex justify-between items-center">
        <div
          className="flex flex-row gap-2 items-center cursor-pointer p-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <IoMenuOutline />
          <div>Menu</div>
        </div>
        <div className="flex-1 flex flex-row justify-end items-center gap-2">
          <button
            role="switch"
            aria-checked={isDark}
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              isDark ? "bg-base-400" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isDark ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <div className="text-base-500/50 dark:text-base-100 text-sm">
            Dark Mode
          </div>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "max-h-72" : "max-h-0"
        } ease-in-out duration-300 transition-all overflow-hidden md:hidden flex flex-col gap-4 w-full`}
      >
        <div className="flex flex-row items-center gap-2 py-2 w-full text-base-500 dark:text-base-100 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
          <IoMdHome />
          Home
        </div>
        <div className="flex flex-row items-center gap-2 py-2 w-full text-base-500 dark:text-base-100 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
          <FaFireAlt />
          Projects
        </div>
        <div className="flex flex-row items-center gap-2 py-2 w-full text-base-500 dark:text-base-100 hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer">
          <IoIosContact />
          Contact
        </div>
      </div>
    </nav>
  );
}
