import React from 'react';
import axios from 'axios';
import io from "socket.io-client";
import CommentBox from "./CommentBox";
import BiddingContainer from "./BiddingContainer";
import AuctionResults from "./AuctionResults";
import PhotoContainer from "./PhotoContainer";
import Loader from "../Loader/Loader";
import './lotPage.scss'

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
      endDate: '',
      byNowPrice: 500,
      actualUserBid: null,
      quickBidsArray: []
    };
    this.socket = null;
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.fetchLotData(id);
    this.socket = io();
    this.initSocketListeners();
  }

  componentWillUnmount() {
    this.leaveLotRoom();
  }

  getQuickBidStep = () => {
    const { currPrice } = this.state;
    if (currPrice < 100) return 5;
    if (currPrice < 1000) return 50;
    if (currPrice < 5000) return 250;
    if (currPrice < 10000) return 500
    return 1000;
  }

  updateQuickBids = () => {
    const { currPrice } = this.state;
    const bidStep = this.getQuickBidStep();
    const quickBidsArray = [...new Array(5)].map((_, i) => (bidStep * (i + 1)) + currPrice);
    this.setState({ quickBidsArray })
  }

  leaveLotRoom = () => {
    this.socket.emit('disconnect from lot room', { lot: this.state._id })
  }

  joinToLotRoom = () => {
    this.socket.emit('connect to lot room', { lot: this.state._id })
  }

  initSocketListeners = () => {
    this.socket.on('price update', this.handlePriceUpdate);
    this.socket.on('bid failure', this.handleBidFailure);
    this.socket.on('lot closed', this.handleLotClosing);
    this.socket.on('close lot', this.handleBuyNow);
  }

  handlePriceUpdate = ({ price, user }) => {
    this.setState({ currPrice: price, actualUserBid: user }, this.updateQuickBids)
  };

  handleBuyNow = ({ price, user }) => {
    this.setState({ currPrice: price, actualUserBid: user, closed: true })
  };

  handleBidFailure = ({ price }) => {

  };

  handleLotClosing = () => {
    this.setState({ closed: true})
  }

  fetchLotData = (id) => {
    axios.post('/api/lot/data', {
      id
    }).then((res) => {
      this.setState({...res.data, currPrice: res.data.currPrice || res.data.startPrice}, this.updateQuickBids)
      this.joinToLotRoom();
    })
  }

  makeBid = (bid) => {
    const { _id, currPrice } = this.state;
    const { currUserId } = this.props;
    if (!currUserId) return this.loginError();
    const sum = parseInt(bid)
    if (sum <= currPrice) return;
    this.socket.emit('make a bid', {
      lot: _id,
      sum,
      user: currUserId
    });
    this.setState({ bidInput: '' })
  };

  loginError = () => {
    this.props.openLoginPopup()
  }

  closeLot = () => {
    if (this.state.closed) return;
    this.setState({ closed: true })
  };

  buyNow = () => {
    const { _id, byNowPrice } = this.state;
    const { currUserId } = this.props;
    if (!currUserId) return this.loginError();
    this.socket.emit('buy now', {
      lot: _id,
      sum: byNowPrice,
      user: currUserId
    });
  };

  render() {
    const {
      name,
      description,
      startPrice,
      currPrice,
      photos,
      timestamp,
      _id,
      endDate,
      actualUserBid,
      byNowPrice,
      closed,
      quickBidsArray
    } = this.state;
    const { currUserId } = this.props;
    return (
      <section className="lot-section">
        {!name ? <Loader/> : null}
        <div className="lot-cont">
          <PhotoContainer photos={photos} _id={_id}/>
          <div className="lot-description">
            <h1 className="lot-title">{name}</h1>
            <p className="lot-description-text">{description}</p>
            <p className="lot-date">Start price: <span>{startPrice}$</span></p>
            <p className="lot-date">Posted: {new Date(timestamp).toDateString()}</p>
            <AuctionResults {...{closed, actualUserBid, currUserId, currPrice}}/>
            {
              !closed && _id
              ? <BiddingContainer
                {...{currUserId, actualUserBid, currPrice, byNowPrice, endDate, quickBidsArray}}
                close={this.closeLot}
                makeBid={this.makeBid}
                buyNow={this.buyNow}
              />
              : null
            }

          </div>
          {_id ? <CommentBox _id={this.state._id} user={this.props.user}/> : null}
        </div>
      </section>
    );
  }
}
