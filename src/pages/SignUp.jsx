import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { useState, useEffect } from "react";

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // Trigger animations after component mount
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null); 

        try {
            console.log("Submitting form data:", formData);
            console.log("Form data type:", typeof formData)
            const response = await api.post("http://localhost:5000/api/auth/signup", formData);
            console.log("Successful response:", response);
            
            if (response.data) {
                // Store success indicator in session storage
                sessionStorage.setItem("signupSuccess", "true");
                navigate('/');
            }
        } catch (error) {
            console.error("Error details:", error);
            console.error("Response data:", error.response?.data);
            setError(error.response?.data?.message || "An error occurred during signup");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg flex overflow-hidden">
                
                {/* Left Section - Image */}
                <div 
                    className={`w-1/2 hidden md:flex items-center justify-center bg-blue-600 dark:bg-blue-700 transition-all duration-500 ease-out ${
                        isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                    }`}
                >
                    <img 
                        src="https://img.freepik.com/free-photo/successful-businessman-smiling-crossed-arms_74855-3378.jpg"
                        alt="Sign Up"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right Section - Sign Up Form */}
                <div 
                    className={`w-full md:w-1/2 p-10 flex flex-col justify-center transition-all duration-500 ease-out ${
                        isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                >
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        Create an Account
                    </h2>

                    {/* Display error message if any */}
                    {error && (
                        <div className="p-3 mb-4 text-red-500 bg-red-100 border border-red-400 rounded text-center animate-fade-in">
                            {error}
                        </div>
                    )}

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
                                required
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
                                required
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
                                required
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.03] active:scale-[0.97] ${
                                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isLoading ? "Processing..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Bottom Links */}
                    <p className="text-gray-600 dark:text-gray-300 text-center mt-4">
                        Already have an account? 
                        <Link to='/login' className="text-blue-600 dark:text-blue-400 hover:underline"> Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;