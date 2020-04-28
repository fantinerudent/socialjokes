import React from "react";
import TextField from "@material-ui/core/TextField";
// label: {
//   fontStyle: "oblique",
//   marginBottom: 10,
//   display: "table-caption",
//   paddingLeft: 10,
// },
const Age = ({ handleChangeAge }) => {
  return (
    <label> My age: 
      <TextField type="number" label="Age" onChange={handleChangeAge} />
    </label>
  );
};

export default Age;
