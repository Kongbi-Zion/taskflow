"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FormFields } from "@/utils/types";
import DefaultLoader from "./loader";
import { useTasks } from "@/context/TaskContext";
import { useAuth } from "@/context/AuthContext";
import { Task as taskType } from "@/utils/types/index";
import DeleteModal from "./deleteTask";
interface NewTaskProps {
  closeModal: () => void;
  edit?: boolean;
  currentTask?: taskType;
}

const Task: React.FC<NewTaskProps> = ({
  closeModal,
  edit = false,
  currentTask,
}) => {
  const {
    createTask,
    updateTask,
    error,
    taskSuccess,
    resetSuccess,
    resetError,
  } = useTasks();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormFields>({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit && currentTask) {
      setFormData({
        title: currentTask?.title,
        description: currentTask?.description,
        dueDate: currentTask?.dueDate?.slice(0, 10),
        status: currentTask?.status,
      });
    }
  }, [currentTask, edit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
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

    if (!formData.dueDate) {
      validationErrors.dueDate = "Due date is required.";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { title, description, dueDate, status } = formData;
      const userId = user?.id;
      const token = user?.token;

      if (title && description && dueDate && userId && token) {
        if (!edit) {
          createTask({ title, description, dueDate, userId }, token);
        }

        const taskId = currentTask?._id;

        if (edit && status && taskId) {
          console.log("status", status);
          updateTask(token, taskId, {
            title,
            description,
            dueDate,
            userId,
            status,
          });
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-70 flex justify-center items-center px-4">
      <div className="bg-secondry-background dark:bg-secondry-background-dark p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-7">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">
              {edit ? "Edit Task" : "New Task"}
            </h2>{" "}
            {edit && (
              <DeleteModal
                token={user?.token}
                userId={user?.id}
                taskId={currentTask?._id}
              />
            )}
          </div>
          <button
            onClick={() => {
              resetError();
              resetSuccess();
              closeModal();
            }}
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

        {taskSuccess && (
          <div className="pb-1 -mt-5 font-medium text-primary-shade-500">
            {taskSuccess}
          </div>
        )}
        {error && (
          <div className="pb-1 -mt-5 font-medium text-red-500">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                className="text-gray-600 dark:text-gray-300 text-sm mb-2 block"
                htmlFor="title"
              >
                Task Title
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
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            <div>
              <label
                className="text-gray-600 dark:text-gray-300 text-sm mb-2 block"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleChange}
                className={`text-gray-800 dark:text-gray-300 bg-secondry-background dark:bg-secondry-background-dark outline-none border border-gray-400 w-full text-sm pl-4 pr-10 py-2.5 rounded-md ${
                  errors.dueDate
                    ? "border-red-500"
                    : "focus:border-primary-shade-600"
                }`}
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
              )}
            </div>

            {/* Display status select field only when editing */}
            {edit && (
              <div>
                <label
                  className="text-gray-600 dark:text-gray-300 text-sm mb-2 block"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="text-gray-800 dark:text-gray-300 bg-secondry-background dark:bg-secondry-background-dark outline-none border border-gray-400 w-full text-sm pl-4 pr-10 py-2.5 rounded-md"
                >
                  <option value="to-do">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}

            <div>
              <label
                className="text-gray-600 dark:text-gray-300 text-sm mb-2 block"
                htmlFor="description"
              >
                Task Description
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
                placeholder="Enter task description"
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
                <span> {edit ? "Update task" : "Create Task"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Task;
