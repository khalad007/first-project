import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import StudentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  const { student: studentData } = req.body;

  try {
    const zodParsedData = StudentValidationSchema.parse(studentData)
    
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Student is created successfully...",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: "Student are retrive successfully...",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const {studentId} = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Single Student data are retrive successfully...",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
