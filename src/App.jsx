import React, { useState, useEffect } from 'react';
import HomePage from "./pages/HomePage";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
    }`}>
      <HomePage darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
