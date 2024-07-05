/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { DepartmentServices } from './department.service';

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
const updateDocument = async (req: Request, res: Response) => {
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
const deleteDocument = async (req: Request, res: Response) => {
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
  updateDocument,
  deleteDocument
};
