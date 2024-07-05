import { Router } from "express";
import { DepartmentControllers } from "./department.controller";

const router = Router()

router.post('/', DepartmentControllers.createDepartment)
router.get('/', DepartmentControllers.getAllDepartments)
router.put('/:id', DepartmentControllers.updateDocument)

export const DepartmentRouter = router