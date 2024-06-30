import { Schema, model, connect } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";

const newUserSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required."],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitalize format",
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    unique: true,
    ref: "User",
  },
  name: {
    type: newUserSchema,
    required: [true, "Student's name is required."],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "The gender field can only be one of the following: 'male', 'female', 'other'.",
    },
    required: [true, "Gender is required."],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: {
    type: String,
    required: [true, "Contact number is required."],
  },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required."],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message:
        "The blood group field can only be one of the following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'.",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required."],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required."],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required."],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required."],
  },
  profileImg: { type: String },
});


//create a custom static method
studentSchema.statics.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
// create a custom instance method
// studentSchema.methods.isUserExits = async function (id: string) {
//   const existingUser = await Student.findOne({id});
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
