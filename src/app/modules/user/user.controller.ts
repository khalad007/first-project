import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, student: studentData } = req.body;

  try {
    // const zodParsedData = StudentValidationSchema.parse(studentData)

    const result = await UserService.createStudentIntoDB(password, studentData);
    res.status(200).json({
      success: true,
      message: "Student is created successfully...",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
