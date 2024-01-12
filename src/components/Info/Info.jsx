import { memo, useEffect, useState } from "react";
import profileLogo from "../../assets/logo-profile.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import qrImg from "../../assets/profile/questions-1.png";
import carInfo from "../../assets/carInfo.svg";
import cardInfo from "../../assets/cardInfo.svg";
import requestVerify from "../hooks/requestVerify";
import { useTranslation } from "react-i18next";
import infoHeader from "../../assets/infoHeader.png";
import arrow from "../../assets/icons/arrow.svg";
import cards from "../../assets/icons/cards.svg";
import car from "../../assets/icons/car.svg";
import washing from "../../assets/icons/washing.svg";

const Info = memo(() => {
  const [data, setData] = useState({});
  const [lazyData, setLazyData] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigate();

  const token = useSelector((state) => state.user.token);

  const getVerify = async () => {
    if (token) {
      const result = await requestVerify(token);
      setData(result.data);
    }
    setLazyData(true);
  };

  useEffect(() => {
    getVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <section className="info">
      <div className="profile__header">
        <h1
          className="profile__header-title"
          style={{ opacity: lazyData ? 1 : 0 }}
        >
          {JSON.stringify(data) === "{}" ? (
            <>{t("Тут буде ваше Ім’я")}</>
          ) : (
            <>
              {data.firstName !== "" ? data.firstName : t("Тут буде ваше Ім’я")}
            </>
          )}
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
        <div className="info__header-desk">
          <div className="info__header-desk-block">
            <h1 className="info__header-desk-title">
              {t("Знайди собі найкращу мийку")}
            </h1>

            <img
              className="info__header-desk-icon"
              src={infoHeader}
              alt="infoHeader"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="info__block">
          <ul className="info__menu">
            <li className="info__menu-item">
              <Link className="info__menu-item-link" to="/qr-scan">
                <img
                  className="info__menu-item-link-img"
                  src={qrImg}
                  alt="menu-info"
                />
                <div className="info__menu-item-link-content">
                  <h2 className="info__menu-item-link-content-title">
                    {t("Скануй QR-код")}
                  </h2>
                  <p className="info__menu-item-link-content-desc">
                    {t("Натисність та наведить на QR-код біля апарату")}
                  </p>
                </div>
              </Link>
            </li>
            <li className="info__menu-item">
              <Link className="info__menu-item-link" to="/wash">
                <img
                  className="info__menu-item-link-img"
                  src={carInfo}
                  alt="menu-info"
                />
                <div className="info__menu-item-link-content">
                  <h2 className="info__menu-item-link-content-title">
                    {t("Вибери мийку")}
                  </h2>
                  <p className="info__menu-item-link-content-desc">
                    {t("Поповни рахунок чи проклади маршрут")}
                  </p>
                </div>
              </Link>
            </li>
            <li className="info__menu-item">
              <Link
                to={JSON.stringify(data) === "{}" ? "/phone" : "my-cards"}
                className="info__menu-item-link"
              >
                <img
                  className="info__menu-item-link-img"
                  src={cardInfo}
                  alt="menu-info"
                />
                <div className="info__menu-item-link-content">
                  <h2 className="info__menu-item-link-content-title">
                    {t("Мої картки")}
                  </h2>
                  <p className="info__menu-item-link-content-desc">
                    {t("Перевір баланс своїх карток клієнта")}
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </div>

        <div className="info__block-desk">
          <div className="info__block-desk-buttons">
            <button
              className="info__block-desk-button"
              onClick={() =>
                navigation(
                  JSON.stringify(data) === "{}" ? "/phone" : "/info/my-cards"
                )
              }
            >
              <p className="info__block-desk-button-title">
                {t("Ваші картки клієнта")}
              </p>
              <img
                className="info__block-desk-button-icon"
                src={cards}
                alt="cards-icon"
              />

              <img
                className="info__block-desk-button-decor"
                src={arrow}
                alt="arrow-icon"
              />
            </button>
            <button
              className="info__block-desk-button"
              onClick={() => navigation("/wash")}
            >
              <p className="info__block-desk-button-title">
                {t("Знайди мийку поруч з тобою")}{" "}
              </p>
              <img
                className="info__block-desk-button-icon"
                src={car}
                alt="car-icon"
              />

              <img
                className="info__block-desk-button-decor"
                src={arrow}
                alt="arrow-icon"
              />
            </button>
            <button className="info__block-desk-button">
              <p className="info__block-desk-button-title">
                {t("Доглядай за авто як професіонал")}{" "}
              </p>
              <img
                className="info__block-desk-button-icon"
                src={washing}
                alt="washing-icon"
              />

              <img
                className="info__block-desk-button-decor"
                src={arrow}
                alt="arrow-icon"
              />
            </button>
          </div>

          <div className="info__block-desk-notification">
            <h2 className="info__block-desk-notification-title">
              {t("Акції для кожної мийки Знайди свою та заощаджуй")}
            </h2>
            <p className="info__block-desk-notification-second">
              {t("Знижки від 10% до 50%")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Info;
