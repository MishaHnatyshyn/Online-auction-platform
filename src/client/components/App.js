import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Loader from './Loader/Loader';
import Login from './Popups/Login';
import Signup from './Popups/Signup';

const LazyHome = lazy(() => import('./Home/Home'));
const LazyLot = lazy(() => import('./LotPage/Lot'));
const LazyLots = lazy(() => import('./LotList/Lots'));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginPopup: false,
      showSignUpPopup: false
    }
  }

  toggleLoginPopup = () => {
    this.setState((prevState) => ({ showLoginPopup: !prevState.showLoginPopup }))
  }

  toggleSignUpPopup = () => {
    this.setState((prevState) => ({ showSignUpPopup: !prevState.showSignUpPopup }))
  }

  togglePopups = () => {
    this.setState((prevState) => ({
      showSignUpPopup: !prevState.showSignUpPopup,
      showLoginPopup: !prevState.showLoginPopup
    }))
  }


  render() {
    const { showLoginPopup, showSignUpPopup } = this.state;
    return (
      <React.Fragment>
        <Header openLogin={this.toggleLoginPopup} openSignup={this.toggleSignUpPopup} />
        {showLoginPopup ? <Login close={this.toggleLoginPopup} switchForm={this.togglePopups}/> : null}
        {showSignUpPopup ? <Signup close={this.toggleSignUpPopup} switchForm={this.togglePopups}/> : null}
        <main className="main-content">
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
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}
