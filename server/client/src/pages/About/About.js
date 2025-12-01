import React from "react";
import { motion } from "framer-motion"; // Import motion for animations
import img1 from "../../assets/images/Ritik.png";
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
          <div className="col-md-4 col-xl-4 col-lg-4 col-xs-12 about-img">
            <img src={img1} alt="profile_pic" />
          </div>
          <div className="col-md-8 col-xl-8 col-lg-8 col-xs-12 about-content">
            <h1>About Me</h1>
            <p>
              With {years} years and {months} months of experience as a Full Stack Developer, I specialize in building scalable, user-centric applications and leveraging modern technologies to deliver real-world impact.
              <br /><br />
              I began my journey at Newput Infotech Pvt. Ltd., contributing to enhanced user experiences through A/B testing, performance improvements, and Rollbar integration. At Ikeda Limited, I led key API development, improved UI workflows, and integrated multiple third-party services including InsuranceDekho, OneXtel SMS, and Fingpay MATM.
              <br /><br />
              Alongside my full-time roles, I worked as a freelancer, successfully delivering projects for clients across India and the Middle East. Key clients included Suffir Cruise (Middle East client), BrajDarpan Gruruvani Kendra, and several other clients.
              <br /><br />
              Currently, I am working with IOT Sporting Aspiration Pvt. Ltd. as a Software Developer, where I built a complete sports-tournament management product. The platform enables users to create competitions, manage teams and player registrations, schedule matches, generate event tags, view leaderboards, and access comprehensive business analytics at both the competition and match levels.
              <br /><br />
              I am also actively exploring Generative AI, recently developing an AI-powered PDF summarizer with Question-Answering capabilities. My focus is on integrating AI features into modern web systems to improve automation, productivity, and user experience.
              <br /><br />
              With 5-star HackerRank ratings in JavaScript and Ruby, and a strong foundation in the MERN stack, I am committed to continuous learning and solving complex challenges. I look forward to contributing my skills to innovative and AI-driven projects.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default About;

// Note -> Images in the src directory are processed by Webpack and are often used with import statements or require syntax. For example:
// import img1 from '../../assets/images/img1.jpeg';
// Images in the public directory are served as static assets and can be referenced with absolute paths. For example:
// function App() {
//   return <img src="/images/mern.jpg" alt="MERN" />;
// }
