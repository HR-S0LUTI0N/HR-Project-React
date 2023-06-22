import React from 'react'
import Grid from '@mui/material/Grid';
import { Provider } from './context/DatesContext'
import AddCompany from './AddCompany'

export default function AddCompanyPage() {
    return (
        <Provider>
            <Grid item xs={12} md={6} maxWidth='80%'>
                <AddCompany
                    title="Company Create"
                    subheader="Company Information"
                />
            </Grid >
        </Provider>
    )
}
