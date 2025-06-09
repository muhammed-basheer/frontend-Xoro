import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './redux/user/userSlice.js'; // Adjust path as needed

// Import route functions
import StudentRoutes from "./routes/StudentRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import AdminRoutes from "./routes/AdminRoutes";

// Public pages
import HomePage from "./pages/students/HomePage";
import SignUp from "./pages/students/SignUp";
import Profile from "./pages/students/Profile";

function App() {
  const dispatch = useDispatch();
  const { loading,} = useSelector(state => state.user);
  
  const [darkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

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
  const studentRoutes = StudentRoutes(loginRoutes);
  const instructorRoutes = InstructorRoutes(loginRoutes);
  const adminRoutes = AdminRoutes(loginRoutes);

  // 🔄 Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          
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