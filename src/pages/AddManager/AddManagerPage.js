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




export default function AddManagerPage() {
    return (
        <>
            <Grid item xs={12} md={6} maxWidth='80%' mx='auto'>
                <AppConversionRates
                    title="Manager Create"
                    subheader="Manager Information"
                />
            </Grid >
        </>
    )
}
