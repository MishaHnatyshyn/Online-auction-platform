import React from 'react';

export default class Contacts extends React.Component{
  constructor(props) {
    super(props);
    this.map = null
    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    this.initMap();
  }

  initMap = () => {
    const coords = {lat: 50.451764, lng: 30.5257083}
    this.map = new google.maps.Map(this.mapContainer.current, {
      center: coords,
      zoom: 11.75,
      disableDefaultUI: true
    });

    const marker = new google.maps.Marker({position: coords, map: this.map});

  }

  render() {
    return(
      <section className="contacts-section">
        <div className="contacts-container">
          <div className="contact-info">
            <div className="contacts-data-column">
              <div className="contacts-data-column-title">Departments</div>
              <div className="contacts-data-column-list">
                <div  className="contacts-data-column-item">
                  <div className="contacts-data-column-item-name">
                    Department of customer service
                  </div>
                  <div>
                    +38 (066) 64 65 121
                  </div>
                  <div>
                    customer.service@auction.com
                  </div>
                </div>
                <div  className="contacts-data-column-item">
                  <div className="contacts-data-column-item-name">
                    Technical support
                  </div>
                  <div>
                    +38 (066) 64 65 122
                  </div>
                  <div>
                    technical.support@auction.com
                  </div>
                </div>
                <div  className="contacts-data-column-item">
                  <div className="contacts-data-column-item-name">
                    Legal Department
                  </div>
                  <div>
                    +38 (066) 64 65 123
                  </div>
                  <div>
                    legal.department@auction.com
                  </div>
                </div>
              </div>
            </div>
            <div className="contacts-data-column">
              <div className="contacts-data-column-title">Social networks</div>
              <div className="contacts-data-column-list">
                <div  className="contacts-data-column-item social">
                  <a href="https://www.facebook.com/" target="_blank">
                    <i className="fab fa-facebook-square" />
                    Online Auction
                  </a>
                </div>
                <div  className="contacts-data-column-item social">
                  <a href="https://twitter.com/" target="_blank">
                    <i className="fab fa-twitter-square" />
                    @online_auction
                  </a>
                </div>
                <div  className="contacts-data-column-item social">
                  <a href="https://telegram.org/" target="_blank">
                    <i className="fab fa-telegram" />
                    @online_auction
                  </a>
                </div>
              </div>
            </div>
            <div className="contacts-data-column">
              <div className="contacts-data-column-title">Address</div>
              <div className="contacts-data-column-list">
                <div  className="contacts-data-column-item social">
                  <i className="fas fa-map-marker-alt"></i>
                  10 Khreshchatyk Street, Kyiv, Ukraine
                </div>
              </div>
            </div>
          </div>
          <div className="map" ref={this.mapContainer} />
        </div>
      </section>
    )
  }

}
