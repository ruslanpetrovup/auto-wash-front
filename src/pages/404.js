import React from "react";
import Footer from "../components/Footer";
import NotFoundTitle from "../components/NotFoundTitle";

const NotFound = () => {
  if (window.innerWidth > 768) {
    document.body.style.background = "white";
  } else {
    document.body.style.background = "#0f84f0";
  }
  return (
    <>
      <NotFoundTitle />
      <Footer />
    </>
  );
};

export default NotFound;
