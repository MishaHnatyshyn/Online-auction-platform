import React from 'react';
import image from './contact-us-image.png'
import axios from "axios";

export default class ContactUs extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      warningText: '',
      text: ''
    }
    this.popup = React.createRef()
  }

  handleTextField = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({ [name]: value, warningText: '' })
  };

  handleClickOutside = (e) => {
    if (e.target === this.popup.current) this.props.close()
  };

  displayFieldWarning = (field) => {
    this.setState({ warningText: field })
    return false;
  }

  validate = () => {
    const {
      firstName,
      lastName,
      email,
      subject,
      text
    } = this.state;
    if (!firstName) return this.displayFieldWarning('First Name');
    if (!lastName) return this.displayFieldWarning('Last Name');
    if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)) return this.displayFieldWarning('Email');
    if (!subject) return this.displayFieldWarning('Subject');
    if (!text) return this.displayFieldWarning('Text');
    return true;
  };

  send = () => {
    if (!this.validate()) return;
    axios
      .post('/api/letter/contact', this.state)
      .then((res) => {
        this.props.close()
      })
      .catch((err) => {})
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      subject,
      text,
      warningText
    } = this.state;
    return (
      <div className="popup" ref={this.popup} onClick={this.handleClickOutside}>
        <div className="popup-container-form">
          <div className="popup-container-form-left">
            <h2 className="popup-feedback-form-title">Contact us</h2>
            <form className="popup-feedback-form">
              <div className="form-input-container">
                <label htmlFor="firstName">First name</label>
                <input type="text" maxLength={100} autoComplete="off"  name="firstName" id="firstName" value={firstName} onChange={this.handleTextField}/>
              </div>
              <div className="form-input-container">
                <label htmlFor="lastName">Last name</label>
                <input type="text" maxLength={100} autoComplete="off" name="lastName" id="lastName" value={lastName} onChange={this.handleTextField}/>
              </div>
              <div className="form-input-container">
                <label htmlFor="email">Email</label>
                <input type="text" maxLength={100} autoComplete="off"  name="email" id="email" value={email} onChange={this.handleTextField}/>
              </div>
              <div className="form-input-container">
                <label htmlFor="subject">Subject</label>
                <input type="text" maxLength={100} autoComplete="off"  name="subject" id="subject" value={subject} onChange={this.handleTextField}/>
              </div>
              <div className="form-input-container">
                <label htmlFor="text">Text</label>
                <textarea name="text" maxLength={2000} autoComplete="off"  id="text" value={text} onChange={this.handleTextField}/>
              </div>
            </form>
            <div className="form-bottom-container">
              {warningText ? <span className="warning">Check your "{warningText}" field please!<br/>All the fields are required!</span> : null}
              <button type="submit" className="button-common" onClick={this.send}>Send</button>
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
