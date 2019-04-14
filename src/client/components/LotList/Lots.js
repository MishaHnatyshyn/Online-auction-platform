import React from 'react';

import LotCard from './LotCard';
import Pagination from "./Pagination";
import LotsData from "./StaticData";

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
      pagesCount: 1
    };
  }

  componentDidMount = () => {
    const payments = [...new Set(...LotsData.map(_ => _.payment))];
    const deliveries = [...new Set(...LotsData.map(_ => _.delivery))];
    this.setState({
      lots: LotsData,
      availablePaymentMethods: payments,
      selectedPaymentMethods: payments,
      availableDeliveryMethods: deliveries,
      selectedDeliveryMethods: deliveries,
      pagesCount: Math.ceil(LotsData.length / 9),
    });
  }

  changeActivePage = (page) => {
    this.setState({ activePage: page })
  }

  handlePaymentChange = payment => event => {
    event.preventDefault();
    const currentPaymentMethods = [...this.state.selectedPaymentMethods];
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
      pagesCount,
    } = this.state;
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
            <div className="lots-grid">
              {lots.slice((activePage - 1) * 9, (activePage - 1) * 9 + 9).map(lot => <LotCard {...lot} key={lot.name} />)}
            </div>
            <Pagination changeActivePage={this.changeActivePage} active={activePage} pageCount={pagesCount}/>
          </section>
        </div>
      </section>
    );
  }
}
