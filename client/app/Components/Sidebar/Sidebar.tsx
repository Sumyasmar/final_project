import React, { useState, useEffect } from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";
import { useUserContext } from "@/context/userContext";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Make sure to import lucide-react icons

function Sidebar() {
  const { logoutUser } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    //@ts-expect-error please ignore i will fix this later
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest("#sidebar") && !event.target.closest("#sidebarToggle")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar Toggle Button (Visible on Mobile) */}
      <div
        id="sidebarToggle"
        className="fixed top-4 right-4 z-50 cursor-pointer md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ArrowLeft size={24} /> : <ArrowRight size={24} />}
      </div>

      {/* Sidebar Container */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full bg-[#f9f9f9] flex flex-col w-[20rem] transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:w-[20rem] md:mt-[5rem]`}
      >
        <Profile />
        <div className="mt-4 mx-6">
          <RadialChart />
        </div>

        <button
          className="mt-auto mb-6 mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
          onClick={logoutUser}
        >
          Sign Out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
