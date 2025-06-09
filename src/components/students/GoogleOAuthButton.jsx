// components/auth/GoogleOAuthButton.jsx
import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const GoogleOAuthButton = ({ 
  text = "Continue with Google",
  variant = "primary", // primary, secondary, outline
  disabled = false,
  loading = false,
  onError = null
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = () => {
    if (disabled || loading || isLoading) return;
    
    try {
      setIsLoading(true);
      // Redirect to backend Google OAuth endpoint
      window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/google`;
    } catch (error) {
      console.error('Google OAuth Error:', error);
      setIsLoading(false);
      if (onError) onError(error);
    }
  };

  const getButtonStyles = () => {
    const baseStyles = "w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
    
    switch (variant) {
      case 'outline':
        return `${baseStyles} border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800`;
      case 'secondary':
        return `${baseStyles} bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600`;
      default:
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl`;
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={disabled || loading || isLoading}
      className={getButtonStyles()}
      type="button"
    >
      {(loading || isLoading) ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
          Processing...
        </>
      ) : (
        <>
          <FaGoogle className="mr-3 h-5 w-5" />
          {text}
        </>
      )}
    </button>
  );
};

export default GoogleOAuthButton;