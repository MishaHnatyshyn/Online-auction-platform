import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Loader from './components/Loader/Loader'
import "./assets/styles/index.scss";

const LazyApp = lazy(() => import("./components/App"));


ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <LazyApp />
  </Suspense>,
  document.getElementById("root")
);
