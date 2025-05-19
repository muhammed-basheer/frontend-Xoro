import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice.js"; // Adjust import path based on your project structure

/**
 * Layout component for Instructor pages
 */
const InstructorLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate("/instructor/login");
  };
  
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-50 dark:bg-blue-900 border-r dark:border-blue-800">
        <div className="p-4">
          <h2 className="text-xl font-bold">Instructor Portal</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome, {currentUser?.user?.name || "Instructor"}
          </p>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6">
          <ul>
            <li>
              <button 
                onClick={() => navigate("/instructor/dashboard")}
                className="w-full text-left px-4 py-3 flex items-center hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                <span className="mr-2">📊</span> Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/instructor/courses")}
                className="w-full text-left px-4 py-3 flex items-center hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                <span className="mr-2">📚</span> Course Management
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/instructor/profile")}
                className="w-full text-left px-4 py-3 flex items-center hover:bg-blue-100 dark:hover:bg-blue-800"
              >
                <span className="mr-2">👤</span> Profile
              </button>
            </li>
          </ul>
        </nav>
        
        {/* Logout button */}
        <div className="absolute bottom-0 w-64 p-4 border-t dark:border-blue-800">
          <button 
            onClick={handleLogout}
            className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 shadow dark:shadow-gray-800 p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Instructor Area</h1>
          </div>
        </header>
        
        {/* Page content */}
        <main className="container mx-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;