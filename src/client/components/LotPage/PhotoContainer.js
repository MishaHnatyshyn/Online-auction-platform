import React from 'react';

const PrevArrow = ({ onClick }) => (
  <span className="photo-nav prev">
    <i className="fas fa-chevron-left" onClick={onClick} />
  </span>
)

const NextArrow = ({ onClick }) => (
  <span className="photo-nav next">
    <i className="fas fa-chevron-right" onClick={onClick}/>
  </span>
)

export default class PhotoContainer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      activePhoto: 0,
    }
  }

  changePhotoIndex = index => {
    this.setState({ activePhoto: index })
  }

  selectNext = () => {
    this.changePhotoIndex(this.state.activePhoto + 1)
  }

  selectPrev = () => {
    this.changePhotoIndex(this.state.activePhoto - 1)
  }

  render() {
    const { photos, _id } = this.props;
    const { activePhoto } = this.state;
    const displayPrev = !!photos[activePhoto - 1];
    const displayNext = !!photos[activePhoto + 1];
    return(
      <div className="lot-photos">
        <div className="lot-main-photo">
          {displayPrev ? <PrevArrow onClick={this.selectPrev}/> : null}
          {displayNext ? <NextArrow onClick={this.selectNext}/> : null}
          <img src={`/${_id}/${photos[activePhoto]}`} alt="lot image"/>
        </div>
        <div className="lot-photo-list">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={`/${_id}/${photo}`}
              className={index === activePhoto ? 'active' : ''}
              onClick={this.changePhotoIndex.bind(this,  index)}
              alt="lot-photo-little"
            />
          ))}
        </div>
      </div>
    )
  }

}
