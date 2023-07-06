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
  const [startingDate, setStartingDate] = useState(dayjs());
  const [endingDate, setEndingDate] = useState(dayjs());
  const [epermissionTypes, setEpermissionTypes] = useState(comboOptions[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const [description, setDescription] = React.useState('');
  const [descriptionError, setDescriptionError] = React.useState('');
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
    toast.success('Personnel Request successfull !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  const errorRegistrationToastMessage = () => {
    toast.error('ERROR!! Personnel could not be request, Please try again !!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (description.trim() === '') {
      setDescriptionError('Description is required');
      setDescriptionValid(false);
      return;
    }
    const data = new FormData(event.currentTarget);
    const token = sessionStorage.getItem('token');

    let type;
    if (epermissionTypes === 'Pregnancy Leave') {
      type = 'PREGNANCY';
    }
    if (epermissionTypes === 'Paternity Leave') {
      type = 'PATERNITY';
    }
    if (epermissionTypes === 'Annual Leave') {
      type = 'ANNUAL';
    }
    if (epermissionTypes === 'OTHER') {
      type = 'OTHER';
    }

    const payload = {
      description: data.get('description'),
      epermissionTypes: type.toUpperCase(),
      startingDate: startingDate.format('DD-MM-YYYY'),
      endingDate: endingDate.format('DD-MM-YYYY'),
    };
    console.log('Form Data:', payload);

    await axios
      .post(`http://localhost:9080/api/v1/day-off-permission/take-day-off-permission/${token}`, payload)
      .then((response) => {
        console.log('Success:', response.data);
        setDescription('');
        setDescriptionValid(true);
        setDescriptionError('');
        successRegistrationToastMessage();
        setStartingDate(dayjs());
        setEndingDate(dayjs());
        setEpermissionTypes(comboOptions[0]);
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
              <CardHeader subheader="Request Day Off" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <Autocomplete
                  sx={{ width: 280 }}
                  name="Permission Type"
                  value={epermissionTypes}
                  options={comboOptions}
                  onChange={(event, newInputValue) => {
                    console.log(newInputValue);
                    setEpermissionTypes(newInputValue);
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
                        value={startingDate}
                        onChange={(e) => {
                          setStartingDate(e);
                        }}
                        sx={{ width: 280 }}
                      />
                    </DemoContainer>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker
                        id="permissionEndingDate"
                        label="End Permission Date"
                        name="permissionEndingDate"
                        value={endingDate}
                        onChange={(e) => {
                          setEndingDate(e);
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
