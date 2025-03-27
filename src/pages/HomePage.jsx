import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import CategoriesSection from "../components/CategorySection";
import Testimonials from "../components/Testimonials";

const HomePage = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pt-16">
        <HeroSection />
        <FeaturedSection />
        <CategoriesSection/>
        <Testimonials/>
      </main>
    </div>
  );
};

export default HomePage;
