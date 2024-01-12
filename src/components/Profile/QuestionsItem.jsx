import React from "react";
import { Link } from "react-router-dom";
import back from "../../assets/profile/back.svg";

const QuestionsItem = ({ data }) => {
  const parseDescription = () => {
    if (Object.keys(data).length !== 0) {
      const htmlElements = [];

      if (!data.answer) return;
      data.answer.forEach((item, index) => {
        htmlElements.push(item.children[0].text);
        if (index === data.description.length) return;
        htmlElements.push("<br/>");
      });

      return htmlElements.join(" ");
    }
  };

  return (
    <section className="profile__questions-item">
      {Object.keys(data).length === 0 ? (
        <></>
      ) : (
        <div className="container">
          <Link
            to="/profile/questions"
            className="profile__questions-back-desk"
          >
            <img
              className="profile__questions-back-icon"
              src={back}
              alt="back"
            />
          </Link>
          <div className="profile__questions-item-block">
            <div className="profile__questions-list-link">
              <div className="profile__questions-list-link-content">
                <h2 className="profile__questions-list-link-content-title">
                  {data.title}
                </h2>
                <p className="profile__questions-list-link-content-desc">
                  {data.description}
                </p>
              </div>
              <img
                className="profile__questions-list-link-img"
                alt="question-icon"
                src={data.image.url}
              />
            </div>
          </div>

          <p
            dangerouslySetInnerHTML={{ __html: parseDescription() }}
            className="profile__questions-item-description"
          ></p>
        </div>
      )}

      <Link to="/profile/questions" className="profile__questions-back">
        <img className="profile__questions-back-icon" src={back} alt="back" />
      </Link>
    </section>
  );
};

export default QuestionsItem;
