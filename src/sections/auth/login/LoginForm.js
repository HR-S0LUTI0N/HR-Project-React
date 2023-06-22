import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import Iconify from '../../../components/iconify';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan kullanıcı bilgilerini alıyoruz.
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail && storedPassword) {
      setEmail(storedEmail);
      setPassword(storedPassword);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const enteredEmail = data.get('email');
    const enteredPassword = data.get('password');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
      toast.error('Lütfen geçerli bir email adresi girin.', {
        autoClose: 2000,
      });
      return;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*!])(?=\S+$).{8,}$/;
    if (!passwordRegex.test(enteredPassword)) {
      toast.error('Mail adresi ve şifreniz eşleşmemektedir.', { autoClose: 3000 });
      return;
    }

    fetch('http://localhost:9090/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error('Giriş Başarısız');
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('roles', data.roles);

        if (rememberMe) {
          localStorage.setItem('email', enteredEmail);
          localStorage.setItem('password', enteredPassword);
        } else {
          localStorage.removeItem('email');
          localStorage.removeItem('password');
        }

        if (data.roles.includes('VISITOR')) {
          navigate('/visitor');
        } else if (data.roles.includes('MANAGER')) {
          navigate('/dashboard/app');
        } else if (data.roles.includes('PERSONEL')) {
          navigate('/dashboard/app');
        } else if (data.roles.includes('ADMIN')) {
          navigate('/dashboard/admin');
        } else {
          toast.error('Giriş yapamadın. Şifre ve Mail eşleşmiyor');
        }
      })
      .catch((error) => {
        toast.error('Giriş işlemi başarısız. Lütfen tekrar deneyiniz..', {
          autoClose: 3000,
        });
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Stack spacing={3}>
        <ToastContainer />
        <TextField
          id="email"
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Typography variant="subtitle2" marginLeft={1}>
          <Checkbox
            name="remember"
            label="Remember me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember me
        </Typography>
        <Link href="/forgotpassword" variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </Box>
  );
}
