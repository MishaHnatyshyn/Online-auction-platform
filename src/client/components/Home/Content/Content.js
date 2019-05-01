import React from 'react';
import FirstSection from './FirstSection';
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import FourthSection from './FourthSection';

export default function Content() {
  return (
    <React.Fragment>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </React.Fragment>
  );
}
