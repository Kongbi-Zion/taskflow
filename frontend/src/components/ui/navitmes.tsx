"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

const NaveItems: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <div className="flex items-center gap-2">
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
      <button onClick={() => signOut()}>
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
