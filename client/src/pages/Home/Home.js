import React from "react";
import { useTheme } from "../../context/ThemeContext"; // Import the custom theme context
import Typewriter from "typewriter-effect"; // Import the typewriter effect component
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs"; // Import icons for theme toggle
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
  const [theme, setTheme] = useTheme(); // Get theme and setTheme function from context

  // Handle theme toggle
  const handleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light")); // Toggle theme between light and dark
  };

  return (
    <>
      <div className="container-fluid home-container" id="home">
        {/* Theme toggle button */}
        <div className="theme-btn" onClick={handleTheme}>
          {theme === "light" ? (
            <BsFillMoonStarsFill size={30} />
          ) : (
            <BsFillSunFill size={30} />
          )}
        </div>

        {/* Home content */}
        <div className="container home-content">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h2>Hi, I'm a</h2>
            <h1>
              <Typewriter
                options={{
                  strings: ["FullStack Developer!", "MERN Stack Enthusiast!"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="home-buttons"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          >
            <a
              className="btn btn-hire"
              href="https://api.whatsapp.com/send?phone=918077674622"
              rel="noreferrer"
              target="_blank"
            >
              Hire Me
            </a>
            <a
              className="btn btn-cv"
              target="blank"
              href="https://drive.google.com/file/d/1WsLK60lNS5_MFhw2zxs_pwUck1yFAg3s/view"
              download="your_name.pdf"
            >
              My Resume
            </a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;
