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
                <title> Dashboard </title>
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
                            A Little More Patience
                        </Typography>
                        <img
                            src="https://img.freepik.com/free-psd/3d-female-character-checking-time-while-sitting-airport_23-2148938906.jpg?w=826&t=st=1687461542~exp=1687462142~hmac=ee05786ba565a50187f3f103af0d8957ef77d3f3b574611a664a9d94bcef1baa"
                            alt="waiting girl"
                        />
                    </StyledSection>
                )}

                <StyledContent>


                    <Typography variant="h4" gutterBottom style={{ marginLeft: '100px', textAlign: 'center' }}>
                        WAIT FOR OUR MAIL!
                    </Typography>

                    <Typography variant="body2" gutterBottom style={{ marginLeft: '100px', textAlign: 'center' }}>
                        We are reviewing the information you have provided. You will be contacted by the mail after a quick check.
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