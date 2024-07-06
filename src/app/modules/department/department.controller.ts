/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { DepartmentServices } from './department.service';

// create department
const createDepartment = async (req: Request, res: Response) => {
  try {
    const department = req.body;
    const result = await DepartmentServices.createDepartmentIntoDB(department);
    res.status(200).json({
      success: true,
      message: 'Department created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Department creation failed',
      error,
    });
  }
};

// get all departments
const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const result = await DepartmentServices.getDepartmentsFromDB();
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
// get department by id
const getSingleDepartment = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const result = await DepartmentServices.getSingleDepartmentFromDB(Number(id));
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

// update Department
const updateDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await DepartmentServices.updateDepartmentsFromDB(
      Number(id),
      name,
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
const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await DepartmentServices.deleteDepartmentsFromDB(
      Number(id),
    );
    res.status(200).json({
      success: true,
      message: 'Department Deleted successfully',
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

export const DepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment
};
