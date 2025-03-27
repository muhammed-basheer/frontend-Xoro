    import { useState, useEffect } from "react";
    import { motion, AnimatePresence } from "framer-motion";
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
    FaEnvelope 
    } from "react-icons/fa";
    import logo from "../assets/images/logo.png";

    const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
    setTimeout(() => setIsMounted(true), 100); // Adds a slight delay
}, []);

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );
    const [searchFocused, setSearchFocused] = useState(false);

    // Dark Mode Toggle Effect
    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "true");
        } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
        }
    }, [darkMode]);

    // Navigation Links with Icons
    const navLinks = [
        { name: "Home", href: "#home", icon: FaHome },
        { name: "Courses", href: "#courses", icon: FaBook },
        { name: "About", href: "#about", icon: FaInfoCircle },
        { name: "Contact", href: "#contact", icon: FaEnvelope }
    ];

    // Variants for Animations
    const menuVariants = {
        hidden: { x: '100%' },
        visible: { 
            x: 0,
            transition: { 
                type: "tween",
                duration: 0.6 // Increased duration
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
    

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r 
        from-white via-white to-blue-50 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 
        shadow-lg transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo with Elegant Animation */}
            {isMounted && (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
   <a href="#home">
                <img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-auto filter dark:invert dark:brightness-0 dark:contrast-200" 
                />
            </a>    </motion.div>
)}


         

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
    {navLinks.map((link, index) => {
        const Icon = link.icon;
        return (
            <motion.li 
                key={link.name}
                className="relative group flex items-center"
                initial={{ opacity: 0, y: -15 }}  // Start higher
                animate={{ opacity: 1, y: 0 }}   // Smooth slide down
                transition={{ delay: index * 0.3, duration: 0.8, type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.1 }}  // Slight zoom on hover
            >
                <a 
                    href={link.href} 
                    className="flex items-center text-md font-medium 
                    hover:text-blue-600 dark:hover:text-blue-400 
                    transition-colors duration-300 relative"
                >
                    <Icon className="mr-2" />
                    {link.name}
                    <motion.span 
                        className="absolute bottom-0 left-0 w-0 h-0.5 
                        bg-blue-600 dark:bg-blue-400 
                        transition-all duration-300 group-hover:w-full"
                        layoutId="underline"
                    />
                </a>
            </motion.li>
        );
    })}
</ul>


            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button 
                onClick={() => setDarkMode(!darkMode)}
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
            {isLoggedIn ? (
                <div className="relative">
                <motion.button 
                    onClick={() => setProfileOpen(!profileOpen)}
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
                        <ul className="text-gray-700 dark:text-gray-300">
                        {["Profile", "My Courses", "Logout"].map((item, index) => (
                            <li 
                            key={item}
                            onClick={item === "Logout" ? () => setIsLoggedIn(false) : undefined}
                            className="px-4 py-3 
                                hover:bg-gray-100 dark:hover:bg-gray-700 
                                transition-colors cursor-pointer"
                            >
                            {item}
                            </li>
                        ))}
                        </ul>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            ) : (
                <div className="flex space-x-4">
                <button 
                    className="px-4 py-2 
                    bg-blue-600 text-white 
                    rounded-lg hover:bg-blue-700 
                    transition dark:bg-blue-700 dark:hover:bg-blue-600"
                    onClick={() => alert("Navigate to Login Page")}
                >
                    Login
                </button>
                <button 
                    className="px-4 py-2 
                    border border-blue-600 text-blue-600 
                    rounded-lg hover:bg-blue-600 hover:text-white 
                    transition dark:border-blue-400 dark:text-blue-400 
                    dark:hover:bg-blue-400 dark:hover:text-white"
                    onClick={() => alert("Navigate to Signup Page")}
                >
                    Signup
                </button>
                </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
                onClick={() => setMenuOpen(!menuOpen)} 
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
                <div className="mb-6 relative">
                <div className="flex items-center border-b-2 
                    border-gray-300 dark:border-gray-600">
                    <FaSearch className="mr-2 text-gray-400 dark:text-gray-500" />
                    <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-transparent w-full outline-none 
                        text-gray-700 dark:text-gray-200"
                    />
                </div>
                </div>

                {/* Mobile Navigation Links */}
                <ul className="space-y-4">
    {navLinks.map((link, index) => {
        const Icon = link.icon;
        return (
            <motion.li 
                key={link.name}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 
                hover:text-blue-600 dark:hover:text-blue-400 
                transition-colors flex items-center"
                initial={{ opacity: 0, x: 20 }}  // Slide in from the right
                animate={{ opacity: 1, x: 0 }}   // Settle into place
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1 }}  // Slightly scale up on hover
            >
                <Icon className="mr-3" />
                <a href={link.href}>{link.name}</a>
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