import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSun,
  FaMoon,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
  FaHome,
  FaBook,
  FaInfoCircle,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/images/logo.png";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = useCallback((userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return { isAuthenticated, user, login, logout };
};

const Navbar = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const navLinks = useMemo(
    () => [
      { name: "Home", to: "/", icon: FaHome },
      { name: "Courses", to: "/courses", icon: FaBook },
      { name: "About", to: "/about", icon: FaInfoCircle },
      { name: "Contact", to: "/contact", icon: FaEnvelope },
    ],
    []
  );

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
      }
    },
    [searchQuery, navigate]
  );

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  const toggleMobileMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const toggleProfileMenu = useCallback(() => {
    setProfileOpen((prev) => !prev);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 shadow-lg transition-all duration-300 ease-in-out">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4 transition-transform duration-700 ease-in-out transform hover:scale-105">
          <Link to="/">
            <img
              src={logo}
              alt="Platform Logo"
              className="h-10 w-auto filter dark:invert dark:brightness-0 dark:contrast-200"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <form onSubmit={handleSearch} className="relative">
            <div
              className={`flex items-center border-b-2 transition-all duration-300 ${
                searchFocused
                  ? "border-blue-500 dark:border-blue-400"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <FaSearch
                className={`mr-2 ${
                  searchFocused
                    ? "text-blue-500 dark:text-blue-400"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-48"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </div>
          </form>

          <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li
                  key={link.name}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <Link
                    to={link.to}
                    className="flex items-center text-md font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    <Icon className="mr-2" />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all hover:scale-110"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400 text-xl" />
            ) : (
              <FaMoon className="text-gray-600 text-xl" />
            )}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all hover:scale-110"
              >
                <FaUser className="text-gray-700 dark:text-gray-300" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {user?.name || "User"}
                    </p>
                  </div>
                  <ul className="text-gray-700 dark:text-gray-300">
                    <li
                      onClick={() => navigate("/profile")}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center"
                    >
                      <FaUser className="mr-2" /> Profile
                    </li>
                    <li
                      onClick={logout}
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer flex items-center text-red-500"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-white"
              >
                Signup
              </Link>
            </div>
          )}

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
          >
            {menuOpen ? (
              <FaTimes className="text-gray-700 dark:text-gray-300" />
            ) : (
              <FaBars className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white dark:bg-gray-800 space-y-4 shadow-lg animate-slide-in-right">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.to}
                className="block flex items-center text-md font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Icon className="mr-2" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
