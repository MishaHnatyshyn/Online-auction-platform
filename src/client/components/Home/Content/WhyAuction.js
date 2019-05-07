import React from 'react';
import SectionTitle from '../SectionTitle'

export default function WhyAuction() {
  return(
    <section className="content-section why-auction">
      <div>
        <SectionTitle className="left" text="Why auction?"/>
        <div className="cards-container">
          <figure className="card">
            <img src="https://www.pngrepo.com/png/58847/170/auction.png"/>
            <figcaption>
              <h3>Live bidding system</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!</p>
            </figcaption>
          </figure>
          <figure className="card">
            <img src="https://www.pngrepo.com/png/284854/170/secure-shield-shield.png"/>
            <figcaption>
              <h3>Secure transfers</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!</p>
            </figcaption>
          </figure>
          <figure className="card">
            <img src="https://www.pngrepo.com/png/9721/170/coin-stack.png"/>
            <figcaption>
              <h3>Mutual benefit</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!</p>
            </figcaption>
          </figure>
          <figure className="card">
            <img src="https://www.pngrepo.com/png/17334/170/comments.png"/>
            <figcaption>
              <h3>Community</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
