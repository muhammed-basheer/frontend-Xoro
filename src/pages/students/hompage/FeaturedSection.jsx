import { useRef, useEffect, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "Mastering React & Tailwind",
    instructor: "John Doe",
    rating: 4.8,
    price: "$49.99",
    image:
      "https://img.freepik.com/free-photo/close-up-portrait-grinning-old-fashioned-man-grandfather-with-clock_1157-39159.jpg",
  },
  {
    id: 2,
    title: "Framer Motion for Beginners",
    instructor: "Jane Smith",
    rating: 4.7,
    price: "$39.99",
    image:
      "https://img.freepik.com/premium-photo/education-teachers-university-schools-concept-young-smiling-woman-employer-student-glasses_1258-60817.jpg",
  },
  {
    id: 3,
    title: "Advanced JavaScript & ES6",
    instructor: "Michael Lee",
    rating: 4.9,
    price: "$59.99",
    image:
      "https://img.freepik.com/free-photo/portrait-young-woman-student-with-notebooks-earphones-her-neck-posing-college_1258-217694.jpg",
  },
  {
    id: 4,
    title: "CSS Grid & Flexbox Mastery",
    instructor: "Emily Clark",
    rating: 4.6,
    price: "$34.99",
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-black-classic-suit_158538-6961.jpg",
  },
];

const FeaturedCourses = () => {
  const carouselRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 flex justify-center">
      <div className="container mx-auto px-6 max-w-6xl overflow-hidden">
        {/* Section Title */}
        <h2
          className={`text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center transition-all duration-700 ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
          }`}
        >
          Featured Courses
        </h2>

        <div className="relative">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md z-10 hover:scale-110 active:scale-95 transition"
          >
            <FaChevronLeft className="text-gray-800 dark:text-white" />
          </button>

          {/* Carousel Container */}
          <div
            className="relative flex space-x-6 overflow-x-auto scrollbar-hide w-full no-scrollbar snap-x snap-mandatory transition-opacity duration-700 ease-out"
            ref={carouselRef}
          >
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg overflow-hidden min-w-[300px] snap-center transform transition-all duration-700 ease-out hover:scale-105 ${
                  loaded
                    ? `opacity-100 translate-y-0 delay-${index * 100}`
                    : "opacity-0 translate-y-5"
                }`}
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  By {course.instructor}
                </p>

                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-gray-800 dark:text-white">
                    {course.rating}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {course.price}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition transform hover:scale-110 active:scale-95">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-700 p-2 rounded-full shadow-md z-10 hover:scale-110 active:scale-95 transition"
          >
            <FaChevronRight className="text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
