import express from "express"
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeByID, updateEmployee } from "../controllers/EmpController.js"

const router=express.Router()

router.get("/",getAllEmployees)
router.get("/:id",getEmployeeByID)
router.post("/",createEmployee)
router.put("/:id",updateEmployee)
router.delete("/:id",deleteEmployee)

export default router
