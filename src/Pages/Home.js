import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import KanyeQuote from "../Components/KanyeQuote";
import ChuckNorrisFact from "../Components/ChuckNorrisFacts";

const useStyles = makeStyles({
  root: {
  }
});

const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1> HOME </h1>
      <p> Cliquez sur login en haut à droit pour vous connecter</p>
      <KanyeQuote/>
      <ChuckNorrisFact/>
    </div>
  );
};

export default Home;
