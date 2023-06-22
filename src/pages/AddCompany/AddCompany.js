import PropTypes from 'prop-types';

import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState, useContext } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import DateCalendarServerRequest from './DateCalendarServerRequest';
import DatesContext from "./context/DatesContext";

const comboOptions = ['MALE', 'FEMALE', 'OTHER'];

export default function AddCompany({ title }) {
  const [companyNameValid, setCompanyNameValid] = React.useState(true);
  const [companyName, setCompanyName] = React.useState('');
  const [companyNameError, setCompanyNameError] = React.useState('');
  const [sectorValid, setSectorValid] = React.useState(true);
  const [sector, setSector] = React.useState('');
  const [sectorError, setSectorError] = React.useState('');
  const [taxNumberValid, setTaxNumberValid] = React.useState(true);
  const [taxNumber, setTaxNumber] = React.useState('');
  const [taxNumberError, setTaxNumberError] = React.useState('');
  const [companyBalanceStatusValid, setCompanyBalanceStatusValid] = React.useState(true);
  const [companyBalanceStatus, setCompanyBalanceStatus] = React.useState('');
  const [companyBalanceStatusError, setCompanyBalanceStatusError] = React.useState('');
  const [companyPhoneValid, setCompanyPhoneValid] = React.useState(true);
  const [companyPhone, setCompanyPhone] = React.useState('');
  const [companyPhoneError, setCompanyPhoneError] = React.useState('');
  const [companyMailValid, setCompanyMailValid] = React.useState(true);
  const [companyMail, setCompanyMail] = React.useState('');
  const [companyMailError, setCompanyMailError] = React.useState('');
  const [selectedDateOfBirthChange, setSelectedDateOfBirthChange] = useState(dayjs());
  const [selectedJobStartingDateChange, setSelectedJobStartingDateChange] = useState(dayjs());
  const [selectedPaydayChange, setSelectedPaydayChange] = useState(dayjs());
  const locale = 'en-gb';
  const [imgs, setImgs] = useState('');
  const { markedDates } = useContext(DatesContext);


  // New state for markedDates

  // Function to handle marked dates change
  const handleCompanyNameChange = (event) => {
    const companyName = event.target.value.trim()
    setCompanyName(companyName);

    const validateCompanyName = () => {
      if (companyName.trim().length === 0) {
        return 'Company name can not be empty';
      }
      const re = /^[A-Za-zğüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(companyName)) {
        return 'Company name should only contain letters';
      }
      if (companyName.length > 12) {
        return 'Company name should not exceed 12 characters';
      }
      return '';
    };

    const errorMessage = validateCompanyName();
    setCompanyNameError(errorMessage);
    setCompanyNameValid(errorMessage === '');
  };

  const handleSectorChange = (event) => {
    const sector = event.target.value.trim().charAt(0).toUpperCase() +event.target.value.trim().slice(1).toLowerCase()
    setSector(sector);

    const validateSector = () => {
      if (sector.trim().length === 0) {
        return 'Sector can not be empty';
      }
      const re = /^[A-Za-zğüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(sector)) {
        return 'Sector should only contain letters';
      }
      if (sector.length > 12) {
        return 'Sector should not exceed 12 characters';
      }
      return '';
    };

    const errorMessageSector = validateSector();
    setSectorError(errorMessageSector);
    setSectorValid(errorMessageSector === '');
  };


  const handleTaxNumberChange = (event) => {
    const taxNumber = event.target.value.trim()
    setTaxNumber(taxNumber);

    const validateTaxNumber = () => {
      if (taxNumber.trim().length === 0) {
        return 'Tax number can not be empty';
      }

      const re = /^[a-zA-Z0-9ğüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(taxNumber)) {
        return 'Tax number should only contain letters and numbers';
      }

      if (taxNumber.length > 15) {
        return 'Tax number should not exceed 15 characters';
      }
      return '';
    };

    const errorMessageTaxNumber = validateTaxNumber();
    setTaxNumberError(errorMessageTaxNumber);
    setTaxNumberValid(errorMessageTaxNumber === '');
  };


  const handleCompanyBalanceStatusChange = (event) => {
    const companyBalanceStatus = event.target.value.trim()
    setCompanyBalanceStatus(companyBalanceStatus);

    const validateCompanyBalanceStatus = () => {
      if (companyBalanceStatus.trim().length === 0) {
        return 'Balance can not be empty';
      }
      const re = /^[0-9]+$/;
      if (!re.test(companyBalanceStatus)) {
        return 'Balance should only contain numbers';
      }
      if (companyBalanceStatus.length > 13) {
        return 'Balance should not exceed 13 characters';
      }
      return '';
    };

    const errorMessageCompanyBalanceStatus = validateCompanyBalanceStatus();
    setCompanyBalanceStatusError(errorMessageCompanyBalanceStatus);
    setCompanyBalanceStatusValid(errorMessageCompanyBalanceStatus === '');
  };


  const handlePhoneNumberChange = (event) => {
    const companyPhone = event.target.value.trim();

    setCompanyPhone(companyPhone);

    const validateCompanyPhone = () => {
      const re = /^[0-9]+$/;
      if (!re.test(companyPhone)) {
        return 'Phone number should only contain numbers';
      }
      if (!(companyPhone.length === 11)) {
        return `Phone must be 11 characters. lenght: ${companyPhone.length}`;
      }

      return '';
    };

    const errorMessageCompanyPhone = validateCompanyPhone();
    setCompanyPhoneError(errorMessageCompanyPhone);
    setCompanyPhoneValid(errorMessageCompanyPhone === '');
  };

  const handleEmailChange = (event) => {
    const companyMail = event.target.value;

    setCompanyMail(companyMail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setCompanyMailValid(emailRegex.test(companyMail));

    const validateEmail = () => {
      if (companyMail.trim().length === 0) {
        return 'Email can not be empty';
      }

      if (!emailRegex.test(companyMail)) {
        return 'Please enter a valid email address';
      }

      if (companyMail.length > 60) {
        return 'Email should not exceed 60 characters';
      }
      return '';
    };

    const errorMessage = validateEmail();
    setCompanyMailError(errorMessage);
    setCompanyMailValid(errorMessage === '');
  };

  


  function handleChange(e) {
    console.log(e.target.files);
    const data = new FileReader();
    data.addEventListener('load', () => {
      setImgs(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem('token');
    if(companyNameValid &&
       companyName.length >0 &&
       sectorValid &&
       sector.length >0 &&
       taxNumberValid &&
       taxNumber.length >0 &&
       companyBalanceStatusValid &&
       companyBalanceStatus.length >0 &&
       companyPhoneValid &&
       companyPhone.length>0 &&
       companyMailValid &&
       companyMail.lenght > 0
      ){
      const data = new FormData(event.currentTarget);
    const payload = {
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
      companyApartmentNumber: data.get('companyApartmentNumber'),
      companyPostalCode: data.get('companyPostalCode'),
      holidayDates: markedDates,
      base64Logo: imgs
    };
    console.log('Form Data:', payload);



    await axios
      .post(`http://localhost:9070/api/v1/company/save/${token}`, payload)
      .then((response) => {
        console.log('Success:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.log('Form data is invalid');

      const validateCompanyName = () => {
        if (companyName.trim().length === 0) {
          return 'Company name can not be empty';
        }

        return '';
      };

      const errorMessageCompanyName = validateCompanyName();
      setCompanyNameError(errorMessageCompanyName);
      setCompanyNameValid(errorMessageCompanyName === '');

      const validateSector = () => {
        if (sector.trim().length === 0) {
          return 'Sector can not be empty';
        }

        return '';
      };

      const errorMessageSector = validateSector();
      setSectorError(errorMessageSector);
      setSectorValid(errorMessageSector === '');

      const validateTaxNumber = () => {
        if (taxNumber.trim().length === 0) {
          return 'Tax number can not be empty';
        }

        return '';
      };

      const errorMessageTaxNumber = validateTaxNumber();
      setTaxNumberError(errorMessageTaxNumber);
      setTaxNumberValid(errorMessageTaxNumber === '');

      const validateBalance = () => {
        if (companyBalanceStatus.trim().length === 0) {
          return 'Balance number can not be empty';
        }

        return '';
      };

      const errorMessageBalance = validateBalance();
      setCompanyBalanceStatusError(errorMessageBalance);
      setCompanyBalanceStatusValid(errorMessageBalance === '');

      const validateCompanyPhone = () => {
        if (companyPhone.trim().length === 0) {
          return 'Phone number can not be empty';
        }

        return '';
      };

      const errorMessageCompanyPhone = validateCompanyPhone();
    setCompanyPhoneError(errorMessageCompanyPhone);
    setCompanyPhoneValid(errorMessageCompanyPhone === '');

    const validateMail = () => {
      if (companyMail.trim().length === 0) {
        return 'Mail can not be empty';
      }

      return '';
    };

    const errorMessageMail = validateMail();
  setCompanyMailError(errorMessageMail);
  setCompanyMailValid(errorMessageMail === '');
    }
  };

  return (
    <>
      <Grid sx={{ display: 'flex', ml: '10rem' }}>
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
                  bgcolor: '#ffa726',
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
                <TextField id="companyName" name="companyName" label="Company Name" variant="filled" sx={{ width: 280 }} error={!companyNameValid} helperText={!companyNameValid ? companyNameError : ''} onChange={handleCompanyNameChange} />
                <TextField id="sector" name="sector" label="Sector" variant="filled" sx={{ width: 280 }} error={!sectorValid} helperText={!sectorValid ? sectorError : ''} onChange={handleSectorChange}/>
                <TextField id="taxNumber" name="taxNumber" label="TaxNumber" variant="filled" sx={{ width: 280 }} error={!taxNumberValid} helperText={!taxNumberValid ? taxNumberError : ''} onChange={handleTaxNumberChange}/>
                <TextField
                  id="companyBalanceStatus"
                  name="companyBalanceStatus"
                  label="Company Balance Status"
                  variant="filled"
                  error={!companyBalanceStatusValid} helperText={!companyBalanceStatusValid ? companyBalanceStatusError : ''} onChange={handleCompanyBalanceStatusChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                  }}
                  sx={{ width: 280 }}
                />
                <TextField id="companyPhone" name="companyPhone" label="Phone" variant="filled" sx={{ width: 280 }} type="tel" error={!companyPhoneValid} helperText={!companyPhoneValid ? companyPhoneError : ''} onChange={handlePhoneNumberChange}/>
                <TextField id="companyMail" name="companyMail" label="Mail" variant="filled" sx={{ width: 280 }} type={"email"} error={!companyMailValid} helperText={!companyMailValid ? companyMailError : ''} onChange={handleEmailChange}/>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  variant="filled"
                  rows={10}
                  sx={{ width: 905 }}
                  multiline
                />
              </Grid>

              <CardHeader subheader="Company Address" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField id="companyNeighbourhood" name="companyNeighbourhood" label="Neighbourhood" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyDistrict" name="companyDistrict" label="District" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyProvince" name="companyProvince" label="Province" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyCountry" name="companyCountry" label="Country" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyBuildingNumber" name="companyBuildingNumber" label="Building Number" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyApartmentNumber" name="companyApartmentNumber" label="Apartment Number" variant="filled" sx={{ width: 280 }} />
                <TextField id="companyPostalCode" name="companyPostalCode" label="Postal Code" variant="filled" sx={{ width: 280 }} />
              </Grid>
              <CardHeader subheader="Company Holidays" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <DateCalendarServerRequest />
              </Grid>
              <Grid container justifyContent="center" >
                <Button type="submit"
                  variant="contained"
                  style={{ maxWidth: 140, minWidth: 140 }}
                  sx={{
                    borderRadius: 2,
                    padding: 1,
                    bgcolor: "#ffa726", '&:hover': {
                      bgcolor: 'grey',
                    },
                  }}>
                  Save
                </Button>
              </Grid>
            </Box>
          </Card>
        </Paper>
      </Grid>
    </>
  );
}

AddCompany.propTypes = {
  title: PropTypes.string.isRequired,
  markedDates: PropTypes.array.isRequired,
};