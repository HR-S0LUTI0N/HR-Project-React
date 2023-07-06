import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';

import PriceBg from '../images/PriceBg.jpg'



const tiers = [
    {
        title: 'Starter',
        price: '30',
        description: [
            '30 Days included',
        ],
        day: 30,
        buttonText: 'Get started',
        buttonVariant: 'outlined',
        color: '#ffa726',
        backgroundColor: 'white',
        borderColor: '#ffa726',
        hoverColor: 'whitesmoke',
        hoverBackgroundColor: '#ffa726',
        hoverBorderColor: '#ffa726'
    },
    {
        title: 'Pro',
        subheader: 'Most popular',
        price: '25',
        description: [
            '60 days included',
        ],
        day: 60,
        buttonText: 'Get started',
        buttonVariant: 'contained',
        color: 'whitesmoke',
        backgroundColor: '#ffa726',
        hoverColor: '#ffa726',
        hoverBackgroundColor: 'white',
        hoverBorderColor: '#ffa726'
    },
    {
        title: 'Enterprise',
        price: '20',
        description: [
            '90 days included',
        ],
        day: 90,
        buttonText: 'Get started',
        buttonVariant: 'outlined',
        color: '#ffa726',
        backgroundColor: 'white',
        borderColor: '#ffa726',
        hoverColor: 'whitesmoke',
        hoverBackgroundColor: '#ffa726',
        hoverBorderColor: '#ffa726'
    },
];



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();



export default function ManagerBuyoutPage() {
    const [day, setDay] = useState(0);
    sessionStorage.setItem('day', 0);
    const navigate = useNavigate();


    useEffect(() => {
        console.log(day)
        if (day !== 30 && day !== 60 && day !== 90) {
            console.log("error")
        } else {
            sessionStorage.setItem('day', day);
            navigate('/registerManager');
        }

    }, [day]);

    return (
        <ThemeProvider theme={defaultTheme}  >
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <Container
                sx={{
                    pt: 2,
                    pb: 6,
                    backgroundPosition: 'center',
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={PriceBg}
                    alt="Background"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.7, // Decrease the image opacity (adjust the value between 0 and 1)
                        objectFit: 'cover',
                        zIndex: -1,
                    }}
                />
                <Container disableGutters maxWidth="sm" component="main" sx={{
                    pt: 8, pb: 6,
                }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Pricing
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p">
                        Your company deserves better and we're providing what you deserve, the very best
                        Check our company membership and innovate your company
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ mt: 2 }}>
                        1 Founder User Included
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p" >
                        Limitless Manager Users Addable
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p" >
                        Limitless Personnel Users Addable
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" component="p" >
                        Visitors Can Examine Your Company At The Main Page
                    </Typography>
                </Container>
                {/* End hero unit */}
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        {tiers.map((tier) => (
                            // Enterprise card is full width at sm breakpoint
                            <Grid
                                item
                                key={tier.title}
                                xs={12}
                                sm={tier.title === 'Enterprise' ? 12 : 6}
                                md={4}

                            >
                                <Card>
                                    <CardHeader
                                        title={tier.title}
                                        subheader={tier.subheader}
                                        titleTypographyProps={{ align: 'center' }}
                                        action={tier.title === 'Pro' ? <StarIcon /> : null}
                                        subheaderTypographyProps={{
                                            align: 'center',
                                        }}
                                        sx={{
                                            backgroundColor: '#ffa726',
                                        }}
                                    />
                                    <CardContent>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'baseline',
                                                mb: 2,
                                            }}
                                        >
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                ${tier.price}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                /mo
                                            </Typography>
                                        </Box>
                                        <ul>
                                            {tier.description.map((line) => (
                                                <Typography
                                                    component="li"
                                                    variant="subtitle1"
                                                    align="center"
                                                    key={line}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            fullWidth
                                            variant={tier.buttonVariant}
                                            onClick={(e) => setDay(tier.day)}
                                            sx={{
                                                color: tier.color || '#ffffff',
                                                backgroundColor: tier.backgroundColor || '#ffa726',
                                                borderColor: tier.borderColor,
                                                '&:hover': {
                                                    backgroundColor: tier.hoverBackgroundColor || '#ff9100',
                                                    color: tier.hoverColor,
                                                    borderColor: tier.hoverBorderColor,
                                                },
                                            }}
                                        >
                                            {tier.buttonText}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: 3, marginLeft: 5 }}>
                            <Grid item>
                                <Link href="/login" variant="body2" textAlign="center">
                                    {'Already have an account? Sign in'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button href="/registerVisitor" variant="outlined" sx={{ position: 'absolute', top: 15, right: 15, width: 90 }}>
                        Visitor
                    </Button>
                </Container>
            </Container>
        </ThemeProvider>
    );
}