import * as React from 'react';
import axios from 'axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import CompanyComment from './CompanyComment';
import DeskWorkingDesk from '../../../images/DeskWorkingDesk.jpg'


function CompanyContent() {

  const [company, setCompany] = React.useState([])
  const [comments, setComments] = React.useState([])
  const companyId = localStorage.getItem('companyId');

  React.useEffect(() => {
    axios.get(`http://localhost:9070/api/v1/company/find-all-detailed-company-information/${companyId}`)
      .then(response => {
        const data = response.data;
        setCompany(response.data);
        setComments(data.companyComments);
        console.log(data)
      })
      .catch(error => {
        console.error(error);
      });
  }, [])

  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',

      }}
      mb={3}
    >
      <Container sx={{ mt: 10, mb: 5 }}>

        <Grid container spacing={5} sx={{ justifyContent: 'center' }}>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img
              src={DeskWorkingDesk}
              alt="Company Logo"
              style={{ height: '25rem', width: '25rem', borderRadius: '20%', marginTop: '1rem' }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                <Avatar
                  alt="Company"
                  src={
                    company.logo === null
                      ? 'https://images.unsplash.com/photo-1512403754473-27835f7b9984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80'
                      : company.logo
                  }
                  sx={{ width: 125, height: 125 }}
                />
                <Typography gutterBottom style={{ marginBottom: '2rem', marginTop: '1.5rem', marginLeft: '1rem' }} variant="h5" component="div" fontWeight="bold">
                  {
                    company.companyName === undefined
                      ? "Default Company"
                      : `${company.companyName}`
                  }
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <BusinessCenterIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Sector:</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary">
                  {
                    company.sector
                  }
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <ApartmentIcon />
                <Typography style={{ marginBottom: '1rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">
                  Company Address Details
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '0.75rem', fontWeight: 'bold' }} variant="body5" color="text.secondary">
                  {
                    `Country:`
                  }
                </Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }} variant="body5" color="text.secondary">
                  {
                    `${company.companyCountry}`
                  }
                </Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '3rem', fontWeight: 'bold' }} variant="body5" color="text.secondary">
                  {
                    `Province:`
                  }
                </Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }} variant="body5" color="text.secondary">
                  {
                    `${company.companyProvince}`
                  }
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '0.75rem', fontWeight: 'bold' }} variant="body5" color="text.secondary">District: </Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }} variant="body5" color="text.secondary">{company.companyDistrict}</Typography>
                <Typography style={{ marginBottom: '0.75rem', fontWeight: 'bold', marginLeft: '3rem' }} variant="body5" color="text.secondary">Neighbourhood:</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }} variant="body5" color="text.secondary">{company.companyNeighbourhood}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '0.75rem', fontWeight: 'bold' }} variant="body5" color="text.secondary">BuildingNumber:</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }} variant="body5" color="text.secondary">{company.companyBuildingNumber}</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem', fontWeight: 'bold' }} variant="body5" color="text.secondary">ApartmentNumber</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }} variant="body5" color="text.secondary">{company.companyApartmentNumber}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Company Contact Information</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <AlternateEmailIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Mail:</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary">{company.companyMail}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <LocalPhoneIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Phone:</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary">{company.companyPhone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <MarkunreadMailboxIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem', fontWeight: 'bold' }} variant="body5" color="text.secondary">Postal Code:</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '0.25rem' }} variant="body5" color="text.secondary">{company.companyPostalCode}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ marginLeft: '1rem', marginTop: '2rem', display: 'flex', flexDirection: 'column' }} xs={12} >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Description</Typography>
            </Box>
            <Box >
              <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" >{company.description}</Typography>
            </Box>
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ marginLeft: '1.25rem', marginTop: '2rem', display: 'flex', flexDirection: 'column' }}  >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Comments</Typography>
            </Box>
            <List sx={{ width: '100%', maxWidth: '95%', color: '#F5F5F5' }}>
              {
                < CompanyComment item={comments} />
              }
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box >



  );
}

export default CompanyContent;
