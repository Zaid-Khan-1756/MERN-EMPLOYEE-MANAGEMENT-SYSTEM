import Employee from "../models/EmpModels.js"

export async function getAllEmployees(_,res){
    //console.log("Get all Employees")
    //res.status(200).json("getAllEmployees")

    try {
        const emp= await Employee.find().sort({createdAt:-1})
        res.status(200).json(emp)
    } catch (error) {
        console.error("Error in getAllEmployees controller",error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getEmployeeByID(req,res) {
    // console.log("get employee by id")
    // res.status(200).json("getEmployeeByID")

    try {
        const emp=await Employee.findById(req.params.id)
        if (!emp) return res.status(404).json({message: "Employee not found"})
        res.status(200).json(emp)
    } catch (error) {
        console.error("Error in getEmployeeByID controller",error)
        res.status(500).json({message: "Internal server error"})        
    }
}

export async function createEmployee(req,res) {
    // console.log("createEmployee")
    // res.status(200).json("createEmployee")

    try {
        const {Emp_ID, Emp_Name, Emp_Email,Emp_Number,Emp_Designation,Emp_Department,Emp_Salary,Emp_Joining_Date,Emp_Address,Emp_DOB}= req.body
        if (!Emp_ID || !Emp_Name || !Emp_Email || !Emp_Number || !Emp_Designation || !Emp_Department || !Emp_Salary || !Emp_Joining_Date || !Emp_Address || !Emp_DOB){
            return res.status(404).json({message: "All fields area required"})
        }

        const emp=new Employee({Emp_ID, Emp_Name, Emp_Email,Emp_Number,Emp_Designation,Emp_Department,Emp_Salary,Emp_Joining_Date,Emp_Address,Emp_DOB})
        const savedEmployee=await emp.save()
        res.status(201).json({savedEmployee})
    } catch (error) {
        console.error("Error in create employee controller",error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateEmployee(req,res) {
    // console.log("updateEmployee")
    // res.status(200).json("updateEmployee")

    try {
        const {Emp_ID, Emp_Name, Emp_Email,Emp_Number,Emp_Designation,Emp_Department,Emp_Salary,Emp_Joining_Date,Emp_Address,Emp_DOB}=req.body
        const updatedEmployee=await Employee.findByIdAndUpdate(req.params.id,{Emp_ID, Emp_Name, Emp_Email,Emp_Number,Emp_Designation,Emp_Department,Emp_Salary,Emp_Joining_Date,Emp_Address,Emp_DOB},{new: true})
        if (!updatedEmployee) return res.status(404).json({message: "Employee not found"})
        res.status(200).json(updatedEmployee)
    } catch (error) {
        console.error("Error in update employee controller",error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteEmployee(req,res) {
    // console.log("deleteEmployee")
    // res.status(200).json("deleteEmployee")

    try{
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id)
        if (!deletedEmployee) return res.status(404).json({message: "Employee not found"})
        res.status(200).json({message: "Employee deleted successfully "})
    } catch (error){
        console.error("Error in deleteEmployee controller",error)
        res.status(500).json({ message: "Internal server error"})
    }
}