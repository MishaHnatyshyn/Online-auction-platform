import React, {lazy, Suspense} from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Loader from './Loader/Loader';
import Login from './Popups/Login';
import Signup from './Popups/Signup';
import ContactUs from './Popups/ContactUs';
import BecomePartner from './Popups/BecomePartner';
import BugReport from './Popups/BugReport';
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
      showSignUpPopup: false,
      showContactUsPopup: false,
      showBecomePartnerPopup: false,
      showBugReportPopup: false,
      user: {}
    }
  }

  getUserData = () =>{
    axios.post('/api/user/data').then((res) => {
      this.setState({ user: res.data })
    })
  }

  handleLogout = () => {
    axios.post('/api/logout').then((res) => {
      this.setState({ user: {} })
    }).catch((err) => {})
  }

  handleLogin = (user) => {
    this.setState({ user, showLoginPopup: false })
  }

  componentWillMount() {
    this.getUserData();
  }

  toggleLoginPopup = () => {
    this.setState((prevState) => ({ showLoginPopup: !prevState.showLoginPopup }))
  }

  toggleSignUpPopup = () => {
    this.setState((prevState) => ({ showSignUpPopup: !prevState.showSignUpPopup }))
  }

  toggleContactUsPopup = () => {
    this.setState((prevState) => ({ showContactUsPopup: !prevState.showContactUsPopup }))
  }

  toggleBecomePartnerPopup = () => {
    this.setState((prevState) => ({ showBecomePartnerPopup: !prevState.showBecomePartnerPopup }))
  }

  toggleBugReportPopup = () => {
    this.setState((prevState) => ({ showBugReportPopup: !prevState.showBugReportPopup }))
  }

  toggleSinglePopup = (popup) => {
    this.setState((prevState) => ({ [popup]: !prevState[popup] }))
  }

  togglePopups = () => {
    this.setState((prevState) => ({
      showSignUpPopup: !prevState.showSignUpPopup,
      showLoginPopup: !prevState.showLoginPopup
    }))
  }


  render() {
    const { showLoginPopup, showSignUpPopup, showContactUsPopup, showBecomePartnerPopup, showBugReportPopup, user } = this.state;
    return (
      <React.Fragment>
        <Header logout={this.handleLogout} username={user.username} openLogin={this.toggleLoginPopup} openSignup={this.toggleSignUpPopup} />
        {showLoginPopup ? <Login login={this.handleLogin} close={this.toggleLoginPopup} switchForm={this.togglePopups}/> : null}
        {showSignUpPopup ? <Signup close={this.toggleSignUpPopup} switchForm={this.togglePopups}/> : null}
        {showContactUsPopup ? <ContactUs close={this.toggleContactUsPopup}/> : null}
        {showBecomePartnerPopup ? <BecomePartner close={this.toggleBecomePartnerPopup}/> : null}
        {showBugReportPopup ? <BugReport close={this.toggleBugReportPopup}/> : null}
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

          <Route exact path="/lot/:id" render={({ match }) => (
            <Suspense fallback={<Loader/>}>
              <Helmet>
                <title>Lot</title>
              </Helmet>
              <LazyLot match={match} user={user.username} currUserId={user._id} openLoginPopup={this.toggleLoginPopup}/>
            </Suspense>
          )}/>

        </Switch>
        </main>
        <Footer openBugReport={this.toggleBugReportPopup} openContactUs={this.toggleContactUsPopup} openBecomePartner={this.toggleBecomePartnerPopup}/>
      </React.Fragment>
    );
  }
}
