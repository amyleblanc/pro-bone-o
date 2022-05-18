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
//import { useRecoilValue } from "recoil";
import FilterBar from "./searchbar";
import searchState from "./atom-search";
import axios from "axios";
import { useRecoilState } from "recoil";
import moment from "moment";

//const getListingState(//)

// const updateSearch = async (formData) => {
//   const processedForm = formData;
//   axiosRequest("/api/listing/filter", "POST", processedForm);
// };

/**
 *
 * @param {Object} props object contains axios function details for listing type including url and payload
 * @returns mapped listings object
 */
export default function Listing(props) {
  const [listing, setListing] = useState([]);
  const { url, payload } = props;
  //const search = useRecoilValue(searchState);
  const [search, setSearch] = useRecoilState(searchState);

  const getSearchState = function () {
    console.log(search);
  };

  useEffect(() => {
    const getSearch = async () => {
      const res = await axios
        .post(url, payload)
        .then((res) => setListing(res.data));
      console.log("res only", res);
    };
    getSearch();
  }, [url, payload]);

  const useListing = listing.map((listing) => {
    console.log(listing.pets);
    console.log(listing.users);
    // const photo = listing.pets.photo_url
    //   ? listing.pets.photo_url
    //   : listing.users.photo_url;
    return (
      <Grid 
        item xs={12} sm={4} md={4}
        sx={{
          display: "flex", 
          justifyContent: "space-around"
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
            m: 1
          }}
        >
          {listing.pets && (
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
            {listing.pets && (
              <>
                <Typography gutterBottom variant="h6" component="div">
                  Wanted!
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {`${listing.activity_type.charAt(0).toUpperCase() + listing.activity_type.slice(1)} 
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
                  {listing.activity_type.charAt(0).toUpperCase() + listing.activity_type.slice(1)}
                </Typography>
              </>
            )}
            <Typography gutterBottom>
              {moment(listing.start_time).format('dddd MMMM Do YYYY')}
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
          <CardActions sx={{p: 0}}>
            {listing.pets && (
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
        </Card>
        {/* <initMap /> */}
      </Grid>
    );
  });

  return (
    <main>
      <h1>Current Listings</h1>
      <>
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
              alignItems: "center"
            }}
          >
            {listing && useListing}
          </Grid>
        </Box>
      </>
      {/* </div>
      </section> */}
    </main>
  );
}
