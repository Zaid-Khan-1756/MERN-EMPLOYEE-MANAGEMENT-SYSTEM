import { useParams,Link } from "react-router";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { calculateAge,calculateYearsOnJob } from "../lib/utils";
import { ArrowLeftIcon } from 'lucide-react';

function EmployeeProfile() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api.get(`/Employees/${id}`).then((res) => {
      setEmp(res.data);
    });
  }, [id]);

  if (!emp) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-green-300 shadow rounded-lg">
      <Link to={'/'} className='btn bg-black mb-6'><ArrowLeftIcon className='size-5' />Back to Dashboard</Link>
      <h2 className="text-xl text-black font-bold mb-4 underline">Employee Profile</h2>

      <p className="p-2 text-black"><strong>Name:</strong> {emp.Emp_Name}</p>
      <p className="p-2 text-black"><strong>Employee ID:</strong> {emp.Emp_ID}</p>
      <p className="p-2 text-black"><strong>Department:</strong> {emp.Emp_Department}</p>
      <p className="p-2 text-black"><strong>Designation:</strong> {emp.Emp_Designation}</p>
      <p className="p-2 text-black"><strong>Email:</strong> {emp.Emp_Email}</p>
      <p className="p-2 text-black"><strong>Number:</strong> {emp.Emp_Number}</p>
      <p className="p-2 text-black"><strong>Address:</strong> {emp.Emp_Address}</p>
      <p className="p-2 text-black"><strong>Date Of Joining:</strong>{" "} {new Date(emp.Emp_Joining_Date).toLocaleDateString()}</p>
      <p className="p-2 text-black"><strong>Date Of Birth:</strong>{" "} {new Date(emp.Emp_DOB).toLocaleDateString()}</p>
      <p className="p-2 text-black"><strong>Salary:</strong> ₹{emp.Emp_Salary}</p>
      <p className="p-2 text-black"><strong>-------------------------------</strong></p>
      <p className="p-2 text-black"><strong>Age:</strong>{calculateAge(emp.Emp_DOB)}</p>
      <p className="p-2 text-black"><strong>Years on the Job:</strong>{calculateYearsOnJob(emp.Emp_Joining_Date)}</p>
      
    </div>
     
  );
}

export default EmployeeProfile;