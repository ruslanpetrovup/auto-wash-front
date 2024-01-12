import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import back from "../../assets/profile/back.svg";
import close from "../../assets/icons/close.svg";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import plus from "../../assets/icons/plus.svg";
import minus from "../../assets/icons/minus.svg";
import { useEffect } from "react";
import axios from "axios";
import getCoordinates from "./getCoordinates";
import mapPoint from "../../assets/icons/map-point.svg";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import me from "../../assets/icons/me.svg";

const customIcon = new L.Icon({
  iconUrl: mapPoint, // Замените на путь к вашей иконке
  iconSize: [32, 32], // Размер иконки [ширина, высота]
});

const meIcon = new L.Icon({
  iconUrl: me,
  iconSize: [32, 32],
});

function CurrentLocate({ setMeShow, setMeMap }) {
  const map = useMap();
  useMapEvents({
    locationfound: (location) => {
      setMeShow(true);
      setMeMap({ lat: location.latlng.lat, lng: location.latlng.lng });
      map.setView({ lat: location.latlng.lat, lng: location.latlng.lng });
    },
  });

  const checkCurrent = () => {
    map.locate();
  };

  return (
    <button className="maps-current" onClick={checkCurrent}>
      Де я ?
    </button>
  );
}

function MapControls() {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn(1);
  };

  const handleZoomOut = () => {
    map.zoomOut(1);
  };

  return (
    <div className="maps-control">
      <button onClick={handleZoomIn} className="maps-control-plus">
        <img className="maps-control-plus-icon" src={plus} alt="plus" />
      </button>
      <button onClick={handleZoomOut} className="maps-control-minus">
        <img className="maps-control-plus-icon" src={minus} alt="minus" />
      </button>
    </div>
  );
}

