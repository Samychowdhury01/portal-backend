import { Router } from "express";
import { EmployeeControllers } from "./employee.controller";

const router = Router()

router.post('/', EmployeeControllers.createEmployee)
router.get('/', EmployeeControllers.getAllEmployees)
// router.get('/:id', EmployeeControllers.getSingleDepartment)
// router.put('/:id', EmployeeControllers.updateDepartment)
// router.delete('/:id', EmployeeControllers.deleteDepartment)

export const EmployeeRouter = router