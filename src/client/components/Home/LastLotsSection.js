import React from 'react';
import LotsGrid from './LotsGrid';
import SectionTitle from './SectionTitle';

export default function LastLotsSection() {
  return (
    <section className="last-lot-section">
      <div>
        <SectionTitle text="Last lots" />
        <LotsGrid />
      </div>
    </section>
  );
}
