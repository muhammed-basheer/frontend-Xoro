import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../redux/user/userSlice.js";
import GoogleOAuthButton from '../../components/students/GoogleOAuthButton';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.user);

  // State
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isAnimated, setIsAnimated] = useState(false);
  const [localError, setLocalError] = useState("");

  // Update your Login.jsx component's useEffect for OAuth handling



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
    dispatch(loginStart());
    // Clear local error state
    setLocalError("");

    try {
      // Use direct axios call for login to avoid the interceptor
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin", 
        formData,
        { withCredentials: true }
      );
      
      if (response.data) {
        console.log("response.data.user.email", response.data.user.email);
        
        // Check if the user has the required role (student)
        if (response.data.user && response.data.user.role !== "student") {
          dispatch(loginFailure("Access denied: Only students can access this platform"));
          return;
        }
        console.log("Login successful:", response.data);
        
        // If role is correct, proceed with login
        dispatch(loginSuccess(response.data));  // store user data in Redux
        sessionStorage.setItem("token", response.data.token); // or localStorage
        
        // If there was a redirect from a protected page, redirect back there
        // Otherwise go to homepage
        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath); 
      }
    } catch (err) {
      console.error("Login error:", err);
      // Handle specific error responses
      if (err.response?.status === 401) {
        const errorMsg = err.response?.data?.message || "Invalid email or password. Please try again.";
        dispatch(loginFailure(errorMsg));
      } else if (err.response?.status === 400) {
        const errorMsg = err.response?.data?.message || "Please provide all required fields.";
        dispatch(loginFailure(errorMsg));
      } else {
        const errorMsg = err.response?.data?.message || "Login failed. Please try again.";
        dispatch(loginFailure(errorMsg));
      }
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

          {/* Combined error message (from Redux or redirect) */}
          {(error || localError) && (
            <div className="p-3 mb-4 text-red-500 bg-red-100 border border-red-400 rounded text-center animate-fade-in">
              {error || localError}
            </div>
          )}

          {/* Google OAuth Button */}
          <div className="mb-6">
            <GoogleOAuthButton 
              text="Continue with Google"
              variant="outline"
              onError={(error) => setLocalError('Google authentication failed')}
            />
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>
          </div>
          
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
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition transform hover:scale-105 active:scale-95 text-white ${
                loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
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