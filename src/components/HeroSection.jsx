import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaRocket, FaLaptopCode } from "react-icons/fa";
import bannerImage from "../assets/images/bannerImage.jpg";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 py-20 px-4 overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 40, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 dark:bg-purple-800 rounded-full blur-2xl"></div>
      </motion.div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content Section */}
          <motion.div 
            className="space-y-6 text-center md:text-left"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"
              variants={itemVariants}
            >
              Learn <span className="text-blue-600">Anytime</span>, 
              Anywhere with <span className="text-blue-600">Xoro</span>
            </motion.h1>

            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-lg"
              variants={itemVariants}
            >
              Unlock your potential with expert-led online courses. 
              Flexible learning paths designed to accelerate your career 
              and personal growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
              >
                <FaRocket /> Explore Courses
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                <FaPlay /> Watch Demo
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div 
              className="flex justify-center md:justify-start space-x-6 pt-6"
              variants={itemVariants}
            >
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600">250+</h3>
                <p className="text-gray-600 dark:text-gray-300">Courses</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600">15K+</h3>
                <p className="text-gray-600 dark:text-gray-300">Students</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div 
            className="relative flex justify-center items-center"
            variants={containerVariants}
          >
            <motion.div 
              className="absolute -inset-4 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl opacity-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
            
            <motion.img 
              src={bannerImage}
              alt="E-Learning Platform"
              className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 100 
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, 0]
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;