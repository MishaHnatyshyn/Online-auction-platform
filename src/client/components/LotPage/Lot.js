import React from 'react';

const LotData = {
  name: 'Lot name',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!',
  startPrice: 100,
  currPrice: 200,
  photos: [
    'https://i2.rozetka.ua/goods/1232633/samsung_eo_eg920lregru_images_1232633870.jpg',
    'https://i2.rozetka.ua/goods/1232634/samsung_eo_eg920lregru_images_1232634129.jpg',
    'https://i2.rozetka.ua/goods/1232634/samsung_eo_eg920lregru_images_1232634409.jpg',
    'https://i2.rozetka.ua/goods/1232634/samsung_eo_eg920lregru_images_1232634955.jpg',
  ],
  timestamp: new Date(),
  comments: [
    {
      _id: 1,
      user: {
        username: 'User1'
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!',
    },
    {
      _id: 2,
      user: {
        username: 'User2'
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!',
    },
    {
      _id: 3,
      user: {
        username: 'User3'
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!',
    },
    {
      _id: 4,
      user: {
        username: 'User4'
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!',
    },
  ]
};


export default class Lot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({ ...LotData });
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
    } = this.state;
    return (
      <section className="lot-section">
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
          <div className="lot-comments">
            <h2>Comments: </h2>
            <div className="lot-comments-input">
              <textarea placeholder="Type text of comment ..." />
              <button className="button-common">Post</button>
            </div>
            <div className="lot-comments-list">
              {comments.map(comment => (
                <div className="comment-container" key={comment._id}>
                  <div className="comment-author">{comment.user.username}</div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
