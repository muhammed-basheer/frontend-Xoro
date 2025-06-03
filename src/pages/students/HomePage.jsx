import React from "react";
import { useSelector } from "react-redux";
import HeroSection from "./hompage/HeroSection";
import FeaturedSection from "./hompage/FeaturedSection";
import CategoriesSection from "./hompage/CategorySection";
import Testimonials from "./hompage/Testimonials";
import CallToAction from "./hompage/CallToAction";
import Navbar from "../../components/students/common/Navbar";
import Footer from "../../components/students/common/Footer";
import StudentProgressCard from "./hompage/StudentProgressCard";

const HomePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);   

  return (
    <div>
    <Navbar />
    {currentUser ? <StudentProgressCard /> : null}
    <HeroSection />
    <FeaturedSection />
    <CategoriesSection />
    <Testimonials />
    <CallToAction />
    <Footer />
  </div>
  
  );
};

export default HomePage;
