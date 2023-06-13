import { useState } from 'react';
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
  const [comments, setComments] = useState(
    [...Array(5)].map((_, index) => ({
      id: faker.datatype.uuid(),
      title: faker.name.jobTitle(),
      description: faker.name.jobTitle(),
      image: `/assets/images/covers/cover_${index + 1}.jpg`,
      postedAt: faker.date.recent(),
    }))
  );

  const handleAddComment = (comment) => {
    const newComment = {
      id: faker.datatype.uuid(),
      title: comment,
      description: comment,
      image: '/assets/images/placeholder.jpg',
      postedAt: new Date(),
    };

    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Minimal UI</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Company Info" total={714000} icon={'mdi:company'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Wage Day" total={1352831} color="info" icon={'clarity:date-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Department" total={1723315} color="warning" icon={'mingcute:department-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Wage" total={234} color="error" icon={'majesticons:lira-circle'} />
          </Grid>

          <Grid item xs={12} md={6} lg={14}>
            <AppOrderTimeline
              title="Shift, Break, Public Holiday"
              list={[...Array(3)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  'Shifts: ',
                  'Break: ',
                  'Public Holiday: ',
                ][index],
                type: `order${index + 1}`,
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={14}>
            <Typography variant="h4" component="h2" mb={2}>Comments</Typography>
            <PersonnelCommentTable />
          </Grid>
          <Grid item xs={12} md={6} lg={14} mt={3}>


            <CommentBox onAddComment={handleAddComment} />
          </Grid>


        </Grid>
      </Container >
    </>
  );
}
