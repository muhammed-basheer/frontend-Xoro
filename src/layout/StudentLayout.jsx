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
 * This component integrates your existing Navbar, Sidebar and Footer components
 * into a cohesive, responsive layout with proper spacing and positioning.
 */
const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  
  // Check if student has any course enrollments
  const [hasEnrollments, setHasEnrollments] = useState(true);
  
  useEffect(() => {
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
  }, [currentUser]);
  
  // If you need to sync up sidebar state with Navbar's menuOpen state, add this
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
      {/* Your Navbar component from paste-3.txt */}
      <Navbar />
      
      <div className="flex flex-1 pt-16"> {/* pt-16 to account for fixed navbar */}
        {/* Your Sidebar component from paste-4.txt */}
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          hasEnrollments={hasEnrollments} 
        />
        
        {/* Main content area - Modified for better responsive behavior */}
        <main className="flex-1 w-full transition-all duration-300">
          {/* Responsive container with proper padding and no gap */}
          <div className="px-4 sm:px-6 lg:px-8 py-6 w-full max-w-full">
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
      
      {/* Your Footer component */}
      <Footer />
    </div>
  );
};

export default StudentLayout;