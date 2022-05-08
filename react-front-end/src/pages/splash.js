import React from "react";
import { Button, Grid, Typography, Container } from "@mui/material/";

export default function Splash() {
  return (
    <div>
      <Container maxWidth="sm" style={{ marginTop: "100px" }}>
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
        <div>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained">Login</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Register</Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
