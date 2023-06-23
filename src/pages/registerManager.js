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
  const [emailError, setEmailError] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameValid, setNameValid] = React.useState(true);
  const [name, setName] = React.useState('');
  const [nameError, setNameError] = React.useState('');
  const [middleName, setMiddlename] = React.useState('');
  const [middleNameValid, setMiddlenameValid] = React.useState(true);
  const [middleNameError, setMiddlenameError] = React.useState('');
  const [surnameValid, setSurnameValid] = React.useState(true);
  const [surnameError, setSurnameError] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [passwordError, setPasswordError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repasswordError, setRepasswordError] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const [repasswordValid, setRepasswordValid] = React.useState(true);
  const [identificationNumberValid, setIdentificationNumberValid] = React.useState(true);
  const [identificationNumberError, setIdentificationNumberError] = React.useState('');
  const [identificationNumber, setIdentificationNumber] = React.useState('');
  const [departmentValid, setDepartmentValid] = React.useState(true);
  const [department, setDepartment] = React.useState('');
  const [departmentError, setDepartmentError] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [companies, setCompanies] = React.useState([]);
  const [companySelected, setCompanySelected] = React.useState(false);
  const [companyError, setCompanyError] = React.useState('');
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
  const handleNameChange = (event) => {
    const name = event.target.value.trim().charAt(0).toUpperCase() + event.target.value.trim().slice(1).toLowerCase()
    setName(name);

    const validateName = () => {
      if (name.trim().length === 0) {
        return 'Name can not be empty';
      }
      const re = /^[A-Za-zğüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(name)) {
        return 'Name should only contain letters';
      }
      if (name.length > 12) {
        return 'Name should not exceed 12 characters';
      }
      return '';
    };

    const errorMessage = validateName();
    setNameError(errorMessage);
    setNameValid(errorMessage === '');
  };

  const handleMiddleChange = (event) => {
    const middleName = event.target.value.trim().charAt(0).toUpperCase() + event.target.value.trim().slice(1).toLowerCase()

    setMiddlename(middleName);

    const validateMiddleName = () => {
      const re = /^[A-Za-zğüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(middleName) && !(middleName.trim().length === 0)) {
        return 'Middle name should only contain letters';
      }
      if (middleName.length > 12) {
        return 'Middle name should not exceed 12 characters';
      }
      return '';
    };

    const errorMessage = validateMiddleName();
    setMiddlenameError(errorMessage);
    setMiddlenameValid(errorMessage === '');
  };

  const handleSurnameChange = (event) => {
    const surname = event.target.value.trim().charAt(0).toUpperCase() + event.target.value.trim().slice(1).toLowerCase()

    setSurname(surname);
    const validateSurname = () => {
      if (surname.trim().length === 0) {
        return 'Surname can not be empty';
      }
      const re = /^[A-Za-zğüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(surname)) {
        return 'Surname should only contain letters';
      }
      if (surname.length > 15) {
        return 'Surname should not exceed 15 characters';
      }
      return '';
    };

    const errorMessage = validateSurname();
    setSurnameError(errorMessage);
    setSurnameValid(errorMessage === '');
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;

    setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailValid(emailRegex.test(email));

    const validateEmail = () => {
      if (email.trim().length === 0) {
        return 'Email can not be empty';
      }

      if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
      }

      if (email.length > 60) {
        return 'Email should not exceed 60 characters';
      }
      return '';
    };

    const errorMessage = validateEmail();
    setEmailError(errorMessage);
    setEmailValid(errorMessage === '');
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;

    setPassword(password);
    const validateSurname = () => {
      if (password.length < 8) {
        return `Password must be at least 8 characters long. Your password characters ${password.length}`;
      }
      if (password.length > 45) {
        return 'Password should not exceed 45 characters';
      }
      return '';
    };

    const errorMessage = validateSurname();
    setPasswordError(errorMessage);
    setPasswordValid(errorMessage === '');
  };

  const handleRepasswordChange = (event) => {
    const repassword = event.target.value;
    setRepassword(repassword);
    const validateRepassword = () => {
      if (!(repassword === document.getElementById('password').value)) {
        return 'Passwords do not match';
      }
      if (password.length > 45) {
        return 'Password should not exceed 45 characters';
      }
      return '';
    };

    const errorMessage = validateRepassword();
    setRepasswordError(errorMessage);
    setRepasswordValid(errorMessage === '');
  };

  const handleIdentificationNumberChange = (event) => {
    const identificationNumber = event.target.value;

    setIdentificationNumber(identificationNumber);

    const validateID = () => {
      const re = /^[0-9]+$/;
      if (!re.test(identificationNumber)) {
        return 'ID number should only contain numbers';
      }
      if (!(identificationNumber.length === 11)) {
        return `ID number must be 11 characters. Your ID characters: ${identificationNumber.length}`;
      }

      return '';
    };

    const errorMessage = validateID();
    setIdentificationNumberError(errorMessage);
    setIdentificationNumberValid(errorMessage === '');
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value.trim().charAt(0).toUpperCase() + event.target.value.trim().slice(1).toLowerCase()

    setDepartment(department);

    const validateDepartment = () => {
      if (department.trim().length === 0) {
        return 'Department can not be empty';
      }
      const re = /^[A-Za-zğüşöçİĞÜŞÖÇ]+$/;
      if (!re.test(department)) {
        return 'Department should only contain letters';
      }
      if (department.length > 25) {
        return 'Department should not exceed 25 characters';
      }
      return '';
    };

    const errorMessage = validateDepartment();
    setDepartmentError(errorMessage);
    setDepartmentValid(errorMessage === '');
  };

  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
    console.log(event.target.value);
    setCompanySelected(true);
    setCompanyError('');
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
      departmentValid &&
      name.length > 0 &&
      middleNameValid &&
      surname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      repassword.length > 0 &&
      identificationNumber.length > 0 &&
      department.length > 0 &&
      companySelected === true
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
        if (response.status === 200) {
          console.log('Successful registration');
          navigate('/register-succesful');
        } else {
          console.log('Registration failed. Status code:', response.status);
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    } else {
      console.log('Form data is invalid');

      const validateName = () => {
        if (name.trim().length === 0) {
          return 'Name can not be empty';
        }

        return '';
      };

      const errorMessageName = validateName();
      setNameError(errorMessageName);
      setNameValid(errorMessageName === '');

      const validateSurname = () => {
        if (surname.trim().length === 0) {
          return 'Surname can not be empty';
        }

        return '';
      };

      const errorMessageSurname = validateSurname();
      setSurnameError(errorMessageSurname);
      setSurnameValid(errorMessageSurname === '');

      const validateEmail = () => {
        if (email.trim().length === 0) {
          return 'Email can not be empty';
        }

        return '';
      };

      const errorMessageEmail = validateEmail();
      setEmailError(errorMessageEmail);
      setEmailValid(errorMessageEmail === '');

      const validatePassword = () => {
        if (password.trim().length === 0) {
          return 'Password can not be empty';
        }

        return '';
      };

      const errorMessagePassword = validatePassword();
      setPasswordError(errorMessagePassword);
      setPasswordValid(errorMessagePassword === '');

      const validateRepassword = () => {
        if (repassword.trim().length === 0) {
          return 'Repassword can not be empty';
        }

        return '';
      };

      const errorMessageRepassword = validateRepassword();
      setRepasswordError(errorMessageRepassword);
      setRepasswordValid(errorMessageRepassword === '');

      const validateID = () => {
        if (identificationNumber.trim().length === 0) {
          return 'ID number can not be empty';
        }

        return '';
      };

      const errorMessageID = validateID();
      setIdentificationNumberError(errorMessageID);
      setIdentificationNumberValid(errorMessageID === '');

      const validateDepartment = () => {
        if (department.trim().length === 0) {
          return 'Department can not be empty';
        }

        return '';
      };

      const errorMessageDepartment = validateDepartment();
      setDepartmentError(errorMessageDepartment);
      setDepartmentValid(errorMessageDepartment === '');

      if (!companySelected) {
        console.log('Please select a company');
        setCompanyError('Please select a company');
      }
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
                    helperText={!nameValid ? nameError : ''}
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
                    autoFocus
                    error={!middleNameValid}
                    helperText={!middleNameValid ? middleNameError : ''}
                    onChange={handleMiddleChange}
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
                helperText={!surnameValid ? surnameError : ''}
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
                helperText={!emailValid ? emailError : ''}
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
                helperText={!passwordValid ? passwordError : ''}
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
                helperText={!repasswordValid ? repasswordError : ''}
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
                helperText={!identificationNumberValid ? identificationNumberError : ''}
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
                helperText={!departmentValid ? departmentError : ''}
                onChange={handleDepartmentChange}
              />
              <FormControl fullWidth margin="normal" error={Boolean(companyError)}>
                <InputLabel id="company-label" error={Boolean(companyError)}>
                  Company
                </InputLabel>
                <Select labelId="company-label" id="company" value={company} onChange={handleCompanyChange}>
                  {companies.map((company) => (
                    <MenuItem key={company.companyId} value={company}>
                      {`${company.companyName} `}
                    </MenuItem>
                  ))}
                </Select>
                {companyError && (
                  <Typography variant="caption" color="error">
                    {companyError}
                  </Typography>
                )}
              </FormControl>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {'Already have an account? Sign in'}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Button href="/registerVisitor" variant="outlined" sx={{ position: 'absolute', top: 15, right: 15 }}>
              Visitor
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
