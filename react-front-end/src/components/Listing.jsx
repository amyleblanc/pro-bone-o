import React, { useEffect, useState } from "react";
import "./listing.css";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axiosRequest from "../helper/axios";
import ResponsiveDialog from "./modal-popup";
import FilterBar from "./searchbar";
import searchState from "./atom-search";
import axios from "axios";
import { useRecoilState } from "recoil";
import moment from "moment";
import { useRecoilValue } from "recoil";
import userState from "./atoms";
import ResponsiveApplications from "./modal-applications";

//const getListingState(//)

// const updateSearch = async (formData) => {
//   const processedForm = formData;
//   axiosRequest("/api/listing/filter", "POST", processedForm);
// };
import Map from "./maps/Map";
import ClickReveal from "./ClickReveal";

/**
 *
 * @param {Object} props object contains axios function details for listing type including url and payload
 * @returns mapped listings object
 */
export default function Listing(props) {
  const [listing, setListing] = useState([]);
  const { url, payload, type } = props;
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
    return (
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
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
            p: 3,
            maxWidth: 350,
            minWidth: 350,
            m: 1,
          }}
        >
          {listing.pets !== null && (
            <CardMedia
              component="img"
              height="160"
              width="160"
              image={listing.pets.photo_url}
              alt="Dog"
            />
          )}
          {!listing.pets && (
            <CardMedia
              component="img"
              height="160"
              image={listing.users.photo_url}
              alt="Sitter"
            />
          )}
          <CardContent>
            {listing.pets !== null && (
              <>
                <Typography gutterBottom variant="h6" component="div">
                  Wanted!
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
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
                <Typography gutterBottom variant="h6" component="div">
                  Available:
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${listing.users.first_name} ${listing.users.last_name} is available for:`}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {listing.activity_type.charAt(0).toUpperCase() +
                    listing.activity_type.slice(1)}
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
            {/* <Typography variant="body2" color="text.secondary">
              {listing.additional_details}
            </Typography> */}
          </CardContent>
          {listing.user_id === user.id && (
            <CardActions>
              <ResponsiveApplications listing={listing} />
            </CardActions>
          )}
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
              direction="row"
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
