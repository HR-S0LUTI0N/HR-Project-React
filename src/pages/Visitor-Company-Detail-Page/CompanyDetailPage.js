import React from 'react'
import withRoot from './withRoot';
import AppAppBar from './views/AppAppBar';
import CompanyContent from './views/CompanyContent';
import AppFooter from './views/AppFooter';

function CompanyDetailPage() {
    return (
        <>
            <AppAppBar />
            <CompanyContent />
            <AppFooter />
        </>
    )
}

export default withRoot(CompanyDetailPage);