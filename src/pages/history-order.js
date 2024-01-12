import React, { lazy, Suspense } from "react";
import Page from "../components/HistoryOrder/Page";
import OnlyMobile from "../components/OnlyMobile";

const Footer = lazy(() => import("../components/Footer"));

const HistoryOrder = () => {
  if (window.innerWidth > 768) {
    document.body.style.background = "white";
  } else {
    document.body.style.background = "#0f84f0";
  }
  return (
    <>
      <Page />
      <Suspense>
        <Footer current="history" />
      </Suspense>
      {/* <OnlyMobile /> */}
    </>
  );
};

export default HistoryOrder;
