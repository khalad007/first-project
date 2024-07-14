import { RequestHandler } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catchAsync";

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;



  const result = await UserService.createStudentIntoDB(password, studentData);
  res.status(200).json({
    success: true,
    message: "Student is created successfully...",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
