import * as React from 'react';
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

const defaultTheme = createTheme();

export default function SignInSide() {
  const [emailValid, setEmailValid] = React.useState(true);
  const [nameValid, setNameValid] = React.useState(true);
  const [surnameValid, setSurnameValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [repasswordValid, setRepasswordValid] = React.useState(true);

  const handleEmailChange = (event) => {
    const email = event.target.value;
    // Validate email format using a regular expression
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValid && nameValid && surnameValid && passwordValid && repasswordValid) {
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        name: data.get('name'),
        surname: data.get('surname'),
        password: data.get('password'),
        repassword: data.get('repassword'),
      });
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
            <Button href="/registerManager" variant="outlined" sx={{ position: 'absolute', top: 15, right: 15 }}>
              Manager
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
