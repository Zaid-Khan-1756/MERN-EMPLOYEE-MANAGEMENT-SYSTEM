import React, {useState} from 'react';
import api from '../lib/axios';
import { ArrowLeftIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreatePage = () => {
  const [Emp_ID,setEmp_ID]=useState('');
  const [Emp_Department,setEmp_Department]=useState('');
  const [Emp_Name,setEmp_Name]=useState('');
  const [Emp_Email,setEmp_Email]=useState('');
  const [Emp_Number,setEmp_Number]=useState('');
  const [Emp_Salary,setEmp_Salary]=useState('');
  const [Emp_Address,setEmp_Address]=useState('');
  const [Emp_Joining_Date,setEmp_Joining_Date]=useState('');
  const [Emp_Designation,setEmp_Designation]=useState('');
  const [Emp_DOB,setEmp_DOB] = useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleSubmit=async(e) =>{
    e.preventDefault()
    setLoading(true)

    try {
      await api.post('/Employees',{Emp_ID:Number(Emp_ID),Emp_Department,Emp_Name,Emp_Email,Emp_Number:Number(Emp_Number),Emp_Salary:Number(Emp_Salary),Emp_Address,Emp_Joining_Date:new Date(Emp_Joining_Date),Emp_Designation,Emp_DOB:new Date(Emp_DOB)

      })
      toast.success('Employee record created successfully!')
      navigate('/')
    } catch (error) {
      console.log("Failed to create record",error)
      toast.error('Failed to create record.')
    } finally{
      setLoading(false)
    }
  }
  
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={'/'} className='btn btn-ghost mb-6'><ArrowLeftIcon className='size-5' />Back to Dashboard</Link>
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Record</h2>
              <form onSubmit={handleSubmit}>

                {/*EMPLOYEE NAME*/ }
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Employee Name</span>
                  </label>
                  <input type="text" placeholder='Employee Name' className='input input-bordered' value={Emp_Name} onChange={(e) => setEmp_Name(e.target.value)} required />
                </div>

                {/*EMPLOYEE ID*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Employee ID</span>
                  </label>
                  <input type="number" placeholder='Employee ID' className='input input-bordered' value={Emp_ID} onChange={(e) => setEmp_ID(e.target.value)} required />
                </div>

                {/*DEPARTMENT*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Department</span>
                  </label>
                  <select className='input input-bordered' value={Emp_Department} onChange={(e) => setEmp_Department(e.target.value)} required>
                    <option value="">Select a Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="R&D">R&D</option>
                    <option value="Legal">Legal</option>
                  </select>
                </div>

                {/*EMAIL*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Email</span>
                  </label>
                  <input type="text" placeholder='abc@gmail.com' className='input input-bordered' value={Emp_Email} onChange={(e) => setEmp_Email(e.target.value)} required />
                </div>

                {/*NUMBER*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Phone Number</span>
                  </label>
                  <input type="number" placeholder='+91' maxLength={10} className='input input-bordered' value={Emp_Number} onChange={(e) => setEmp_Number(e.target.value)} required />
                </div>

                {/*DATE OF BIRTH*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Date Of Birth</span>
                  </label>
                  <input type="date" placeholder='YYYY-MM-DD' className='input input-bordered' value={Emp_DOB || ""} onChange={(e) => setEmp_DOB(e.target.value)} required />
                </div>

                {/*DESIGNATION*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Designation</span>
                  </label>
                  <input type="text" placeholder='Designation' className='input input-bordered' value={Emp_Designation} onChange={(e) => setEmp_Designation(e.target.value)} required />
                </div>


                {/*ADDRESS*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Address</span>
                  </label>
                  <input type="text" placeholder='Address' className='input input-bordered' value={Emp_Address} onChange={(e) => setEmp_Address(e.target.value)} required />
                </div>

                {/*DATE OF JOINING*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Date Of Joining</span>
                  </label>
                  <input type="date" placeholder='YYYY' className='input input-bordered' value={Emp_Joining_Date} onChange={(e) => setEmp_Joining_Date(e.target.value)} required />
                </div>

                {/*SALARY*/ }

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Salary</span>
                  </label>
                  <input type="number" placeholder='Rs' className='input input-bordered' value={Emp_Salary} onChange={(e) => setEmp_Salary(e.target.value)} required />
                </div>



                <div className='card-actions justify-end'>
                  <button type='submit' className='btn btn-primary' disabled={loading}>{loading ? "Creating...": "Create Record"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage;