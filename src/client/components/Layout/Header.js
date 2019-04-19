import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

export default class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
        <div className="main-header-content">
          <div className="header-left">
            <div className="header-logo">
              <img src={logo} alt="logo" />
            </div>
            <ul className="main-nav-list">
              <li><NavLink exact to="/" activeclassname="active">Home</NavLink></li>
              <li><NavLink to="/contacts" activeclassname="active">Contacts</NavLink></li>
              <li>
                <NavLink to="/lot/new" activeclassname="active">
                New Lot
                </NavLink>
              </li>
              <li><NavLink to="/lots" activeclassname="active">Lots</NavLink></li>
              <li><NavLink to="/lot/123" activeclassname="active">Some lot</NavLink></li>
              <li className="drop-down">
                <NavLink to="/rules" activeclassname="active">
                  Drop Menu
                  <i className="fas fa-angle-down" />
                  <ul className="drop-down-list">
                    <li>Sum menu 1</li>
                    <li>Sum menu 2</li>
                    <li>Sum menu 3</li>
                    <li>Sum menu 4</li>
                  </ul>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="header-right">
            <div className="search">
              <input type="text" placeholder="Search on site..." name="search" />
              <i className="fas fa-search" />
            </div>
            <div className="main-menu-buttons">
              <button type="button" onClick={this.props.openLogin}>Sign in</button>
              <button type="button" onClick={this.props.openSignup}>Sign up</button>
            </div>
          </div>

        </div>
      </header>
    );
  }
}
