import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .min(6, "Must be minimum 6 characters")
    .required("Enter your username"),

  email: Yup.string()
    .email("Enter valid email")
    .required("Enter your email"),

  password: Yup.string()
    .min(8, "Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long")
    .matches(/\d/, "Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long")
    .matches(/[@$!%*?&#]/, "Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long")
    .required("Password must contain at least 1 special character, 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email('Enter valid email').required('Enter your Email'),
  password: Yup.string().min(8, 'Password is too short').required('Enter your password')
})
