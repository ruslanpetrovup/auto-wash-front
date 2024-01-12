import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo-cmb.png";

import lang from "../assets/icons/lang.svg";

const SelectLogin = () => {
  const { t, i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState("");

  const navigate = useNavigate();

  const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    // navigate("/");
  };

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");
    if (!currentLang) return;
    setCurrentLang(currentLang);

    document.body.style.backgroundColor = "#0F84F0";
  }, []);
  return (
    <>
      <section className="select-login">
        <div className="container">
          <div className="select-login-block">
            <h1 className="number-phone__title">{t("Вхід в кабінет")}</h1>

            <button
              className="number-phone__form-button"
              type="button"
              onClick={() => navigate("/phone")}
            >
              {t("Реєстрація")}
            </button>
            <button
              className="number-phone__form-button"
              type="button"
              style={{
                fontSize: 24,
                padding: "6px 10px",
                whiteSpace: "nowrap",
              }}
              onClick={() => navigate("/info")}
            >
              {t("Вхід без реєстрації")}
            </button>

            <div className="select-lang" style={{ marginTop: 30 }}>
              <button
                className={`select-lang-button ${
                  currentLang === "ua" ? "active" : ""
                }`}
                onClick={() => changeLang("ua")}
              >
                ua
              </button>
              <button
                className={`select-lang-button ${
                  currentLang === "ru" ? "active" : ""
                }`}
                onClick={() => changeLang("ru")}
              >
                ru
              </button>
              <button
                className={`select-lang-button ${
                  currentLang === "en" ? "active" : ""
                }`}
                onClick={() => changeLang("en")}
              >
                en
              </button>
            </div>
          </div>
        </div>
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
        <a className="number-phone__logo" href="/">
          <img className="number-phone__logo-icon" src={logo} alt="logo-cmb" />
        </a>
      </section>
    </>
  );
};

export default SelectLogin;
