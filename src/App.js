import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";
import SignIn from "./pages/sign-in";
import Promotions from "./pages/promotions";
import PromotionsItem from "./pages/promotions-item";
import NotFound from "./pages/404";
import Wash from "./pages/wash";
import WashItem from "./pages/wash-item";
import HistoryOrder from "./pages/history-order";
import Profile from "./pages/profile";
import ProfileSettings from "./pages/profile-settings";
import ProfileSupport from "./pages/profile-support";
import ProfileQuestions from "./pages/profile-questions";
import ProfileQuestionsItem from "./pages/profile-questions-item";
import ProfileData from "./pages/profile-data";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/slice/sliceUser";
import InfoPage from "./pages/info";
import MyCards from "./pages/my-cards";
import PaymentPage from "./pages/payment";
import axios from "axios";
import QR from "./pages/qr";
import PaymentPostPage from "./pages/payment-post";
import PaymentNotRegisterPage from "./pages/payment-not-register";
import MapsWash from "./pages/maps-wash";
import Lang from "./pages/lang";
import { useTranslation } from "react-i18next";
import "webrtc-adapter";
import SelectLogin from "./pages/select-login";
import Home from "./pages/home";
// const Home = lazy(() => import("./pages/home"));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    const currentLang = localStorage.getItem("lang");
    if (!currentLang) {
      localStorage.setItem("lang", "ua");
    } else {
      i18n.changeLanguage(currentLang);
    }
    if (tokenLocal !== "") {
      dispatch(setToken(tokenLocal));
      try {
        if (tokenLocal === null || tokenLocal === "") {
          setIsReady(true);
          return;
        }
        axios
          .post(`${process.env.REACT_APP_SERVER}/user/verify`, {
            token: tokenLocal,
          })
          .then((res) => {
            if (Object.keys(res.data).length !== 0) setIsAuthenticated(true);
            setIsReady(true);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsReady(true);
    }
  }, [dispatch]);

  if (!isReady) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRouter
            isAuthenticated={!isAuthenticated}
            element={<SelectLogin />}
            pathNotAuthenticated="/info"
          />
        }
      />
      <Route
        path="/phone"
        element={
          <PrivateRouter
            isAuthenticated={!isAuthenticated}
            element={<Home />}
            pathNotAuthenticated="/info"
          />
        }
      />
      <Route
        path="/lang"
        element={
          <PrivateRouter
            isAuthenticated={!isAuthenticated}
            element={<Lang />}
            pathNotAuthenticated="/info"
          />
        }
      />
      <Route
        path="/payment/:id"
        element={
          <PrivateRouter
            isAuthenticated={isAuthenticated}
            element={<PaymentPage />}
          />
        }
      />

      <Route path="/maps" element={<MapsWash />} />
      <Route
        path="/payment-post/:id"
        element={
          <PrivateRouter
            isAuthenticated={isAuthenticated}
            element={<PaymentPostPage />}
          />
        }
      />
      <Route
        path="/payment-not-register/:id"
        element={<PaymentNotRegisterPage />}
      />
      <Route
        path="/info/my-cards"
        element={
          <PrivateRouter
            isAuthenticated={isAuthenticated}
            element={<MyCards />}
          />
        }
      />
      <Route path="/info" element={<InfoPage />} />
      <Route
        path="/signin/:number"
        element={
          <PrivateRouter
            isAuthenticated={!isAuthenticated}
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
            pathNotAuthenticated="/info"
          />
        }
      />
      <Route path="/promotions/:id" element={<PromotionsItem />} />
      <Route path="/promotions" element={<Promotions />} />
      <Route path="/wash/:id" element={<WashItem />} />
      <Route path="/wash" element={<Wash />} />
      <Route
        path="/history-order"
        element={
          <PrivateRouter
            isAuthenticated={isAuthenticated}
            element={<HistoryOrder />}
          />
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/profile/data"
        element={
          <PrivateRouter
            isAuthenticated={isAuthenticated}
            element={<ProfileData />}
          />
        }
      />
      {/* <Route
        path="/profile/data/cars"
        element={
          <PrivateRouter
            isAuthenticated={isAuthenticated}
            element={<ProfileDataCars />}
          />
        }
      /> */}
      <Route path="/profile/settings" element={<ProfileSettings />} />
      <Route path="/profile/support" element={<ProfileSupport />} />
      <Route path="/profile/questions/:id" element={<ProfileQuestionsItem />} />
      <Route path="/profile/questions" element={<ProfileQuestions />} />
      <Route path="/qr-scan" element={<QR />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
