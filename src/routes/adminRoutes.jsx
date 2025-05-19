import React from "react";
import { Route } from "react-router-dom";
import DynamicProtectedRoute from "../routes/protectedRoute/DynamicProtectedRoute";
import AdminLayout from "../layout/AdminLayout";
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import UsersList from "../pages/admin/UsersList";
// import AdminProfile from "../pages/admin/Profile";

/**
 * Admin routes array to be included in the main Routes component
 * @param {Object} loginRoutes - Object mapping roles to their respective login routes
 * @returns {Array} Array of Route components
 */
const AdminRoutes = (loginRoutes) => [
  // Public admin login route
  <Route key="admin-login" path="/admin/login" element={<AdminLogin />} />,
  
  // Protected admin routes
  <Route
    key="admin-protected"
    element={
      <DynamicProtectedRoute 
        allowedRoles={["admin"]} 
        loginRoutes={loginRoutes}
      />
    }
  >
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
       <Route path="/admin/users" element={<UsersList />} />
       <Route path="/users/:userId" element={<UserManagement />} />
      {/* <Route path="/admin/profile" element={<AdminProfile />} />  */}
    </Route>
  </Route>
];

export default AdminRoutes;