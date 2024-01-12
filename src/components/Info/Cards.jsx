import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import cardsItem from "../../assets/cards-item.png";
import { useSelector } from "react-redux";
import axios from "axios";
import removeCard from "../../assets/icons/removeCard.svg";
import { useTranslation } from "react-i18next";

const Cards = () => {
  const [data, setData] = useState([]);
  const [lazyData, setLazyData] = useState(false);
  const [acceptShow, setAcceptShow] = useState(false);
  const token = useSelector((state) => state.user.token);
  const { t } = useTranslation();

  useEffect(() => {
    if (token !== "") {
      axios
        .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
        .then((res) => {
          setData(res.data.data.balanceWash);
          setLazyData(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <section className="info__cards">
      <div className="info__cards-header">
        <p className="info__cards-header-title">{t("Мої карти клієнта")}</p>

        <Link
          to="/info"
          className="profile__questions-back"
          style={{
            position: "absolute",
            top: "50%",
            left: "17px",
            transform: "translateY(-50%)",
          }}
        >
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </Link>
      </div>

      <div className="container">
        <ul className="info__cards-list" style={{ opacity: lazyData ? 1 : 0 }}>
          {data.map((item) => (
            <li className="info__cards-list-item">
              <div className="info__cards-list-item-content">
                <p className="info__cards-list-item-content-id">#{item.id}</p>
                <h3 className="info__cards-list-item-content-title">
                  {item.address}
                </h3>
                <p className="info__cards-list-item-content-balance">
                  {item.balance} UAH
                </p>
              </div>
              <img
                className="info__cards-list-item-img"
                src={cardsItem}
                alt="card-item"
              />

              <button
                className="info__cards-remove"
                onClick={() => setAcceptShow(true)}
              >
                <img
                  className="info__cards-remove-icon"
                  src={removeCard}
                  alt="removeCard-icon"
                />
              </button>
            </li>
          ))}
        </ul>

        <div
          className={`info__cards-remove-backdrop ${
            acceptShow ? "active" : ""
          }`}
        >
          <div className="info__cards-remove-modal">
            <p className="info__cards-remove-modal-title">
              Ви дійсно бажаєте видалити картку клієнта?
            </p>
            <div className="info__cards-remove-modal-block">
              <button
                onClick={() => setAcceptShow(false)}
                className="info__cards-remove-modal-accept"
              >
                {t("Так")}
              </button>
              <button
                onClick={() => setAcceptShow(false)}
                className="info__cards-remove-modal-decline"
              >
                {t("Ні")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
