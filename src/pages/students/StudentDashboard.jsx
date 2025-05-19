import React from "react";
import StatisticsCards from "../../components/students/Dashboard/StatisticsCards";
import RecentCourses from "../../components/students/Dashboard/RecentCourses";
import NotificationsPanel from "../../components/students/Dashboard/NotificationsPanel";
import UpcomingDeadlines from "../../components/students/Dashboard/UpcomingDeadlines";

/**
 * Modified Student Dashboard component with modular design
 * Main container that orchestrates smaller component pieces
 */
const StudentDashboard = () => {
  // Mock data for demo - in real app would use Redux or context
  const [isLoading, setIsLoading] = React.useState(false);
  const statistics = {
    enrolledCourses: 5,
    completedCourses: 2,
    inProgressCourses: 3,
    upcomingAssignments: 4
  };
  
  const recentCourses = [
    { id: 1, title: "Introduction to React", progress: 75, instructor: "John Doe", lastAccessed: "2 days ago" },
    { id: 2, title: "Advanced JavaScript", progress: 45, instructor: "Jane Smith", lastAccessed: "Yesterday" },
    { id: 3, title: "Web Development Fundamentals", progress: 90, instructor: "Mike Johnson", lastAccessed: "Today" }
  ];
  
  const notifications = [
    { id: 1, message: "Assignment due tomorrow: React Components", date: "May 18, 2025", isRead: false, type: "warning" },
    { id: 2, message: "Your recent quiz score: 85%", date: "May 15, 2025", isRead: true, type: "info" },
    { id: 3, message: "New course material available in Web Development", date: "May 12, 2025", isRead: true, type: "info" }
  ];
  
  const upcomingDeadlines = [
    { id: 1, title: "React Components Assignment", course: "Introduction to React", dueDate: "May 18, 2025", priority: "high" },
    { id: 2, title: "JavaScript Final Project", course: "Advanced JavaScript", dueDate: "May 25, 2025", priority: "medium" },
    { id: 3, title: "CSS Layout Quiz", course: "Web Development Fundamentals", dueDate: "May 20, 2025", priority: "medium" }
  ];

  const handleMarkAsRead = (id) => {
    // In a real app, this would update state or dispatch an action
    console.log(`Marking notification ${id} as read`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <main>
        {/* Statistics cards section */}
        <StatisticsCards statistics={statistics} />
        
        {/* Main content grid - responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent courses - takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <RecentCourses courses={recentCourses} />
          </div>
          
          {/* Right column for notifications and upcoming deadlines */}
          <div className="space-y-6">
            <NotificationsPanel 
              notifications={notifications} 
              onMarkAsRead={handleMarkAsRead} 
            />
            <UpcomingDeadlines deadlines={upcomingDeadlines} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;