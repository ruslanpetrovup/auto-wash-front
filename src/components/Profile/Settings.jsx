import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken } from "../../redux/slice/sliceUser.js";
import deleteProfile from "../../assets/profile/delete-profile.svg";
import outProfile from "../../assets/profile/out-profile.svg";
import back from "../../assets/profile/back.svg";
import iconLang from "../../assets/icons/select-lang.svg";
import { useTranslation } from "react-i18next";

const Settings = memo(() => {
  const token = useSelector((state) => state.user.token);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
      .then((res) => {
        setData(res.data.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const [outActive, setOutActive] = useState(false);
  const [deleteActive, setDeleteActive] = useState(false);
  const [isOpenLang, setIsOpenLang] = useState(false);

  const outProfileFunc = () => {
    setOutActive(true);
  };

  const deleteProfileFunc = () => {
    setDeleteActive(true);
  };

  const outProfileRequest = () => {
    localStorage.removeItem("token");
    dispatch(setToken(""));
    document.location.reload();
    navigate("/");
  };

  const deleteProfileRequest = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SERVER}/user/delete`, {
        idUser: data.idUser,
      });
      localStorage.removeItem("token");
      dispatch(setToken(""));
      document.location.reload();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [currentLang, setCurrentLang] = useState("");

  const changeLang = (lang) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    setIsOpenLang(false);
    return;
  };

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");
    if (!currentLang) return;
    setCurrentLang(currentLang);
  }, []);

  return (
    <section className="profile__settings">
      <div className="container">
        <Link to="/profile" className="profile__settings-back-desk">
          <img className="profile__settings-back-icon" src={back} alt="back" />
        </Link>
        <h2 className="profile__settings-title">{t("Налаштування")}</h2>
        <button
          className="profile__settings-out"
          onClick={
            JSON.stringify(data) === "{}"
              ? () => {
                  navigate("/phone");
                }
              : () => outProfileFunc()
          }
        >
          <img
            className="profile__settings-out-icon"
            alt="out-icon"
            src={outProfile}
          />
          {t("Вийти з аккаунту")}
        </button>
        <button
          className="profile__settings-out"
          style={{ marginTop: 35 }}
          onClick={() => setIsOpenLang(!isOpenLang)}
        >
          <img
            className="profile__settings-out-icon"
            alt="out-icon"
            src={iconLang}
          />
          {t("Вибір мови")}
        </button>
        <button
          className="profile__settings-delete"
          onClick={
            JSON.stringify(data) === "{}"
              ? () => {
                  navigate("/phone");
                }
              : () => deleteProfileFunc()
          }
        >
          <img
            className="profile__settings-out-icon"
            alt="out-icon"
            src={deleteProfile}
          />
          {t("Видалити аккаунт")}
        </button>
      </div>
      <Link to="/profile" className="profile__settings-back">
        <img className="profile__settings-back-icon" src={back} alt="back" />
      </Link>

      <div
        className={`profile__settings-accept-out ${outActive ? "active" : ""}`}
      >
        <h3 className="profile__settings-accept-out-title">
          {t("Ви дійсно бажаєте вийти з аккаунту ?")}
        </h3>
        <div className="profile__settings-accept-out-block">
          <button
            onClick={outProfileRequest}
            className="profile__settings-accept-out-block-yes"
          >
            {t("Так")}
          </button>
          <button
            className="profile__settings-accept-out-block-no"
            onClick={() => setOutActive(false)}
          >
            {t("Ні")}
          </button>
        </div>
      </div>

      <div
        className={`profile__settings-accept-delete ${
          deleteActive ? "active" : ""
        }`}
      >
        <h3 className="profile__settings-accept-delete-title">
          {t("Ви дійсно бажаєте видалити аккаунт ?")}
        </h3>
        <div className="profile__settings-accept-delete-block">
          <button
            className="profile__settings-accept-delete-block-yes"
            onClick={deleteProfileRequest}
          >
            {t("Так")}
          </button>
          <button
            className="profile__settings-accept-delete-block-no"
            onClick={() => setDeleteActive(false)}
          >
            {t("Ні")}
          </button>
        </div>
      </div>

      <div
        className={`profile__settings-backdrop ${isOpenLang ? "active" : ""}`}
      >
        <div className="profile__settings-backdrop-modal">
          <div
            className="select-lang"
            style={{ justifyContent: "space-around" }}
          >
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
    </section>
  );
});

export default Settings;
