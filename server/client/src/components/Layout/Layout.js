import React, { useState } from "react";
import Home from "../../pages/Home/Home";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai"; // Import icons for sidebar toggle
import "./Layout.css";
import Menus from "../Menus/Menus";

const Layout = () => {
  //State to manage sidebar toggle state
  const [toggle, setToggle] = useState(true);

  //Handle toggle of sidebar
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="sidebar-section">
        <div className={toggle ? "sidebar-toggle sidebar" : "sidebar"}>
          <div className="sidebar-toggle-icons">
            <p onClick={handleToggle}>
              {toggle ? (
                <AiOutlineDoubleLeft size={30} />
              ) : (
                <AiOutlineDoubleRight size={30} />
              )}
            </p>
          </div>
          {/* Render Menus component, passing toggle state as prop */}
          <Menus toggle={toggle} />
        </div>
        <div className="container">
          <Home />
        </div>
      </div>
    </>
  );
};

export default Layout;
