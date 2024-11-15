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
      <div className="w-full mb-3 text-center md:w-auto md:mb-0 md:text-left">
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {userId ? `Welcome, ${name}!` : "Welcome to TaskMaster"}
        </h1>
        <p className="text-sm">
          {userId ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto md:justify-between md:gap-8">
        <button
          className="w-full px-4 py-2 text-sm bg-[#3aafae] text-white rounded-full
          hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out md:w-auto md:px-8 md:py-3"
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

        <div className="flex justify-center gap-3 w-full md:w-auto md:gap-4">
          <Link
            href="https://github.com/Legit-Sam/3mtt_final_project"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {github}
          </Link>
          <Link
            href="https://github.com/Legit-Sam/3mtt_final_project"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {moon}
          </Link>
          <Link
            href="https://github.com/Legit-Sam/3mtt_final_project"
            passHref
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {profile}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
