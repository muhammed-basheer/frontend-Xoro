import React from "react";
import { BookOpen, Award, TrendingUp, AlertTriangle } from "lucide-react";

/**
 * StatisticsCards Component
 * 
 * Displays key statistics in card format with responsive design
 * Shows enrolled courses, completed courses, in-progress courses, and upcoming assignments
 */
const StatisticsCards = ({ statistics }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {/* Enrolled Courses Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-5 transition-transform hover:translate-y-[-5px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-lg font-semibold">Enrolled Courses</h3>
          <div className="p-1 sm:p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            <BookOpen size={16} className="sm:hidden text-blue-600 dark:text-blue-400" />
            <BookOpen size={20} className="hidden sm:block text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold mt-2">{statistics.enrolledCourses}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Total courses</p>
      </div>
      
      {/* Completed Courses Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-5 transition-transform hover:translate-y-[-5px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-lg font-semibold">Completed</h3>
          <div className="p-1 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Award size={16} className="sm:hidden text-green-600 dark:text-green-400" />
            <Award size={20} className="hidden sm:block text-green-600 dark:text-green-400" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold mt-2">{statistics.completedCourses}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Finished courses</p>
      </div>
      
      {/* In Progress Courses Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-5 transition-transform hover:translate-y-[-5px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-lg font-semibold">In Progress</h3>
          <div className="p-1 sm:p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
            <TrendingUp size={16} className="sm:hidden text-yellow-600 dark:text-yellow-400" />
            <TrendingUp size={20} className="hidden sm:block text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold mt-2">{statistics.inProgressCourses}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Active courses</p>
      </div>
      
      {/* Upcoming Assignments Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-5 transition-transform hover:translate-y-[-5px]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-lg font-semibold">Assignments</h3>
          <div className="p-1 sm:p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertTriangle size={16} className="sm:hidden text-red-600 dark:text-red-400" />
            <AlertTriangle size={20} className="hidden sm:block text-red-600 dark:text-red-400" />
          </div>
        </div>
        <p className="text-2xl sm:text-3xl font-bold mt-2">{statistics.upcomingAssignments}</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">Due this week</p>
      </div>
    </div>
  );
};

export default StatisticsCards;