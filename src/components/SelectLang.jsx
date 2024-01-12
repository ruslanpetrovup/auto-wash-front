import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import logo from "../assets/logo-cmb.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SelectLang = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("");

  const navigate = useNavigate();

  const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    navigate("/");
    return;
  };

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");
    if (!currentLang) return;
    setCurrentLang(currentLang);
  }, []);

  return (
    <section className="number-phone">
      <div className="container">
        <div className="number-phone__block" style={{ display: "block" }}>
          <h1 className="number-phone__title">{t("Choose language")}</h1>
          <div className="select-lang">
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
          <a className="number-phone__logo" href="/">
            <img
              className="number-phone__logo-icon"
              src={logo}
              alt="logo-cmb"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SelectLang;
