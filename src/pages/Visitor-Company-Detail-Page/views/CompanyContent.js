import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';






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
      sx={{
        display: 'flex',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container sx={{ mt: 10, mb: 5 }}>

        <Grid container spacing={5} sx={{ justifyContent: 'center' }}>

          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img
              src={`https://images.unsplash.com/photo-1474511320723-9a56873867b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60`}
              alt="Company Logo"
              style={{ height: '25rem', width: '25rem', borderRadius: '20%', marginTop: '1rem' }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '1rem' }}>
                <Avatar

                  alt="Remy Sharp"
                  src="https://img.freepik.com/free-psd/3d-female-character-with-question-marks_23-2148938890.jpg?w=826&t=st=1686397088~exp=1686397688~hmac=fa26b48ed22b32c06df9cafc6c87ad7c410f943cc22458d0e2fd84d870f3696c"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography gutterBottom style={{ marginBottom: '2rem', marginTop: '1.5rem', marginLeft: '1rem' }} variant="h5" component="div" fontWeight="bold">
                  Company Name AND TITLE
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <ApartmentIcon />
                <Typography style={{ marginBottom: '1rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">
                  Company Address Details
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '0.75rem' }} variant="body5" color="text.secondary">companyCountry</Typography>
                <Typography style={{ marginBottom: '0.75rem' }} variant="body5" color="text.secondary">companyProvince</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '0.75rem' }} variant="body5" color="text.secondary">companyDistrict</Typography>
                <Typography style={{ marginBottom: '0.75rem' }} variant="body5" color="text.secondary">companyNeighbourhood</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '0.75rem' }} variant="body5" color="text.secondary">companyBuildingNumber</Typography>
                <Typography style={{ marginBottom: '0.75rem' }} variant="body5" color="text.secondary">companyApartmentNumber</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '0.75rem' }} variant="body5" color="text.secondary">companyPostalCode</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography style={{ marginBottom: '1rem' }} variant="body5" color="text.secondary">Company Address Details</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <AccountBalanceWalletIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold" >Tax Number</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary">Company Address Details</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <BusinessCenterIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Sector</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary">Company Address Details</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <AlternateEmailIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Mail</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary">Company Address Details</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                <LocalPhoneIcon style={{ marginBottom: '0.9rem' }} />
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Phone</Typography>
                <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary">Company Address Details</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ marginLeft: '1rem', marginTop: '2rem', display: 'flex', flexDirection: 'column' }} xs={12} >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Description</Typography>
            </Box>
            <Box >
              <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="body5" color="text.secondary" >Description</Typography>
            </Box>
          </Grid>
          <Grid container justifyContent="flex-start" sx={{ marginLeft: '1.25rem', marginTop: '2rem', display: 'flex', flexDirection: 'column' }}  >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography style={{ marginBottom: '0.75rem', marginLeft: '1rem' }} variant="h7" color="text.secondary" fontWeight="bold">Comments</Typography>
            </Box>
            <List sx={{ width: '100%', maxWidth: '95%', bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ bgcolor: "#ffa726" }}>E</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box >



  );
}

export default ProductValues;
