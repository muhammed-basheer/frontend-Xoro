import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Book, 
  Users, 
  Settings, 
  User, 
  LogOut, 
  ChevronRight,
  BarChart2,
  Calendar,
  Award,
  MessageSquare
} from "lucide-react";

const Sidebar = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    courses: false,
    users: false,
    analytics: false
  });

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    // Close all expanded menus when collapsing
    if (!isCollapsed) {
      setExpandedMenus({
        courses: false,
        users: false,
        analytics: false
      });
    }
  };

  const toggleMenu = (menu) => {
    setExpandedMenus({
      ...expandedMenus,
      [menu]: !expandedMenus[menu]
    });
  };

  return (
    <div 
      className={`bg-indigo-950 text-white flex flex-col h-full transition-all duration-300 
        ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-indigo-900">
        {!isCollapsed && <span className="text-xl font-bold">EduLearn</span>}
        <button 
          onClick={toggleSidebar} 
          className={`bg-indigo-800 rounded-full p-1 ${isCollapsed ? 'mx-auto' : ''}`}
        >
          <ChevronRight 
            className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-indigo-900">
        {!isCollapsed && (
          <p className="text-sm text-indigo-300">
            Welcome, {currentUser?.user?.name || "Admin"}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-2">
          {/* Dashboard */}
          <button 
            onClick={() => navigate("/admin/dashboard")}
            className="w-full flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
          >
            <Home className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
          </button>

          {/* Courses Menu */}
          <div>
            <button 
              onClick={() => toggleMenu('courses')}
              className="w-full flex items-center justify-between px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
            >
              <div className="flex items-center">
                <Book className="h-6 w-6" />
                {!isCollapsed && <span className="ml-3">Courses</span>}
              </div>
              {!isCollapsed && (
                <ChevronRight className={`h-4 w-4 transition-transform ${expandedMenus.courses ? 'rotate-90' : ''}`} />
              )}
            </button>

            {/* Submenu for Courses */}
            {!isCollapsed && expandedMenus.courses && (
              <div className="bg-indigo-900 pl-12 py-1">
                <button 
                  onClick={() => navigate("/admin/courses")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  All Courses
                </button>
                <button 
                  onClick={() => navigate("/admin/courses/create")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  Create Course
                </button>
                <button 
                  onClick={() => navigate("/admin/courses/categories")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  Categories
                </button>
              </div>
            )}
          </div>

          {/* Users Menu */}
          <div>
            <button 
              onClick={() => toggleMenu('users')}
              className="w-full flex items-center justify-between px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
            >
              <div className="flex items-center">
                <Users className="h-6 w-6" />
                {!isCollapsed && <span className="ml-3">Users</span>}
              </div>
              {!isCollapsed && (
                <ChevronRight className={`h-4 w-4 transition-transform ${expandedMenus.users ? 'rotate-90' : ''}`} />
              )}
            </button>

            {/* Submenu for Users */}
            {!isCollapsed && expandedMenus.users && (
              <div className="bg-indigo-900 pl-12 py-1">
                <button 
                  onClick={() => navigate("/admin/users")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  Students
                </button>
                <button 
                  onClick={() => navigate("/admin/users/instructors")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  Instructors
                </button>
                <button 
                  onClick={() => navigate("/admin/users/admins")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  Admins
                </button>
              </div>
            )}
          </div>

          {/* Analytics Menu */}
          <div>
            <button 
              onClick={() => toggleMenu('analytics')}
              className="w-full flex items-center justify-between px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
            >
              <div className="flex items-center">
                <BarChart2 className="h-6 w-6" />
                {!isCollapsed && <span className="ml-3">Analytics</span>}
              </div>
              {!isCollapsed && (
                <ChevronRight className={`h-4 w-4 transition-transform ${expandedMenus.analytics ? 'rotate-90' : ''}`} />
              )}
            </button>

            {/* Submenu for Analytics */}
            {!isCollapsed && expandedMenus.analytics && (
              <div className="bg-indigo-900 pl-12 py-1">
                <button 
                  onClick={() => navigate("/admin/analytics/overview")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  Overview
                </button>
                <button 
                  onClick={() => navigate("/admin/analytics/revenue")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  Revenue
                </button>
                <button 
                  onClick={() => navigate("/admin/analytics/users")}
                  className="block w-full text-left py-2 px-4 text-indigo-200 hover:text-white transition-colors"
                >
                  User Stats
                </button>
              </div>
            )}
          </div>

          {/* Other Menu Items */}
          <button 
            onClick={() => navigate("/admin/schedule")}
            className="w-full flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
          >
            <Calendar className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Schedule</span>}
          </button>

          <button 
            onClick={() => navigate("/admin/discussions")}
            className="w-full flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
          >
            <MessageSquare className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Discussions</span>}
          </button>

          <button 
            onClick={() => navigate("/admin/certificates")}
            className="w-full flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
          >
            <Award className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Certificates</span>}
          </button>

          <button 
            onClick={() => navigate("/admin/settings")}
            className="w-full flex items-center px-4 py-3 text-indigo-100 hover:bg-indigo-900 transition-colors"
          >
            <Settings className="h-6 w-6" />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </button>
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-indigo-900">
        <button 
          onClick={() => navigate("/admin/profile")}
          className="flex items-center text-indigo-100 hover:text-white transition-colors w-full"
        >
          <div className="bg-indigo-700 rounded-full p-1">
            <User className="h-5 w-5" />
          </div>
          {!isCollapsed && <span className="ml-3">Profile</span>}
        </button>
        <button 
          onClick={() => navigate("/admin/logout")}
          className="flex items-center mt-3 text-indigo-100 hover:text-white transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;