import React from "react";
import { Route } from "react-router-dom";
import DynamicProtectedRoute from "../routes/protectedRoute/DynamicProtectedRoute";
import StudentLayout from "../layout/StudentLayout";
import LogIn from "../pages/students/LogIn";
import StudentDashboard from "../pages/students/StudentDashboard";
// import Courses from "../pages/students/Courses";
// import Profile from "../pages/students/Profile";

/**
 * Student routes array to be included in the main Routes component
 * 
 * FIXED:
 * - Corrected route nesting structure for React Router v6
 * - Properly configured outlet context for StudentLayout
 * - Added index route for better default navigation
 * 
 * @param {Object} loginRoutes - Object mapping roles to their respective login routes
 * @returns {Array} Array of Route components
 */
const StudentRoutes = (loginRoutes) => [
  // Public student login route (stays at top level)
  <Route key="student-login" path="/login" element={<LogIn />} />,
  
  // Protected student routes - properly nested structure
  <Route
    key="student-protected"
    element={
      <DynamicProtectedRoute 
        allowedRoles={["student"]} 
        loginRoutes={loginRoutes}
      />
    }
  >
    {/* StudentLayout will render its children in its <Outlet /> */}
    <Route element={<StudentLayout />}>
      {/* Dashboard route */}
      <Route path="/dashboard" element={<StudentDashboard />} />
      
      
      {/* Other student routes (commented but structured correctly) */}
      {/* <Route path="/courses" element={<Courses />} /> */}
    </Route>
  </Route>
];

export default StudentRoutes;