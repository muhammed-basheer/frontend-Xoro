import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../api/api"; // adjust path if needed

const Login = () => {
  const navigate = useNavigate();

  // State
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // Handle animations on load
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("http://localhost:5000/api/auth/signin", formData);
      console.log("Response:", response.data)
      
      if (response.data) {
        sessionStorage.setItem("token", response.data.token); // or localStorage
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg flex overflow-hidden">

        {/* Left side - Image */}
        <div className={`hidden md:flex w-1/2 items-center justify-center bg-blue-600 dark:bg-blue-700 transition-all duration-500 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        <img
            src="https://img.freepik.com/free-photo/young-smiling-man-working-laptop-office_231208-4122.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Form */}
        <div className={`w-full md:w-1/2 p-10 flex flex-col justify-center transition-all duration-500 ease-out ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6">
            Welcome Back
          </h2>

          {/* Error message */}
          {error && (
            <div className="p-3 mb-4 text-red-500 bg-red-100 border border-red-400 rounded text-center animate-fade-in">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email input */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Password input */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 text-white ${
                isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>

          </form>

          {/* Bottom text */}
          <p className="text-gray-600 dark:text-gray-300 text-center mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
