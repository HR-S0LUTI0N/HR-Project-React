import React from 'react'
import Grid from '@mui/material/Grid';

import AddCompany from './AddCompany'

export default function AddCompanyPage() {
    return (
        <Grid item xs={12} md={6} maxWidth='80%'>
            <AddCompany
                title="Company Create"
                subheader="Company Information"
            />
        </Grid >
    )
}
