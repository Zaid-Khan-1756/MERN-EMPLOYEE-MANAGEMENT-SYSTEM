import mongoose, { mongo } from "mongoose";
const EmpSchema = new mongoose.Schema({
    Emp_ID :{
        type: Number,
        required: true,
    },
    Emp_Name: {
        type: String,
        required:true
    },
    Emp_Email:{
        type: String,
        required: true,
    },
    Emp_Number:{
        type: Number,
        required:true
    },

    Emp_Designation:{
        type:String,
        required:true
    },

    Emp_Department:{
        type:String,
        required:true
    },

    Emp_Salary:{
        type:Number,
        required:true
    },

    Emp_Joining_Date:{
        type:Date,
        required:true
    },

    Emp_Address:{
        type:String,
        required:true
    },

    Emp_DOB:{
        type:Date,
        required:true
    }
    
},{timestamps:true})

const Employee=mongoose.model("Employee",EmpSchema)
export default Employee