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
import DateCalendarServerRequest from './DateCalendarServerRequest';





const comboOptions = ['MALE', 'FEMALE', 'OTHER'];


export default function AddCompany({ title }) {
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
      base64Logo: imgs,
      companyName: data.get('companyName'),
      sector: data.get('sector'),
      taxNumber: data.get('taxNumber'),
      companyBalanceStatus: data.get('companyBalanceStatus'),
      companyPhone: data.get('companyPhone'),
      companyMail: data.get('companyMail'),
      description: data.get('description'),
      companyNeighbourhood: data.get('companyNeighbourhood'),
      companyDistrict: data.get('companyDistrict'),
      companyProvince: data.get('companyProvince'),
      companyCountry: data.get('companyCountry'),
      companyBuildingNumber: data.get('companyBuildingNumber'),
      companyPostalCode: data.get('companyPostalCode'),


    };
    console.log('Form Data:', payload);


    if (shiftEnd.isBefore(shiftStart)) {
      throw new Error('Giriş Başarısız');
    }
    await axios.post(`http://localhost:9070/api/v1/company/2312321/${token}`, payload)
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  };

  function handleDates(e) {
    console.log(e.target.value)
    console.log("Burdayız")



  }

  return (
    <>
      <Grid sx={{ display: 'flex', ml: "10rem" }}>
        <Paper sx={{ maxWidth: 1800 }}>
          <CardHeader title={title} />
          <Card sx={{ mt: 5 }}>
            <CardHeader subheader="Company Address" sx={{ marginLeft: '5rem' }} />
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
                <Add /> Save Logo
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

              <CardHeader subheader="Company Information" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField id="companyName" name="companyName" label="Company Name" variant="filled" sx={{ width: 280 }} />
                <TextField id="sector" name="sector" label="Sector" variant="filled" sx={{ width: 280 }} />
                <TextField id="taxNumber" name="taxNumber" label="TaxNumber" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyBalanceStatus" name="companyBalanceStatus" label="Company Balance Status" variant="filled"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                  }}
                  sx={{ width: 280 }} />
                <TextField id="companyPhone" name="companyPhone" label="Phone" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyMail" name="companyMail" label="Mail" variant="filled" sx={{ width: 280 }} />
                <TextField id="description" name="description" label="Description" variant="filled" rows={10} sx={{ width: 905 }}
                  multiline />
              </Grid>

              <CardHeader subheader="Company Address" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField id="companyNeighbourhood" name="companyNeighbourhood" label="Neighbourhood" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyDistrict" name="companyDistrict" label="District" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyProvince" name="companyProvince" label="Province" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyCountry" name="companyCountry" label="Country" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyBuildingNumber" name="companyBuildingNumber" label="BuildingNumber" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyApartmentNumber" name="companyApartmentNumber" label="ApartmentNumber" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyPostalCode" name="companyPostalCode" label="PostalCode" variant="filled" sx={{ width: 280 }} />
              </Grid>
              <Grid sx={{ mt: '2rem' }}>
                <DateCalendarServerRequest sendDates />     //BURDAN BAKILCAK SENDATES I BURAYA CEKICEN
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: '1rem' }}>
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
                  Save Company
                </Button>
              </Grid>


            </Box>

          </Card>

        </Paper >

      </Grid >
    </>
  );
}
