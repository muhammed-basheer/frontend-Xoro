import { Routes, Route } from "react-router-dom";
import StudentLayout from "../layout/StudentLayout";
import HomePage from "../pages/students/HomePage";
import SignUp from "../pages/students/SignUp";
import LogIn from "../pages/students/LogIn";

const StudentRoutes = ({ darkMode, setDarkMode }) => (
  <Routes>
    {/* Routes WITHOUT layout */}
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<LogIn />} />

    {/* Routes WITH layout */}
    <Route
      element={<StudentLayout darkMode={darkMode} setDarkMode={setDarkMode} />}
    >
      <Route path="/" element={<HomePage />} />
      {/* Add more layout-wrapped routes here */}
    </Route>
  </Routes>
);

export default StudentRoutes;
