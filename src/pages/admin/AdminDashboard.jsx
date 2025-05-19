// AdminDashboardLayout.js
import React from 'react';
import StatsCards from '../../components/admin/dashboard/StatsCard';
import EnrollmentChart from '../../components/admin/dashboard/EnrollmentChart';
import RevenueChart from '../../components/admin/dashboard/RevenueChart';
import LatestEnrollments from '../../components/admin/dashboard/LatestEnrollment';
import CoursePerformance from '../../components/admin/dashboard/CoursePerformance';

const AdminDashboard = ({ darkMode }) => {
  // Sample data that would typically come from API or props
  const enrollmentData = [
    { name: 'Jan', count: 65 },
    { name: 'Feb', count: 78 },
    { name: 'Mar', count: 90 },
    { name: 'Apr', count: 81 },
    { name: 'May', count: 110 },
    { name: 'Jun', count: 125 },
    { name: 'Jul', count: 130 },
  ];

  const revenueData = [
    { name: 'Jan', amount: 4500 },
    { name: 'Feb', amount: 5200 },
    { name: 'Mar', amount: 6000 },
    { name: 'Apr', amount: 5600 },
    { name: 'May', amount: 7800 },
    { name: 'Jun', amount: 8200 },
    { name: 'Jul', amount: 9000 },
  ];

  const coursePerformanceData = [
    { name: 'Web Dev', students: 120, completionRate: 75 },
    { name: 'Python', students: 150, completionRate: 82 },
    { name: 'Data Science', students: 95, completionRate: 68 },
    { name: 'UI/UX', students: 85, completionRate: 90 },
    { name: 'AI Basics', students: 110, completionRate: 65 },
  ];

  const latestEnrollments = [
    { id: 1, student: 'Sarah Johnson', course: 'Advanced JavaScript', date: '2023-08-10', status: 'Active' },
    { id: 2, student: 'Michael Chen', course: 'Python for Data Science', date: '2023-08-09', status: 'Active' },
    { id: 3, student: 'Emily Davis', course: 'UI/UX Fundamentals', date: '2023-08-08', status: 'Pending' },
    { id: 4, student: 'Robert Wilson', course: 'React Masterclass', date: '2023-08-07', status: 'Active' },
  ];

  const statsData = {
    students: { count: 1245, change: 12 },
    instructors: { count: 42, change: 5 },
    courses: { count: 78, change: 8 },
    revenue: { amount: 48295, change: 15 }
  };

  return (
    <div className={`${darkMode ? "text-gray-100" : "text-gray-800"}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <StatsCards data={statsData} darkMode={darkMode} />
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <EnrollmentChart data={enrollmentData} darkMode={darkMode} />
          <RevenueChart data={revenueData} darkMode={darkMode} />
        </div>
        
        {/* Latest Enrollments Table */}
        <LatestEnrollments enrollments={latestEnrollments} darkMode={darkMode} />
        
        {/* Course Performance */}
        <CoursePerformance data={coursePerformanceData} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default AdminDashboard;