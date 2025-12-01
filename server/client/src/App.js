import React from "react";
import Layout from "./components/Layout/Layout";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Education from "./pages/Educations/Education";
import Projects from "./pages/Projects/Projects";
import Techstack from "./pages/Techstack/Techstack";
import WorkExp from "./pages/WorkExp/WorkExp";
import ScrollToTop from "react-scroll-to-top"; // Scroll-to-top button functionality
import { useTheme } from "./context/ThemeContext"; // Custom hook to track theme changes
import { motion } from "framer-motion"; // Animation library for smooth effects
import MobileNav from "./components/MobileNav/MobileNav"; // Navigation bar for mobile views

// ToastContainer for notifications (like form submission success/fail messages)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Toastify's CSS

function App() {
  // Using a custom hook 'useTheme' to get the current theme (light/dark mode)
  const [theme] = useTheme();

  // Get the current date and year for dynamic copyright
  const date = new Date();
  const currentYear = date.getFullYear();
  const ownerName = "Ritik Goyal"; // Set the owner name for the footer

  return (
    <>
      <div id={theme}>
        {/* Toast notifications handler */}
        <ToastContainer />
        <MobileNav />
        <Layout />

        {/* Main content container */}
        <div className="container">
          <About />
          <Education />
          <Techstack />
          <Projects />
          <WorkExp />
          <Contact />
        </div>

        {/* Footer section */}
        <div className="footer pb-3 ms-3">
          {/* Smooth fade-in effect for the footer text using Framer Motion */}
          <motion.div
            initial={{ opacity: 0 }} // Starts with opacity 0 (hidden)
            animate={{ opacity: 1 }} // Transitions to opacity 1 (visible)
            transition={{ duration: 1 }} // Duration of the fade-in animation
          >
            {/* Footer content */}
            <h4 className="text-center">
              Inspired by innovative design | Developed with care by {ownerName}{" "}
              | &copy; {currentYear}
            </h4>
          </motion.div>
        </div>
      </div>

      {/* Scroll-to-top button that appears when scrolling */}
      <ScrollToTop
        smooth
        color="#f29f67"
        style={{ backgroundColor: "#1e1e2c", borderRadius: "80px" }}
      />
    </>
  );
}

export default App;
