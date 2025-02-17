export interface AuthLayoutProps {
  title: string;
  subTitle: string;
  description: string;
  linktext: string;
  link: string;
  linkText: string;
  formlength: number;
  children: React.ReactNode;
}
export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export interface FormFields {
  title?: string;
  description?: string;
  username?: string;
  code?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dueDate?: string;
}

export interface FormFields {
  title?: string;
  description?: string;
  username?: string;
  code?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  dueDate?: string;
  status?: string;
}

export interface Response {
  success: boolean;
  result: unknown;
}

export interface Task {
  _id?: string;
  title: string;
  description: string;
  projectId?: string;
  userId: string;
  users?: string[];
  dueDate?: string;
  status?: string;
}

export interface User {
  id?: string;
  token?: string;
  username: string;
  email: string;
  password: string;
}
