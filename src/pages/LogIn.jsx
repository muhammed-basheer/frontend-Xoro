import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg flex overflow-hidden">
        
        {/* Left Section - Image */}
        <div
          className="w-1/2 hidden md:flex items-center justify-center bg-blue-600 dark:bg-blue-700 opacity-0 translate-x-10 animate-fade-in-left"
        >
          <img 
            src="https://img.freepik.com/free-photo/young-smiling-man-working-laptop-office_231208-4122.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Login Form */}
        <div
          className="w-full md:w-1/2 p-10 flex flex-col justify-center opacity-0 translate-x-10 animate-fade-in-right"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Welcome Back
          </h2>

          {/* Form */}
          <form className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Forgot password?</a>
            </div>

            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 active:scale-95"
            >
              Log In
            </button>
          </form>

          {/* Bottom Links */}
          <p className="text-gray-600 dark:text-gray-300 text-center mt-4">
            Don't have an account? 
            <Link to='/signup' className="text-blue-600 dark:text-blue-400 hover:underline"> Sign Up</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default LogIn;
