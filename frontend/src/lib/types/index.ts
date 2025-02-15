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
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface Response {
  success: boolean;
  result: unknown;
}
