import React from 'react';

import LotCard from './LotCard';

const photos = [
  'https://i2.rozetka.ua/goods/1784911/apple_airpods_images_1784911319.jpg',
  'https://i1.rozetka.ua/goods/1127297/hyperx_cloud_core_images_1127297246.jpg',
  'https://i1.rozetka.ua/goods/1882711/xiaomi_hsej03jy_black_images_1882711880.jpg',
  'https://i2.rozetka.ua/goods/434611/kingston_hyperx_cloud_ii_gun_metal_images_434611672.jpg',
  'https://i1.rozetka.ua/goods/1741362/hyperx_hx_hscs_bk_ee_images_1741362158.jpg',
  'https://i2.rozetka.ua/goods/10462238/panasonic_rp_hje125e_k_images_10462238132.jpg',
  'https://i2.rozetka.ua/goods/2148230/hyperx_hx_hsca_rdee_images_2148230695.jpg',
  'https://i1.rozetka.ua/goods/11167527/samsung_sm_r170nzkasek_images_11167527579.jpg',
  'https://i2.rozetka.ua/goods/2067969/kingston_hx_hscl_sr_na_images_2067969064.jpg',
  'https://i2.rozetka.ua/goods/10660909/smartyou_whrx1bl_images_10660909850.jpg',
];

const LotsData = photos.map((photo, index) => ({
  name: `Lot ${index}`,
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquam aliquid at autem consequatur dignissimos, dolore eveniet in inventore ipsam molestias nam non odit porro quae quasi quos, repellat ullam!',
  startPrice: 100 * index,
  currPrice: 200 * index,
  photos: [photo],
  timestamp: new Date(),
}));


export default class Lots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lots: []
    };
  }

  componentDidMount() {
    this.setState({ lots: LotsData });
  }

  render() {
    const { lots } = this.state;
    return (
      <section className="lots-section">
        <div className="lots-list-content">
          <section className="filters">
            Filters
          </section>
          <section className="lots">
            <h1>Lots:</h1>
            <div className="lots-grid">
              {lots.map(lot => <LotCard {...lot} />)}
            </div>
          </section>
        </div>
      </section>
    );
  }
}
