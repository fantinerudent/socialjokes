import React from 'react';
import TextField from "@material-ui/core/TextField";


const Description = () => {
    return (   
        <>
        <TextField
        id="outlined-multiline-static"
        multiline
        rows="4"
        variant="outlined"
        label="Description"
      />
      </> );
}
 
export default Description;