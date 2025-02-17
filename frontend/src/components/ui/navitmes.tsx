import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTasks } from "@/context/TaskContext";
import { saveAs } from "file-saver";

const NaveItems: React.FC = () => {
  const { signOut } = useAuth();
  const pathname = usePathname();
  const { columns } = useTasks();
  const [loading, setLoading] = useState(false); // Loading state

  const downloadCSV = async () => {
    setLoading(true); // Start loading

    try {
      let csvContent = "Category,Task Title,Description,Due Date\n"; // CSV Header

      const categoryMap: Record<string, string> = {
        "to-do": "To do",
        "in-progress": "In progress",
        completed: "Completed",
      };

      Object.entries(columns).forEach(([category, tasks]) => {
        const formattedCategory = categoryMap[category] || category; // Default to original if not mapped

        tasks.forEach((task) => {
          const row = `${formattedCategory},"${task.title}","${
            task.description
          }","${task.dueDate?.slice(0, 10)}"`;
          csvContent += row + "\n";
        });
      });

      // Convert content to a Blob and trigger download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "tasks.csv");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center gap-2">
      {pathname !== "/" && (
        <button
          onClick={downloadCSV}
          className="bg-primary-shade-500 text-sm text-white hover:bg-primary-shade-600 font-bold p-2 rounded inline-flex items-center"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <svg
              className="animate-spin w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            <svg
              className="fill-current w-4 h-4 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          )}
          <span>{loading ? "Downloading..." : "Download"}</span>
        </button>
      )}

      <ThemeToggle />
      <Link href="/profile">
        <Image
          src="/user.webp"
          alt="User profile picture"
          width={30}
          height={30}
          className="rounded-full"
        />
      </Link>
      <button onClick={signOut}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 pl-1.5"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12.59 13l-2.3 2.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0l4-4a1 1 0 0 0 .21-.33a1 1 0 0 0 0-.76a1 1 0 0 0-.21-.33l-4-4a1 1 0 1 0-1.42 1.42l2.3 2.29H3a1 1 0 0 0 0 2ZM12 2a10 10 0 0 0-9 5.55a1 1 0 0 0 1.8.9A8 8 0 1 1 12 20a7.93 7.93 0 0 1-7.16-4.45a1 1 0 0 0-1.8.9A10 10 0 1 0 12 2"
          />
        </svg>
      </button>
    </div>
  );
};

export default NaveItems;
