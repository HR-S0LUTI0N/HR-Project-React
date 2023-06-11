import * as React from 'react';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://img.freepik.com/free-psd/3d-cartoon-men-illustration_1150-66068.jpg?t=st=1686479725~exp=1686480325~hmac=bf73a1b55cecd939fa54331bb3e30b3e5ce670d04a99da59d92676721d0ef0fd';

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
