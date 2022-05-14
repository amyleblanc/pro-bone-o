import React from "react";
import { Button, Grid, Typography, Container } from "@mui/material/";
import { Link } from "react-router-dom";
import { ReactComponent as DogSvG } from './img/undraw_good_doggy_-4-wfq.svg';


export default function Splash() {
  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "50px"}}>
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Pro-Bone-O
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Find free dog walkers & sitters in your area!
        </Typography>
          <DogSvG />
      </Container>
    </div>
  );
}
