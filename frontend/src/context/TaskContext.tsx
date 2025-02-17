"use client";

import React, { createContext, useContext, ReactNode } from "react";
import taskService from "@/lib/services/taskService";
import { useAuth } from "./AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  taskSuccess: string | null;
  editTask: boolean;
  currentTask: Task | undefined; // Current task state
  createTask: (taskData: Task, token: string) => void;
  updateTask: (token: string, taskId: string, taskData: Partial<Task>) => void;
  deleteTask: (taskId: string, userId: string, token: string) => void;
  error: string | null;
  resetError: () => void;
  resetSuccess: () => void;
  resetEditTask: () => void;
  setCurrentTask: (task: Task) => void; // Function to set current task
  resetCurrentTask: () => void; // Function to reset current task
  setEditTask: (edit: boolean) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const filter = params.productId as "all" | "today" | "tomorrow" | "upcoming";
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch tasks using React Query
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", user?.id, filter],
    queryFn: async () => {
      if (!user || !user.id || !user.token || !filter) {
        router.push("/signin");
        return [];
      }
      const data = await taskService.getUserTasks(user.id, filter, user.token);
      return data.tasks;
    },
    enabled: !!user && !!filter, // Prevent query if no user or filter
  });

  // Success message state
  const [taskSuccess, setTaskSuccess] = React.useState<string | null>(null);

  // Edit task state
  const [editTask, setEditTask] = React.useState<boolean>(false);

  // Current task state
  const [currentTask, setCurrentTask] = React.useState<Task | undefined>(
    undefined
  );

  // Mutation: Create Task
  const createTaskMutation = useMutation({
    mutationFn: async ({
      taskData,
      token,
    }: {
      taskData: Task;
      token: string;
    }) => taskService.createTask(taskData, token),
    onSuccess: () => {
      setTaskSuccess("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id, filter] });
    },
    onError: () => setTaskSuccess("Failed to create task."),
  });

  // Mutation: Update Task
  const updateTaskMutation = useMutation({
    mutationFn: async ({
      token,
      taskId,
      taskData,
    }: {
      token: string;
      taskId: string;
      taskData: Partial<Task>;
    }) => taskService.updateTask(token, taskId, taskData),
    onSuccess: () => {
      setTaskSuccess("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id, filter] });
    },
    onError: () => setTaskSuccess("Failed to update task."),
  });

  // Mutation: Delete Task
  const deleteTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      userId,
      token,
    }: {
      taskId: string;
      userId: string;
      token: string;
    }) => taskService.deleteTask(taskId, userId, token),
    onSuccess: () => {
      setTaskSuccess("Task deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks", user?.id, filter] });
    },
    onError: () => setTaskSuccess("Failed to delete task."),
  });

  // Reset functions
  const resetError = () => setTaskSuccess(null);
  const resetSuccess = () => setTaskSuccess(null);
  const resetEditTask = () => setEditTask(false);
  const resetCurrentTask = () => setCurrentTask(undefined); // Reset current task to null

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        taskSuccess,
        editTask,
        currentTask,
        createTask: (taskData, token) =>
          createTaskMutation.mutate({ taskData, token }),
        updateTask: (token, taskId, taskData) =>
          updateTaskMutation.mutate({ token, taskId, taskData }),
        deleteTask: (taskId, userId, token) =>
          deleteTaskMutation.mutate({ taskId, userId, token }),
        error: error ? "Failed to fetch tasks." : null,
        resetError,
        resetSuccess,
        resetEditTask,
        setCurrentTask, // Function to set the current task
        resetCurrentTask, // Function to reset the current task
        setEditTask,
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
