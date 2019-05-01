import React from 'react';
import TopSection from './TopSection';
import LastLotsSection from './LastLotsSection';
import Content from './Content/Content';

export default function Home() {
  return (
    <React.Fragment>
      <TopSection />
      <Content/>
      <LastLotsSection />
    </React.Fragment>
  );
}
