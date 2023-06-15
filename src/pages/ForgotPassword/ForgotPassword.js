import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
// hooks


// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Typography, IconButton, Stack, TextField, Box } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';

// sections

// @mui

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
export default function ForgotPassword() {
  const mdUp = useResponsive('up', 'md');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Lütfen geçerli bir email adresi girin.', {
        autoClose: 2000,
      });
      return;
    }

    axios
      .get(`http://localhost:9090/api/v1/auth/forgot-password-request/${email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success('Mail gönderimi başarılı...', {
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })


    setSubmitted(true);
  };

  if (submitted) {
    return <Navigate to="/forgotpasswordsuccesful" replace />;
  }



  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Welcome Back
            </Typography>
            <img
              src="https://img.freepik.com/free-psd/3d-female-character-working-laptop-while-sitting-chair_23-2148938889.jpg?w=740&t=st=1686328918~exp=1686329518~hmac=71f64deb539d96cf4dc76acf4ea4ffb326fdc954db311619dc03a8fd5a665cb0"
              alt="login"
            />
          </StyledSection>
        )}

        <StyledContent>
          <Typography variant="h4" gutterBottom style={{ marginLeft: '110px' }}>
            Forgot Password !
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            Enter your email and we'll send you a link to reset your password. {''}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Stack spacing={1}>
              <ToastContainer />
              <TextField id="email" name="email" label="Email address" />
            </Stack>

            <Grid sx={{ my: 4 }}>
              <LoadingButton fullWidth size="large" type="submit" variant="contained">
                Submit
              </LoadingButton>

              <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton href="/login">
                    <NavigateBeforeIcon />
                  </IconButton>
                  <Link href="/login" variant="subtitle2" underline="hover">
                    Back to Login
                  </Link>

                </Box>
              </Stack>
            </Grid>
          </Box>
        </StyledContent>
      </StyledRoot>
    </>
  );
}