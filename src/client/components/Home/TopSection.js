import React from 'react';
import videoMP4 from '../../assets/video/top-section-video.mp4';
import videWEBM from '../../assets/video/top-section-video.webm';

export default function TopSection() {
  return (
    <section className="top-section">
      <div className="background-video">
        <video autoPlay muted loop>
          <source src={videoMP4} type="video/mp4" />
          <source src={videWEBM} type="video/webm" />
        </video>
      </div>
      <div className="top-section-content">
        <h1>Auction</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!</p>
      </div>
    </section>
  );
}
