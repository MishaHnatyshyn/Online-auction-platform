import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Loader from './Loader/Loader';

const LazyHome = lazy(() => import('./Home/Home'));
const LazyLot = lazy(() => import('./LotPage/Lot'));
const LazyLots = lazy(() => import('./LotList/Lots'));


export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" render={() => (
            <Suspense fallback={<Loader/>}>
              <LazyHome />
            </Suspense>
          )}/>

          <Route exact path="/lots" render={() => (
            <Suspense fallback={<Loader/>}>
              <LazyLots />
            </Suspense>
          )}/>

          <Route exact path="/lot/:id" render={() => (
            <Suspense fallback={<Loader/>}>
              <LazyLot />
            </Suspense>
          )}/>

        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}
