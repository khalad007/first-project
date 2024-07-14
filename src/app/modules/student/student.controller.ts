import { RequestHandler } from "express";
import { StudentServices } from "./student.service";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentFromDB();
  res.status(200).json({
    success: true,
    message: "Student are retrive successfully...",
    data: result,
  });
});

const getSingleStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: "Single Student data are retrive successfully...",
    data: result,
  });
});
export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
};
