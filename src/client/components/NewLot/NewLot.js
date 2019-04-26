import React from 'react';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';
import SuccessAlert from './SuccessAlert';
import ErrorAlert from './ErrorAlert';

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

const ImageContainer = ({index, img, close }) => (
  <div>
    <span className="close-button" onClick={close}>
      <i className="far fa-times-circle"/>
    </span>
    <img src={img} alt={index}/>
  </div>
)

export default class NewLot extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: '',
      description: '',
      price: 0,
      buyNow: 0,
      payment: [],
      delivery: [],
      images: [],
      imagesPreview: [],
      category: '',
      errorAlert: false,
      successAlert: false,
      createdLotId: '',
      validationError: false
    }
  }

  validate = () => {
    const { name, description, price, payment, delivery, images, category, buyNow } = this.state;
    return (
      name
      && description
      && price
      && payment.length
      && delivery.length
      && category
      && images.length
      && price > buyNow
    )
  }

  closePopups = () => {
    this.setState({ errorAlert: false, successAlert: false,})
  }

  openErrorPopup = () => {
    this.setState({ errorAlert: true })
  }

  openSuccessPopup = (createdLotId) => {
    this.setState({ successAlert: true, createdLotId })
  }

  openCreatedLotPage = () => {
    this.props.history.push(`/lots/${this.state.createdLotId}`)
  }

  clearData = () => {
    this.setState({
      name: '',
      description: '',
      price: 0,
      buyNow: 0,
      payment: [],
      delivery: [],
      images: [],
      imagesPreview: [],
      category: '',
      errorAlert: false,
      successAlert: false,
      validationError: false,
      createdLotId: ''
    })
  }

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value })
  }

  hideValidationError = () => {
    this.setState({ validationError: false })
  }

  createLot = () => {
    const {
      name,
      description,
      price,
      payment,
      delivery,
      images,
      category,
      buyNow
    } = this.state;

    if (!this.validate()) return this.setState({ validationError: true })
    const imagesArray = [...images]
    axios
      .post('/api/lot/create',{
        name,
        description,
        startPrice: price,
        photos: imagesArray.map(_ => _.name),
        payment,
        delivery,
        category,
        byNowPrice: buyNow || null
      })
      .then((res) => {
        const { _id } = res.data;
        const formData = new FormData();
        formData.append('dir', _id)
        imagesArray.forEach(image => formData.append('photos', image))
        axios.post( '/api/lot/create/photos',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            this.openSuccessPopup(_id)
          })
          .catch(err => {
            this.openErrorPopup();
          })
      })
      .catch((err) => {
        this.openErrorPopup();
      })
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value }, this.hideValidationError)
  }

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value }, this.hideValidationError)
  }

  handlePriceChange = (e) => {
    const { value } = e.target
    if (!value.match(/^[0-9]*$/) || value[0] === '0') return;
    this.setState({ price: value }, this.hideValidationError)
  }

  handleBuyNowPriceChange = (e) => {
    const { value } = e.target
    if (!value.match(/^[0-9]*$/) || value[0] === '0') return;
    this.setState({ buyNow: value }, this.hideValidationError)
  }

  handlePaymentChange = (e) => {
    const payment = e.target.value;
    const newPayment = [...this.state.payment];
    if (newPayment.includes(payment)){
      newPayment.splice(newPayment.indexOf(payment), 1)
    } else newPayment.push(payment)
    this.setState({ payment: newPayment }, this.hideValidationError)
  }

  handleDeliveryChange = (e) => {
    const delivery = e.target.value;
    const newDelivery = [...this.state.delivery];
    if (newDelivery.includes(delivery)){
      newDelivery.splice(newDelivery.indexOf(delivery), 1)
    } else newDelivery.push(delivery)
    this.setState({ delivery: newDelivery }, this.hideValidationError)
  }

  handleImagesUpload = data => {
    this.setState({...data}, this.hideValidationError);
  }

  deletePhoto = index => {
    const newImages = [...this.state.images];
    const newImagesPreview = [...this.state.imagesPreview];
    newImages.splice(index, 1);
    newImagesPreview.splice(index, 1);
    this.setState({
      images: newImages,
      imagesPreview: newImagesPreview
    }, this.hideValidationError);
  }

  render(){
    const {
      name,
      description,
      price,
      payment,
      delivery,
      imagesPreview,
      category,
      errorAlert,
      successAlert,
      createdLotId,
      validationError,
      buyNow
    } = this.state;
    return(
      <section className="new-lot-section">
        {errorAlert ? <ErrorAlert close={this.closePopups}/> : null}
        {successAlert ? <SuccessAlert close={this.closePopups} lot={createdLotId}/> : null}
        <div className="new-lot-container">
          <div className="new-lot-top">
            <div className="new-lot-left">
              <form className="new-lot-form">
                <div className="form-input-container">
                  <label htmlFor="name">Lot name<span className="required">*</span></label>
                  <input type="text" name="name" id="name" value={name} onChange={this.handleNameChange}/>
                </div>

                <div className="form-input-container">
                  <label htmlFor="description">Lot description<span className="required">*</span></label>
                  <textarea name="description" id="description" value={description} onChange={this.handleDescriptionChange}/>
                </div>

                <div className="form-input-container">
                  <label htmlFor="category">Category<span className="required">*</span></label>
                  <select name="category" id="category" value={category} onChange={this.handleCategoryChange}>
                    <option value="" disabled hidden></option>
                    <option>Art</option>
                    <option>Household appliances</option>
                    <option>Clothing</option>
                    <option>Electronics</option>
                    <option>Drinks</option>
                    <option>Jewelry</option>
                    <option>Furniture</option>
                    <option>Coins</option>
                    <option>Stamps</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-input-container-row">
                  <div className="form-input-container">
                    <label htmlFor="price">Lot start price<span className="required">*</span></label>
                    <div className="price-wrapper">
                      <input type="text" name="price" id="price" className="price" value={price} onChange={this.handlePriceChange}/>
                    </div>
                  </div>

                  <div className="form-input-container">
                    <label htmlFor="buyNow">Lot "Buy now" price</label>
                    <div className="price-wrapper">
                      <input type="text" name="buyNow" id="buyNow" className="buyNow" value={buyNow} onChange={this.handleBuyNowPriceChange}/>
                    </div>
                  </div>
                </div>


                <div className="form-input-container">
                  <label htmlFor="payment">Payment methods<span className="required">*</span></label>
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
                  <label htmlFor="delivery">Delivery methods<span className="required">*</span></label>
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
              {imagesPreview.length > 0
                ? (
                  <div className="uploaded-photo-list">
                    {imagesPreview.map((img, index) => <ImageContainer img={img} index={index} close={this.deletePhoto.bind(this, index)}/>)}
                  </div>
                )
                : (
                  <div className="drag-drop-container">
                    <DragAndDrop handleImagesUpload={this.handleImagesUpload}>
                      <div className="drag-drop-text">
                        <p>You can add up to 5 photos of your lot!</p>
                        <p>Click here or drag&drop to upload photos</p>
                        <p>You should upload at least 1 image!<span className="required">*</span></p>
                      </div>
                    </DragAndDrop>
                  </div>
                )
              }
            </div>
          </div>
          <div className="new-lot-bottom">
            {validationError ? <span className="required">Please fill all the fields with "*"</span> : null}
            <button className="button-common" onClick={this.createLot}>Create</button>
          </div>
        </div>
      </section>
    )
  }
}
