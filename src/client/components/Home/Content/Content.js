import React from 'react';
import WhyAuction from './WhyAuction/WhyAuction';
import AboutUs from './AboutUs/AboutUs';
import OurTeam from './OurTeam/OurTeam';
import GotInterested from './GotInterested/GotInterested';

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
