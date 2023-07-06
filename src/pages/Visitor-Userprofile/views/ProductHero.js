import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://img.freepik.com/free-psd/3d-cartoon-men-illustration_1150-66068.jpg?w=1480&t=st=1687260788~exp=1687261388~hmac=f2ff1962f3e0f4f6b26376036fab446d64bf5c4f4b08e44ab5aec1c271448a21';

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Solve Your Business Problems
      </Typography>
    </ProductHeroLayout>
  );
}
