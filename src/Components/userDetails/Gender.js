import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  label: {
    fontStyle: "oblique",
    marginBottom: 10,
    marginRight:30,
    display: "flex",
    paddingLeft: 10,
  },
}));

const Gender = ({ handleChangeGender }) => {
  const classes = useStyles();
  // const [gender, setGender] = useState();

  // const handleChange = (event) => {
  //   event.preventDefault();
  //   console.log(event.target.value)
  //   setGender(event.target.value);
  //   handleChangeGender(gender);
  // };

  // const genders = [
  //   { value: "F" },
  //   { value: "M" },
  //   { value: "NB" },
  //   { value: "neutral" },
  // ];

  return (
    <div style={{margin:20, display:'flex'}}>
      {/* <TextField select value={genders} label="Gender" onSelect={handleChange}>
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField> */}
      <label className={classes.label}>
        My gender : </label>
        <TextField
          select
          defaultValue={"DEFAULT"}
          onChange={handleChangeGender}
        >
          <option value="DEFAULT" disabled>
            {" "}
            Select a gender{" "}
          </option>
          <option value="F"> F </option>
          <option value="M"> M</option>
          <option value="NB"> NB </option>
          <option value="neutral"> Neutral </option>
        </TextField>
     
    </div>
  );
};

export default Gender;
