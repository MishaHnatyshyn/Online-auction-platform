import React from 'react';
import TopSection from './TopSection';
import LastLotsSection from './LastLotsSection';

export default function Home() {
  return (
    <React.Fragment>
      <TopSection />
      <LastLotsSection />
      <section className="some-content">SOME CONTENT</section>
    </React.Fragment>
  );
}
