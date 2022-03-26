import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).max(
      55,
      "Name has maximum size of 55 characters"
    ),
    password: string({ required_error: "Password is required" })
      .min(8, "Password has minimum size of 8 characters")
      .max(55, "Password has maximum size of 55 characters"),
    passwordConfirm: string({ required_error: "PasswordConfirm is required" })
      .min(8, "PasswordConfirm has maximum size of 8 characters")
      .max(55, "PasswordConfirm has maximum size of 55 characters"),
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email"
    ),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: "Two passwords don't match",
    path: ["passwordConfirm"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "passwordConfirm"
>;

export const credentialsSchema = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Please provide a valid email address"
    ),
    password: string({ required_error: "Password is required" }).min(
      8,
      "Password must be at least 8 characters"
    ),
  }),
});

export type CredentialSchema = TypeOf<typeof credentialsSchema>["body"];
