import React, { useEffect, useState } from "react";
import OnlyMobile from "../components/OnlyMobile";
import Item from "../components/Wash/Item";
import axios from "axios";
import { useParams } from "react-router-dom";

const WashItem = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    document.body.style.backgroundColor = "white";

    const currentLang = localStorage.getItem("lang");
    if (!currentLang) {
      axios(`${process.env.REACT_APP_SERVER}/api/wash/${id}`).then((res) => {
        setData(res.data);
      });
    } else {
      axios(
        `${process.env.REACT_APP_SERVER}/api/wash/${id}?locale=${currentLang}`
      ).then((res) => {
        setData(res.data);
      });
    }

    return () => {
      document.body.style.backgroundColor = "#0f84f0";
    };
  }, []);
  return (
    <>
      <Item data={data} />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default WashItem;
