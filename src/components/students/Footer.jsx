import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white py-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Essential Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-400">About</a></li>
                        <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                        <li><a href="#" className="hover:text-gray-400">Help Center</a></li>
                        <li><a href="#" className="hover:text-gray-400">Terms & Privacy</a></li>
                    </ul>
                </div>
                
                {/* Social Media */}
                <div className="text-center">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-gray-900 hover:text-white text-2xl"><FaFacebook /></a>
                        <a href="#" className="text-gray-900 hover:text-white text-2xl"><FaTwitter /></a>
                        <a href="#" className="text-gray-900 hover:text-white text-2xl"><FaInstagram /></a>
                        <a href="#" className="text-gray-900 hover:text-white text-2xl"><FaLinkedin /></a>
                    </div>
                </div>
                
                {/* Newsletter Signup */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                    <p className="text-gray-900 mb-4">Subscribe to our newsletter for the latest updates.</p>
                    <div className="flex">
                        <input type="email" placeholder="Enter your email" className="p-2 rounded-l-md w-full text-black" />
                        <button className="bg-gray-900 px-4 py-2 rounded-r-md hover:bg-gray-900">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="mt-8 text-center text-gray-900 text-sm">
                &copy; {new Date().getFullYear()} Your E-Learning Platform. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
     