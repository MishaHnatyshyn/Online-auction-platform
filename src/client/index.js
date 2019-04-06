import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Loader from './components/Loader/Loader'
import "./assets/styles/index.scss";

const LazyApp = lazy(() => import("./components/App"));

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <LazyApp />
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
