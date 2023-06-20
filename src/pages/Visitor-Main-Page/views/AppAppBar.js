import * as React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const settings = ['Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({
    avatar: '',
  })
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');


  React.useEffect(() => {
    if (token == null) {
      navigate('/404')
    } else if (!roles.includes('VISITOR')) {
      navigate('/404');
    }
    axios.get(`http://localhost:9080/api/v1/user-profile/get-userprofile-avatar-and-name/${token}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        const data = response.data;
        setProfile(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])

  return (
    <AppBar position="static">
      <Container maxWidth sx={{
        mt: 2,
        height: 80
      }}>
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Button href="/visitor">
              <AccessibilityNewIcon sx={{ display: { xs: 'none', md: 'flex', width: 56, height: 56, color: '#ffa726' }, mr: 1 }} />
            </Button>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/visitor"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HR SOLUTIONS
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-end' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'flex-start' } }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 4 }}>
                <Avatar alt={profile.name ? "C" : profile.name} src={profile.avatar} sx={{ width: 56, height: 56, bgcolor: '#ffa726' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