const MapComponent = () => {
  const { t } = useTranslation();
  const [categoriesWash, setCategoriesWash] = useState([]);
  const [wash, setWash] = useState([]);
  const navigation = useNavigate();
  const mapRef = useRef(null);
  const position = [50.447195, 30.534966]; // Начальные координаты карты
  const [meShow, setMeShow] = useState(false);
  const [meMap, setMeMap] = useState({ lat: 0, lng: 0 });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const openFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const switchFilter = (name) => {
    const newData = categoriesWash.map((item) => {
      if (item.name === name) {
        return { ...item, used: !item.used };
      } else {
        return item;
      }
    });

    setCategoriesWash(newData);
  };

  const [filterWash, setFilterWash] = useState([]);
  const [isOpenWashFilter, setIsOpenWashFilter] = useState(false);

  const goFilter = () => {
    const categories = categoriesWash.filter((item) => item.used);
    const usedCategories = categories.map((item) => {
      return item.name;
    });

    const newFilter = wash.filter((item) => {
      const findCategory = item.categories.find((category) =>
        usedCategories.includes(category.category.name)
      );

      if (findCategory) {
        return item;
      }
    });

    if (isOpenWashFilter) {
      const newFilterIsOpen = newFilter.filter((item) => {
        if (
          isShopOpen(
            item.schedule.timeIn,
            item.schedule.timeOut,
            item.schedule.weekend.length === 0
              ? []
              : item.schedule.weekend.map((item) => item.day)
          )
        ) {
          return item;
        }
      });

      setFilterWash(newFilterIsOpen);
      setIsFilterOpen(false);
      return;
    }

    setFilterWash(newFilter);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    const getWash = async () => {
      const requestWash = async () => {
        const currentLang = localStorage.getItem("lang");
        if (!currentLang) {
          return await axios(`${process.env.REACT_APP_SERVER}/api/wash`);
        } else {
          return await axios(
            `${process.env.REACT_APP_SERVER}/api/wash?locale=${currentLang}`
          );
        }
      };
      const result = await requestWash();

      const newWash = await Promise.all(
        result.data.docs.map(async (item) => {
          return {
            ...item,
            coordinates: await getCoordinates(
              `Украина, ${item.city}, ${item.address}`
            ),
          };
        })
      );
      setWash(newWash);
    };

    const getCategories = async () => {
      const currentLang = localStorage.getItem("lang");
      if (!currentLang) {
        const result = await axios(
          `${process.env.REACT_APP_SERVER}/api/categories-wash`
        );
        const newCategories = result.data.docs.map((item) => {
          return { ...item, used: false };
        });
        setCategoriesWash(newCategories);
      } else {
        const result = await axios(
          `${process.env.REACT_APP_SERVER}/api/categories-wash?locale=${currentLang}`
        );
        const newCategories = result.data.docs.map((item) => {
          return { ...item, used: false };
        });
        setCategoriesWash(newCategories);
      }
    };
    getCategories();
    getWash();
  }, []);

  function getDayOfWeekNumber(dayAbbreviation) {
    const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    const dayIndex = daysOfWeek.indexOf(dayAbbreviation.toUpperCase());
    if (dayIndex === -1) {
      throw new Error("Неверное сокращенное название дня недели");
    }
    return dayIndex;
  }

  function isShopOpen(openTime, closeTime, weekend) {
    const currentTime = new Date();
    const currentDay = currentTime.getDay();
    const closedDays = weekend.map((item) => getDayOfWeekNumber(item));

    const formattedOpenTime = parseInt(openTime.replace(":", ""));
    const formattedCloseTime = parseInt(closeTime.replace(":", ""));

    const currentTimeNumeric =
      currentTime.getHours() * 100 + currentTime.getMinutes();

    const isOpenDay = !closedDays.includes(currentDay);

    const isOpenTime =
      currentTimeNumeric >= formattedOpenTime &&
      currentTimeNumeric <= formattedCloseTime;

    return isOpenDay && isOpenTime;
  }

  return (
    <>
      <div className="maps">
        <div className="maps-head">
          <div className="maps-head-back">
            <button
              className="maps-head-back-button"
              onClick={() => navigation("/wash")}
            >
              <img
                className="maps-head-back-button-icon"
                src={back}
                alt="back"
              />
            </button>
          </div>
          <div className="maps-head-filter" onClick={openFilter}>
            <button className="maps-head-filter-button">{t("Фільтри")}</button>
          </div>
        </div>

        <MapContainer
          ref={mapRef}
          center={position}
          zoom={10}
          style={{ width: "100%", height: "100%", zIndex: 2 }}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {meShow ? (
            <Marker icon={meIcon} position={[meMap.lat, meMap.lng]}>
              {/* <img src={meIcon} /> */}
            </Marker>
          ) : (
            <></>
          )}

          {filterWash.length === 0 ? (
            <>
              {wash.map((marker, index) => (
                <Marker
                  key={index}
                  icon={customIcon}
                  position={[marker.coordinates.lat, marker.coordinates.lng]}
                >
                  <Popup>
                    <div
                      className="maps-popup"
                      onClick={() => navigation(`/wash/${marker.id}`)}
                    >
                      <p className="maps-popup-address">
                        {marker.city}, {marker.address}
                      </p>
                      <p className="maps-popup-time">
                        {marker.schedule.timeIn}-{marker.schedule.timeOut}{" "}
                        {isShopOpen(
                          marker.schedule.timeIn,
                          marker.schedule.timeOut,
                          marker.schedule.weekend.length === 0
                            ? []
                            : marker.schedule.weekend.map((item) => item.day)
                        ) ? (
                          <>
                            (
                            <span className="maps-popup-time-open">
                              {t("Відчинено")}
                            </span>
                            )
                          </>
                        ) : (
                          <>
                            (
                            <span className="maps-popup-time-close">
                              {t("Зачинено")}
                            </span>
                            )
                          </>
                        )}
                      </p>

                      <ul className="maps-popup-categories">
                        {marker.categories.map((item) => (
                          <li className="maps-popup-categories-item">
                            {item.category.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          ) : (
            <>
              {filterWash.map((marker, index) => (
                <Marker
                  key={index}
                  icon={customIcon}
                  position={[marker.coordinates.lat, marker.coordinates.lng]}
                >
                  <Popup>
                    <div
                      className="maps-popup"
                      onClick={() => navigation(`/wash/${marker.id}`)}
                    >
                      <p className="maps-popup-address">
                        {marker.city}, {marker.address}
                      </p>
                      <p className="maps-popup-time">
                        {marker.schedule.timeIn}-{marker.schedule.timeOut}{" "}
                        {isShopOpen(
                          marker.schedule.timeIn,
                          marker.schedule.timeOut,
                          marker.schedule.weekend.length === 0
                            ? []
                            : marker.schedule.weekend.map((item) => item.day)
                        ) ? (
                          <>
                            (
                            <span className="maps-popup-time-open">
                              {t("Відчинено")}
                            </span>
                            )
                          </>
                        ) : (
                          <>
                            (
                            <span className="maps-popup-time-close">
                              {t("Зачинено")}
                            </span>
                            )
                          </>
                        )}
                      </p>

                      <ul className="maps-popup-categories">
                        {marker.categories.map((item) => (
                          <li className="maps-popup-categories-item">
                            {item.category.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          )}

          <CurrentLocate setMeShow={setMeShow} setMeMap={setMeMap} />
          <MapControls />
        </MapContainer>

        <div className={`maps-filter ${isFilterOpen ? "active" : ""}`}>
          <div className="maps-filter-block">
            <div className="maps-filter-head">
              <p className="maps-filter-head-title">{t("Фільтри")}</p>
              <button className="maps-filter-head-close" onClick={openFilter}>
                <img
                  className="maps-filter-head-close-icon"
                  src={close}
                  alt="close"
                />
              </button>
            </div>

            <div className="maps-filter-categories">
              <button
                className={`maps-filter-categories-button ${
                  isOpenWashFilter ? "active" : ""
                }
                }`}
                onClick={() => setIsOpenWashFilter(!isOpenWashFilter)}
              >
                {t("Відкрито зараз")}
              </button>

              {categoriesWash.length === 0 ? (
                <></>
              ) : (
                <>
                  {categoriesWash.map((item) => (
                    <button
                      key={item.name}
                      className={`maps-filter-categories-button ${
                        item.used ? "active" : ""
                      }`}
                      onClick={() => switchFilter(item.name)}
                    >
                      {item?.icon === undefined ? (
                        <></>
                      ) : (
                        <img
                          className="maps-filter-categories-button-icon"
                          src={item.icon.url}
                          alt="categories-icon"
                        />
                      )}

                      {item.name}
                    </button>
                  ))}
                </>
              )}
            </div>

            <div className="maps-filter-result">
              <button className="maps-filter-result-button" onClick={goFilter}>
                {t("Показати результати")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
