"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/utils/services/authService";
import LazyLoader from "../components/ui/lazyloader";
import { useRouter } from "next/navigation";
import { User } from "@/utils/types";
interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (userData: User) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (token: string, newPassword: string, email: string) => void;
  updateUser: (token: string, username: string, id: string) => void;
  error: string | null;
  resetError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("taskflowuser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Sign In Mutation
  const signInMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => authService.signIn(email, password),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("taskflowuser", JSON.stringify(data.user));
      router.push("/");
    },
    onError: () => {
      setError("Invalid email or password");
    },
  });

  // Sign Up Mutation
  const signUpMutation = useMutation({
    mutationFn: async (userData: User) => authService.signUp(userData),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("taskflowuser", JSON.stringify(data.user));
      router.push("/signin");
    },
    onError: () => {
      setError("An unknown error occurred. Please try again!");
    },
  });

  // Sign Out
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("taskflowuser");
    queryClient.clear();
    router.push("/signin");
  };

  // Forgot Password Mutation
  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => authService.forgotPassword(email),
    onSuccess: () => router.push("/resetpassword"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setError(
        error?.status === 404
          ? "User with email doesn't exist"
          : "An unknown error occurred. Please try again!"
      );
    },
  });

  // Reset Password Mutation
  const resetPasswordMutation = useMutation({
    mutationFn: async ({
      token,
      newPassword,
      email,
    }: {
      token: string;
      newPassword: string;
      email: string;
    }) => authService.resetPassword(token, newPassword, email),
    onSuccess: () => router.push("/signin"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setError(
        error?.status === 400
          ? "Invalid token or user not found"
          : "An unknown error occurred. Please try again!"
      );
    },
  });

  // Update User Mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({
      token,
      username,
      id,
    }: {
      token: string;
      username: string;
      id: string;
    }) => authService.updateUser(token, username, id),
    onSuccess: (data) => {
      setUser(data.user);
      localStorage.setItem("taskflowuser", JSON.stringify(data.user));
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error?.status === 403) {
        handleSignOut();
      } else {
        setError("Failed to update user. Please try again!");
      }
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        signIn: (email, password) => signInMutation.mutate({ email, password }),
        signOut: handleSignOut,
        signUp: (userData) => signUpMutation.mutate(userData),
        forgotPassword: (email) => forgotPasswordMutation.mutate(email),
        resetPassword: (token, newPassword, email) =>
          resetPasswordMutation.mutate({ token, newPassword, email }),
        updateUser: (token, username, id) =>
          updateUserMutation.mutate({ token, username, id }),
        resetError: () => setError(null),
      }}
    >
      {!loading ? children : <LazyLoader />}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
