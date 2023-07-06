import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { ToastContainer, toast } from 'react-toastify';

export default function AppConversionRates({ title }) {
  const [advanceRequest, setAdvanceRequest] = useState('');
  const [advanceRequestError, setAdvanceRequestError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [descriptionValid, setDescriptionValid] = React.useState(true);
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null || !roles.includes('PERSONEL')) {
      navigate('/404');
    }
  }, [token, roles, navigate]);

  const successRegistrationToastMessage = () => {
    toast.success('Personnel Registration successful!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const errorRegistrationToastMessage = () => {
    toast.error('ERROR!! Personnel could not be registered. Please try again!!', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleAdvanceRequestChange = (event) => {
    let value = event.target.value;
    value = value.replace(/\D/g, '');
    if (value.length > 12) {
      value = value.slice(0, 12);
      setAdvanceRequestError('Number of Phone Number must not exceed 12 characters');
    } else if (value < 0) {
      setAdvanceRequestError('Wage cannot be less than 0');
    } else {
      setAdvanceRequestError('');
      setAdvanceRequest(value);
    }
  };

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setDescription(description);

    const validateDescription = () => {
      if (description.trim().length === 0) {
        return 'Description cannot be empty';
      }

      if (description.length > 500) {
        return 'Description should not exceed 500 characters';
      }
      return '';
    };

    const errorMessageDescription = validateDescription();
    setDescriptionError(errorMessageDescription);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (description.trim() === '') {
      setDescriptionError('Description is required');
      setDescriptionValid(false);
      return;
    }
    const payload = {
      description,
      advanceRequest,
    };

    try {
      const response = await axios.post(`http://localhost:9080/api/v1/user-profile/advance-request/${token}`, payload);
      console.log('Success:', response.data);
      successRegistrationToastMessage();
      setAdvanceRequest('');
      setDescription('');
      setDescriptionValid(true);
      setDescriptionError('');
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <Grid sx={{ display: 'flex', ml: '10rem' }} >
        <Paper sx={{ maxWidth: 1800 }}>
          <CardHeader title={title} />
          <Card sx={{ mt: -3 }}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: '2rem', p: '2rem' }}
            >
              <CardHeader subheader="Advance Payment Information" sx={{ marginLeft: '3rem' }} />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
                <TextField
                  id="advanceRequest"
                  name="advanceRequest"
                  label="Advance Request"
                  variant="filled"
                  value={advanceRequest}
                  onChange={handleAdvanceRequestChange}
                  error={Boolean(advanceRequestError)}
                  helperText={advanceRequestError}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₺</InputAdornment>,
                  }}
                  sx={{ width: 280 }}
                />
              </Grid>

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
                error={Boolean(descriptionError)}
                helperText={descriptionError}
                onChange={handleDescriptionChange}
              />
              <Grid container justifyContent="center" sx={{ mx: 'auto', gap: '2rem' }}>
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
