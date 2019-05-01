import React from 'react';
import axios from 'axios';
import CommentBox from "./CommentBox";
import Loader from "../Loader/Loader";

export default class Lot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: false,
      _id: '',
      name: '',
      description: '',
      startPrice: 0,
      currPrice: 0,
      photos: [],
      timestamp: '',
      activePhotoIndex: 0,
      comments: [],
      endDate: '',
      timeLeft: ''
    };
    this.bidIntervals = {
      10: 1,
      100: 10,
      1000: 100,
      10000: 1000,
      100000: 10000
    }
    this.interval = null;
  }

  componentWillUnmount() {
    this.deleteTimer();
  }

  deleteTimer = () => {
    clearInterval(this.interval)
  }

  timeToString = (time) => {
    let seconds = Math.floor(time/1000);

    const days = Math.floor(seconds / (3600*24));
    seconds -= days*3600*24;
    const hrs = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    const mnts = Math.floor(seconds / 60);
    seconds -= mnts*60;

    const dDisplay = days + (days === 1 ? " day, " : " days, ");
    const hDisplay = hrs + (hrs === 1 ? " hour, " : " hours, ");
    const mDisplay = mnts + (mnts === 1 ? " minute, " : " minutes, ");
    const sDisplay = seconds + (seconds === 1 ? " second" : " seconds");
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  calculateTimeToEnd = () => {
    const time = Date.parse(this.state.endDate) - Date.now();
    if (time < 0) return this.deleteTimer();
    const timeString = this.timeToString(time)
    this.setState({ timeLeft: timeString})
  }

  startCountTimerBack = () => {
    if (Date.parse(this.state.endDate) - Date.now() < 0) return this.setState({ closed: true })
    this.calculateTimeToEnd();
    this.interval = setInterval(this.calculateTimeToEnd, 1000)
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.fetchLotData(id);
  }

  fetchLotData = (id) => {
    axios.post('/api/lot/data', {
      id
    }).then((res) => {
      this.setState({...res.data, currPrice: res.data.currPrice || res.data.startPrice})
      this.startCountTimerBack()
    })
  }

  changePhoto = (index) => {
    this.setState({ activePhotoIndex: index })
  }

  getQuickBidInterval = () => {}

  makeBid = (bid) => {
    const sum = bid;
    axios.post('/api/lot/bid', {
      lot: this.state._id,
      sum
    })
      .then((res) => {})
      .catch((err) => {})
  };

  closeLot = () => {};

  render() {
    const {
      name,
      description,
      startPrice,
      currPrice,
      photos,
      timestamp,
      comments,
      activePhotoIndex,
      _id,
      endDate,
      timeLeft,
    } = this.state;
    return (
      <section className="lot-section">
        {!name ? <Loader/> : null}
        <div className="lot-cont">
          <div className="lot-photos">
            <div className="lot-main-photo">
              <img src={photos[activePhotoIndex]} alt="lot image"/>
            </div>
            <div className="lot-photo-list">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  className={index === activePhotoIndex ? 'active' : ''}
                  onClick={this.changePhoto.bind(this, index)}
                  alt="lot-photo-little"
                />
              ))}
            </div>
          </div>
          <div className="lot-description">
            <h1 className="lot-title">{name}</h1>
            <p className="lot-description-text">{description}</p>
            <p className="lot-date">Posted: {new Date(timestamp).toDateString()}</p>
            <div className="start-price">Start price: <span>{startPrice}$</span></div>
            <div className="current-price">Current price: <span>{currPrice}$</span></div>
            <div className="make-bid-container">
              <div className="price-wrapper">
                <input type="text" name="price" autoComplete="off" id="price" className="price"/>
                <button className="button-common">Make bid</button>
              </div>
            </div>
            <div className="time-left">Time left: <br/><span>{timeLeft}</span></div>
          </div>
          {_id ? <CommentBox _id={this.state._id} user={this.props.user}/> : null}
        </div>
      </section>
    );
  }
}
