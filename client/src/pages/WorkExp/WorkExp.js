import React, { useState, useEffect } from "react"; // Import React and hooks
import { motion } from "framer-motion";
import { SiReact } from "react-icons/si";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import axios from "axios";
import "react-vertical-timeline-component/style.min.css";
import "./WorkExp.css";

const WorkExp = () => {
  const [experiences, setExperiences] = useState([]); // State to store work experiences

  useEffect(() => {
    // Fetch work experience data from a JSON file
    axios
      .get("/data/workExperience.json")
      .then((response) => {
        // Update state with fetched data
        setExperiences(response.data);
      })
      .catch((error) => {
        console.error("Error fetching work experience data:", error);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="work" id="work">
      <div className="container work-exp">
        <motion.div
          whileHover={{ scale: 1.2 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
        >
          <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
            Work Experience
          </h2>
          <hr />
        </motion.div>
        <VerticalTimeline lineColor="#1e1e2c">
          {experiences.map((exp, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{ background: "white", color: "#1e1e2c" }}
              contentArrowStyle={{
                borderRight: "7px solid  white",
              }}
              date={exp.date}
              iconStyle={{ background: "#1e1e2c", color: "#fff" }}
              icon={<SiReact />}
            >
              <h3 className="vertical-timeline-element-title">{exp.title}</h3>
              <h4 className="vertical-timeline-element-subtitle">
                {exp.company}
              </h4>
              <p>
                <strong>Tools:</strong> {exp.tools.join(", ")}
              </p>
              <p>{exp.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default WorkExp;
