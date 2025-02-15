"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import DefaultLoader from "../ui/loader";
const ProfileComponent: React.FC = () => {
  const { user, error, updateUser } = useAuth();
  const [currentUser, setCurrentUser] = useState({
    id: "",
    username: "",
    email: "",
    token: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email && user?.token && user?.username)
      setCurrentUser({
        id: user.id,
        username: user.username,
        email: user.email,
        token: user?.token,
      });
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { username, token, id } = currentUser;
      if (username && token && id) {
        await updateUser(token, username, id);
      }
    } catch (error) {
      console.log("error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="grid lg:grid-cols-2 px-4 gap-5 pt-5">
      <div className="p-4 text-gray-800 dark:text-gray-300 gap-4 border bg-secondry-background rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-secondry-background-dark">
        <h4 className=" text-lg font-bold mb-5">Profile picture</h4>

        <div className="gap-4 flex border-b border-gray-300 dark:border-gray-700 pb-6">
          <div className="w-fit">
            <Image
              src="/user.webp"
              alt="User profile picture"
              width={90}
              height={90}
              className="rounded-xl"
            />
          </div>
          <div className="w-full">
            <h4 className="text-lg font-bold">{currentUser.username}</h4>
            <h6 className="text-lg font-normal">{currentUser.email}</h6>
          </div>
        </div>
      </div>

      <div className="p-4 text-gray-800 dark:text-gray-300 gap-4 border bg-secondry-background rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-secondry-background-dark">
        <h4 className=" text-lg font-bold mb-5">Edit profile</h4>

        <div className="gap-4 flex border-b border-gray-300 dark:border-gray-700 pb-6 w-full">
          <form className="w-full">
            <div className="w-full">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={currentUser.username}
                onChange={(e) => {
                  setCurrentUser((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
                className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-shade-500 focus:border-primary-shade-500 block p-2.5 dark:bg-dark-background dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-shade-500 dark:focus:border-primary-shade-500 outline-none"
              />
            </div>
          </form>
        </div>

        {error && <div className="pt-3 font-medium text-red-500">{error}</div>}

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="text-white bg-gradient-to-r mt-5 from-primary-shade-400 via-primary-shade-500 to-primary-shade-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-primary-shade-300 dark:focus:ring-primary-shade-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          {loading ? (
            <span className="inline-flex gap-2">
              <DefaultLoader height="1.2rem" /> Please wait...
            </span>
          ) : (
            <span>Save</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
