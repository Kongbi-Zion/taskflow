"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import authService from "@/lib/services/authService";
import LazyLoader from "../components/ui/lazyloader";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  token?: string | undefined;
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (userData: User) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forgotPassword: (email: string) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resetPassword: (
    token: string,
    newPassword: string,
    email: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<any>;
  updateUser: (email: string, username: string, id: string) => Promise<void>;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resetError: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Handle Sign-In
  const setErrorToNull = async () => setError(null);
  const handleSignIn = async (email: string, password: string) => {
    try {
      setError(null);
      const data = await authService.signIn(email, password);
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("Invalid email or password");
    }
  };

  // Handle Sign-Up
  const handleSignUp = async (userData: User) => {
    try {
      setError(null);
      const data = await authService.signUp(userData);
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      router.push("/signin");
    } catch (error) {
      setError("An unknown Error occured. Please try again!");
      console.error("Sign-up error:", error);
    }
  };

  // Handle Sign-Out
  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/signin");
  };

  // Handle Forgot Password
  const handleForgotPassword = async (email: string) => {
    try {
      setError(null);
      await authService.forgotPassword(email);
      router.push("/resetpassword");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 404) {
        setError("User with email doesn't exist");
      } else {
        setError("An unknown Error occured. Please try again!");
      }

      console.error("Forgot password error:", error);
    }
  };

  // Handle Reset Password
  const handleResetPassword = async (
    token: string,
    newPassword: string,
    email: string
  ) => {
    try {
      setError(null);
      await authService.resetPassword(token, newPassword, email);
      router.push("/signin");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 400) {
        setError(
          "Error: Either user with email doesn't exist or invalide code"
        );
      } else {
        setError("An unknown Error occured. Please try again!");
      }
      console.error("Reset password error:", error);
    }
  };

  // Handle Update User
  const handleUpdateUser = async (
    token: string,
    username: string,
    id: string
  ) => {
    try {
      if (!user) return;
      setError(null);
      const data = await authService.updateUser(token, username, id);
      if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 403) {
        handleSignOut();
        return;
      } else {
        setError("Failed to update user. Please try again!");
      }

      console.error("Update user error:", error);
    }
  };

  // Load User on Initial Render (if any)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
        forgotPassword: handleForgotPassword,
        resetPassword: handleResetPassword,
        updateUser: handleUpdateUser,
        resetError: setErrorToNull,
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
