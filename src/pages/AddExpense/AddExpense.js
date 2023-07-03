import PropTypes from 'prop-types';

import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import Stack from '@mui/material/Stack';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';

export default function AddExpense({ title }) {
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
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [description, setDescription] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
  const [companyNeighbourhoodValid, setCompanyNeighbourhoodValid] = React.useState(true);
  const [companyNeighbourhood, setCompanyNeighbourhood] = React.useState('');
  const [companyNeighbourhoodError, setCompanyNeighbourhoodError] = React.useState(true);
  const [companyDistrictValid, setCompanyDistrictValid] = React.useState(true);
  const [companyDistrict, setCompanyDistrict] = React.useState('');
  const [companyDistrictError, setCompanyDistrictError] = React.useState('');
  const [companyProvinceValid, setCompanyProvinceValid] = React.useState(true);
  const [companyProvince, setCompanyProvince] = React.useState('');
  const [companyProvinceError, setCompanyProvinceError] = React.useState('');
  const [companyCountryValid, setCompanyCountryValid] = React.useState(true);
  const [companyCountry, setCompanyCountry] = React.useState('');
  const [companyCountryError, setCompanyCountryError] = React.useState('');
  const [companyBuildingNumberValid, setCompanyBuildingValid] = React.useState(true);
  const [companyBuildingNumber, setCompanyBuildingNumber] = React.useState('');
  const [companyBuildingNumberError, setCompanyBuildingNumberError] = React.useState('');
  const [companyApartmentNumberValid, setCompanyApartmentNumberValid] = React.useState(true);
  const [companyApartmentNumber, setCompanyApartmentNumber] = React.useState('');
  const [companyApartmentNumberError, setCompanyApartmentNumberError] = React.useState(true);
  const [companyPostalCodeValid, setCompanyPostalCodeValid] = React.useState(true);
  const [companyPostalCode, setCompanyPostalCode] = React.useState('');
  const [companyPostalCodeError, setCompanyPostalCodeError] = React.useState(true);
  const [selectedPaydayChange, setSelectedPaydayChange] = useState(dayjs());

  const navigate = useNavigate();

  const successRegistrationToastMessage = () => {
    toast.success('Company Registration successfull !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const errorRegistrationToastMessage = () => {
    toast.error('ERROR!! Company could not be registration, Please try again !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };


  const [holidayDates, setHolidayDates] = React.useState('');

  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');


  const locale = 'en-gb';
  const [imgs, setImgs] = useState('');
  


  React.useEffect(() => {
    if (token === null) {
      navigate('/404')
    } else if (!roles.includes('PERSONEL')) {
      navigate('/404');
    }
  }, [])

  // New state for markedDates

  // Function to handle marked dates change
  const handleCompanyNameChange = (event) => {
    const companyName = event.target.value
    setCompanyName(companyName);

    const validateCompanyName = () => {
      if (companyName.trim().length === 0) {
        return 'Company name can not be empty';
      }
      
      if (companyName.length > 45) {
        return 'Company name should not exceed 45 characters';
      }
      return '';
    };

    const errorMessage = validateCompanyName();
    setCompanyNameError(errorMessage);
    setCompanyNameValid(errorMessage === '');
  };

  const handleSectorChange = (event) => {
    const sector = event.target.value.trim().charAt(0).toLocaleUpperCase('tr') + event.target.value.trim().slice(1).toLocaleLowerCase('tr')
    setSector(sector);

    const validateSector = () => {
      if (sector.trim().length === 0) {
        return 'Sector can not be empty';
      }
      const re = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
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
    const taxNumber = event.target.value
    setTaxNumber(taxNumber);

    const validateTaxNumber = () => {
      if (taxNumber.trim().length === 0) {
        return 'Tax number can not be empty';
      }

      const re = /^[a-zA-Z0-9ığüşöçİĞÜŞÖÇ]+$/;
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
    const companyBalanceStatus = event.target.value
    setCompanyBalanceStatus(companyBalanceStatus);

    const validateCompanyBalanceStatus = () => {
      if (companyBalanceStatus.trim().length === 0) {
        return 'Balance can not be empty';
      }
      const re = /^-?\d+$/;
      if (!re.test(companyBalanceStatus)) {
        return 'Balance should be a positive or negative number';
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
    const companyPhone = event.target.value.replace(/\D/g, '').trim();

    setCompanyPhone(companyPhone);

    const validateCompanyPhone = () => {
      
      if (!(companyPhone.length === 11)) {
        return `Phone must be 11 characters. lenght: ${companyPhone.length}`;
      }

      return '';
    };

    const errorMessageCompanyPhone = validateCompanyPhone();
    setCompanyPhoneError(errorMessageCompanyPhone);
    setCompanyPhoneValid(errorMessageCompanyPhone === '');

    const reg = /^\d+$/;
    if (!reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessageCompanyPhone = "Phone should only contain numbers"
      setCompanyPhoneError(errorMessageCompanyPhone);
    setCompanyPhoneValid(errorMessageCompanyPhone === '');
      setTimeout(() => {
        const errorMessageCompanyPhone = ''
        setCompanyPhoneError(errorMessageCompanyPhone);
        setCompanyPhoneValid(errorMessageCompanyPhone === '');
      }, 2000);
    }
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

  const handleDescriptionChange = (event) => {
    const description = event.target.value
    setDescription(description);

    const validateDescription = () => {
      if (description.trim().length === 0) {
        return 'Description can not be empty';
      }

      if (description.length > 500) {
        return 'Description should not exceed 500 characters';
      }
      return '';
    };

    const errorMessageDescription = validateDescription();
    setDescriptionError(errorMessageDescription);
    setDescriptionValid(errorMessageDescription === '');

  }

  const handleCompanyNeighbourhoodChange = (event) => {
    const companyNeighbourhood = event.target.value.trim()
    setCompanyNeighbourhood(companyNeighbourhood)

    const validateNeighbourhood = () => {
      if (companyNeighbourhood.trim().length === 0) {
        return 'Neighbourhood can not be empty';
      }
      
      if (companyNeighbourhood.length > 25) {
        return 'Neighbourhood should not exceed 25 characters';
      }
      return '';
    };

    const errorMessageNeighbourhood = validateNeighbourhood();
    setCompanyNeighbourhoodError(errorMessageNeighbourhood);
    setCompanyNeighbourhoodValid(errorMessageNeighbourhood === '');

  }

  const handleCompanyProvinceChange = (event) => {
    const companyProvince = event.target.value.trim().charAt(0).toLocaleUpperCase('tr') + event.target.value.trim().slice(1).toLocaleLowerCase('tr')
    setCompanyProvince(companyProvince);
    const validateProvince = () => {
    if (companyProvince.trim().length === 0) {
      return 'Province can not be empty';
    }

    const re = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(companyProvince)) {
        return 'Province should only contain letters';
      }
    
    if (companyProvince.length > 25) {
      return 'Province should not exceed 25 characters';
    }
    return '';
  };

  const errorMessageProvince = validateProvince();
  setCompanyProvinceError(errorMessageProvince);
  setCompanyProvinceValid(errorMessageProvince === '');

  }

  const handleCompanyDistrictChange = (event) => {
    const companyDistrict = event.target.value.trim().charAt(0).toLocaleUpperCase('tr') + event.target.value.trim().slice(1).toLocaleLowerCase('tr')
    setCompanyDistrict(companyDistrict);

    const validateDistrict = () => {
    if (companyDistrict.trim().length === 0) {
      return 'District can not be empty';
    }

    const re = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(companyDistrict)) {
        return 'District should only contain letters';
      }
    
    if (companyDistrict.length > 25) {
      return 'District should not exceed 25 characters';
    }
    return '';
  };

  const errorMessageDistrict = validateDistrict();
  setCompanyDistrictError(errorMessageDistrict);
  setCompanyDistrictValid(errorMessageDistrict === '');

  }

  const handleCompanyCountryChange = (event) => {
    const companyCountry = event.target.value;
    setCompanyCountry(companyCountry);

    const validateCountry = () => {
      if (companyCountry.trim().length === 0) {
        return 'Country can not be empty';
      }
  
      const re = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
        if (!re.test(companyCountry)) {
          return 'Country should only contain letters';
        }
      
      if (companyCountry.length > 30) {
        return 'Country should not exceed 30 characters';
      }
      return '';
    };
  
    const errorMessageCountry = validateCountry();
    setCompanyCountryError(errorMessageCountry);
    setCompanyCountryValid(errorMessageCountry === '');

  }

  const handleCompanyBuildingNumberChange = (event) => {
    const companyBuildingNumber = event.target.value.replace(/\D/g, '').trim();
    setCompanyBuildingNumber(companyBuildingNumber)


    const validateBuildingNumber = () => {

      if ((companyBuildingNumber.trim().length === 0)) {
        return `Building number can not be empty`;
      }

      return '';
    };

    const errorMessageBuildingNumber = validateBuildingNumber();
    setCompanyBuildingNumberError(errorMessageBuildingNumber);
    setCompanyBuildingValid(errorMessageBuildingNumber === '');

    const reg = /^\d+$/;
    if (!reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessageBuildingNumber = "Building number should only contain numbers"
      setCompanyBuildingNumberError(errorMessageBuildingNumber);
    setCompanyBuildingValid(errorMessageBuildingNumber === '');
      setTimeout(() => {
        const errorMessageBuildingNumber = ''
        setCompanyBuildingNumberError(errorMessageBuildingNumber);
    setCompanyBuildingValid(errorMessageBuildingNumber === '');
      }, 2000);
    }

  }

  const handleCompanyApartmentNumberChange = (event) => {
    const companyApartmentNumber = event.target.value.replace(/\D/g, '').trim();
    setCompanyApartmentNumber(companyApartmentNumber)

    const validateApartmentNumber = () => {

      if ((companyApartmentNumber.trim().length === 0)) {
        return `Apartment number can not be empty`;
      }

      return '';
    };

    const errorMessageApartmentNumber = validateApartmentNumber();
    setCompanyApartmentNumberError(errorMessageApartmentNumber);
    setCompanyApartmentNumberValid(errorMessageApartmentNumber === '');

    const reg = /^\d+$/;
    if (!reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessageApartmentNumber = "Apartment number should only contain numbers"
      setCompanyApartmentNumberError(errorMessageApartmentNumber);
    setCompanyApartmentNumberValid(errorMessageApartmentNumber === '');
      setTimeout(() => {
        const errorMessageApartmentNumber = ''
        setCompanyApartmentNumberError(errorMessageApartmentNumber);
    setCompanyApartmentNumberValid(errorMessageApartmentNumber === '');
      }, 2000);
    }

  }

  const handleCompanyPostalCodeChange = (event) => {
    const companyPostalCode = event.target.value.replace(/\D/g, '').trim();
    setCompanyPostalCode(companyPostalCode)

    const validatePostalCode = () => {

      if ((companyPostalCode.trim().length === 0)) {
        return `Postal code can not be empty`;
      }

      return '';
    };

    const errorMessagePostalCode = validatePostalCode();
    setCompanyPostalCodeError(errorMessagePostalCode);
    setCompanyPostalCodeValid(errorMessagePostalCode === '');

    const reg = /^\d+$/;
    if (!reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessagePostalCode = "Postal code should only contain numbers"
      setCompanyPostalCodeError(errorMessagePostalCode);
    setCompanyPostalCodeValid(errorMessagePostalCode === '');
      setTimeout(() => {
        const errorMessagePostalCode = ''
        setCompanyPostalCodeError(errorMessagePostalCode);
    setCompanyPostalCodeValid(errorMessagePostalCode === '');
      }, 2000);
    }

  }

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
    if (companyNameValid &&
      companyName.length > 0 &&
      sectorValid &&
      sector.length > 0 &&
      taxNumberValid &&
      taxNumber.length > 0 &&
      companyBalanceStatusValid &&
      companyBalanceStatus.length > 0 &&
      companyPhoneValid &&
      companyPhone.length > 0 &&
      companyMailValid &&
      companyMail.length > 0 &&
      descriptionValid &&
      description.length > 0 &&
      companyNeighbourhoodValid &&
      companyNeighbourhood.length > 0 &&
      companyDistrictValid &&
      companyDistrict.length > 0 &&
      companyProvinceValid &&
      companyProvince.length > 0 &&
      companyCountryValid &&
      companyCountry.length > 0 &&
      companyBuildingNumber.length > 0 &&
      companyBuildingNumberValid &&
      companyApartmentNumberValid &&
      companyApartmentNumber.length > 0 &&
      companyPostalCodeValid &&
      companyPostalCode.length > 0
    ) {
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
        wageDate: selectedPaydayChange.format('DD-MM-YYYY'),
        base64Logo: imgs
      };
      console.log('Form Data:', payload);
      await axios
        .post(`http://localhost:9070/api/v1/company/save/${token}`, payload)
        .then((response) => {
          console.log('Success:', response.data);
          successRegistrationToastMessage();
          setCompanyName('');
          setSector('');
          setTaxNumber('');
          setCompanyBalanceStatus('');
          setCompanyPhone('');
          setCompanyMail('');
          setCompanyBalanceStatus('')
          setCompanyPhone('')
          setCompanyMail('');
          setDescription('');
          setCompanyNeighbourhood('');
          setCompanyDistrict('');
          setCompanyProvince('');
          setCompanyCountry('');
          setCompanyBuildingNumber('');
          setCompanyApartmentNumber('');
          setCompanyPostalCode('');
          setHolidayDates('');
          setImgs('')
          setSelectedPaydayChange(dayjs())
        })
        .catch((error) => {
          errorRegistrationToastMessage();
          console.error('Error:', error);
        });
    } else {
      errorRegistrationToastMessage();
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

      const validateDescription = () => {
        if (companyMail.trim().length === 0) {
          return 'Description can not be empty';
        }

        return '';
      };

      const errorMessageDescription = validateDescription();
      setDescriptionError(errorMessageDescription);
      setDescriptionValid(errorMessageDescription === '');

      const validateNeighbourhood = () => {
        if (companyNeighbourhood.trim().length === 0) {
          return 'Neighbourhood can not be empty';
        }

        return '';
      };

      const errorMessageNeighbourhood = validateNeighbourhood();
      setCompanyNeighbourhoodError(errorMessageNeighbourhood);
      setCompanyNeighbourhoodValid(errorMessageNeighbourhood === '');

      const validateDistrict = () => {
        if (companyDistrict.trim().length === 0) {
          return 'District can not be empty';
        }

        return '';
      };

      const errorMessageDistrict = validateDistrict();
      setCompanyDistrictError(errorMessageDistrict);
      setCompanyDistrictValid(errorMessageDistrict === '');

      const validateProvince = () => {
        if (companyProvince.trim().length === 0) {
          return 'Province can not be empty';
        }

        return '';
      };

      const errorMessageProvince = validateProvince();
      setCompanyProvinceError(errorMessageProvince);
      setCompanyProvinceValid(errorMessageProvince === '');


      const validateCountry = () => {
        if (companyCountry.trim().length === 0) {
          return 'Country can not be empty';
        }

        return '';
      };

      const errorMessageCountry = validateCountry();
      setCompanyCountryError(errorMessageCountry);
      setCompanyCountryValid(errorMessageCountry === '');


      const validateBuildingNumber = () => {
        if (companyBuildingNumber.trim().length === 0) {
          return 'Building number can not be empty';
        }

        return '';
      };

      const errorMessageBuildingNumber = validateBuildingNumber();
      setCompanyBuildingNumberError(errorMessageBuildingNumber);
      setCompanyBuildingValid(errorMessageBuildingNumber === '');


      const validateApartmentNumber = () => {
        if (companyApartmentNumber.trim().length === 0) {
          return 'Apartment number can not be empty';
        }

        return '';
      };

      const errorMessageApartmentNumber = validateApartmentNumber();
      setCompanyApartmentNumberError(errorMessageApartmentNumber);
      setCompanyApartmentNumberValid(errorMessageApartmentNumber === '');


      const validatePostalCode = () => {
        if (companyPostalCode.trim().length === 0) {
          return 'Postal code can not be empty';
        }

        return '';
      };

      const errorMessagePostalCode = validatePostalCode();
      setCompanyPostalCodeError(errorMessagePostalCode);
      setCompanyPostalCodeValid(errorMessagePostalCode === '');


      


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
                value={imgs}
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
                <TextField id="companyName" value={companyName} name="companyName" label="Company Name" variant="filled" sx={{ width: 280 }} error={!companyNameValid} helperText={!companyNameValid ? companyNameError : ''} onChange={handleCompanyNameChange} />
                <TextField id="sector" value={sector} name="sector" label="Sector" variant="filled" sx={{ width: 280 }} error={!sectorValid} helperText={!sectorValid ? sectorError : ''} onChange={handleSectorChange} />
                <TextField id="taxNumber" value={taxNumber} name="taxNumber" label="TaxNumber" variant="filled" sx={{ width: 280 }} error={!taxNumberValid} helperText={!taxNumberValid ? taxNumberError : ''} onChange={handleTaxNumberChange} />
                <TextField
                  id="companyBalanceStatus"
                  value={companyBalanceStatus}
                  name="companyBalanceStatus"
                  label="Company Balance Status"
                  variant="filled"
                  error={!companyBalanceStatusValid} helperText={!companyBalanceStatusValid ? companyBalanceStatusError : ''} onChange={handleCompanyBalanceStatusChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                  }}
                  sx={{ width: 280 }}
                />
                <TextField id="companyPhone" value={companyPhone} name="companyPhone" label="Phone" variant="filled" placeholder="05XXXXXXXXX" sx={{ width: 280 }} type="tel" error={!companyPhoneValid} helperText={!companyPhoneValid ? companyPhoneError : ''} onChange={handlePhoneNumberChange} />
                <TextField id="companyMail" value={companyMail} name="companyMail" label="Mail" variant="filled" placeholder="email@address.com" sx={{ width: 280 }} type={"email"} error={!companyMailValid} helperText={!companyMailValid ? companyMailError : ''} onChange={handleEmailChange} />
                <TextField
                  id="description"
                  value={description}
                  name="description"
                  label="Description"
                  variant="filled"
                  rows={10}
                  placeholder="Max 500 characters"
                  sx={{ width: 905 }}
                  multiline
                  error={!descriptionValid} helperText={!descriptionValid ? descriptionError : ''}
                  onChange={handleDescriptionChange}
                />
              </Grid>

              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      id="payDay"
                      label="Payday"
                      name="payDay"
                      value={selectedPaydayChange}
                      onChange={(e) => {
                        setSelectedPaydayChange(e);
                      }}
                      sx={{ width: 280 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <CardHeader subheader="Company Address" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField id="companyNeighbourhood" value={companyNeighbourhood} onChange={handleCompanyNeighbourhoodChange} name="companyNeighbourhood" label="Neighbourhood" variant="filled" sx={{ width: 280 }} error={!companyNeighbourhoodValid} helperText={!companyNeighbourhoodValid ? companyNeighbourhoodError : ''}/>
                <TextField id="companyDistrict" value={companyDistrict} onChange={handleCompanyDistrictChange} name="companyDistrict" label="District" variant="filled" sx={{ width: 280 }} error={!companyDistrictValid} helperText={!companyDistrictValid ? companyDistrictError : ''}/>
                <TextField id="companyProvince" value={companyProvince} onChange={handleCompanyProvinceChange} name="companyProvince" label="Province" variant="filled" sx={{ width: 280 }} error={!companyProvinceValid} helperText={!companyProvinceValid ? companyProvinceError : ''}/>
                <TextField id="companyCountry" value={companyCountry} onChange={handleCompanyCountryChange} name="companyCountry" label="Country" variant="filled" sx={{ width: 280 }} error={!companyCountryValid} helperText={!companyCountryValid ? companyCountryError : ''}/>
                <TextField id="companyBuildingNumber" value={companyBuildingNumber} onChange={handleCompanyBuildingNumberChange} name="companyBuildingNumber" label="Building Number" variant="filled" sx={{ width: 280 }} error={!companyBuildingNumberValid} helperText={!companyBuildingNumberValid ? companyBuildingNumberError : ''}/>
                <TextField id="companyApartmentNumber" value={companyApartmentNumber} onChange={handleCompanyApartmentNumberChange} name="companyApartmentNumber" label="Apartment Number" variant="filled" sx={{ width: 280 }} error={!companyApartmentNumberValid} helperText={!companyApartmentNumberValid ? companyApartmentNumberError : ''}/>
                <TextField id="companyPostalCode" value={companyPostalCode} onChange={handleCompanyPostalCodeChange} name="companyPostalCode" label="Postal Code" variant="filled" sx={{ width: 280 }} error={!companyPostalCodeValid} helperText={!companyPostalCodeValid ? companyPostalCodeError : ''}/>
              </Grid>
              <CardHeader subheader="Company Holidays" sx={{ marginLeft: '3rem' }} />
              
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
                <ToastContainer />
              </Grid>
            </Box>
          </Card>
        </Paper>
      </Grid>
    </>
  );
}

AddExpense.propTypes = {
  title: PropTypes.string.isRequired,
  markedDates: PropTypes.array.isRequired,
};