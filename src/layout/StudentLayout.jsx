// src/layouts/StudentLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/students/Navbar";
import Footer from "../components/students/Footer";

const StudentLayout = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StudentLayout;
