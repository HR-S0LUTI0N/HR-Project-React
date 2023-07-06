import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';

export default function CompanySaveBox() {
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

  <TextField id="companyMail" name="companyMail" label="Mail" variant="filled" />;

  const [companyName, setCompanyName] = useState('');
  const [companyBalanceStatus, setCompanyBalanceStatus] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [sector, setSector] = useState('');
  const [description, setDescription] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyMail, setCompanyMail] = useState('');

  const [companyNeighbourhood, setCompanyNeighbourhood] = useState('');
  const [companyDistrict, setCompanyDistrict] = useState('');
  const [companyProvince, setCompanyProvince] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyBuildingNumber, setCompanyBuildingNumber] = useState('');
  const [companyApartmentNumber, setCompanyApartmentNumber] = useState('');
  const [companyPostalCode, setCompanyPostalCode] = useState('');

  const [iseInformationBoxShown, setIsInformationBoxShown] = useState(true);
  const buttonHandler = () => {
    setIsInformationBoxShown(!iseInformationBoxShown);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = sessionStorage.getItem('token');

    const payload = {
      companyName: data.get('companyName'),
      companyBalanceStatus: data.get('companyBalanceStatus'),
      taxNumber: data.get('taxNumber'),
      title: data.get('title'),
      sector: data.get('sector'),
      description: data.get('description'),
      companyPhone: data.get('companyPhone'),
      companyMail: data.get('companyMail'),
      companyNeighbourhood: data.get('companyNeighbourhood'),
      companyDistrict: data.get('companyDistrict'),
      companyProvince: data.get('companyProvince'),
      companyCountry: data.get('companyCountry'),
      companyBuildingNumber: data.get('companyBuildingNumber'),
      companyApartmentNumber: data.get('companyApartmentNumber'),
      companyPostalCode: data.get('companyPostalCode'),
    };
    console.log('Form Data:', payload);

    await axios
      .post(`http://localhost:9070/api/v1/company/save/${token}`, payload)
      .then((response) => {
        console.log('Success:', response.data);
        successRegistrationToastMessage();
      })
      .catch((error) => {
        errorRegistrationToastMessage();
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        console.error('Error:', error);
      });
    setCompanyName('');
    setCompanyBalanceStatus('');
    setTaxNumber('');
    setSector('');
    setDescription('');
    setCompanyPhone('');
    setCompanyMail('');
    setCompanyNeighbourhood('');
    setCompanyDistrict('');
    setCompanyProvince('');
    setCompanyCountry('');
    setCompanyBuildingNumber('');
    setCompanyApartmentNumber('');
    setCompanyPostalCode('');
  };

  return (
    <Card>
      <CardHeader />
      <Grid container sx={{ justifyContent: 'flex-end', width: 200 }}>
        <Button
          sx={{ marginBottom: '2rem' }}
          endIcon={iseInformationBoxShown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          variant="contained"
          onClick={buttonHandler}
        >
          {iseInformationBoxShown ? 'Information ' : 'Information'}
        </Button>
      </Grid>

      {iseInformationBoxShown && (
        <Card>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 2, width: '35ch' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Typography gutterBottom variant="h5" component="div">
              Company Information
            </Typography>
            <TextField id="companyName" name="companyName" label="Company Name" variant="filled" value={companyName} />
            <TextField
              id="companyBalanceStatus"
              name="companyBalanceStatus"
              label="Company BalanceStatus"
              variant="filled"
              value={companyBalanceStatus}
            />
            <TextField id="taxNumber" name="taxNumber" label="TaxNumber" variant="filled" value={taxNumber} />
            <TextField id="sector" name="sector" label="Sector" variant="filled" value={sector} />
            <TextField id="description" name="description" label="Description" variant="filled" value={description} />
            <TextField id="companyPhone" name="companyPhone" label="Phone" variant="filled" value={companyPhone} />
            <TextField id="companyMail" name="companyMail" label="Mail" variant="filled" value={companyMail} />

            <Typography gutterBottom variant="h5" component="div">
              Address
            </Typography>
            <TextField
              id="companyNeighbourhood"
              name="companyNeighbourhood"
              label="Neighbourhood"
              variant="filled"
              value={companyNeighbourhood}
            />
            <TextField
              id="companyDistrict"
              name="companyDistrict"
              label="District"
              variant="filled"
              value={companyDistrict}
            />
            <TextField
              id="companyProvince"
              name="companyProvince"
              label="Province"
              variant="filled"
              value={companyProvince}
            />
            <TextField
              id="companyCountry"
              name="companyCountry"
              label="Country"
              variant="filled"
              value={companyCountry}
            />
            <TextField
              id="companyBuildingNumber"
              name="companyBuildingNumber"
              label="BuildingNumber"
              variant="filled"
              value={companyBuildingNumber}
            />
            <TextField
              id="companyApartmentNumber"
              name="companyApartmentNumber"
              label="ApartmentNumber"
              variant="filled"
              value={companyApartmentNumber}
            />
            <TextField
              id="companyPostalCode"
              name="companyPostalCode"
              label="PostalCode"
              variant="filled"
              value={companyPostalCode}
            />

            <Grid container sx={{ mx: 'auto', width: 100 }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3, width: 135, height: 35, ml: 8 }}>
                Save Company
              </Button>
              <ToastContainer />
            </Grid>
          </Box>
        </Card>
      )}
    </Card>
  );
}
