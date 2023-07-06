import * as React from 'react';
import AppFooter from './views/AppFooter';
import ProductHero from './views/ProductHero';
import ProductValues from './views/ProductValues';
import AppAppBar from './views/AppAppBar';
import withRoot from './withRoot';
import UserProfile from './views/userprofile-visitor';

function VisitorMainPage() {
  return (
    <>
      <AppAppBar />
    </>
  );
}

export default withRoot(VisitorMainPage);
