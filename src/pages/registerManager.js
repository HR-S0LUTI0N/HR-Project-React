import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [emailValid, setEmailValid] = React.useState(true);
  const [nameValid, setNameValid] = React.useState(true);
  const [surnameValid, setSurnameValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [repasswordValid, setRepasswordValid] = React.useState(true);
  const [identificationNumberValid, setIdentificationNumberValid] = React.useState(true);
  const [departmentValid, setDepartmentValid] = React.useState(true);
  const [company, setCompany] = React.useState('');
  const [companies, setCompanies] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:9070/api/v1/company/find-all');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setNameValid(name.length > 2);
  };

  const handleSurnameChange = (event) => {
    const surname = event.target.value;
    setSurnameValid(surname.length > 2);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPasswordValid(password.length >= 8);
  };

  const handleRepasswordChange = (event) => {
    const repassword = event.target.value;
    setRepasswordValid(repassword === document.getElementById('password').value);
  };

  const handleIdentificationNumberChange = (event) => {
    const identificationNumber = event.target.value;
    setIdentificationNumberValid(identificationNumber.length === 11);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setDepartmentValid(department.length >= 2);
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      emailValid &&
      nameValid &&
      surnameValid &&
      passwordValid &&
      repasswordValid &&
      identificationNumberValid &&
      departmentValid
    ) {
      const formData = {
        email: event.target.email.value,
        name: event.target.name.value,
        surname: event.target.surname.value,
        password: event.target.password.value,
        repassword: event.target.repassword.value,
        identificationNumber: event.target.identificationNumber.value,
        department: event.target.department.value,
        companyId: company.companyId,
      };
      try {
        const response = await axios.post('http://localhost:9090/api/v1/auth/register-manager', formData);
        console.log('Success:', response.data);
        navigate('/login')
      } catch (error) {
        console.error('Error signing up:', error);
      }
    } else {
      console.log('Form data is invalid');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://img.freepik.com/free-psd/3d-female-character-holding-tablet-pointing-pie-chart_23-2148938905.jpg?size=626&ext=jpg&uid=R105010038&ga=GA1.1.1780058954.1685527094)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    error={!nameValid}
                    helperText={!nameValid ? 'Please enter your name' : ''}
                    onChange={handleNameChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="middleName"
                    label="Middle Name"
                    name="middleName"
                    autoComplete="middleName"
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                id="surname"
                label="Surname"
                name="surname"
                autoComplete="surname"
                autoFocus
                error={!surnameValid}
                helperText={!surnameValid ? 'Please enter your surname' : ''}
                onChange={handleSurnameChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                error={!emailValid}
                helperText={!emailValid ? 'Please enter a valid email address' : ''}
                onChange={handleEmailChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!passwordValid}
                helperText={!passwordValid ? 'Password must be at least 8 characters long' : ''}
                onChange={handlePasswordChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Repassword"
                type="password"
                id="repassword"
                autoComplete="new-password"
                error={!repasswordValid}
                helperText={!repasswordValid ? 'Passwords do not match' : ''}
                onChange={handleRepasswordChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="identificationNumber"
                label="Identification Number"
                name="identificationNumber"
                autoComplete="identificationNumber"
                autoFocus
                error={!identificationNumberValid}
                helperText={!identificationNumberValid ? 'Please enter a valid identification number' : ''}
                onChange={handleIdentificationNumberChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="department"
                label="Department"
                name="department"
                autoComplete="department"
                autoFocus
                error={!departmentValid}
                helperText={!departmentValid ? 'Department must be at least 2 characters long' : ''}
                onChange={handleDepartmentChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="company-label">Company</InputLabel>
                <Select labelId="company-label" id="company" value={company} onChange={handleCompanyChange}>
                  {companies.map((company) => (
                    <MenuItem key={company.companyId} value={company}>
                      {`${company.companyName} ${company.title}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {'Already have an account? Sign in'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
