import * as React from 'react';
import AppFooter from './views/AppFooter';
import ProductHero from './views/ProductHero';
import ProductValues from './views/ProductValues';
import AppAppBar from './views/AppAppBar';
import withRoot from './withRoot';

function VisitorMainPage() {
    return (
        <>
            <AppAppBar />
            <ProductHero />
            <ProductValues />
            <AppFooter />
        </>
    );
}

export default withRoot(VisitorMainPage);