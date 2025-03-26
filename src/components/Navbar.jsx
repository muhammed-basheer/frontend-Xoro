import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaUser, FaBars, FaTimes, FaSearch, FaGraduationCap } from "react-icons/fa";
import logo from "../assets/images/logo.png"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" 
  );
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Courses", href: "#courses" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white via-white to-blue-50 dark:from-gray-400 dark:via-gray-900 dark:to-blue-950 shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo with Elegant Animation */}
        <motion.div 
  className="flex items-center"
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ type: "spring", stiffness: 100 }}
>
  <a href="#home"> {/* This makes the logo clickable */}
  <img src={logo} alt="Logo" className="h-10 w-auto" />
  </a>
</motion.div>




        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Sophisticated Search Input */}
          <div className="relative">
            <div className={`flex items-center border-b-2 transition-all duration-300 ${
              searchFocused 
                ? 'border-blue-500 dark:border-blue-400' 
                : 'border-gray-300 dark:border-gray-600'
            }`}>
              <FaSearch className={`mr-2 ${
                searchFocused 
                  ? 'text-blue-500 dark:text-blue-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-48"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.name}
                className="relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  href={link.href} 
                  className="text-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle with Smooth Transition */}
          <motion.button 
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-xl" />
            ) : (
              <FaMoon className="text-gray-600 text-xl" />
            )}
          </motion.button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => setProfileOpen(!profileOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <FaUser className="text-gray-700 dark:text-gray-300" />
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }} 
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
                >
                  <ul className="text-gray-700 dark:text-gray-300">
                    {["Profile", "My Courses", "Logout"].map((item) => (
                      <li 
                        key={item}
                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
          >
            {menuOpen ? (
              <FaTimes className="text-gray-700 dark:text-gray-300" />
            ) : (
              <FaBars className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-out */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: "tween" }}
            className="md:hidden fixed top-16 right-0 w-64 h-screen bg-white dark:bg-gray-900 shadow-lg z-40 p-6"
          >
            {/* Mobile Search */}
            <div className="mb-6 relative">
              <div className="flex items-center border-b-2 border-gray-300 dark:border-gray-600">
                <FaSearch className="mr-2 text-gray-400 dark:text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent w-full outline-none text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li 
                  key={link.name}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;