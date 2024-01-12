import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const PaymentPost = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const [dataUser, setDataUser] = useState({});

  const [numberValue, setNumberValue] = useState("");
  const [sumValue, setSumValue] = useState("50");
  const [currentNumber, setCurrentNumber] = useState("");

  const token = useSelector((state) => state.user.token);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      axios
        .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
        .then((res) => {
          setCurrentNumber(res.data.data.phone);
          setNumberValue(res.data.data.phone);
          setDataUser(res.data.data);
        });
    } catch (err) {
      navigation("/404");
    }
  }, [token]);

  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "#0F84F0";
    };
  }, []);

  const [currentWash, setCurrentWash] = useState({});
  const [washPosts, setWashPosts] = useState([]);
  const [selectPost, setSelectPost] = useState("");

  const changeSelected = (number) => {
    if (selectPost === number) {
      return setSelectPost("");
    }
    setSelectPost(number);
  };

  const getWashPosts = async () => {
    try {
      const currentLang = localStorage.getItem("lang");
      if (!currentLang) {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/wash/${id}`
        );
        setCurrentWash(result.data);
        const newPosts = result.data.posts.map((item) => {
          return { ...item, selected: false };
        });
        setWashPosts(newPosts);

        if (result.response.status === 404) {
          return navigation("/404");
        }
      } else {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/wash/${id}?locale=${currentLang}`
        );
        setCurrentWash(result.data);
        const newPosts = result.data.posts.map((item) => {
          return { ...item, selected: false };
        });
        setWashPosts(newPosts);

        if (result.response.status === 404) {
          return navigation("/404");
        }
      }
    } catch (err) {
      console.log(err.response.status === 404);
      if (err.response.status === 404) {
        return navigation("/404");
      }
    }
  };

  useEffect(() => {
    const changePosts = washPosts.map((item) => {
      if (item.number === selectPost) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setWashPosts(changePosts);
  }, [selectPost]);

  useEffect(() => {
    getWashPosts();
  }, [id]);

  const checkSelectedPost = useMemo(() => {
    if (washPosts.length === 0) return false;

    const selectedPost = washPosts.find((item) => item.selected === true);
    if (selectedPost === undefined) return false;

    return true;
  }, [washPosts]);

  const checkUserBalanceWash = () => {
    if (Object.keys(dataUser).length === 0) return false;

    const curentWashBalance = dataUser.balanceWash.find(
      (item) => item.id === id
    );
    if (curentWashBalance === undefined) {
      // NotificationManager.error("Поповніть свій баланс", "Недостатньо коштів.");

      return false;
    }
    return curentWashBalance.balance >= "200" ? false : true;
  };

  return (
    <section className="payment">
      <div className="payment__header">
        <ul className="payment__header__posts">
          {washPosts.length === 0 ? (
            <></>
          ) : (
            <>
              {washPosts.map((item) => {
                if (selectPost === "") {
                  return (
                    <li className="payment__header__posts-item">
                      <button
                        className="payment__header__posts-button"
                        onClick={() => changeSelected(item.number)}
                      >
                        {item.number}
                      </button>
                    </li>
                  );
                } else {
                  return (
                    <li className="payment__header__posts-item">
                      <button
                        className={`payment__header__posts-button ${
                          item.selected ? "active" : "not-active"
                        }`}
                        onClick={() => changeSelected(item.number)}
                      >
                        {item.number}
                      </button>
                    </li>
                  );
                }
              })}
            </>
          )}
        </ul>
      </div>
      <div className="payment__content">
        <div className="payment__content-block">
          <div className="container">
            <div className="payment__content-info">
              <div className="payment__content-info-title">
                <p className="payment__content-info-title-text">
                  {Object.keys(currentWash).length === 0
                    ? ""
                    : currentWash.title}
                </p>
              </div>
              <div className="payment__content-info-number">
                <p className="payment__content-info-number-text">
                  Пост №{selectPost === "" ? "" : selectPost}
                </p>
              </div>
            </div>
            <div className="payment__content-sum">
              <h2 className="payment__content-sum-title">
                {t("Сума поповнення")}
              </h2>

              <div className="payment__content-sum-block">
                <label className="payment__content-sum-input-label">
                  <input
                    className="payment__content-sum-input"
                    value={sumValue}
                    onInput={({ target }) => setSumValue(target.value)}
                  />
                  <p className="payment__content-sum-input-text">грн</p>
                </label>

                <div className="payment__content-sum-variant">
                  <button
                    className="payment__content-sum-variant-button"
                    onClick={() => setSumValue("100")}
                  >
                    100
                  </button>
                  <button
                    onClick={() => setSumValue("200")}
                    className="payment__content-sum-variant-button"
                    style={{
                      opacity: checkUserBalanceWash() ? 1 : 0.5,
                    }}
                    disabled={checkUserBalanceWash()}
                  >
                    200
                  </button>
                </div>
              </div>
            </div>

            <button
              className="payment__content-pay"
              style={{ opacity: checkSelectedPost ? 1 : 0.5 }}
            >
              {t("Оплатити мийку")}
            </button>
          </div>
        </div>
      </div>

      <Link to={`/wash/${id}`} className="profile__questions-back">
        <img className="profile__questions-back-icon" src={back} alt="back" />
      </Link>

      <NotificationContainer />
    </section>
  );
};

export default PaymentPost;
