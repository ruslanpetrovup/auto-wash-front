import React, { memo } from "react";
import { Link } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import questions1 from "../../assets/profile/questions-1.png";
import questions2 from "../../assets/profile/questions-2.png";
import questions3 from "../../assets/profile/questions-3.png";
import questions4 from "../../assets/profile/questions-4.png";
import { useTranslation } from "react-i18next";

const dataTest = [
  {
    id: "1",
    title: "Сканував QR-код",
    desc: "Що робити далі?",
    content: `Після сканування QR-коду, потрібно буде внести гроші в апарат. 

    Просто натисність на головному екрані кнопку з номером свого поста. 
    
    Далі слідкуйте інструкції. 
    Виберіть спосіб оплати 
    ( ApplePay, GooglePay чи карткою). 
    
    Вводіть суму, чи вибирайте з доступних.
    
    Після оплати, сума грошей з’явиться на екрані Вашого поста на мийці. 
    
    `,
    image: questions1,
  },
  {
    id: "2",
    title: "Залишились “зайві” гроші в автоматі",
    desc: "Куди вони дінуться ?",
    content: `Після сканування QR-коду, потрібно буде внести гроші в апарат. 

    Просто натисність на головному екрані кнопку з номером свого поста. 
    
    Далі слідкуйте інструкції. 
    Виберіть спосіб оплати 
    ( ApplePay, GooglePay чи карткою). 
    
    Вводіть суму, чи вибирайте з доступних.
    
    Після оплати, сума грошей з’явиться на екрані Вашого поста на мийці. 
    
    `,
    image: questions2,
  },
  {
    id: "3",
    title: "Як правильно мити авто ?",
    desc: "Поради від власника",
    content: `Після сканування QR-коду, потрібно буде внести гроші в апарат. 

    Просто натисність на головному екрані кнопку з номером свого поста. 
    
    Далі слідкуйте інструкції. 
    Виберіть спосіб оплати 
    ( ApplePay, GooglePay чи карткою). 
    
    Вводіть суму, чи вибирайте з доступних.
    
    Після оплати, сума грошей з’явиться на екрані Вашого поста на мийці. 
    
    `,
    image: questions3,
  },
  {
    id: "4",
    title: "Навіщо Вам карта клієнта ?",
    desc: "Кілька аргументів",
    content: `Після сканування QR-коду, потрібно буде внести гроші в апарат. 

    Просто натисність на головному екрані кнопку з номером свого поста. 
    
    Далі слідкуйте інструкції. 
    Виберіть спосіб оплати 
    ( ApplePay, GooglePay чи карткою). 
    
    Вводіть суму, чи вибирайте з доступних.
    
    Після оплати, сума грошей з’явиться на екрані Вашого поста на мийці. 
    
    `,
    image: questions4,
  },
];

const Questions = memo(({ data }) => {
  const { t, i18n } = useTranslation();
  return (
    <section className="profile__questions">
      <div className="container">
        <Link to="/profile" className="profile__questions-back-desk">
          <img className="profile__questions-back-icon" src={back} alt="back" />
        </Link>
        <h1 className="profile__questions-title">
          {t("Відповіді на запитання")}
        </h1>

        <ul
          className="profile__questions-list"
          style={{ opacity: Object.keys(data).length === 0 ? 0 : 1 }}
        >
          {data.map((item) => (
            <li className="profile__questions-list-item" key={item.id}>
              <Link
                to={`/profile/questions/${item.id}`}
                className="profile__questions-list-link"
              >
                <div className="profile__questions-list-link-content">
                  <h2 className="profile__questions-list-link-content-title">
                    {item.title}
                  </h2>
                  <p className="profile__questions-list-link-content-desc">
                    {item.description}
                  </p>
                </div>
                <img
                  className="profile__questions-list-link-img"
                  alt="question-icon"
                  src={item.image.url}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/profile" className="profile__questions-back">
        <img className="profile__questions-back-icon" src={back} alt="back" />
      </Link>
    </section>
  );
});

export default Questions;
