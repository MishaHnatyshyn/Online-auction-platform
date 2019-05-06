import React from 'react'
import io from "socket.io-client";

export default class BiddingContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: '',
      bidInput: '',
      makeBidDisabled: true
    }
    this.interval = null;
  }

  componentDidMount() {
    this.startCountTimerBack();
  }

  componentWillUnmount() {
    this.deleteTimer();
  }

  deleteTimer = () => {
    clearInterval(this.interval)
  };

  timeToString = (time) => {
    let seconds = Math.floor(time/1000);
    const days = Math.floor(seconds / (3600*24));
    seconds -= days*3600*24;
    const hrs = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts*60;
    const dDisplay = days ? days + 'd ' : '';
    const hDisplay = hrs + 'h ';
    const mDisplay = mnts + 'm ';
    const sDisplay = seconds + 's ';
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  calculateTimeToEnd = () => {
    const time = Date.parse(this.props.endDate) - Date.now();
    if (time < 0) {
      this.deleteTimer();
      return this.props.close();
    }
    const timeString = this.timeToString(time)
    this.setState({ timeLeft: timeString})
  }

  startCountTimerBack = () => {
    if (Date.parse(this.props.endDate) - Date.now() < 0) return this.props.close()
    this.calculateTimeToEnd();
    this.interval = setInterval(this.calculateTimeToEnd, 1000)
  }

  handleBidInputChange = (e) => {
    const { value } = e.target;
    const { currPrice } = this.props;
    if (!value.match(/^[0-9]*$/) || value[0] === '0') return;
    this.setState({ bidInput: value, makeBidDisabled: parseInt(value) <= currPrice })
  }

  makeBid = () => {
    this.props.makeBid(this.state.bidInput)
    this.setState({ bidInput: '' })
  }

  quickBid = bid => e => {
    this.props.makeBid(bid)
  }

  render() {
    const { timeLeft, bidInput, makeBidDisabled} = this.state;
    const { currUserId, actualUserBid, currPrice, byNowPrice, quickBidsArray } = this.props;
    const yourBidIsLast = currUserId && currUserId === actualUserBid;
    return(
      <div className="bidding-container">
        <div className="bidding-info">
          <div className={`current-price ${yourBidIsLast ? 'your-bid-is-last' : ''}`}>Current bid: <span>{currPrice}$</span> {yourBidIsLast ? ' - Your bid is the last!' : ''}</div>
          <div className="time-left">Time left: <span>{timeLeft}</span></div>
        </div>
        <div className="bidding-tools">
          <div className="quick-bid-container">
            <div className="quick-bid-title">Quick bid</div>
            <div className="quick-bid-list">
              {quickBidsArray.map(bid => <div key={bid} className="quick-bid-box" onClick={this.quickBid(bid)}>{bid}</div>)}
            </div>
          </div>

          <div className="make-bid-container">
            <div className="quick-bid-title">Custom bid</div>
            <div className="price-wrapper">
              <input type="text" name="price" autoComplete="off" id="price" className="price" value={bidInput} onChange={this.handleBidInputChange}/>
              <button className="button-common" onClick={this.makeBid} disabled={makeBidDisabled}>Make bid</button>
            </div>
          </div>

          {byNowPrice? (
            <div className="make-bid-container">
              <div className="quick-bid-title">Buy now</div>
              <div className="price-wrapper">
                <input type="text" name="price" autoComplete="off" id="price" className="price" value={byNowPrice} readOnly={true}/>
                <button className="button-common" onClick={this.props.buyNow}>Buy now</button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )
  }

}
