import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await Student.isUserExits(studentData.id)) {
  //     throw new Error("User already exists!");
  //   }
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);

  userData.role = "student";

  userData.id = "2030100001";
  const newUser = await User.create(userData); // built in static method

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
