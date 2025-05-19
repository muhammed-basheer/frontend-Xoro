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
 * @param {Object} loginRoutes - Object mapping roles to their respective login routes
 * @returns {Array} Array of Route components
 */
const StudentRoutes = (loginRoutes) => [
  // Public student login route
  <Route key="student-login" path="/login" element={<LogIn />} />,
  
  // Protected student routes
  <Route
    key="student-protected"
    element={
      <DynamicProtectedRoute 
        allowedRoles={["student"]} 
        loginRoutes={loginRoutes}
      />
    }
  >
    <Route element={<StudentLayout />}>
      <Route path="/dashboard" element={<StudentDashboard />} />
      {/* <Route path="/courses" element={<Courses />} />
      <Route path="/profile" element={<Profile />} /> */}
    </Route>
  </Route>
];

export default StudentRoutes;