import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice.js"; 
import Sidebar from "../components/admin/common/Sidebar.jsx"; 
import Navbar from "../components/admin/common/Navbar.jsx"; 

/**
 * Layout component for Admin pages
 */
const AdminLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  
  // State for sidebar and theme
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add/remove dark class from document for dark mode styling
    document.documentElement.classList.toggle('dark');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar - visible on desktop, hidden on mobile unless toggled */}
      <div className={`fixed md:relative h-full z-20 transition-all duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <Sidebar 
          currentUser={currentUser} 
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar 
          currentUser={currentUser}
          toggleMobileMenu={toggleMobileMenu}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          title="Admin Dashboard"
        />
        
        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800 p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;