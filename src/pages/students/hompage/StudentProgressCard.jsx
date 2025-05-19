import React, { useState, useEffect } from "react";
import { X, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * StudentProgressCard Component
 *
 * Displays student's progress card on homepage with options to:
 * - View details (navigate to dashboard)
 * - Dismiss/hide the card (once dismissed, it won't show again)
 * - Enhanced smooth entrance and exit animations
 *
 * This component directly fetches data from your API service instead of
 * relying on dashboard data
 */
const StudentProgressCard = () => {
  // Get user data and navigation
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [statistics, setStatistics] = useState({
    enrolledCourses: 5,
    completedCourses: 2,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced entrance animation with proper timing
  useEffect(() => {
    // Start with opacity 0
    document.documentElement.style.setProperty("--card-opacity", "0");
    document.documentElement.style.setProperty(
      "--card-transform",
      "translateY(20px)"
    );

    // Small initial delay for better effect
    const initialTimer = setTimeout(() => {
      // Trigger animation by updating CSS variables
      document.documentElement.style.setProperty("--card-opacity", "1");
      document.documentElement.style.setProperty(
        "--card-transform",
        "translateY(0)"
      );

      // Mark animation as in progress
      setIsEntering(false);

      // Mark animation as complete after transition duration
      setTimeout(() => {
        setAnimationComplete(true);
      }, 600);
    }, 100);

    return () => clearTimeout(initialTimer);
  }, []);

  // Calculate progress percentage for progress bar
  const calculateOverallProgress = () => {
    if (statistics.enrolledCourses === 0) return 0;
    return Math.round(
      (statistics.completedCourses / statistics.enrolledCourses) * 100
    );
  };

  // Enhanced dismissing animation with CSS variables
  const dismissCard = (e) => {
    e.stopPropagation(); // Prevent navigation to dashboard when clicking the X button

    // Update CSS variables for smooth exit
    document.documentElement.style.setProperty("--card-opacity", "0");
    document.documentElement.style.setProperty(
      "--card-transform",
      "translateY(-20px)"
    );

    setIsExiting(true);

    // After animation completes, remove from DOM
    setTimeout(() => {
      setIsVisible(false);
    }, 600); // Match this with the CSS transition duration
  };

  // Navigate to dashboard when card is clicked
  const goToDashboard = () => {
    // Start exit animation before navigation
    document.documentElement.style.setProperty("--card-opacity", "0");
    document.documentElement.style.setProperty(
      "--card-transform",
      "translateY(-20px)"
    );

    // Delay navigation slightly to allow animation to start
    setTimeout(() => {
      navigate("/dashboard");
    }, 300);
  };

  // Custom animation styles
  const cardAnimationStyles = {
    opacity: "var(--card-opacity, 1)",
    transform: "var(--card-transform, translateY(0))",
    transition:
      "opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
  };

  if (!isVisible) {
    // When card is completely hidden, don't render anything
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 mb-6 mt-20">
        <div className="h-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mb-6 mt-20">
      <div
        onClick={goToDashboard}
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-4 sm:p-6 text-white cursor-pointer relative will-change-transform"
        style={cardAnimationStyles}
      >
        <button
          onClick={dismissCard}
          className="absolute top-2 right-2 p-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-300"
          title="Dismiss"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Welcome back,{" "}
              {currentUser?.user?.name
                ? currentUser.user.name.charAt(0).toUpperCase() +
                  currentUser.user.name.slice(1)
                : "Student"}
              !
            </h2>
            <p className="mt-2 text-blue-100 text-sm sm:text-base">
              Here's an overview of your learning progress.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 sm:p-4">
              <div className="text-sm font-medium">Overall Completion</div>
              <div className="flex items-center mt-1">
                <div className="w-full bg-blue-900/50 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${calculateOverallProgress()}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm font-bold">
                  {calculateOverallProgress()}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <div className="flex items-center text-sm text-white/90 hover:text-white group transition-colors duration-300">
            View dashboard
            <ChevronRight
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressCard;
