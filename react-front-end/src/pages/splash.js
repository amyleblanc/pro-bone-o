import React from "react";
import { Typography, Container, Grid, Box } from "@mui/material/";
import "./splash.css";
// import { ReactComponent as DogSvG } from "./img/undraw_good_doggy_-4-wfq.svg";

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
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Find free dog walkers & sitters in your area!
          </Typography>
        </div>
        <div>
          <Grid container >
            <Grid item xs={12} md={12}>
              <img src="/images/gooddog.png" alt="good dog" style={{maxWidth: "100%", paddingTop: "20px"}} />
            </Grid>
          </Grid>
          {/* <DogSvG sx={{maxWidth: "100%"}}/> */}
        </div>
      </Container>
    </div>
  );
}
