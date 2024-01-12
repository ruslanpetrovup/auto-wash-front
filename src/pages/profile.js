import React from "react";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";
import ProfilePage from "../components/Profile/Profile";

const Profile = () => {
  document.body.style.background = "#0f84f0";
  return (
    <>
      <ProfilePage />
      <Footer current="profile" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default Profile;
