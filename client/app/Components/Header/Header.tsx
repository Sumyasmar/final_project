"use client";

import { useTasks } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import { github, moon, profile } from "@/utils/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useUserContext();
  const { openModalForAdd, activeTasks } = useTasks();
  const router = useRouter();
  const { name } = user;
  const userId = user._id;

  return (
    <header className="px-4 py-3 w-full flex flex-wrap items-center justify-between bg-[#f9f9f9] md:px-6 md:py-4">
      {/* User Greeting Section */}
      <div className="w-full mb-3 text-center md:w-auto md:mb-0 md:text-left">
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          {userId ? `Welcome, ${name}!` : "Welcome to TaskMaster"}
        </h1>
        <p className="text-sm sm:text-base">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>{" "}
              active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto md:gap-8">
        {/* Add Task / Login Button */}
        <button
          className="w-full px-4 py-2 text-sm sm:text-base bg-[#3aafae] text-white rounded-full
          hover:bg-[#00A1F1] transition-all duration-200 ease-in-out md:w-auto md:px-6 md:py-3"
          onClick={() => {
            if (userId) {
              openModalForAdd();
            } else {
              router.push("/login");
            }
          }}
        >
          {userId ? "Add a new Task" : "Login / Register"}
        </button>

        {/* Social Links */}
        <div className="flex justify-center gap-3 w-full md:w-auto md:gap-4">
          {[github, moon, profile].map((icon, index) => (
            <Link
              key={index}
              href="https://github.com/Legit-Sam/3mtt_final_project"
              passHref
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]
              hover:border-[#3aafae] hover:bg-[#3aafae] hover:text-white transition-all duration-200 ease-in-out"
            >
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
