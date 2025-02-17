"use client";

import React, { useState, ChangeEvent, FormEvent, memo } from "react";
import AuthLayout from "@/app/layouts/auth";
import { FormFields } from "@/lib/types";
import { validate } from "@/lib/constants";
import DefaultLoader from "../ui/loader";
import { useAuth } from "@/context/AuthContext";

const ForgotPasswordComponent: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [formData, setFormData] = useState<FormFields>({
    email: "",
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
        if (formData.email) {
          await forgotPassword(formData.email);
        }
      }
    } catch (error) {
      console.log("error:", error);
    }
    setLoading(false);
  };

  const props = {
    title: "Forgot your password?",
    subTitle: "Forgot password",
    description:
      "No worries! Enter your email address below, and we'll send you a code to reset your password.",
    linktext: "Back to",
    link: "/signin",
    linkText: "Sign in",
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
                  {showPassword ? "🙈" : "👁"}
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
            "Submit"
          )}
        </button>
      </div>
    </AuthLayout>
  );
};

export default memo(ForgotPasswordComponent);
