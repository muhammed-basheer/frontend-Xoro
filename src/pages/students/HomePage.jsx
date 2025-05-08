import React from "react";
import HeroSection from "../students/HeroSection";
import FeaturedSection from "../students/FeaturedSection";
import CategoriesSection from "../students/CategorySection";
import Testimonials from "../students/Testimonials";
import CallToAction from "../students/CallToAction";

const HomePage = () => {
  return (
    <div>
        <HeroSection />
        <FeaturedSection />
        <CategoriesSection/>
        <Testimonials/>
        <CallToAction/>
    </div>
  );
};

export default HomePage;
