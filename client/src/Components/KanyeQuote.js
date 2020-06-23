import React, { Component } from "react";
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class KanyeQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
    };
  }

  componentDidMount() {
    axios.get("https://api.kanye.rest").then(res => {
      this.setState({ quote: res.data.quote });
    });
}


  render() {
    
    return (
    <Card  variant="outlined" style={{width: "fit-content"}}>
      <CardContent>
        <Typography  color="textPrimary" gutterBottom>
             Kanye West would say : 
        </Typography>
        <Typography  color="textSecondary">
        {this.state.quote}
        </Typography>
      </CardContent>
    </Card>
    );
  }
}

export default KanyeQuote;
