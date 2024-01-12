import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const CryptoJS = require("crypto-js");

const publicKey = "sandbox_i98441757663";
const privateKey = "sandbox_JaBwypsn5eGVcDIIgWDcElXJy6NwEoRXFmh7UuGR";

const Payment = () => {
  const { id } = useParams();
  const [dataWash, setDataWash] = useState({});

  useEffect(() => {
    const currentLang = localStorage.getItem("lang");
    if (!currentLang) {
      axios
        .get(`${process.env.REACT_APP_SERVER}/api/wash/${id}`)
        .then((res) => {
          setDataWash(res.data);
        });
    } else {
      axios
        .get(
          `${process.env.REACT_APP_SERVER}/api/wash/${id}?locale=${currentLang}`
        )
        .then((res) => {
          setDataWash(res.data);
        });
    }
  }, [id]);
  const [acceptNumber, setAcceptNumber] = useState(false);
  const [errorNumber, setErrorNumber] = useState(false);
  const [numberValue, setNumberValue] = useState("");
  const [sumValue, setSumValue] = useState("50");
  const [currentNumber, setCurrentNumber] = useState("");
  const { t } = useTranslation();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    try {
      axios
        .post(`${process.env.REACT_APP_SERVER}/user/verify`, { token })
        .then((res) => {
          setCurrentNumber(res.data.data.phone);
          setNumberValue(res.data.data.phone);
        });
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  useEffect(() => {
    const phoneNumber = numberValue;

    const regex = /^(\+?3?8)?(0\d{9})$/;

    if (regex.test(phoneNumber)) {
      const formattedPhoneNumber = phoneNumber.replace(regex, "+38$2");

      setCurrentNumber(formattedPhoneNumber);
      setAcceptNumber(true);
    } else {
      setAcceptNumber(false);
    }
  }, [numberValue]);

  useEffect(() => {
    document.body.style.backgroundColor = "white";

    return () => {
      document.body.style.backgroundColor = "#0F84F0";
    };
  }, []);

  const orderIdGenerate = String(Math.floor(Math.random() * 900000) + 100000);

  const json_string = {
    version: "3",
    public_key: publicKey,
    action: "pay",
    amount: sumValue,
    currency: "UAH",
    description: "Поповнення",
    // server_url: `https://auto-wash-back.onrender.com/user/payment`,
    result_url: `https://auto-wash-back.onrender.com/user/payment?order=${orderIdGenerate}`,
    order_id: orderIdGenerate,
  };
  const data = JSON.stringify(json_string).toString(CryptoJS.enc.Base64);

  const signature = CryptoJS.SHA1(privateKey + data + privateKey).toString(
    CryptoJS.enc.Base64
  );

  const createOrderMiddle = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER}/user/payment-create`, {
      number: currentNumber,
      orderId: orderIdGenerate,
      washId: id,
      titleWash: dataWash.title,
      addressWash: dataWash.address,
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();
    if (numberValue === "") return;
    if (!acceptNumber) {
      e.preventDefault();
      setErrorNumber(true);

      setTimeout(() => {
        setErrorNumber(false);
      }, 3000);
      return;
    }

    await createOrderMiddle();

    document.getElementById("payment-form").submit();
  };

  const prevPath = () => {
    if (!localStorage.getItem("history-path")) {
      return null;
    }
    const history = JSON.parse(localStorage.getItem("history-path"));

    return history.path;
  };
  return (
    <section className="payment">
      <div className="payment__header">
        <div className="header">
          <h1 className="payment__header-title">{t("Поповнення")}</h1>
        </div>
      </div>
      <div className="payment__content">
        <div className="payment__content-block">
          <div className="container">
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
              <button className="payment__content-pay">{t("Поповнити")}</button>
            </form>
          </div>
        </div>
      </div>

      <Link
        to={prevPath() ? prevPath() : "/info"}
        className="profile__questions-back"
      >
        <img className="profile__questions-back-icon" src={back} alt="back" />
      </Link>
    </section>
  );
};

export default Payment;
