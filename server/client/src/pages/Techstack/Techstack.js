import React from "react";
import "./Techstack.css";
import { motion } from "framer-motion";
import { TechstackList } from "../../utils/TechstackList"; // Import list of tech stack

const Techstack = () => {
  return (
    <>
      <div className="container techstack" id="techstack">
        <motion.div whileHover={{ scale: 1.2 }}>
          <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">
            Technologies Stack
          </h2>
          <hr />
        </motion.div>

        <div className="row">
          {/* Iterate over TechstackList to create tech stack cards */}
          {TechstackList.map((tech) => (
            <motion.div
              key={tech._id}
              className="col-md-3"
              whileHover={{ scale: 1.2 }}
            >
              <div className="card m-2">
                <div className="card-content">
                  <div className="card-body">
                    <div className="media d-flex justify-content-center">
                      <div className="align-self-center">
                        <tech.icon className="tech-icon" />
                      </div>
                      <div className="media-body">
                        <h5>{tech.name}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Techstack;
