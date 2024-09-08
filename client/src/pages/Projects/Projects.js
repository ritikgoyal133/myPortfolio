import React, { useEffect, useState } from "react"; // Import React and hooks
import axios from "axios"; // Import axios for data fetching
import "./Projects.css";
import { motion } from "framer-motion";
import projectImg from "../../assets/images/mern.jpeg";

// Component to display individual project card
const ProjectCard = ({ project }) => {
  // Determine if the View button should be disabled
  const isButtonDisabled = project.badge === "Full Stack";

  return (
    <motion.div
      className="col-md-4"
      whileHover={{ scale: 1.05 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8 }}
    >
      <div className="card rounded">
        <div className="card-image">
          <span className="card-notify-badge">{project.badge}</span>
          <img src={projectImg} alt={project.title} />
        </div>
        <div className="card-image-overly m-auto mt-3">
          {project.tech.map((tech) => (
            <span key={tech} className="card-detail-badge">
              {tech}
            </span>
          ))}
        </div>
        <div className="card-body text-center">
          <div className="project-title m-auto">
            <h6 className="text-uppercase">{project.title}</h6>
          </div>
          <a
            className={`view-btn ${isButtonDisabled ? "disabled" : ""}`}
            href={project.link}
            target="blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (isButtonDisabled) {
                e.preventDefault();
              }
            }}
          >
            {isButtonDisabled ? "Not Available" : "View"}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Main component to display all projects
const Projects = () => {
  const [projects, setProjects] = useState([]); // State to hold project data

  useEffect(() => {
    // Fetch the JSON file from the public folder using axios
    axios
      .get("/data/projects.json")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="container project" id="projects">
      <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
        TOP RECENT PROJECTS
      </h2>
      <hr />
      {/* Card design */}
      <div className="row" id="projects-list">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;

// Note
// The `rel="noopener noreferrer"` attribute is used for security and performance reasons when opening a link in a new tab or window.
// `noopener` prevents the new page from being able to access the `window.opener` property of the current page.
// This is important because it prevents potential security vulnerabilities, such as allowing the new page to manipulate the original page's content or access sensitive data.

// `noreferrer` ensures that the new page cannot see the URL of the referring page (the current page).
// This helps to maintain user privacy and prevent the new page from knowing where the user came from.

// Together, these attributes enhance security by reducing the risk of malicious interactions and protect user privacy by not leaking referral information.
