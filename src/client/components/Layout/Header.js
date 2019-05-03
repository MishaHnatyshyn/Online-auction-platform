import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';

export default class Header extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mobileMenu: false
    }
  }

  toggleMobileMenu = () => {
    this.setState((prevState) => ({ mobileMenu: !prevState.mobileMenu }))
  }


  render() {
    const { mobileMenu } = this.state;
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
                    <li onClick={this.props.logout}>
                      <i className="fas fa-sign-out-alt" />
Log out
                    </li>
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
              {username
                ? (
                  <button type="button" onClick={this.props.logout}>
                    <i className="fas fa-sign-out-alt" />
Log out
                  </button>
                )
                : <button type="button" onClick={this.props.openSignup}>Sign up</button>
              }
            </div>
            <div onClick={this.toggleMobileMenu} className="burger-container">
              <i className="fas fa-bars" />
            </div>




          </div>
          {
            mobileMenu
              ?
              (
                <div className="mobile-drop-down">
                  <div className="close-container">
                    <span>{username || ''}</span>
                    <i onClick={this.toggleMobileMenu} className="fas fa-times"/>
                  </div>
                  <ul onClick={this.toggleMobileMenu}>
                    <li ><NavLink exact to="/" activeclassname="active">Home</NavLink></li>
                    <li>
                      <NavLink to="/lot/new" activeclassname="active">
                        Create Lot
                      </NavLink>
                    </li>
                    <li><NavLink to="/lots" activeclassname="active">Lots</NavLink></li>
                    <li><NavLink to="/contacts" activeclassname="active">Contacts</NavLink></li>
                    <li><NavLink to="/terms" activeclassname="active">Terms of use</NavLink></li>
                    <li><NavLink to="/rules" activeclassname="active">Rules</NavLink></li>
                  </ul>
                  <div className="main-menu-buttons" onClick={this.toggleMobileMenu}>
                    {username
                      ? (
                        <button type="button"  className="dark" onClick={this.props.logout}>
                          <i className="fas fa-sign-out-alt" />
                          Log out
                        </button>
                      )
                      : (
                        <React.Fragment>
                          <button type="button" className="dark" onClick={this.props.openLogin}>Sign in</button>
                          <button type="button" className="dark" onClick={this.props.openSignup}>Sign up</button>
                        </React.Fragment>
                      )
                    }
                  </div>
                </div>
              )
              : null
          }
        </div>
      </header>
    );
  }
}
