import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ToastContainer, toast } from 'react-toastify';

function Overview() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddressEditMode, setIsAddressEditMode] = useState(false);
  const [isPasswordChangeMode, setPasswordChangeMode] = useState(false);
  const [imgs, setImgs] = useState('');
  const [appStatus, setAppStatus] = useState(true);

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
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
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
  const handlePasswordChangeClick = () => {
    setPasswordChangeMode(!isPasswordChangeMode);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordsMatch(confirmPassword === event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordsMatch(newPassword === event.target.value);
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
        setImgs(data.avatar);
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
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
        toast.success('Profil güncelleme işleminiz başarıyla gerçekleşmiştir.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
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
        toast.success('Adres Bilgileri güncelleme işleminiz başarıyla gerçekleşmiştir.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };
  const handlePasswordUpdate = () => {
    if (newPassword === confirmPassword) {
      const changePassword = {
        oldPassword,
        newPassword,
        token,
      };

      axios
        .put('http://localhost:9080/api/v1/user-profile/password-change', changePassword)
        .then((response) => {
          const data = response.data;
          setOldPassword(changePassword.oldPassword);
          setNewPassword(changePassword.newPassword);
          setConfirmPassword(changePassword.confirmPassword);
          setPasswordsMatch(true);
          setPasswordChangeMode(false);
          toast.success('Şifre değiştirme işleminiz başarılı olmuştur', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setOldPassword('');
          setNewPassword('')
          setConfirmPassword('')
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    } else {
      setPasswordsMatch(false);
    }
  };

  function handleChange(e) {
    console.log(e.target.files);
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const result = reader.result;
        setImgs(result);
        handleAvatarUpdater(result); // Pass the updated result as an argument
      });

      reader.readAsDataURL(file);
    }
  }

  const handleAvatarUpdater = (updatedData) => { // Receive the updated data as an argument
    console.log(updatedData);
    axios
      .put(`http://localhost:9080/api/v1/user-profile/update-avatar/${token}`, { base64Img: updatedData })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setAppStatus(!appStatus);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <section style={{ padding: '30px', marginLeft: 0, marginRight: 0 }}>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div
              style={{
                height: '400px',
                background: '#FAF0E4',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Avatar sx={{ minWidth: 220, minHeight: 220, mb: 3, mx: 'auto', alignContent: 'center' }} src={imgs} />
              <Button
                type="submit"
                variant="contained"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  maxWidth: 140,
                  minWidth: 140,
                  margin: '0 auto',
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
                Update Avatar
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
                    cursor: 'pointer'
                  }}
                />
              </Button>
            </div >
          </Grid>
          <Grid item xs={12} md={6}>
            <div
              style={{
                height: '400px',
                background: '#FAF0E4',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
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
                      multiline
                      variant="standard"
                      value={name}
                      onChange={handleNameChange}
                    />
                    <Avatar sx={{ minWidth: 220, minHeight: 220, mb: 3, mx: 'auto', alignContent: 'center' }} src={imgs} />
                    <Button
                      type="submit"
                      variant="contained"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        maxWidth: 140,
                        minWidth: 140,
                        margin: '0 auto',
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
                      Update Avatar
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
                          cursor: 'pointer'
                        }}
                      />
                    </Button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      id="standard-textarea"
                      label="Middle Name"
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
                      multiline
                      variant="standard"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <Button
                    variant="contained"
                    onClick={handleUpdatePersonel}
                    style={{ marginTop: '10px' }}
                    sx={{
                      borderRadius: 2,
                      padding: 1,
                      bgcolor: '#ffa726',
                      '&:hover': {
                        bgcolor: 'grey',
                      },
                    }}
                  >
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
            <div
              style={{
                height: '400px',
                background: '#FAF0E4',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              {' '}
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
                      multiline
                      variant="standard"
                      value={neighbourhood}
                      onChange={handleNeighbourhoodChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="District"
                      multiline
                      variant="standard"
                      value={district}
                      onChange={handleDistrictChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Province"
                      multiline
                      variant="standard"
                      value={province}
                      onChange={handleProvinceChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Country"
                      multiline
                      variant="standard"
                      value={country}
                      onChange={handleCountryChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Building Number"
                      multiline
                      variant="standard"
                      value={buildingNumber}
                      onChange={handleBuildingNumberChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Apartment Number"
                      multiline
                      variant="standard"
                      value={apartmentNumber}
                      onChange={handleApartmentNumberChange}
                    />
                    <TextField
                      id="standard-textarea"
                      label="Postal Code"
                      multiline
                      variant="standard"
                      value={postalCode}
                      onChange={handlePostalCodeChange}
                    />
                  </div>
                  <Button
                    variant="contained"
                    onClick={handleUpdateAddress}
                    style={{ marginTop: '10px' }}
                    sx={{
                      borderRadius: 2,
                      padding: 1,
                      bgcolor: '#ffa726',
                      '&:hover': {
                        bgcolor: 'grey',
                      },
                    }}
                  >
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
            <div
              style={{
                height: '400px',
                background: '#FAF0E4',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              {' '}
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
          <Grid item xs={12} md={6} sx={{ margin: 0 }}>
            <div
              style={{
                height: '400px',
                background: '#FAF0E4',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              <h3>Change Password</h3>
              <div>
                <div style={{ marginTop: '20px' }}>
                  <TextField
                    id="old-password"
                    label="Old Password"
                    type="password"
                    variant="outlined"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                    style={{ marginBottom: '10px' }}
                  />
                  <br />
                  <TextField
                    id="new-password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    style={{ marginBottom: '10px' }}
                    error={!passwordsMatch}
                    helperText={!passwordsMatch && "Passwords don't match"}
                  />
                  <br />
                  <TextField
                    id="confirm-password"
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    style={{ marginBottom: '10px' }}
                    error={!passwordsMatch}
                  />
                  <br />
                  <Button
                    variant="contained"
                    onClick={handlePasswordUpdate}
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
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <ToastContainer />
        </Grid>
      </div>
    </section>
  );
}

export default Overview;
