import React from "react";
import { Button, Grid, Typography, Container } from "@mui/material/";
import './splash.css';
import { ReactComponent as DogSvG } from './img/undraw_good_doggy_-4-wfq.svg';


export default function Splash() {
  return (
    <div className="parent">
      <Container className="mainWrap" maxWidth="sm">
        <div>
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          fontFamily={"Agrandir"}
          gutterBottom
        >
          Connecting Woofers with Walkers
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Find free dog walkers & sitters in your area!
        </Typography>
        </div>
        <div>
          <DogSvG />
        </div>
      </Container>
    </div>
  );
}
