import React, { useEffect, useState } from "react";
import OnlyMobile from "../components/OnlyMobile";
import Footer from "../components/Footer";
import QuestionsItem from "../components/Profile/QuestionsItem";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileQuestionsItem = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");
    if (!currentLang) {
      axios(`${process.env.REACT_APP_SERVER}/api/question/${id}`).then(
        (res) => {
          setData(res.data);
        }
      );
    } else {
      axios(
        `${process.env.REACT_APP_SERVER}/api/question/${id}?locale=${currentLang}`
      ).then((res) => {
        setData(res.data);
      });
    }
  }, []);
  return (
    <>
      <QuestionsItem data={data} />
      <Footer current="profile" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default ProfileQuestionsItem;
