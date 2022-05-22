import React, { useEffect, useState } from "react";
import "./listing.css";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ResponsiveDialog from "./modal-popup";
import axios from "axios";
import moment from "moment";
import { useRecoilValue } from "recoil";
import userState from "./atoms";
import ResponsiveApplications from "./modal-applications";

/**
 *
 * @param {Object} props object contains axios function details for listing type including url and payload
 * @returns mapped listings object
 */
export default function Listing(props) {
  const [listing, setListing] = useState([]);
  const { url, payload, type, direction } = props;
  const user = useRecoilValue(userState);

  useEffect(() => {
    const getSearch = async () => {
      const res = await axios
        .post(url, payload)
        .then((res) => setListing(res.data));
    };
    getSearch();
  }, [url, payload]);

  useEffect(() => {
    const getSearch = async () => {
      if (type === "GET") {
        const res = await axios.get(url).then((res) => setListing(res.data));
      } else {
        const res = await axios
          .post(url, payload)
          .then((res) => setListing(res.data));
      }
    };
    getSearch();
  }, [url, payload, type]);

  // useEffect(() => {
  //   // const getSearch = async () => {
  //   axiosRequest(url, type, payload).then((res) =>
  //     console.log("this is test", res.data)
  //   ); //setListing(res.data));
  //   // };
  //   // getSearch();
  // }, [url, type, payload]);

  const useListing = listing?.map((listing) => {
    console.log("testing", listing);
    let confirmedBooking = 0;
    let first_name = "";
    let last_name = "";
    if (listing["booking"]) {
      for (let each of listing["booking"]) {
        if (each["accepted"] === true) {
          confirmedBooking = each["id"];
          first_name = each["users"]["first_name"];
          last_name = each["users"]["last_name"];
        }
      }
    }
    return (
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        direction={direction}
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Card
          sx={{
            bgcolor: "#ffde5a",
            boxShadow: 2,
            borderRadius: 3,
            maxWidth: 350,
            minWidth: 350,
            m: 1,
          }}
        >
          {listing.pets !== null && (
            <CardMedia
              component="img"
              height="320px"
              width="auto"
              image={listing.pets.photo_url}
              alt="Dog"
            />
          )}
          {!listing.pets && (
            <Grid
              item
              container
              direction="row"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={listing.users.photo_url}
                alt="user avatar"
                sx={{ width: 0.8, height: "auto", marginTop: 5, boxShadow: 3 }}
              />
            </Grid>


            // <CardMedia
            //   component="img"
            //   height="160"
            //   image={listing.users.photo_url}
            //   alt="Sitter"
            // />
          )}
          <CardContent sx={{m: 1, p: 3}}>
            {listing.pets !== null && (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  Wanted!
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {`${
                    listing.activity_type.charAt(0).toUpperCase() +
                    listing.activity_type.slice(1)
                  } 
                  for ${listing.pets.name}`}
                </Typography>
              </>
            )}
            {!listing.pets && (
              <>
                <Typography gutterBottom variant="h5" component="div">
                  Available:
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {`${listing.users.first_name} for 
                  ${listing.activity_type.charAt(0).toUpperCase() + listing.activity_type.slice(1)}`}
                </Typography>
              </>
            )}
            <Typography gutterBottom>
              {moment(listing.start_time).format("dddd MMMM Do YYYY")}
            </Typography>
            <Typography gutterBottom>
              {`${moment(listing.start_time).format("LT")} to ${moment(
                listing.end_time
              ).format("LT")}`}
            </Typography>
          </CardContent>
          {listing.user_id === user.id && listing.booking.length > 0 && (
            <CardActions sx={{padding: 0}}>
              <ResponsiveApplications listing={listing} />
            </CardActions>
          )}
          {listing.user_id === user.id &&
            listing.booking.length === 0 &&
            !listing.accepted && <Typography sx={{margin: 4}}>No applications yet!</Typography>}
          {listing.user_id !== user.id && (
            <CardActions sx={{ p: 0 }}>
              {listing.pets !== null && (
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
                  phone_number={listing.users.phone_number}
                ></ResponsiveDialog>
              )}
              {!listing.pets && (
                <ResponsiveDialog
                  id={listing.id}
                  sitter_listing={listing.sitter_listing}
                  user_id={listing.user_id}
                  additional_details={listing.additional_details}
                  postal_code={listing.postal_code}
                  start_time={listing.start_time}
                  end_time={listing.end_time}
                  //pet_id={listing.pet_id}
                  activity_type={listing.activity_type}
                  pet_name={listing.users.name}
                  pet_photo={listing.users.photo_url}
                ></ResponsiveDialog>
              )}
            </CardActions>
          )}
        </Card>
      </Grid>
    );
  });

  return (
    <main>
      <div className="mapsTop"></div>
      <div className="flexbox-container">
        <div id="listings">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              columnSpacing={{ xs: 1, sm: 2, md: 0.05 }}
              direction={direction}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {listing && useListing}
            </Grid>
          </Box>
        </div>
      </div>
    </main>
  );
}
