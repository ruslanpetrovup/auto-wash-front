import React, { useState, useEffect } from "react";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";
import Questions from "../components/Profile/Questions";
import axios from "axios";

const ProfileQuestions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");

    if (!currentLang) {
      axios(`${process.env.REACT_APP_SERVER}/api/question`).then((res) => {
        setData(res.data.docs);
      });
    } else {
      axios(
        `${process.env.REACT_APP_SERVER}/api/question?locale=${currentLang}`
      ).then((res) => {
        setData(res.data.docs);
      });
    }
  }, []);
  return (
    <>
      <Questions data={data} />
      <Footer current="profile" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default ProfileQuestions;
