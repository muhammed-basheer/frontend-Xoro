import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    FaSignOutAlt
} from "react-icons/fa";
import logo from "../assets/images/logo.png";

// Custom Hook for Dark Mode
const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return [darkMode, setDarkMode];
};

// Authentication Context (Placeholder - replace with actual auth context)
const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = useCallback((userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        // Add actual login logic (e.g., token storage)
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
        // Add actual logout logic (e.g., token removal)
    }, []);

    return { isAuthenticated, user, login, logout };
};

const Navbar = () => {
    // Hooks
    const [darkMode, setDarkMode] = useDarkMode();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    // State Management
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFocused, setSearchFocused] = useState(false);

    // Memoized Navigation Links
    const navLinks = useMemo(() => [
        { name: "Home", to: "/", icon: FaHome },
        { name: "Courses", to: "#/courses", icon: FaBook },
        { name: "About", to: "#/about", icon: FaInfoCircle },
        { name: "Contact", to: "#/contact", icon: FaEnvelope }
    ], []);

    // Search Handler
    const handleSearch = useCallback((e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
        }
    }, [searchQuery, navigate]);

    // Event Handlers with Memoization
    const toggleDarkMode = useCallback(() => {
        setDarkMode(prev => !prev);
    }, [setDarkMode]);

    const toggleMobileMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    const toggleProfileMenu = useCallback(() => {
        setProfileOpen(prev => !prev);
    }, []);

    // Animation Variants
    const menuVariants = {
        hidden: { x: '100%' },
        visible: { 
            x: 0,
            transition: { 
                type: "tween",
                duration: 0.6 
            }
        },
        exit: { 
            x: '100%',
            transition: { 
                type: "tween",
                duration: 0.6
            }
        }
    };

    // Render Component
    return (
        <nav 
            className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r 
            from-white via-white to-blue-50 
            dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 
            shadow-lg transition-all duration-300 ease-in-out"
        >
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                >
                    <Link to="/">
                        <img 
                            src={logo} 
                            alt="Platform Logo" 
                            className="h-10 w-auto filter dark:invert dark:brightness-0 dark:contrast-200" 
                        />
                    </Link>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="relative">
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..." 
                                className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-48"
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                            />
                        </div>
                    </form>

                    {/* Navigation Links */}
                    <ul className="flex space-x-6 text-gray-700 dark:text-gray-300">
                        {navLinks.map((link, index) => {
                            const Icon = link.icon;
                            return (
                                <motion.li 
                                    key={link.name}
                                    initial={{ opacity: 0, y: -15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        delay: index * 0.3, 
                                        duration: 0.8, 
                                        type: "spring", 
                                        stiffness: 80 
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Link 
                                        to={link.to} 
                                        className="flex items-center text-md font-medium 
                                        hover:text-blue-600 dark:hover:text-blue-400 
                                        transition-colors duration-300 relative"
                                    >
                                        <Icon className="mr-2" />
                                        {link.name}
                                    </Link>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <motion.button 
                        onClick={toggleDarkMode}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full 
                        bg-gray-100 dark:bg-gray-700 
                        hover:bg-gray-200 dark:hover:bg-gray-600 
                        transition-all"
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? (
                            <FaSun className="text-yellow-400 text-xl" />
                        ) : (
                            <FaMoon className="text-gray-600 text-xl" />
                        )}
                    </motion.button>

                    {/* Authentication Section */}
                    {isAuthenticated ? (
                        <div className="relative">
                            <motion.button 
                                onClick={toggleProfileMenu}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full 
                                bg-gray-100 dark:bg-gray-700 
                                hover:bg-gray-200 dark:hover:bg-gray-600 
                                transition-all"
                            >
                                <FaUser className="text-gray-700 dark:text-gray-300" />
                            </motion.button>

                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        exit={{ opacity: 0, y: -10 }} 
                                        className="absolute right-0 mt-2 w-48 
                                        bg-white dark:bg-gray-800 
                                        shadow-lg rounded-lg overflow-hidden"
                                    >
                                        <div className="px-4 py-3 border-b dark:border-gray-700">
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {user?.name || 'User'}
                                            </p>
                                        </div>
                                        <ul className="text-gray-700 dark:text-gray-300">
                                            <li 
                                                onClick={() => navigate('/profile')}
                                                className="px-4 py-3 
                                                hover:bg-gray-100 dark:hover:bg-gray-700 
                                                transition-colors cursor-pointer flex items-center"
                                            >
                                                <FaUser className="mr-2" /> Profile
                                            </li>
                                            <li 
                                                onClick={logout}
                                                className="px-4 py-3 
                                                hover:bg-gray-100 dark:hover:bg-gray-700 
                                                transition-colors cursor-pointer flex items-center text-red-500"
                                            >
                                                <FaSignOutAlt className="mr-2" /> Logout
                                            </li>
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <Link 
                                to="/login"
                                className="px-4 py-2 
                                bg-blue-600 text-white 
                                rounded-lg hover:bg-blue-700 
                                transition dark:bg-blue-700 dark:hover:bg-blue-600"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup"
                                className="px-4 py-2 
                                border border-blue-600 text-blue-600 
                                rounded-lg hover:bg-blue-600 hover:text-white 
                                transition dark:border-blue-400 dark:text-blue-400 
                                dark:hover:bg-blue-400 dark:hover:text-white"
                            >
                                Signup
                            </Link>
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button 
                        onClick={toggleMobileMenu} 
                        className="md:hidden p-2 rounded-md 
                        bg-gray-100 dark:bg-gray-700 
                        hover:bg-gray-200 dark:hover:bg-gray-600 
                        transition-all"
                        aria-label="Toggle Mobile Menu"
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
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="md:hidden fixed top-16 right-0 w-64 h-screen 
                        bg-white dark:bg-gray-900 
                        shadow-lg z-40 p-6"
                    >
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="flex items-center border-b-2 
                                border-gray-300 dark:border-gray-600">
                                <FaSearch className="mr-2 text-gray-400 dark:text-gray-500" />
                                <input 
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..." 
                                    className="bg-transparent w-full outline-none 
                                    text-gray-700 dark:text-gray-200"
                                />
                            </div>
                        </form>

                        {/* Mobile Navigation Links */}
                        <ul className="space-y-4">
                            {navLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <motion.li 
                                        key={link.name}
                                        onClick={toggleMobileMenu}
                                        className="text-gray-700 dark:text-gray-300 
                                        hover:text-blue-600 dark:hover:text-blue-400 
                                        transition-colors flex items-center"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            delay: index * 0.1, 
                                            type: "spring", 
                                            stiffness: 100 
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <Icon className="mr-3" />
                                        <Link to={link.to}>{link.name}</Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;