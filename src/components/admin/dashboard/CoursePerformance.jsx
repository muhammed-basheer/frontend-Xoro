// components/CoursePerformance.js
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import ChartContainer from '../dashboard/ChartContainer';

const CoursePerformance = ({ data, darkMode }) => {
  return (
    <ChartContainer title="Top Performing Courses" darkMode={darkMode}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
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
    </ChartContainer>
  );
};

export default CoursePerformance;