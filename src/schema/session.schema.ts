import { object, string, TypeOf } from "zod";

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
