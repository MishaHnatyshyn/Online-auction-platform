import React from 'react';
import axios from 'axios';
import CommentBox from "./CommentBox";
import Loader from "../Loader/Loader";

export default class Lot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      description: '',
      startPrice: 0,
      currPrice: 0,
      photos: [],
      timestamp: '',
      activePhotoIndex: 0,
      comments: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.fetchLotData(id);
  }

  fetchLotData = (id) => {
    axios.post('/api/lot/data', {
      id
    }).then((res) => {
      this.setState({...res.data})
    })
  }

  changePhoto = (index) => {
    this.setState({ activePhotoIndex: index })
  }

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
    } = this.state;
    return (
      <section className="lot-section">
        {!name ? <Loader/> : null}
        <div className="lot-container">
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
          </div>
          {_id ? <CommentBox _id={this.state._id} user={this.props.user}/> : null}
        </div>
      </section>
    );
  }
}
