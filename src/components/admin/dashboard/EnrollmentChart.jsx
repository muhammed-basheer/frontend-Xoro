// components/EnrollmentChart.js
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import ChartContainer from '../dashboard/ChartContainer';

const EnrollmentChart = ({ data, darkMode }) => {
  return (
    <ChartContainer title="Enrollment Trends" darkMode={darkMode}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
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
    </ChartContainer>
  );
};

export default EnrollmentChart;