import React from "react";
import Settings from "../components/Profile/Settings";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";

const ProfileSettings = () => {
  return (
    <>
      <Settings />
      <Footer current="profile" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default ProfileSettings;
