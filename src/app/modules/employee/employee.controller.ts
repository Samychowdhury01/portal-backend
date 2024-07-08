/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { EmployeeServices } from './employee.service';

// create department
const createEmployee = async (req: Request, res: Response) => {
  try {
    const employee = req.body;
    const result = await EmployeeServices.createEmployeeIntoDB(employee);
    res.status(200).json({
      success: true,
      message: 'Employee created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Employee creation failed',
      error,
    });
  }
};

// get all departments
const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const result = await EmployeeServices.getEmployeesFromDB();
    res.status(200).json({
      success: true,
      message: 'Department fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};
// // get department by id
// const getSingleDepartment = async (req: Request, res: Response) => {
//   try {
//     const {id} = req.params
//     const result = await DepartmentServices.getSingleDepartmentFromDB(Number(id));
//     res.status(200).json({
//       success: true,
//       message: 'Department fetched successfully',
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || 'Something went wrong!!',
//       error,
//     });
//   }
// };

// // update Department
const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await EmployeeServices.updateEmployeeFromDB(
      Number(id),
      data,
    );
    res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};
const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await EmployeeServices.deleteEmployeeFromDB(Number(id));
    res.status(200).json({
      success: true,
      message: 'Employee Deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Something went wrong!!',
      error,
    });
  }
};

export const EmployeeControllers = {
  createEmployee,
  getAllEmployees,
  // getSingleDepartment,
  updateEmployee,
  deleteEmployee,
};
