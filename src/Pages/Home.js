import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import KanyeQuote from "../Components/KanyeQuote";
import ChuckNorrisFact from "../Components/ChuckNorrisFacts";
import Img from '../img/fourire.jpg';

const useStyles = makeStyles({
  title: {
    fontSize: '3em',
    textAlign: 'center',
  },
  img: {
    height:"60%",
    width:"100%",
    position:"relative",
    top:20,
    opacity:0.7,
    borderRadius:30
  }
});



const Home = () => {
  const classes = useStyles();
  return (
    <div>
      {/* <h1 className={classes.title}> HOME </h1> */}
      <img className={classes.img} src={Img} alt="someone laughing" />
      {/* <KanyeQuote/> */}
      {/* <ChuckNorrisFact/> */}
    </div>
  );
};

export default Home;

