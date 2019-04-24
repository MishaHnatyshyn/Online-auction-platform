import React from 'react';
import image from './contact-us-image.png'

export default class ContactUs extends React.Component {

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
        <div className="popup-container-form">
          <div className="popup-container-form-left">
            <h2 className="popup-feedback-form-title">Contact us</h2>
            <form className="popup-feedback-form">
              <div className="form-input-container">
                <label htmlFor="name">First name</label>
                <input type="text" name="first_name" id="name"/>
              </div>
              <div className="form-input-container">
                <label htmlFor="last_name">Last name</label>
                <input type="text" name="last_name" id="last_name"/>
              </div>
              <div className="form-input-container">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" />
              </div>
              <div className="form-input-container">
                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" />
              </div>
              <div className="form-input-container">
                <label htmlFor="description">Text</label>
                <textarea name="description" id="description" />
              </div>
            </form>
            <div>
              <button className="button-common">Send</button>
            </div>
          </div>
          <div className="popup-container-form-right">
            <img src={image} alt="help center image"/>
            <p>Have an idea or question? Write us!</p>

          </div>
          <span className="close-button" onClick={this.props.close}>
            <i className="far fa-times-circle"></i>
          </span>
        </div>
      </div>
    );
  }
}
