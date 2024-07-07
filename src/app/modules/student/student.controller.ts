import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.service";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};



const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrive successfully...",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Single Student data are retrive successfully...",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudents,
};
