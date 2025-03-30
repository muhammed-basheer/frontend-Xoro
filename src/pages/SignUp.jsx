import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react";

const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name : "",
        email: "",
        password:""
    })

    const handleChange = (e)=>{
        setFormData(  { ...formData, [e.target.name] : e.target.value  } )
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            
            const response = await axios.post("http://localhost:5000/api/auth/signup",formData);
            console.log("response",response)
            navigate('/')
        } catch (error) {
            setError(error.response?.data?.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg flex overflow-hidden">
                
                {/* Left Section - Image */}
                <motion.div 
                    className="w-1/2 hidden md:flex items-center justify-center bg-blue-600 dark:bg-blue-700"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img 
                        src="https://img.freepik.com/free-photo/successful-businessman-smiling-crossed-arms_74855-3378.jpg"
                        alt="Sign Up"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Right Section - Sign Up Form */}
                <motion.div 
                    className="w-full md:w-1/2 p-10 flex flex-col justify-center"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Create an Account
                    </h2>

                    {/* Form */}
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-3 text-gray-400" />
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Full Name" 
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email Address" 
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-3 top-3 text-gray-400" />
                            <input 
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password" 
                                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <motion.button 
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Sign Up
                        </motion.button>
                    </form>

                    {/* Bottom Links */}
                    <p className="text-gray-600 dark:text-gray-300 text-center mt-4">
                        Already have an account? 
                        <Link to='/login' className="text-blue-600 dark:text-blue-400 hover:underline"> Log In</Link>
                    </p>
                </motion.div>

            </div>
        </div>
    );
};

export default SignUp;
