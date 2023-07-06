import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';
import PeopleWorking from '../../../images/PeopleWorking.jpg'


export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${PeopleWorking})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={PeopleWorking}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Solve Your Business Problems
      </Typography>
    </ProductHeroLayout>
  );
}
