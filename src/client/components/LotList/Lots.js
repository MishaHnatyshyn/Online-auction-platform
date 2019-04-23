import React from 'react';

import LotCard from './LotCard';
import Pagination from "./Pagination";
import LotsData from "../StaticData";

const CheckBox = ({id, name, checked, handler, label, value}) => (
  <label className="check-box-container">
    {label}
    <input type="checkbox"  name={name} id={id} value={value} checked={checked} onChange={handler} />
    <span className="checkmark" />
  </label>
)

const RadioButton = ({id, name, checked, handler, label, value}) => (
  <label className="radio-button-container">
    {label}
    <input type="radio" name={name} id={id} value={value} checked={checked} onChange={handler} />
    <span className="checkmark"/>
  </label>
)

export default class Lots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lots: [],
      priceFrom: 0,
      priceTo: 0,
      activePage: 1,
      availablePaymentMethods: [],
      selectedPaymentMethods: [],
      availableDeliveryMethods: [],
      selectedDeliveryMethods: [],
      pagesCount: 1,
      visibleLots: [],
      sortFunc: () => false
    };
    this.sortFuncs = {
      dateAZ: (a, b) => Date.parse(a.timestamp) -Date.parse(b.timestamp),
      dateZA: (a, b) =>  Date.parse(b.timestamp) - Date.parse(a.timestamp),
      priceAZ: (a, b) => a.startPrice - b.startPrice,
      priceZA: (a, b) => b.startPrice - a.startPrice,
      nameAZ: (a, b) => a.name.localeCompare(b.name),
      nameZA: (a, b) => b.name.localeCompare(a.name),
    }
  }

  componentDidMount = () => {
    const payments = [...new Set(...LotsData.map(_ => _.payment))];
    const deliveries = [...new Set(...LotsData.map(_ => _.delivery))];
    this.setState({
      lots: LotsData,
      visibleLots: LotsData,
      availablePaymentMethods: payments,
      selectedPaymentMethods: payments,
      availableDeliveryMethods: deliveries,
      selectedDeliveryMethods: deliveries,
      pagesCount: Math.ceil(LotsData.length / 9),
    });
  }

  changeSortFunc = (e) => {
    const func = e.target.value;
    this.setState({ sortFunc: this.sortFuncs[func] }, this.updateVisibleLots)
  }

  updateVisibleLots = () => {
    const newLots = this.state.lots.filter(this.filter);
    newLots.sort(this.state.sortFunc)
    this.setState({
      activePage: 1,
      visibleLots: newLots,
      pagesCount: Math.ceil(newLots.length / 9)
    })
  }

  changePriceRange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    if (!value.match(/^[0-9]*$/) || value[0] === '0') return;
    this.setState({ [name]: value }, this.updateVisibleLots)
  }

  changeActivePage = (page) => {
    this.setState({ activePage: page })
  }

  handlePaymentChange = payment => event => {
    const currentPaymentMethods = [...this.state.selectedPaymentMethods];
    if (currentPaymentMethods.includes(payment)) {
      currentPaymentMethods.splice(currentPaymentMethods.indexOf(payment), 1)
    } else currentPaymentMethods.push(payment)
    console.log(currentPaymentMethods)
    this.setState({ selectedPaymentMethods: currentPaymentMethods}, this.updateVisibleLots)
  }

  handleDeliveryChange = delivery => event => {
    const currentDeliveryMethods = [...this.state.selectedDeliveryMethods];
    if (currentDeliveryMethods.includes(delivery)) {
      currentDeliveryMethods.splice(currentDeliveryMethods.indexOf(delivery), 1)
    } else currentDeliveryMethods.push(delivery)
    this.setState({ selectedDeliveryMethods: currentDeliveryMethods}, this.updateVisibleLots)
  }

  filter = (lot) => {
    const {
      selectedPaymentMethods,
      selectedDeliveryMethods,
      priceFrom,
      priceTo
    } = this.state;
    if (priceFrom && lot.startPrice < priceFrom) return false;
    if (priceTo && lot.startPrice > priceTo) return false;
    if (!selectedPaymentMethods.filter((_) => lot.payment.includes(_)).length) return false;
    if (!selectedDeliveryMethods.filter((_) => lot.delivery.includes(_)).length) return false;
    return true;
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
      priceFrom,
      priceTo,
      visibleLots

    } = this.state;
    return (
      <section className="lots-section">
        <div className="lots-list-content lots-container">
          <section className="filters">
            <div className="filters-container">
              <h2>Filters</h2>

              <div className="filter-container">
                <div className="filter-title">Price</div>
                <div className="filter-list">
                  <div>
                    <RadioButton id="priceAZ" name="sort" value="priceAZ" label="From lower to higher" handler={this.changeSortFunc}/>
                  </div>
                  <div>
                    <RadioButton id="priceZA" name="sort" value="priceZA" label="From higher to lower" handler={this.changeSortFunc}/>
                  </div>
                  <div className="price-range">
                    <div>
                      <input type="text" placeholder="From" id="price-from" name="priceFrom" value={priceFrom || ''} onChange={this.changePriceRange}/>-
                      <input type="text" placeholder="To" id="price-to" name="priceTo" value={priceTo || ''} onChange={this.changePriceRange}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-container">
                <div className="filter-title">Name</div>
                <div className="filter-list">
                  <div>
                    <RadioButton id="nameAZ" value="nameAZ" name="sort" label="From A to Z" handler={this.changeSortFunc}/>
                  </div>
                  <div>
                    <RadioButton id="nameZA" value="nameZA" name="sort" label="From Z to A" handler={this.changeSortFunc}/>
                  </div>
                </div>
              </div>

              <div className="filter-container">
                <div className="filter-title">Date</div>
                <div className="filter-list">
                  <div>
                    <RadioButton id="dateAZ" value="dateAZ" name="sort" label="From A to Z" handler={this.changeSortFunc}/>
                  </div>
                  <div>
                    <RadioButton id="dateZA" value="dateZA" name="sort" label="From Z to A" handler={this.changeSortFunc}/>
                  </div>
                </div>
              </div>


              <div className="filter-container">
                <div className="filter-title">Payment type</div>
                <div className="filter-list">
                  {availablePaymentMethods.map(payment => (
                    <div key={payment}>
                      <CheckBox
                        id="payment1"
                        name="payment"
                        value={payment}
                        label={payment}
                        checked={selectedPaymentMethods.includes(payment)}
                        handler={this.handlePaymentChange(payment)}
                      />
                    </div>
                  ))}
                </div>
              </div>


              <div className="filter-container">
                <div className="filter-title">Delivery type</div>
                <div className="filter-list">
                  {availableDeliveryMethods.map(delivery => (
                    <div key={delivery}>
                      <CheckBox
                        type="checkbox"
                        id="delivery1"
                        name="delivery"
                        value={delivery}
                        label={delivery}
                        checked={selectedDeliveryMethods.includes(delivery)}
                        handler={this.handleDeliveryChange(delivery)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="lots">
            <div className="lots-grid">
              {visibleLots.filter(this.filter).slice((activePage - 1) * 9, (activePage - 1) * 9 + 9).map(lot => <LotCard {...lot} key={lot.name} />)}
            </div>
            <Pagination changeActivePage={this.changeActivePage} active={activePage} pageCount={pagesCount}/>
          </section>
        </div>
      </section>
    );
  }
}
