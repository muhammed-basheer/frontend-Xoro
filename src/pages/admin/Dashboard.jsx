import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaBook, FaMoneyBillWave } from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const Dashboard = ({ darkMode }) => {
  // Sample data for charts
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

  // Sample latest enrollments data
  const latestEnrollments = [
    { id: 1, student: 'Sarah Johnson', course: 'Advanced JavaScript', date: '2023-08-10', status: 'Active' },
    { id: 2, student: 'Michael Chen', course: 'Python for Data Science', date: '2023-08-09', status: 'Active' },
    { id: 3, student: 'Emily Davis', course: 'UI/UX Fundamentals', date: '2023-08-08', status: 'Pending' },
    { id: 4, student: 'Robert Wilson', course: 'React Masterclass', date: '2023-08-07', status: 'Active' },
  ];

  return (
    <div className={`${darkMode ? "text-gray-100" : "text-gray-800"}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Total Students */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? "bg-blue-900" : "bg-blue-100"} text-blue-500`}>
                <FaUsers size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-75">Total Students</p>
                <p className="text-2xl font-semibold">1,245</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-500">↑ 12% from last month</p>
            </div>
          </div>
          
          {/* Total Instructors */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? "bg-purple-900" : "bg-purple-100"} text-purple-500`}>
                <FaChalkboardTeacher size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-75">Total Instructors</p>
                <p className="text-2xl font-semibold">42</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-500">↑ 5% from last month</p>
            </div>
          </div>
          
          {/* Total Courses */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? "bg-yellow-900" : "bg-yellow-100"} text-yellow-500`}>
                <FaBook size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-75">Active Courses</p>
                <p className="text-2xl font-semibold">78</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-500">↑ 8% from last month</p>
            </div>
          </div>
          
          {/* Total Revenue */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${darkMode ? "bg-green-900" : "bg-green-100"} text-green-500`}>
                <FaMoneyBillWave size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-75">Total Revenue</p>
                <p className="text-2xl font-semibold">$48,295</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-500">↑ 15% from last month</p>
            </div>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Enrollment Chart */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4">Enrollment Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={enrollmentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis 
                    dataKey="name" 
                    stroke={darkMode ? "#9ca3af" : "#6b7280"} 
                  />
                  <YAxis 
                    stroke={darkMode ? "#9ca3af" : "#6b7280"} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      borderColor: darkMode ? '#374151' : '#e5e7eb',
                      color: darkMode ? '#f3f4f6' : '#1f2937'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    name="Enrollments" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Revenue Chart */}
          <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis 
                    dataKey="name" 
                    stroke={darkMode ? "#9ca3af" : "#6b7280"} 
                  />
                  <YAxis 
                    stroke={darkMode ? "#9ca3af" : "#6b7280"} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      borderColor: darkMode ? '#374151' : '#e5e7eb',
                      color: darkMode ? '#f3f4f6' : '#1f2937'
                    }} 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                  />
                  <Bar 
                    dataKey="amount" 
                    name="Revenue" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Latest Enrollments Table */}
        <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"} mb-6`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Latest Enrollments</h2>
            <button className={`text-sm px-4 py-2 rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}>
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>
                    Student
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>
                    Course
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>
                    Date
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"} uppercase tracking-wider`}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                {latestEnrollments.map((enrollment) => (
                  <tr key={enrollment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {enrollment.student}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {enrollment.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {enrollment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          enrollment.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {enrollment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Course Performance */}
        <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-lg font-semibold mb-4">Top Performing Courses</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={coursePerformanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#374151" : "#e5e7eb"} />
                <XAxis 
                  type="number" 
                  stroke={darkMode ? "#9ca3af" : "#6b7280"} 
                />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke={darkMode ? "#9ca3af" : "#6b7280"} 
                  width={100}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                    color: darkMode ? '#f3f4f6' : '#1f2937'
                  }} 
                />
                <Legend />
                <Bar dataKey="students" name="Students" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="completionRate" name="Completion Rate %" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;