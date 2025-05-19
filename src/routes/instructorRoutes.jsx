import React from "react";
import { Route } from "react-router-dom";
import DynamicProtectedRoute from "../routes/protectedRoute/DynamicProtectedRoute";
import InstructorLayout from "../layout/InstructorLayout";
import InstructorLogin from "../pages/instructor/Login";
// import InstructorDashboard from "../pages/instructor/InstructorDashboard";
// import CourseManagement from "../pages/instructor/CourseManagement";
// import InstructorProfile from "../pages/instructor/Profile";

/**
 * Instructor routes array to be included in the main Routes component
 * @param {Object} loginRoutes - Object mapping roles to their respective login routes
 * @returns {Array} Array of Route components
 */
const InstructorRoutes = (loginRoutes) => [
  // Public instructor login route
  <Route key="instructor-login" path="/instructor/login" element={<InstructorLogin />} />,
  
  // Protected instructor routes
  <Route
    key="instructor-protected"
    element={
      <DynamicProtectedRoute 
        allowedRoles={["instructor"]} 
        loginRoutes={loginRoutes}
      />
    }
  >
    <Route element={<InstructorLayout />}>
      {/* <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
      <Route path="/instructor/courses" element={<CourseManagement />} />
      <Route path="/instructor/profile" element={<InstructorProfile />} /> */}
    </Route>
  </Route>
];

export default InstructorRoutes;