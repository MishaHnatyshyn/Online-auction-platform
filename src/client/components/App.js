import React, {lazy, Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Loader from './Loader/Loader';
import Login from './Popups/Login';
import Signup from './Popups/Signup';
import { Helmet } from 'react-helmet'

const LazyHome = lazy(() => import('./Home/Home'));
const LazyLot = lazy(() => import('./LotPage/Lot'));
const LazyLots = lazy(() => import('./LotList/Lots'));
const LazyNewLot = lazy(() => import('./NewLot/NewLot'));
const LazyContacts = lazy(() => import('./Information/Contacts'));
const LazyTerms = lazy(() => import('./Information/TermsOfServices'));
const LazyRules = lazy(() => import('./Information/Rules'));

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
              <Helmet>
                <title>Auction</title>
              </Helmet>
              <LazyHome />
            </Suspense>
          )}/>

          <Route exact path="/lots" render={() => (
            <Suspense fallback={<Loader/>}>
              <Helmet>
                <title>Lots</title>
              </Helmet>
              <LazyLots />
            </Suspense>
          )}/>

          <Route exact path="/contacts" render={() => (
            <Suspense fallback={<Loader/>}>
              <Helmet>
                <title>Contacts</title>
              </Helmet>
              <LazyContacts />
            </Suspense>
          )}/>

          <Route exact path="/terms" render={() => (
            <Suspense fallback={<Loader/>}>
              <Helmet>
                <title>Terms of services</title>
              </Helmet>
              <LazyTerms />
            </Suspense>
          )}/>

          <Route exact path="/rules" render={() => (
            <Suspense fallback={<Loader/>}>
              <Helmet>
                <title>Rules</title>
              </Helmet>
              <LazyRules />
            </Suspense>
          )}/>

          <Route exact path="/lot/new" render={() => (
            <Suspense fallback={<Loader/>}>
              <Helmet>
                <title>New lot</title>
              </Helmet>
              <LazyNewLot />
            </Suspense>
          )}/>

          <Route exact path="/lot/:id" render={() => (
            <Suspense fallback={<Loader/>}>
              <Helmet>
                <title>Lot</title>
              </Helmet>
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
