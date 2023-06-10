import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage =
  'https://img.freepik.com/free-psd/3d-cartoon-men-illustration_1150-66068.jpg?w=1480&t=st=1686331637~exp=1686332237~hmac=6de519b72735102868f2cae60113729c3554ff6f3de8af1ac7c920f47a717301';

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
