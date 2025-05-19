// components/ChartContainer.js
import React from 'react';

const ChartContainer = ({ title, children, darkMode }) => {
  return (
    <div className={`rounded-lg shadow p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-80">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;