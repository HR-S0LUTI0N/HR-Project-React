import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// mocks_

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:home-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const token = sessionStorage.getItem('token');
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9080/api/v1/user-profile/get-userprofile-avatar-and-name-and-surname/${token}`, {
          method: 'GET',
        });
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {

    setOpen(null);
  };

  const handleProfile = () => {
    navigate("/personnel/userprofile")
    setOpen(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={userData.avatar} alt="photoURL" />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${userData.name} ${userData.middleName === null ? '' : userData.middleName} ${userData.surname === null ? '' : userData.surname
              }`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userData.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleProfile}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
