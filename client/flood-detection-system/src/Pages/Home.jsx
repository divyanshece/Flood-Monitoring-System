import { useState } from "react";
import {
  FaWater,
  FaMapMarkerAlt,
  FaBell,
  FaExclamationTriangle,
  FaTools,
  FaBolt,
  FaRobot,
  FaRoute,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import fms from "../assets/fms1.png";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      {/* Navbar */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">FloodSense</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Features
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700">
              Contact
            </a>
          </nav>
          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white px-4 pb-4">
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-700"
            >
              Home
            </a>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-700"
            >
              About
            </a>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-700"
            >
              Features
            </a>
            <a
              href="#"
              className="block py-2 text-gray-700 hover:text-blue-700"
            >
              Contact
            </a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section className=" bg-gradient-to-r from-blue-500 to-blue-900 text-white py-6 flex flex-row justify-evenly items-center">
        <div className="max-w-3xl px-10  ">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Underpass Flood Monitoring System
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Advanced AI-powered system to monitor, predict, and alert about
            flooding in urban underpasses in real-time.
          </p>
          <Link
            to={"/adminlogin"}
            className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
          >
            View Dashboard
          </Link>
        </div>
        <div className="mr-20 ">
          <img className="rounded-lg max-h-100 max-w-100" src={fms} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaWater />,
                title: "Live Underpass Status",
                desc: "Real-time monitoring of water levels and flooding status across all city underpasses.",
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Location-Based Alerts",
                desc: "Receive alerts based on your current location.",
              },
              {
                icon: <FaBell />,
                title: "Smart Notifications",
                desc: "Instant notifications to authorities and citizens about dangerous flood conditions.",
              },
              // {
              //   icon: <FaBell />,
              //   title: "",
              //   desc: "Timely alerts to keep you and your loved ones safe.",
              // },
              {
                icon: <FaRobot />,
                title: "AI-based Pothole Detection",
                desc: "Advanced machine learning to identify and report road damage and potholes.",
              },
              {
                icon: <FaExclamationTriangle />,
                title: "Flood Detection",
                desc: "Advanced sensors detect rising water levels early.",
              },
              {
                icon: <FaTools />,
                title: "Easy Installation",
                desc: "Simple and fast setup with minimal infrastructure.",
              },
              {
                icon: <FaBolt />,
                title: "Energy Efficient",
                desc: "Low-power devices ensure long-lasting performance.",
              },
              {
                icon: <FaRoute />,
                title: "Smart Routing",
                desc: "Alternative route suggestions to avoid flooded underpasses and congested areas.",
              },
            ].map(({ icon, title, desc }, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="text-4xl bg-green-200 rounded-md font-light p-2 w-14 text-green-600 mb-4 ">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}

      <section class="bg-gradient-to-r from-blue-500 to-blue-900 text-white py-16">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl font-bold mb-4">
            Join Us in Making Cities Safer and Smarter.
          </h2>
          <p class="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join cities worldwide using FloodSense to create safer, smarter
            urban infrastructure.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              class="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Request Demo
            </a>
            <a
              href="#"
              class="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full hover:bg-gray-200 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center">
                <svg
                  class="h-8 w-8 text-primary-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-14v4h2V6h-2zm0 6v2h2v-2h-2z" />
                </svg>
                <span class="ml-2 text-xl font-bold">FloodSense</span>
              </div>
              <p class="mt-4 text-gray-400">
                Smart solutions for urban flood monitoring and management.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2">
                <li>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Live Map
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Contact</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <i class="fas fa-envelope mr-2 text-primary-400"></i>{" "}
                  contact@floodsense.io
                </li>
                <li class="flex items-center">
                  <i class="fas fa-phone mr-2 text-primary-400"></i> +1 (555)
                  123-4567
                </li>
                <li class="flex items-center">
                  <i class="fas fa-map-marker-alt mr-2 text-primary-400"></i>{" "}
                  Smart City Lab, Tech Avenue
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Connect</h3>
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <i class="fab fa-github text-xl"></i>
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <i class="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <i class="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <i class="fab fa-youtube text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
