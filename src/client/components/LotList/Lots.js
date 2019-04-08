import React from 'react';

import LotCard from './LotCard';

const photos = [
  'https://i2.rozetka.ua/goods/1784911/apple_airpods_images_1784911319.jpg',
  'https://i1.rozetka.ua/goods/1127297/hyperx_cloud_core_images_1127297246.jpg',
  'https://i1.rozetka.ua/goods/1882711/xiaomi_hsej03jy_black_images_1882711880.jpg',
  'https://i2.rozetka.ua/goods/434611/kingston_hyperx_cloud_ii_gun_metal_images_434611672.jpg',
  'https://i1.rozetka.ua/goods/1741362/hyperx_hx_hscs_bk_ee_images_1741362158.jpg',
  'https://i2.rozetka.ua/goods/10462238/panasonic_rp_hje125e_k_images_10462238132.jpg',
  'https://i2.rozetka.ua/goods/2148230/hyperx_hx_hsca_rdee_images_2148230695.jpg',
  'https://i1.rozetka.ua/goods/11167527/samsung_sm_r170nzkasek_images_11167527579.jpg',
  'https://i2.rozetka.ua/goods/2067969/kingston_hx_hscl_sr_na_images_2067969064.jpg',
];

const LotsData = photos.map((photo, index) => ({
  name: `Lot ${index}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!',
  startPrice: 100 * (index + 1),
  currPrice: 200 * (index + 1),
  photos: [photo],
  payment: ['Cash', 'Visa', 'Mastercard', 'PayPal', 'Other'],
  delivery: ['Post office', 'Personal meeting', 'Courier', 'Other'],
  timestamp: new Date(Date.parse(new Date()) - 86400 * index),
}));

const pagesCount = 5


// #TODO filter bugs

export default class Lots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lots: [],
      activePage: 2,
      availablePaymentMethods: [],
      selectedPaymentMethods: [],
      availableDeliveryMethods: [],
      selectedDeliveryMethods: [],
    };
  }

  changeActivePage = (page) => {
    this.setState({ activePage: page })
  }

  handleNextPage = () => {
    this.setState((prevState) => ({ activePage: ++prevState.activePage }))
  }

  handlePrevPage = () => {
    this.setState((prevState) => ({ activePage: --prevState.activePage }))
  }

  componentDidMount() {
    const payments = [...new Set(...LotsData.map(_ => _.payment))];
    const deliveries = [...new Set(...LotsData.map(_ => _.delivery))];
    this.setState({
      lots: LotsData,
      availablePaymentMethods: payments,
      selectedPaymentMethods: payments,
      availableDeliveryMethods: deliveries,
      selectedDeliveryMethods: deliveries,
    });
  }

  handlePaymentChange = payment => event => {
    event.preventDefault();
    const currentPaymentMethods = [...this.state.selectedPaymentMethods];
    console.log(currentPaymentMethods)
    console.log(payment)
    console.log(currentPaymentMethods.includes(payment))
    console.log(currentPaymentMethods.indexOf(payment))
    if (currentPaymentMethods.includes(payment)) {
      currentPaymentMethods.splice(currentPaymentMethods.indexOf(payment), 1)
    } else currentPaymentMethods.push(payment)
    console.log(currentPaymentMethods)
    this.setState({ selectedPaymentMethods: currentPaymentMethods})
  }

  handleDeliveryChange = delivery => event => {
    event.preventDefault();
    const currentDeliveryMethods = [...this.state.selectedDeliveryMethods];
    if (currentDeliveryMethods.includes(delivery)) {
      currentDeliveryMethods.splice(currentDeliveryMethods.indexOf(delivery), 1)
    } else currentDeliveryMethods.push(delivery)
    this.setState({ selectedDeliveryMethods: currentDeliveryMethods})

  }


  render() {
    const {
      lots,
      activePage,
      availablePaymentMethods,
      selectedPaymentMethods,
      availableDeliveryMethods,
      selectedDeliveryMethods,
    } = this.state;

    console.log('RENDER', selectedPaymentMethods)

    const pagesArray = [...new Array(pagesCount)].map((_, index) => index + 1)
    return (
      <section className="lots-section">
        <div className="lots-list-content">
          <section className="filters">
            <div className="filters-container">
              <h2>Filters</h2>

              <div className="filter-container">
                <div className="filter-title">Price</div>
                <div className="filter-list">
                  <div>
                    <input type="radio" id="priceAZ" name="price-sort" />
                    <label htmlFor="priceAZ">From lower to higher</label>
                  </div>
                  <div>
                    <input type="radio" id="priceZA" name="price-sort" />
                    <label htmlFor="priceZA">From higher to lower</label>
                  </div>
                  <div className="price-range">
                    <div>
                      <input type="text" placeholder="From" id="price-from"/>-
                      <input type="text" placeholder="To" id="price-to"/>
                    </div>
                  </div>

                </div>
              </div>

              <div className="filter-container">
                <div className="filter-title">Name</div>
                <div className="filter-list">
                  <div>
                    <input type="radio" id="dateAZ" name="date-sort" />
                    <label htmlFor="priceAZ">From A to Z</label>
                  </div>
                  <div>
                    <input type="radio" id="dateZA" name="date-sort" />
                    <label htmlFor="priceZA">From Z to A</label>
                  </div>
                </div>
              </div>

              <div className="filter-container">
                <div className="filter-title">Date</div>
                <div className="filter-list">
                  <div>
                    <input type="radio" id="dateAZ" name="date-sort" />
                    <label htmlFor="priceAZ">From A to Z</label>
                  </div>
                  <div>
                    <input type="radio" id="dateZA" name="date-sort" />
                    <label htmlFor="priceZA">From Z to A</label>
                  </div>
                </div>
              </div>


              <div className="filter-container">
                <div className="filter-title">Payment type</div>
                <div className="filter-list">
                  {availablePaymentMethods.map(payment => (
                    <div key={payment}>
                      <input
                        type="checkbox"
                        id="payment1"
                        name="payment"
                        checked={selectedPaymentMethods.includes(payment)}
                        onChange={this.handlePaymentChange(payment)}
                      />
                      <label htmlFor="payment1">{payment}</label>
                    </div>
                  ))}
                </div>
              </div>


              <div className="filter-container">
                <div className="filter-title">Delivery type</div>
                <div className="filter-list">
                  {availableDeliveryMethods.map(delivery => (
                    <div key={delivery}>
                      <input
                        type="checkbox"
                        id="delivery1"
                        name="delivery"
                        value={delivery}
                        checked={selectedDeliveryMethods.includes(delivery)}
                        onChange={this.handleDeliveryChange(delivery)}
                      />
                      <label htmlFor="delivery1">{delivery}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="lots">
            {/*<h1>Lots:</h1>*/}
            <div className="lots-grid">
              {lots.map(lot => <LotCard {...lot} key={lot.name} />)}
            </div>
            <div className="pagination">
              {activePage !== 1
                ? (
                  <div className="pagination-item" onClick={this.handlePrevPage}>
                    <i className="fas fa-chevron-left"></i>
                  </div>
                )
                : null
              }


              {pagesArray.map((page) => (
                <div key={page} className={`pagination-item ${activePage === page ? 'active' : ''}`} onClick={this.changeActivePage.bind(this, page)}>
                  {page}
                </div>
              ))}

              {activePage !== pagesArray[pagesArray.length - 1]
                ? (
                  <div className="pagination-item" onClick={this.handleNextPage}>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                )
                : null
              }

            </div>
          </section>
        </div>
      </section>
    );
  }
}
