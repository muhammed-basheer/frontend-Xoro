import React, { useState, useEffect } from "react";
import { FaPlay, FaRocket, FaLaptopCode } from "react-icons/fa";
import bannerImage from "../../../assets/images/bannerImage.jpg"; // Adjust the path as necessary
import CountUp from "react-countup";

const HeroSection = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [rotationClass, setRotationClass] = useState("rotate-0");

  // Handle animations after component mount
  useEffect(() => {
    // Trigger main animations
    const animationTimer = setTimeout(() => {
      setIsAnimated(true);
    }, 100);

    // Set up rotation animation
    let rotationDegree = 0;
    const rotationInterval = setInterval(() => {
      rotationDegree = (rotationDegree + 1) % 360;
      setRotationClass(`rotate-[${rotationDegree}deg]`);
    }, 200);

    return () => {
      clearTimeout(animationTimer);
      clearInterval(rotationInterval);
    };
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 py-20 px-4 overflow-hidden">
      {/* Floating Background Elements */}
      <div
        className={`absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none transition-transform duration-[40000ms] ease-linear ${rotationClass}`}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 dark:bg-purple-800 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content Section */}
          <div className="space-y-6 text-center md:text-left">
            <h1
              className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight transition duration-700 ease-out ${
                isAnimated
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Learn <span className="text-blue-600">Anytime</span>, Anywhere
              with <span className="text-blue-600">Xoro</span>
            </h1>

            <p
              className={`text-gray-600 dark:text-gray-300 text-lg transition duration-700 ease-out ${
                isAnimated
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Unlock your potential with expert-led online courses. Flexible
              learning paths designed to accelerate your career and personal
              growth.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start transition duration-700 ease-out ${
                isAnimated
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95">
                <FaRocket /> Explore Courses
              </button>

              <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95">
                <FaPlay /> Watch Demo
              </button>
            </div>

            {/* Quick Stats */}
            <div
              className={`flex justify-center md:justify-start space-x-6 pt-6 transition duration-700 ease-out ${
                isAnimated
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600">
                  <CountUp start={0} end={250} duration={5} suffix="+" />
                </h3>

                <p className="text-gray-600 dark:text-gray-300">Courses</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-600">
                  <CountUp
                    start={0}
                    end={15000}
                    duration={2.75}
                    separator=","
                    suffix="+"
                  />
                </h3>

                <p className="text-gray-600 dark:text-gray-300">Students</p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative flex justify-center items-center">
            <div
              className={`absolute -inset-4 bg-blue-200 dark:bg-blue-900 rounded-full blur-3xl transition-all duration-2000 ${
                isAnimated ? "opacity-50 scale-100" : "opacity-0 scale-75"
              }`}
            />

            <img
              src={bannerImage}
              alt="E-Learning Platform"
              className={`relative z-10 w-full max-w-md rounded-3xl shadow-2xl transition duration-1000 hover:scale-105 ${
                isAnimated ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
