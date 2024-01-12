import React, { useEffect } from "react";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";
import Cards from "../components/Info/Cards";

const MyCards = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "#0F84F0";
    };
  });
  return (
    <>
      <Cards />
      <Footer current="home" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default MyCards;
