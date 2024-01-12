import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import logo from "../../assets/logo-cmb.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slice/sliceUser";
import { useTranslation } from "react-i18next";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

import lang from "../../assets/icons/lang.svg";

const CheckCode = ({ setIsAuthenticated }) => {
  const [timer, setTimer] = useState(45);

  useEffect(() => {
    const startTimer = setInterval(() => {
      if (timer > 0) {
        React.startTransition(() => {
          setTimer(timer - 1);
        });
      }
    }, 1000);

    return () => clearInterval(startTimer);
  }, [timer]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [sendActive, setSendActive] = useState(false);
  const [allNumberValue, setAllNumberValue] = useState("");
  const [numberOneValue, setNumberOneValue] = useState("");
  const [numberTwoValue, setNumberTwoValue] = useState("");
  const [numberThreeValue, setNumberThreeValue] = useState("");
  const [numberFourValue, setNumberFourValue] = useState("");
  const [errorCode, setErrorCode] = useState(false);

  const openSend = () => {
    setSendActive(!sendActive);
  };

  const { number } = useParams();

  const requestCode = async () => {
    if (
      !numberOneValue ||
      !numberTwoValue ||
      !numberThreeValue ||
      !numberFourValue
    ) {
      return;
    }

    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/login`,
        {
          number,
          code: `${
            numberOneValue + numberTwoValue + numberThreeValue + numberFourValue
          }`,
        }
      );
      setIsAuthenticated(true);
      localStorage.setItem("token", result.data);
      dispatch(setToken(result.data));

      setTimeout(() => {
        navigate("/info");
      }, 150);
    } catch (err) {
      setErrorCode(true);
      console.log(err);
    }
  };

  const requestCodeDesk = async () => {
    if (allNumberValue === "") return;
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER}/user/login`,
        {
          number,
          code: `${allNumberValue}`,
        }
      );
      setIsAuthenticated(true);
      localStorage.setItem("token", result.data);
      dispatch(setToken(result.data));

      setTimeout(() => {
        navigate("/info");
      }, 150);
    } catch (err) {
      setErrorCode(true);
      console.log(err);
    }
  };

  const againSendCode = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER}/user/check-code`, {
      number,
    });

    setSendActive(false);
  };

  const changeFocus = (input) => {
    if (input.value.length >= input.maxLength) {
      var nextInput = input.parentElement?.nextElementSibling?.firstChild;

      if (nextInput != null) {
        nextInput?.focus();
      }
    } else if (input.value.length === 0) {
      var prevInput = input.parentElement?.previousElementSibling?.firstChild;
      if (prevInput != null) {
        prevInput?.focus();
      }
    }
  };

  return (
    <>
      <section className="number-phone">
        <div className="container">
          <div className="number-phone__block">
            <h1 className="number-phone__second">{t("Введіть код з СМС")}</h1>
            <Formik
              initialValues={{
                number1: "",
                number2: "",
                number3: "",
                number4: "",
              }}
              onSubmit={requestCode}
            >
              {() => (
                <Form className="number-phone__form">
                  <ul className="number-phone__form-numbers">
                    <li className="number-phone__form-numbers-item">
                      <Field
                        onInput={({ target }) => {
                          const value = target.value.replace(/[^\d]/g, "");
                          if (value !== "") {
                            changeFocus(target);
                          }

                          setNumberOneValue(value);
                        }}
                        autocomplete="off"
                        value={numberOneValue}
                        id="numberOne"
                        className="number-phone__form-number"
                        style={{
                          border: errorCode
                            ? "2px solid red"
                            : "2px solid black",
                        }}
                        onFocus={() => setErrorCode(false)}
                        type="tel"
                        name="number1"
                        maxLength={1}
                      />
                    </li>
                    <li className="number-phone__form-numbers-item">
                      <Field
                        onInput={({ target }) => {
                          const value = target.value.replace(/[^\d]/g, "");
                          setNumberTwoValue(value);
                          if (value !== "") {
                            changeFocus(target);
                          }
                          if (numberTwoValue.length > value.length) {
                            changeFocus(target);
                          }
                        }}
                        autocomplete="off"
                        value={numberTwoValue}
                        id="numberTwo"
                        className="number-phone__form-number"
                        style={{
                          border: errorCode
                            ? "2px solid red"
                            : "2px solid black",
                        }}
                        onFocus={() => setErrorCode(false)}
                        type="tel"
                        name="number2"
                        maxLength="1"
                      />
                    </li>
                    <li className="number-phone__form-numbers-item">
                      <Field
                        onInput={({ target }) => {
                          const value = target.value.replace(/[^\d]/g, "");
                          setNumberThreeValue(value);
                          if (value !== "") {
                            changeFocus(target);
                          }
                          if (numberThreeValue.length > value.length) {
                            changeFocus(target);
                          }
                        }}
                        autocomplete="off"
                        value={numberThreeValue}
                        id="numberThree"
                        className="number-phone__form-number"
                        style={{
                          border: errorCode
                            ? "2px solid red"
                            : "2px solid black",
                        }}
                        onFocus={() => setErrorCode(false)}
                        type="tel"
                        name="number3"
                        maxLength={1}
                      />
                    </li>
                    <li className="number-phone__form-numbers-item">
                      <Field
                        onInput={({ target }) => {
                          const value = target.value.replace(/[^\d]/g, "");
                          setNumberFourValue(value);
                          if (value !== "") {
                            changeFocus(target);
                          }
                          if (numberFourValue.length > value.length) {
                            changeFocus(target);
                          }
                        }}
                        autocomplete="off"
                        value={numberFourValue}
                        id="numberFour"
                        className="number-phone__form-number"
                        style={{
                          border: errorCode
                            ? "2px solid red"
                            : "2px solid black",
                        }}
                        onFocus={() => setErrorCode(false)}
                        type="tel"
                        name="number4"
                        maxLength={1}
                      />
                    </li>
                  </ul>
                  <button type="submit" className="number-phone__form-button">
                    {t("Далі")}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="number-phone__code">
              <button className="number-phone__code-open" onClick={openSend}>
                {t("Мені не прийшов код")}
              </button>

              <div
                className={`number-phone__code-send ${
                  sendActive ? "active" : ""
                }`}
              >
                <h2 className="number-phone__code-send-title">
                  {t("Не прийшов код в СМС?")}
                </h2>
                <p className="number-phone__code-send-text">
                  {t("Не хвилюйся, тицяй")}
                </p>

                <button
                  className="number-phone__code-send-button"
                  onClick={againSendCode}
                >
                  {t("Відправити ще раз")}
                </button>
              </div>
            </div>

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
                {t("Вхід по номеру")} {number}
              </p>
              <p className="number-phone-desk-content-notification">
                {t("SMS Пароль надіслано на Ваш мобільний пристрій")} {number}.
                {t("Термін дії одноразового пароля обмежений – 3 хв.")}
              </p>

              <div className="number-phone-desk-content-password">
                <div className="number-phone-desk-content-password-block">
                  <input
                    type="text"
                    onInput={({ target }) => {
                      const value = target.value.replace(/[^\d]/g, "");
                      setAllNumberValue(value);
                    }}
                    value={allNumberValue}
                    className="number-phone-desk-content-password-block-input"
                    placeholder={t("Пароль із SMS")}
                  />
                </div>
                <div className="number-phone-desk-content-password-again">
                  {timer > 0 ? (
                    <>
                      <p className="number-phone-desk-content-password-again-text">
                        {t("Ви можете повторно відправити через")} <br /> 0:
                        {timer}
                      </p>
                    </>
                  ) : (
                    <>
                      <button
                        style={{
                          color: "#0F84F0",
                          fontFamily: "Montserrat",
                          fontSize: "15px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          textDecorationLine: "underline",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                        onClick={async () => {
                          await againSendCode();
                          NotificationManager.success(
                            t("Код було відправлено"),
                            t("Успіх")
                          );
                          setTimer(45);
                        }}
                      >
                        {t("Відправити код ще раз")}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <NotificationContainer />
              <button
                type="submit"
                className={`number-phone__form-desk-button ${
                  allNumberValue === "" ? "" : "active"
                }`}
                onClick={() => {
                  if (allNumberValue === "") {
                    return;
                  } else {
                    requestCodeDesk();
                  }
                }}
              >
                {t("Далі")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckCode;
