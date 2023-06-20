import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import CompanyCard from '../components/CompanyCard'


const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {

  const [companyList, setCompanyList] = React.useState([])
  const [search, setSeach] = useState("")
  const [searchedCompanyList, setSearchedCompanyList] = React.useState([])
  const token = sessionStorage.getItem('token');


  React.useEffect(() => {
    fetch('http://localhost:9070/api/v1/company/find-all-company-preview-information', {
      method: 'GET',
    }).then(data => data.json())
      .then(data => {
        setCompanyList(data);
        setSearchedCompanyList(data);
      });
  }, [])


  const handleInput = (e) => {
    setSeach(e.target.value);
  }

  React.useEffect(() => {
    setSearchedCompanyList(filteredCompany);
  }, [search])

  const filteredCompany = companyList.filter((item) =>
    item.companyName.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  return (
    <>
      <Box
        component="section"
        sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
      >
        <Container sx={{ mt: 10, mb: 30, display: 'flex', position: 'relative' }}>
          <Box sx={{ width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TextField fullWidth label="Search For Company" id="fullWidth" sx={{
                mb: 10, width: 1 / 2, display: 'block'
              }} onChange={handleInput} />
            </div>
            <Grid container spacing={5} sx={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                searchedCompanyList.map((company) => (
                  <Grid item key={company.companyId} xs={12} md={4} sx={{}} >
                    <CompanyCard item={company} key={company.companyId} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );







}

export default ProductValues;
