import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-data">
          <div className="footer-data-column">
            <div className="logo-container">
              <img src={logo} alt="logo" />
              Online auction platform
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus aliquam aliquid at autem consequatur dignissimos,
              dolore eveniet in inventore ipsam molestias nam non odit
              porro quae quasi quos, repellat ullam!
            </p>
            <div className="social-container">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-square" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter-square" />
              </a>
              <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-telegram" />
              </a>
            </div>
          </div>
          <div className="footer-data-column">
            <div className="footer-data-column-title">Feedback</div>
            <ul>
              <li onClick={this.props.openBugReport}>Report a bug</li>
              <li onClick={this.props.openBecomePartner}>Become a partner</li>
              <li onClick={this.props.openContactUs}>Contact us</li>
            </ul>
          </div>
          <div className="footer-data-column">
            <div className="footer-data-column-title">Contacts</div>
            <ul>
              <li>
                <i className="fas fa-phone" />
+38 (066) 64 65 121
              </li>
              <li>
                <i className="fas fa-envelope" />
customer.service@auction.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt" />
10 Khreshchatyk Street, Kyiv, Ukraine
              </li>
            </ul>
          </div>
          <div className="footer-data-column">
            <div className="footer-data-column-title">Navigation</div>
            <ul>
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/lot/new">Create Lot</NavLink></li>
              <li><NavLink to="/lots">Lots</NavLink></li>
              <li><NavLink to="/contacts">Contacts</NavLink></li>
              <li><NavLink to="/terms">Terms of use</NavLink></li>
              <li><NavLink to="/rules">Rules</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="copyrights">
          <span>&copy; 2019 Hnatyshyn Misha</span>
        </div>
      </footer>
    );
  }
}
