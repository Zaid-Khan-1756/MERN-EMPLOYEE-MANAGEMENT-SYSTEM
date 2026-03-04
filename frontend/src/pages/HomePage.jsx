import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar.jsx";
import api from "../lib/axios.js";
import {toast} from "react-hot-toast";
import EmpCard from "../components/EmpCard.jsx";
import EmployeeNotFound from "../components/EmployeeNotFound.jsx";

const HomePage = () => {

  const [emp,setEmp] =useState([])
  const [loading,setLoading]= useState(true)
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [Emp_Department, setEmp_Department] = useState("");

  
  const filteredEmployees = emp.filter((emp) => {
  const matchesSearch =
    emp.Emp_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.Emp_Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.Emp_Designation.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesDepartment =
    Emp_Department === "" || emp.Emp_Department?.toLowerCase() === Emp_Department.toLowerCase();

  return matchesSearch && matchesDepartment;
});

const sortedEmployees = [...filteredEmployees].sort((a, b) => {
  if (sortBy === "name-asc") {
    return a.Emp_Name?.localeCompare(b.Emp_Name);
  }

  if (sortBy === "name-desc") {
    return b.Emp_Name?.localeCompare(a.Emp_Name);
  }



  if (sortBy === "salary-asc") {
    return (a.Emp_Salary || 0) - (b.Emp_Salary || 0);
  }

  if (sortBy === "salary-desc") {
    return (b.Emp_Salary || 0) - (a.Emp_Salary || 0);
  }

  return 0;
});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get('/Employees')
        console.log(res.data)
        setEmp(res.data)
      } catch (error) {
        console.log("Error fetching Records")
        console.log(error)
        toast.error("Failed to load records")
      } finally{
        setLoading(false)
      }
    }
    fetchEmployees();
  },[])
  return (
    <div className='min-h-screen'>
      <Navbar />

      <div className="filters flex justify-center">
  <input className="w-full max-w-md px-3 py-3"
    type="text"
    placeholder="Search employee..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select value={Emp_Department} onChange={(e) => setEmp_Department(e.target.value)}>
    <option value="">All Departments</option>
    <option value="HR">HR</option>
    <option value="IT">IT</option>
    <option value="Marketing">Marketing</option>
    <option value="Legal">Legal</option>
    <option value="R&D">R&D</option>
    <option value="Finance">Finance</option>
  </select>

  <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="px-4 py-2 border flex justify-center border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
>
  <option value="">Sort By</option>
  <option value="name-asc">Name (A–Z)</option>
  <option value="name-desc">Name (Z-A)</option>
  <option value="salary-asc">Salary (Low → High)</option>
  <option value="salary-desc">Salary (High → Low)</option>
</select>

</div>



      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Records ...</div>}
        {emp.length ===0 && <EmployeeNotFound />}
        {emp.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {sortedEmployees.map((emp) => (
              <EmpCard key={emp._id} emp={emp} setEmp={setEmp} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage;
