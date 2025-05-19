import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import route functions
import StudentRoutes from "./routes/StudentRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Public pages
import HomePage from "./pages/students/HomePage";
import SignUp from "./pages/students/SignUp";

function App() {
  const [darkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  
  // Get current user from Redux store to determine redirect based on role

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Define login routes for each user type
  const loginRoutes = {
    student: "/login",
    instructor: "/instructor/login",
    admin: "/admin/login"
  };

  

  // Get all role-specific routes
  const studentRoutes =StudentRoutes(loginRoutes);
  const instructorRoutes =InstructorRoutes(loginRoutes);
  const adminRoutes =AdminRoutes(loginRoutes);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Role-specific routes */}
          {studentRoutes}
          {instructorRoutes}
          {adminRoutes}
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

