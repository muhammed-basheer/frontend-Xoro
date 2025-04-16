import { useEffect, useRef, useState } from "react";

const CallToAction = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "-100px 0px", threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <section 
            ref={ref} 
            className="py-16 bg-blue-600 dark:bg-gray-900 text-white flex justify-center"
        >
            <div className="w-full max-w-6xl px-6 flex justify-center">
                <div 
                    className={`w-full flex flex-col md:flex-row items-center gap-10 bg-blue-600 dark:bg-blue-700 rounded-lg shadow-lg p-8 transform transition-all duration-800 ease-out ${
                        isVisible 
                            ? "opacity-100 translate-y-0" 
                            : "opacity-0 translate-y-12"
                    }`}
                >
                    <div 
                        className={`w-full md:w-1/2 flex justify-center transition-all duration-800 delay-200 ease-out ${
                            isVisible 
                                ? "opacity-100 translate-x-0" 
                                : "opacity-0 -translate-x-12"
                        }`}
                    >
                        <img
                            src="/api/placeholder/450/450" 
                            alt="Tutor"
                            className="w-full max-w-sm rounded-lg shadow-lg"
                        />
                    </div>

                    <div 
                        className={`w-full md:w-1/2 text-center md:text-left transition-all duration-800 delay-400 ease-out ${
                            isVisible 
                                ? "opacity-100 translate-x-0" 
                                : "opacity-0 -translate-x-12"
                        }`}
                    >
                        <h2 className="text-4xl font-bold mb-4">
                            Share Your Knowledge, Inspire Others
                        </h2>
                        <p className="text-lg mb-6">
                            Join our platform and start teaching today! Empower students worldwide with your expertise.
                        </p>
                        <button
                            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transform transition-transform duration-300 hover:scale-110 active:scale-90"
                        >
                            Start Teaching Today
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;