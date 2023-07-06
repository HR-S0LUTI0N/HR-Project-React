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
import Logo from '../../../images/Logo_HR.png';
import UserProfileVisitor from './userprofile-visitor';

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
  });
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };
  const handleUserProfile = () => {
    navigate('/userprofile-visitor');
  };

  React.useEffect(() => {
    if (token === null) {
      navigate('/404');
    } else if (!roles.includes('VISITOR')) {
      navigate('/404');
    }
    axios
      .get(`http://localhost:9080/api/v1/user-profile/get-userprofile-avatar-and-name/${token}`)
      .then((response) => {
        const data = response.data;
        setProfile(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <AppBar position="static">
      <Container
        maxWidth
        sx={{
          height: 90,
        }}
      >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Button href="/visitor">
              <img src={Logo} alt="Logo HR" height={90} />
            </Button>
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

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 4 }}>
                <Avatar
                  alt={profile.name ? 'C' : profile.name}
                  src={profile.avatar}
                  sx={{ width: 45, height: 45, bgcolor: '#B7B7B7' }}
                />
              </IconButton>
            </Tooltip>
            <Menu
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
              <MenuItem onClick={handleUserProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
