import React, { useState } from 'react';
import axios from 'axios';

import { TextField, Button, Grid, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const successRegistrationToastMessage = () => {
  toast.success('Your comment has been send !!', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
const errorRegistrationToastMessage = () => {
  toast.error('ERROR!! Your comment could not be send, Please try again !!', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};
const warningRegistrationToastMessage = () => {
  toast.error('ERROR!! Your comment could not be blank !!', {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

const CommentField = () => {
  const [comment, setComment] = useState('');
  const token = sessionStorage.getItem('token');
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment);
    if (comment !== '') {
      console.log(token);
      axios
        .post(`http://localhost:9070/api/v1/comment/personnel-make-comment/${token}`, { comment })
        .then((response) => {
          // Handle successful response
          setComment('');
          console.log('Response:', response.data);
          successRegistrationToastMessage();
        })
        .catch((error) => {
          // Handle error
          setComment('');
          console.error('Error:', error);
          errorRegistrationToastMessage();
        });
    } else {
      warningRegistrationToastMessage();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Paper>
        <TextField
          label="Comment"
          variant="outlined"
          multiline
          rows={4}
          value={comment}
          onChange={handleChange}
          fullWidth
        />{' '}
      </Paper>
      <Grid mt={2} align="right">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            bgcolor: '#ffa726',
            '&:hover': {
              bgcolor: 'grey',
            },
          }}
        >
          {' '}
          Submit{' '}
        </Button>{' '}
        <ToastContainer />
      </Grid>
    </form>
  );
};
export default CommentField;
