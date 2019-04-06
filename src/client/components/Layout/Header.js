import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        Header
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/lots">Lots</NavLink></li>
          <li><NavLink to="/lot/123">Some lot</NavLink></li>
        </ul>
      </header>
    );
  }
}
