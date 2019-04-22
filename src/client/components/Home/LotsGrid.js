import React from 'react';
import { NavLink } from 'react-router-dom';
import GridItem from './GridItem';

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
  'https://i2.rozetka.ua/goods/1784911/apple_airpods_images_1784911319.jpg',
  'https://i1.rozetka.ua/goods/1127297/hyperx_cloud_core_images_1127297246.jpg',
  'https://i1.rozetka.ua/goods/1882711/xiaomi_hsej03jy_black_images_1882711880.jpg',
  'https://i2.rozetka.ua/goods/434611/kingston_hyperx_cloud_ii_gun_metal_images_434611672.jpg',
  'https://i1.rozetka.ua/goods/1741362/hyperx_hx_hscs_bk_ee_images_1741362158.jpg',
  'https://i2.rozetka.ua/goods/10462238/panasonic_rp_hje125e_k_images_10462238132.jpg',
  'https://i2.rozetka.ua/goods/2148230/hyperx_hx_hsca_rdee_images_2148230695.jpg',
  'https://i1.rozetka.ua/goods/11167527/samsung_sm_r170nzkasek_images_11167527579.jpg',
]

export default class LotsGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    this.setState({ photos })
  }

  render() {
    const count = this.state.photos.length;
    const columnCount = Math.floor(count / 4)
    return (
      <div className="grid-main">
        <div className="grid-column">
          {this.state.photos.slice(0, columnCount).map(photo => <GridItem photo={photo}/>)}
        </div>
        <div className="grid-column">
          {this.state.photos.slice(columnCount, columnCount * 2).map(photo => <GridItem photo={photo}/>)}
        </div>
        <div className="grid-column">
          {this.state.photos.slice(columnCount * 2, columnCount * 3).map(photo => <GridItem photo={photo}/>)}
        </div>
        <div className="grid-column">
          {this.state.photos.slice(columnCount * 3, columnCount * 4).map(photo => <GridItem photo={photo}/>)}
        </div>
        <div className="view-more">
          <NavLink to="/lots">View more</NavLink>
        </div>
      </div>
    );
  }
}
