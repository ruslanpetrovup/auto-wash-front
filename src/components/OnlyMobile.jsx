import React from "react";
import rotateDevice from "../assets/icons/rotate-device.svg";

const OnlyMobile = () => {
  return (
    <div className="only-mobile">
      <img className="only-mobile-icon" alt="only-mobile" src={rotateDevice} />
      <p className="only-mobile-title">Please turn the screen</p>
    </div>
  );
};

export default OnlyMobile;
