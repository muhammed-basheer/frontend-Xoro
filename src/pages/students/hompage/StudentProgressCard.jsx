import React, { useState, useEffect, useRef } from "react";
import { X, ChevronRight, Award, Book, CheckCircle, Clock, Flame, Calendar, BarChart2, Star, Trophy } from "lucide-react";
import { useSelector } from "react-redux";

/**
 * Enhanced StudentProgressCard Component
 * 
 * Features:
 * - Rounded corners for modern design
 * - Fixed positioning to prevent navbar overlap
 * - Full-width design with immersive background
 * - Modern glassmorphism with subtle frosted glass effect
 * - Dynamic color scheme matching the Xoro brand
 * - Animated progress indicators and micro-interactions
 * - Responsive layout with improved spacing
 */
const StudentProgressCard = () => {
  const currentUser = useSelector((state) => state.user.currentUser);  
  
  const cardRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);
  const [expandStats, setExpandStats] = useState(false);
  const [statistics, setStatistics] = useState({
    enrolledCourses: 5,
    completedCourses: 2,
    totalHours: 24,
    streak: 7,
    lastActivity: "2 hours ago"
  });
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced entrance animation
  useEffect(() => {
    if (!cardRef.current) return;
    
    // Set initial state for animation
    cardRef.current.style.opacity = "0";
    cardRef.current.style.transform = "translateY(20px)";
    
    const initialTimer = setTimeout(() => {
      cardRef.current.style.transition = "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 500ms ease-out";
      cardRef.current.style.opacity = "1";
      cardRef.current.style.transform = "translateY(0)";
    }, 100);

    return () => clearTimeout(initialTimer);
  }, []);

  // Calculate progress percentage
  const calculateOverallProgress = () => {
    if (statistics.enrolledCourses === 0) return 0;
    return Math.round(
      (statistics.completedCourses / statistics.enrolledCourses) * 100
    );
  };

  // Enhanced dismissing animation
  const dismissCard = (e) => {
    e.stopPropagation();

    if (cardRef.current) {
      cardRef.current.style.transition = "transform 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 500ms ease-out";
      cardRef.current.style.opacity = "0";
      cardRef.current.style.transform = "translateY(-20px)";
    }

    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  // Navigate to dashboard with transition
  const goToDashboard = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 400ms ease-out, filter 400ms ease";
      cardRef.current.style.opacity = "0";
      cardRef.current.style.transform = "translateY(-15px)";
      cardRef.current.style.filter = "blur(4px)";
    }

    setTimeout(() => {
      console.log("Navigating to dashboard");
      // Would normally use navigate("/dashboard") here
    }, 300);
  };

  if (!isVisible) return null;

  if (isLoading) {
    return (
      <div className="w-full px-4 py-6">
        <div className="h-32 bg-blue-600/20 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  const progressPercent = calculateOverallProgress();

  return (
    <div className="w-full bg-gray-900 pt-4 mt-16 sm:mt-20">
      {/* Full width container with padding to prevent navbar overlap */}
      <div
        ref={cardRef}
        className="w-full bg-blue-600 relative overflow-hidden will-change-transform rounded-xl mx-auto max-w-7xl shadow-2xl"
      >
        {/* Decorative accent elements */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
               backgroundSize: '100px 100px'
             }}>
        </div>
        
        {/* Main content container with responsive padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Welcome back, {currentUser?.user?.name
                  ? currentUser.user.name
                  : "Student"}!
              </h2>
              <p className="mt-1 text-blue-100">
                Here's an overview of your learning progress.
              </p>
            </div>
            
            {/* Progress indicator box */}
            <div className="mt-4 sm:mt-0 bg-white/10 backdrop-blur-sm p-4 rounded-lg sm:min-w-64">
              <div className="text-sm font-medium text-white">Overall Completion</div>
              <div className="flex items-center mt-2">
                <div className="w-full bg-blue-900/40 h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-white h-2 transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <span className="ml-3 text-lg font-bold text-white">
                  {progressPercent}%
                </span>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={dismissCard}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 transition-all duration-300 z-10 rounded-full"
              title="Dismiss"
            >
              <X size={18} className="text-white/90" />
            </button>
          </div>

          {/* Dashboard link */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={goToDashboard}
              className="flex items-center text-white/90 hover:text-white group transition-colors duration-300 rounded-lg px-3 py-1 bg-white/5 hover:bg-white/10"
            >
              <span className="text-sm">View dashboard</span>
              <ChevronRight
                size={18}
                className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
              />
            </button>
          </div>
          
          {/* Optional: Additional stats that can be expanded */}
          {expandStats && (
            <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-200">Enrolled courses</div>
                <div className="text-xl font-bold">{statistics.enrolledCourses}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-200">Completed</div>
                <div className="text-xl font-bold">{statistics.completedCourses}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-200">Study hours</div>
                <div className="text-xl font-bold">{statistics.totalHours}</div>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <div className="text-xs text-blue-200">Day streak</div>
                <div className="text-xl font-bold">{statistics.streak}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProgressCard;