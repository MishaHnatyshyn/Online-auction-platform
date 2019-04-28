import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    }
    this.popup = React.createRef()
  }

  login = () => {
    const {
      email,
      password,
    } = this.state;
    if (!this.validate()) return;
    axios
      .post('/api/login', {
        email,
        password
      })
      .then((res) => {
        this.props.login(res.data)
      })
      .catch((err) => {
        this.showError('Wrong email or password!')
      })
  }

  fieldChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value, error: '' })
  }

  validate = () => {
    const {
      email,
      password,
    } = this.state;
    if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)) {
      return this.showError('Email field is incorrect')
    }
    if (!password) return this.showError('Password field is required')
    return true;
  }

  showError = error => this.setState({ error})

  handleClickOutside = (e) => {
    if (e.target === this.popup.current) this.props.close()
  }


  render() {
    const { email, password, error } = this.state;
    return (
      <div className="popup" ref={this.popup} onClick={this.handleClickOutside}>
        <div className="popup-container">
          <div className="top">
            Sign in
          </div>
          <div className="middle">
            <input type="text" autoComplete="off" placeholder="Email address" name="email" value={email} onChange={this.fieldChange}/>
            <input type="password" autoComplete="off" placeholder="Password" name="password" value={password} onChange={this.fieldChange}/>
            <button type="button" className="button-common" onClick={this.login}>Continue</button>
            {error ? <span className="required">{error}</span> : null}
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
