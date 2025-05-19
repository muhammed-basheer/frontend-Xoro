import React from "react";
import { BookOpen, ChevronRight } from "lucide-react";

/**
 * RecentCourses Component
 * 
 * Displays a list of the student's most recently accessed courses
 * Shows course title, instructor, progress bar, and last accessed time
 */
const RecentCourses = ({ courses = [] }) => {
  // Get appropriate progress bar color based on completion percentage
  const getProgressColor = (progress) => {
    if (progress > 75) return 'bg-green-500';
    if (progress > 40) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header with title and view all link */}
      <div className="border-b dark:border-gray-700 p-4 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold flex items-center">
          <BookOpen size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
          Recent Courses
        </h3>
        <a href="#" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          View all <ChevronRight size={16} />
        </a>
      </div>
      
      {/* Content area */}
      <div className="p-4">
        {courses.length === 0 ? (
          // Empty state
          <div className="text-center py-8">
            <BookOpen size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">You haven't enrolled in any courses yet.</p>
            <a href="#" className="mt-2 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400">
              Browse courses
            </a>
          </div>
        ) : (
          // Course list
          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 sm:p-4 transition-transform hover:scale-[1.01]">
                {/* Course header with title and completion percentage */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <h4 className="font-medium text-sm sm:text-base">{course.title}</h4>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                    {course.progress}% Complete
                  </span>
                </div>
                
                {/* Instructor info */}
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Instructor: {course.instructor}
                </p>
                
                {/* Progress bar and last accessed */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 dark:bg-gray-700">
                    <div 
                      className={`h-2 sm:h-2.5 rounded-full ${getProgressColor(course.progress)}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                    Last accessed: {course.lastAccessed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentCourses;