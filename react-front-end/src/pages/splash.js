import React from "react";
import { Button, Grid, Typography, Container } from "@mui/material/";
import { Link } from "react-router-dom";

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
              <Link style={{ textDecoration: "none" }} to={"/login"}>
                <Button variant="contained">Login</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link style={{ textDecoration: "none" }} to={"/register"}>
                <Button variant="outlined">Register</Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
