import React, { useState } from 'react';
import axios from 'axios';

import { TextField, Button, Grid } from '@mui/material';

const CommentField = () => {
  const [comment, setComment] = useState('');
  const token = sessionStorage.getItem('token');
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment);
    if (comment !== "") {
      console.log(token)
      axios.post(`http://localhost:9070/api/v1/comment/personnel-make-comment/${token}`, { comment })
        .then((response) => {
          // Handle successful response
          setComment('')
          console.log('Response:', response.data);
        })
        .catch((error) => {
          // Handle error
          setComment('')
          console.error('Error:', error);
        });

    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid>
        <TextField
          label="Comment"
          variant="outlined"
          multiline
          rows={4}
          value={comment}
          onChange={handleChange}
          fullWidth
        />{' '}
      </Grid>
      <Grid mt={2} align="right">
        <Button variant="contained" color="primary" type="submit" sx={{
          bgcolor: "#ffa726", '&:hover': {
            bgcolor: 'grey',
          },
        }}>
          {' '}
          Submit{' '}
        </Button>{' '}
      </Grid>

    </form>
  );
};
export default CommentField;
