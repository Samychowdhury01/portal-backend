import { Router } from 'express';
import { EmployeeControllers } from './employee.controller';

const router = Router();

router.post('/', EmployeeControllers.createEmployee);
router.get('/', EmployeeControllers.getAllEmployees);
// router.get('/:id', EmployeeControllers.getSingleDepartment)
router.put('/:id', EmployeeControllers.updateEmployee)
router.delete('/:id', EmployeeControllers.deleteEmployee);

export const EmployeeRouter = router;
