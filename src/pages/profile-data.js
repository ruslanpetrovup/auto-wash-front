import React from "react";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";
import Data from "../components/Profile/Data";

const ProfileData = () => {
  return (
    <>
      <Data />
      <Footer current="profile" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default ProfileData;
