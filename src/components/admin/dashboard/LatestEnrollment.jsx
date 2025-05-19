// components/LatestEnrollments.js
import React from 'react';

const LatestEnrollments = ({ enrollments, darkMode }) => {
  return (
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
            {enrollments.map((enrollment) => (
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
                  <StatusBadge status={enrollment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };
  
  return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyles()}`}>
      {status}
    </span>
  );
};

export default LatestEnrollments;