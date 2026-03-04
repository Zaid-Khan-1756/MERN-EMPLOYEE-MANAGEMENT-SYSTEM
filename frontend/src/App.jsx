import React from 'react'
import { Route,Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import CreatePage from './pages/CreatePage.jsx'
import EmpDetailPage from './pages/EmpDetailPage.jsx'
import EmployeeProfile from './pages/EmployeeProfile.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/Employees/:id" element={<EmpDetailPage />} />
        <Route path="/Employees/view/:id" element={<EmployeeProfile />} />

      </Routes>
    </div>
  )
}

export default App
