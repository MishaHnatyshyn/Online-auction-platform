import React from 'react';

export default class SuccessAlert extends React.Component {

  constructor(props){
    super(props)
    this.popup = React.createRef()
  }

  handleClickOutside = (e) => {
    if (e.target === this.popup.current) this.props.close()
  }

  render() {
    return (
      <div className="popup new-lot-alert-popup" ref={this.popup} onClick={this.handleClickOutside}>
        <div className="popup-container">
          <div>Ooops, something went wrong!</div>
          <span className="close-button" onClick={this.props.close}>
            <i className="far fa-times-circle"></i>
          </span>
          <div>
            <button className="button-common" onClick={this.props.close}>
              Continue
            </button>
          </div>

        </div>
      </div>
    );
  }
}
