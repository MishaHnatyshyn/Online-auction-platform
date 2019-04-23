import React from 'react';
import { NavLink } from 'react-router-dom';
import GridItem from './GridItem';
import StaticData from '../StaticData';

export default class LotsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lots: []
    };
  }

  componentDidMount() {
    this.setState({ lots: StaticData.slice(0, 22) });
  }

  render() {
    const { lots } = this.state;
    const count = lots.length;
    const columnCount = Math.floor(count / 5);
    return (
      <div className="grid-main">
        <div className="grid-column">
          {lots.slice(0, columnCount).map(lot => <GridItem {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount, columnCount * 2).map(lot => <GridItem {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount * 2, columnCount * 3).map(lot => <GridItem {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount * 3, columnCount * 4).map(lot => <GridItem {...lot} />)}
        </div>
        <div className="grid-column">
          {lots.slice(columnCount * 4, columnCount * 5).map(lot => <GridItem {...lot} />)}
        </div>
        <div className="view-more">
          <NavLink to="/lots">View more</NavLink>
        </div>
      </div>
    );
  }
}
