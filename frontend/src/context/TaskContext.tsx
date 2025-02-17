"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import taskService from "@/lib/services/taskService";
import { useAuth } from "./AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/lib/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Item {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  task: Task;
}

interface Columns {
  [key: string]: Item[];
}

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  taskSuccess: string | null;
  editTask: boolean;
  currentTask: Task | undefined;
  columns: Columns;
  createTask: (taskData: Task, token: string) => void;
  updateTask: (token: string, taskId: string, taskData: Partial<Task>) => void;
  deleteTask: (taskId: string, userId: string, token: string) => void;
  error: string | null;
  resetError: () => void;
  resetSuccess: () => void;
  resetEditTask: () => void;
  setCurrentTask: (task: Task) => void;
  resetCurrentTask: () => void;
  setEditTask: (edit: boolean) => void;
  setColumns: React.Dispatch<React.SetStateAction<Columns>>;
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

  const [columns, setColumns] = useState<Columns>({});
  const [taskSuccess, setTaskSuccess] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

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
    enabled: !!user && !!filter,
  });

  useEffect(() => {
    // Initialize the columns with default categories
    const defaultCategories = ["to-do", "in-progress", "completed"];

    // Map tasks into categories based on their status
    const categorisedTasks = tasks.reduce((acc: Columns, task: Task) => {
      // Define the category based on task status (e.g., 'to-do', 'in-progress', 'completed')
      const category = task.status || "to-do"; // Default to 'to-do' if no status is provided

      // Ensure the category exists in the accumulator
      if (!acc[category]) {
        acc[category] = [];
      }

      // Push the task into the respective category
      acc[category].push({
        id: `${task?._id}`,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate as string,
        task,
      });

      return acc;
    }, {});

    // Ensure all default categories exist even if no tasks are assigned to them
    defaultCategories.forEach((category) => {
      if (!categorisedTasks[category]) {
        categorisedTasks[category] = [];
      }
    });

    // Update state with categorised tasks, ensuring the order of categories remains as per defaultCategories
    const orderedCategorisedTasks: Columns = {};
    defaultCategories.forEach((category) => {
      orderedCategorisedTasks[category] = categorisedTasks[category] || [];
    });

    setColumns(orderedCategorisedTasks);
  }, [tasks]);

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

  const resetError = () => setTaskSuccess(null);
  const resetSuccess = () => setTaskSuccess(null);
  const resetEditTask = () => setEditTask(false);
  const resetCurrentTask = () => setCurrentTask(undefined);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        taskSuccess,
        editTask,
        currentTask,
        columns,
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
        setCurrentTask,
        resetCurrentTask,
        setEditTask,
        setColumns,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
