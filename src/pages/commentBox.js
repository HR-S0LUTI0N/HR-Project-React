import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

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
      {' '}
      <TextField
        label="Comment"
        variant="outlined"
        multiline
        rows={4}
        value={comment}
        onChange={handleChange}
        fullWidth
      />{' '}
      <Button variant="contained" color="primary" type="submit">
        {' '}
        Submit{' '}
      </Button>{' '}
    </form>
  );
};
export default CommentField;
