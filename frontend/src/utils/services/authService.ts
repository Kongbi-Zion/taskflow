import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL;

interface User {
  username: string;
  email: string;
  password: string;
}

// Sign-in function
const signIn = async (email: string, password: string) => {
  const response = await axios.post(`${API}/api/auth/signin`, {
    email,
    password,
  });
  return response.data;
};

// Sign-up function
const signUp = async (userData: User) => {
  const response = await axios.post(`${API}/api/auth/signup`, userData);
  console.log("response: ", response);
  return response.data;
};

// Forgot password function
const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API}/api/auth/forgot-password`, {
    email,
  });
  return response.data;
};

// Reset password function
const resetPassword = async (
  token: string,
  newPassword: string,
  email: string
) => {
  const response = await axios.post(`${API}/api/auth/reset-password`, {
    resetCode: token,
    newPassword,
    email,
  });
  return response.data;
};

// Update user function
const updateUser = async (token: string, username: string, id: string) => {
  const response = await axios.put(
    `${API}/api/auth/user/update`,
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
