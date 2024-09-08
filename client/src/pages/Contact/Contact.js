import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast for notifications
import axios from "axios"; // Import axios for making HTTP requests
import { motion } from "framer-motion"; // Import motion for animations
import { BsGithub, BsLinkedin } from "react-icons/bs"; // Import icons for social media links
import { SiHackerrank } from "react-icons/si"; // Import Hackerrank icon
import validator from "validator"; // Import validator for input validation
import "./Contact.css";

const Contact = () => {
  // State hooks for form fields and loading state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation
    if (!name) {
      return toast.error("Please provide name field");
    }

    if (!msg) {
      return toast.error("Please provide message field");
    }

    if (!email) {
      return toast.error("Please provide email field");
    }

    if (!validator.isEmail(email)) {
      return toast.error("Invalid email address");
    }

    // Ensure handleSubmit runs only once
    if (loading) return;

    setLoading(true); // Set loading state to true

    try {
      // Make POST request to the server
      const res = await axios.post("/api/v1/portfolio/sendEmail", {
        name,
        email,
        msg,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        // Clear form fields
        setName("");
        setEmail("");
        setMsg("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="contact" id="contact">
      <div className="card card0 border-0">
        <div className="row">
          {/* Left Side - Contact Image */}
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 50 }}
            >
              <div className="card1">
                <div className="row border-line">
                  <img
                    src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?w=2000"
                    alt="Contact"
                    className="image"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="col-lg-6 col-md-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="card2 d-flex card border-0 px-4 py-5">
                <div className="row">
                  <h6>
                    Connect with me:
                    <a
                      href="https://www.linkedin.com/in/ritikgoyal-webdev/"
                      target="blank"
                    >
                      <BsLinkedin color="blue" size={30} className="ms-2" />
                    </a>
                    <a href="https://github.com/ritikgoyal133" target="blank">
                      <BsGithub color="black" size={30} className="ms-2" />
                    </a>
                    <a
                      href="https://www.hackerrank.com/certificates/ec488cb88a07"
                      target="blank"
                    >
                      <SiHackerrank color="green" size={30} className="ms-2" />
                    </a>
                  </h6>

                  <div className="row px-3 mb-4">
                    <div className="line" />
                    <small className="or text-center">OR</small>
                    <div className="line" />
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row px-3 mb-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        className="form-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="row px-3 mb-3">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email Address"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="row px-3 mb-3">
                      <textarea
                        name="msg"
                        placeholder="Write your message"
                        className="form-textarea"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                      />
                    </div>
                    <div className="row px-3">
                      <button
                        className="button"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "SEND MESSAGE"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
