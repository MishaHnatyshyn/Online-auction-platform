import React from 'react';
import TopSection from './TopSection';
import LastLotsSection from './LastLotsSection';
import Content from './Content/Content';

export default function Home({ history }) {
  return (
    <React.Fragment>
      <TopSection />
      <Content history={history}/>
      <LastLotsSection />
    </React.Fragment>
  );
}
