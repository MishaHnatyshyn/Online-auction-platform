import React from 'react';

export default class BugReport extends React.Component {

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
        </div>
      </div>
    );
  }
}
