import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const defaultTheme = createTheme();

export default function SignInSide() {
  const [emailValid, setEmailValid] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [middleName, setMiddlename] = React.useState('');
  const [middleNameValid, setMiddlenameValid] = React.useState(true);
  const [middleNameError, setMiddlenameError] = React.useState('');
  const [nameValid, setNameValid] = React.useState(true);
  const [nameError, setNameError] = React.useState('');
  const [surnameError, setSurnameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [surnameValid, setSurnameValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [passwordError, setPasswordError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repasswordValid, setRepasswordValid] = React.useState(true);
  const [repasswordError, setRepasswordError] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    const email = event.target.value.trim();

    setEmail(email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailValid(emailRegex.test(email));

    const validateEmail = () => {
      if (email.length === 0) {
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

  const handleNameChange = (event) => {
    
    const name = event.target.value.replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g, '').trim() 
    
    setName(name);

    const validateName = () => {

      if (name.length === 0) {
        return 'Name can not be empty';
      }
      
      if (name.length > 12) {
        return 'Name should not exceed 12 characters';
      }
      return '';
    };

    const errorMessage = validateName();
    setNameError(errorMessage);
    setNameValid(errorMessage === '');

    const reg = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
    if ( !reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessage ="Name should only contain letters"
      setNameError(errorMessage);
      setNameValid(errorMessage === '');
      setTimeout(() => {
        const errorMessage = ''
        setNameError(errorMessage);
        setNameValid(errorMessage === '');
      }, 2000);
    }
    
  };

  const handleMiddleChange = (event) => {
    const middleName =
    event.target.value.replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g, '').trim()
    setMiddlename(middleName);

    const validateMiddleName = () => {
      
      if (middleName.length > 12) {
        return 'Middle name should not exceed 12 characters';
      }
      return '';
    };

    const errorMessage = validateMiddleName();
    setMiddlenameError(errorMessage);
    setMiddlenameValid(errorMessage === '');

    const reg = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
    if ( !reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessage ="Middle name should only contain letters"
      setMiddlenameError(errorMessage);
      setMiddlenameValid(errorMessage === '');
      setTimeout(() => {
        const errorMessage = ''
        setMiddlenameError(errorMessage);
        setMiddlenameValid(errorMessage === '');
      }, 2000);
    }
  };

  const handleSurnameChange = (event) => {
    const surname =
    event.target.value.replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ\s]/g, '').trim()
    setSurname(surname);
    const validateSurname = () => {
      if (surname.length === 0) {
        return 'Surname can not be empty';
      }
      const re = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
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

    const reg = /^[A-Za-zığüşöçİĞÜŞÖÇ]+$/;
    if ( !reg.test(event.target.value) && !(event.target.value === '')) {
      const errorMessage ="Surname should only contain letters"
      setSurnameError(errorMessage);
      setSurnameValid(errorMessage === '');
      setTimeout(() => {
        const errorMessage = ''
        setSurnameError(errorMessage);
      setSurnameValid(errorMessage === '');
      }, 2000);
    }
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      emailValid &&
      nameValid &&
      surnameValid &&
      passwordValid &&
      repasswordValid &&
      middleNameValid &&
      email.length > 0 &&
      name.length > 0 &&
      surname.length > 0 &&
      repassword.length > 0
    ) {
      const data = new FormData(event.currentTarget);
      const nameupperlower = data.get('name').trim();
      const formattedName = nameupperlower.charAt(0).toLocaleUpperCase('tr-TR') + nameupperlower.slice(1).toLocaleLowerCase('tr-TR');
      const middlenameupperlower = data.get('middleName').trim();
      const formattedMiddleName = middlenameupperlower.charAt(0).toLocaleUpperCase('tr-TR') + middlenameupperlower.slice(1).toLocaleLowerCase('tr-TR');
      const surnameupperlower = data.get('surname').trim();
      const formattedSurname = surnameupperlower.charAt(0).toLocaleUpperCase('tr-TR') + surnameupperlower.slice(1).toLocaleLowerCase('tr-TR');
      const formData = {
        email: data.get('email'),
        name: formattedName,
        surname: formattedSurname,
        password: data.get('password'),
        repassword: data.get('repassword'),
      };

      axios
        .post('http://localhost:9090/api/v1/auth/register-visitor', formData)
        .then((response) => {
          console.log(response.data);

          if (response.data === true) {
            navigate('/register-succesful');
          } else {
            console.log('İşlem başarısız');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      if (email.trim().length === 0) {
        const validateName = () => {
          if (email.trim().length === 0) {
            return 'Email can not be empty';
          }

          return '';
        };

        const errorMessage = validateName();
        setEmailError(errorMessage);
        setEmailValid(errorMessage === '');
      }

      if (name.trim().length === 0) {
        const validateName = () => {
          if (name.trim().length === 0) {
            return 'Name can not be empty';
          }

          return '';
        };

        const errorMessage = validateName();
        setNameError(errorMessage);
        setNameValid(errorMessage === '');
      }

      if (surname.trim().length === 0) {
        const validateName = () => {
          if (surname.trim().length === 0) {
            return 'Surname can not be empty';
          }

          return '';
        };

        const errorMessage = validateName();
        setSurnameError(errorMessage);
        setSurnameValid(errorMessage === '');
      }

      if (password.trim().length === 0) {
        const validateName = () => {
          if (password.trim().length === 0) {
            return 'Password can not be empty';
          }

          return '';
        };

        const errorMessage = validateName();
        setPasswordError(errorMessage);
        setPasswordValid(errorMessage === '');
      }

      if (repassword.trim().length === 0) {
        const validateName = () => {
          if (repassword.trim().length === 0) {
            return 'Repassword can not be empty';
          }

          return '';
        };

        const errorMessage = validateName();
        setRepasswordError(errorMessage);
        setRepasswordValid(errorMessage === '');
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
            height: '120vh',
            backgroundImage: `url(https://img.freepik.com/free-psd/3d-female-character-holding-tablet-device_23-2148938895.jpg?size=626&ext=jpg&uid=R105010038&ga=GA1.2.1780058954.1685527094)`,
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
                    value={name}
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
                    
                    value={middleName}
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
                
                value={surname}
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
                placeholder="email@address.com"
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

              <Button  type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
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
            <Button href="/registerManager" variant="outlined" sx={{ position: 'absolute', top: 15, right: 15 }}>
              Manager
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
