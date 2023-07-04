import React, { useState } from 'react';
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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Add from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CommentIcon from '@mui/icons-material/Comment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';

const comboOptions = ['MALE', 'FEMALE', 'OTHER'];

export default function AppConversionRates({ title }) {
  const locale = 'en-gb';
  const [selectedDateOfBirthChange, setSelectedDateOfBirthChange] = useState(dayjs());
  const [selectedJobStartingDateChange, setSelectedJobStartingDateChange] = useState(dayjs());
  const [gender, setGender] = useState(comboOptions[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [imgs, setImgs] = useState('');
  const [shiftStart, setShiftStart] = useState(dayjs());
  const [shiftEnd, setShiftEnd] = useState(dayjs());
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [surname, setSurname] = useState('');
  const [surnameError, setSurnameError] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthPlaceError, setBirthPlaceError] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [identificationNumberError, setIdentificationNumberError] = useState('');
  const [department, setDepartment] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [numberOfDayOff, setNumberOfDayOff] = useState('');
  const [numberOfDayOffError, setNumberOfDayOffError] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [neighbourhoodError, setNeighbourhoodError] = useState('');
  const [district, setDistrict] = useState('');
  const [districtError, setDistrictError] = useState('');
  const [province, setProvince] = useState('');
  const [provinceError, setProvinceError] = useState('');
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [buildingNumberError, setBuildingNumberError] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [apartmentNumberError, setApartmentNumberError] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [wage, setWage] = useState('');
  const [wageError, setWageError] = useState('');
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');
  const navigate = useNavigate();


  React.useEffect(() => {
    if (token === null) {
      navigate('/404')
    } else if (!roles.includes('MANAGER')) {
      navigate('/404');
    }
  }, [])

  const successRegistrationToastMessage = () => {
    toast.success('Personnel Registration successfull !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const errorRegistrationToastMessage = () => {
    toast.error('ERROR!! Personnel could not be registration, Please try again !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === '') {
      setEmailError('Email is required');
    } else if (value.length > 30) {
      setEmailError('Email must not exceed 30 characters');
    } else if (!emailRegex.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    setEmail(value);
  };
  const handleNameChange = (event) => {
    const value = event.target.value;
    if (value.trim() === '') {
      setNameError('Name is required');
      setName('');
    } else if (value.length > 10) {
      setNameError('Name must not exceed 10 characters');
    } else {
      setNameError('');
      setName(value);
    }
  };
  const handleMiddleNameChange = (event) => {
    const value = event.target.value;
    if (value.length > 10) {
      setMiddleNameError('Middlename must not exceed 10 characters');
    } else {
      setMiddleNameError('');
      setMiddleName(value);
    }
  };
  const handleSurnameChange = (event) => {
    const value = event.target.value;
    if (value.trim() === '') {
      setSurnameError('Surname is required');
      setSurname('');
    } else if (value.length > 25) {
      setSurnameError('Surname must not exceed 25 characters');
    } else {
      setSurnameError('');
      setSurname(value);
    }
  };
  const handleBirthPlaceChange = (event) => {
    const value = event.target.value;
    if (value.trim() === '') {
      setBirthPlaceError('Birth Place is required');
      setBirthPlace('');
    } else if (value.length > 25) {
      setBirthPlaceError('Birth Place must not exceed 25 characters');
    } else {
      setBirthPlaceError('');
      setBirthPlace(value);
    }
  };
  const handleIdentificationNumberChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value.trim() === '') {
      setIdentificationNumberError('Identification Number is required');
    } else if (value.length < 11) {
      setIdentificationNumberError('Identification Number must have at least 11 characters');
    } else if (value.length > 11) {
      setIdentificationNumberError('Identification Number must not exceed 11 characters');
      value = value.slice(0, 11);
    } else {
      setIdentificationNumberError('');
    }
    setIdentificationNumber(value);
  };
  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    if (value.trim() === '') {
      setDepartmentError('Department is required');
      setDepartment('');
    } else if (value.length > 25) {
      setDepartmentError('Department must not exceed 25 characters');
    } else {
      setDepartmentError('');
      setDepartment(value);
    }
  };

  const handleNumberOfDayOffChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 3) {
      value = value.slice(0, 3);
      setNumberOfDayOffError('Number of Day Off must not exceed 3 characters');
    } else {
      setNumberOfDayOffError('');
      if (value > 365) {
        setNumberOfDayOffError('Number of Day Off must not exceed 365');
      }
      setNumberOfDayOff(value);
    }
  };
  const handleNeighbourhoodChange = (event) => {
    const value = event.target.value;
    if (value.length > 40) {
      setNeighbourhoodError('Neighbourhood must not exceed 40 characters');
    } else {
      setNeighbourhoodError('');
      setNeighbourhood(value);
    }
  };
  const handleDistrictChange = (event) => {
    const value = event.target.value;
    if (value.length > 40) {
      setDistrictError('District must not exceed 40 characters');
    } else {
      setDistrictError('');
      setDistrict(value);
    }
  };
  const handleProvinceChange = (event) => {
    const value = event.target.value;
    if (value.length > 40) {
      setProvinceError('Province must not exceed 40 characters');
    } else {
      setProvinceError('');
      setProvince(value);
    }
  };
  const handleCountryChange = (event) => {
    const value = event.target.value;
    if (value.length > 25) {
      setCountryError('Country must not exceed 40 characters');
    } else {
      setCountryError('');
      setCountry(value);
    }
  };
  const handleBuildingNumberChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 7) {
      value = value.slice(0, 7);
      setBuildingNumberError('Number of Building Number must not exceed 7 characters');
    } else {
      setBuildingNumberError('');
      setBuildingNumber(value);
    }
  };
  const handleApartmentNumberChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 7) {
      value = value.slice(0, 7);
      setApartmentNumberError('Number of Appartment Number must not exceed 7 characters');
    } else {
      setApartmentNumberError('');
      setApartmentNumber(value);
    }
  };
  const handlePostalCodeChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 7) {
      value = value.slice(0, 7);
      setPostalCodeError('Number of Postal Code must not exceed 7 characters');
    } else {
      setPostalCodeError('');
      setPostalCode(value);
    }
  };

  const handlePhoneChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 12) {
      value = value.slice(0, 12);
      setPhoneError('Number of Phone Number must not exceed 12 characters');
    } else {
      setPhoneError('');
      setPhone(value);
    }
  };

  const handleWageChange = (event) => {
    let value = event.target.value;
    value = value.replace(/[^\d.]/g, '');
    if (value.length > 12) {
      value = value.slice(0, 12);
      setWageError('Number of Phone Number must not exceed 12 characters');
    } else if (value < 0) {
      setWageError('Wage can not be less than 0');
    } else {
      setWageError('');
      setWage(value);
    }
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
    const data = new FormData(event.currentTarget);
    const token = sessionStorage.getItem('token');
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const formattedBirthPlace = birthPlace.charAt(0).toUpperCase() + birthPlace.slice(1).toLowerCase();
    const formattedMiddleName = middleName.charAt(0).toUpperCase() + middleName.slice(1).toLowerCase();
    const formattedSurname = surname.charAt(0).toUpperCase() + surname.slice(1).toLowerCase();
    const formattedNeighbourhood = neighbourhood.charAt(0).toUpperCase() + neighbourhood.slice(1).toLowerCase();
    const formattedDistrict = district.charAt(0).toUpperCase() + district.slice(1).toLowerCase();
    const formattedProvince = province.charAt(0).toUpperCase() + province.slice(1).toLowerCase();
    const formattedCountry = country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
    const formattedDepartment = department.charAt(0).toUpperCase() + department.slice(1).toLowerCase();


    const payload = {
      email: data.get('email'),
      birthPlace: formattedBirthPlace,
      name: formattedName,
      middleName: formattedMiddleName,
      surname: formattedSurname,
      dateOfBirth: selectedDateOfBirthChange.format('DD-MM-YYYY'),
      identificationNumber: data.get('identificationNumber'),
      gender: gender.toUpperCase(),
      phone: data.get('phone'),
      wage: data.get('wage'),
      country: data.get('country'),
      base64Avatar: imgs,
      neighbourhood: formattedNeighbourhood,
      district: formattedDistrict,
      province: formattedProvince,
      formattedCountry,
      buildingNumber: data.get('buildingNumber'),
      apartmentNumber: data.get('apartmentNumber'),
      postalCode: data.get('postalCode'),
      department: formattedDepartment,
      jobStartingDate: selectedJobStartingDateChange.format('DD-MM-YYYY'),
      jobShift: `${shiftStart.format('LTS')} - ${shiftEnd.format('LTS')}`,
      jobBreak: checked,
      employeeLeaves: data.get('employeeLeaves'),
    };
    console.log('Form Data:', payload);


    await axios
      .post(`http://localhost:9080/api/v1/user-profile/create-manager/${token}`, payload)
      .then((response) => {
        console.log('Success:', response.data);
        successRegistrationToastMessage();
        setEmail('')
        setSelectedDateOfBirthChange(dayjs())
        setSelectedJobStartingDateChange(dayjs())
        setGender(comboOptions[0])
        setInputValue('')
        setImgs('')
        setShiftStart(dayjs())
        setShiftEnd(dayjs())
        setName('')
        setMiddleName('')
        setSurname('')
        setBirthPlace('')
        setIdentificationNumber('')
        setDepartment('')
        setNumberOfDayOff('')
        setNeighbourhood('')
        setDistrict('')
        setProvince('')
        setCountry('')
        setBuildingNumber('')
        setApartmentNumber('')
        setPostalCode('')
        setPhone('')
        setWage('')
        setChecked([])
      })
      .catch((error) => {
        errorRegistrationToastMessage();
        console.error('Error:', error);
      });


  };

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    console.log(checked)

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked)

  };


  return (
    <>
      <Grid sx={{ display: 'flex', ml: '10rem' }}>
        <Paper sx={{ maxWidth: 1800 }}>
          <CardHeader title={title} />
          <Card sx={{ mt: 5 }}>
            <Grid container justifyContent="center" alignItems="center" flexDirection="column" sx={{ mx: 'auto', mt: 5 }}>
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
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={name}
                  onChange={handleNameChange}
                  error={Boolean(nameError)}
                  helperText={nameError}
                />
                <TextField
                  id="middleName"
                  name="middleName"
                  label="Middle Name"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={middleName}
                  onChange={handleMiddleNameChange}
                  error={Boolean(middleNameError)}
                  helperText={middleNameError}
                />
                <TextField
                  id="surname"
                  name="surname"
                  label="Surname"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={surname}
                  onChange={handleSurnameChange}
                  error={Boolean(surnameError)}
                  helperText={surnameError}
                />
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={email}
                  onChange={handleEmailChange}
                  error={Boolean(emailError)}
                  helperText={emailError}
                />
                <TextField
                  id="birthPlace"
                  name="birthPlace"
                  label="Birth Place"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={birthPlace}
                  onChange={handleBirthPlaceChange}
                  error={Boolean(birthPlaceError)}
                  helperText={birthPlaceError}
                />
                <TextField
                  id="identificationNumber"
                  name="identificationNumber"
                  label="Identification Number"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={identificationNumber}
                  onChange={handleIdentificationNumberChange}
                  error={Boolean(identificationNumberError)}
                  helperText={identificationNumberError}
                />
                <TextField id="phone" name="phone" label="Phone" variant="filled" value={phone}
                  onChange={handlePhoneChange}
                  error={Boolean(phoneError)}
                  helperText={phoneError}
                  sx={{ width: 280 }} />
                <TextField
                  id="department"
                  name="department"
                  label="Department"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={department}
                  onChange={handleDepartmentChange}
                  error={Boolean(departmentError)}
                  helperText={departmentError}
                />

                <TextField
                  id="employeeLeaves"
                  name="employeeLeaves"
                  label="Number Of Day Off"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={numberOfDayOff}
                  onChange={handleNumberOfDayOffChange}
                  error={Boolean(numberOfDayOffError)}
                  helperText={numberOfDayOffError}
                />
                <TextField
                  id="wage"
                  name="wage"
                  label="Wage"
                  variant="filled"
                  value={wage}
                  onChange={handleWageChange}
                  error={Boolean(wageError)}
                  helperText={wageError}
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
                            setShiftStart(e);
                            console.log(e);
                          }}
                        />
                      </Box>
                      <TimePicker
                        sx={{ width: 280 }}
                        label="Shift End"
                        value={shiftEnd}
                        onChange={(e) => {
                          setShiftEnd(e);
                          console.log(e);
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
                    console.log(newInputValue);
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
                      onChange={(e) => {
                        setSelectedDateOfBirthChange(e);
                      }}
                      sx={{ width: 280 }}
                    />
                  </DemoContainer>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      id="jobStartingDate"
                      label="Job Starting Date"
                      name="jobStartingDate"
                      value={selectedJobStartingDateChange}
                      onChange={(e) => {
                        setSelectedJobStartingDateChange(e);
                      }}
                      sx={{ width: 280 }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid container justifyContent="center" sx={{ mx: 'auto' }}>
                <Grid item xs={12}>
                  <CardHeader subheader="Break Information" sx={{ marginLeft: '3rem' }} />
                </Grid>
                <Grid item xs={12} sx={{ ml: 30 }}>
                  <List sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', maxWidth: 2000, bgcolor: 'background.paper' }}>
                    {['Smoke Break', 'Rest Break', 'Lunch Break', 'Health Issue Break'].map((value) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem key={value} sx={{ width: '40%', justifyContent: 'center' }}>
                          <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                style={{ color: "#ffa726" }}
                              />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              </Grid>
              <CardHeader subheader="Employee Address" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField
                  id="neighbourhood"
                  name="neighbourhood"
                  label="Neighbourhood"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={neighbourhood}
                  onChange={handleNeighbourhoodChange}
                  error={Boolean(neighbourhoodError)}
                  helperText={neighbourhoodError}
                />
                <TextField
                  id="district"
                  name="district"
                  label="District"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={district}
                  onChange={handleDistrictChange}
                  error={Boolean(districtError)}
                  helperText={districtError}
                />
                <TextField
                  id="province"
                  name="province"
                  label="Province"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={province}
                  onChange={handleProvinceChange}
                  error={Boolean(provinceError)}
                  helperText={provinceError}
                />
                <TextField
                  id="country"
                  name="country"
                  label="Country"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={country}
                  onChange={handleCountryChange}
                  error={Boolean(countryError)}
                  helperText={countryError}
                />
                <TextField
                  id="buildingNumber"
                  name="buildingNumber"
                  label="Building Number"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={buildingNumber}
                  onChange={handleBuildingNumberChange}
                  error={Boolean(buildingNumberError)}
                  helperText={buildingNumberError}
                />
                <TextField
                  id="apartmentNumber"
                  name="apartmentNumber"
                  label="Apartment Number"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={apartmentNumber}
                  onChange={handleApartmentNumberChange}
                  error={Boolean(apartmentNumberError)}
                  helperText={apartmentNumberError}
                />
                <TextField
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  variant="filled"
                  sx={{ width: 280 }}
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  error={Boolean(postalCodeError)}
                  helperText={postalCodeError}
                />
                <Grid container justifyContent="center" sx={{ mt: '2rem' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ maxWidth: 140, minWidth: 140 }}
                    sx={{
                      borderRadius: 2,
                      padding: 1,
                      bgcolor: '#ffa726',
                      '&:hover': {
                        bgcolor: 'grey',
                      },
                    }}
                  >
                    Create
                  </Button>
                  <ToastContainer />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Paper>
      </Grid>
    </>
  );
}
