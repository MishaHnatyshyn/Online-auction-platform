import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

export default class Header extends React.Component {
  render() {
    const { username } = this.props;
    return (
      <header className="main-header">
        <div className="main-header-content">
          <div className="header-left">
            <div className="header-logo">
              <img src={logo} alt="logo" />
            </div>
            <ul className="main-nav-list">
              <li><NavLink exact to="/" activeclassname="active">Home</NavLink></li>
              <li>
                <NavLink to="/lot/new" activeclassname="active">
                Create Lot
                </NavLink>
              </li>
              <li><NavLink to="/lots" activeclassname="active">Lots</NavLink></li>
              <li><NavLink to="/contacts" activeclassname="active">Contacts</NavLink></li>
              <li className="drop-down">
                <div>
                  Information
                  <i className="fas fa-angle-down" />
                  <ul className="drop-down-list">
                    <li><NavLink to="/terms" activeclassname="active">Terms of use</NavLink></li>
                    <li><NavLink to="/rules" activeclassname="active">Rules</NavLink></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="header-right">
            <div className="search">
              <input type="text" placeholder="Search on site..." name="search" />
              <i className="fas fa-search" />
            </div>
            {username
              ? (
                <div className="user-data-container drop-down">
                  {username}
                  <i className="fas fa-angle-down" />
                  <ul className="drop-down-list">
                    <li>Log out</li>
                  </ul>
                </div>
              )
              : (
                <div className="main-menu-buttons">
                  <button type="button" onClick={this.props.openLogin}>Sign in</button>
                  <button type="button" onClick={this.props.openSignup}>Sign up</button>
                </div>
              )
            }
          </div>

        </div>

        <div className="main-header-content-mobile">
          <div className="header-left">
            <div className="header-logo">
              <img src={logo} alt="logo" />
            </div>
          </div>
          <div className="header-right">
            <div className="main-menu-buttons">
              {/* <button type="button" onClick={this.props.openLogin}>Sign in</button> */}
              <button type="button" onClick={this.props.openSignup}>Sign up</button>
            </div>
            <div className="burger-container">
              <i className="fas fa-bars" />
              <ul className="mobile-drop-down">
                <li><NavLink exact to="/" activeclassname="active">Home</NavLink></li>
                <li><NavLink to="/lot/new" activeclassname="active">
                  Create Lot
                </NavLink></li>
                <li><NavLink to="/lots" activeclassname="active">Lots</NavLink></li>
                <li><NavLink to="/contacts" activeclassname="active">Contacts</NavLink></li>
                <li><NavLink to="/terms" activeclassname="active">Terms of use</NavLink></li>
                <li><NavLink to="/rules" activeclassname="active">Rules</NavLink></li>
              </ul>
            </div>

          </div>
        </div>
      </header>
    );
  }
}
