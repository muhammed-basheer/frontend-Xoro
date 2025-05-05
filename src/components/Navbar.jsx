import React, { useState, useCallback, useMemo } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice.js"; // Import the logout action
import logo from "../assets/images/logo.png";
import api from "../api/api.js";

const Navbar = () => {
  const dispatch = useDispatch(); // For dispatching logout action
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const currentUser = useSelector((state) => state.user.currentUser); // Get currentUser from Redux store
  console.log("Current User:", currentUser); // Log the current user
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

  const handleLogout = async () => {
    try {
      const res = await api.post("http://localhost:5000/api/auth/logout");
      console.log("cleared", res.data); // Log the response from the server
    } catch (err) {
      console.error("Logout error", err);
    }

    dispatch(logout()); // clear Redux state
    navigate("/login"); // redirect to login
  };

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

          {currentUser ? (
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-500 hover:ring-blue-400 transition-all"
                title="Open profile menu"
              >
                {/* If you have an avatar URL: <img src={currentUser.avatarUrl} /> */}
                <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold uppercase">
                  {currentUser.user.name?.charAt(0) || "U"}
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 animate-fade-in">
                  <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {currentUser.user.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {currentUser.user.email || "user@example.com"}
                    </p>
                  </div>

                  <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                    <li
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="flex items-center gap-2 px-5 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                    >
                      <FaUser className="text-blue-500" /> Profile
                    </li>

                    <li
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-5 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 cursor-pointer transition-colors"
                    >
                      <FaSignOutAlt /> Logout
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
  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
  className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 relative w-10 h-10 overflow-hidden"
>
  {/* Hamburger icon */}
  <FaBars
    className={`absolute inset-0 m-auto transition-all duration-300 ease-in-out
      ${menuOpen ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'}
      text-gray-700 dark:text-gray-300`}
  />
  {/* Close (X) icon */}
  <FaTimes
    className={`absolute inset-0 m-auto transition-all duration-300 ease-in-out
      ${menuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'}
      text-gray-700 dark:text-gray-300`}
  />
</button>

        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-white dark:bg-gray-800 space-y-4 shadow-lg animate-slide-in-right">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.to}
                className={`block flex items-center text-md font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 animate-item-delay`}
                style={{ animationDelay: `${index * 0.1}s` }} // Stagger the delay for each item
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
