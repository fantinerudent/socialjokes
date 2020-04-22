import React from 'react';
import TextField from "@material-ui/core/TextField";


const Description = ({handleChangeDescription}) => {
    return (   
        <>
        <TextField
        id="outlined-multiline-static"
        multiline
        rows="4"
        variant="outlined"
        label="Description"
        onBlur={handleChangeDescription}
      />
      </> );
}
 
export default Description;