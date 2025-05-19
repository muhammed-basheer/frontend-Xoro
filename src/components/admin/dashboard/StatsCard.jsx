// components/StatsCards.js
import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaBook, FaMoneyBillWave } from 'react-icons/fa';
import StatCard from '../dashboard/StatCard';

const StatsCards = ({ data, darkMode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard 
        title="Total Students"
        value={data.students.count}
        icon={<FaUsers size={24} />}
        change={data.students.change}
        iconBgColor="blue"
        darkMode={darkMode}
      />
      
      <StatCard 
        title="Total Instructors"
        value={data.instructors.count}
        icon={<FaChalkboardTeacher size={24} />}
        change={data.instructors.change}
        iconBgColor="purple"
        darkMode={darkMode}
      />
      
      <StatCard 
        title="Active Courses"
        value={data.courses.count}
        icon={<FaBook size={24} />}
        change={data.courses.change}
        iconBgColor="yellow"
        darkMode={darkMode}
      />
      
      <StatCard 
        title="Total Revenue"
        value={`$${data.revenue.amount.toLocaleString()}`}
        icon={<FaMoneyBillWave size={24} />}
        change={data.revenue.change}
        iconBgColor="green"
        darkMode={darkMode}
      />
    </div>
  );
};

export default StatsCards;