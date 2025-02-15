import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

interface Task {
  title: string;
  description: string;
  projectId?: string;
  userId: string;
  users?: string[];
  dueDate?: string;
}

// Get all tasks for a user
const getUserTasks = async (userId: string) => {
  const response = await axios.get(`${API}/tasks/${userId}`);
  return response.data;
};

// Get today's tasks for a user
const getUsersTasksToday = async (userId: string) => {
  const response = await axios.get(`${API}/tasks/today/${userId}`);
  return response.data;
};

// Get tomorrow's tasks for a user
const getUsersTasksTomorrow = async (userId: string) => {
  const response = await axios.get(`${API}/tasks/tomorrow/${userId}`);
  return response.data;
};

// Get upcoming tasks for a user
const getUsersUpcomingTasks = async (userId: string) => {
  const response = await axios.get(`${API}/tasks/upcoming/${userId}`);
  return response.data;
};

// Get tasks by project
const getTasksByProject = async (projectId: string) => {
  const response = await axios.get(`${API}/tasks/project/${projectId}`);
  return response.data;
};

// Create a new task
const createTask = async (taskData: Task, token: string) => {
  console.log("ddd", taskData);
  const response = await axios.post(`${API}/tasks/create`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update a task
const updateTask = async (taskId: string, taskData: Partial<Task>) => {
  const response = await axios.put(`${API}/tasks/${taskId}`, taskData);
  return response.data;
};

// Delete a task
const deleteTask = async (taskId: string) => {
  const response = await axios.delete(`${API}/tasks/${taskId}`);
  return response.data;
};

// Export task service
const taskService = {
  getUserTasks,
  getUsersTasksToday,
  getUsersTasksTomorrow,
  getUsersUpcomingTasks,
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
