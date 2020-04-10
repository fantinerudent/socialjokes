import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Favorites = () => {
  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="moms"
          />
        }
        label="Mom's jokes"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="totos"
          />
        }
        label="Toto's jokes"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="trump"
          />
        }
        label="Trump's jokes"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            name="blonds"
          />
        }
        label="Blonds's jokes"
      />
    </div>
  );
};

export default Favorites;
