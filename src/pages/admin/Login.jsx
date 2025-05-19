// AdminLogin.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, resetState } from "../../redux/user/userSlice.js";

const AdminLogin = () => {  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  // Reset state when component mounts
  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);


  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      // Direct axios call for admin login
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
        {
          email: formData.email,
          password: formData.password
        },
        { withCredentials: true }
      );
      console.log("Admin login response:", response.data); // Log the response for debugging
      
      if (response.data) {
        dispatch(loginSuccess(response.data));
        // Store admin data in Redux and token in sessionStorage
        sessionStorage.setItem("adminToken", response.data.token);
        
        // If "Remember Me" is checked, also store in localStorage
        if (formData.rememberMe) {
          localStorage.setItem("adminToken", response.data.token);
        }
        
        // Navigate to admin dashboard
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      
      // Handle specific error responses
      if (err.response?.status === 401) {
        const errorMsg = err.response?.data?.message || "Invalid admin credentials. Please try again.";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-white p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <FaUserShield size={28} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your credentials to access the admin dashboard
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserShield className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md pl-10 py-2 border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md pl-10 pr-10 py-2 border-gray-300 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              } transition-colors duration-300`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        {/* Social login options */}
        <div className="mt-6">
          <div className="relative text-gray-500">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.0003 2C6.47751 2 2.00031 6.477 2.00031 12C2.00031 16.991 5.65771 21.128 10.4383 21.879V14.89H7.89831V12.001H10.4383V9.798C10.4383 7.29 11.9323 5.907 14.2173 5.907C15.3103 5.907 16.4543 6.102 16.4543 6.102V8.561H15.1913C13.9503 8.561 13.5623 9.333 13.5623 10.124V12H16.3363L15.8933 14.89H13.5623V21.879C18.3423 21.129 22.0003 16.99 22.0003 12C22.0003 6.477 17.5223 2 12.0003 2Z" />
              </svg>
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors duration-300"
            >
              <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;