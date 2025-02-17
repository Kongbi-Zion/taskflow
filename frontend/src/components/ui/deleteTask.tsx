import { useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useEffect } from "react";
const DeleteModal = ({
  token,
  userId,
  taskId,
}: {
  token: string | undefined;
  userId: string | undefined;
  taskId: string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    deleteTask,
    resetError,
    resetSuccess,
    resetCurrentTask,
    resetEditTask,
  } = useTasks();

  useEffect(() => {
    resetSuccess();
    resetError();
  });

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (token && userId && taskId) {
        deleteTask(taskId, userId, token);
      }
      resetCurrentTask();
      resetEditTask();
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Modal Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="text-white bg-red-500 rounded-sm p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
            />
          </svg>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-800">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900 flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="w-5 h-5 mr-2 animate-spin"
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
                  ) : null}
                  {loading ? "Deleting..." : "Yes, I am sure"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
