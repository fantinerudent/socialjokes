import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  label: {
    fontStyle: "oblique",
    marginBottom: 10,
    display: "flex",
    paddingLeft: 10,
  },
}));

const Age = ({ handleChangeAge }) => {
  const classes = useStyles();
  return (
    <div style={{margin:20}}>
      <label className={classes.label}>
        {" "}
        My age:
        <TextField type="number" label="Age" onChange={handleChangeAge} />
      </label>
    </div>
  );
};

export default Age;
