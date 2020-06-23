import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    fontStyle: "oblique",
    marginBottom: 10,
    display: "table-caption",
    paddingLeft: 10,
  },
  userData: {
    fontWeight: "bolder",
    border: 'solid 2px #bbdefb',
    backgroundColor: "white",
    borderRadius: 7,
    padding: 5,
    textAlign: "center",
    margin: 8,
    paddingRight: "7px",
  }
}));

const Description = ({ handleChangeDescription }) => {
  const classes = useStyles();
  return (
    <label className={classes.label}>
      A short description of myself :
      <textarea
        className={classes.userData}
        id="outlined-multiline-static"
        multiline
        rows="4"
        variant="outlined"
        label="Description"
        onBlur={handleChangeDescription}
      ></textarea>
    </label>
  );
};

export default Description;
