import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({ title, subheader, chartData, ...other }) {
  const comboOptions = ['MALE', 'FEMALE', 'OTHER'];

  const [iseInformationBoxShown, setIsInformationBoxShown] = useState(true);
  const buttonHandler = () => {
    setIsInformationBoxShown(!iseInformationBoxShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = localStorage.getItem('token');

    const payload = {
      password: data.get('password'),
      email: data.get('email'),
      birthPlace: data.get('birthPlace'),
      name: data.get('name'),
      middleName: data.get('middleName'),
      surname: data.get('surname'),
      dateOfBirth: data.get('dateOfBirth'),
      identificationNumber: data.get('identificationNumber'),
      gender: data.get('gender'),
      phone: data.get('phone'),
      wage: data.get('wage'),
      wageDate: data.get('wageDate'),
      avatar: data.get('avatar'),
      neighbourhood: data.get('neighbourhood'),
      district: data.get('district'),
      province: data.get('province'),
      country: data.get('country'),
      buildingNumber: data.get('buildingNumber'),
      apartmentNumber: data.get('apartmentNumber'),
      postalCode: data.get('postalCode'),
      department: data.get('department'),
      jobStartingDate: data.get('jobStartingDate'),
    };
    console.log('Form Data:', payload);

    try {
      const response = await axios.post(`http://localhost:9080/api/v1/user-profile/create-personal/${token}`, payload);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Grid container sx={{ mx: 98, width: 200 }}>
        <Button sx={{ marginBottom: '2rem' }} endIcon={iseInformationBoxShown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} variant="contained" onClick={buttonHandler}>
          {iseInformationBoxShown ? "Information " : "Information"}
        </Button>
      </Grid>

      {iseInformationBoxShown && (
        <Card>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField id="name" name="name" label="Name" variant="filled" />
            <TextField id="middleName" name="middleName" label="Middle Name" variant="filled" />
            <TextField id="surname" name="surname" label="Surname" variant="filled" />
            <TextField id="email" name="email" label="Email" variant="filled" />
            <TextField id="password" name="password" label="Password" variant="filled" />
            <TextField id="birthPlace" name="birthPlace" label="Birth Place" variant="filled" />
            <TextField id="identificationNumber" name="identificationNumber" label="Identification Number" variant="filled" />
            <TextField id="phone" name="phone" label="Phone" variant="filled" />
            <TextField id="wage" name="wage" label="Wage" variant="filled" />
            <TextField id="wageDate" name="wageDate" label="Wage Date" variant="filled" />
            <TextField id="department" name="department" label="Department" variant="filled" />
            <TextField id="jobStartingDate" name="jobStartingDate" label="Job Starting Date" variant="filled" />

            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '1rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                      label="Date Of Birth"
                      name="dateOfBirth"
                      value={dayjs('2022-04-17')}
                      onChange={() => { }} // Add your logic here
                      sx={{ width: 294 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <Autocomplete
                  sx={{ width: 294, mt: 1 }}
                  name="gender"
                  options={comboOptions}
                  defaultValue={comboOptions[0]}
                  renderInput={(params) => <TextField {...params} label="Gender" />}
                />
              </div>
            </div>

            <CardHeader subheader="Employee Address" />

            <TextField id="neighbourhood" name="neighbourhood" label="Neighbourhood" variant="filled" />
            <TextField id="district" name="district" label="District" variant="filled" />
            <TextField id="province" name="province" label="Province" variant="filled" />
            <TextField id="country" name="country" label="Country" variant="filled" />
            <TextField id="buildingNumber" name="buildingNumber" label="Building Number" variant="filled" />
            <TextField id="apartmentNumber" name="apartmentNumber" label="Apartment Number" variant="filled" />
            <TextField id="postalCode" name="postalCode" label="Postal Code" variant="filled" />

            <Grid container sx={{ mx: 'auto', width: 100 }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3 }}>
                Create
              </Button>
            </Grid>
          </Box>
        </Card>
      )}
    </Card>
  );
}
