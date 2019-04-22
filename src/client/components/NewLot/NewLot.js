import React from 'react';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';

const availAblePayment = ['Cash', 'Visa', 'Mastercard', 'PayPal', 'Other'];
const availAbleDelivery = ['Post office', 'Personal meeting', 'Courier', 'Other'];

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

export default class NewLot extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      price: 0,
      photos: [],
      payment: [],
      delivery: [],
    }
  }

  createLot = () => {}

  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }

  handlePriceChange = (e) => {
    const { value } = e.target
    if (!value.match(/^[0-9]*$/) || value[0] === '0') return;
    this.setState({ price: value })
  }

  handlePaymentChange = (e) => {
    const payment = e.target.value;
    const newPayment = [...this.state.payment];
    if (newPayment.includes(payment)){
      newPayment.splice(newPayment.indexOf(payment), 1)
    } else newPayment.push(payment)
    this.setState({ payment: newPayment })
  }

  handleDeliveryChange = (e) => {
    const delivery = e.target.value;
    const newDelivery = [...this.state.delivery];
    if (newDelivery.includes(delivery)){
      newDelivery.splice(newDelivery.indexOf(delivery), 1)
    } else newDelivery.push(delivery)
    this.setState({ delivery: newDelivery })
  }

  render(){
    const {
      name,
      description,
      price,
      photos,
      payment,
      delivery,
    } = this.state;
    return(
      <section className="new-lot-section">
        <div className="new-lot-container">
          <div className="new-lot-top">
            <div className="new-lot-left">
              <form className="new-lot-form">
                <div className="form-input-container">
                  <label htmlFor="name">Lot name</label>
                  <input type="text" name="name" id="name" value={name} onChange={this.handleNameChange}/>
                </div>

                <div className="form-input-container">
                  <label htmlFor="description">Lot description</label>
                  <textarea name="description" id="description" value={description} onChange={this.handleDescriptionChange}/>
                </div>

                <div className="form-input-container">
                  <label htmlFor="price">Lot price</label>
                  <div className="price-wrapper">
                    <input type="text" name="price" id="price" className="price" value={price} onChange={this.handlePriceChange}/>
                  </div>
                </div>

                <div className="form-input-container">
                  <label htmlFor="payment">Payment methods</label>
                  {availAblePayment.map(item => (
                    <div key={item}>
                      <CheckBox
                        name="payment"
                        value={item}
                        label={item}
                        checked={payment.includes(item)}
                        handler={this.handlePaymentChange}
                      />
                    </div>
                  ))}
                </div>

                <div className="form-input-container">
                  <label htmlFor="delivery">Delivery methods</label>
                  {availAbleDelivery.map(item => (
                    <div key={item}>
                      <CheckBox
                        name="delivery"
                        value={item}
                        label={item}
                        checked={delivery.includes(item)}
                        handler={this.handleDeliveryChange}
                      />
                    </div>
                  ))}
                </div>

              </form>
            </div>
            <div className="new-lot-right">
              <div className="drag-drop-container">
                <DragAndDrop>
                  <div className="drag-drop-text">
                    <p>You can add up to 5 photos of your lot!</p>
                    <p>Click here or drag&drop to upload photos</p>
                  </div>
                </DragAndDrop>
              </div>
            </div>
          </div>
          <div className="new-lot-bottom">
            <button className="button-common">Create</button>
          </div>
        </div>
      </section>
    )
  }
}
