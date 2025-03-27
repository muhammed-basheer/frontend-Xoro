import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CallToAction = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 }); // Triggers when 30% of the section is visible

    return (
        <section 
            ref={sectionRef} 
            className="py-16 bg-blue-600 dark:bg-gray-900 text-white flex justify-center"
        >
            <div className="w-full max-w-6xl px-6 flex justify-center">
                <motion.div 
                    className="w-full flex flex-col md:flex-row items-center gap-10 bg-blue-600 dark:bg-blue-700 rounded-lg shadow-lg p-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Tutor Image */}
                    <motion.div 
                        className="w-full md:w-1/2 flex justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <img
                            src="https://img.freepik.com/free-photo/young-happy-smiling-businesswoman-holding-laptop-isolated_231208-241.jpg" 
                            alt="Tutor"
                            className="w-full max-w-sm rounded-lg shadow-lg"
                        />
                    </motion.div>

                    {/* Text Content */}
                    <motion.div 
                        className="w-full md:w-1/2 text-center md:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Share Your Knowledge, Inspire Others
                        </h2>
                        <p className="text-lg mb-6">
                            Join our platform and start teaching today! Empower students worldwide with your expertise.
                        </p>
                        <motion.button
                            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Start Teaching Today
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CallToAction;
