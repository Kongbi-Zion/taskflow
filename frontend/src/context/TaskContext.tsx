"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import taskService from "@/lib/services/taskService";
import { useAuth } from "./AuthContext";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Task } from "@/lib/types";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  taskSuccess: string | null;
  getUserTasks: () => Promise<void>;
  createTask: (taskData: Task, token: string) => Promise<void>;
  updateTask: (
    token: string,
    taskId: string,
    taskData: Partial<Task>
  ) => Promise<void>;
  deleteTask: (taskId: string, userId: string, token: string) => Promise<void>;
  error: string | null;
  resetError: () => void;
  resetSuccess: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const filter = params.productId as "all" | "today" | "tomorrow" | "upcoming";
  const { user } = useAuth(); // Get the authenticated user

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [taskSuccess, setTaskSuccess] = useState<string | null>(null); // Success message state

  // Fetch tasks for the logged-in user
  const getUserTasks = async () => {
    try {
      if (!user) {
        setError(null);
        localStorage.removeItem("user");
        router.push("/signin");
        return;
      }

      setLoading(true); // Start loading
      setError(null);

      const { id, token } = user;

      if (id && token && filter) {
        const data = await taskService.getUserTasks(id, filter, token);
        setTasks(data.tasks);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 403) {
        setError(null);
        localStorage.removeItem("user");
        router.push("/signin");
      }
      console.error("Task fetch error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Create a new task
  const createTask = async (taskData: Task, token: string) => {
    try {
      setError(null);
      await taskService.createTask(taskData, token);
      setTaskSuccess("Task created successfully!"); // Success message on task creation
      await getUserTasks(); // Refresh tasks
    } catch (error) {
      setError("Failed to create task.");
      console.error("Create task error:", error);
    }
  };

  // Update a task
  const updateTask = async (
    token: string,
    taskId: string,
    taskData: Partial<Task>
  ) => {
    try {
      setError(null);
      await taskService.updateTask(token, taskId, taskData);
      setTaskSuccess("Task updated successfully!"); // Success message on task update
      await getUserTasks(); // Refresh tasks
    } catch (error) {
      setError("Failed to update task.");
      console.error("Update task error:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string, userId: string, token: string) => {
    try {
      setError(null);
      await taskService.deleteTask(taskId, userId, token);
      setTaskSuccess("Task deleted successfully!"); // Success message on task deletion
      await getUserTasks(); // Refresh tasks
    } catch (error) {
      setError("Failed to delete task.");
      console.error("Delete task error:", error);
    }
  };

  const resetError = () => setError(null);
  const resetSuccess = () => setTaskSuccess(null); // Reset success message

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        taskSuccess, // Provide the success message
        getUserTasks,
        createTask,
        updateTask,
        deleteTask,
        error,
        resetError,
        resetSuccess,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// Custom Hook to Use Task Context
export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
