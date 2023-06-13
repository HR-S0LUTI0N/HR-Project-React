import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const CommentField = () => {
  const [comment, setComment] = useState('');
  const handleChange = (event) => {
    setComment(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(comment);

    setComment('');
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
