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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Department creation failed',
      error,
    });
  }
};

export const DepartmentControllers = {
  createDepartment,
};
