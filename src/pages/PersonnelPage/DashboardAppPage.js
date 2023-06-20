import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Iconify from '../../components/iconify';
import CommentBox from './commentBox';
import PersonnelCommentTable from './PersonnelCommentTable';
import {
  AppNewsUpdate,
  AppOrderTimeline,
  AppWidgetSummary,
} from '../../sections/@dashboard/app';

export default function DashboardAppPage() {
  const theme = useTheme();
  const token = sessionStorage.getItem('token');
  const [personnelData, setPersonnelData] = useState();
  const roles = sessionStorage.getItem('roles');
  const navigate = useNavigate();

  const [comments, setComments] = useState(
    [...Array(5)].map((_, index) => ({
      id: faker.datatype.uuid(),
      title: faker.name.jobTitle(),
      description: faker.name.jobTitle(),
      image: `/assets/images/covers/cover_${index + 1}.jpg`,
      postedAt: faker.date.recent(),
    }))
  );

  React.useEffect(() => {
    if (token == null) {
      navigate('/404')
    } else if (!roles.includes('PERSONEL')) {
      navigate('/404');
    } else {

      axios.get(`http://localhost:9070/api/v1/company/get-personnel-dashboard-information/${token}`)
        .then((response) => {
          const data = response.data;
          setPersonnelData(data);
          console.log(data)
        })
        .catch((error) => {
          console.log('Error', error)
        })
    }
  }, [])




  return (
    <>
      <Helmet>
        <title>Dashboard | Minimal UI</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome Personnel
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Company Name"
              total={personnelData === undefined || personnelData.companyName === null ?
                "" : `${personnelData.companyName} ${personnelData.title}`} icon={'mdi:company'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Wage Day" total={personnelData === undefined || personnelData.wageDate === null ?
              "" : `${personnelData.wageDate}`} color="info" icon={'clarity:date-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Department" total={personnelData === undefined || personnelData.department === null ?
              "" : `${personnelData.department}`} color="warning" icon={'mingcute:department-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Wage" total={personnelData === undefined || personnelData.wage === null ?
              "" : `${personnelData.wage}`} color="error" icon={'majesticons:lira-circle'} />
          </Grid>

          <Grid item xs={12} md={6} lg={14}>
            <AppOrderTimeline
              title="Shift, Break, Public Holiday"
              list={[...Array(3)].map((_, index) => ({
                title: [
                  `Shifts: ${personnelData === undefined || personnelData.jobShift === null ? "" : personnelData.jobShift}`,
                  `Break: ${personnelData === undefined || personnelData.jobBreak === null ? "" : personnelData.jobBreak}`,
                  `Public Holiday: ${personnelData === undefined || personnelData.holidayDates === null ? "" : personnelData.holidayDates}`,
                ][index],
                type: `order${index + 1}`,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={14}>
            <PersonnelCommentTable />
          </Grid>
          <Grid item xs={12} md={6} lg={14} mt={3}>
            <CommentBox />
          </Grid>
        </Grid>
      </Container >
    </>
  );
}
