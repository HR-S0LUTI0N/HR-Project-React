import { Helmet } from 'react-helmet-async';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// hooks

// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Typography, IconButton, Stack,  Box } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SvgContainer from './ForgotPassword/SvgContainer';
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';

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
export default function RegisterSuccesful() {
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
              src="https://img.freepik.com/free-psd/3d-female-character-celebrating-with-party-hat-confetti_23-2148938904.jpg?w=826&t=st=1686740682~exp=1686741282~hmac=d007c31775e7f61bb6e88f720db5b90586e238ab8d763a39b6a1c76dc49a3ac8"
              alt="login"
            />
          </StyledSection>
        )}

        <StyledContent>
          <Grid style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '0px' }}>
            <SvgContainer />
          </Grid>

          <Typography variant="h4" gutterBottom style={{ marginLeft: '100px' }}>
                REGISTRATION SUCCESS!
          </Typography>

          <Typography variant="body2" gutterBottom style={{ marginLeft: '100px' }}>
           Your account has been succesfully created. 
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