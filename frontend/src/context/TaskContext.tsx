"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import taskService from "@/lib/services/taskService";
import { useAuth } from "./AuthContext";

interface Task {
  id?: string;
  title: string;
  description: string;
  projectId?: string;
  userId: string;
  users?: string[];
  dueDate: string;
}

interface TaskContextType {
  tasks: Task[];
  getUserTasks: () => Promise<void>;
  createTask: (taskData: Task, token: string) => Promise<void>;
  updateTask: (taskId: string, taskData: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  error: string | null;
  resetError: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const { user } = useAuth(); // Get the authenticated user
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks for the logged-in user
  const getUserTasks = async () => {
    try {
      if (!user) return;
      setError(null);
      const data = await taskService.getUserTasks(user.id);
      setTasks(data);
    } catch (error) {
      setError("Failed to fetch tasks.");
      console.error("Task fetch error:", error);
    }
  };

  // Create a new task
  const createTask = async (taskData: Task, token: string) => {
    try {
      setError(null);
      await taskService.createTask(taskData, token);
      getUserTasks(); // Refresh tasks
    } catch (error) {
      setError("Failed to create task.");
      console.error("Create task error:", error);
    }
  };

  // Update a task
  const updateTask = async (taskId: string, taskData: Partial<Task>) => {
    try {
      setError(null);
      await taskService.updateTask(taskId, taskData);
      getUserTasks(); // Refresh tasks
    } catch (error) {
      setError("Failed to update task.");
      console.error("Update task error:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    try {
      setError(null);
      await taskService.deleteTask(taskId);
      getUserTasks(); // Refresh tasks
    } catch (error) {
      setError("Failed to delete task.");
      console.error("Delete task error:", error);
    }
  };

  const resetError = () => setError(null);

  useEffect(() => {
    if (user) {
      getUserTasks();
    }
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getUserTasks,
        createTask,
        updateTask,
        deleteTask,
        error,
        resetError,
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
