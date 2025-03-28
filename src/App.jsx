import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

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
    <div className={`min-h-screen transition-colors duration-300 ${  darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>

    <Router>
    <Routes>
   

      <Route path='/' element = {<HomePage darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element= {<LogIn/>} />
      
    </Routes>
    </Router>
      


    </div>
  );
}

export default App;
