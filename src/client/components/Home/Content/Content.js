import React from 'react';
import WhyAuction from './WhyAuction';
import AboutUs from './AboutUs';
import OurTeam from './OurTeam';
import GotInterested from './GotInterested';

export default function Content({ history }) {
  return (
    <React.Fragment>
      <WhyAuction />
      <AboutUs />
      <OurTeam />
      <GotInterested history={history}/>
    </React.Fragment>
  );
}
