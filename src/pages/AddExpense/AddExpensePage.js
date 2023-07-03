import React from 'react'
import Grid from '@mui/material/Grid';
import AddExpense from './AddExpense'

export default function AddExpensePage() {
    return (
        <>
            <Grid item xs={12} md={6} maxWidth='80%'>
                <AddExpense
                    title="Expense Create"
                    subheader="Expense Information"
                />
            </Grid >
         </>
    )
}