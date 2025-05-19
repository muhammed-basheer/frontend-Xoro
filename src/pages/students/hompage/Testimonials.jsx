import { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Student",
    review: "This platform is amazing! The courses are well-structured and easy to follow.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "Instructor",
    review: "Great experience! The tutors are knowledgeable and very helpful.",
    rating: 4.5,
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Student",
    review: "I improved my coding skills drastically thanks to this platform.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    name: "James Brown",
    role: "Instructor",
    review: "User-friendly and informative. Highly recommend it!",
    rating: 4.8,
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 5,
    name: "Emma Davis",
    role: "Student",
    review: "Loved the hands-on projects! They helped me understand concepts better.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/5.jpg"
  },
];

const Testimonials = () => {
  // Create enough duplicates to ensure smooth infinite scrolling
  const [duplicateTestimonials, setDuplicateTestimonials] = useState([
    ...testimonials,
    ...testimonials,
    ...testimonials,  // Adding one more set for smoother looping
  ]);
  
  const scrollerRef = useRef(null);

  useEffect(() => {
    // Function to reset animation position when it completes
    const handleAnimationIteration = () => {
      if (scrollerRef.current) {
        // This helps prevent the visual "jump" at the end of the animation
        const firstSetWidth = testimonials.length * (300 + 24); // card width + gap
        scrollerRef.current.style.transform = 'translateX(0)';
      }
    };

    const scrollerElement = scrollerRef.current;
    if (scrollerElement) {
      scrollerElement.addEventListener('animationiteration', handleAnimationIteration);
    }

    return () => {
      if (scrollerElement) {
        scrollerElement.removeEventListener('animationiteration', handleAnimationIteration);
      }
    };
  }, []);

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-900 flex justify-center overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Student & Instructor Reviews
        </h2>

        <div className="relative w-full overflow-hidden">
          {/* Left gradient fade for smoother appearance */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-900 z-10"></div>
          
          {/* Right gradient fade for smoother appearance */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-100 to-transparent dark:from-gray-900 z-10"></div>
          
          <div
            ref={scrollerRef}
            className="flex space-x-6 animate-scroll-x"
            style={{
              willChange: "transform", // Performance optimization
              minWidth: "fit-content"
            }}
          >
            {duplicateTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg min-w-[300px] max-w-xs flex-shrink-0 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-gray-800 dark:text-white">
                  "{testimonial.review}"
                </p>
                <p className="mt-2 font-semibold text-gray-900 dark:text-gray-100">
                  - {testimonial.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
                <p className="text-yellow-400">⭐ {testimonial.rating}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;