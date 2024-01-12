import React, { memo } from "react";
import { Link } from "react-router-dom";
import Icon from "./hooks/Icon";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo-cmb.png";

const Footer = memo(({ current = "" }) => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__block">
          <ul className="footer__menu">
            <li className="footer__menu-item">
              <Link
                to="/info"
                className={`footer__menu-link ${
                  current === "home" ? "active" : ""
                }`}
              >
                <Icon id="house" />
                <p className="footer__menu-link-title">{t("Головна")}</p>
              </Link>
            </li>
            <li className="footer__menu-item">
              <Link
                to="/promotions"
                className={`footer__menu-link ${
                  current === "promotions" ? "active" : ""
                }`}
              >
                <Icon id="dis" />
                <p className="footer__menu-link-title">{t("Акції")}</p>
              </Link>
            </li>
            <li className="footer__menu-item">
              <Link
                to="/wash"
                className={`footer__menu-link ${
                  current === "wash" ? "active" : ""
                }`}
              >
                <Icon id="car" />
                <p className="footer__menu-link-title">{t("Мийки")}</p>
              </Link>
            </li>
            <li className="footer__menu-item">
              <Link
                to="/history-order"
                className={`footer__menu-link ${
                  current === "history" ? "active" : ""
                }`}
              >
                <Icon id="history" />
                <p className="footer__menu-link-title">{t("Історія")}</p>
              </Link>
            </li>
            <li className="footer__menu-item">
              <Link
                to="/profile"
                className={`footer__menu-link ${
                  current === "profile" ? "active" : ""
                }`}
              >
                <Icon id="human" />
                <p className="footer__menu-link-title">{t("Профіль")}</p>
              </Link>
            </li>
          </ul>
          <ul className="footer__menu-desk">
            <li className="footer__menu-desk-button">
              <Link
                to="/info"
                className={`footer__menu-desk-button-link ${
                  current === "home" ? "active" : ""
                }`}
              >
                <img className="footer__menu-desk-button-icon" src={logo} />
              </Link>
            </li>
            <li className="footer__menu-desk-item">
              <Link
                to="/info"
                className={`footer__menu-desk-link ${
                  current === "home" ? "active" : ""
                }`}
              >
                <p className="footer__menu-desk-link-title">{t("Головна")}</p>
              </Link>
            </li>
            <li className="footer__menu-desk-item">
              <Link
                to="/promotions"
                className={`footer__menu-desk-link ${
                  current === "promotions" ? "active" : ""
                }`}
              >
                <p className="footer__menu-desk-link-title">{t("Акції")}</p>
              </Link>
            </li>
            <li className="footer__menu-desk-item">
              <Link
                to="/wash"
                className={`footer__menu-desk-link ${
                  current === "wash" ? "active" : ""
                }`}
              >
                <p className="footer__menu-desk-link-title">{t("Мийки")}</p>
              </Link>
            </li>
            <li className="footer__menu-desk-item">
              <Link
                to="/history-order"
                className={`footer__menu-desk-link ${
                  current === "history" ? "active" : ""
                }`}
              >
                <p className="footer__menu-desk-link-title">{t("Історія")}</p>
              </Link>
            </li>
            <li className="footer__menu-desk-profile">
              <Link
                to="/profile"
                className={`footer__menu-desk-profile-link ${
                  current === "profile" ? "active" : ""
                }`}
              >
                <Icon id="human" classEl="footer__menu-desk-link-icon" />
                <p className="footer__menu-desk-profile-link-title">
                  {t("Профіль")}
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
