import React, {useEffect,useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import api from "../lib/axios.js";
import toast from 'react-hot-toast';
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from 'lucide-react';

const EmpDetailPage = () => {
  const [emp ,setEmp]=useState(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams();

  useEffect(()=>{
    const fetchEmp=async () => {
      try {
        const res=await api.get(`/Employees/${id}`);
        setEmp(res.data);
        
      } catch (error) {
        console.error("Error fetching Employee Record",error);
        toast.error("Failed to fetch the Employee Record");
      } finally{
        setLoading(false);
      }
    };
    fetchEmp();
  },[id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this Employee Record?")) return;

    try {
      await api.delete(`/Employees/${id}`);
      toast.success("Employee Record deleted successfully")
      navigate("/");
    } catch (error) {
      console.error("Error deleting Employee Record",error);
      toast.error("Failed to delete Employee Record");
    }
  };

  const handleSave= async () => {
    if(!emp.Emp_Department.trim() || !emp.Emp_Name.trim() || !emp.Emp_Email.trim() 
      || !emp.Emp_Designation.trim() 
      || !emp.Emp_Address.trim()){
      toast.error("Please add empID,empDept,empName,empEmail,empNumber,empDesignation,empSalary,empDOJ,empAddress,empDOB");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/Employees/${id}`, {
        Emp_ID:Number(emp.Emp_ID),
        Emp_Department : emp.Emp_Department,
        Emp_Name : emp.Emp_Name,
        Emp_Email:emp.Emp_Email,
        Emp_Number:Number(emp.Emp_Number),
        Emp_Designation:emp.Emp_Designation,
        Emp_Address:emp.Emp_Address,
        Emp_Joining_Date:new Date(emp.Emp_Joining_Date),
        Emp_DOB:new Date(emp.Emp_DOB),
        Emp_Salary:Number(emp.Emp_Salary)
      });

      toast.success("Employee Record updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating Employee Record",error);
      toast.error("Failed to update Employee Record");
    } finally{
      setSaving(false);
    }
  };

  if (loading){
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10'/>
      </div>
    );
  }
  return (
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl max-auto'>

            {/* HEADER */}
            <div className='flex items-center justify-between mb-6'>
              <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5' />Back to DashBoard</Link>
              <button onClick={handleDelete} className='btn btn-error btn-outline'>
                <Trash2Icon className='h-5 w-5' />Delete Employee Record
              </button>
            </div>

            {/* FORM CARD */}
            <div className='card bg-base-100 shadow-lg'>
              <div className='card-body'>

                {/* EMPLOYEE NAME */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Employee Name</span>
                  </label>
                  <input type='text' placeholder='Employee Name' className='input input-bordered' value={emp.Emp_Name} onChange={(e) => 
                    setEmp({...emp, Emp_Name: e.target.value}) } />
                </div>

                {/* EMPLOYEE ID */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Employee ID</span>
                  </label>
                  <input type='number' placeholder='Employee ID' className='input input-bordered' value={emp.Emp_ID} onChange={(e) => 
                    setEmp({...emp, Emp_ID: e.target.value}) } />
                </div>

                {/* DEPARTMENT */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Department</span>
                  </label>
                  <input type='text' placeholder='Department' className='input input-bordered' value={emp.Emp_Department} onChange={(e) => 
                    setEmp({...emp, Emp_Department: e.target.value}) } />
                </div>

                {/* EMAIL */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input type='text' placeholder='abc@gmail.com' className='input input-bordered' value={emp.Emp_Email} onChange={(e) => 
                    setEmp({...emp, Emp_Email: e.target.value}) } />
                </div>


                {/* NUMBER */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Number</span>
                  </label>
                  <input type='number' placeholder='+91' className='input input-bordered' value={emp.Emp_Number} onChange={(e) => 
                    setEmp({...emp, Emp_Number: e.target.value}) } />
                </div>

                {/* DATE OF BIRTH */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Date Of Birth</span>
                  </label>
                  <input type='Date' placeholder='YYYY-MM-DD' className='input input-bordered' value={emp.Emp_DOB? new Date(emp.Emp_DOB).toISOString().split("T")[0] : "" }onChange={(e) => setEmp({...emp,Emp_DOB:e.target.value})} />
                </div>

                {/* DESIGNATION */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Designation</span>
                  </label>
                  <input type='text' placeholder='Designation' className='input input-bordered' value={emp.Emp_Designation} onChange={(e) => 
                    setEmp({...emp, Emp_Designation: e.target.value}) } />
                </div>

                {/* ADDRESS */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Address</span>
                  </label>
                  <input type='text' placeholder='Address' className='input input-bordered' value={emp.Emp_Address} onChange={(e) => 
                    setEmp({...emp, Emp_Address: e.target.value}) } />
                </div>

                {/* DATE OF JOINING */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Date Of Joining</span>
                  </label>
                  <input type='Date' placeholder='YYYY-MM-DD' className='input input-bordered' value={emp.Emp_Joining_Date ? new Date(emp.Emp_Joining_Date).toISOString().split("T")[0] : "" } onChange={(e) => setEmp({...emp,Emp_Joining_Date:e.target.value})} />
                </div>

                {/* SALARY */}
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Salary</span>
                  </label>
                  <input type='number' placeholder='Rs' className='input input-bordered' value={emp.Emp_Salary} onChange={(e) => 
                    setEmp({...emp, Emp_Salary: e.target.value}) } />
                </div>

                {/* ACTION */}
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default EmpDetailPage;
