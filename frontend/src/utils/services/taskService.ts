import axios from "axios";
import { Task } from "../types";
const API = process.env.NEXT_PUBLIC_API_URL;

// Get tasks based on filter (all, today, tomorrow, upcoming)
const getUserTasks = async (userId: string, filter: string, token: string) => {
  const response = await axios.get(`${API}/api/tasks/${filter}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Get tasks by project
const getTasksByProject = async (projectId: string) => {
  const response = await axios.get(`${API}/api/tasks/project/${projectId}`);
  return response.data;
};

// Create a new task
const createTask = async (taskData: Task, token: string) => {
  const response = await axios.post(`${API}/api/tasks/create`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update a task
const updateTask = async (
  token: string,
  taskId: string,
  taskData: Partial<Task>
) => {
  const response = await axios.put(`${API}/api/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete a task
const deleteTask = async (taskId: string, userId: string, token: string) => {
  const response = await axios.delete(`${API}/api/tasks/${userId}/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Export task service
const taskService = {
  getUserTasks,
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
