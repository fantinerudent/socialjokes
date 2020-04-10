import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const Gender = () => {
  const [gender, setGender] = useState();

  const handleChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };

  const genders = [
    { value: "F" },
    { value: "M" },
    { value: "NB" },
    { value: "neutral" },
  ];

  return (
    <>
      <TextField select value={genders} label="Gender" onChange={handleChange}>
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>{" "}
    </>
  );
};

export default Gender;
