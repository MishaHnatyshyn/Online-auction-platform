import React from 'react';
import LotsGrid from './LotsGrid';

export default class LastLotsSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="last-lot-section">
        <div>
          <h2 className="section-title">Last lots</h2>
          <LotsGrid />
        </div>
      </section>

    );
  }
}
