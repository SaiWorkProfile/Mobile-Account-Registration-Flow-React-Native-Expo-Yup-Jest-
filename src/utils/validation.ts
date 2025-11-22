import * as yup from "yup";

/* ---------- Yup Validation Schema (for Register Screen) ---------- */

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm your password"),

  firstName: yup
    .string()
    .min(2, "First name too short")
    .required("First name is required"),

  lastName: yup
    .string()
    .min(2, "Last name too short")
    .required("Last name is required"),

  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
});

/* ---------- Unit-Test Friendly Custom Validators ---------- */

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validatePhone = (phone: string): boolean => {
  const regex = /^[0-9]{10}$/;
  return regex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
