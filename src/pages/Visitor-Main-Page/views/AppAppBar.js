import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';



function AppAppBar() {

  const [profile, setProfile] = React.useState({
    avatar: '',
  })
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles')
  const navigate = useNavigate();


  React.useEffect(() => {
    // Fetch roles from token
    if (token == null) {
      navigate('/404')
    } else if (!roles.includes('VISITOR')) {
      navigate('/404');
    }
    // Fetch profile avatar
    axios
      .get(`http://localhost:9080/api/v1/user-profile/get-profile-avatar/${token}`, {
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
  }, []);


  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/visitor"
            sx={{ fontSize: 24 }}
          >
            {'HR SOLUTIONS'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Avatar sx={{ bgcolor: "#ffa726" }}
              src={profile === undefined
                ? undefined
                : "profile.avatar"} />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
