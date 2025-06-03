import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Import your existing components
import Navbar from "../components/students/common/Navbar";
import Sidebar from "../components/students/common/Sidebar";
import Footer from "../components/students/common/Footer";

/**
 * StudentLayout - Professional layout for student pages
 * 
 * FIXED:
 * - Improved component mounting and state management
 * - Added debug console logs for route rendering
 * - Enhanced responsive behavior
 * - Fixed potential layout issues with Outlet rendering
 */
const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user || { currentUser: null });
  const navigate = useNavigate();
  
  // Check if student has any course enrollments
  const [hasEnrollments, setHasEnrollments] = useState(true);
  
  useEffect(() => {
    // Log to verify component is mounting properly
    console.log("StudentLayout mounted");
    
    // You would fetch this data from your API
    // Example:
    // const fetchEnrollments = async () => {
    //   try {
    //     const response = await api.get('/student/enrollments');
    //     setHasEnrollments(response.data.length > 0);
    //   } catch (error) {
    //     console.error("Failed to fetch enrollments", error);
    //     setHasEnrollments(false);
    //   }
    // };
    // fetchEnrollments();
    
    // Cleanup function
    return () => {
      console.log("StudentLayout unmounted");
    };
  }, [currentUser]);
  
  // Handle sidebar toggle from navbar
  const handleNavbarMenuToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };
  
  // Effect to close sidebar when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Navbar - fixed at top */}
      <Navbar onMenuToggle={handleNavbarMenuToggle} />
      
      <div className="flex flex-1 pt-16"> {/* pt-16 to account for fixed navbar */}
        {/* Sidebar with proper z-index */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          hasEnrollments={hasEnrollments} 
          className="z-30"
        />
        
        {/* Main content area with Outlet for child routes */}
        <main className="flex-1 w-full transition-all duration-300 relative">
          {/* Overlay for mobile when sidebar is open */}
          {sidebarOpen && (
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          
          {/* Container for child routes via Outlet */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-full">
            {/* This is where nested routes will render */}
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Floating action button for sidebar toggle on mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 z-50 lg:hidden bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StudentLayout;