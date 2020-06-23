import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  label: {
    fontStyle: "oblique",
    marginBottom: 10,
    display: "flex",
    paddingLeft: 10,
  },
}));

const Favorites = ({ handleCheckedFavs }) => {
  const classes=useStyles();
  const labelList = [
    { id: 1, category: `Mom's Jokes` },
    { id: 2, category: `Blond's Jokes` },
    { id: 3, category: `Trump's Jokes` },
    { id: 4, category: `Toto's Jokes` },
  ];

  const handleCheck = (value) => {
    handleCheckedFavs(value);
  };

  return (
    <>
      <label className={classes.label}> My favorite kind of jokes are : </label>
      <Box display="flex" flexDirection="row" style={{margin:20}}>
        {labelList.map((element) => (
          <FormControlLabel
            key={element.id}
            control={
              <Checkbox
                label={element.category}
                category={element.category}
                onChange={() => {
                  handleCheck(element.category);
                }}
                checkedIcon={<Favorite />}
                icon={<FavoriteBorder />}
              />
            }
            label={element.category}
          />
        ))}
      </Box>
    </>
  );
};

export default Favorites;
