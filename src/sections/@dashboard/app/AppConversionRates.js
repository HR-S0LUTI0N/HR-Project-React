import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';
import React, { useState } from "react";
// @mui
import { Box, Card, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  const [iseInformationBoxShown, setIsInformationBoxShown] = useState(true);
  const buttonHandler = () => {
    setIsInformationBoxShown(!iseInformationBoxShown);
  };
  const [iseAddressBoxShown, setIsAddressBoxShown] = useState(true);
  const buttonHandlerAddress = () => {
    setIsAddressBoxShown(!iseAddressBoxShown);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
     {
      const formData = {
        email: event.target.email.value,
        name: event.target.name.value,
        surname: event.target.surname.value,
        password: event.target.password.value,
        identificationNumber: event.target.identificationNumber.value,
        department: event.target.department.value,
        dateOfBirth: event.target.dateOfBirth.value,
      };
      try {
        console.log(formData);
        const response = await axios.post('http://localhost:9090/api/v1/auth/register-manager', formData);
        console.log('Success:', response.data);
      } catch (error) {
        console.error('Error create:', error);
      }
    } 
  };

  return (
    
    <Card {...other}>
      
      <CardHeader title={title} subheader={subheader} />
      <Grid  container sx={{ mx: 98, width: 200 }} >
      <Button sx={{ marginBottom: '2rem' }} endIcon={iseInformationBoxShown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}  variant="contained" onClick={buttonHandler} >
          {iseInformationBoxShown ? "Information "  : "Information"}
        </Button>
        </Grid>
        {iseInformationBoxShown && <Card> <Box onSubmit={handleSubmit}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '30ch' },
        }}
        noValidate
        autoComplete="off"
      >
        
        <TextField id="name" name="name" label="Name" variant="filled" />
        <TextField id="middleName" name="middleName" label="Middle Name" variant="filled" />
        <TextField id="surname" name="surname" label="Surname" variant="filled" />
        <TextField id="password" name="password" label="Password" variant="filled" />
        <TextField id="dateOfBirth" name="dateOfBirth" label="Date Of Birth" variant="filled" />
        <TextField id="birthPlace" name="birthPlace" label="Birth Place" variant="filled" />
        <TextField id="identificationNumber" name="identificationNumber" label="Identification Number" variant="filled" />
        <TextField id="gender" name="gender" label="Gender" variant="filled" />
        <TextField id="phone" name="phone" label="Phone" variant="filled" />
        <TextField id="wage" name="wage" label="Wage" variant="filled" />
        <TextField id="wageDate" name="wageDate" label="Wage Date" variant="filled" />
        <TextField id="department" name="department" label="Department" variant="filled" />
        <TextField id="jobStartingDate" name="jobStartingDate" label="Job Starting Date" variant="filled" />
        <TextField id="jobEndingDate" name="jobEndingDate" label="Job Ending Date" variant="filled" />
        <CardHeader subheader="Employee Address" />
        
        <TextField id="neighbourhood" name="neighbourhood" label="Neighbourhood" variant="filled" />
        <TextField id="district" name="district" label="District" variant="filled" />
        <TextField id="province" name="province" label="Province" variant="filled" />
        <TextField id="country" name="country" label="Country" variant="filled" />
        <TextField id="buildingNumber" name="buildingNumber" label="Building Number" variant="filled" />
        <TextField id="apartmentNumber" name="apartmentNumber" label="Apartment Number" variant="filled" />
        <TextField id="postalCode" name="postalCode" label="Postal Code" variant="filled" />
        
      </Box>
      <Grid container sx={{ mx: 'auto', width: 100 }}>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3 }}>
          Create
        </Button>
      </Grid>
      </Card>}
     
      
    </Card>
  );
}
