import { z } from "zod";

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: "Password cannot be more that 20 characters" }),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(["student", "faculty", "admin"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().optional().default(false),
});

export const UserValidation = {
  userValidationSchema,
};
