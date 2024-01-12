import React, { useState, useEffect } from "react";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";
import Support from "../components/Profile/Support";
import axios from "axios";

const ProfileSettings = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");

    if (!currentLang) {
      axios(`${process.env.REACT_APP_SERVER}/api/support`).then((res) => {
        setData(res.data.docs[0]);
      });
    } else {
      axios(
        `${process.env.REACT_APP_SERVER}/api/support?locale=${currentLang}`
      ).then((res) => {
        setData(res.data.docs[0]);
      });
    }
  }, []);
  return (
    <>
      <Support data={data} />
      <Footer current="profile" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default ProfileSettings;
