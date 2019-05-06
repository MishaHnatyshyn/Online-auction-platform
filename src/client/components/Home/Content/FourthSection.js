import React from 'react';
import SectionTitle from '../SectionTitle';

export default function FourthSection({ history }) {
  const openPlaceALot = () => {
    history.push('/lot/new');
  };
  const openSearchLots = () => {
    history.push('/lots');
  };
  return (
    <section className="content-section fourth">
      <div>
        <SectionTitle className="white right" text="Got interested?" />
        <div className="text-container">
          <h3>Let's try!</h3>
          <p>Want to sell something? Place your first lot on our platform</p>
          <button type="button" className="button-common" onClick={openPlaceALot}>Place a lot</button>
          <p>Looking for something?</p>
          <button type="button" className="button-common" onClick={openSearchLots}>Search lots</button>
          <p>Or look at the recent placed lots</p>
          <i className="fas fa-angle-double-down arrow-down-last-section" />
        </div>

      </div>
    </section>
  );
}
