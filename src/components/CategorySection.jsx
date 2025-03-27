import { motion } from "framer-motion";

const categories = [
    { name: "Web Development", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Data Science", image: "https://etlhive.com/wp-content/uploads/2024/04/FUqHEVVUsAAbZB0-1024x580-1.jpg"},
    { name: "Marketing", image: "https://plus.unsplash.com/premium_photo-1684225764999-3597a8da10ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Graphic Design", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhcGhpYyUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D" },
    { name: "Cybersecurity", image: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGN5YmVyJTIwc2VjdXJpdHl8ZW58MHx8MHx8fDA%3D" },
    { name: "AI & Machine Learning", image: "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWl8ZW58MHx8MHx8fDA%3D" },
    { name: "Business Management", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBtYW5hZ2VtZW50fGVufDB8fDB8fHww" },
    { name: "Photography", image: "https://plus.unsplash.com/premium_photo-1674389991678-0836ca77c7f7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D" },
    { name: "Game Development", image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtZSUyMGRldmVsZXBtZW50fGVufDB8fDB8fHwwhttps://source.unsplash.com/200x200/?game" },
    { name: "Finance & Investing", image: "https://plus.unsplash.com/premium_photo-1675242132036-36da2715b88e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGZpbmFuY2V8ZW58MHx8MHx8fDA%3D" }
];

const CategoriesSection = () => {
    return (
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 max-w-6xl text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Explore Topics
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categories.map((category, index) => (
                        <motion.div 
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md cursor-pointer transition flex flex-col items-center"
                        >
                            <img 
                                src={category.image} 
                                alt={category.name} 
                                className="w-16 h-16 rounded-full mb-3 object-cover"
                            />
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                {category.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;
