import React from "react";
import Listing from "./components/listing";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import { 
  Button,
  Grid,
  Toolbar,
  Typography,
  Container
} from "@material-ui/core";

import CssBaseline from '@mui/material/CssBaseline';

import useStyles from "./styles/ApplicationStyles";

import ResponsiveAppBar from "./components/Navbar";

export default function Application() {
  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <ResponsiveAppBar />
      <main>
        <div className={styles.container}>
          <Container maxWidth="sm" style={{ marginTop: '100px'}}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Pro-Bone-O
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
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
                  <Button className={styles.registerButton}  variant="outlined">
                    Register
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <BrowserRouter>
        <Routes>
            <Route path='/listing' element={<Listing/>} />
        </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}