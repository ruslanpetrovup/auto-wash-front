import React from "react";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";
import Info from "../components/Info/Info";

const InfoPage = () => {
  if (window.innerWidth > 768) {
    document.body.style.background = "white";
  } else {
    document.body.style.background = "#0f84f0";
  }
  return (
    <>
      <Info />
      <Footer current="home" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default InfoPage;
