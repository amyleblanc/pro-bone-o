import React, { useEffect, useState } from "react";
import "./listing.css";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axiosRequest from "../helper/axios";
import ResponsiveDialog from "./modal-popup";

/**
 *
 * @param {Object} props object contains axios function details for listing type including url and payload
 * @returns mapped listings object
 */
export default function Listing(props) {
  const [listing, setListing] = useState([]);
  const { url } = props;

  //searchString, sitterListing, startTime, endTime, accepted, archived;

  useEffect(() => {
    axiosRequest(url, "GET", {}).then((res) => setListing(res));
  }, [url]);
  // useEffect(() => {
  //   axiosRequest("/api/listing", "GET").then((res) => setListing(res));
  // });

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
            <ResponsiveDialog
              id={listing.id}
              sitter_listing={listing.sitter_listing}
              user_id={listing.user_id}
              additional_details={listing.additional_details}
              postal_code={listing.postal_code}
              start_time={listing.start_time}
              end_time={listing.end_time}
              pet_id={listing.pet_id}
              activity_type={listing.activity_type}
              pet_name={listing.pets.name}
              pet_photo={listing.pets.photo_url}
            ></ResponsiveDialog>
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
