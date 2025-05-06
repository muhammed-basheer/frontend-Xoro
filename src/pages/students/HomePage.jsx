import React from "react";
import Navbar from "../students/Navbar";
import HeroSection from "../students/HeroSection";
import FeaturedSection from "../students/FeaturedSection";
import CategoriesSection from "../students/CategorySection";
import Testimonials from "../students/Testimonials";
import CallToAction from "../students/CallToAction";
import Footer from "../students/Footer";

const HomePage = ({ darkMode, setDarkMode }) => {
  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pt-16">
        <HeroSection />
        <FeaturedSection />
        <CategoriesSection/>
        <Testimonials/>
        <CallToAction/>
        <Footer/>
      </main>
    </div>
  );
};

export default HomePage;
