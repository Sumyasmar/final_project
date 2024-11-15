"use client";

import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "./Components/Filters/Filters";
import TaskItem from "./Components/TaskItem/TaskItem";
import { Task } from "@/utils/types";
import { filteredTasks } from "@/utils/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/utils/animations";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalForAdd, priority, setPriority } = useTasks();
  const filtered = filteredTasks(tasks, priority);

  useEffect(() => {
    setPriority("all");
  }, []);

  return (
    <main className="m-4 sm:m-6 md:m-8 lg:m-10 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center sm:flex-col sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold w-auto sm:w-full">
          All Tasks
        </h1>
        <Filters />
      </div>

      {/* Tasks Grid */}
      <motion.div
        className="pb-8 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}

        {/* Add Task Button */}
        <motion.button
          className="h-[12rem] sm:h-[14rem] lg:h-[16rem] w-full py-2 rounded-md text-sm md:text-lg font-medium text-gray-500 
          border-dashed border-2 border-gray-400 hover:bg-gray-300 hover:border-none 
          transition duration-200 ease-in-out"
          onClick={openModalForAdd}
          variants={item}
        >
          Add New Task
        </motion.button>
      </motion.div>
    </main>
  );
}
