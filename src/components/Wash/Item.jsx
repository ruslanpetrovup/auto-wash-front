import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useLocation } from "react-router-dom";
import washIconRoad from "../../assets/wash/wash-item-icon.png";
import backIcon from "../../assets/wash/back.svg";
import { useTranslation } from "react-i18next";
import Footer from "../Footer";

import "swiper/css";
import axios from "axios";
import { useSelector } from "react-redux";
import MapComponent from "./Maps";
import requestVerify from "../hooks/requestVerify";

const Item = ({ data }) => {
  const location = useLocation();
  const [balanceCurrent, setBalanceCurrent] = useState("0");
  // const [switchWashButton, setSwitchButton] = useState(false);

  const { t } = useTranslation();

  const parseDescription = () => {
    if (Object.keys(data).length !== 0) {
      const htmlElements = [];
      if (!data.description) return "";
      data.description.forEach((item, index) => {
        htmlElements.push(item.children[0].text);
        if (index === data.description.length) return;
        htmlElements.push("<br/>");
      });
      return htmlElements.join(" ");
    }
  };

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    localStorage.setItem(
      "history-path",
      JSON.stringify({ path: location.pathname })
    );

    if (token) {
      axios
        .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
        .then((res) => {
          const result = res.data.data.balanceWash.find(
            (item) => item.id === data.id
          );
          if (result === undefined) return;

          setBalanceCurrent(result.balance);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <section className="wash">
      {window.innerWidth > 768 ? <Footer current="wash" /> : null}
      <div className="container">
        <div className="wash__flex">
          <div className="wash__map">
            <MapComponent />
          </div>
          <div className="wash__thoomb">
            {Object.keys(data).length === 0 ? (
              <></>
            ) : (
              <div className="wash__item-page">
                <div
                  className="wash__item-page-slider"
                  style={{ position: "relative" }}
                >
                  <Swiper
                    spaceBetween={1}
                    slidesPerView={1}
                    onSlideChange={() => console.log("slide change")}
                  >
                    {data.images.map((item) => (
                      <SwiperSlide>
                        <img
                          className="wash__item-page-slider-img"
                          alt="icon-slide"
                          src={item.image.url}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <p className="wash__item-page-slider-text">
                    {t("Гортай фото")}
                  </p>
                </div>
                <div className="wash__item-page-info">
                  <div className="wash__item-page-info-balance">
                    <p className="wash__item-page-info-balance-text">
                      {t("Баланс на мийці")}
                    </p>
                    <p className="wash__item-page-info-balance-price">
                      {balanceCurrent} ₴
                    </p>
                  </div>

                  <div className="wash__item-page-info-content">
                    <div className="wash__item-page-info-content-block">
                      <div className="wash__item-page-info-content-description">
                        <h2 className="wash__item-page-info-content-description-title">
                          {data.title}
                        </h2>
                        <p className="wash__item-page-info-content-description-address">
                          {data.address}
                        </p>
                      </div>
                      <div className="wash__item-page-info-content-image">
                        <img
                          className="wash__item-page-info-content-image-img"
                          src={washIconRoad}
                          alt="washIconRoad"
                        />
                        <p className="wash__item-page-info-content-image-text">
                          8,4 КМ
                        </p>
                      </div>
                    </div>

                    <p
                      dangerouslySetInnerHTML={{ __html: parseDescription() }}
                      className="wash__item-page-info-content-desc"
                    ></p>

                    <Link
                      to={token ? `/payment-post/${data.id}` : "/phone"}
                      className="wash__item-page-info-content-deposit"
                    >
                      {t("Помити авто")}
                    </Link>

                    <Link
                      to={token ? `/payment/${data.id}` : "/phone"}
                      className="wash__item-page-info-content-deposit"
                    >
                      {t("Поповнити баланс")}
                    </Link>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${data.address}`}
                      target="_blank"
                      className="wash__item-page-info-content-road"
                    >
                      {t("Прокласти маршрут")}
                    </a>

                    <a
                      href={`tel:${data.phoneWash}`}
                      target="_blank"
                      className="wash__item-page-info-content-road"
                      style={{
                        opacity: data.phoneWash ? 1 : 0.5,
                        pointerEvents: data.phoneWash ? "all" : "none",
                      }}
                    >
                      {t("Зателефонувати")}
                    </a>
                  </div>
                </div>
                <Link to="/wash" className="wash__item-page-back">
                  <img
                    className="wash__item-page-back-icon"
                    src={backIcon}
                    alt="backIcon"
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="wash__mob">
        {Object.keys(data).length === 0 ? (
          <></>
        ) : (
          <div className="wash__item-page">
            <div className="wash__item-page-slider">
              <Swiper
                spaceBetween={1}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
              >
                {data.images.map((item) => (
                  <SwiperSlide>
                    <img
                      className="wash__item-page-slider-img"
                      alt="icon-slide"
                      src={item.image.url}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <p className="wash__item-page-slider-text">{t("Гортай фото")}</p>
            </div>
            <div className="wash__item-page-info">
              <div className="wash__item-page-info-balance">
                <p className="wash__item-page-info-balance-text">
                  {t("Баланс на мийці")}
                </p>
                <p className="wash__item-page-info-balance-price">
                  {balanceCurrent} ₴
                </p>
              </div>

              <div className="wash__item-page-info-content">
                <div className="wash__item-page-info-content-block">
                  <div className="wash__item-page-info-content-description">
                    <h2 className="wash__item-page-info-content-description-title">
                      {data.title}
                    </h2>
                    <p className="wash__item-page-info-content-description-address">
                      {data.address}
                    </p>
                  </div>
                  <div className="wash__item-page-info-content-image">
                    <img
                      className="wash__item-page-info-content-image-img"
                      src={washIconRoad}
                      alt="washIconRoad"
                    />
                    <p className="wash__item-page-info-content-image-text">
                      8,4 КМ
                    </p>
                  </div>
                </div>

                <p
                  dangerouslySetInnerHTML={{ __html: parseDescription() }}
                  className="wash__item-page-info-content-desc"
                ></p>

                <Link
                  to={token ? `/payment-post/${data.id}` : "/phone"}
                  className="wash__item-page-info-content-deposit"
                >
                  {t("Помити авто")}
                </Link>

                <Link
                  to={token ? `/payment/${data.id}` : "/phone"}
                  className="wash__item-page-info-content-deposit"
                >
                  {t("Поповнити баланс")}
                </Link>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${data.address}`}
                  target="_blank"
                  className="wash__item-page-info-content-road"
                >
                  {t("Прокласти маршрут")}
                </a>

                <a
                  href={`tel:${data.phoneWash}`}
                  target="_blank"
                  className="wash__item-page-info-content-road"
                  style={{
                    opacity: data.phoneWash ? 1 : 0.5,
                    pointerEvents: data.phoneWash ? "all" : "none",
                  }}
                >
                  {t("Зателефонувати")}
                </a>
              </div>
            </div>
            <Link to="/wash" className="wash__item-page-back">
              <img
                className="wash__item-page-back-icon"
                src={backIcon}
                alt="backIcon"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Item;
