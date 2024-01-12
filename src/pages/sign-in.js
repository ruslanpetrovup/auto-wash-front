import React from "react";
import OnlyMobile from "../components/OnlyMobile";
import CheckCode from "../components/SingIn/CheckCode";

const SignIn = ({ setIsAuthenticated }) => {
  document.body.style.background = "#0f84f0";
  return (
    <>
      <CheckCode setIsAuthenticated={setIsAuthenticated} />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default SignIn;
