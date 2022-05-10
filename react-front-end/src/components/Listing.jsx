import React, { useEffect, useState } from "react";
import "./Listing.css";
import { Grid } from '@mui/material';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import initMap from "./Map";
const axios = require("axios").default;

export default function Listing() {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const listings = async () => {
      const res = await axios("/api/listing");
      setListing(res.data);
    };
    const listingUser = async () => {
      const params = listings.id;
      const res = await axios.get("/api/users/", { params });
      setListing(res.data);
    };
    listings();
    console.log(listingUser());
  }, []);

  const useListing = listing.map((listing) => {
    console.log(listing);
    return (
      <Grid container justifyContent="space-around">
      <Card
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
          maxWidth: 345,
          // ml: 30,
          mt: 5,
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={listing.pets.photo_url}
          // "/static/images/cards/contemplative-reptile.jpg"
          alt="Sitter Or Dog"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {listing.activity_type} - {listing.pets.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {listing.additional_details}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Apply</Button>
        </CardActions>
      </Card>
      {/* <initMap /> */}
      </Grid>
    );
  });

  return (
    <main>
      <section>
        <div>
          <h1>Current Listings</h1>
          <div className="container">{listing && useListing}</div>
        </div>
      </section>
    </main>
  );
}
