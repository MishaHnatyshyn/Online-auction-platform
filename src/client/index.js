import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, withRouter } from "react-router-dom";

import Loader from './components/Loader/Loader'
import ScrollToTop from './components/ScrollToTop'
import "./assets/styles/index.scss";

const LazyApp = lazy(() => import("./components/App"));

ReactDOM.render(
  <BrowserRouter onUpdate={() => window.scrollTo(0, 0)} >
    <Suspense fallback={<Loader />}>
      <ScrollToTop>
        <LazyApp />
      </ScrollToTop>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
