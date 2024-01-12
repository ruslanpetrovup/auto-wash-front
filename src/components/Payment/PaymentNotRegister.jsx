import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import axios from "axios";
import { useTranslation } from "react-i18next";
const CryptoJS = require("crypto-js");

const publicKey = "sandbox_i98441757663";
const privateKey = "sandbox_JaBwypsn5eGVcDIIgWDcElXJy6NwEoRXFmh7UuGR";

const PaymentNotRegister = () => {
  const { id } = useParams();
  const navigation = useNavigate();

  const [sumValue, setSumValue] = useState("50");
  const { t } = useTranslation();

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
      } else {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER}/api/wash/${id}?locale=${currentLang}`
        );
        setCurrentWash(result.data);
        const newPosts = result.data.posts.map((item) => {
          return { ...item, selected: false };
        });
        setWashPosts(newPosts);
      }
    } catch (err) {
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

  const orderIdGenerate = String(Math.floor(Math.random() * 900000) + 100000);

  const json_string = {
    version: "3",
    public_key: publicKey,
    action: "pay",
    amount: sumValue,
    currency: "UAH",
    description: "Поповнення",
    // server_url: `https://auto-wash-back.onrender.com/user/payment`,
    result_url: `https://auto-wash-back.onrender.com/user/payment-not-register?order=${orderIdGenerate}`,
    order_id: orderIdGenerate,
  };
  const data = JSON.stringify(json_string).toString(CryptoJS.enc.Base64);

  const signature = CryptoJS.SHA1(privateKey + data + privateKey).toString(
    CryptoJS.enc.Base64
  );

  const createOrderMiddle = async () => {
    const dataWash = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/wash/${id}`
    );
    await axios.post(
      `${process.env.REACT_APP_SERVER}/user/payment-create-not-register`,
      {
        orderId: orderIdGenerate,
        washId: id,
        washNumberPost: selectPost,
        titleWash: dataWash.data.title,
        addressWash: dataWash.data.address,
      }
    );
  };

  const createOrder = async (e) => {
    e.preventDefault();

    if (selectPost === "") return;
    if (sumValue === "") return;

    await createOrderMiddle();

    document.getElementById("payment-form").submit();
  };

  const checkSelectedPost = useMemo(() => {
    if (washPosts.length === 0) return false;

    const selectedPost = washPosts.find((item) => item.selected === true);
    if (selectedPost === undefined) return false;

    return true;
  }, [washPosts]);

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
                {" "}
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
                  >
                    200
                  </button>
                </div>
              </div>
            </div>

            <form
              onSubmit={createOrder}
              method="POST"
              action="https://www.liqpay.ua/api/3/checkout"
              accept-charset="utf-8"
              id="payment-form"
            >
              <input type="hidden" name="data" value={data} />
              <input type="hidden" name="signature" value={signature} />
              <button
                disabled={!checkSelectedPost}
                className="payment__content-pay"
                style={{ opacity: checkSelectedPost ? 1 : 0.5 }}
              >
                {t("Поповнити мийку")}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Link to="/wash" className="profile__questions-back">
        <img className="profile__questions-back-icon" src={back} alt="back" />
      </Link>
    </section>
  );
};

export default PaymentNotRegister;
