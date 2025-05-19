import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  Home, 
  Book, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Award, 
  Settings, 
  Bell, 
  HelpCircle,
  X,
  LogOut
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, hasEnrollments, isMobile }) => {
  const { currentUser } = useSelector((state) => state.user);
  
  const menuItems = [
    {
      title: "Home",
      path: "/student",
      icon: <Home size={20} />,
      alwaysShow: true
    },
    {
      title: "My Courses",
      path: "/student/courses",
      icon: <Book size={20} />,
      alwaysShow: true
    },
    {
      title: "Dashboard",
      path: "/student/dashboard",
      icon: <BookOpen size={20} />,
      alwaysShow: false,
      showWhen: hasEnrollments
    },
    {
      title: "Schedule",
      path: "/student/schedule",
      icon: <Calendar size={20} />,
      alwaysShow: true
    },
    {
      title: "Messages",
      path: "/student/messages",
      icon: <MessageSquare size={20} />,
      alwaysShow: true
    },
    {
      title: "Certifications",
      path: "/student/certifications",
      icon: <Award size={20} />,
      alwaysShow: true
    },
    {
      title: "Notifications",
      path: "/student/notifications",
      icon: <Bell size={20} />,
      alwaysShow: true
    },
    {
      title: "Settings",
      path: "/student/settings",
      icon: <Settings size={20} />,
      alwaysShow: true
    },
    {
      title: "Help & Support",
      path: "/student/support",
      icon: <HelpCircle size={20} />,
      alwaysShow: true
    }
  ];

  // Filter menu items based on conditions
  const filteredMenuItems = menuItems.filter(item => 
    item.alwaysShow || (item.showWhen)
  );
  
  // Handle closing sidebar on item click for mobile
  const handleItemClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 transform bg-gray-800 border-r border-gray-700 flex flex-col
          w-64 pt-16 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:static lg:z-0`}
      >
        {/* Close button for mobile - positioned better */}
        {isMobile && (
          <button 
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-700 text-gray-400"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
        
        {/* User info */}
        <div className="px-4 py-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg">
              {currentUser?.name?.charAt(0) || "S"}
            </div>
            <div className="ml-3">
              <p className="font-medium text-white">
                {currentUser?.name || "Student"}
              </p>
              <p className="text-sm text-gray-400">
                {currentUser?.email || "student@example.com"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation menu - make it scrollable */}
        <nav className="px-2 py-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-700 text-white' 
                      : 'text-gray-200 hover:bg-gray-700'
                    }`
                  }
                  onClick={handleItemClick}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout button at the bottom with proper spacing */}
        <div className="px-2 py-3 border-t border-gray-700 mt-auto">
          <NavLink
            to="/student/logout"
            className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-200 hover:bg-gray-700"
            onClick={handleItemClick}
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;