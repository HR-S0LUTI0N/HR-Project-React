import { Helmet } from 'react-helmet-async';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// hooks

// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Typography, IconButton, Stack, Box } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SvgContainer from './SvgContainer';
import MailSendingAnimation from './mailsender';
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/logo';
import ForgotPasswordCelebrating from '../../images/ForgotPasswordCelebrating.jpg'

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
export default function ForgotPasswordSuccesful() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();







  };

  const mdUp = useResponsive('up', 'md');

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
            <Typography variant="h3" sx={{ px: 5, mt: 11, mb: 5 }}>
              Welcome Back
            </Typography>
            <img
              src={ForgotPasswordCelebrating}
              alt="login"
            />
          </StyledSection>
        )}

        <StyledContent>
          <Grid style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '40px' }}>
            <MailSendingAnimation />
          </Grid>

          <Typography variant="h4" gutterBottom style={{ marginLeft: '80px' }}>
            Your Mail Sent Successfully!
          </Typography>

          <Typography variant="body2" gutterBottom style={{ marginLeft: '80px' }}>
            An email for password reset has been sent. Please check your email.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

            <Grid sx={{ my: 3 }}>
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