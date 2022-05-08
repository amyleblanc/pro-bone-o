import React from "react";
import {
  AppBar,
  Button,
  Grid,
  Toolbar,
  Typography,
  Container,
} from "@material-ui/core";

import ListingForm from "./components/form";

import CssBaseline from "@mui/material/CssBaseline";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import useStyles from "./styles/ApplicationStyles";

export default function Application() {
  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <img src="/images/pro-bone-o_logo.png" className={styles.icon} />
        </Toolbar>
      </AppBar>
      <main>
        <div className={styles.container}>
          <Container maxWidth="sm" style={{ marginTop: "100px" }}>
            <Typography
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Pro-Bone-O
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Find free dog walkers & sitters in your area!
            </Typography>
            <div className={styles.buttonContainer}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button className={styles.loginButton} variant="contained">
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={styles.registerButton} variant="outlined">
                    Register
                  </Button>
                </Grid>
                <ListingForm></ListingForm>
              </Grid>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
