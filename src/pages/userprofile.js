import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Overview() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddressEditMode, setIsAddressEditMode] = useState(false);

  const [name, setName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyNeighbourhood, setCompanyNeighbourhood] = useState('');
  const [companyDistrict, setCompanyDistrict] = useState('');
  const [companyProvince, setCompanyProvince] = useState('');
  const [companyCountry, setCompanyCountry] = useState('');
  const [companyBuildingNumber, setCompanyBuildingNumber] = useState('');
  const [companyApartmentNumber, setCompanyApartmentNumber] = useState('');
  const [companyPostalCode, setCompanyPostalCode] = useState('');
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAddressEditClick = () => {
    setIsAddressEditMode(!isAddressEditMode);
  };

  const handleNeighbourhoodChange = (e) => {
    setNeighbourhood(e.target.value);
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleBuildingNumberChange = (e) => {
    setBuildingNumber(e.target.value);
  };

  const handleApartmentNumberChange = (e) => {
    setApartmentNumber(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');

  useEffect(() => {
    if (token == null) {
      navigate('/404');
    } else if (!roles.includes('PERSONEL')) {
      navigate('/404');
    } else {
      handlePersonel();
    }
  }, []);

  const handlePersonel = () => {
    axios
      .get(`http://localhost:9080/api/v1/user-profile/get-personel-profile-for-user-profile-dashboard/${token}`)
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setMiddleName(data.middleName);
        setSurname(data.surname);
        setPhone(data.phone);
        setEmail(data.email);
        setNeighbourhood(data.neighbourhood);
        setDistrict(data.district);
        setProvince(data.province);
        setCountry(data.country);
        setBuildingNumber(data.buildingNumber);
        setApartmentNumber(data.apartmentNumber);
        setPostalCode(data.postalCode);
        setCompanyNeighbourhood(data.companyNeighbourhood);
        setCompanyDistrict(data.companyDistrict);
        setCompanyProvince(data.companyProvince);
        setCompanyCountry(data.companyCountry);
        setCompanyBuildingNumber(data.companyBuildingNumber);
        setCompanyApartmentNumber(data.companyApartmentNumber);
        setCompanyPostalCode(data.companyPostalCode);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUpdatePersonel = () => {
    const updatedData = {
      name,
      middleName,
      surname,
      phone,
      email,
      token,
    };

    axios
      .put('http://localhost:9080/api/v1/user-profile/updatePersonel', updatedData)
      .then((response) => {
        const data = response.data;
        setName(updatedData.name);
        setMiddleName(updatedData.middleName);
        setSurname(updatedData.surname);
        setPhone(updatedData.phone);
        setEmail(updatedData.email);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleUpdateAddress = () => {
    const updatedAddressData = {
      neighbourhood,
      district,
      province,
      country,
      buildingNumber,
      apartmentNumber,
      postalCode,
      token,
    };

    axios
      .put('http://localhost:9080/api/v1/user-profile/update-personel-address', updatedAddressData)
      .then((response) => {
        const data = response.data;
        setNeighbourhood(updatedAddressData.neighbourhood);
        setDistrict(updatedAddressData.district);
        setProvince(updatedAddressData.province);
        setCountry(updatedAddressData.country);
        setBuildingNumber(updatedAddressData.buildingNumber);
        setApartmentNumber(updatedAddressData.apartmentNumber);
        setPostalCode(updatedAddressData.postalCode);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section style={{ padding: '30px', marginLeft: 0, marginRight: 0 }}>
      <Avatar
        alt="Remy Sharp"
        src="https://img.freepik.com/free-psd/3d-female-character-working-desk-with-laptop_23-2148938896.jpg?size=626&ext=jpg&uid=R105010038&ga=GA1.2.1780058954.1685527094"
        sx={{ width: 100, height: 100 }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '8px', position: 'relative' }}>
              <EditIcon
                style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
                onClick={() => {
                  handleEditClick();
                }}
              />
              <h3>Profile Information</h3>
              {isEditMode ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id="standard-textarea"
                      label="Name"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id="standard-textarea"
                      label="Middle Name"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={middleName}
                      onChange={handleMiddleNameChange}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id="standard-textarea"
                      label="Surname"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={surname}
                      onChange={handleSurnameChange}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id="standard-textarea"
                      label="Phone"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id="standard-textarea"
                      label="Email"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <Button variant="contained" onClick={handleUpdatePersonel} style={{ marginTop: '10px' }}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>Name: {name}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>MiddleName: {middleName}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>Surname: {surname}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>Mobile: {phone}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>Email: {email}</p>
                  </div>
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '8px', position: 'relative' }}>
              <EditIcon
                style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
                onClick={() => {
                  handleAddressEditClick();
                }}
              />
              <h3>Address Information</h3>
              {isAddressEditMode ? (
                <>
                  <div>
                    <TextField
                      id="standard-textarea"
                      label="Neighbourhood"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={neighbourhood}
                      onChange={handleNeighbourhoodChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="District"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={district}
                      onChange={handleDistrictChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Province"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={province}
                      onChange={handleProvinceChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Country"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={country}
                      onChange={handleCountryChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Building Number"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={buildingNumber}
                      onChange={handleBuildingNumberChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Apartment Number"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={apartmentNumber}
                      onChange={handleApartmentNumberChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Postal Code"
                      placeholder="Placeholder"
                      multiline
                      variant="standard"
                      value={postalCode}
                      onChange={handlePostalCodeChange}
                    />
                  </div>
                  <Button variant="contained" onClick={handleUpdateAddress} style={{ marginTop: '10px' }}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <p>Neighbourhood: {neighbourhood}</p>
                    <p>District: {district}</p>
                    <p>Province: {province}</p>
                    <p>Country: {country}</p>
                    <p>Building Number: {buildingNumber}</p>
                    <p>Apartment Number: {apartmentNumber}</p>
                    <p>Postal Code: {postalCode}</p>
                  </div>
                </>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ margin: 0 }}>
            <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '8px', position: 'relative' }}>
              <h3>Company Information</h3>
              <div>
                <p>Neighbourhood: {companyNeighbourhood}</p>
                <p>District: {companyDistrict}</p>
                <p>Province: {companyProvince}</p>
                <p>Country: {companyCountry}</p>
                <p>Building Number: {companyBuildingNumber}</p>
                <p>Apartment Number: {companyApartmentNumber}</p>
                <p>Postal Code: {companyPostalCode}</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Overview;
