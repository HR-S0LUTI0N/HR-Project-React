import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Lütfen geçerli bir email adresi girin.', {
        autoClose: 2000,
      });
      return;
    }

    if (email.length > 20) {
      toast.error('Email adresi maksimum 20 karakter olmalıdır.', {
        autoClose: 2000,
      });
      return;
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*!])(?=\S+$).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error('Mail adresi ve şifreniz eşleşmemektedir.', { autoClose: 3000 });
      return;
    }

    fetch('http://localhost:9090/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.get('email'),
        password: data.get('password'),
      }),
    })
      .then((data) => {
        if (data.ok) {
          return data.json;
        }
        throw new Error('Giriş Başarısız');
      })
      .then((data) => {
        console.log(data);
        navigate('/dashboard'); // Homepage'a yönlendir
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
        <TextField id="email" name="email" label="Email address" />

        <TextField
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
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
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
    </Box>
  );
}
