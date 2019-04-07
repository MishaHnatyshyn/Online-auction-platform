import React from 'react';

export default class Login extends React.Component {

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
            Sign in
          </div>
          <div className="middle">
            <input type="text" placeholder="Email address" />
            <input type="text" placeholder="Password" />
            <button type="button" className="button-common">Continue</button>
          </div>
          <div className="bottom">
            Not a member yet?
            <span onClick={this.props.switchForm}> Join now</span>
          </div>
        </div>
      </div>
    );
  }
}
