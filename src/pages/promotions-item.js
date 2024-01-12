import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import OnlyMobile from "../components/OnlyMobile";
import Item from "../components/Promotions/Item";
import { useParams } from "react-router-dom";
import axios from "axios";

const PromotionsItem = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");

    if (!currentLang) {
      axios(`${process.env.REACT_APP_SERVER}/api/discount/${id}`).then(
        (res) => {
          setData(res.data);
          // console.log(res.data);
        }
      );
    } else {
      axios(
        `${process.env.REACT_APP_SERVER}/api/discount/${id}?locale=${currentLang}`
      ).then((res) => {
        setData(res.data);
        // console.log(res.data);
      });
    }
  }, []);

  return (
    <>
      <Item data={data} />
      <Footer current="promotions" />
      {/* <OnlyMobile /> */}
    </>
  );
};

export default PromotionsItem;
