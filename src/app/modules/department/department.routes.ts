import { Router } from "express";
import { DepartmentControllers } from "./department.controller";

const router = Router()

router.post('/', DepartmentControllers.createDepartment)

export const DepartmentRouter = router