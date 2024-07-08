import { Router } from 'express';
import { DepartmentControllers } from './department.controller';

const router = Router();

router.post('/', DepartmentControllers.createDepartment);
router.get('/', DepartmentControllers.getAllDepartments);
router.get('/:id', DepartmentControllers.getSingleDepartment);
router.put('/:id', DepartmentControllers.updateDepartment);
router.delete('/:id', DepartmentControllers.deleteDepartment);

export const DepartmentRouter = router;
