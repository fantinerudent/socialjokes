import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const Gender = ({handleChangeGender}) => {
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
    <>
      {/* <TextField select value={genders} label="Gender" onSelect={handleChange}>
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField> */}
      <TextField select defaultValue={'DEFAULT'} label='gender' onChange={handleChangeGender}>
        <option value="DEFAULT" disabled> Select a gender </option>
        <option value="F"> F </option>
        <option value='M'> M</option>
        <option value='NB'> NB </option>
        <option value='neutral'> Neutral </option>
      </TextField>
    </>
  );
};

export default Gender;
