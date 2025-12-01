import React from "react";
import { motion } from "framer-motion";
import { MdSchool } from "react-icons/md";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"; // Import timeline components
import "react-vertical-timeline-component/style.min.css"; // Import timeline styles
import "./Education.css";
const Education = () => {
  return (
    <>
      <div className=" education" id="education">
        <motion.div
          whileHover={{ scale: 1.2 }}
          onHoverStart={(e) => {}}
          onHoverEnd={(e) => {}}
        >
          <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
            Education Details
          </h2>
          <hr />
        </motion.div>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "white", color: "black" }}
            contentArrowStyle={{ borderRight: "7px solid  white" }}
            date="2018 - 2022"
            iconStyle={{ background: "#138781", color: "#fff" }}
            icon={<MdSchool />}
          >
            <h3 className="vertical-timeline-element-title">B.Tech (CSE)</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Aligarh College of Engineering & Technology, Aligarh
            </h4>
            <h6>Percentage: 82%</h6>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "white", color: "black" }}
            contentArrowStyle={{ borderRight: "7px solid  white" }}
            date="2016 - 2017"
            iconStyle={{ background: "#138781", color: "#fff" }}
            icon={<MdSchool />}
          >
            <h3 className="vertical-timeline-element-title">
              Senior Secondary (XII),Science
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Babu Lal Jain Inter College, Aligarh
            </h4>
            <h6>Percentage: 75%</h6>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "white", color: "black" }}
            contentArrowStyle={{ borderRight: "7px solid  white" }}
            date="2014 - 2015"
            iconStyle={{ background: "#138781", color: "#fff" }}
            icon={<MdSchool />}
          >
            <h3 className="vertical-timeline-element-title">High School(X)</h3>
            <h4 className="vertical-timeline-element-subtitle">
              Babu Lal Jain Inter College, Aligarh
            </h4>
            <h6>Percentage: 80%</h6>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </>
  );
};

export default Education;
