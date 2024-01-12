import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import smile from "../../assets/smile.png";
import { Link, useNavigate } from "react-router-dom";
import requestVerify from "../hooks/requestVerify";
import { useTranslation } from "react-i18next";
import notificationDesk from "../../assets/sidebar-img-desk.png";
import logo from "../../assets/logo-cmb.png";
import carHistory from "../../assets/car-history.svg";
import arrow from "../../assets/arrow-history.svg";
import historyDesk from "../../assets/history-desk.svg";

// const dataTest = [
//   {
//     title: "Мийка на Ватутіна",
//     address: " вул.Ватутіна, 84",
//     date: "16.03.2023",
//     price: "60",
//   },
//   {
//     title: "Мийка на Ватутіна",
//     address: " вул.Ватутіна, 84",
//     date: "16.03.2023",
//     price: "60",
//   },
//   {
//     title: "Мийка на Ватутіна",
//     address: " вул.Ватутіна, 84",
//     date: "16.03.2023",
//     price: "60",
//   },
//   {
//     title: "Мийка на Ватутіна",
//     address: " вул.Ватутіна, 84",
//     date: "16.03.2023",
//     price: "120",
//   },
//   {
//     title: "Мийка на Ватутіна",
//     address: " вул.Ватутіна, 84",
//     date: "16.03.2023",
//     price: "60",
//   },
//   {
//     title: "Мийка на Ватутіна",
//     address: " вул.Ватутіна, 84",
//     date: "16.03.2023",
//     price: "60",
//   },
// ];

const Page = () => {
  const navigation = useNavigate();
  const [lazyData, setLazyData] = useState(false);
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState([]);
  const { t } = useTranslation();

  const getData = async () => {
    const result = await requestVerify(token);
    setData(result.data.historyPayment);
    setLazyData(true);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section className="history-order">
      <div className="container">
        <h1 className="history-order__title">{t("Історія мийок")}</h1>
        <div className="promotions__flex">
          <div className="promotions__thoomb">
            <div className="promotions-header">
              <img
                className="promotions-header-icon"
                src={historyDesk}
                alt="historyDesk"
              />

              <p className="promotions-header-text">
                {t("Історія Ваших мийок")}
              </p>
            </div>
            <div
              style={{
                transition: "opacity 250ms linear",
                opacity: lazyData ? 1 : 0,
              }}
            >
              {data.length === 0 ? (
                <div className="history-order__null">
                  <div className="history-order__null-content">
                    <p className="history-order__null-content-text">
                      {t("На жаль, у Вас ще немає історії мийок")}
                    </p>
                    <img
                      className="history-order__null-content-icon"
                      src={smile}
                      alt="smile"
                    />
                  </div>
                  <Link className="history-order__null-button" to="/wash">
                    {t("Виправити це")}
                  </Link>
                </div>
              ) : (
                <ul className="history-order__list">
                  {data.reverse().map((item) => (
                    <li className="history-order__item">
                      <h2 className="history-order__item-title">
                        {item.title}
                      </h2>
                      <div className="history-order__item-block">
                        <div className="history-order__item-text">
                          <p className="history-order__item-text-address">
                            {item.address}
                          </p>
                          <p className="history-order__item-text-date">
                            {item.date}
                          </p>
                        </div>
                        <p className="history-order__item-price">
                          {item.price} ₴
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="promotions__sidebar">
            <button
              className="promotions__sidebar-nearby"
              onClick={() => {
                navigation("/maps");
              }}
            >
              <p className="promotions__sidebar-nearby-text">
                {t("Знайди мийку поруч з тобою")}
              </p>
              <img
                className="promotions__sidebar-nearby-icon"
                src={carHistory}
                alt="carHistory"
              />
              <img
                className="promotions__sidebar-nearby-decor"
                src={arrow}
                alt="arrow-icon"
              />
            </button>

            <button className="promotions__sidebar-notification">
              <p className="promotions__sidebar-notification-text">
                {t("Доглядай за авто як профі, обирай хімію від виробника")}
              </p>
              <img
                className="promotions__sidebar-notification-img"
                src={notificationDesk}
                alt="notificationDesk-icon"
              />
              <img
                className="promotions__sidebar-notification-logo"
                src={logo}
                alt="logo-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
