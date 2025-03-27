import { motion } from "framer-motion";
import { useRef } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const courses = [
    {
        id: 1,
        title: "Mastering React & Tailwind",
        instructor: "John Doe",
        rating: 4.8,
        price: "$49.99",
        image: "https://img.freepik.com/free-photo/close-up-portrait-grinning-old-fashioned-man-grandfather-with-clock_1157-39159.jpg?t=st=1743055490~exp=1743059090~hmac=55b1a38999bcbfbd0631925dce97d9ccb56b56834943bc2964f445c69cca6db4&w=740"
    },
    {
        id: 2,
        title: "Framer Motion for Beginners",
        instructor: "Jane Smith",
        rating: 4.7,
        price: "$39.99",
        image: "https://img.freepik.com/premium-photo/education-teachers-university-schools-concept-young-smiling-woman-employer-student-glasses_1258-60817.jpg?w=1380"
    },
    {
        id: 3,
        title: "Advanced JavaScript & ES6",
        instructor: "Michael Lee",
        rating: 4.9,
        price: "$59.99",
        image: "https://img.freepik.com/free-photo/portrait-young-woman-student-with-notebooks-earphones-her-neck-posing-college_1258-217694.jpg?t=st=1743055361~exp=1743058961~hmac=8dac0096411e0ba795706258af2db4f0a6d1dec776e5e31540f7f4302a2339cd&w=1380"
    },
    {
        id: 4,
        title: "CSS Grid & Flexbox Mastery",
        instructor: "Emily Clark",
        rating: 4.6,
        price: "$34.99",
        image: "https://img.freepik.com/free-photo/portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-black-classic-suit_158538-6961.jpg?t=st=1743055526~exp=1743059126~hmac=94962af57312e7412b957c85270d2d12d5b99450e74a24590b2a3e172afa1108&w=1060"
    }
];

const FeaturedCourses = () => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
    };

    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-900 flex justify-center">
            <div className="container mx-auto px-6 max-w-6xl overflow-hidden">
                {/* Section Title */}
                <motion.h2 
                    className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Featured Courses
                </motion.h2>

                <div className="relative">
                    {/* Left Button */}
                    <motion.button 
                        onClick={scrollLeft} 
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaChevronLeft className="text-gray-800 dark:text-white" />
                    </motion.button>

                    {/* Carousel Scroll Container */}
                    <motion.div 
                        className="relative flex space-x-6 overflow-x-auto scrollbar-hide w-full no-scrollbar snap-x snap-mandatory"
                        ref={carouselRef}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {courses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg overflow-hidden min-w-[300px] snap-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.5, duration: 0.6, ease: "easeOut" }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <motion.img 
                                    src={course.image} 
                                    alt={course.title} 
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                    whileHover={{ scale: 1.05 }}
                                />
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {course.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">By {course.instructor}</p>
                                
                                <div className="flex items-center mt-2">
                                    <FaStar className="text-yellow-400 mr-1" />
                                    <span className="text-gray-800 dark:text-white">{course.rating}</span>
                                </div>
                                
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {course.price}
                                    </span>
                                    <motion.button 
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        Enroll Now
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right Button */}
                    <motion.button 
                        onClick={scrollRight} 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md z-10"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaChevronRight className="text-gray-800 dark:text-white" />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;
