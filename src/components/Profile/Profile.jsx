import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileLogo from "../../assets/logo-profile.png";
import dataIcon from "../../assets/profile/profile-data.svg";
import settings from "../../assets/profile/settings.svg";
import question from "../../assets/profile/question.svg";
import support from "../../assets/profile/support.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import Data from "./Data";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo-cmb.png";
import carHistory from "../../assets/car-history.svg";
import profileCard from "../../assets/profile-card.svg";
import arrow from "../../assets/arrow-history.svg";

const Profile = memo(() => {
  const [data, setData] = useState({});
  const [lazyData, setLazyData] = useState(false);
  const navigation = useNavigate();

  const token = useSelector((state) => state.user.token);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (token !== "") {
      axios
        .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
        .then((res) => {
          setData(res.data.data);
          setLazyData(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <section className="profile">
      <div className="profile__header">
        <h1
          className="profile__header-title"
          style={{ opacity: lazyData ? 1 : 0 }}
        >
          {data.firstName !== "" ? data.firstName : t("Тут буде ваше Ім’я")}
        </h1>
        <div className="profile__header-flex">
          <p className="profile__header-flex-id">#{data.idUser}</p>
          <img
            className="profile__header-flex-logo"
            alt="profile-logo"
            src={profileLogo}
          />
        </div>
      </div>

      <div className="container">
        <div className="profile__flex">
          <div className="profile__thoomb">
            <div className="profile__card">
              <p className="profile__card-name">
                {JSON.stringify(data) === "{}" ? (
                  <>{t("Тут буде ваше Ім’я")}</>
                ) : (
                  <>
                    {data.firstName !== ""
                      ? data.firstName
                      : t("Тут буде ваше Ім’я")}
                  </>
                )}
              </p>
              <div className="profile__card-number">
                <p className="profile__card-number-id">#{data.idUser}</p>
                <img className="profile__card-number-logo" src={profileLogo} />
              </div>
            </div>
            <ul className="profile__menu">
              <li className="profile__menu-item">
                <Link className="profile__menu-link" to="/profile/data">
                  <img
                    className="profile__menu-link-img"
                    alt="profile-menu"
                    src={dataIcon}
                  />
                  {t("Особисті дані")}
                </Link>
              </li>
              <li className="profile__menu-item">
                <Link className="profile__menu-link" to="/profile/settings">
                  <img
                    className="profile__menu-link-img"
                    alt="profile-menu"
                    src={settings}
                  />
                  {t("Налаштування")}
                </Link>
              </li>
              <li className="profile__menu-item">
                <Link className="profile__menu-link" to="/profile/questions">
                  <img
                    className="profile__menu-link-img"
                    alt="profile-menu"
                    src={question}
                  />
                  {t("Відповіді на запитання")}
                </Link>
              </li>
              <li className="profile__menu-item">
                <Link className="profile__menu-link" to="/profile/support">
                  <img
                    className="profile__menu-link-img"
                    alt="profile-menu"
                    src={support}
                  />
                  {t("Служба підтримки")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="profile__sidebar">
            <button
              className="promotions__sidebar-nearby"
              onClick={() => {
                navigation("/info/my-cards");
              }}
            >
              <p className="promotions__sidebar-nearby-text">
                {t("Ваші картки клієнта")}
              </p>
              <img
                className="promotions__sidebar-nearby-icon"
                src={profileCard}
              />
              <img className="promotions__sidebar-nearby-decor" src={arrow} />
            </button>
            <button
              className="promotions__sidebar-nearby"
              onClick={() => navigation("/wash")}
            >
              <p className="promotions__sidebar-nearby-text">
                {t("Знайди мийку поруч з тобою")}
              </p>
              <img
                className="promotions__sidebar-nearby-icon"
                src={carHistory}
              />
              <img className="promotions__sidebar-nearby-decor" src={arrow} />
            </button>

            <button className="profile__sidebar-notification">
              {t("Знижки від 10% до 50%")}
              <div className="profile__sidebar-notification-decor"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Profile;
