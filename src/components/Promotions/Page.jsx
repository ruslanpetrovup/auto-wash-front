import React from "react";
import promotions from "../../assets/icons/promotions.svg";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import promotion from "../../assets/icons/promotion.svg";
import mapdesk from "../../assets/map-desk.png";
import notificationDesk from "../../assets/sidebar-img-desk.png";
import logo from "../../assets/logo-cmb.png";

const Page = ({ data }) => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  return (
    <section className="promotions">
      <div className="promotions__notification">
        <p className="promotions__notification-text">
          {t("Магазин автокосметики та обладнання для автомийок")}
        </p>

        <img
          className="promotions__notification-icon"
          src={promotions}
          alt="promotions"
        />
      </div>
      <div className="container">
        <div className="promotions__flex">
          <div className="promotions__thoomb">
            <div className="promotions-header">
              <img
                className="promotions-header-icon"
                src={promotion}
                alt="promotion"
              />

              <p className="promotions-header-text">{t("Доступні акції")}</p>
            </div>

            <ul
              className="promotions__list"
              style={{ opacity: Object.keys(data).length === 0 ? 0 : 1 }}
            >
              {data.map((item) => (
                <li className="promotions__item" key={item.id}>
                  <Link
                    to={`/promotions/${item.id}`}
                    className="promotions__item-link"
                  >
                    <div className="promotions__item-content">
                      <h2 className="promotions__item-content-title">
                        {item.title}
                      </h2>
                      <p className="promotions__item-content-date">
                        {t("Діє з")} {item.dateStart.slice(5, 10)} {t("до")}{" "}
                        {item.dateEnd.slice(5, 10)}
                      </p>
                    </div>
                    <div className="promotions__item-image">
                      <img
                        className="promotions__item-image-img"
                        src={item.image.url}
                        alt="promotions1"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="promotions__sidebar">
            <button
              className="promotions__sidebar-map"
              onClick={() => {
                navigation("/maps");
              }}
            >
              <img className="promotions__sidebar-map-img" src={mapdesk} />
              <p className="promotions__sidebar-map-text">
                {t("Знайди найближчу мийку на мапі")}
              </p>
            </button>

            <button className="promotions__sidebar-notification">
              <p className="promotions__sidebar-notification-text">
                {t("Доглядай за авто як профі, обирай хімію від виробника")}
              </p>
              <img
                className="promotions__sidebar-notification-img"
                src={notificationDesk}
                alt="notificationDesk"
              />
              <img
                className="promotions__sidebar-notification-logo"
                src={logo}
                alt="logo"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
