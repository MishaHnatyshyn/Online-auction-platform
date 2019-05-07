import React from 'react';
import SectionTitle from '../SectionTitle';

export default function OurTeam() {
  return (
    <section className="content-section third">
      <div>
        <SectionTitle className="left" text="Our team" />
        <div className="content-container">
          <div className="our-team-card">
            <div className="image-container">
              <img src="https://image.freepik.com/free-photo/man-smiling-with-arms-crossed_1187-2903.jpg" alt="CEO photo" />
            </div>
            <div className="name-container">
              Full Name
            </div>
            <div className="position-container">
              CTO
            </div>
            <p className="text-container-team">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos."
            </p>
          </div>
          <div className="our-team-card">
            <div className="image-container">
              <img src="http://www.hkaes.org/wp-content/uploads/2014/05/mhc.jpg" alt="CEO photo" />
            </div>
            <div className="name-container">
              Full Name
            </div>
            <div className="position-container">
              CEO
            </div>
            <p className="text-container-team">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos."
            </p>
          </div>
          <div className="our-team-card">
            <div className="image-container">
              <img src="https://image.freepik.com/free-photo/no-translate-detected_1154-233.jpg" alt="CEO photo" />
            </div>
            <div className="name-container">
              Full Name
            </div>
            <div className="position-container">
              PR
            </div>
            <p className="text-container-team">
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
