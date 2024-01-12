import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import plus from "../../assets/profile/plus.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Cars = () => {
  const [data, setData] = useState({});

  const token = useSelector((state) => state.user.token);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
      .then((res) => setData(res.data.data));
  }, [token]);

  const [addCarActive, setAddCarActive] = useState(false);

  const [carNumber, setCarNumber] = useState("");

  const addCarFunc = () => {
    if (carNumber === "") return;

    axios.post(`${process.env.REACT_APP_SERVER}/user/add-auto`, {
      idUser: data.idUser,
      auto: carNumber,
    });
  };
  return (
    <section className="profile__data-cars">
      <div className="container">
        <div className="profile__data-cars-block">
          <ul className="profile__data-cars-list">
            {data?.numbersCar?.length !== 0 ? (
              data?.numbersCar?.map((item) => (
                <li className="profile__data-cars-list-item">
                  <div className="profile__data-content-data-block">
                    <p className="profile__data-content-data-title">
                      {t("Номер авто")}
                    </p>
                    <p
                      className="profile__data-content-data-text"
                      style={{ justifyContent: "center" }}
                    >
                      {item}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <li className="profile__data-cars-list-item">
                <div className="profile__data-content-data-block">
                  <p className="profile__data-content-data-title">
                    {t("Номер авто")}
                  </p>
                  <p
                    className="profile__data-content-data-text"
                    style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.5)" }}
                  >
                    {t("Тут буде номер вашого авто")}
                  </p>
                </div>
              </li>
            )}
          </ul>

          <button
            className="profile__data-content-correct"
            onClick={() => setAddCarActive(true)}
          >
            <img
              className="profile__data-content-corrent-img"
              src={plus}
              alt="plus"
            />
            {t("Додати автомобіль")}
          </button>
        </div>

        <Link to="/profile/data" className="profile__questions-back">
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </Link>
      </div>

      <div
        className={`profile__data-change-phone ${addCarActive ? "active" : ""}`}
      >
        <div className="container">
          <div className="profile__data-change-block">
            <h3 className="profile__data-change-title">
              {t("Додати автомобіль")}
            </h3>

            <p className="profile__data-change-text">
              {t(
                "Введіть новий номер автомобіля, щоб далі користуватися мийками"
              )}
            </p>

            <label
              className="profile__data-change-edit"
              style={{ justifyContent: "center" }}
            >
              <input
                type="text"
                value={carNumber}
                onInput={({ target }) => setCarNumber(target.value)}
                placeholder="Введіть номер авто"
                className="profile__data-change-edit-input"
                style={{ textAlign: "center" }}
              />
            </label>

            <p className="profile__data-change-text">
              {t(`Використовуючи наш сайт оплати мийки, ви визнаєте та погоджуєтесь
              з нашою Політикою конфеденційності.`)}
            </p>
          </div>
        </div>

        <button onClick={addCarFunc} className="profile__data-change-accept">
          {t("Підтвердити")}
        </button>

        <button
          className="profile__data-change-close"
          onClick={() => setAddCarActive(false)}
        >
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </button>
      </div>
    </section>
  );
};

export default Cars;
