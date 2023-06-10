import React from 'react'
import withRoot from './withRoot';
import AppAppBar from './views/AppAppBar';
import CompanyContent from './views/CompanyContent';

function CompanyDetailPage() {
    return (
        <>
            <AppAppBar />
            <CompanyContent />
        </>
    )
}

export default withRoot(CompanyDetailPage);