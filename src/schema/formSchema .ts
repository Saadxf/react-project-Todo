import { z } from "zod";
export const RegisterSchema = z
  .object({
    name: z.string().min(1, {
      message: "Please enter your name",
    }),
    email: z.string().email({
      message: "Please enter a vaild email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dont match",
    path: ["confirmPassword"],
  });
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a vaild email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
