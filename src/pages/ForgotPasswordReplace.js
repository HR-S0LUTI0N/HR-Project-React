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
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const defaultTheme = createTheme();

export default function ForgotPasswordReplace() {
    const [passwordValid, setPasswordValid] = React.useState(true);
    const [passwordError, setPasswordError] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repasswordError, setRepasswordError] = React.useState('');
    const [repassword, setRepassword] = React.useState('');
    const [repasswordValid, setRepasswordValid] = React.useState(true);
    const url = window.location.href;
    const parts = url.split("/");
    const token = parts[parts.length - 1]

    const navigate = useNavigate();

    const successToastMessage = () => {
        toast.success('Password Change successfull !!', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };
    const errorToastMessage = () => {
        toast.error('ERROR!! Password could not be changed, Please try again !!', {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
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



    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(token);
        if (
            passwordValid &&
            repasswordValid &&
            password.length > 0 &&
            repassword.length > 0
        ) {
            const formData = {
                password: event.target.password.value,
                repassword: event.target.repassword.value,
            };
            console.log('Form Data:', formData);
            await axios.post(`http://localhost:9090/api/v1/auth/forgot-password/${token}`, formData)
                .then((response) => {
                    console.log('Success: ', response.data)
                    successToastMessage();
                    navigate("/forgotpassword-notification")
                })
                .catch((error) => {
                    errorToastMessage();
                    console.error('Error:', error);
                })
        } else {
            errorToastMessage();
            console.log('Form data is invalid');
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
                        backgroundImage: `url(https://img.freepik.com/free-psd/3d-female-character-with-question-marks_23-2148938890.jpg?w=826&t=st=1688081987~exp=1688082587~hmac=fa1a7636926ed62129e08fc24e8294803acc13df96011c897bf202ebdc7ee0f8)`,
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
                            <QuestionMarkIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Change Password
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>


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

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Submit
                            </Button>
                            <ToastContainer />
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {'Already have an account? Sign in'}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>

                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
