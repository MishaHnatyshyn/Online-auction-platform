import React from 'react';
import axios from 'axios/index';
import {NavLink} from "react-router-dom";

const SearchItem = ({ link, image, name, description, onClick }) => (
  <li className="search-item" onClick={onClick}>
    <NavLink to={link}>
      <div className="search-photo">
        <img src={image} alt={name}/>
      </div>
      <div className="search-data">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </NavLink>
  </li>
)

const NoItemsFound = () => (
  <li className="search-item no-items">
    No items found
  </li>
)


export default class SiteSearch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: []
    }
    this.requestTimeout = null;
  }

  fetchData = () => {
    const { text } = this.state;
    if (!text) return;
    axios.post('/api/site/search', { text })
      .then((res) => {
        this.setState({ items: res.data })
      })
  }

  delayRequest = () => {
    clearTimeout(this.requestTimeout)
    this.requestTimeout = setTimeout(this.fetchData, 400)
  }

  handleTextChange = (e) => {
    this.setState({ text: e.target.value }, this.delayRequest)
  }

  clear = () => {
    this.setState({ text: '', items: [] })
  }

  render() {
    const { text, items } = this.state;
    return(
      <div className="search">
        <input type="text" autoComplete="off" placeholder="Search on site..." name="search" value={text} onChange={this.handleTextChange}/>
        {text ? <i onClick={this.clear} className="fas fa-times"/> : <i className="fas fa-search" />}
        { text
          ? (<ul className="site-search-drop-down" onClick={this.clear}>
              {items.length
                ? items.map(item => <SearchItem {...item} onClick={this.props.toggleMobileMenu}/>)
                : <NoItemsFound/>
              }
            </ul>)
          : null
        }

      </div>
    )
  }

}
