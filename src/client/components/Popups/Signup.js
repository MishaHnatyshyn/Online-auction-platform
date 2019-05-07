import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      error: '',
      email: '',
      username: '',
      password: '',
      passwordRepeated: '',
    }
    this.popup = React.createRef()
  }

  handleClickOutside = (e) => {
    if (e.target === this.popup.current) this.props.close()
  }

  validate = () => {
    const {
      email,
      username,
      password,
      passwordRepeated
    } = this.state;
    if (!email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g)) {
      return this.showError('Email field is incorrect')
    }
    if (!username) return this.showError('Username field is required')
    if (!password) return this.showError('Password field is required')
    if (passwordRepeated !== password) return this.showError('Repeated password is wrong')
    return true;
  }

  showError = error => this.setState({ error})

  register = () => {
    const {
      email,
      username,
      password,
      passwordRepeated
    } = this.state;
    if (!this.validate()) return;
    axios
      .post('/api/register', {
        email,
        username,
        password
      })
      .then((res) => {
        this.props.register(res.data)
      })
      .catch((err) => {
        console.log(err)
        this.showError('This email is already taken')
      })
  }

  fieldChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value, error: '' })
  }

  render() {
    const {email, username, password, passwordRepeated, error } = this.state;
    return (
      <div className="popup" ref={this.popup} onClick={this.handleClickOutside}>
        <div className="popup-container">
          <div className="top">
            Sign up
          </div>
          <div className="middle">
            <input type="text" autoComplete="off" placeholder="Email address" name="email" value={email} onChange={this.fieldChange}/>
            <input type="text" autoComplete="off" placeholder="Username" name="username" value={username} onChange={this.fieldChange} />
            <input type="password" autoComplete="off" placeholder="Password" name="password" value={password} onChange={this.fieldChange} />
            <input type="password" autoComplete="off" placeholder="Repeat password" name="passwordRepeated" value={passwordRepeated} onChange={this.fieldChange} />
            <button type="button" className="button-common" onClick={this.register}>Sign up</button>
            {error ? <span className="required">{error}</span> : null}
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
