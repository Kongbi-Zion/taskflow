import { FormFields } from "../types";

export const validate = (formData: FormFields) => {
  let valid = true;
  const newErrors: Partial<FormFields> = {};

  // Username validation (only if provided)
  if (formData.username) {
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }
  }

  // Due Date validation (only if provided)
  if (formData.dueDate) {
    if (!formData.dueDate.trim()) {
      newErrors.dueDate = "Due date is required";
      valid = false;
    }
  }

  // Email validation (only if provided)
  if (formData.email) {
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
  }

  // Password validation (only if provided)
  if (formData.password) {
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
  }

  // Code validation (only if provided)
  if (formData.code) {
    if (!formData.code.trim()) {
      newErrors.code = "Verification code is required";
      valid = false;
    }
  }

  // Confirm Password validation (only if both are provided)
  if (formData.confirmPassword && formData.password) {
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }
  }

  return { valid, newErrors };
};
