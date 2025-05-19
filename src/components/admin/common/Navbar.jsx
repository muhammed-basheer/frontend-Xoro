import { useNavigate } from "react-router-dom";
import { Menu, Bell, Search, Sun, Moon } from "lucide-react";

const Navbar = ({ 
  currentUser, 
  toggleMobileMenu, 
  isDarkMode, 
  toggleDarkMode, 
  title = "Admin Dashboard" 
}) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white dark:bg-gray-900 shadow z-10">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Left section with hamburger menu for mobile and title */}
        <div className="flex items-center">
          <button 
            className="md:hidden mr-4 text-gray-600 dark:text-gray-200"
            onClick={toggleMobileMenu}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
        </div>
        
        {/* Right section with search, notifications, theme toggle and user */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-200" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 border-2 border-white dark:border-gray-900"></span>
          </button>
          
          {/* Theme toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-200" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          
          {/* User profile */}
          <div className="flex items-center">
            <button 
              className="flex items-center"
              onClick={() => navigate("/admin/profile")}
            >
              <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white font-medium">
                {currentUser?.user?.name ? currentUser.user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <span className="ml-2 font-medium text-gray-700 dark:text-gray-200 hidden md:block">
                {currentUser?.user?.name || "Admin"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;