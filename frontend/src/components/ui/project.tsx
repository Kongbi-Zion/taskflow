"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { FormFields } from "@/lib/types";
import DefaultLoader from "./loader";

interface NewProjectProps {
  closeModal: () => void;
}

const NewProject: React.FC<NewProjectProps> = ({ closeModal }) => {
  const [formData, setFormData] = useState<FormFields>({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    // Simulate form validation
    const validationErrors: Partial<FormFields> = {};

    if (!formData.title) {
      validationErrors.title = "Title is required.";
    }

    if (!formData.description) {
      validationErrors.description = "Description is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Project created:", formData);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex justify-center items-center px-4">
      <div className="bg-secondry-background dark:bg-secondry-background-dark p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
            New Project
          </h2>
          <button
            onClick={() => closeModal()} // Close button
            className="text-gray-600 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                className="text-gray-600 dark:text-gray-300 text-sm mb-2 block"
                htmlFor="title"
              >
                Project Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className={`text-gray-800 dark:text-gray-300 bg-secondry-background dark:bg-secondry-background-dark outline-none border border-gray-400 w-full text-sm pl-4 pr-10 py-2.5 rounded-md ${
                  errors.title
                    ? "border-red-500"
                    : "focus:border-primary-shade-600"
                }`}
                placeholder="Enter project title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                className="text-gray-600 dark:text-gray-300 text-sm mb-2 block"
                htmlFor="description"
              >
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4} // Adjust rows to set height
                className={`text-gray-800 dark:text-gray-300 bg-secondry-background dark:bg-secondry-background-dark outline-none border border-gray-400 w-full text-sm pl-4 pr-10 py-2.5 rounded-md ${
                  errors.description
                    ? "border-red-500"
                    : "focus:border-primary-shade-600"
                }`}
                placeholder="Enter project description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              disabled={loading}
              type="submit"
              className="w-full py-2.5 px-4 flex justify-center tracking-wider text-sm rounded-md text-white bg-primary-shade-700 hover:bg-primary-shade-800 focus:outline-none"
            >
              {loading ? (
                <span className="inline-flex gap-2">
                  <DefaultLoader height="1.2rem" /> Please wait...
                </span>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
