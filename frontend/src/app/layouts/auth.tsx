import React from "react";
import ThemeToggle from "../../components/ui/ThemeToggle";
import Link from "next/link";
import { AuthLayoutProps } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subTitle,
  description,
  linktext,
  link,
  linkText,
  formlength,
  children,
}) => {
  const { error, resetError } = useAuth();
  return (
    <div className="w-full h-full bg-background dark:bg-dark-background">
      <div className="max-w-4xl flex items-center mx-auto md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow-md rounded-xl overflow-hidden w-full">
          <div className="max-md:order-1 flex flex-col pt-16 md:space-y-16 space-y-8 max-md:mt-16 min-h-full bg-gradient-to-r from-primary-shade-900 to-primary-shade-700 lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg">{title}</h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <form
            className={`md:col-span-2 w-full bg-secondry-background dark:bg-secondry-background-dark py-6 px-6 sm:px-16 max-md:max-w-xl mx-auto ${
              formlength <= 2 && "py-10"
            }`}
          >
            <div
              className={` flex items-center justify-between ${
                formlength <= 2 ? "mb-7" : "mb-6"
              } `}
            >
              <h3 className="text-gray-800 dark:text-gray-300 text-xl font-bold">
                {subTitle}
              </h3>
              <ThemeToggle />
            </div>

            {error && (
              <div className="pb-3 font-medium text-red-500">{error}</div>
            )}

            {children}

            <p className="text-gray-600 dark:text-gray-400 text-sm mt-6 text-center">
              {linktext}
              <Link
                href={link}
                onClick={() => resetError()}
                className="text-primary-shade-600 font-secondrybold hover:underline ml-1"
              >
                {linkText}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
