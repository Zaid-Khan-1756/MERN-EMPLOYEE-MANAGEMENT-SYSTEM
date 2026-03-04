import { Link, useLocation, useNavigate } from "react-router";
import { BookOpen, UserCircle,Info,Edit2,Trash2, LucideSmile, LucideArrowRight, LucideEye, LucideIndianRupee } from "lucide-react";
import {formatData} from "../lib/utils.js";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { useState } from "react";

const EmpCard=({emp,setEmp}) => {
    const [showModal, setShowModal] = useState(false);
    const location=useLocation();
    const navigate=useNavigate();
    const isActive=location.pathname===`/Employees/${emp._id}`;
    const handleDelete = async() => {
        try {
            await api.delete(`/Employees/${emp._id}`);
            setEmp((prev) => prev.filter((e) => e._id !==emp._id));
            toast.success("Employee record deleted Successfully");
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete Employee record");
        }
        finally{
            setShowModal(false);
        }
    };

    return (
        <>
        {/*CARD*/}
        <Link to={`/Employees/${emp._id}`} className={`relative block rounded-x1 bg-base-100 p-4 border transition-all duration-200 ${isActive ? "border-primary shadow-lg" : "border-base-300"} hover:border-primary hover:shadow-xl`}>
        {/* Top Row */}
        <div className="flex justify-between items-start">
            <p className="text-xs text-base-content/60 truncate">{emp._id}</p>
            <span className="badge badge-secondary">{emp.Emp_Department}</span>
        </div>

        {/* EMPLOYEE Info */}
        <div className="mt=4 space-y-2">

        {/* EMPLOYEE NAME */}
        <div className="flex items-center gap-2">
            <LucideSmile className="size-4 text-primary" />
            <p className="font-medium text-base-content line-clamp-1">{emp.Emp_Name}</p>
        </div>

        {/* EMPLOYEE ID */}
        <div className="flex items-center gap-2 text-base-content/70">
        <UserCircle className="size-4 text-primary" />
        <p className="text-sm line-clamp-1">{emp.Emp_ID}</p>
        </div>
        </div>

        {/* DESIGNATION*/}
        <div className="flex items-center gap-2 text-base-content/70">
        <LucideArrowRight className="size-4 text-primary" />
        <p className="text-sm line-clamp-1">{emp.Emp_Designation}</p>
        </div>

        {/* SALARY*/}
        <div className="flex items-center gap-2 text-base-content/70">
        <LucideIndianRupee className="size-4 text-primary" />
        <p className="text-sm line-clamp-1">{emp.Emp_Salary}</p>
        </div>
        

        {/* Footer */}

        <div className="mt-6 flex justify-between items-center">
            <span className="text-xs text-base-content/60">{formatData(new Date(emp.createdAt))}</span>

            {/* Actions Icons */}
            <div className="flex items-center gap-4">
                
                {/* EDIT */ }
                <div className="tooltip tooltip-warning" data-tip="Edit Employee Record">
                    <Edit2 className="size-4 text-warning hover:scale-110 transition" />
                </div>

                {/* DELETE */}
                <div className="tooltip tooltip-error" data-tip="Delete Employee Record">
                    <button onClick = {(e) =>{
                        e.preventDefault();
                        setShowModal(true);}}
                        className="text-error hover:scale-110 transition">
                            <Trash2 className="size-4"/>
                        </button>
                </div>

        {/* VIEW (READ-ONLY PROFILE) */}
        <div className="tooltip tooltip-info" data-tip="View Employee Profile">
        <button
            onClick={(e) => {
            e.preventDefault();
            navigate(`/Employees/view/${emp._id}`);
        }} className="text-info hover:scale-110 transition">
    <LucideEye className="size-4 " />
  </button>
</div>
            </div>
        </div>
        </Link>

        {/* DELETE CONFIRMATION MODAL */}
        {showModal && (<dialog className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-error flex items-center gap-2">
                    <Trash2 className="size-5" />Delete Employee Record</h3>
                <p className="py-4 text-base-content/70">
                Are you sure you want to delete
                <span className="font-semibold text-base-content">{" "}"{emp.Emp_ID}"</span>? <br/>This action cannot be undone.</p>

                <div className="modal-action">
                    <button className="btn btn-ghost" onClick = {() => setShowModal(false)}>Cancel</button>

                    <button className="btn btn-error flex items-center gap-2" onClick={handleDelete}><Trash2 className="size-4" />Delete</button>
                </div>
            </div>
        </dialog>
    )}
    </>
    );
};

export default EmpCard;