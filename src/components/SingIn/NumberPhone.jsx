import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import logo from "../../assets/logo-cmb.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import lang from "../../assets/icons/lang.svg";
import { useTranslation } from "react-i18next";

const NumberPhone = () => {
  const [acceptNumber, setAcceptNumber] = useState(false);
  const [errorNumber, setErrorNumber] = useState(false);
  const [numberInput, setNumberInput] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    const phoneNumber = numberInput;

    const regex = /^(\+?3?8)?(0\d{9})$/;

    if (regex.test(phoneNumber)) {
      const formattedPhoneNumber = phoneNumber.replace(regex, "+38$2");

      setCurrentNumber(formattedPhoneNumber);
      setAcceptNumber(true);
    } else {
      setAcceptNumber(false);
    }
  }, [numberInput]);

  const submitNumber = async (value) => {
    if (!acceptNumber) {
      setErrorNumber(true);

      setTimeout(() => {
        setErrorNumber(false);
      }, 3000);
      return;
    }
    axios
      .post(`${process.env.REACT_APP_SERVER}/user/check-code`, {
        number: currentNumber,
      })
      .then(() => {
        navigate(`/signin/${currentNumber}`);
      });
  };

  return (
    <section className="number-phone">
      <div className="container">
        <div className="number-phone__block">
          <button
            style={{
              position: "absolute",
              top: 23,
              right: 23,
              borderRadius: 8,
              background: "#FFF",
              boxShadow: "3px 4px 4px 0px rgba(0, 0, 0, 0.40)",
            }}
            onClick={() => navigate("/lang")}
            className="number-phone-lang"
          >
            <img className="number-phone-lang-icon" src={lang} />
          </button>
          <h1 className="number-phone__title">{t("Вхід в кабінет")}</h1>
          <Formik initialValues={{ phone: "" }}>
            {() => (
              <Form className="number-phone__form">
                <Field
                  className="number-phone__form-phone"
                  type="text"
                  name="phone"
                  placeholder={t("Введіть свій номер телефону")}
                  onInput={({ target }) =>
                    setNumberInput(target.value.replace(/[^\d]/g, ""))
                  }
                  value={numberInput}
                />
                <p
                  className={`number-phone__form-error ${
                    errorNumber ? "active" : ""
                  }`}
                >
                  {t("некоректні дані")}
                </p>
                <button
                  className="number-phone__form-button"
                  type="button"
                  onClick={submitNumber}
                >
                  {t("Далі")}
                </button>
              </Form>
            )}
          </Formik>

          <a className="number-phone__logo" href="/">
            <img
              className="number-phone__logo-icon"
              src={logo}
              alt="logo-cmb"
            />
          </a>
        </div>
        <div className="number-phone-desk__block">
          <div className="number-phone-desk-head">
            <img className="number-phone-desk-head-logo" src={logo} />

            <div className="number-phone-desk-head-lang">
              <button
                style={{
                  borderRadius: 8,
                  background: "#FFF",
                  boxShadow: "3px 4px 4px 0px rgba(0, 0, 0, 0.40)",
                }}
                onClick={() => navigate("/lang")}
                className="number-phone-lang"
              >
                <img className="number-phone-lang-icon" src={lang} />
              </button>
            </div>
          </div>
          <div className="number-phone-desk-content">
            <h1 className="number-phone-desk-content-title">{t("Логін")}</h1>
            <p className="number-phone-desk-content-second">
              {t("Введіть номер телефону для входу в особистий кабінет")}
            </p>

            <Formik initialValues={{ phone: "" }}>
              {() => (
                <Form className="number-phone__form-desk">
                  <Field
                    className="number-phone__form-desk-phone"
                    type="text"
                    name="phone"
                    placeholder={t("Номер телефону")}
                    onInput={({ target }) =>
                      setNumberInput(target.value.replace(/[^\d]/g, ""))
                    }
                    value={numberInput}
                  />
                  <p
                    className={`number-phone__form-desk-error ${
                      errorNumber ? "active" : ""
                    }`}
                  >
                    {t("некоректні дані")}
                  </p>
                  <button
                    className={`number-phone__form-desk-button ${
                      numberInput === "" ? "" : "active"
                    }`}
                    type="button"
                    onClick={submitNumber}
                  >
                    {t("Далі")}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NumberPhone;
