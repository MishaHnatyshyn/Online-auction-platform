import React from 'react';
import axios from 'axios/index';
import { NavLink } from 'react-router-dom';
import GridItem from './GridItem';

export default class LotsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lots: []
    };
  }

  fetchLastLots = () => {
    axios.post('/api/lots/last').then((res) => {
      this.setState({ lots: res.data })
    }).catch((err) => {})
  }

  componentDidMount() {
    this.fetchLastLots()
  }

  render() {
    const { lots } = this.state;
    const count = lots.length;
    const columnCount = Math.floor(count / 5);
    return (
      <div className="grid-main">
        <div className="grid-column">
          {lots.slice(0, columnCount).map(lot => <GridItem key={lot._id} {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount, columnCount * 2).map(lot => <GridItem key={lot._id} {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount * 2, columnCount * 3).map(lot => <GridItem key={lot._id} {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount * 3, columnCount * 4).map(lot => <GridItem key={lot._id} {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount * 4, columnCount * 5).map(lot => <GridItem key={lot._id} {...lot} />)}
        </div>
        <div className="view-more">
          <NavLink to="/lots">View more...</NavLink>
        </div>
      </div>
    );
  }
}
