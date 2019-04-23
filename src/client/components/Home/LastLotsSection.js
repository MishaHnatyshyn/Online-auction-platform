import React from 'react';
import LotsGrid from './LotsGrid';
import SectionTitle from './SectionTitle'

export default class LastLotsSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="last-lot-section">
        <div>
          <SectionTitle text="Last lots" />
          <LotsGrid />
        </div>
      </section>

    );
  }
}
