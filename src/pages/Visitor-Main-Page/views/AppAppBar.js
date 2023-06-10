import * as React from 'react';
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
  const token = localStorage.getItem('token');


  React.useEffect(() => {
    if (token != null) {
      axios.get(`http://localhost:9080/api/v1/user-profile/get-profile-avatar/${token}`, {
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
    }
  }, [])


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
