import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';

// Import placeholder components for admin routes
// You can replace these with actual components as you build them
const CoursesPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Manage Courses</h1><p>Courses management page content will go here.</p></div>;
const AddCoursePage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Add New Course</h1><p>Add course form will go here.</p></div>;
const CategoriesPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Manage Categories</h1><p>Categories management page content will go here.</p></div>;
const AddCategoryPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Add New Category</h1><p>Add category form will go here.</p></div>;
const StudentsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">All Students</h1><p>Students management page content will go here.</p></div>;
const InstructorsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">All Instructors</h1><p>Instructors management page content will go here.</p></div>;
const EnrollmentsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Enrollments</h1><p>Enrollments page content will go here.</p></div>;
const PendingEnrollmentsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Pending Enrollment Requests</h1><p>Pending enrollment requests content will go here.</p></div>;
const QuizzesPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Manage Quizzes</h1><p>Quizzes management page content will go here.</p></div>;
const AddQuizPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Add New Quiz</h1><p>Add quiz form will go here.</p></div>;
const PaymentsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Transactions</h1><p>Payment transactions page content will go here.</p></div>;
const RefundsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Refund Requests</h1><p>Refund requests page content will go here.</p></div>;
const SalesReportPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Sales Report</h1><p>Sales report page content will go here.</p></div>;
const CoursePerformancePage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Course Performance</h1><p>Course performance reports will go here.</p></div>;
const ReviewsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Course Reviews</h1><p>Course reviews management page content will go here.</p></div>;
const SettingsPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Platform Settings</h1><p>Platform settings page content will go here.</p></div>;
const PasswordPage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Change Password</h1><p>Change password form will go here.</p></div>;
const ProfilePage = () => <div className="p-4"><h1 className="text-2xl font-bold mb-4">Admin Profile</h1><p>Admin profile page content will go here.</p></div>;

const AdminRoutes = ({ darkMode, setDarkMode }) => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
        {/* Default route redirects to dashboard */}
        <Route index element={<Dashboard darkMode={darkMode} />} />
        
        {/* Course Management */}
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/add" element={<AddCoursePage />} />
        
        {/* Category Management */}
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/add" element={<AddCategoryPage />} />
        
        {/* User Management */}
        <Route path="users/students" element={<StudentsPage />} />
        <Route path="users/instructors" element={<InstructorsPage />} />
        
        {/* Enrollment Management */}
        <Route path="enrollments" element={<EnrollmentsPage />} />
        <Route path="enrollments/pending" element={<PendingEnrollmentsPage />} />
        
        {/* Quiz Management */}
        <Route path="quizzes" element={<QuizzesPage />} />
        <Route path="quizzes/add" element={<AddQuizPage />} />
        
        {/* Payment Management */}
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="payments/refunds" element={<RefundsPage />} />
        
        {/* Reports */}
        <Route path="reports/sales" element={<SalesReportPage />} />
        <Route path="reports/courses" element={<CoursePerformancePage />} />
        
        {/* Reviews */}
        <Route path="reviews" element={<ReviewsPage />} />
        
        {/* Settings */}
        <Route path="settings" element={<SettingsPage />} />
        <Route path="settings/password" element={<PasswordPage />} />
        <Route path="profile" element={<ProfilePage />} />
        
        {/* Catch all route - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;