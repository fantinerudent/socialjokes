import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Favorites = ({handleCheckedFavs}) => {
  // console.log('prooops',props.category);
  
  const labelList = [
    { id: 1, category: `Mom's Jokes` },
    { id: 2, category: `Blond's Jokes` },
    { id: 3, category: `Trump's Jokes` },
    { id: 4, category: `Toto's Jokes` },
  ];
  
  const handleCheck = (value) => {
    handleCheckedFavs(value);
  };

  return labelList.map((element) => (
    <FormControlLabel
      key={element.id}
      control={
        <Checkbox
          label={element.category}
          category={element.category}
          onChange={() => {handleCheck(element.category)}}
          checkedIcon={<Favorite />}
          icon={<FavoriteBorder />}
        />
      }
      label={element.category}
    />
  ));
};

export default Favorites;
