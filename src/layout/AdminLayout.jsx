import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  FaChalkboardTeacher, 
  FaUsers, 
  FaBook, 
  FaChartLine, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaLayerGroup,
  FaFileAlt,
  FaMoneyBillWave,
  FaStar,
  FaQuestionCircle
} from 'react-icons/fa';

const AdminLayout = ({ darkMode, setDarkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Menu structure with submenu support
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FaChartLine className="mr-3 text-lg" />,
      path: '/admin',
      submenus: []
    },
    {
      name: 'Courses',
      icon: <FaBook className="mr-3 text-lg" />,
      submenus: [
        { name: 'Add Course', path: '/admin/courses/add' },
        { name: 'Manage Courses', path: '/admin/courses' }
      ]
    },
    {
      name: 'Categories',
      icon: <FaLayerGroup className="mr-3 text-lg" />,
      submenus: [
        { name: 'Add Category', path: '/admin/categories/add' },
        { name: 'Manage Categories', path: '/admin/categories' }
      ]
    },
    {
      name: 'Users',
      icon: <FaUsers className="mr-3 text-lg" />,
      submenus: [
        { name: 'All Students', path: '/admin/users/students' },
        { name: 'All Instructors', path: '/admin/users/instructors' }
      ]
    },
    {
      name: 'Enrollments',
      icon: <FaChalkboardTeacher className="mr-3 text-lg" />,
      submenus: [
        { name: 'View Enrollments', path: '/admin/enrollments' },
        { name: 'Pending Requests', path: '/admin/enrollments/pending' }
      ]
    },
    {
      name: 'Quizzes',
      icon: <FaQuestionCircle className="mr-3 text-lg" />,
      submenus: [
        { name: 'Add Quiz', path: '/admin/quizzes/add' },
        { name: 'Manage Quizzes', path: '/admin/quizzes' }
      ]
    },
    {
      name: 'Payments',
      icon: <FaMoneyBillWave className="mr-3 text-lg" />,
      submenus: [
        { name: 'Transactions', path: '/admin/payments' },
        { name: 'Refund Requests', path: '/admin/payments/refunds' }
      ]
    },
    {
      name: 'Reports',
      icon: <FaFileAlt className="mr-3 text-lg" />,
      submenus: [
        { name: 'Sales Report', path: '/admin/reports/sales' },
        { name: 'Course Performance', path: '/admin/reports/courses' }
      ]
    },
    {
      name: 'Reviews',
      icon: <FaStar className="mr-3 text-lg" />,
      path: '/admin/reviews',
      submenus: []
    },
    {
      name: 'Settings',
      icon: <FaCog className="mr-3 text-lg" />,
      submenus: [
        { name: 'Platform Settings', path: '/admin/settings' },
        { name: 'Change Password', path: '/admin/settings/password' }
      ]
    }
  ];

  // Check if a path is active (exact)
  const isPathActive = (path) => {
    return location.pathname === path;
  };

  // Check if a path or any of its submenus are active
  const isMenuActive = (item) => {
    if (item.path && isPathActive(item.path)) return true;
    
    return item.submenus.some(submenu => 
      location.pathname === submenu.path || 
      location.pathname.startsWith(submenu.path + '/')
    );
  };

  // Toggle submenu visibility
  const toggleSubmenu = (index) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 transition-all duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${darkMode ? "bg-gray-800" : "bg-gray-100"} border-r ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Link to="/admin" className="flex items-center">
            <span className="text-xl font-bold">XORO Learning</span>
          </Link>
          <button 
            className="md:hidden p-2 rounded hover:bg-gray-700" 
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-5 px-2 overflow-y-auto h-[calc(100vh-4rem)]">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={item.name}>
                {item.submenus.length === 0 ? (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isPathActive(item.path)
                        ? `${darkMode ? "bg-blue-600" : "bg-blue-500"} text-white`
                        : `${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleSubmenu(index)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        isMenuActive(item)
                          ? `${darkMode ? "bg-gray-700" : "bg-gray-200"}`
                          : `${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`
                      }`}
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          activeSubmenu === index ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeSubmenu === index && (
                      <ul className="mt-1 ml-6 space-y-1">
                        {item.submenus.map((submenu) => (
                          <li key={submenu.name}>
                            <Link
                              to={submenu.path}
                              className={`block px-4 py-2 rounded-lg transition-colors ${
                                isPathActive(submenu.path)
                                  ? `${darkMode ? "bg-blue-600" : "bg-blue-500"} text-white`
                                  : `${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`
                              }`}
                            >
                              {submenu.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
            <li className="mt-6">
              <button
                onClick={handleLogout}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <FaSignOutAlt className="mr-3 text-lg" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className={`fixed top-0 right-0 z-20 ${sidebarOpen ? "md:left-64" : "left-0"} h-16 border-b ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} transition-all duration-300`}>
          <div className="flex items-center justify-between h-full px-4">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" 
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>

            {/* Right Header Content */}
            <div className="flex items-center ml-auto space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative">
                <FaBell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <FaUser className="w-4 h-4" />
                  </div>
                </button>
                {profileMenuOpen && (
                  <div 
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } border ${darkMode ? "border-gray-700" : "border-gray-200"}`}
                  >
                    <Link
                      to="/admin/profile"
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/admin/settings"
                      className={`block px-4 py-2 text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileMenuOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-16 min-h-screen">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;