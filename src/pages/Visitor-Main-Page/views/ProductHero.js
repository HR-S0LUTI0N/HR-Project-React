import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://img.freepik.com/free-psd/3d-cartoon-men-illustration_1150-66068.jpg?w=1480&t=st=1686344218~exp=1686344818~hmac=19f8de0ebabc0674da9cd809696a79b9381c47918a499cb25f6670636bc7655a';

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
