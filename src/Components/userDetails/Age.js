import React from "react";
import TextField from "@material-ui/core/TextField";

const Age = ({handleChangeAge}) => {
  return (
    <>
      <TextField type="number" label="Age" onChange={handleChangeAge} />
    </>
  );
};

export default Age;
