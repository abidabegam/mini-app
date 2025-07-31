import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import EmployeePage from "./pages/EmployeePage";
import JobDetails from "./pages/JobDetails";
import "./App.css";

export default function App() {
  return (
    <div>
      <nav className="nav">
        <Link to="/">Employees</Link>
        <Link to="/app/employee/job-details">Job Details</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/app/employee/job-details" element={<JobDetails />} />
        </Routes>
      </div>
    </div>
  );
}
