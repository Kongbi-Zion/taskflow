import axios from "axios";
import { User } from "../types";
// const API = process.env.NEXT_PUBLIC_API_URL;
import { API } from "@/utils/constants";
// Sign-in function
const signIn = async (email: string, password: string) => {
  console.log("API: ", API);
  const response = await axios.post(`${API}/auth/signin`, { email, password });
  return response.data;
};

// Sign-up function
const signUp = async (userData: User) => {
  const response = await axios.post(`${API}/auth/signup`, userData);
  console.log("response: ", response);
  return response.data;
};

// Forgot password function
const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API}/auth/forgot-password`, { email });
  return response.data;
};

// Reset password function
const resetPassword = async (
  token: string,
  newPassword: string,
  email: string
) => {
  const response = await axios.post(`${API}/auth/reset-password`, {
    resetCode: token,
    newPassword,
    email,
  });
  return response.data;
};

// Update user function
const updateUser = async (token: string, username: string, id: string) => {
  const response = await axios.put(
    `${API}/auth/user/update`,
    { id, username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Auth service object to export all methods
const authService = {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  updateUser,
};

export default authService;
