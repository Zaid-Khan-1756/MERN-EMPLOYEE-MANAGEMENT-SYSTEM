import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import api from "../lib/axios";
import { calculateAge, calculateYearsOnJob } from "../lib/utils";
import { ArrowLeftIcon } from "lucide-react";

function EmployeeProfile() {
  const { id } = useParams();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    api.get(`/Employees/${id}`).then((res) => {
      setEmp(res.data);
    });
  }, [id]);

  if (!emp) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-600-200 to-gray-400 p-6">
      
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-xl p-8">

        <Link
          to={"/"}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md w-fit mb-6 hover:bg-gray-800 transition"
        >
          <ArrowLeftIcon className="size-5" />
          Back to Dashboard
        </Link>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 border-b pb-2">
          Employee Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

          <p><strong>Name:</strong> {emp.Emp_Name}</p>
          <p><strong>Employee ID:</strong> {emp.Emp_ID}</p>

          <p><strong>Department:</strong> {emp.Emp_Department}</p>
          <p><strong>Designation:</strong> {emp.Emp_Designation}</p>

          <p><strong>Email:</strong> {emp.Emp_Email}</p>
          <p><strong>Phone:</strong> {emp.Emp_Number}</p>

          <p className="md:col-span-2">
            <strong>Address:</strong> {emp.Emp_Address}
          </p>

          <p>
            <strong>Date Of Joining:</strong>{" "}
            {new Date(emp.Emp_Joining_Date).toLocaleDateString()}
          </p>

          <p>
            <strong>Date Of Birth:</strong>{" "}
            {new Date(emp.Emp_DOB).toLocaleDateString()}
          </p>

          <p><strong>Salary:</strong> ₹{emp.Emp_Salary}</p>

        </div>

        <div className="mt-6 border-t pt-4 text-gray-800">

          <p className="mb-2">
            <strong>Age:</strong> {calculateAge(emp.Emp_DOB)}
          </p>

          <p>
            <strong>Years on the Job:</strong>{" "}
            {calculateYearsOnJob(emp.Emp_Joining_Date)}
          </p>

        </div>

      </div>
    </div>
  );
}

export default EmployeeProfile;
