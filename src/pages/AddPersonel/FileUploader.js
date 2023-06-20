import React from 'react';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import styled from 'styled-components';

// Style the Button component

const FileUploader = props => {
    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
    };
    return (
        <>
            <Button onClick={handleClick} type="submit"
                variant="contained"
                style={{ maxWidth: 140, minWidth: 140 }}
                sx={{
                    borderRadius: 2,
                    padding: 1,
                    mt: 1,
                    bgcolor: "#ffa726", '&:hover': {
                        bgcolor: 'grey',
                    },
                }}>
                <Add /> Save Avatar
            </Button>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
            />
        </>
    );
}
export default FileUploader;