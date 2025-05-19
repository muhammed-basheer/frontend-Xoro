import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Dynamic Protected Route component that checks if user is authenticated and has the required role
 * Redirects to role-specific login pages when authentication fails
 * 
 * @param {Object} props - Component props
 * @param {Array} props.allowedRoles - Array of roles that are allowed to access the route
 * @param {Object} props.loginRoutes - Object mapping roles to their respective login routes (optional)
 * @returns {JSX.Element} - React component
 */
const DynamicProtectedRoute = ({ allowedRoles, loginRoutes = {} }) => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  
  // Default login route if no specific route is defined for a role
  const DEFAULT_LOGIN_ROUTE = "/login";
  
  // If no user is logged in, redirect to appropriate login page based on attempted path
  if (!currentUser) {
    // Try to determine which role-specific area they were trying to access
    const attemptedPath = location.pathname.toLowerCase();
    
    // Determine redirect path based on the URL they were trying to access
    let redirectPath = DEFAULT_LOGIN_ROUTE;
    let targetRole = "";

    // Check if the attempted path contains any role identifiers
    if (attemptedPath.includes("/instructor")) {
      redirectPath = loginRoutes.instructor || "/instructor/login";
      targetRole = "instructor";
    } else if (attemptedPath.includes("/admin")) {
      redirectPath = loginRoutes.admin || "/admin/login";
      targetRole = "admin";
    } else if (attemptedPath.includes("/student")) {
      redirectPath = loginRoutes.student || "/student/login";
      targetRole = "student";
    }
    
    return <Navigate 
      to={redirectPath}
      replace 
      state={{ 
        from: location,
        message: targetRole 
          ? `Please log in as a ${targetRole} to access this page`
          : "Please log in to access this page"
      }} 
    />;
  }
  
  // If user is logged in but role doesn't match, redirect to appropriate page
  if (allowedRoles && !allowedRoles.includes(currentUser.user.role)) {
    // Determine which login page to redirect to based on the user's current role
    const userRole = currentUser.user.role;
    const redirectPath = loginRoutes[userRole] || DEFAULT_LOGIN_ROUTE;
    
    return <Navigate 
      to={redirectPath}
      replace 
      state={{ 
        error: `Access denied. Only ${allowedRoles.join(" or ")} can access this page.`,
        from: location
      }} 
    />;
  }
  
  // If user is logged in and role matches, render the protected content
  return <Outlet />;
};

export default DynamicProtectedRoute;