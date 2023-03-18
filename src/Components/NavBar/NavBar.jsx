import React, { useState } from "react";
import logo from "./logo.png";
import "./NavBar.css";

const Navigation = ({ onClick }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleButtonClick = () => {
    onClick();
    setShowMessage(true);
  };

  return (
    <div className="navigation">
      <div className="navigation-logo" onClick={() => window.location.reload()}>
        <img
          src={logo}
          alt="Company Logo"
          style={{ height: "70px", width: "auto", marginLeft: "30px" }}
        />
      </div>
      <button className="button" onClick={handleButtonClick}>
        About Applicant
      </button>
      {showMessage && (
        <div className="message">My score on the test assignment was 100%</div>
      )}
    </div>
  );
};

export default Navigation;
