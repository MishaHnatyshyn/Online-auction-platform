import React from 'react';
import TopSection from './TopSection/TopSection';
import LastLotsSection from './LastLots/LastLotsSection';
import Content from './Content/Content';
import './home.scss'

export default function Home({ history }) {
  return (
    <React.Fragment>
      <TopSection />
      <Content history={history}/>
      <LastLotsSection />
    </React.Fragment>
  );
}
