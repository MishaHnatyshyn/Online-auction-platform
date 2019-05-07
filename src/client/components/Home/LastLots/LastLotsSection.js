import React from 'react';
import LotsGrid from './LotsGrid';
import SectionTitle from '../Content/SectionTitle';
import './lastLots.scss'

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
