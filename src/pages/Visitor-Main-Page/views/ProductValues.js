import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import CompanyCard from '../components/CompanyCard'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {

  const [companyList, setCompanyList] = React.useState([])
  const [profile, setProfile] = React.useState({
    avatar: '',
  })
  const token = localStorage.getItem('token');

  React.useEffect(() => {
    fetch('http://localhost:9070/api/v1/company/find-all-company-preview-information', {
      method: 'GET',
    }).then(data => data.json())
      .then(data => {
        setCompanyList(data);
        console.log(data)
      });
    if (token != null) {
      fetch(`http://localhost:9080/api/v1/user-profile/get-profile-avatar/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setProfile(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [])

  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
        />
        <Grid container spacing={5}>
          {
            companyList.map((company) => (
              <Grid item key={company.companyId} xs={12} md={4} >
                <CompanyCard item={company} key={company.companyId} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
