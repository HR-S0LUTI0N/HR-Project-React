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

const comboOptions = ['Pregnancy Leave', 'Paternity Leave', 'Annual Leave', 'Compassionate Leave', 'OTHER'];

export default function PermissionRequest({ title }) {
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
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [description, setDescription] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
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
      navigate('/404');
    } else if (!roles.includes('PERSONEL')) {
      navigate('/404');
    }
  }, []);

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

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setDescription(description);

    const validateDescription = () => {
      if (description.length > 500) {
        return 'Description should not exceed 500 characters';
      }
      return '';
    };
    const errorMessageDescription = validateDescription();
    setDescriptionError(errorMessageDescription);
    setDescriptionValid(errorMessageDescription === '');
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
      .post(`http://localhost:9080/api/v1/user-profile/create-personal/${token}`, payload)
      .then((response) => {
        console.log('Success:', response.data);
        successRegistrationToastMessage();
        setEmail('');
        setSelectedDateOfBirthChange(dayjs());
        setSelectedJobStartingDateChange(dayjs());
        setGender(comboOptions[0]);
        setInputValue('');
        setImgs('');
        setShiftStart(dayjs());
        setShiftEnd(dayjs());
        setName('');
        setMiddleName('');
        setSurname('');
        setBirthPlace('');
        setIdentificationNumber('');
        setDepartment('');
        setNumberOfDayOff('');
        setNeighbourhood('');
        setDistrict('');
        setProvince('');
        setCountry('');
        setBuildingNumber('');
        setApartmentNumber('');
        setPostalCode('');
        setPhone('');
        setWage('');
        setChecked([]);
      })
      .catch((error) => {
        errorRegistrationToastMessage();
        console.error('Error:', error);
      });
  };

  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    console.log(checked);

    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    console.log(checked);
  };

  return (
    <>
      <Grid sx={{ display: 'flex', ml: '8rem' }}>
        <Paper sx={{ width: 1300 }}>
          <Card sx={{ mt: 1 }}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', p: '2rem' }}
            >
              <CardHeader subheader="Request Permission" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <Autocomplete
                  sx={{ width: 280 }}
                  name="Permission Type"
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
                  renderInput={(params) => <TextField {...params} label="Permission Type" />}
                />
              </Grid>
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
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
                  error={!descriptionValid}
                  helperText={!descriptionValid ? descriptionError : ''}
                  onChange={handleDescriptionChange}
                />
                <Grid container justifyContent="center">
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    <DemoContainer components={['DatePicker']} sx={{ mr: '1rem' }}>
                      <DatePicker
                        id="permissionStartingDate"
                        label="Start Permission Date"
                        name="permissionStartingDate"
                        value={selectedDateOfBirthChange}
                        onChange={(e) => {
                          setSelectedDateOfBirthChange(e);
                        }}
                        sx={{ width: 280 }}
                      />
                    </DemoContainer>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        id="permissionEndingDate"
                        label="End Permission Date"
                        name="permissionEndingDate"
                        value={selectedJobStartingDateChange}
                        onChange={(e) => {
                          setSelectedJobStartingDateChange(e);
                        }}
                        sx={{ width: 280 }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
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
                    Send Request
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
