import React from "react";
import { useTranslation } from "react-i18next";

const Item = ({ data }) => {
  const { t } = useTranslation();

  const parseDescription = () => {
    if (Object.keys(data).length !== 0) {
      const htmlElements = [];

      if (!data.description) return "";
      data.description.forEach((item, index) => {
        htmlElements.push(item.children[0].text);
        if (index === data.description.length) return;
        htmlElements.push("<br/>");
      });

      return htmlElements.join(" ");
    }
  };

  return (
    <section className="promotions">
      <div className="container">
        {Object.keys(data).length === 0 ? (
          <></>
        ) : (
          <div className="promotions__item-page">
            <div className="promotions__item">
              <div className="promotions__item-link">
                <div className="promotions__item-content">
                  <h2 className="promotions__item-content-title">
                    {data.title}
                  </h2>
                  <p className="promotions__item-content-date">
                    {" "}
                    {t("Діє з")} {data.dateStart.slice(5, 10)} {t("до")}{" "}
                    {data.dateEnd.slice(5, 10)}
                  </p>
                </div>
                <div className="promotions__item-image">
                  <img
                    className="promotions__item-image-img"
                    src={data.image.url}
                    alt="promotions1"
                  />
                </div>
              </div>
            </div>
            <div className="promotions__item-page-content">
              <h2 className="promotions__item-page-content-title">
                {data.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: parseDescription() }}
                className="promotions__item-page-content-desc"
              ></p>
              <button className="promotions__item-page-content-button">
                {t("Оформити картку")}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Item;
