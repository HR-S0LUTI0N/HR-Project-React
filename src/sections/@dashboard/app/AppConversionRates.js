import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';





const comboOptions = ['MALE', 'FEMALE', 'OTHER'];


export default function AppConversionRates({ title }) {
  const [selectedDateOfBirthChange, setSelectedDateOfBirthChange] = useState(dayjs());
  const [selectedJobStartingDateChange, setSelectedJobStartingDateChange] = useState(dayjs());
  const [selectedPaydayChange, setSelectedPaydayChange] = useState(dayjs());
  const [gender, setGender] = useState(comboOptions[0]);
  const locale = 'en-gb';
  const [inputValue, setInputValue] = React.useState('');
  const [imgs, setImgs] = useState('');
  const [shiftStart, setShiftStart] = useState(dayjs());
  const [shiftEnd, setShiftEnd] = useState(dayjs());



  function handleChange(e) {
    console.log(e.target.files)
    const data = new FileReader()
    data.addEventListener('load', () => {
      setImgs(data.result)
    })
    data.readAsDataURL(e.target.files[0])
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = sessionStorage.getItem('token');
    console.log(shiftStart.format('LTS'))
    console.log(shiftEnd.format('LTS'))

    const payload = {
      email: data.get('email'),
      birthPlace: data.get('birthPlace'),
      name: data.get('name'),
      middleName: data.get('middleName'),
      surname: data.get('surname'),
      dateOfBirth: selectedDateOfBirthChange.format('DD-MM-YYYY'),
      identificationNumber: data.get('identificationNumber'),
      gender: gender.toUpperCase(),
      phone: data.get('phone'),
      wage: data.get('wage'),
      wageDate: selectedPaydayChange.format('DD-MM-YYYY'),
      base64Avatar: imgs,
      neighbourhood: data.get('neighbourhood'),
      district: data.get('district'),
      province: data.get('province'),
      country: data.get('country'),
      buildingNumber: data.get('buildingNumber'),
      apartmentNumber: data.get('apartmentNumber'),
      postalCode: data.get('postalCode'),
      department: data.get('department'),
      jobStartingDate: selectedJobStartingDateChange.format('DD-MM-YYYY'),
      jobShift: `${shiftStart.format('LTS')} - ${shiftEnd.format('LTS')}`,
      jobBreak: data.get('jobBreak'),
      employeeLeaves: data.get('employeeLeaves'),

    };
    console.log('Form Data:', payload);


    if (shiftEnd.isBefore(shiftStart)) {
      throw new Error('Giriş Başarısız');
    }
    await axios.post(`http://localhost:9080/api/v1/user-profile/create-personal/${token}`, payload)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  const handleOnClick = async () => {


  }

  return (
    <>
      <Grid sx={{ display: 'flex', ml: "10rem" }}>
        <Paper sx={{ maxWidth: 1800 }}>
          <CardHeader title={title} />
          <Card sx={{ mt: 5 }}>
            <CardHeader subheader="Employee Address" sx={{ marginLeft: '5rem' }} />
            <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{ mx: 'auto' }}>
              <Avatar sx={{ minWidth: 220, minHeight: 220, mb: 3 }} src={imgs} />
              <Button
                type="submit"
                variant="contained"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  maxWidth: 140,
                  minWidth: 140,
                }}
                sx={{
                  borderRadius: 2,
                  padding: 1,
                  mt: 1,
                  bgcolor: "#ffa726",
                  '&:hover': {
                    bgcolor: 'grey',
                  },
                }}
              >
                <Add /> Save Avatar
                <input
                  type="file"
                  onChange={handleChange}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                  }}
                />
              </Button>




            </Grid>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', p: '2rem' }}
            >

              <CardHeader subheader="Employee Information" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField id="name" name="name" label="Name" variant="filled" sx={{ width: 280 }} />
                <TextField id="middleName" name="middleName" label="Middle Name" variant="filled" sx={{ width: 280 }} />
                <TextField id="surname" name="surname" label="Surname" variant="filled" sx={{ width: 280 }} />
                <TextField id="email" name="email" label="Email" variant="filled" sx={{ width: 280 }} />
                <TextField id="birthPlace" name="birthPlace" label="Birth Place" variant="filled" sx={{ width: 280 }} />
                <TextField
                  id="identificationNumber"
                  name="identificationNumber"
                  label="Identification Number"
                  variant="filled"
                  sx={{ width: 280 }}
                />
                <TextField id="phone" name="phone" label="Phone" variant="filled" sx={{ width: 280 }} />
                <TextField id="department" name="department" label="Department" variant="filled" sx={{ width: 280 }} />
                <TextField id="jobBreak" name="jobBreak" label="Break" variant="filled" sx={{ width: 280 }} />
                <TextField
                  id="employeeLeaves"
                  name="employeeLeaves"
                  label="Number Of Day Off"
                  variant="filled"
                  sx={{ width: 280 }}
                />
                <TextField
                  id="wage"
                  name="wage"
                  label="Wage"
                  variant="filled"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                  }}
                  sx={{ width: 280 }}
                />
                <Grid container justifyContent="center" sx={{ mx: 'auto' }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker', 'TimePicker']}>
                      <Box sx={{ mr: 2 }}>
                        <TimePicker
                          sx={{ width: 280 }}
                          label="Shift Start"
                          defaultValue={shiftStart}
                          onChange={(e) => {
                            setShiftStart(e)
                            console.log(e)
                          }}
                        />
                      </Box>
                      <TimePicker
                        sx={{ width: 280 }}
                        label="Shift End"
                        value={shiftEnd}
                        onChange={(e) => {
                          setShiftEnd(e)
                          console.log(e)
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Autocomplete
                  sx={{ width: 280 }}
                  name="Gender"
                  value={gender}
                  options={comboOptions}
                  onChange={(event, newInputValue) => {
                    console.log(newInputValue)
                    setGender(newInputValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  inputValue={inputValue}
                  renderInput={(params) => <TextField {...params} label="Gender" />}
                />


              </Grid>
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      id="dateOfBirth"
                      label="Date Of Birth"
                      name="dateOfBirth"
                      value={selectedDateOfBirthChange}
                      onChange={(e) => { setSelectedDateOfBirthChange(e) }}
                      sx={{ width: 280 }}
                    />
                  </DemoContainer>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      id="jobStartingDate"
                      label="Job Starting Date"
                      name="jobStartingDate"
                      value={selectedJobStartingDateChange}
                      onChange={(e) => { setSelectedJobStartingDateChange(e) }}
                      sx={{ width: 280 }}
                    />
                  </DemoContainer>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      id="payDay"
                      label="Payday"
                      name="payDay"
                      value={selectedPaydayChange}
                      onChange={(e) => { setSelectedPaydayChange(e) }}
                      sx={{ width: 280 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <CardHeader subheader="Employee Address" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField id="neighbourhood" name="neighbourhood" label="Neighbourhood" variant="filled" sx={{ width: 280 }} />
                <TextField id="district" name="district" label="District" variant="filled" sx={{ width: 280 }} />
                <TextField id="province" name="province" label="Province" variant="filled" sx={{ width: 280 }} />
                <TextField id="country" name="country" label="Country" variant="filled" sx={{ width: 280 }} />
                <TextField id="buildingNumber" name="buildingNumber" label="Building Number" variant="filled" sx={{ width: 280 }} />
                <TextField id="apartmentNumber" name="apartmentNumber" label="Apartment Number" variant="filled" sx={{ width: 280 }} />
                <TextField id="postalCode" name="postalCode" label="Postal Code" variant="filled" sx={{ width: 280 }} />
                <Grid container justifyContent="center" sx={{ mt: '2rem' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ maxWidth: 140, minWidth: 140 }}
                    sx={{
                      borderRadius: 2,
                      padding: 1,
                      bgcolor: "#ffa726", '&:hover': {
                        bgcolor: 'grey',
                      },
                    }}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>

            </Box>

          </Card>

        </Paper >

      </Grid >
    </>
  );
}
