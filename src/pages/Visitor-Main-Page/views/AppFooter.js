import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';

function Copyright() {
  return (
    <>
      {'© '}
      <Link color="inherit" href="/visitor" align="center">
        HR Management
      </Link>{' '}
      {new Date().getFullYear()}
    </>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'warning.main',
  mr: 1,
  '&:hover': {
    bgcolor: 'warning.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
  {
    code: 'fr-FR',
    name: 'Français',
  },
];

export default function AppFooter() {
  return (
    <>
      <Typography
        component="footer"
        sx={{ display: 'flex', bgcolor: 'secondary.light', }}
      >
        <Container sx={{ my: 8, display: 'flex', }} >
          <Grid container spacing={5} justifyContent="center"
            alignItems="center">
            <Grid item xs={6} sm={4} md={3}>
              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                spacing={2}
                sx={{ height: 120 }}
              >
                <Grid container
                  direction="column-reverse"
                  justifyContent="center"
                  alignItems="center">
                  <Box >
                    <Copyright />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Typography>
    </>
  );
}
