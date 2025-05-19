// components/StatCard.js
import React from 'react';

const StatCard = ({ title, value, icon, change, iconBgColor, darkMode }) => {
  return (
    <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${darkMode ? `bg-${iconBgColor}-900` : `bg-${iconBgColor}-100`} text-${iconBgColor}-500`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-green-500">↑ {change}% from last month</p>
      </div>
    </div>
  );
};

export default StatCard;