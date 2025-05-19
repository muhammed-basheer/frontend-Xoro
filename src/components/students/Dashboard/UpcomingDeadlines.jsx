import React from "react";
import { Calendar, ChevronRight, Clock } from "lucide-react";

/**
 * UpcomingDeadlines Component
 * 
 * Displays a list of upcoming assignment deadlines with:
 * - Title and course information
 * - Priority level (color coded)
 * - Due date
 */
const UpcomingDeadlines = ({ deadlines = [] }) => {
  // Get color class based on priority level
  const getPriorityColorClass = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header with title and view calendar link */}
      <div className="border-b dark:border-gray-700 p-4 flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-semibold flex items-center">
          <Calendar size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
          Upcoming Deadlines
        </h3>
        <a href="#" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center">
          View calendar <ChevronRight size={16} />
        </a>
      </div>
      
      {/* Content area */}
      <div className="p-3 sm:p-4">
        {deadlines.length === 0 ? (
          // Empty state
          <div className="text-center py-6 sm:py-8">
            <Clock size={32} className="sm:hidden mx-auto text-gray-400 mb-2" />
            <Clock size={40} className="hidden sm:block mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming deadlines.</p>
          </div>
        ) : (
          // Deadlines list
          <div className="space-y-2 sm:space-y-3">
            {deadlines.map(deadline => (
              <div key={deadline.id} className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                {/* Assignment title */}
                <h4 className="font-medium text-xs sm:text-sm">{deadline.title}</h4>
                
                {/* Course name */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {deadline.course}
                </p>
                
                {/* Priority and due date */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
                  <p className={`text-xs ${getPriorityColorClass(deadline.priority)}`}>
                    {deadline.priority.charAt(0).toUpperCase() + deadline.priority.slice(1)} Priority
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">Due: {deadline.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;