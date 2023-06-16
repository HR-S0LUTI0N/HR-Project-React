import PropTypes from 'prop-types';
import axios from 'axios';
import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TextField from '@mui/material/TextField';
import { Box, Card, CardHeader } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';




export default function CompanySaveBox() {

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

    try {
      const response = await axios.post(`http://localhost:9070/api/v1/company/save/${token}`, payload);
      console.log('Success:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card >
      <CardHeader />
      <Grid container sx={{ justifyContent: 'flex-end', width: 200 }}>
        <Button sx={{ marginBottom: '2rem' }} endIcon={iseInformationBoxShown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} variant="contained" onClick={buttonHandler}>
          {iseInformationBoxShown ? "Information " : "Information"}
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
            <Typography gutterBottom
              variant="h5"
              component="div"
            >Company Information</Typography>
            <TextField id="companyName" name="companyName" label="Company Name" variant="filled" />
            <TextField id="companyBalanceStatus" name="companyBalanceStatus" label="Company BalanceStatus" variant="filled" />
            <TextField id="taxNumber" name="taxNumber" label="TaxNumber" variant="filled" />
            <TextField id="title" name="title" label="Title" variant="filled" />
            <TextField id="sector" name="sector" label="Sector" variant="filled" />
            <TextField id="description" name="description" label="Description" variant="filled" />
            <TextField id="companyPhone" name="companyPhone" label="Phone" variant="filled" />
            <TextField id="companyMail" name="companyMail" label="Mail" variant="filled" />


            <Typography gutterBottom
              variant="h5"
              component="div"
            >Address</Typography>
            <TextField id="companyNeighbourhood" name="companyNeighbourhood" label="Neighbourhood" variant="filled" />
            <TextField id="companyDistrict" name="companyDistrict" label="District" variant="filled" />
            <TextField id="companyProvince" name="companyProvince" label="Province" variant="filled" />
            <TextField id="companyCountry" name="companyCountry" label="Country" variant="filled" />
            <TextField id="companyBuildingNumber" name="companyBuildingNumber" label="BuildingNumber" variant="filled" />
            <TextField id="companyApartmentNumber" name="companyApartmentNumber" label="ApartmentNumber" variant="filled" />
            <TextField id="companyPostalCode" name="companyPostalCode" label="PostalCode" variant="filled" />

            <Grid container sx={{ mx: 'auto', width: 100 }}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3, width: 135, height: 35, ml: 8 }}>
                Save Company
              </Button>
            </Grid>
          </Box>
        </Card>
      )}
    </Card>
  );
}
