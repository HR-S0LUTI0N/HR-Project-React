import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';


function Overview() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('Alec');
  const [middleName, setMiddleName] = useState('Micheal');
  const [surname, setSurname] = useState('Thompson');
  const [telephone, setTelephone] = useState('(44) 123 1234 123');
  const [email, setEmail] = useState('alecthompson@mail.com');
  const navigate = useNavigate();


  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleTelephoneChange = (e) => {
    setTelephone(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('roles');


  React.useEffect(() => {
    if (token == null) {
      navigate('/404')
    } else if (!roles.includes('PERSONEL')) {
      navigate('/404');
    }
  }, [])


  return (
    <section style={{ padding: '30px', marginLeft: 0, marginRight: 0 }}>
      <Avatar
        alt="Remy Sharp"
        src="https://img.freepik.com/free-psd/3d-female-character-working-desk-with-laptop_23-2148938896.jpg?size=626&ext=jpg&uid=R105010038&ga=GA1.2.1780058954.1685527094"
        sx={{ width: 100, height: 100 }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '8px', position: 'relative' }}>
              <EditIcon
                style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}
                onClick={handleEditClick}
              />
              <h3>Profile Information</h3>
              {isEditMode ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input type="text" value={name} onChange={handleNameChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input type="text" value={middleName} onChange={handleMiddleNameChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input type="text" value={surname} onChange={handleSurnameChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input type="text" value={telephone} onChange={handleTelephoneChange} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input type="text" value={email} onChange={handleEmailChange} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>Name: {name}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>MiddleName: {middleName}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>Surname: {surname}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>Mobile: {telephone}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>Email: {email}</p>
                    <p>Location: USA</p>
                  </div>
                </>
              )}
              <div>
                <a href="https://www.facebook.com/CreativeTim/" style={{ marginRight: '10px' }}>
                  <FacebookIcon /> Facebook
                </a>
                <a href="https://twitter.com/creativetim" style={{ marginRight: '10px' }}>
                  <TwitterIcon /> Twitter
                </a>
                <a href="https://www.instagram.com/creativetimofficial/">
                  <InstagramIcon /> Instagram
                </a>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '8px', position: 'relative' }}>
              <h3>Address Information</h3>
              <div>
                <p>Neighbourhood: Alec M. Thompson</p>
                <p>District: (44) 123 1234 123</p>
                <p>Province: alecthompson@mail.com</p>
                <p>Country: USA</p>
                <p>Building Number: USA</p>
                <p>Apartment Number: USA</p>
                <p>Postal Code: USA</p>
              </div>
              <div>
                <a href="https://www.facebook.com/CreativeTim/" style={{ marginRight: '10px' }}>
                  <FacebookIcon /> Facebook
                </a>
                <a href="https://twitter.com/creativetim" style={{ marginRight: '10px' }}>
                  <TwitterIcon /> Twitter
                </a>
                <a href="https://www.instagram.com/creativetimofficial/">
                  <InstagramIcon /> Instagram
                </a>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} sx={{ margin: 0 }}>
            <div style={{ background: '#f7f7f7', padding: '20px', borderRadius: '8px', position: 'relative' }}>
              <h3>Company Information</h3>
              <div>
                <p>Neighbourhood: Alec M. Thompson</p>
                <p>District: (44) 123 1234 123</p>
                <p>Province: alecthompson@mail.com</p>
                <p>Country: USA</p>
                <p>Building Number: USA</p>
                <p>Apartment Number: USA</p>
                <p>Postal Code: USA</p>
              </div>
              <div>
                <a href="https://www.facebook.com/CreativeTim/" style={{ marginRight: '10px' }}>
                  <FacebookIcon /> Facebook
                </a>
                <a href="https://twitter.com/creativetim" style={{ marginRight: '10px' }}>
                  <TwitterIcon /> Twitter
                </a>
                <a href="https://www.instagram.com/creativetimofficial/">
                  <InstagramIcon /> Instagram
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
}

export default Overview;
