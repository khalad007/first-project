import { z } from "zod";

const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: "First name must be in capitalize format" }
    ),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required."),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required."),
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  fatherContactNo: z.string().min(1, "Father's contact number is required."),
  motherName: z.string().min(1, "Mother's name is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
  motherContactNo: z.string().min(1, "Mother's contact number is required."),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required."),
  occupation: z.string().min(1, "Local guardian's occupation is required."),
  contactNo: z.string().min(1, "Local guardian's contact number is required."),
  address: z.string().min(1, "Local guardian's address is required."),
});

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(30),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({
          message: "The gender field can only be 'male', 'female', or 'other'.",
        }),
      }),
      dateOfBirth: z.date().optional(),
      email: z.string().email("Invalid email address."),
      contactNo: z.string().min(1, "Contact number is required."),
      emergencyContactNo: z
        .string()
        .min(1, "Emergency contact number is required."),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
          errorMap: () => ({ message: "Invalid blood group." }),
        })
        .optional(),
      presentAddress: z.string().min(1, "Present address is required."),
      permanentAddress: z.string().min(1, "Permanent address is required."),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      profileImg: z.string().optional(),
    }),
  }),
});

export const StudentValidation = {
  createStudentValidationSchema,
};
