import { Helmet } from 'react-helmet-async';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// hooks

// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Typography, IconButton, Stack, Box } from '@mui/material';
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
                            src="https://img.freepik.com/free-psd/3d-female-character-with-superhero-cape-launching-into-flight_23-2148938887.jpg?w=826&t=st=1687451621~exp=1687452221~hmac=b5800d8ef3214963ea8dee169942ed25f4b9e9e5e46c81d1f02de7fe18f28aff"
                            alt="login"
                        />
                    </StyledSection>
                )}

                <StyledContent>
                    <Grid style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '0px' }}>
                        <SvgContainer />
                    </Grid>

                    <Typography variant="h4" gutterBottom style={{ marginLeft: '100px', textAlign: 'center' }}>
                        YOUR PASSWORD SUCCESFULL CHANGED!
                    </Typography>

                    <Typography variant="body2" gutterBottom style={{ marginLeft: '100px', textAlign: 'center' }}>
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