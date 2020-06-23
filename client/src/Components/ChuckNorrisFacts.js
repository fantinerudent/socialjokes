import React, { Component } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class ChuckNorrisFact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: ""
    };
  }

  componentDidMount() {
    axios.get("https://api.chucknorris.io/jokes/random").then(res => {
      this.setState({ quote: res.data.value });
    });
  }

  render() {
    return (
      <Card variant="outlined" style={{ width: "fit-content", margin: "20px" }}>
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            And one Chuck Norris's fact you probably didn't know :
          </Typography>
          <Typography color="textSecondary">{this.state.quote}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ChuckNorrisFact;
