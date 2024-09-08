import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import img1 from "../../assets/images/img1.jpeg";
import { calculateExperience } from "../../utils/calculateExperience"; // Import the utility function
import "./About.css";

const About = () => {
  const startDate = "2022-05-05"; // Start date of my professional career
  const { years, months } = calculateExperience(startDate);

  return (
    <>
      <motion.div
        className="about"
        id="about"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="row">
          <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-img">
            <img src={img1} alt="profile_pic" />
          </div>
          <div className="col-md-6 col-xl-6 col-lg-6 col-xs-12 about-content">
            <h1>About Me</h1>
            <p>
              With {years} years and {months} months of experience as a Full
              Stack Developer, I am passionate about creating impactful web
              applications. I started my career at Newput Infotech Pvt Ltd,
              where I improved user experience through A/B testing, bug fixes,
              and Rollbar integration. At Ikeda Limited, I led API development,
              optimized UI, and integrated third-party services like Insurance
              Dekho, One Xtel Sms, and Fingpay MATM Service. Additionally, I
              founded a non-profit organization during college, organizing
              affordable pilgrimages to Mathura Vrindavan. With a 5-star
              HackerRank rating in JavaScript and Ruby and a 3-star rating in
              SQL, I am committed to continuous learning and tackling complex
              challenges. As a MERN stack enthusiast, I am excited to bring my
              skills and enthusiasm to new opportunities.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default About;
