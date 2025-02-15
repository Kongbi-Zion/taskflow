"use client";
import DashboardLayout from "./layouts/dashboard";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
const Home: React.FC = () => {
  const { user } = useAuth();
  return (
    <DashboardLayout>
      <div className="h-screen w-full overflow-hidden flex justify-center">
        <div className="mt-40 w-60 text-black dark:text-gray-300">
          <div className="w-full flex justify-center">
            <Image
              src="/user.webp"
              alt="User profile picture"
              width={100}
              height={100}
              className="rounded-full mb-2"
            />
          </div>
          <div>
            <h2 className="text-center text-base font-semibold leading-relaxed pb-1">
              Welcome back{" "}
              <span className="text-primary-shade-600 font-semibold">
                {user?.username}
              </span>
            </h2>
            <p className="text-center text-primary-shade-600 font-semibold text-sm leading-snug pb-4">
              {user?.email}
            </p>
            <p className="text-center text-sm font-normal leading-snug pb-4">
              What are you working on today ?
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
