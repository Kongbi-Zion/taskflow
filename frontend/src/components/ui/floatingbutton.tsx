"use client";

import { useState } from "react";

interface CreateNewProjectOrTaskProps {
  onCreate: (type: string) => void;
  disabled: boolean;
}

const AddFloatingButtonWithModal: React.FC<CreateNewProjectOrTaskProps> = ({
  onCreate,
  disabled,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(!showModal); // Toggle modal visibility
  };

  const handleNewProject = () => {
    onCreate("New Project"); // Call the function passed from the main page
    setShowModal(false); // Close modal after selection
  };

  const handleNewTask = () => {
    onCreate("New Task"); // Call the function passed from the main page
    setShowModal(false); // Close modal after selection
  };

  return (
    <div>
      {/* Modal (hidden by default) */}
      {showModal && (
        <div className="fixed bottom-24 right-6 bg-secondry-background dark:bg-secondry-background-dark shadow-lg rounded-md p-4 w-56">
          <div className="space-y-4">
            <button
              onClick={handleNewTask}
              className="w-full py-2 px-4 bg-primary-shade-700 text-white rounded-md"
            >
              New Task
            </button>{" "}
            <button
              onClick={handleNewProject}
              className="w-full py-2 px-4 bg-primary-shade-500 text-white rounded-md"
            >
              New Project
            </button>
          </div>
        </div>
      )}

      <button
        disabled={disabled}
        onClick={handleClick}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary-shade-500 text-white shadow-lg hover:bg-primary-shade-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 5v14m7-7H5"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddFloatingButtonWithModal;
