import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import correct from "../../assets/profile/correct.png";
import car from "../../assets/profile/car.png";
import flag from "../../assets/profile/flag.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Data = memo(() => {
  const [data, setData] = useState({
    idUser: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    numbersCar: [],
    balance: "0",
    historyPayment: [],
  });
  const [chagePhone, setChangePhone] = useState(false);
  const [chageName, setChangeName] = useState(false);
  const [chageEmail, setChangeEmail] = useState(false);
  const [lazyData, setLazyData] = useState(false);

  const { t, i18n } = useTranslation();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
      .then((res) => {
        setData(res.data.data);
        setLazyData(true);
      });
  }, [token]);

  // CHANGE PHONE
  const [acceptNumber, setAcceptNumber] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [phoneValueCorrect, setPhoneValueCorrect] = useState("");

  const changePhone = async () => {
    if (acceptNumber) {
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_SERVER}/user/change-phone`,
          {
            idUser: data.idUser,
            newPhone: phoneValueCorrect,
          }
        );
        setData({ ...data, phone: phoneValueCorrect });

        setChangePhone(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // CHANGE NAME
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");

  const changeName = async () => {
    if (firstNameValue === "" || lastNameValue === "") return;

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/change-name`,
        {
          idUser: data.idUser,
          firstName: firstNameValue,
          lastName: lastNameValue,
        }
      );
      setData({ ...data, firstName: firstNameValue, lastName: lastNameValue });
      setChangeName(false);
    } catch (err) {
      console.log(err);
    }
  };

  // CHANGE EMAIL
  const [emailValue, setEmailValue] = useState("");

  const changeEmail = async () => {
    if (emailValue === "") return;

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/change-email`,
        {
          idUser: data.idUser,
          email: emailValue,
        }
      );
      setData({ ...data, email: emailValue });
      setChangeEmail(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="profile__data">
      <div className="container">
        <Link to="/profile" className="profile__questions-back-desk">
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </Link>
        <h1 className="profile__data-title">{t("Особисті дані")}</h1>

        <div className="profile__data-content">
          <div className="profile__data-content-flex">
            <div className="profile__data-content-data">
              <div className="profile__data-content-data-block">
                <p className="profile__data-content-data-title">
                  {t("Номер телефону")}
                </p>
                <p
                  className="profile__data-content-data-text"
                  style={{ opacity: lazyData ? 1 : 0 }}
                >
                  {data.phone}
                </p>
              </div>
            </div>
            <button
              className="profile__data-content-correct"
              onClick={() => setChangePhone(true)}
            >
              <img
                className="profile__data-content-corrent-img"
                src={correct}
                alt="correct"
              />
              {t("Змінити номер")}
            </button>
          </div>

          <div className="profile__data-content-flex">
            <div className="profile__data-content-data">
              <div className="profile__data-content-data-block">
                <p className="profile__data-content-data-title">{t("Ім’я")}</p>
                <p
                  className="profile__data-content-data-text"
                  style={
                    data.firstName === ""
                      ? {
                          fontSize: "15px",
                          color: "rgba(0, 0, 0, 0.5)",
                          opacity: lazyData ? 1 : 0,
                        }
                      : { opacity: lazyData ? 1 : 0 }
                  }
                >
                  {data.firstName === ""
                    ? t("Тут буде ваше Ім’я")
                    : data.firstName}
                </p>
              </div>
              <div className="profile__data-content-data-block">
                <p className="profile__data-content-data-title">
                  {t("Прізвище")}
                </p>
                <p
                  className="profile__data-content-data-text "
                  style={
                    data.lastName === ""
                      ? {
                          fontSize: "15px",
                          color: "rgba(0, 0, 0, 0.5)",
                          opacity: lazyData ? 1 : 0,
                        }
                      : { opacity: lazyData ? 1 : 0 }
                  }
                >
                  {data.lastName === ""
                    ? t("Тут буде ваше Прізвище")
                    : data.lastName}
                </p>
              </div>
            </div>
            <button
              className="profile__data-content-correct"
              onClick={() => setChangeName(true)}
            >
              <img
                className="profile__data-content-corrent-img"
                src={correct}
                alt="correct"
              />
              {t("Змінити дані")}
            </button>
          </div>

          <div className="profile__data-content-flex">
            <div className="profile__data-content-data">
              <div className="profile__data-content-data-block">
                <p className="profile__data-content-data-title">
                  {t("Електронна пошта")}
                </p>
                <p
                  className="profile__data-content-data-text"
                  style={
                    !data.email
                      ? {
                          fontSize: "15px",
                          color: "rgba(0, 0, 0, 0.5)",
                          opacity: lazyData ? 1 : 0,
                        }
                      : { opacity: lazyData ? 1 : 0 }
                  }
                >
                  {!data.email ? t("Тут буде ваша пошта") : data.email}
                </p>
              </div>
            </div>
            <button
              className="profile__data-content-correct"
              onClick={() => setChangeEmail(true)}
            >
              <img
                className="profile__data-content-corrent-img"
                src={correct}
                alt="correct"
              />
              {t("Змінити пошту")}
            </button>
          </div>
          {/* <Link to="cars" className="profile__data-content-correct">
            <img
              className="profile__data-content-corrent-img"
              src={car}
              alt="correct"
            />
            Додати машину
          </Link> */}
        </div>
      </div>

      <Link to="/profile" className="profile__questions-back">
        <img className="profile__questions-back-icon" src={back} alt="back" />
      </Link>

      {/* CHANGE PHONE */}

      <div
        className={`profile__data-change-phone ${chagePhone ? "active" : ""}`}
      >
        <div className="container">
          <div className="profile__data-change-block">
            <div className="profile__data-change-block-back">
              <button
                className="profile__data-change-close-desk"
                onClick={() => setChangePhone(false)}
              >
                <img
                  className="profile__questions-back-icon"
                  src={back}
                  alt="back"
                />
              </button>
              <h3 className="profile__data-change-title">{t("Ваш телефон")}</h3>
            </div>

            <p className="profile__data-change-text">
              {t(
                "Введіть новий номер телефону, щоб далі користуватися мийками"
              )}
            </p>

            <label className="profile__data-change-edit">
              <img
                className="profile__data-change-edit-icon"
                src={flag}
                alt="change-icon"
              />
              <input
                type="text"
                onInput={({ target }) => {
                  setPhoneValue(target.value.replace(/[^\d]/g, ""));

                  const phoneNumber = target.value.replace(/[^\d]/g, "");

                  const regex = /^(\+?3?8)?(0\d{9})$/;

                  if (regex.test(phoneNumber)) {
                    const formattedPhoneNumber = phoneNumber.replace(
                      regex,
                      "+38$2"
                    );
                    setPhoneValueCorrect(formattedPhoneNumber);
                    setAcceptNumber(true);
                  } else {
                    setAcceptNumber(false);
                  }
                }}
                value={phoneValue}
                placeholder={t("Введіть новий номер")}
                className="profile__data-change-edit-input"
              />
            </label>
            <p className="profile__data-change-text">
              {t(
                "Використовуючи наш сайт оплати мийки, ви визнаєте та погоджуєтесь з нашою Політикою конфеденційності."
              )}
            </p>
          </div>
        </div>

        <button
          onClick={changePhone}
          className="profile__data-change-accept"
          style={{ opacity: acceptNumber ? 1 : 0.5 }}
        >
          {t("Підтвердити")}
        </button>

        <button
          className="profile__data-change-close"
          onClick={() => setChangePhone(false)}
        >
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </button>
      </div>

      {/* CHANGE NAME */}

      <div
        className={`profile__data-change-phone ${chageName ? "active" : ""}`}
      >
        <div className="container">
          <div className="profile__data-change-block">
            <div className="profile__data-change-block-back">
              <button
                className="profile__data-change-close-desk"
                onClick={() => setChangeName(false)}
              >
                <img
                  className="profile__questions-back-icon"
                  src={back}
                  alt="back"
                />
              </button>
              <h3 className="profile__data-change-title">{t("Ваші дані")}</h3>
            </div>

            <p className="profile__data-change-text">
              {t("Введіть нові дані, щоб далі користуватися мийками")}
            </p>

            <h4 className="profile__data-change-second">І’мя</h4>

            <label className="profile__data-change-edit">
              <input
                type="text"
                value={firstNameValue}
                onInput={({ target }) => setFirstNameValue(target.value)}
                placeholder={t("Введіть нове ім’я")}
                className="profile__data-change-edit-input"
              />
            </label>

            <h4 className="profile__data-change-second">{t("Прізвище")}</h4>

            <label className="profile__data-change-edit">
              <input
                type="text"
                value={lastNameValue}
                onInput={({ target }) => setLastNameValue(target.value)}
                placeholder={t("Введіть нове прізвище")}
                className="profile__data-change-edit-input"
              />
            </label>

            <p className="profile__data-change-text">
              {t(
                "Використовуючи наш сайт оплати мийки, ви визнаєте та погоджуєтесь з нашою Політикою конфеденційності."
              )}
            </p>
          </div>
        </div>

        <button
          onClick={changeName}
          className="profile__data-change-accept"
          style={{
            opacity: firstNameValue === "" || lastNameValue === "" ? 0.5 : 1,
          }}
        >
          {t("Підтвердити")}
        </button>

        <button
          className="profile__data-change-close"
          onClick={() => setChangeName(false)}
        >
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </button>
      </div>

      {/* CHANGE EMAIL */}

      <div
        className={`profile__data-change-phone ${chageEmail ? "active" : ""}`}
      >
        <div className="container">
          <div className="profile__data-change-block">
            <div className="profile__data-change-block-back">
              <button
                className="profile__data-change-close-desk"
                onClick={() => setChangeEmail(false)}
              >
                <img
                  className="profile__questions-back-icon"
                  src={back}
                  alt="back"
                />
              </button>
              <h3 className="profile__data-change-title">{t("Ваша пошта")}</h3>
            </div>

            <p className="profile__data-change-text">
              {t(
                "Введіть нову адресу електронної пошти, щоб далі користуватися мийками"
              )}
            </p>

            <label className="profile__data-change-edit">
              <input
                type="text"
                value={emailValue}
                onInput={({ target }) => setEmailValue(target.value)}
                placeholder={t("Введіть нову пошту")}
                className="profile__data-change-edit-input"
              />
            </label>

            <p className="profile__data-change-text">
              {t(
                "Використовуючи наш сайт оплати мийки, ви визнаєте та погоджуєтесь з нашою Політикою конфеденційності."
              )}
            </p>
          </div>
        </div>

        <button
          onClick={changeEmail}
          className="profile__data-change-accept"
          style={{
            opacity: emailValue === "" ? 0.5 : 1,
          }}
        >
          {t("Підтвердити")}
        </button>

        <button
          className="profile__data-change-close"
          onClick={() => setChangeEmail(false)}
        >
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </button>
      </div>
    </section>
  );
});

export default Data;
