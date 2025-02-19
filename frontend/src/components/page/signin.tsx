"use client";

import { useState, ChangeEvent, FormEvent, memo } from "react";
import AuthLayout from "@/app/layouts/auth";
import Link from "next/link";
import { FormFields } from "@/utils/types";
import { validate } from "@/utils/constants";
import DefaultLoader from "../ui/loader";
import { useAuth } from "@/context/AuthContext";

const SignInComponent: React.FC = () => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState<FormFields>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const val = validate(formData);
      setErrors(val.newErrors);

      if (val.valid) {
        setLoading(true);
        const { email, password } = formData;
        if (email && password) {
          await signIn(email, password);
        }
      }
    } catch (error) {
      console.log("error:", error);
    }
    setLoading(false);
  };

  const props = {
    title: "Create your account",
    subTitle: "Sign in",
    description:
      "Welcome back! Sign in to stay organized and keep track of your tasks effortlessly.",
    linktext: "Don't have an account?",
    link: "/signup",
    linkText: "Sign up",
    formlength: Object.keys(formData).length,
    children: "",
  };

  return (
    <AuthLayout {...props}>
      <div className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label
              className="text-gray-600 dark:text-gray-300 text-sm mb-2 block capitalize"
              htmlFor={key}
            >
              {key.replace("confirmPassword", "Confirm Password")}
            </label>
            <div className="relative">
              <input
                id={key}
                name={key as keyof FormFields}
                type={
                  (key.includes("password") ||
                    key.includes("confirmPassword")) &&
                  !showPassword
                    ? "password"
                    : "text"
                }
                value={value}
                onChange={handleChange}
                className={`text-gray-800 bg-secondry-background dark:bg-secondry-background-dark dark:text-gray-300 outline-none border border-gray-400 w-full text-sm pl-4 pr-10 py-2.5 rounded-md ${
                  errors[key as keyof FormFields]
                    ? "border-red-500"
                    : "focus:border-primary-shade-600"
                }`}
                placeholder={`${key.replace(
                  "confirmPassword",
                  "Confirm Password"
                )}`}
              />
              {(key.includes("password") ||
                key.includes("confirmPassword")) && (
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m15.446 12.646l-.796-.796q.225-1.31-.742-2.267T11.65 8.85l-.796-.796q.252-.104.526-.156t.62-.052q1.529 0 2.591 1.063t1.063 2.591q0 .346-.052.64q-.052.293-.156.506m3.162 3.073l-.758-.669q.95-.725 1.688-1.588T20.8 11.5q-1.25-2.525-3.588-4.012T12 6q-.725 0-1.425.1T9.2 6.4l-.78-.78q.87-.33 1.772-.475T12 5q3.256 0 5.956 1.79q2.7 1.789 3.967 4.71q-.536 1.206-1.358 2.266t-1.957 1.953m1.115 5.42l-3.892-3.881q-.664.294-1.647.518Q13.2 18 12 18q-3.275 0-5.956-1.79q-2.68-1.789-3.967-4.71q.583-1.325 1.537-2.482q.953-1.157 2.036-1.941l-2.789-2.8l.708-.708l16.862 16.862zM6.358 7.785q-.86.611-1.758 1.607q-.898.997-1.4 2.108q1.25 2.525 3.587 4.013T12 17q.865 0 1.744-.168t1.322-.34l-1.632-1.642q-.236.133-.659.218t-.775.086q-1.529 0-2.591-1.063T8.346 11.5q0-.333.086-.746t.218-.688zm4.354 4.354"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12.005 15.154q1.524 0 2.586-1.067t1.063-2.591t-1.067-2.587t-2.591-1.063t-2.587 1.067t-1.063 2.592t1.067 2.586t2.592 1.063M12 14.2q-1.125 0-1.912-.787T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m.003 3.8q-3.25 0-5.922-1.768T2.077 11.5q1.33-2.964 4.001-4.732T11.998 5t5.921 1.768t4.004 4.732q-1.33 2.964-4.001 4.732T12.002 18M12 17q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
                      />
                    </svg>
                  )}
                </button>
              )}
            </div>
            {errors[key as keyof FormFields] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[key as keyof FormFields]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="text-primary-shade-600 font-semibold mt-4 flex justify-end">
        <Link href="/forgotpass" className="text-sm">
          Forgot password
        </Link>
      </div>

      <div className="mt-8">
        <button
          disabled={loading}
          onClick={(e) => handleSubmit(e)}
          className="w-full py-2.5 px-4 flex justify-center tracking-wider text-sm rounded-md text-white bg-primary-shade-700 hover:bg-primary-shade-800 focus:outline-none"
        >
          {loading ? (
            <span className="inline-flex gap-2">
              <DefaultLoader height="1.2rem" /> Please wait...
            </span>
          ) : (
            <span>{props.subTitle}</span>
          )}
        </button>
      </div>
    </AuthLayout>
  );
};

export default memo(SignInComponent);
