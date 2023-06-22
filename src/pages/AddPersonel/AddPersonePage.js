import React from 'react'
import {
    Grid,
    Table,
    Container,
    Typography,
    Card,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    IconButton,
    TableRow,
    Avatar,
    TableHead,
    Paper,
    Stack,
    Box,
} from '@mui/material';

import {
    AppTasks,
    AppNewsUpdate,
    AppOrderTimeline,
    AppCurrentVisits,
    AppWebsiteVisits,
    AppTrafficBySite,
    AppWidgetSummary,
    AppCurrentSubject,

} from '../../sections/@dashboard/app';
import AddError from './AddError'
import AppConversionRates from './AppConversionRates';




export default function AddPersonePage() {
    return (
        <>
            <Grid item xs={12} md={6} maxWidth='80%'>
                <AppConversionRates
                    title="Employee Create"
                    subheader="Employee Information"
                />
            </Grid >
        </>
    )
}
