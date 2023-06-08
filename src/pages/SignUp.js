import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'© Copyright   '}
      <Link color="inherit" href="https://github.com/orgs/ProjectHR-EMEA/repositories">
        EMEA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get('firstName');
    const surname = data.get('lastName');
    const password = data.get('password');
    const repassword = data.get('repassword');
    const email = data.get('email');

    if (name.length > 20) {
      toast.error('İsim maksimum 20 karakter olmalıdır.', { autoClose: 2000 });
      return;
    }

    if (surname.length > 20) {
      toast.error('Soyisim maksimum 20 karakter olmalıdır.', { autoClose: 2000 });
      return;
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Lütfen geçerli bir email adresi girin.', { autoClose: 2000 });
      return;
    }

    if (email.length > 20) {
      toast.error('Email adresi maksimum 20 karakter olmalıdır.', { autoClose: 2000 });
      return;
    }

    if (password !== repassword) {
      toast.error('Şifreler eşleşmiyor.', { autoClose: 2000 });
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*!])(?=\S+$).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter içermelidir.',
        { autoClose: 5000 }
      );
      return;
    }

    fetch('http://localhost:8060/api/v1/auth/register-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.get('firstName'),
        surname: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password'),
        repassword: data.get('repassword'),
      }),
    })
      .then((response) => {
        if (response.ok) {
          navigate('/login'); // Kayıt başarılıysa login sayfasına yönlendir
        } else {
          throw new Error('Kayit başarisiz'); // İstek başarısızsa hata fırlat
        }
      })
      .catch((error) => {
        toast.error('Kayıt başarısız.Lütfen daha sonra deneyiniz...', { autoClose: 5000 });
        console.error(error);
      });

    console.log({
      name: data.get('firstName'),
      surname: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      repassword: data.get('repassword'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Enter Password Again"
                  type="password"
                  id="repassword"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <ToastContainer />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
              <Grid item>
                <Link href="/registercompany" variant="body2">
                  Are you a Company Manager? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
