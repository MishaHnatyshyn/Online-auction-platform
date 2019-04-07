import React from 'react';

export default class Signup extends React.Component {

  constructor(props){
    super(props)
    this.popup = React.createRef()
  }

  handleClickOutside = (e) => {
    if (e.target === this.popup.current) this.props.close()
  }

  render() {
    return (
      <div className="popup" ref={this.popup} onClick={this.handleClickOutside}>
        <div className="popup-container">
          <div className="top">
            Sign up
          </div>
          <div className="middle">
            <input type="text" placeholder="Email address" />
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Repeat password" />
            <button type="button" className="button-common">Sign up</button>
          </div>
          <div className="bottom">
            Already a member?
            <span onClick={this.props.switchForm}> Sign in</span>
          </div>
        </div>
      </div>
    );
  }
}
